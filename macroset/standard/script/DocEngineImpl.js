var tbbgcolor = 0xe0e0e0; // tableheader 0xe0e0e0 0xe0e0e0
var tbbgcolor2 = 0xffffff; // tablelines
var tbbgcolor3 = 0xc9c9c9; // tablesubheader 0xa9a9a9
var docstyle_maintableheading = 'Table_Heading';

Log = log;

function DocEngine(style) {
    if (!style) return;
    this.ctor_(style);
};

DocEngine.prototype.ctor_ = function(style) {
    if (!style) return;
    Log ("DocEngine:ctor_");
    if (style) Log ("STYLE: " + style);
    this.style = style;
    this.chart_enabled = 1;
    this.saved_properties = [];
    this.revision_table_open = false;
    this.in_branch = false;
    this.jump_targets = {};
    this.bookmark_pending = "";
    this.capabilities_ = {}
    this.prj_ctx = 0;
    this.mac_ctx = 0;
    this.cur_sc = null;
    this.sc_counter = 0;
    this.current_index = 0;
    this.img_caption_index = 1;
    this.set_cur_sc(null);
    this.project = null;
    this.builder = null;
    this.capabilities_ = {branches: true};
    this.need_para_between_tables_ = true;
}

DocEngine.prototype.translate_ = function (key) {
    return prj_trans(key, this.project);
};

DocEngine.prototype.docstyle_path_ = function (fname) {
    var res = "adaptable!" + (this.cfg.docstyle || "docstyle");
    if (fname) {
        res += ":" + fname;
    }
    return res;
};
    
DocEngine.prototype.before_table_ = function() {
    log("before table");
    this.close_table();
}

DocEngine.prototype.after_table_ = function() {
    Document.AddHtmlText("<p>&nbsp;</p>");
}

DocEngine.prototype.SetConfig = function (cfg) {
    this.cfg = cfg;
    if (!this.cfg.temp_file_array) {
        this.cfg.temp_file_array = new Array();
    }
    this.builder = new DocuBuilder(cfg);
}

DocEngine.prototype.h_ = function (level) {
    if (this.cfg.singledoc_headinglevel == 0 && level == 0)
        return 'title';

    return 'h' + (this.cfg.singledoc_headinglevel + level);
}

DocEngine.prototype.supports_ = function (what) {
    return what in this.capabilities_ && this.capabilities_[what];
}

DocEngine.prototype.doc_quizzes_head = function(macro) {
    if (macro.GetParam("heading_enable")) {
        var h = this.cfg.heading_from == "none"? this.h_(1) : this.h_(2);
        this.add_text_paragraph(h, macro.GetParam("title"));
    }
    var question = DocEngine.prototype.doc_quizzes_head.arguments.length > 1 
                    ? DocEngine.prototype.doc_quizzes_head.arguments[1] 
                    : "question";

    if (macro.HasParam(question)) {
        if (remove_html(macro.GetParam(question)) != "" || macro.GetParam(question).toLowerCase().search(/<img/) != -1) {
            this.add_html_paragraph(macro.GetParam(question));
        }
    }
    this.doc_quizzes_media(macro);
}
DocEngine.prototype.doc_quizzes_media = function(macro) {
    var media = DocEngine.prototype.doc_quizzes_media.arguments.length > 1
                ? DocEngine.prototype.doc_quizzes_media.arguments[1] 
                : "qm_file";

    if (macro.HasParam(media)) {
        var file = macro.GetParam(media);
        if (file != "") {
            switch (file.substr(file.length - 3)) {
                case "jpg":
                case "bmp":
                case "gif":
                case "png":
                    this.add_image_paragraph("", macro.GetParam(media), macro.GetParam("qm_width"), macro.GetParam("qm_height"));
                    break;
            }
        }
    }
}

DocEngine.prototype.mchoice = function(macro, ts) {
    if (!this.cfg.quizzes_in_doc || !this.supports_("quizzes")) return;
    var max_answers = 6;
    var a;
    if (this.cfg.print_solution) {
        a = doc_quizzes_check(macro, max_answers, "answer_");
    } else {
        a = doc_quizzes_check(macro, max_answers, "answer_", macro.GetParam("shuffle_solutions"));
    }
    if (a.val.length == 0) return;
    this.doc_quizzes_head(macro);
    this.before_table_();
    Document.BeginTable("mchoice_quiz");
    Document.TableRepeatHeader = false;
    
    for (var i = 0, l = a.val.length; i < l; i++) {
        Document.BeginRow();
        Document.BeginCell();
        var t = macro.GetParam("answer_" + a.idx[i] + "_correct");
        if (this.cfg.print_solution && t) {
            this.add_text_paragraph("", "X");
        } else {
            this.add_text_paragraph("", "");
        }
        Document.EndCell();
        Document.BeginCell();
        Document.CellBgColor = 0xe0e0e0;
        this.add_html_paragraph(a.val[i]);
        Document.EndCell();
        Document.EndRow();
    }
    Document.EndTable();
    this.after_table_();
};

DocEngine.prototype.sqmaquiz = function(macro, ts) {
    if (!this.cfg.quizzes_in_doc || !this.supports_("quizzes")) return;
    var max_answers = 8;
    var a = doc_quizzes_check(macro, max_answers, "answer_");
    if (a.val.length == 0) return;
    this.doc_quizzes_head(macro);
    this.before_table_();
    Document.BeginTable("mchoice_quiz");
    Document.TableRepeatHeader = false;
    
    for (var i = 0, l = a.val.length; i < l; i++) {
        Document.BeginRow();
        Document.BeginCell();
        Document.CellBgColor = 0xe0e0e0;
        this.add_text_paragraph("", (i + 1) + ".");
        Document.EndCell();
        Document.BeginCell();
        if (this.cfg.print_solution) {
            this.add_text_paragraph("", a.val[i]);
        } else {
            this.add_text_paragraph("", "");
        }
        Document.EndCell();
        Document.EndRow();
    }
    Document.EndTable();
    this.after_table_();
};

DocEngine.prototype.fibquiz = function(macro, ts) {
    if (!this.cfg.quizzes_in_doc || !this.supports_("quizzes")) return;

    var max_answers = 8;
    var marker = "__";
    var s = "__________________", q = " ";
    switch (macro.GetParam("quiz_type")) {
        case "qt_text":
        case "qt_cs_text":
            if (this.cfg.print_solution) {
                var h = macro.GetParam("fibtext").split("___");
                var a = doc_quizzes_check(macro, max_answers, "answer_");
                for (var i = 0, q = "", l = a.val.length; i < l; i++) {
                    q += h[i] + marker + a.val[i] + marker;
                }
                q += h[h.length - 1];
            } else {
                q = macro.GetParam("fibtext").split("___").join(s);
            }
            break;
        case "qt_drop_down":
        case "qt_drag_drop":
            if (macro.GetParam("one_for_all") == true) {
                if (this.cfg.print_solution) {
                    var h = macro.GetParam("answer_1").split(",");
                    var h1 = [];
                    var h2 = h.join(", ").replace(/\*/g, "");
                    for (var i = 0, j = 0; i < h.length; i++) {
                        if (h[i].search(/^\*/) != -1) {
                            h1[j++] = h[i].substr(1);
                        }
                    }
                    h = macro.GetParam("fibtext").split("___");
                    for (var i = 0, q = ""; i < h1.length; i++) {
                        q += h[i] + marker + h1[i] + marker + " (" + h2 + ")";
                    }
                    q += h[h.length - 1];
                } else {
                    var h = macro.GetParam("answer_1").split(",").join(", ");
                    h = h.replace(/\*/g, "");
                    s += " (" + h + ")";
                    q = macro.GetParam("fibtext").split("___").join(s);
                }
            } else {
                var a = doc_quizzes_check(macro, max_answers, "answer_");
                q = macro.GetParam("fibtext").split("___");
                if (a.val.length + 1 != q.length) return;
                if (this.cfg.print_solution) {
                    var h = q;
                    var h1 = [];
                    for (var i = 0, l = a.val.length; i < l; i++) {
                        var h2 = a.val[i].split(",");
                        var h3 = [];
                        for (var j = 0, l2 = h2.length; j < l2; j++) {
                            if (h2[j].search(/^\*/) != -1) {
                                h3.push(h2[j].substr(1));
                            }
                        }
                        h1.push(h3.join(", "));
                    }
                    for (var i = 0, q = "", l1 = h1.length; i < l1; i++) {
                        q += h[i] + marker + h1[i] + marker + " (" + a.val[i].split(",").join(", ").replace(/\*/g, "") + ")";
                    }
                } else {
                    for (var i = 0, l = a.val.length; i < l; i++) {
                        var h = a.val[i].toString().split(",").join(", ");
                        h = h.replace(/\*/g, "");
                        q[i++] += s + " (" + h + ")";
                    }
                    q = q.join("");
                }
            }
            break;
    }
    this.doc_quizzes_head(macro, "question");
    this.add_html_paragraph(q);
};

