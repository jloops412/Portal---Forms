/* Hands On document */
#use(macroset!standard:script/DocEngineDemoscript.js)

function DocEngineHandsOn(style) {
	log("DocEngineHandsOn:DocEngineHandsOn");
    this.style = style;
    this.ctor_(style);
};

DocEngineHandsOn.prototype = new DocEngine;
DocEngineHandsOn.superClass = DocEngine.prototype;

DocEngineHandsOn.prototype.trans_ = function(key) {
   return this.cfg.lang_tbl? 
            this.cfg.lang_tbl[key] : 
            this.builder.ProjTrans(key);
}

DocEngineHandsOn.prototype.open_table = function() {
	log("DocEngineHandsOn:open_table");
    if (!this.table_open_) {
		this.add_html_paragraph('\n');
        Document.BeginTable("TABLE_2COLUMNS");
        Document.BeginRow("row_header");
        Document.BeginCell("cell_header1");
        this.add_text_paragraph('branch_header', this.trans_('docTableHeader_explanation'));
        Document.EndCell();
        Document.BeginCell("cell_header2");
        this.add_text_paragraph('branch_header', this.trans_('docTableHeader_screenshot'));
        Document.EndCell();
        Document.EndRow();
        this.table_open_ = true;
    }
}

DocEngineHandsOn.prototype.close_table = function() {
    log("DocEngineHandsOn:close_table");
    if (this.table_open_) {
      Document.EndTable();
      this.table_open_ = false;
    }
}

DocEngineHandsOn.prototype.init_ts_values = function() {
    log("DocEngineHandsOn:init_ts_values");
    this.ts_screen = null;
	this.cur_sc = null;
    this.ts_init = true;
	this.handlePostponed = false;
    this.postponedMacros = new Array();
}

DocEngineHandsOn.prototype.start_row = function(ts) {
    log("DocEngineHandsOn:start_row");
	if (!this.table_open_) {
        this.open_table();
	}
	if (!this.row_started_) {
		this.init_ts_values();
		if (this.cfg.doc_index_scope  && this.cfg.doc_index_scope.indexOf("tourstop") !== -1) {
            this.current_index = 0;
		}
        if (this.cfg.heading_from !== "none") {
            Document.BeginRow("row_caption");
            Document.RowMergeCells();
            Document.BeginCell("cell_caption1");
            var text = this.cfg.heading_from === "tourstop"? ts.Caption : this.get_sc_caption(ts);
            this.add_text_paragraph('caption', text);
            Document.EndCell();
            Document.EndRow();
        }
		Document.BeginRow("row_2_columns");
		Document.BeginCell("cell_1");
		this.row_started_ = true;
		var uid = this.ts_id;
		if (uid in this.jump_targets) {
			Log ("found in jump_targets:" + uid);
			this.bookmark_pending = uid;
		}
	}
}

DocEngineHandsOn.prototype.end_row = function() {
    log("DocEngineHandsOn:end_row");

    if (this.table_open_ && this.row_started_) {
        Document.AddHtmlText('&nbsp;');
        Document.EndParagraph();
        Document.EndCell();
        
        Document.BeginCell("cell_2");
		this.handlePostponed = true;
		this.handle_postponed_macros();
        Document.AddHtmlText('&nbsp;');
        Document.EndParagraph();
        Document.EndCell();
        
        Document.EndRow();
        this.row_started_ = false;
    }
}

DocEngineHandsOn.prototype.add_sc_fixW = function(sc, fwidth) {
    log("DocEngineHandsOn:add_sc_fixW");
	if (!sc) return;
    if (!this.cfg.use_zoom && this.cfg.formats.indexOf("html") != -1 || this.cfg.formats.indexOf("html") == -1) {
        if (sc.crop_rect && sc.crop_rect.right > 0) {
            sc.scale = (fwidth / sc.crop_rect.right).toPrecision(4)*100;
        } else if (this.cfg.formats.indexOf("html") != -1) {
            sc.reduce_to_width = fwidth;
        }
    }
    this.add_text_paragraph("", Document.AddImage(sc.image));
    
    if (this.cfg.images_with_caption) {
        var text = sc.caption? sc.caption : this.translate_('imgCaption') + " " + this.img_caption_index++;
        this.add_text_paragraph('caption', text);
    }
}

