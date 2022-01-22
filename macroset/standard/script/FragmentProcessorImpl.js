//includes are coming either from FragmentProcessor or FragmentProcessorNavi

function FragmentProcessor(Config) {
    log("FragmentProcessor:ctor");
    this.cfg = Config;
    this.doc_eng = null;
    this.builder = new DocuBuilder(Config);
}

FragmentProcessor.prototype.prepare_doc_eng_ = function (style) {
    var doc_eng = CreateDocEngine(style);
    doc_eng.SetConfig(this.cfg);
    doc_eng.initialize();
    return doc_eng;
}

FragmentProcessor.prototype.Initialize = function(skip_styles) {
    log("FragmentProcessor:Initialize");
    this.doc_eng = this.prepare_doc_eng_(this.cfg.style);
    this.doc_eng.format = this.format;

    this.doc_eng.SetProject(this.cfg.project, skip_styles);
    return true;
}

FragmentProcessor.prototype.Finish = function() {
    log("FragmentProcessor:Finish");
    this.doc_eng.finish();
}

FragmentProcessor.prototype.frag_type_ = function(index) {
    return "frg_" + index;
}

FragmentProcessor.prototype.frag_param_ = function(index) {
    var fr_t = this.frag_type_(index);
    if (fr_t in this.cfg) {
        var val = this.cfg[fr_t];
        return "frg_" + index + "_" + val;
    } else {
        return null;
    }
}

FragmentProcessor.prototype.ProcessAll = function() {
    var MAX_FRAGMENTS = 11;
    var toc_ind = 0;
    var gloss_ind = 0;
    // Process
    for (var i = 1; i <= MAX_FRAGMENTS; ++i) {
        var par_name = this.frag_type_(i);
        if (par_name in this.cfg) {
            if (!this.cfg.compound_doc) {
                Document.SetProperty("frag", i.toString());
            }
            if (this.cfg[par_name] === "print_glossary") {
                this.print_glossary(true);
                gloss_ind = i;
            } else if (this.cfg[par_name] === "toc") {
                this.toc(this.cfg[link], true);
                toc_ind = i;
            } else {
                var link = this.frag_param_(i);
                this.Process (this.cfg[par_name], this.cfg[link]);
            }
        }
    }
    //Postpone TOC
    if (gloss_ind > 0) {
        Document.SetProperty("frag", gloss_ind.toString());
        this.print_glossary(false);
    }
    if (toc_ind > 0) {
        Document.SetProperty("frag", toc_ind.toString());
        var link = this.frag_param_(toc_ind);
        this.toc(this.cfg[link])
    }
}

FragmentProcessor.prototype.Process = function (fragment_type, param) {
    if (fragment_type in this) {
        log ("FragmentProcessor: processing " + fragment_type);
        this[fragment_type](param);
    }
}

FragmentProcessor.prototype.caption = function(show_cover) {
    log("FragmentProcessor::caption")
    this.doc_eng.add_title_frag(show_cover);
}

FragmentProcessor.prototype.project_info = function() {
    log("FragmentProcessor::project_info")
    this.doc_eng.add_project_info();
}

FragmentProcessor.prototype.project_shortdescp = function() {
    log("FragmentProcessor::project_shortdescp")
    this.doc_eng.add_project_shortdescp();
}

FragmentProcessor.prototype.process_flow = function() {
    log("FragmentProcessor::process_flow")
    var restore_hide_screenshots = "hide_screenshots" in this.cfg && this.cfg.hide_screenshots;
    if (restore_hide_screenshots) {
        delete this.cfg.hide_screenshots;
    }
    var pf_engine = this.prepare_doc_eng_("process_flow");
    if (pf_engine) {
        pf_engine.SetProject(this.cfg.project);
        pf_engine.handle_tour_stops();
    }
    if (restore_hide_screenshots) {
        this.cfg.hide_screenshots = restore_hide_screenshots;
    }
}

FragmentProcessor.prototype.include_project = function(incl_proj_id) {
    log("FragmentProcessor::include_project")
    var incl_engine = this.prepare_doc_eng_(this.cfg.style);
    if (incl_engine) {
        log("include_engine is ready");
        var incl_proj_wac = WA.GetObject(incl_proj_id);
        if (incl_proj_wac) {
            log("project content is ready");
            var incl_proj = incl_proj_wac.Open();
            if (incl_proj) {
                log("project opened successfully");
                incl_engine.SetProject(incl_proj);
                incl_engine.handle_tour_stops();
            }
        }
    }
}

FragmentProcessor.prototype.toc = function(deep, postpone) {
    log("FragmentProcessor::toc")
    if (this.cfg.compound_doc) return;
    if (postpone) {
        this.builder.EmptyParagraph();
    } else {
        var ndeep = deep && deep >= 0 && deep < 10? parseInt(deep) : 4;
        Document.InsertTOC(ndeep);
    }
}

FragmentProcessor.prototype.full_body = function() {
    this.doc_eng.handle_tour_stops();
}

FragmentProcessor.prototype.fragment_separator = function(kind) {
    log("FragmentProcessor::fragment separator of kind:" + kind);
    if (kind == "page_break") {
        this.builder.EmptyParagraph();
        Document.PageBreak();
    } else if (kind == "space1") {
        this.builder.FormattedParagraph(" ", "space1")
    } else if (kind == "space2") {
        this.builder.FormattedParagraph(" ", "space2")
    } else if (kind == "space3") {
        this.builder.FormattedParagraph(" ", "space3")
    }
}

FragmentProcessor.prototype.slide = function (slideid) {
    if (!slideid) return;
    log ("FragmentProcessor::slide: " + slideid);
    this.doc_eng.add_slide_frag(slideid);
}

FragmentProcessor.prototype.image = function (imageid) {
    log ("FragmentProcessor::imageid: " + imageid);

    var id_elems = SplitFullId(imageid);
    log("my fullid: " + O2S(id_elems));
    var par_id = MakeFullId(id_elems[0], id_elems[1]);
    var fname = id_elems[2];
    log("parent fullid: " + par_id);
    var par_wac = WA.GetObject(par_id);
    if (par_wac) {
        var res = par_wac.GetResource();
        if (res && res.HasStream(fname)) {
            var path = res.FullPath() + "\\" + fname;
            this.builder.AlignedImageFromFile(path);
        }
    }
}

FragmentProcessor.prototype.html_text = function (html) {
    this.builder.FormattedParagraph(html);
}

FragmentProcessor.prototype.cdoc = function (id) {
    log ("FragmentProcessor::cdoc id: " + id);
    if (!id) return;
    this.doc_eng.add_cdoc_frag(id);
}

FragmentProcessor.prototype.input_vals = function () {
    log ("FragmentProcessor::input_vals");
    this.doc_eng.add_input_vals_frag();
}

FragmentProcessor.prototype.rev_history = function() {
    log ("FragmentProcessor::rev_history");
    this.doc_eng.add_rev_history_frag();
}

FragmentProcessor.prototype.print_glossary = function(postpone) {
    log ("FragmentProcessor::print_glossary");
    if (this.cfg.compound_doc) return;
    this.doc_eng.add_glossary_frag(postpone);
}