DocEngine.prototype.matchquiz = function(macro, ts) {
    if (!this.cfg.quizzes_in_doc || !this.supports_("quizzes")) return;

    var max_answers = 8;
    var a;
    if (!this.cfg.print_solution) {
        a = doc_quizzes_check(macro, max_answers, "answer_", true);
    } else {
        a = doc_quizzes_check(macro, max_answers, "answer_");
    }
    var q = doc_quizzes_check(macro, max_answers, "question_");
    if (a.val.length == 0 || q.val.length == 0 || a.val.length != q.val.length) return;

    this.doc_quizzes_head(macro, "matchquestion");

    this.before_table_();
    Document.BeginTable("match_quiz");
    Document.TableRepeatHeader = false;
    for (var i = 0, l = q.val.length; i < l; i++) {
        Document.BeginRow();
        Document.BeginCell();
        Document.CellBgColor = 0xe0e0e0;
        this.add_html_paragraph(q.val[i]);
        Document.EndCell();
        Document.BeginCell();
        this.add_text_paragraph("", "");
        Document.EndCell();
        Document.BeginCell();
        Document.CellBgColor = 0xe0e0e0;
        this.add_html_paragraph(a.val[i]);
        Document.EndCell();
        Document.EndRow();
    }
    Document.EndTable();
    this.after_table_();
};

DocEngine.prototype.connquiz = function(macro, ts) {
    if (!this.cfg.quizzes_in_doc || !this.supports_("quizzes")) return;
    var max_answers = 8;
    var a;
    if (!this.cfg.print_solution) {
        a = doc_quizzes_check(macro, max_answers, "answer_", true);
    } else {
        a = doc_quizzes_check(macro, max_answers, "answer_");
    }
    var q = doc_quizzes_check(macro, max_answers, "question_");
    if (a.val.length == 0 || q.val.length == 0 || a.val.length != q.val.length) return;
    this.doc_quizzes_head(macro, "connquestion");
    this.before_table_();
    Document.BeginTable("match_quiz");
    Document.TableRepeatHeader = false;
    
    for (var i = 0, l = q.val.length; i < l; i++) {
        Document.BeginRow();
        Document.BeginCell();
        Document.CellBgColor = 0xe0e0e0;
        this.add_html_paragraph(q.val[i]);
        Document.EndCell();
        Document.BeginCell();
        this.add_text_paragraph("", "");
        Document.EndCell();
        Document.BeginCell();
        Document.CellBgColor = 0xe0e0e0;
        this.add_html_paragraph(a.val[i]);
        Document.EndCell();
        Document.EndRow();
    }
    Document.EndTable();
    this.after_table_();
};

DocEngine.prototype.mixquiz = function(macro, ts) {
    if (!this.cfg.quizzes_in_doc || !this.supports_("quizzes")) return;

    var max_answers = 8;
    var print_solution = this.cfg.print_solution;
    var a = doc_quizzes_check(macro, max_answers, "answer_", !print_solution);
    if (a.val.length == 0) return;
    this.doc_quizzes_head(macro);

    this.before_table_();
    Document.BeginTable("mchoice_quiz");
    Document.TableRepeatHeader = false;
    for (var i = 1, l = a.val.length; i <= l; i++) {
        Document.BeginRow();
        Document.BeginCell();
        Document.CellBgColor = 0xe0e0e0;
        if (print_solution) {
            this.add_text_paragraph("", i + ".");
        } else {
            this.add_text_paragraph("", "?.");
        }
        Document.EndCell();
        Document.BeginCell();
        this.add_text_paragraph("", a.val[i - 1]);
        Document.EndCell();
        Document.EndRow();
    }
    Document.EndTable();
    this.after_table_();
};

DocEngine.prototype.scalequiz = function(macro, ts) {
    if (!this.cfg.quizzes_in_doc || !this.supports_("quizzes")) return;

    this.doc_quizzes_head(macro);
    this.before_table_();
    Document.BeginTable("scale_quiz");
    Document.TableRepeatHeader = false;
    var range = macro.GetParam("range").split("-");
    var r_ok = range.length == 2;
    Document.BeginRow();
    Document.BeginCell();
    if (r_ok) {
        this.add_text_paragraph("", range[0]);
    }
    Document.EndCell();
    Document.BeginCell();
    if (this.cfg.print_solution) {
        this.add_text_paragraph("", macro.GetParam("answer"));
    } else {
        this.add_text_paragraph("", "");
    }
    Document.EndCell();
    Document.BeginCell();
    if (r_ok) {
        this.add_text_paragraph("right", range[1]);
    }
    Document.EndCell();
    Document.EndRow();
    Document.EndTable();
    this.after_table_();
};

DocEngine.prototype.gridquiz = function(macro, ts) {
    if (!this.cfg.quizzes_in_doc || !this.supports_("quizzes")) return;

    var max_answers = 8;
    var q = doc_quizzes_check(macro, max_answers, "question_");
    var p = macro.GetParam("grid_list").split(",");
    if (q.val.length == 0 || p.length == 0) return;

    if (!this.cfg.print_solution && macro.GetParam("shuffle_solutions")) {
        var b = p.copy();
        do {
            p.mix();
        } while (p.join("") == b.join(""));
    }

    var w_all = 380;
    var w_1 = 150;
    var w_2 = Math.floor((w_all - w_1) / p.length);

    this.doc_quizzes_head(macro);
    Document.SetCurrCellStyle("quiz_grid_cell1");
    Document.CellWidth = w_1;
    Document.CellPadding(3.5, 1.5, 3.5, 1.5);
    Document.SetCurrCellStyle("quiz_grid_cell2");
    Document.CellWidth = w_2;
    Document.CellPadding(3.5, 1.5, 3.5, 1.5);

    var row = "Document.SetRowCellStyles('quiz_grid_cell1'";
    for (var i = 0, l = p.length; i < l; i++) {
        row += ", 'quiz_grid_cell2'";
    }
    row += ");";

    Document.SetCurrRowStyle("quiz_grid_row");
    Document.RowHeight = 12.0;
    eval(row);
    Document.SetCurrTableStyle("grid_quiz");
    Document.TableBorder = 1;
    Document.TableSpacing = 0.0;
    Document.TableRowStyle = "quiz_grid_row"

    this.before_table_();
    Document.BeginTable("grid_quiz");
    Document.TableRepeatHeader = false;
    Document.BeginRow();
    Document.BeginCell();
    Document.CellBgColor = 0xe0e0e0;
    this.add_text_paragraph("", "");
    Document.EndCell();
    for (var i = 0, l = p.length; i < l; i++) {
        Document.BeginCell();
        Document.CellBgColor = 0xe0e0e0;
        this.add_text_paragraph("", p[i]);
        Document.EndCell();
    }
    Document.EndRow();
    for (var i = 0, l = q.val.length; i < l; i++) {
        Document.BeginRow();
        Document.BeginCell();
        Document.CellBgColor = 0xe0e0e0;
        this.add_text_paragraph("", q.val[i]);
        Document.EndCell();
        for (var j = 0, lp = p.length; j < lp; j++) {
            Document.BeginCell();
            if (this.cfg.print_solution) {
                var t = macro.GetParam("answer_" + (i + 1));
                if (t - 1 == j) {
                    this.add_html_paragraph("X");
                } else {
                    this.add_html_paragraph("");
                }
            } else {
                this.add_html_paragraph("");
            }
            Document.EndCell();
        }
        Document.EndRow();
    }
    Document.EndTable();
    this.after_table_();
};

