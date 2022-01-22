/* process guide */

function DocEngineDemoscript(style) {
    this.style = style;
    this.ctor_(style);
};

DocEngineDemoscript.prototype = new DocEngine;
DocEngineDemoscript.superClass = DocEngine.prototype;

DocEngineDemoscript.prototype.open_flow_table = function() {
    this.init_ts_values();
    if (!this.flow_table_open_) {
        Document.BeginParagraph('screenshot');
        Document.BeginTable("TABLE_2COLUMNS");
        Document.BeginRow();
        Document.BeginCell();
        this.flow_table_open_ = true;
    }
}

DocEngineDemoscript.prototype.open_table = function() {
    if (!this.table_open_) {
        this.add_html_paragraph('\n');
        Document.BeginTable("TABLE_3COLUMNS");
        Document.BeginRow();
        Document.CellPadding(3.5, 3.5, 3.5, 3.5);
        Document.BeginCell();
        this.add_html_paragraph('<font size="+1"><b>' + this.builder.ProjTrans('docTableHeader_whatToDo') +'</b></font>');

        Document.EndCell();
        Document.BeginCell();
        this.add_html_paragraph('<font size="+1"><b>' + this.builder.ProjTrans('docTableHeader_screen')+'</b></font>');
        Document.EndCell();
        Document.BeginCell();
        this.add_html_paragraph('<font size="+1"><b>' + this.builder.ProjTrans('docTableHeader_whatToSay')+'</b></font>');
        Document.EndCell();
        Document.EndRow();
        this.table_open_ = true;
    }
}

DocEngineDemoscript.prototype.finish_table_row = function() {
    log("DocEngineDemoscript::finish_table_row");
    if (this.table_open_ && this.row_started_) {
        //write screenshot
        //finish 1st cell
        //first finish paragraph for the case that bubbletext has unfinished paragraph
        Document.AddHtmlText('&nbsp;');
        Document.EndParagraph();
        Document.EndCell();
        Document.BeginCell();
        if (this.ts_screen) {
            this.add_screenshot_fixedWidth(this.ts_screen, 184);
        }
        Document.EndCell();
        Document.BeginCell();

        // check for postponed macros
        this.handle_postponed_macros();
        this.end_row();

    }
}

DocEngineDemoscript.prototype.finish_flow_table = function() {
    log("DocEngineDemoscript::finish_flow_table");
    if (this.flow_table_open_) {
        // check for postponed macros
        this.handle_postponed_macros();
        //first finish paragraph for the case that bubbletext has unfinished paragraph
        Document.EndParagraph();
        //finish 1st cell
        Document.EndCell();
        Document.BeginCell();
        if (this.ts_screen) {
            this.add_screenshot_fixedWidth(this.ts_screen, 290);
        }
        Document.EndCell();
        Document.EndRow();
        Document.EndTable();
        this.flow_table_open_ = false;
    }
}

DocEngineDemoscript.prototype.start_row = function() {
    log("start row");
    if (this.flow_table_open_) {
        this.finish_flow_table();
    }
    if (! this.table_open_) {
        this.open_table();
    }
    if (this.row_started_) {
        this.finish_table_row();
    }
    this.init_ts_values();
    if (this.cfg.doc_index_scope 
        && this.cfg.doc_index_scope.indexOf("tourstop") != -1) {
            this.current_index = 0;
    }
    Document.BeginRow();
    Document.BeginCell();
    this.row_started_ = true;
    var uid = this.ts_id;
    if (uid in this.jump_targets) {
        Log ("found in jump_targets:" + uid);
        this.bookmark_pending = uid;
    }
}

DocEngineDemoscript.prototype.end_row = function() {
    if (this.row_started_) {
      //first finish paragraph for the case that bubbletext has unfinished paragraph
        Document.AddHtmlText('&nbsp;');
        Document.EndParagraph();
        Document.EndCell();
        Document.EndRow();
        this.row_started_ = false;
    }
}

DocEngineDemoscript.prototype.define_styles = function() {
    DocEngineDemoscript.superClass.define_styles.call(this);

    // TABLE_3COLUMNS
    Document.SetCurrCellStyle("cell_150");
    Document.CellWidth = 150;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.CellBgColor = 0xffffff;

    Document.SetCurrRowStyle("row_3_columns");
    Document.RowHeight = 20.0;
    Document.SetRowCellStyles("cell_150",
                              "cell_150",
                              "cell_150");
    Document.SetCurrTableStyle("TABLE_3COLUMNS");
    Document.TableBorder = 1;
    Document.TableRowStyle = "row_3_columns";

    // TABLE_2COLUMNS
    Document.SetCurrCellStyle("cell_225");
    Document.CellWidth = 225;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    //Document.CellPadding(7, 7, 7, 7);
    Document.CellBgColor = 0xffffff;

    Document.SetCurrRowStyle("row_2_columns");
    Document.RowHeight = 20.0;
    Document.SetRowCellStyles("cell_225",
                              "cell_225");

    Document.SetCurrTableStyle("TABLE_2COLUMNS");
    Document.TableBorder = 1;
    Document.TableRowStyle = "row_2_columns";

    // HINWEIS
    Document.SetCurrCellStyle("extra_image_cell");
    Document.CellWidth = 30;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);

    Document.SetCurrCellStyle("extra_text_cell");
    Document.CellWidth = 110;
    Document.CellBgColor = 0xe0e0e0;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);

    Document.SetCurrRowStyle("extra_row");
    Document.RowHeight = 28.0;
    Document.SetRowCellStyles("extra_image_cell", "extra_text_cell");

    Document.SetCurrTableStyle("extra");
    Document.TableLeftIndent = this.cfg.hinweis_left_indent;
    Document.TableBorder = 1;
    Document.TableSpacing = 0.0;
    Document.TableRowStyle = "extra_row";
};

