/* Hands On document */
#use(macroset!standard:script/DocEngineDemoscript.js)

function DocEngineMarkdown(style) {
	log("DocEngineMarkdown:DocEngineMarkdown");
    this.style = style;
    this.ctor_(style);
};

DocEngineMarkdown.prototype = new DocEngine;
DocEngineMarkdown.superClass = DocEngine.prototype;

DocEngineMarkdown.prototype.trans_ = function(key) {
   return this.cfg.lang_tbl? 
            this.cfg.lang_tbl[key] : 
            this.builder.ProjTrans(key);
}

DocEngineMarkdown.prototype.handle_tourstop = function(ts) {
    var uid = ts.Name + "";
    Log("--");
    Log("DocEngine::handle_tourstop " + uid);
    this.in_branch = false;
    if (uid in this.jump_targets) {
        Log ("found in jump_targets:" + uid);
        this.bookmark_pending = uid;
    }
    if (this.cfg.heading_from == "tourstop" && this.include_title && !ts.Callable) {
        if (this.more_details) {
            this.add_text_paragraph(this.h_(1),
                                    this.translate_("tourstop") + " " + ts.Index + ": " + ts.Caption);
        } else {
            var text = ts.Caption;
            if (text != "") {
                var parastyle = this.h_(1);
                this.add_text_paragraph(parastyle, text);
            }
        }
    }
};

var FROM_STD = ["branch_on", "branch_off", "macro_start", "macro_finish"];
for (var i = 0; i < FROM_STD.length; ++i) {
    DocEngineMarkdown.prototype[FROM_STD[i]] = DocEngineStd.prototype[FROM_STD[i]];
}

DocEngineMarkdown.DisabledMacros = [ 
"form_on", "form_off", "mode_change", "mode_change_end", "mchoice", "sqmaquiz", "fibquiz", "matchquiz", 
"connquiz", "mixquiz", "scalequiz", "gridquiz", "hotspotquiz", "puzzlequiz", "scroll_hor", "scroll_vert",
 "doc_caption", "doc_input_table", "doc_revision_entry", "doc_logon_table", "branch_on", "branch_off", 
 "tts_override", "hpqc_header",
 ];
 
(function(){
    for (var i = 0; i < DocEngineMarkdown.DisabledMacros.length; ++i) {
        var mname = DocEngineMarkdown.DisabledMacros[i];
        DocEngineMarkdown.prototype[mname] = function(){}
    }
})()