DocEngine.prototype.hotspotquiz = function(macro, ts) {
    if (!this.cfg.quizzes_in_doc || !this.supports_("quizzes")) return;

    this.doc_quizzes_head(macro);

    var mres = macro.GetResource();
    var stream_name = macro.GetParam("hs_image");
    var image = new ImageBuilder();
    if (!image.Load(mres, stream_name, true) ) {
            Log ("stream " + stream_name + " not found");
            image = null;
            return null;
    }

    var rect = macro.GetParam("selection_rect");
    if (rect && rect.width > 0 && rect.height > 0 && this.cfg.print_solution) {
        image.RoundedRect(rect,
                            this.cfg.marker_border,
                            this.cfg.marker_color,
                            this.cfg.marker_offset,
                            0);
    }
    image.ScaleTo(580, 0, true);
    Document.BeginParagraph("Screenshot");
    Document.AddImage(image);
    Document.EndParagraph();
}

DocEngine.prototype.quiz_eval = function(macro, ts) {
    if (!this.cfg.quizzes_in_doc || !this.supports_("quizzes")) return;

    Document.SetCurrCellStyle("quiz_eval_top");
    Document.CellWidth = 127;
    Document.CellPadding(2, 3, 2, 3);
    Document.SetCurrRowStyle("quiz_eval_top");
    Document.RowHeight = 35;
    Document.SetRowCellStyles("quiz_eval_top", "quiz_eval_top", "quiz_eval_top");
    Document.SetCurrTableStyle("quiz_eval_top");
    Document.TableRowStyle = "quiz_eval_top";
    Document.TableBorder = 1;
    var h = this.cfg.heading_from == "none"? this.h_(1) : this.h_(2);
    this.add_text_paragraph(h, this.builder.ProjTrans('docQuizzesTitle'));
    this.add_text_paragraph("", "");

    this.before_table_();
    Document.BeginTable("quiz_eval_top");
    Document.TableRepeatHeader = false;
    Document.BeginRow();
    Document.BeginCell();
    Document.CellBgColor = 0xe0e0e0;
    this.add_text_paragraph("", this.builder.ProjTrans('docQuizzesScoreAchieved'));
    Document.EndCell();
    Document.BeginCell();
    Document.CellBgColor = 0xe0e0e0;
    this.add_text_paragraph("", this.builder.ProjTrans('docQuizzesScorePassed'));
    Document.EndCell();
    Document.BeginCell();
    Document.CellBgColor = 0xe0e0e0;
    this.add_text_paragraph("", this.builder.ProjTrans('docQuizzesScoreMax'));
    Document.EndCell();
    Document.EndRow();
    Document.BeginRow();
    Document.RowHeight = 90;
    Document.RowMergeCells();
    Document.BeginCell();
    this.add_text_paragraph("", this.builder.ProjTrans('docQuizzesInformation'));
    Document.EndCell();
    Document.EndRow();
    Document.EndTable();
    this.after_table_();
}

DocEngine.prototype.puzzlequiz = function(macro, ts) {};
DocEngine.prototype.quiz_shuffle_on = function(macro, ts) {};
DocEngine.prototype.quiz_shuffle_off = function(macro, ts) {};

DocEngine.prototype.doc_properties = function(macro, ts) {
    Log("macro: doc_properties");

    if (macro.GetParam('name1') != '') {
        this.saved_properties[macro.GetParam('name1')] = macro.GetParam('value1');
        this.builder.SetDocProperty(macro.GetParam('name1'), macro.GetParam('value1'), true);
    }
    if (macro.GetParam('name2') != '') {
        this.saved_properties[macro.GetParam('name2')] = macro.GetParam('value2');
        this.builder.SetDocProperty(macro.GetParam('name2'), macro.GetParam('value2'), true);
    }
    if (macro.GetParam('name3') != '') {
        this.saved_properties[macro.GetParam('name3')] = macro.GetParam('value3');
        this.builder.SetDocProperty(macro.GetParam('name3'), macro.GetParam('value3'), true);
    }
    if (macro.GetParam('name4') != '') {
        this.saved_properties[macro.GetParam('name4')] = macro.GetParam('value4');
        this.builder.SetDocProperty(macro.GetParam('name4'), macro.GetParam('value4'), true);
    }
    if (macro.GetParam('name5') != '') {
        this.saved_properties[macro.GetParam('name5')] = macro.GetParam('value5');
        this.builder.SetDocProperty(macro.GetParam('name5'), macro.GetParam('value5'), true);
    }
    if (macro.GetParam('name6') != '') {
        this.saved_properties[macro.GetParam('name6')] = macro.GetParam('value6');
        this.builder.SetDocProperty(macro.GetParam('name6'), macro.GetParam('value6'), true);
    }

};

DocEngine.prototype.click = function(macro, ts) {
    this.add_bubble_text(macro, true);
    if (this.more_details &&  macro.HasParam("key_desc") &&  macro.GetParam("key_desc")) {
        this.add_text_paragraph("", this.translate_("key_desc") + ":" + macro.GetParam("key_desc")); // dps1245
    }
    this.draw_index(macro);
};

DocEngine.prototype.click_SAP = DocEngine.prototype.click;
DocEngine.prototype.quick_click = DocEngine.prototype.click;

DocEngine.prototype.start_unit = function(macro, ts) {
    Log('-> start_unit');
    if (this.more_details) {
        this.add_text_paragraph(this.h_(2),
                                this.translate_("task_text"));
        this.add_html_paragraph(macro.GetParam("task_text"));
    }
};

DocEngine.prototype.create_page_image = function(macro) {
    Log("create_page_image");
    if ("hide_screenshots" in this.cfg && this.cfg.hide_screenshots) return null;
    var stream_name = "";
    var mres = macro.GetResource();
    if (mres && macro.HasParam("dump_page")) {
        stream_name = PathCombine(macro.GetParam("dump_page"), "img.png");
    } else if (mres && macro.HasParam("screenshot_file")) {
        stream_name = macro.GetParam("screenshot_file");
    } else if (macro.Template() == "new_slide") {
        var slide_src = macro.GetParam("src");
        if (slide_src) {
            var wac = WA.GetObject(slide_src);
            if (wac) {
                Log("slide for " + slide_src + " is " + wac.GetParam("caption"));
                mres = wac.GetResource();
                if (mres) {
                    stream_name = "preview.png";
                    Log("---" + stream_name);
                }
            }
        }
    }
    if (stream_name == "") {
        Log("no macro resource found for mac" + macro.UID);
        return;
    }
    Log ("Stream name:" +stream_name);
    var border = macro.ParamSpecified("screenshot_border") ?
                    macro.GetParam("screenshot_border") :
                    this.cfg.screenshot_border;
    var crop_rect = this.get_crop_rect_(macro);

    var sc = {};
    sc.typename = "screenshot";
    sc.macro_template = macro.Template();

    if (stream_name.indexOf(":") > 0) {
        stream_name = this.mac_ctx.Expand(stream_name);
        var parts = stream_name.split(":");
        var wac = WA.GetObject(stream_name);
        if (wac) {
            mres = wac.GetResource();
            stream_name = parts[parts.length - 1];
        }
    }

    if (stream_name.length != 0) {
        sc.image = new ImageBuilder();
        if (!sc.image.Load(mres, stream_name, true) ) {
            Log ("stream " + stream_name + " not found");
            sc.image = null;
            return null;
        }
        sc.crop_rect = crop_rect;
        if (sc.crop_rect) {
            sc.image.Crop(sc.crop_rect);
            sc.image.ChangeCoord(1, 1, -sc.crop_rect.left, -sc.crop_rect.top);
        }

        sc.border = border;
        if (border) {
            sc.image.Border(sc.border, this.cfg.screenshot_border_color);
            sc.image.ChangeCoord(1, 1, border, border);
        }
        sc.caption = "";
        sc.alt_text = "";
        if (macro.HasParam("caption")) {
            sc.alt_text = macro.GetParam("caption");
        } else if (macro.HasParam("new_step")) {
            sc.alt_text = macro.GetParam("new_step");
        }
        if (this.cfg.image_caption_from_new_page) {
           sc.caption = sc.alt_text;
        }
        sc.scale = 100;
        if (macro.HasParam("imagesize")) {
            sc.scale = macro.GetParam("imagesize") - 0;
        }
        return sc;
    } else {
        Log("could not load " + screenshot_file);
        return null;
    }
};

DocEngine.prototype.decorate_output = function (write_fun) {
    var bm = this.bookmark_pending;
    if (bm != "") {
        Log("bookmark pending:" + bm);
        Document.BeginAName(bm);
        Document.EndAName();
        this.bookmark_pending = "";
        Log("Inserted AName:" + bm);
    }
    write_fun ();
}

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};


