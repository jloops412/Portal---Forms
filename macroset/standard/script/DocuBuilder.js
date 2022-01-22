#use(macroset!standard:util.js)
function DocuBuilder(Config) {
    this.cfg = Config;
    this.bookmark_pending = "";
}

DocuBuilder.prototype.h_ = function (level) {
	if(this.cfg.singledoc_headinglevel == 0 && level == 0)
		return 'title';
	
    return 'h' + (this.cfg.singledoc_headinglevel + level);
}

DocuBuilder.prototype.Header = function(level, text) {
    this.add_text_paragraph(this.h_(level), text);
}

DocuBuilder.prototype.FormattedText = function(formattedtext) {
    this.add_formatted_text(formattedtext);
}

DocuBuilder.prototype.FormattedParagraph = function(formattedtext, paratype) {
    var para = paratype;
    if (!para) para = "";
    // log("formattedParagraph: " + formattedtext);
    this.paragraph(para, function() {
        this.add_formatted_text(formattedtext);
    }
    );
}

DocuBuilder.prototype.PlainParagraph = function(plaintext, paratype) {
    var para = paratype;
    if (!para) para = "";
    this.add_text_paragraph(paratype, plaintext)
}

DocuBuilder.prototype.AlignedImageFromFile = function(path) {
    log("write image " + path);
    var img = CreateImage(path);
    var maxw = 580;
    if (img && img.width) {
        this.paragraph("", function() {
            if (img.width <= maxw) {
                log(" width is ok");
                Document.AddImage(path, img.width, img.height);
            } else {
                var ratio = maxw / img.width;
                log ("SCALED DOWN with ratio: " + ratio);
                Document.AddImage(path, maxw, ratio * img.height);
            }
        });
    }
}

DocuBuilder.prototype.SetSrcContext = function(ctx) {
    Document.SetSrcContext(ctx);
}

DocuBuilder.prototype.EmptyParagraph = function() {
    this.paragraph("", function() {Document.AddText(" ")});
}


DocuBuilder.prototype.mac_as_js = function (mac) {
//    log("DocuBuilder::mac_as_js");
    var params = {};
    for (var i = 0; i < mac.NumParams(); i++) {
        if (mac.ParamType(i) == ParamType_TEXT_SINGLE ||
            mac.ParamType(i) == ParamType_TEXT_SHORT ||
            mac.ParamType(i) == ParamType_TEXT_LONG ||
            mac.ParamType(i) == ParamType_HTML ||
            mac.ParamType(i) == ParamType_ENUM ||
            mac.ParamType(i) == ParamType_IMAGE ||
            mac.ParamType(i) == ParamType_FILENAME ||
            mac.ParamType(i) == ParamType_BOOL_0_1 ||
            mac.ParamType(i) == ParamType_BOOL_TRUE_FALSE ||
            mac.ParamType(i) == ParamType_BOOL_YES_NO)
        {
            params[mac.ParamName(i)] = mac.GetParam(i);
            // log(i + ": " + mac.ParamName(i) + ' = ' + mac.GetParam(i));
        }
    }
    return params;
}
 
DocuBuilder.prototype.resolve = function(html_txt, params, mac) {
    var resolved = Document.ResolveHtml(html_txt, 1, CreateContext("macro", params.uid, "project", "1"), params);
    var regex = new RegExp("src=\"project!" + "1" + ":macro!" + mac.GetUID() + ":","g");
    resolved = resolved.replace(regex, "src=\"");
    return resolved;
}


DocuBuilder.prototype.GetParamText = function (macro, param) {
    var params = this.mac_as_js(macro);
    var pval = macro.GetParam(param);

    if (ctx === undefined) {
        return this.resolve(pval, params, macro);
    }
    return ctx.h.EVAL_STRING(pval, params);
}

DocuBuilder.prototype.GetMacroText = function (macro) {
    var pname = this.get_text_param_(macro);
    if (pname) {
        var params = this.mac_as_js(macro);
        var pval = macro.GetParam(pname);
        pval = DocuBuilder.FixMacroPlaceholders(params, pval);
        
        if (ctx === undefined) {
            return this.resolve(pval, params, macro);
        }
        return ctx.h.EVAL_STRING(pval, params);
    
    } else {
        return "";
    }
    
}