DocEngineHandsOn.prototype.add_sc_relative = function(sc) {
    log("DocEngineHandsOn:add_sc_relative");
	if (!sc) return;
    this.add_text_paragraph("", Document.AddImage(sc.image, 100, 100, "", -1, -1, "", "%", "%"));
    
    if (this.cfg.images_with_caption) {
        var text = sc.caption? sc.caption : this.translate_('imgCaption') + " " + this.img_caption_index++;
        this.add_text_paragraph('caption', text);
    }
}

DocEngineHandsOn.prototype.define_styles = function() {
    log("DocEngineHandsOn:define_styles");
	DocEngineDemoscript.superClass.define_styles.call(this);
    
    // Header
    Document.SetCurrCellStyle("cell_header1");
    Document.CellWidth = "25%";
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.CellBgColor = 0xe0e0e0;
    Document.SetCurrCellStyle("cell_header2");
    Document.CellWidth = "75%";
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.CellBgColor = 0xe0e0e0;
    Document.SetCurrRowStyle("row_header");
    Document.RowHeight = 20.0;
    Document.SetRowCellStyles("cell_header1", "cell_header2");
    
    // Step caption
    Document.SetCurrCellStyle("cell_caption1");
    Document.CellWidth = "25%";
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.CellBgColor = 0xe0e0e0;
    Document.SetCurrCellStyle("cell_caption2");
    Document.CellWidth = "75%";
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.CellBgColor = 0xe0e0e0;
    Document.SetCurrRowStyle("row_caption");
    Document.RowHeight = 20.0;
    Document.SetRowCellStyles("cell_caption1", "cell_caption2");
    
    // Steps
    Document.SetCurrCellStyle("cell_1");
    Document.CellWidth = "25%";
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.CellBgColor = 0xffffff;
    Document.SetCurrCellStyle("cell_2");
    Document.CellWidth = "75%";
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.CellBgColor = 0xffffff;
    Document.SetCurrRowStyle("row_2_columns");
    Document.RowHeight = 20.0;
    Document.SetRowCellStyles("cell_1", "cell_2");
    
    // TABLE_2COLUMNS
    Document.SetCurrTableStyle("TABLE_2COLUMNS");
    Document.TableBorder = 1;
    Document.TableRowStyle = "row_2_columns"
};

DocEngineHandsOn.prototype.handle_tour_stops = function() {
    log("DocEngineHandsOn:handle_tour_stops");
    Document.BeginSection("frag_content");
    this.collect_targets();
    var n = this.project.NumTourstops();
    for (var i = 0; i < n; i++) {
		var ts = this.project.GetTourstop(i);
        this.handle_tourstop_macros(ts);
		if ( i == this.project.NumTourstops() -1 || !this.check_next_ts(this.project.GetTourstop(i+1))) {
			this.end_row();
		}
        CurProgress(i+1);
    }
    this.close_table();
    Document.EndSection();
}

DocEngineHandsOn.prototype.check_next_ts = function(ts) {
	if(!ts) return false;

	var m = ts.NextMacro();
	while (m != null) {
		var t = m.Template();
		if (t === 'screenshot_part' || ((t === 'new_page' || t === 'new_window' || t === 'new_slide' || t === 'imported_page') 
            && m.HasParam("doc_enable") && m.GetParam("doc_enable"))) {
            return false;
		}
		m = ts.NextMacro(m.TourPosition());
	}
	return true;
}