DocEngine.prototype.add_html_paragraph = function(paratype_or_htmltext, htmltext_or_nothing) {
    var htmltext = arguments.length == 1 ?  paratype_or_htmltext : htmltext_or_nothing;
    var paratype = arguments.length == 1 ? "" : paratype_or_htmltext ;
    if (htmltext && htmltext.length > 0) {
        Document.BeginParagraph(paratype);
        this.decorate_output( function () {
            Document.AddHtmlText(htmltext);
        });
        Document.EndParagraph();
    }
}

DocEngine.prototype.add_text_paragraph = function(paratype_or_text, text_or_nothing) {
    var text = arguments.length == 1 ?  paratype_or_text : text_or_nothing;
    var paratype = arguments.length == 1 ? "" : paratype_or_text;
    
    Document.BeginParagraph(paratype);
    if (text && text.length > 0)
        this.decorate_output( function () {
            Document.AddText(text);
        });
    Document.EndParagraph();
}

DocEngine.prototype.add_image_paragraph = function(paratype, imagepath, width, height, caption, scale_w, scale_h, alt_text) {
    if (typeof width == 'undefined') width = -1;
    if (typeof height == 'undefined') height = -1;
    if (typeof caption == 'undefined') caption = "";
    if (typeof scale_w == 'undefined') scale_w = -1;
    if (typeof scale_h == 'undefined') scale_h = -1;
    if (typeof alt_text == 'undefined') alt_text = "";

    Document.BeginParagraph(paratype);
    if (imagepath.length > 0) Document.AddImage(imagepath, width, height, caption, scale_w, scale_h, alt_text);
    Document.EndParagraph();
}

DocEngine.prototype.transaction_info = function(macro, ts) {
    this.close_table();
    var sap_pfad = macro.GetParam("sap_path");
    var tcode = macro.GetParam("tcode");

    Document.BeginParagraph('bubble_text');
    this.before_table_();
    Document.BeginTable("TCODE_TABLE");
    Document.TableRepeatHeader = false;

    if (sap_pfad.length != 0) {
        Document.BeginRow();
        Document.BeginCell();
        this.add_text_paragraph('tcode', this.builder.ProjTrans('docSAPMenuPath'));
        Document.EndCell();
        Document.BeginCell();
        this.add_text_paragraph(sap_pfad);
        Document.EndCell();
        Document.EndRow();
     }

    if (tcode.length != 0) {
        Document.BeginRow();
        Document.BeginCell();
        this.add_text_paragraph('tcode', this.builder.ProjTrans('docSAPTransaction'));
        Document.EndCell();
        Document.BeginCell();
        this.add_text_paragraph('tcode', tcode);
        Document.EndCell();
        Document.EndRow();
    }
    Document.EndTable();
    Document.EndParagraph();
    this.after_table_();
};

DocEngine.prototype.hinweis_icon_addr = function(macro) {
    var hinweis_filename;
    if (macro.HasParam("type")) {
        var hinweis_type = macro.GetParam("type");
        if (hinweis_type != "" && typeof(hinweis_image[hinweis_type]) == 'string') {
            hinweis_filename = hinweis_image[hinweis_type];
        } else {
            hinweis_filename = hinweis_type + "_word.bmp";
        }
    } else {
        hinweis_filename = "hinweis_word.bmp";
    }
    return this.docstyle_path_('image\\' + hinweis_filename);
}


DocEngine.prototype.hinweis = function(macro, ts) {
    Log('Macro: Hinweis');
    var t_style = this.style;
    if (this.style == 'work' || this.style == 'ppt' || !this.style) {
        t_style = 'standard';
    }
    // check, if needed for style
    if (macro.HasParam('in_' + t_style) && !macro.GetParam('in_' + t_style)) {
        Log('nothing to do for ' + t_style);
        return;
    }
    this.close_table();
    this.print_hinweis(macro, ts);
};

DocEngine.prototype.print_hinweis = function(macro, ts) {
    var text = macro.GetParam("text");
    var icon_addr = this.hinweis_icon_addr(macro);
    this.draw_hinweis_table(text, icon_addr);
};

DocEngine.prototype.draw_hinweis_table = function(text, icon_addr) {
    this.close_table();
    this.before_table_();
    Document.BeginTable("extra");
    Document.BeginRow();
    Document.BeginCell();
    this.add_image_paragraph('hint_box', icon_addr);
    Document.EndCell();
    Document.BeginCell();
    this.add_html_paragraph('hint_box', text);
    Document.EndCell();
    Document.EndRow();
    Document.EndTable();
    this.after_table_();
}

DocEngine.prototype.status_info = function(macro, ts) {
    var status_txt = macro.GetParam("status_text");
    var status_file = macro.GetParam("screenshot_file");

    if (status_file.length != 0 && macro.GetResource().HasStream(status_file)) {
        Document.BeginParagraph('');
        Document.AddText(status_txt);
        Document.AddImage('macro:' + status_file);
        Document.EndParagraph();
    }
};

DocEngine.prototype.scroll_hor = function(macro, ts) {
    this.add_bubble_text(macro, true);
    this.draw_index(macro);
    this.set_cur_sc(this.create_page_image(macro));
    if (this.cur_sc) {
        this.add_screenshot(this.cur_sc);
    }
};

DocEngine.prototype.scroll_vert = DocEngine.prototype.scroll_hor;

DocEngine.prototype.screenshot_part = function(macro, ts) {
    if (macro.ParamSpecified("caption")) {
        var text = macro.GetParam("caption");
        if (text != "") {
            var parastyle = this.h_(1);
            this.add_text_paragraph(parastyle, text);
        }
    }
    var sc = this.create_page_image(macro);
    if (sc) {
        var sc_rect = macro.GetParam("screenshot_rect");
        if (sc_rect && sc.image) {
            sc.image.ChangeCoord(1, 1, -sc_rect.left, -sc_rect.top);
        }
        sc.caption = macro.GetParam("caption");
        sc.scale = macro.GetParam ("imagesize");
        sc.alt_text = macro.GetParam("caption"); // Alternative Text
        this.add_screenshot(sc);
        if (macro.GetParam("show_actions")) {
            Log("screenshot_part sc:" + O2S(sc));
            this.set_cur_sc(sc);
        } else {
            this.screenshot_apply_(sc);
        }
    }
};

DocEngine.prototype.beschreibung = function(macro, ts) {
    Log("beschreibung");
    var t_style = this.style;
    if (this.style == 'work' || this.style == 'ppt' || !this.style) {
        t_style = 'standard';
    }
    // check, if needed for style
    if (macro.HasParam('in_' + t_style) && !macro.GetParam('in_' + t_style)) {
        return;
    }
    if (macro.GetParam("reset_indexcounter")) {
        this.current_index = 0;
    }
    var text = macro.GetParam("text");
    this.add_html_paragraph(text);
};

DocEngine.prototype.new_page = function(macro, ts) {
    Log("new_page");
    if (this.cfg.heading_from == "new_page") {
        if (macro.GetParam("doc_heading")) {
            var text = macro.GetParam("new_step");
            if (text != "") {
                var parastyle = this.h_(1);
                this.add_html_paragraph(parastyle, text);
            }
        }
    }
    var sc = this.create_page_image(macro);
    this.set_cur_sc(sc);
    if (this.cur_sc) {
        this.add_screenshot(this.cur_sc); 
    }  
};

DocEngine.prototype.new_window = DocEngine.prototype.new_page;
DocEngine.prototype.imported_page = DocEngine.prototype.new_page;
DocEngine.prototype.new_slide = DocEngine.prototype.new_page;

DocEngine.prototype.doc_caption = function(macro, ts) {
    var caption = macro.GetParam("caption");
    var type = macro.GetParam("type");
    if (caption != "") {
        if (type != "") {
            this.add_text_paragraph(macro.GetParam("type"), caption);
        } else {
            this.add_text_paragraph(this.h_(0), caption);
        }
    }
};

DocEngine.prototype.page_break = function(macro, ts) {
    Log("Page Break");
    var t_style = this.style;
    if (this.style == 'work' || !this.style) {
        t_style = 'standard';
    }
    // check, if needed for style
    if (macro.HasParam('in_' + t_style) && !macro.GetParam('in_' + t_style)) {
        // Log('nothing to do for ' + t_style);
        return;
    }
    this.close_table();
    Document.PageBreak();
};