DocEngineDemoscript.prototype.handle_tour_stops = function() {
    log("DocEngineDemoscript::handle_tour_stops");
    this.collect_targets();
    this.init_ts_values();

    for (var i = 0, n = this.project.NumTourstops(); i < n; i++) {
        var ts = this.project.GetTourstop(i);
        this.handle_tourstop_macros(ts);
        CurProgress(i+1);
    }
    // finish table row
    if (this.flow_table_open_) {
        this.finish_flow_table();
    } else {
        this.finish_table_row();
    }
    this.close_table();
}

DocEngineDemoscript.prototype.init_ts_values = function() {
    log("DocEngineDemoscript::init_ts_values");
    this.ts_screen = null;
    this.ts_init = true;
    this.postponedMacros = new Array();
}

DocEngineDemoscript.prototype.handle_tourstop_macros = function(ts) {
    log("DocEngineDemoscript::handle_tourstop_macros");
    var macro = ts.NextMacro();
    this.include_title = false;
    while (macro != null) {
        if (macro.Template() === "new_page") {
            this.include_title = macro.GetParam("doc_enable");
            break;
        }
        macro = ts.NextMacro(macro.TourPosition());
    }
    
    macro = ts.NextMacro();
    while (macro != null) {
        if (macro.HasParam("doc_enable")) {
            var show = macro.GetParam("doc_enable");
            if (!show) {
              macro = ts.NextMacro(macro.TourPosition());
              continue;
            }
        }
        this.close_revision_table(macro);
        var templatename = macro.Template();
        macro.ts = ts; //needed for postponed macros
        this.ts_id = ts.Name + "";

        // postpone handling of beschreibung, hinweis, and check explanation and screenshot_part
        if (this.row_started_ &&
                (templatename == 'beschreibung' ||
                templatename == 'free_marker' ||
            templatename == 'explanation' ||
            templatename == 'transaction_info' ||
            templatename == 'tts_override' ||
            templatename == 'hinweis')) {
            this.postponedMacros[this.postponedMacros.length] = macro;
        } else if (
        templatename == 'new_page' || templatename == 'new_window'
        || templatename == 'new_slide' || templatename == 'imported_page'
        ) {
            this.start_row();
            this.handle_macro(macro, ts);

        } else if (templatename == 'screenshot_part') {
            if (macro.GetParam("show_actions")) {
                this.start_row();
              this.handle_macro(macro, ts);
            } else {
              // postpone handling
              this.postponedMacros[this.postponedMacros.length] = macro;
            }
        } else if (templatename == 'explanation_long') {
            if (macro.HasParam("type") && macro.GetParam("type") != "none") {
                if (this.row_started_) {
                    // postpone
                    this.postponedMacros[this.postponedMacros.length] = macro;
                } else {
                    this.handle_macro(macro, ts);
                }
            } else {
                if (macro.HasParam("show_hl_d") && macro.GetParam("show_hl_d")) {
                    this.add_bubble_text(macro, true);
                    this.draw_index(macro);
                } else {
                    if (this.row_started_) {
                        //postpone
                        this.postponedMacros[this.postponedMacros.length] = macro;
                    } else {
                        this.handle_macro(macro, ts);
                    }
                }
            }
        } else {
            this.handle_macro(macro, ts);
        }
        macro = ts.NextMacro(macro.TourPosition());
    }
}

DocEngineDemoscript.prototype.imported_page = function(macro, ts) {
    log("Demoscript: imported_page");
    if (this.flow_table_open_) {
        this.finish_flow_table();
    }
    this.close_table();

    if (this.cfg.heading_from == "new_page") {
        if (!macro.HasParam("doc_heading") || macro.GetParam("doc_heading")) {
            var text = macro.GetParam("new_step");
            if (text != "") {
                var parastyle = 'h' + (this.cfg.singledoc_headinglevel + 1);
                this.add_html_paragraph(parastyle, text);
            }
        }
    }
    this.open_flow_table();

    var sc = this.create_page_image(macro);
    this.set_cur_sc(sc);
    if (this.cur_sc)  {
        this.ts_screen = sc;
    }
};

DocEngineDemoscript.prototype.new_page = function(macro, ts) {
    log("Demoscript: new_page");
    if (this.cfg.heading_from == "new_page") {
        if (!macro.HasParam("doc_heading") || macro.GetParam("doc_heading")) {
            var text = macro.GetParam("new_step");
            if (text != "") {
                var parastyle = this.h_(1);
                this.add_html_paragraph(parastyle, text);
            }
        }
    }
    var sc = this.create_page_image(macro);
    this.set_cur_sc(sc);
    if (this.cur_sc)  {
        this.ts_screen = sc;
    }
};