DocEngineHandsOn.prototype.handle_tourstop_macros = function(ts) {
    log("DocEngineHandsOn::handle_tourstop_macros");
    var m = ts.NextMacro();
	var finish_raw_macros = false;
    //Heading row
    while (m != null) {
        if (m.HasParam("doc_enable")) {
            var show = m.GetParam("doc_enable");
            if (!show) {
              m = ts.NextMacro(m.TourPosition());
              continue;
            }
        }
        this.close_revision_table(m);
        var t = m.Template();
        m.ts = ts; //needed for postponed macros
        this.ts_id = ts.Name + "";

        if (t == 'screenshot_part') {
			this.start_row(ts);
            if (m.HasParam("show_actions") && m.GetParam("show_actions")) {
              this.handle_macro(m, ts); //half handle
            }
            this.postponedMacros[this.postponedMacros.length] = m;
			
        } else if (t === 'new_page' || t === 'new_window' || t === 'new_slide' || t === 'imported_page') {
			this.start_row(ts);
            this.handle_macro(m, ts); // half handled now
			this.postponedMacros[this.postponedMacros.length] = m; // the other half after
            
        } else {
            this.handle_macro(m, ts);
			if ( t == 'click' || t == 'key_press' || t == 'explanation_long' ||	t == 'input_text' ||
                t === 'select_single' || t === 'input_radiobutton' || t === 'input_checkbox_tb' || t === 'input_radio' || t === 'end_unit') {
				this.add_html_paragraph('\n');
			}
        }
        m = ts.NextMacro(m.TourPosition());
    };
    
	return finish_raw_macros;
}

DocEngineHandsOn.prototype.get_sc_caption = function(ts) {
    log("DocEngineHandsOn::get_sc_caption");
    var m = ts.NextMacro();
    while (m != null) {
        if (m.HasParam("doc_enable")) {
            var show = m.GetParam("doc_enable");
            if (!show) {
              m = ts.NextMacro(m.TourPosition());
              continue;
            }
        }
        if (m.Template() === 'new_page') {
            return (!m.HasParam("doc_heading") || m.GetParam("doc_heading"))?
                    m.GetParam("new_step") : "";
        }
        m = ts.NextMacro(m.TourPosition());
    }
	return "";
}

DocEngineHandsOn.prototype.handle_postponed_macros = function() {
    if (this.postponedMacros) {
        log ("handle_postponed_macros");
        var l = this.postponedMacros.length;
        for (var i=0; i < l; i++) {
            // call macrofunction
            var m = this.postponedMacros[i];
            this.handle_macro(m, m.ts);
        }
    }
}

DocEngineHandsOn.prototype.new_page = function(m, ts) {
    log("DocEngineHandsOn:new_page " + m);
	if(this.handlePostponed) {
        this.add_sc_relative(this.ts_screen);
		this.screenshot_apply_(this.ts_screen);
        
	} else {
		var sc = this.create_page_image(m);
		if (sc) {
			if (!this.cur_sc)  {
				this.set_cur_sc(sc);
			}
            if (!this.cfg.use_zoom && this.cfg.formats.indexOf("html") != -1 || this.cfg.formats.indexOf("html") == -1) {
                this.add_sc_relative(this.ts_screen);
            }
			this.ts_screen = sc;			
		}	
	}
}

DocEngineHandsOn.prototype.new_window = DocEngineHandsOn.prototype.new_page;
DocEngineHandsOn.prototype.imported_page = DocEngineHandsOn.prototype.new_page;
DocEngineHandsOn.prototype.new_slide = DocEngineHandsOn.prototype.new_page;

DocEngineHandsOn.prototype.transaction_info = function(m, ts) {
     var sap_pfad = m.GetParam("sap_path");
     var tcode = m.GetParam("tcode");

     if (sap_pfad.length !== 0) {
         this.add_html_paragraph('<b>' + this.trans_('docSAPMenuPath') + ':</b> ' + sap_pfad);
     }
     if (tcode.length != 0) {
         this.add_html_paragraph('<b>' + this.trans_('docSAPTransaction')+ ':</b> ' + tcode);
     }
     this.add_html_paragraph('\n');
};