DocEngine.prototype.doc_include = function(macro, ts) {
    Log("include " + macro.GetParam("filename"));
    Document.AddInclude(macro.GetParam("filename"));
};

DocEngine.prototype.kurs = function(macro, ts) {
    var title = macro.GetParam("titel");
    var bezeichnung = macro.GetParam("bezeichnung");
    var comment = macro.GetParam("macro_comment");
    if (title.length) {
        this.add_text_paragraph('title', title);
    }
    if (bezeichnung.length) {
        this.add_text_paragraph('description', bezeichnung);
    }
    if (comment.length && this.more_details) {
        this.add_text_paragraph('comment', comment);
    }
};

DocEngine.prototype.input_text = function(macro, ts) {
    this.add_bubble_text(macro, true);
    if (this.more_details && macro.HasParam("regexp") && macro.GetParam("regexp") ) {
        this.add_text_paragraph("", this.translate_("regEx") + ": " + macro.GetParam("regexp")); // dps1245
    }
    this.overlay_screenshot(macro);
    this.draw_index(macro);
};

DocEngine.prototype.select_single = DocEngine.prototype.input_text;
DocEngine.prototype.input_radio = DocEngine.prototype.input_text;

DocEngine.prototype.explanation = function(macro, ts) {
    this.add_bubble_text(macro, true);
    this.draw_index(macro);
};

DocEngine.prototype.free_marker = function(macro, ts) {
    if (this.add_bubble_text(macro, true)) {
        this.draw_index(macro);
    } else {
        this.draw_frame(macro);
    }
};

DocEngine.prototype.free_highlight = function(macro, ts) {
    this.draw_frame(macro);
};

DocEngine.prototype.arrow = function(macro, ts) {
    if (this.cur_sc == null) return;
    var rect = this.get_doc_rect_(macro);
    if (rect == null) return;

    if (this.cur_sc.image != 0) {
        this.cur_sc.image.DrawArrow(rect,
                                    macro.GetParam("orientation") - 0,
                                    macro.GetParam("arrow_macro_color"),
                                    this.cfg.marker_border,
                                    this.cfg.arrow_width,
                                    this.cfg.arrow_len);
    }

    var arrow_text = macro.GetParam('text');
    if (arrow_text != "" && arrow_text != "&nbsp;"  ) {
        Log('arrow: text: ' + macro.GetParam('text'));
        Document.BeginParagraph("", false);
        Document.SetParaGreedy(true);
        Document.AddImage(this.docstyle_path_("image\\arrow.bmp"));
        this.add_html_paragraph(arrow_text);
        this.add_html_paragraph('\n');
        Document.EndParagraph();
    }
};

DocEngine.prototype.explanation_long = function(macro, ts) {
    if (macro.HasParam("type") && macro.GetParam("type") != "none") {
        var text = this.builder.GetMacroText(macro);
        var div = '</div>';
        if (text.indexOf(div) == text.length - div.length) {
            text = text + '<p>&nbsp;</p>';
        }
        this.draw_hinweis_table(text, this.hinweis_icon_addr(macro));
        if (macro.HasParam("show_hl_doc") && macro.GetParam("show_hl_doc")) {
            this.draw_frame(macro);
        }
    } else {
        this.add_bubble_text(macro, true);
        if (macro.GetParam("show_hl_doc")) {
            var rect = this.get_doc_rect_(macro);
            if (rect && rect.width && rect.height) {
                this.draw_index(macro);
            }
        }
    }
};

DocEngine.prototype.key_press = function(macro, ts) {
    this.add_bubble_text(macro, true);
};

DocEngine.prototype.handle_macro = function(macro, ts) {
    Log("-");
    Log("handle_macro " + macro.Template());
    this.close_revision_table(macro);
    if (macro.HasParam("doc_enable")) {
        var show = macro.GetParam("doc_enable");
        if (!show) return;
    }
    this.mac_ctx.macro = macro.GetParam('uid');
    Document.EnterScope(this.mac_ctx);
    Document.SetSrcContext(this.mac_ctx);
    this.macro_start(macro);
    
    if (this.more_details) {
        // work eq standard
        var st = this.style;
        if (st == "work") st = "standard";
        st = "in_" + st;
        var comment_p = macro.HasParam("macro_comment") 
                        ? "macro_comment"
                        : macro.HasParam("comment") ? "comment" : false;
        if (comment_p && (!macro.HasParam(st) || macro.GetParam(st))) { // DPS-12881, DPS-17743
            var comment = macro.GetParam(comment_p);
            if (comment.length) {
                this.add_text_paragraph("", this.translate_(comment_p) + ": " + comment);
            }
        }
    }
    var fn = this[macro.Template()];
    if (typeof(fn) == 'function') {
        this[macro.Template()](macro, ts);
    } else {
        Document.LeaveScope(this.mac_ctx);
        return false;
    }
    this.macro_finish(macro);
    Document.LeaveScope(this.mac_ctx);
};

DocEngine.prototype.write_jump_target = function(macro) {
    if (macro.HasParam("jump_target")) {
        var jt = macro.GetParam("jump_target");
        if (jt.length && jt in this.jump_targets) {
            Log ("has jump_target");
            Document.AddHtmlText(this.builder.ProjTrans ("branch.jump_target") + " ");
            var title = this.jump_targets[jt];
            Document.BeginAHref("#" + jt, false, "", title);
            Document.AddText(title);
            Document.EndAHref();
        }
    }
}

DocEngine.prototype.overlay_screenshot = function(macro) {
    if (this.cur_sc == null) return;

    var mres = macro.GetResource();
    var screenshot_file;
    if (mres) {
        screenshot_file = macro.GetParam("screenshot_file");
    } else {
        return;
    }
    if (screenshot_file.length != 0) {
        var overlay = new ImageBuilder();
        if (!overlay.Load(mres, screenshot_file, true)) {
            return;
        }
        var pos;
        if (macro.ParamSpecified("overlay_pos")) {
            pos = macro.GetParam("overlay_pos");
        } else {
            pos = this.get_doc_rect_(macro);
            if (pos == null) return;
        }
        log(O2S(pos));
        this.cur_sc.image.Overlay(pos.x || pos.left || 0, pos.y || pos.top || 0, overlay);
    }
};