DocuBuilder.FixMacroPlaceholders = function (params, text) {
    var fieldicon = "";
    if ("fieldicon" in params && params.fieldicon) {
        fieldicon = "$I{fieldicon}";
    }
    var fieldname = "";
    var boldfieldname = "";
    if ("fieldname" in params && params.fieldname) {
        fieldname = "$#{fieldname}";
        boldfieldname = "<b>" + fieldname + "</b>";
    }
    var nbsp = "";
    if (fieldname.length || fieldicon.length) {
        nbsp = "&nbsp;";
    }
    res = text.replace(/<b>\$#\{fieldname\}&nbsp;\$I\{fieldicon\}<\/b>\s*\./g,
        boldfieldname + nbsp + fieldicon + ".");
    res = res.replace(/<b>\$#\{fieldname\}&nbsp;\$I\{fieldicon\}<\/b>\s*/g,
        boldfieldname + nbsp + fieldicon + " ");
    res = res.replace("$#{fieldname}&nbsp;$I{fieldicon}", 
        fieldname + nbsp + fieldicon);
    res = res.replace("$#{fieldname} $I{fieldicon}", 
        fieldname + nbsp + fieldicon);
    res = res.replace("$#{fieldname}", fieldname);
    res = res.replace("$I{fieldicon}", fieldicon);
    return res;
    
}

DocuBuilder.prototype.ProjTrans = function (key) {
    return prj_trans(key, this.cfg.project);
}

DocuBuilder.prototype.get_text_param_ = function(macro) { //synchronize with project document
    var res;
    if (macro.HasParam("explanation_d") && this.cfg.doc_bubbles === "demo") {
        res = "explanation_d";
    } else if (macro.HasParam("explanation_p") && this.cfg.doc_bubbles === "practice") {
        res = "explanation_p";
    }
    
    if (macro.HasParam("expl_like")) {
        if (macro.GetParam("expl_like") === "demo") {
            res = "explanation_d";
        } else if (macro.GetParam("expl_like") === "practice") {
            res = "explanation_p";
        }
    } else if (macro.HasParam("all_like_demo")) {
        if (macro.GetParam("all_like_demo")) {
            res = "explanation_d";
        }
    } else if (macro.HasParam("text")) {
        res = "text";
    } else if (macro.HasParam("new_step")) {
        res = "new_step"
    }
    return res;
}

DocuBuilder.prototype.decorate_output = function(write_fun) {
    var bm = this.bookmark_pending;
    if (bm != "") {
        log("bookmark pending:" + bm);
        Document.BeginAName(bm);
    }
    write_fun.call(this);
    if (bm != "") {
        Document.EndAName();
        this.bookmark_pending = "";
    }
}

DocuBuilder.prototype.paragraph = function(paratype, content_fun) {
    Document.BeginParagraph(paratype);
    content_fun.call(this);
    Document.EndParagraph();
}



DocuBuilder.prototype.add_html_paragraph = function(paratype, htmltext) {
    if (htmltext.length > 0) {
        this.paragraph(paratype, function() {
            this.decorate_output(function() {
                Document.AddHtmlText(htmltext);
            });
        });
    }
}

DocuBuilder.prototype.add_formatted_text = function(htmltext) {
    this.decorate_output(function() {
        Document.AddHtmlText(htmltext);
    });
}

DocuBuilder.prototype.add_text_paragraph = function(paratype, text) {
    if (text.length > 0)
        this.paragraph(paratype, function() {
            this.decorate_output(function() {
                Document.AddText(text);
            });
        });
}

DocuBuilder.SetDocProperty = function(name, val, custom) { 
    if (typeof(custom) != 'undefined') { 
        log("SETPROP: " + name + " -> " + val + (custom ? " CUSTOM" : "")); 
        Document.SetProperty(name, val, custom); 
    } else { 
        Document.SetProperty(name, val); 
    } 
} 
DocuBuilder.prototype.SetDocProperty = DocuBuilder.SetDocProperty;

DocuBuilder.WriteCustomProperties = function (wacontent) {
    var custom_atts = WA.GetCustomAttributesByClass(wacontent.ClassId); 
    var spec_atts = wacontent.GetSpecializedAttributes();
    for (var att in spec_atts) { 
        custom_atts[att] = true;
    }
    if (wacontent.HasParam("sub_type")) {
        custom_atts.sub_type = true;
    }
    
    for (var att in custom_atts) { 
        DocuBuilder.SetDocProperty(att, '' + wacontent.GetParam(att), true); 
    }   
}