DocEngineHandsOn.prototype.screenshot_part = function(m, ts) {
    log("DocEngineHandsOn:screenshot_part");
    if (m.ParamSpecified("caption")) {
        var text = m.GetParam("caption");
        if (text != "") {
            this.add_text_paragraph(this.h_(1), text);
        }
    }
    Document.LineBreak();
    var sc = this.create_page_image(m);
    if (!sc) return;
    var sc_rect = m.GetParam("screenshot_rect");
    if (sc_rect && sc.image) {
        sc.image.ChangeCoord(1, 1, -sc_rect.left, -sc_rect.top);
    }
    if (m.GetParam("show_actions")) {
        if(this.handlePostponed) {
            this.add_sc_relative(this.cur_sc);
            this.screenshot_apply_(this.cur_sc);
        } else {
            if (!this.cur_sc)  {
                this.set_cur_sc(sc);
            }
            this.cur_sc = sc;
        }
    } else {
        this.add_sc_relative(sc);
        this.screenshot_apply_(sc);
    }
}

DocEngineHandsOn.prototype.draw_hinweis_table = function(text, icon_addr) {
    
	this.add_html_paragraph("<p>&nbsp;</p>");
    Document.AddImage(icon_addr, -1, -1, '', 40, 40);
	this.add_html_paragraph(text);

}

DocEngineHandsOn.prototype.add_project_info = function() {
    Document.SetSrcContext(this.prj_ctx);
    Document.BeginSection("frag_description", "data-translation=\"" + Translate("project_info") + "\"");
    this.add_html_paragraph(this.project.Description);
    Document.EndSection();
}

DocEngineHandsOn.prototype.add_project_shortdescp = function() {
    Document.SetSrcContext(this.prj_ctx);
    Document.BeginSection("frag_short_description", "data-translation=\"" + Translate("project_shortdescp") + "\"");
    this.add_html_paragraph(this.project.ShortDesc);
    Document.EndSection();
}

DocEngineHandsOn.prototype.add_cdoc_frag = function(id) {
    log("DocEngineHandsOn::add_cdoc_frag");
    var wac = WA.GetObject(id);
    if (wac) {
        Document.LeaveScope("project", this.project.UID);
        Document.SetSrcContext(CreateContext(wac.ClassId, wac.LocalId));
        Document.EnterScope(wac.ClassId, wac.LocalId);
        Document.BeginSection("frag_cdoc");
        if (this.cfg.print_cdoc_header) {
            this.builder.Header(0, wac.Caption);
        }
        this.builder.FormattedParagraph(wac.GetParam("description"));
        Document.EndSection();
        Document.LeaveScope(wac.ClassId, wac.LocalId);
        Document.EnterScope("project", this.project.UID);
    } else {
        log("cdoc: not found");
    }
};

DocEngineHandsOn.prototype.add_slide_frag = function(slideid) {
    log("DocEngineHandsOn::add_slide_frag");
    var wac = WA.GetObject(slideid);
    if (wac) {
        var res = wac.GetResource();
        if (!res) return;
        Document.LeaveScope("project", this.project.UID);
        Document.SetSrcContext(CreateContext("slide", wac.LocalId));
        Document.EnterScope("slide", wac.LocalId);
        Document.BeginSection("frag_slide");
        if (this.cfg.print_slide_header) {
            this.builder.Header(0, wac.Caption);
        }
        if(this.cfg.slide_details) {
            this.add_html_paragraph(wac.Description);
        }
        if (this.cfg.slide_format == "0") {
            var PREVIEWPNG = "preview.png";
            if (res.HasStream(PREVIEWPNG)) {
                var path = res.FullPath() + "\\" + PREVIEWPNG;
                this.builder.AlignedImageFromFile(path);
            }
        } else {
            var sl = wac.Open(false, true);
            var ctx = {cfg: this.cfg, resource: res, vars:{}};
            ctx.vars = {chaptertitle : wac.Caption,
                        chapterdescription : wac.Description,
                        chapter_fullid : wac.FullId,
                        pagenumber : 0,
                        slidetitle : wac.Caption,
                        slidedescription : wac.Description,
                        resource : res}
            linearize_slide(ctx, sl);
        }
        Document.EndSection();
        Document.LeaveScope(wac.ClassId, wac.LocalId);
        Document.EnterScope("project", this.project.UID);
    }
};