DocEngine.prototype.screenshot_apply_ = function(sc) {
    if (sc) {
        if (0 && sc.crop_rect) {
            sc.image.Crop(sc.crop_rect);
        }
        if (0 && sc.border) {
            sc.image.Border(sc.border, this.cfg.screenshot_border_color);
        }
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

var NEW_PAGE_MACRO_NAMES = {
    new_page: true,
    new_slide: true,
    imported_page: true,
    new_window: true
};

DocEngine.prototype.has_index_ = function(macro) {
    var name = macro.Template();
    if (!(name in this)) {
        return false;
    }
    if (NEW_PAGE_MACRO_NAMES[name]) return false;
    if (name == "screenshot_part") return false;
    if (macro.HasParam("doc_enable") && !macro.GetParam("doc_enable")) return false;
    if (name == "explanation_long" && macro.GetParam("type") != "none") return false;
    
    var only_highlight = this.cfg.doc_index_scope.indexOf("frame") != -1;
    if (only_highlight) {
        if (!macro.HasParam("screenshot_rect")) return false;
        if (name == "explanation_long" && !macro.GetParam("show_hl_doc")) return false;
    }
    if (!(this.builder.GetMacroText(macro))) return false;
    return true;
}

DocEngine.prototype.format_index_ = function(curr_ind) {
    return this.cfg.doc_index_style.replace("%N",this.current_index);
}

DocEngine.prototype.add_bubble_text = function(macro, with_index) {
    if (!this.cfg.show_bubble_text) return;
    if (this.cfg.doc_index_scope == "none") {
        with_index = false;
    }
    var text = this.builder.GetMacroText(macro);
    var branch_prefix = this.in_branch ?
        "<b>-</b>&nbsp;" : "";

    if (with_index && this.has_index_(macro)) { // && !this.in_branch
        this.current_index++;
        var doc_index = this.format_index_(this.current_index);
        if (text.length == 0) return false;
        Document.BeginParagraph('', true);
        Document.SetParaGreedy(true);
        Document.AddHtmlText(branch_prefix + doc_index + "&nbsp;");
        this.add_html_paragraph(text);
    } else {
        Document.BeginParagraph('', false);
        Document.EndParagraph();
        this.add_html_paragraph(branch_prefix + text);
        Document.BeginParagraph('', false);
        Document.EndParagraph();
    }
    return true;
};

DocEngine.prototype.get_doc_rect_ = function(macro) {
    var rect = macro.GetParam("screenshot_rect");
    if (!rect && macro.HasParam("ctl_rect")) {
        rect = macro.GetParam("ctl_rect");
    }
    if (!rect) {
        return null;
    } else {
        return rect;
    }
}

DocEngine.prototype.get_crop_rect_ = function(macro) {
    var rect = null;
    if (macro.Template() != "screenshot_part" && macro.HasParam("screenshot_rect")) {
        rect = macro.GetParam("screenshot_rect");
    }
    return rect;
}

DocEngine.prototype.draw_index = function(macro) {
    if (!this.cfg.show_bubble_text) return;
    if (this.cur_sc == null) return;
    var rect = this.get_doc_rect_(macro);
    if (rect == null) return;
    
    if (this.cur_sc.image ) {
        if (this.has_index_(macro) && this.cfg.doc_index_scope != "none" && macro.HasParam("marker_orientation")) {
            Log("Frame: " + rect.left + ", " + rect.top + " " + rect.width + " x " + rect.height);
            this.cur_sc.image.IndexedRect(rect,
                                           this.cfg.marker_border,
                                           this.cfg.marker_color,
                                           this.cfg.marker_offset,
                                           this.current_index,
                                           macro.GetParam("marker_orientation"),
                                           true,
                                           this.cfg.marker_text_color,
                                           this.cfg.marker_bg_color);
        } else {
            this.cur_sc.image.RoundedRect(rect,
                                          this.cfg.marker_border,
                                          this.cfg.marker_color,
                                          this.cfg.marker_offset,
                                          0);
        }
    }
};

DocEngine.prototype.set_cur_sc = function(sc) {
    Log ("set_cur_sc " + this.doc_index_scope);
    if (this.cur_sc) {
        this.screenshot_apply_(this.cur_sc);
    }
    this.cur_sc = sc;
    if (this.doc_index_scope && this.doc_index_scope.indexOf("tourstop") != -1) this.current_index = 0;
};

DocEngine.prototype.add_screenshot = function(sc) {
    Log("add_screenshot");
    if (sc.scale <= 0) sc.scale = 100;
    Log("Scale of " + sc.temp_file + ":" + sc.scale);
    sc.scale *= this.cfg.image_scale / 100;
    Log("Scale " + sc.scale);
    this.decorate_output( function () {
    Document.BeginParagraph("Screenshot");
    Document.AddImage(sc.image, -1, -1, sc.caption, sc.scale, sc.scale, sc.alt_text);
    Document.EndParagraph();
    });

    if (this.cfg.images_with_caption) {
        if (sc.caption != "") {
            this.add_text_paragraph('caption', sc.caption);
        } else {
            this.add_text_paragraph('caption', this.builder.ProjTrans('imgCaption') + " " + this.img_caption_index++);
        }
    }
};


DocEngine.prototype.draw_frame = function(macro) {
    if (!this.cfg.show_bubble_text) return;
    if (this.cur_sc == null) return;

    var macro_col = macro.HasParam("highlight_rgb")? macro.GetParam("highlight_rgb") 
                    : this.cfg.marker_color;
    var rect = this.get_doc_rect_(macro);
    if (rect == null) return;
    if (this.cur_sc.image != 0) {
        this.cur_sc.image.RoundedRect(rect,
                                      this.cfg.marker_border,
                                      macro_col,
                                      this.cfg.marker_offset,
                                      0);
    }
};

DocEngine.prototype.define_styles = function() {
    Log("define_styles :" + this.cfg);
    // TCODE
    Document.SetCurrCellStyle("standard_cell");
    Document.CellWidth = 360.0;
    Document.CellPadding(2.0, 2.0, 2.0, 2.0);
    Document.CellVerticalAlign = -2;
    Document.SetCurrCellStyle("small_cell");
    Document.CellWidth = 90.0;
    Document.CellPadding(2.0, 2.0, 2.0, 2.0);
    Document.CellVerticalAlign = -2;
    Document.SetCurrRowStyle("standard_row");
    Document.RowHeight = 14.0;
    Document.SetRowCellStyles("small_cell", "standard_cell");
    Document.SetCurrTableStyle("TCODE_TABLE");
    Document.TableBorder = 1;
    Document.TablePreferredWidth = 500.0;
    Document.TableSpacing = 0;
    Document.TableRowStyle = "standard_row";
    
    // HINWEIS
    Document.SetCurrCellStyle("extra_image_cell");
    Document.CellWidth = 50;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.SetCurrCellStyle("extra_text_cell");
    Document.CellWidth = 400;
    Document.CellBgColor = 0xe0e0e0;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.SetCurrRowStyle("extra_row");
    Document.RowHeight = 34.0;
    Document.SetRowCellStyles("extra_image_cell", "extra_text_cell");
    Document.SetCurrTableStyle("extra");
    Document.TableLeftIndent = this.cfg.hinweis_left_indent;
    Document.TableBorder = 1;
    Document.TablePreferredWidth = 432.3;
    Document.TableSpacing = 0.0;
    Document.TableRowStyle = "extra_row";

    // QUIZ
    Document.SetCurrCellStyle("quiz_mchoice_cell1");
    Document.CellWidth = 20.0;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.SetCurrCellStyle("quiz_mchoice_cell2");
    Document.CellWidth = 360.0;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.SetCurrCellStyle("quiz_match_cell1");
    Document.CellWidth = 100.0;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.SetCurrCellStyle("quiz_scale_cell1");
    Document.CellWidth = 170.0;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.SetCurrCellStyle("quiz_scale_cell2");
    Document.CellWidth = 40.0;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.SetCurrCellStyle("quiz_match_cell2");
    Document.CellWidth = 180.0;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.SetCurrCellStyle("quiz_full_cell");
    Document.CellWidth = 380.0;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.SetCurrRowStyle("quiz_mchoice_row");
    Document.RowHeight = 12.0;
    Document.SetRowCellStyles("quiz_mchoice_cell1", "quiz_mchoice_cell2");
    Document.SetCurrRowStyle("quiz_match_row");
    Document.RowHeight = 12.0;
    Document.SetRowCellStyles("quiz_match_cell1", "quiz_match_cell2", "quiz_match_cell1");
    Document.SetCurrRowStyle("quiz_scale_row");
    Document.RowHeight = 12.0;
    Document.SetRowCellStyles("quiz_scale_cell1", "quiz_scale_cell2", "quiz_scale_cell1");
    Document.SetCurrTableStyle("mchoice_quiz");
    Document.TableBorder = 1;
    Document.TableSpacing = 0.0;
    Document.TableRowStyle = "quiz_mchoice_row";
    Document.SetCurrTableStyle("match_quiz");
    Document.TableBorder = 1;
    Document.TableSpacing = 0.0;
    Document.TableRowStyle = "quiz_match_row";
    Document.SetCurrTableStyle("scale_quiz");
    Document.TableBorder = 1;
    Document.TableSpacing = 0.0;
    Document.TableRowStyle = "quiz_scale_row";
    Document.SetCurrParaStyle("description");
    Document.SetCurrParaStyle("tcode");
    Document.ParaFontSize = 10;
    Document.ParaBold = true;
    Document.SetCurrParaStyle("branch_header");
    Document.ParaBold = true;
    Document.SetCurrParaStyle("bubble_text");
    Document.SetCurrParaStyle("bubble_text_center");
    Document.ParaAlign = "center";
    Document.SetCurrParaStyle("center");
    Document.ParaAlign = "center";
    Document.SetCurrParaStyle("right");
    Document.ParaAlign = "right";
    Document.SetCurrParaStyle("hint_box");
    Document.ParaBold = true;
    Document.SetCurrParaStyle("arrow");
    Document.ParaSpaceBefore = 36;

    // revision table
    Document.SetCurrCellStyle("revision_c1");
    Document.CellWidth = 75;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.CellBgColor = 0xffffff;
    Document.SetCurrCellStyle("revision_c2");
    Document.CellWidth = 200;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.CellBgColor = 0xffffff;
    Document.SetCurrCellStyle("revision_c3");
    Document.CellWidth = 100;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.CellBgColor = 0xffffff;
    Document.SetCurrCellStyle("revision_c4");
    Document.CellWidth = 75;
    Document.CellPadding(3.5, 3.5, 3.5, 3.5);
    Document.CellBgColor = 0xffffff;
    Document.SetCurrRowStyle("revision_row");
    Document.RowHeight = 12.0;
    Document.SetRowCellStyles("revision_c1",
                              "revision_c2",
                              "revision_c3",
                              "revision_c4");
    Document.SetCurrTableStyle("revision_table");
    Document.TableBorder = 1;
    Document.TableRowStyle = "revision_row";

    // Logon Table
    Document.SetCurrCellStyle("logon_cell");
    Document.CellWidth = 150;
    Document.CellPadding(4.5, 5.5, 3.5, 3.5);
    Document.SetCurrRowStyle("logon_row");
    Document.RowHeight = 20.0;
    Document.SetRowCellStyles("logon_cell", "logon_cell", "logon_cell");
    Document.SetCurrTableStyle("logon");
    Document.TableBorder = 1;
    Document.TablePreferredWidth = 450;
    Document.TableSpacing = 0.0;
    Document.TableRowStyle = "logon_row";
    Document.SetCurrParaStyle("space1");
    Document.ParaSpaceBefore = 40;
    Document.SetCurrParaStyle("space2");
    Document.ParaSpaceBefore = 80;
    Document.SetCurrParaStyle("space3");
    Document.ParaSpaceBefore = 120;
    Document.SetCurrParaStyle("logon_box");
    Document.ParaBold = true;
    Document.SetCurrParaStyle(docstyle_maintableheading);
    Document.ParaBold = true;
};

DocEngine.prototype.handle_tourstop = function(ts) {
    var uid = ts.Name + "";
    Log("--");
    Log("DocEngine::handle_tourstop " + uid);
    this.in_branch = false;
    if (uid in this.jump_targets) {
        Log ("found in jump_targets:" + uid);
        this.bookmark_pending = uid;
    }
    if (this.cfg.heading_from == "tourstop" && this.include_title) {
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

DocEngine.prototype.finish = function() {
    this.set_cur_sc(null);
};

DocEngine.prototype.disable_chart = function() {
    this.chart_enabled = 0;
}

DocEngine.prototype.add_project_info = function() {
    Document.SetSrcContext(this.prj_ctx);
    this.add_html_paragraph(this.project.Description);

    if (this.more_details) {
        this.add_text_paragraph(this.h_(1),
                                this.translate_("project_details"));
        if (this.project.Notes.length) {
            this.add_text_paragraph(this.h_(2),
                                    this.translate_("project_message_log"));
            this.add_text_paragraph("", this.project.Notes);
        }
        if (this.project.Categories.length) {
            this.add_text_paragraph("",
                                    this.translate_("project_categories") + ": " +
                                    this.project.Categories);
        }
        this.add_text_paragraph("",
                                this.translate_("max_score") + ": " +
                                this.project.MaxScore);
        this.add_text_paragraph("",
                                this.translate_("mastery_score") + ": " +
                                this.project.MasteryScore);
        this.add_text_paragraph("",
                                this.translate_("project_language") + ": " +
                                this.translate_("lang_" + this.project.Language));
    }
}

DocEngine.prototype.add_project_shortdescp = function() {
    Document.SetSrcContext(this.prj_ctx);
    this.add_html_paragraph(this.project.ShortDesc);
}

function wac_enter(wac, ctx) {
    var wac_context = CreateContext(wac.ClassId, wac.LocalId);
    Document.SetSrcContext(wac_context);
    Document.EnterScope(wac.ClassId, wac.LocalId);
    ctx.context_stack.push(wac_context);
}

function wac_leave(wac, ctx) {
    var wac_context = ctx.context_stack.pop();
    //DEBUG
    var OK = wac_context[wac.ClassId] == wac.LocalId;
    if (!OK) log("!!context stack inconsistent!!")
    Document.LeaveScope(wac_context);
}

DocEngine.prototype.collect_targets = function() {
    Log ("collect jump_targets1");
    // 1st: coollect uids
    for (var i = 0, n = this.project.NumTourstops(); i < n; i++) {
        var ts = this.project.GetTourstop(i);
        var macro = ts.NextMacro();
        while (macro != null) {
            if (macro.HasParam("jump_target")) {
                var jt = macro.GetParam("jump_target");
                if (jt != "") {
                    this.jump_targets[jt] = "";
                }
            }
            macro = ts.NextMacro(macro.TourPosition());
        }
    }
    // 2nd: set titles
    Log ("collect jump_targets seek titles");
    for (var i = 0, n = this.project.NumTourstops(); i < n; i++) {
        var ts = this.project.GetTourstop(i);
        var uid = ts.Name;
        // mark all tourstops as targets
        // find first macro with text (should be "new_page")
        var title = "";
        if (this.cfg.heading_from == "new_page") {
            var macro = ts.NextMacro();
            while (macro != null) {
                title = this.builder.GetMacroText(macro);
                if (title.length) {
                    title = remove_html(title);
                    break;
                }
                macro = ts.NextMacro(macro.TourPosition());
            }
        }
        if (!title.length) {
            title = ts.Caption;
        }
        if (title.length) {
            this.jump_targets[uid] = title;
        }
    }
}

DocEngine.prototype.SetProject = function(project, skip_styles) {
    Log("DocEngine:SetProject");
    this.project = project;
    this.prj_ctx = CreateContext("project", project.UID);
    this.prj_ctx.macroset = "standard"; // XXX retrieve current macroset
    this.mac_ctx = CreateContext("macro", "");
    this.mac_ctx.project = project.UID;
    this.mac_ctx.macroset = "standard"; // XXX retrieve current macroset
    
    if (skip_styles != true) {
        this.prj_ctx.style = WA.CurrentStyle();
        this.mac_ctx.style = WA.CurrentStyle();
    }
}

DocEngine.prototype.initialize = function() {
    Log("DocEngine:Initialize " + this.cfg);
    // call causes empty h1 line
    this.define_styles();
}

DocEngine.prototype.handle_tour_stops = function() {
    Log("DocEngine::handle_tour_stops");
    this.doc_index_scope = this.cfg.doc_index_scope;
    this.doc_index_style = this.cfg.doc_index_style;
    this.collect_targets();
    for (var i = 0, n = this.project.NumTourstops() ; i < n; i++) {
        CurProgress(i + 1);
        var ts = this.project.GetTourstop(i);
        var macro = ts.NextMacro();
        this.include_title = false;
        while (macro != null) {
            if (macro.Template() === "new_page") {
                this.include_title = macro.GetParam("doc_enable");
                break;
            }
            macro = ts.NextMacro(macro.TourPosition());
        }
        if (!(i == 0 && (ts.Caption == "Start" || ts.Caption != "Init"))) {
            this.handle_tourstop(ts);
        }
        macro = ts.NextMacro();
        while (macro != null) {
            this.handle_macro(macro, ts);
            macro = ts.NextMacro(macro.TourPosition());
        }

    }
    Log("end of ts processing");
    this.handle_end();
}

DocEngine.prototype.doc_input_table = function(macro, ts) {
    Log("macro: doc_input_table");
    var t_style = this.style;
    if (this.style == 'work' || !this.style) {
        t_style = 'standard';
    }
    // check, if needed for style
    if (macro.HasParam('in_' + t_style) && !macro.GetParam('in_' + t_style)) {
        return;
    }
    this.close_table();
    var doc_macros = new DocMacros();
    var doc_cfg = {ctx: this.mac_ctx};
    doc_cfg.project = this.project;
    var params = ["use_fieldname", "use_value", "use_bubbletext", "use_ROC", "use_description"];
    for (var i = 0, l = params.length; i < l; ++i) {
        var p = params[i];
        if (macro.HasParam(p)) {
            doc_cfg[p] = macro.GetParam(p);
        }
    }
    doc_cfg.doc_bubbles = this.cfg.doc_bubbles;
    doc_cfg.formats = this.cfg.formats;
    doc_macros.SetConfig(doc_cfg);
    doc_macros.add_line_break();
    doc_macros.doc_input_table(true);

    if (this.input_table_started) {
        Document.EndTable();
        Document.EndParagraph();
        this.after_table_();
    }
    doc_macros.add_line_break();
}

DocEngine.prototype.doc_revision_entry = function(macro, ts) {
  Log('-> doc_revision_entry');
  if (this.cfg.skip_revision_entries_in_content) return;

  var t_style = this.style;
  if (this.style == 'work' || !this.style) {
      t_style = 'standard';
  }
  // check, if needed for style
  if (macro.HasParam('in_' + t_style) && !macro.GetParam('in_' + t_style)) {
      return;
  }
  this.close_table();

  if (!this.revision_table_open) {
        this.revision_table_open = true;
        Document.BeginParagraph('Screenshot');
        this.before_table_();
        Document.BeginTable("revision_table");
        Document.BeginRow();
        Document.BeginCell();
        Document.CellBgColor = tbbgcolor;
        this.add_text_paragraph('bubble_text', this.builder.ProjTrans('change_date'));
        Document.EndCell();
        Document.BeginCell();
        Document.CellBgColor = tbbgcolor;
        this.add_text_paragraph('bubble_text', this.builder.ProjTrans('change'));
        Document.EndCell();
        Document.BeginCell();
        Document.CellBgColor = tbbgcolor;
        this.add_text_paragraph('bubble_text', this.builder.ProjTrans('changed_by'));
        Document.EndCell();
        Document.BeginCell();
        Document.CellBgColor = tbbgcolor;
        this.add_text_paragraph('bubble_text', this.builder.ProjTrans('change_id'));
        Document.EndCell();
        Document.EndRow();
    }
    // add current entry with html and &nbsp to get empty cell in html output
    Document.BeginRow();
    Document.BeginCell();
    this.add_text_paragraph(macro.GetParam("revision_date") + ' ');
    Document.EndCell();
    Document.BeginCell();
    this.add_text_paragraph(macro.GetParam("revision_changes")+ ' ');
    Document.EndCell();
    Document.BeginCell();
    this.add_text_paragraph(macro.GetParam("revision_changed_by")+ ' ');
    Document.EndCell();
    Document.BeginCell();
    this.add_text_paragraph(macro.GetParam("revision_id")+ ' ');
    Document.EndCell();
    Document.EndRow();
    // end of table can only be added at next macro, should be
}

DocEngine.prototype.close_revision_table = function(macro) {
    if (this.revision_table_open && macro.Template() != 'doc_revision_entry') {
      Document.EndTable();
      Document.EndParagraph();
      this.revision_table_open = false;
      this.after_table_();
    }
}

DocEngine.prototype.doc_logon_table = function(macro, ts) {
    Log('Macro: doc_logon_table');
    var t_style = this.style;
    if (this.style == 'work' || !this.style) {
        t_style = 'standard';
    }
    // check, if needed for style
    if (macro.HasParam('in_' + t_style) && !macro.GetParam('in_' + t_style)) {
        return;
    }
    this.close_table();
    this.before_table_();
    Document.BeginParagraph('Screenshot');
    Document.BeginTable("logon");
    Document.BeginRow();
    Document.BeginCell();
    Document.CellBgColor = tbbgcolor;
    Document.AddImage(this.docstyle_path_("image\\workcenter_word.bmp"), -1, -1, '', -1, -1);
    this.add_html_paragraph(docstyle_maintableheading, this.builder.ProjTrans('logon_user_name') + '/' + this.builder.ProjTrans('logon_role'));
    Document.EndCell();
    Document.BeginCell();
    this.add_text_paragraph('logon_box', macro.GetParam('logon_id'));
    Document.EndCell();
    Document.BeginCell();
    this.add_text_paragraph('logon_box', macro.GetParam('role'));
    Document.EndCell();
    Document.EndRow();
    Document.BeginRow();
    Document.BeginCell();
    Document.CellBgColor = tbbgcolor;
    Document.AddImage(this.docstyle_path_("image\\workcenter_word.bmp"), -1, -1, '', -1, -1);
    this.add_html_paragraph(docstyle_maintableheading, this.builder.ProjTrans('logon_work_center') + '/' + this.builder.ProjTrans('logon_view') );
    Document.EndCell();
    Document.BeginCell();
    this.add_text_paragraph('logon_box', macro.GetParam('work_center'));
    Document.EndCell();
    Document.BeginCell();
    this.add_text_paragraph('logon_box', macro.GetParam('view'));
    Document.EndCell();
    Document.EndRow();
    Document.EndTable();
    Document.EndParagraph();
    this.after_table_();
}


DocEngine.prototype.add_cdoc_frag = function(id) {
    var wac = WA.GetObject(id);
    if (wac) {
        Document.SetSrcContext(CreateContext(wac.ClassId, wac.LocalId));
        Document.EnterScope(wac.ClassId, wac.LocalId);
        if (this.cfg.print_cdoc_header) {
            this.builder.Header(0, wac.Caption);
        }
        this.builder.FormattedParagraph(wac.GetParam("description"));
        Document.LeaveScope(wac.ClassId, wac.LocalId);
    } else {
        log("cdoc: not found");
    }
};

DocEngine.prototype.add_slide_frag = function(slideid) {
    var wac = WA.GetObject(slideid);
    if (wac) {
        var res = wac.GetResource();
        if (!res) return;
        Document.LeaveScope("project", this.project.UID);
        Document.SetSrcContext(CreateContext("slide", wac.LocalId));
        Document.EnterScope("slide", wac.LocalId);
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
        Document.LeaveScope(wac.ClassId, wac.LocalId);
        Document.EnterScope("project", this.project.UID);
    }
};

DocEngine.prototype.add_title_frag = function(show_cover) {
    log("DocEngineStd::add_title_frag");
    this.builder.Header(0, this.project.DisplayName);
}

DocEngine.prototype.add_input_vals_frag = function() {
    log ("DocEngineStd::add_input_vals_frag");
    doc_macros = new DocMacros();
    doc_macros.SetConfig(this.cfg);
    doc_macros.doc_input_table();
};

DocEngine.prototype.add_rev_history_frag = function() {
    log ("DocEngineStd::add_rev_history_frag");
    doc_macros = new DocMacros();
    doc_macros.SetConfig(this.cfg);
    doc_macros.rev_history();
};

DocEngine.prototype.add_glossary_frag = function(postpone) {
    log ("DocEngineStd::add_glossary_frag");
    if (postpone) {
        Document.CollectGlossary();
        var gloss_level = this.cfg.singledoc_headinglevel + 1;
        Document.BeginParagraph('h' + gloss_level);
        Document.AddText(general_trans("docGlossaryHeader", this.cfg.Language));
        Document.EndParagraph();
        Document.LineBreak();
    } else {
        add_glossary_items(this.cfg.project.Language);
    }
};

function DocEngineStd(style) {
    if (!style) return;
    Log ("DocEngineSTD ctor:" + O2S(style));
    this.ctor_(style);
    if (typeof(style) == 'string' && style == 'work') {
        this.more_details = true; 
        Log('WORK');
    } else {
        this.more_details = false;
    }
    this.style = style;
    this.capabilities_ = {branches: true, quizzes: true};
};

DocEngineStd.prototype = new DocEngine();
DocEngineStd.superClass = DocEngine.prototype;


DocEngineStd.prototype.macro_finish = function(macro) {
    this.write_jump_target(macro);
};

DocEngineStd.prototype.branch_on = function(macro, ts) {
    if (this.cfg.show_branch) {
        var branch_para;
        if (this.cfg.branch_as_header) {
            branch_para = this.h_(2);
        } else {
            branch_para = "branch_header";
        }
        this.add_html_paragraph(branch_para, this.builder.ProjTrans("branch.prefix"));
        this.in_branch = true;
    }
};



DocEngineStd.prototype.branch_off = function(macro, ts) {
    this.in_branch = false;
};

DocEngine.prototype.new_window_close = function(macro, ts) {};
DocEngine.prototype.end_unit = function(macro, ts) {};
DocEngine.prototype.form_on = function(macro, ts) {};
DocEngine.prototype.form_off = function(macro, ts) {};
DocEngine.prototype.mode_change = function(macro, ts) {};
DocEngine.prototype.mode_change_end = function(macro, ts) {};
DocEngine.prototype.hpqc_header = function(macro, ts) {};
DocEngine.prototype.goto_tourstop = function(macro, ts) {}
DocEngine.prototype.macro_start = function(macro) {};
DocEngine.prototype.macro_finish = function(macro) {};
DocEngine.prototype.handle_end = function() {};
DocEngine.prototype.close_table = function() {};
DocEngineStd.prototype.macro_start = function(macro) {};