DocEngineDemoscript.prototype.new_window = DocEngineDemoscript.prototype.new_page;
DocEngineDemoscript.prototype.imported_page = DocEngineDemoscript.prototype.new_page;
DocEngineDemoscript.prototype.new_slide = DocEngineDemoscript.prototype.new_page;

DocEngineDemoscript.prototype.screenshot_part = function(macro, ts) {
    log("Demoscript: screenshot_part");
    var sc = this.create_page_image(macro);
    if (sc) {
        if (macro.GetParam("show_actions")) {
            this.ts_screen = sc;
            this.set_cur_sc(sc);
        } else {
            this.add_screenshot_fixedWidth(sc, 166);
            this.screenshot_apply_(sc);
        }
    }
};

DocEngineDemoscript.prototype.add_screenshot_fixedWidth = function(sc, fwidth) {
    log("Demoscript: add_screenshot_fixedWidth");
    sc.reduce_to_width = fwidth;
    sc.border = 0;
    Document.BeginParagraph("Screenshot");
    Document.AddImage(sc.image);
    Document.LineBreak();
    Document.EndParagraph();

    if (this.cfg.images_with_caption) {
        if (sc.caption != "") {
            this.add_text_paragraph('caption', sc.caption);
        } else {
            this.add_text_paragraph('caption', this.translate_('imgCaption') + " " + this.img_caption_index++);
        }
    }
};

DocEngineDemoscript.prototype.tts_override = function(macro, ts) {
    log("Demoscript: tts_override");
    this.add_text_paragraph('bubble_text', macro.GetParam("tts_source"));
};

DocEngineDemoscript.prototype.close_table = function() {
    log("Demoscript: close_table");
    if (this.table_open_) {
      // first finish open table
      this.finish_table_row();
      Document.EndTable();
      this.table_open_ = false;
    }
}

DocEngineDemoscript.prototype.doc_caption = function(macro, ts) {
    log("Demoscript: doc_caption");
    this.close_table();
    var caption = macro.GetParam("caption");
    var type = macro.GetParam("type");

    if (caption != "") {
        if (type != "") {
            this.add_text_paragraph(macro.GetParam("type"), caption);
        } else {
            this.add_text_paragraph('h' + this.cfg.singledoc_headinglevel, caption);
        }
    }
};

DocEngineDemoscript.prototype.transaction_info = function(macro, ts) {
     var sap_pfad = macro.GetParam("sap_path");
     var tcode = macro.GetParam("tcode");

     if (sap_pfad.length != 0) {
         this.add_html_paragraph('<b>' + this.builder.ProjTrans('docSAPMenuPath') + ':</b> ' + sap_pfad);
     }
     if (tcode.length != 0) {
         this.add_html_paragraph('<b>' + this.builder.ProjTrans('docSAPTransaction')+ ':</b> ' + tcode);
     }
     this.add_html_paragraph('\n');

};

DocEngine.prototype.hinweis = function(macro, ts) {
    log('Macro: Hinweis (Demoscript)');
    // check, if needed for style
    if (macro.HasParam('in_' + this.style) && !macro.GetParam('in_' + this.style)) {
        log('nothing to do for ' + this.style);
        return;
    }
    this.print_hinweis(macro, ts);
};

DocEngineDemoscript.prototype.draw_hinweis_table = function(text, icon_addr) {
    this.add_html_paragraph("<p>&nbsp;</p>");
    Document.AddImage(icon_addr, -1, -1, '', 40, 40);
    this.add_html_paragraph(text);
}

DocEngineDemoscript.prototype.handle_postponed_macros = function() {
    if (this.postponedMacros) {
        log ("handle_postponed_macros");
        for (var i=0; i < this.postponedMacros.length; i++) {
            // call macrofunction
            var m = this.postponedMacros[i];
            this.handle_macro(m, m.ts);
        }
    }
}

var FROM_STD = ["branch_on", "branch_off", "macro_start", "macro_finish"];
for (var i = 0; i < FROM_STD.length; ++i) {
    DocEngineDemoscript.prototype[FROM_STD[i]] = DocEngineStd.prototype[FROM_STD[i]];
}

DocEngineDemoscript.DisabledMacros = [
"form_on", "form_off", "mode_change", "mode_change_end", "mchoice", "sqmaquiz", "fibquiz", "matchquiz", "connquiz", "mixquiz", "scalequiz", "gridquiz", "hotspotquiz", "puzzlequiz", "scroll_hor", "scroll_vert",
 "doc_caption", "doc_input_table", "doc_revision_entry", "doc_logon_table",
 "kurs", "free_highlight", "arrow", "branch_on", "branch_off"
 ];
(function(){
    for (var i = 0; i < DocEngineDemoscript.DisabledMacros.length; ++i) {
        var mname = DocEngineDemoscript.DisabledMacros[i];
        DocEngineDemoscript.prototype[mname] = function(){}
    }
})()