DocEngineHandsOn.prototype.add_title_frag = function(show_cover) {
    log("DocEngineHandsOn::add_title_frag");
    Document.BeginSection("frag_title");
    this.builder.Header(0, this.project.DisplayName);
    Document.EndSection();
}

DocEngineHandsOn.prototype.add_input_vals_frag = function() {
    log ("DocEngineHandsOn::add_input_vals_frag");
    doc_macros = new DocMacros();
    doc_macros.SetConfig(this.cfg);
    Document.BeginSection("frag_input_vals");
    doc_macros.doc_input_table();
    Document.EndSection();
};

DocEngineHandsOn.prototype.add_rev_history_frag = function() {
    log ("DocEngineHandsOn::add_rev_history_frag");
    doc_macros = new DocMacros();
    doc_macros.SetConfig(this.cfg);
    Document.BeginSection("frag_rev_history");
    doc_macros.rev_history();
    Document.EndSection();
};

DocEngineHandsOn.prototype.add_glossary_frag = function(postpone) {
    log ("DocEngineHandsOn::add_glossary_frag");
    if (postpone) {
        Document.BeginSection("frag_glossary_title");
        Document.CollectGlossary();
        var gloss_level = this.cfg.singledoc_headinglevel + 1;
        Document.BeginParagraph('h' + gloss_level);
        Document.AddText(general_trans("docGlossaryHeader", this.cfg.Language));
        Document.EndParagraph();
        Document.LineBreak();
        Document.EndSection();
    } else {
        Document.BeginSection("frag_glossary");
        add_glossary_items(this.cfg.project.Language);
        Document.EndSection();
    }
};

DocEngineHandsOn.prototype.screenshot_apply_ = function(sc) {
    if (sc) {
        if (0 && sc.crop_rect) {
            sc.image.Crop(sc.crop_rect);
        }
        if (0 && sc.border) {
            sc.image.Border(sc.border, this.cfg.screenshot_border_color);
        }
        if (!this.cfg.use_zoom && this.cfg.formats.indexOf("html") != -1 || this.cfg.formats.indexOf("html") == -1) {
            if (sc.reduce_to_width && sc.reduce_to_width > 0) {
                Log("image: reduce_to_width:" + sc.reduce_to_width);
                sc.image.ScaleTo(sc.reduce_to_width, 0, true);
            } else if (sc.scale) {
                if (sc.scale > 0 && sc.scale < 1) {
                    sc.image.ScaleBy(sc.scale);
                } else { //percents
                    sc.image.ScaleBy(sc.scale / 100);
                }
            }
        }
    }
}

DocEngineHandsOn.prototype.doc_caption = function(macro, ts) {
    log("DocEngineHandsOn::doc_caption");
    this.end_row();
    this.close_table();
    DocEngineHandsOn.superClass.doc_caption.call(this, macro, ts);
    if (ts.NextMacro(macro.TourPosition())) {
        this.start_row(ts);
    }
};

var FROM_STD = ["branch_on", "branch_off", "macro_start", "macro_finish"];
for (var i = 0; i < FROM_STD.length; ++i) {
    DocEngineHandsOn.prototype[FROM_STD[i]] = DocEngineStd.prototype[FROM_STD[i]];
}

DocEngineHandsOn.DisabledMacros = [ 
"form_on", "form_off", "mode_change", "mode_change_end", "mchoice", "sqmaquiz", "fibquiz", "matchquiz", 
"connquiz", "mixquiz", "scalequiz", "gridquiz", "hotspotquiz", "puzzlequiz", "scroll_hor", "scroll_vert",
 "doc_input_table", "doc_revision_entry", "doc_logon_table", "branch_on", "branch_off", 
 "tts_override", "hpqc_header", "page_break"
 ];
 
(function(){
    for (var i = 0; i < DocEngineHandsOn.DisabledMacros.length; ++i) {
        var mname = DocEngineHandsOn.DisabledMacros[i];
        DocEngineHandsOn.prototype[mname] = function(){}
    }
})()
