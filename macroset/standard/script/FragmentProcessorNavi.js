#use(macroset!standard:script/doc_util.js)
#use(macroset!standard:util.js)
#use(macroset!standard:script/lang.js)
#use(macroset!standard:script/DocuBuilder.js)
#use(macroset!standard:script/DocEngineImpl.js)
#use(macroset!standard:script/DocEngineHandsOn.js)
#use(macroset!standard:script/FragmentProcessorImpl.js)
//need full path for QR from DA

var ctx;

 var NaviDocConfig = {
        caption : 'standard_doc',
        sub_type : 'standard',
        cwa_recommended_sync_mode : 1,
        cwa_must_have : true,
        cwa_sync_vis : false,
        cwa_workflow_vis : false,
        formats: ['doc'],
        created_by : '_SYSTEM_',
        template : '',
        docstyle : 'docstyle',
        textstyles : 'text_styles',
        frg_1 : 'caption',
        frg_1_toc : 3,
        frg_1_fragment_separator : 'page_break',
        frg_2 : 'project_info',
        frg_2_toc : 3,
        frg_2_fragment_separator : 'page_break',
        frg_3 : 'none',
        frg_3_toc : 3,
        frg_3_fragment_separator : 'page_break',
        frg_4 : 'full_body',
        frg_4_toc : 3,
        frg_4_fragment_separator : 'page_break',
        frg_5 : 'none',
        frg_5_toc : 3,
        frg_5_fragment_separator : 'page_break',
        frg_6 : 'none',
        frg_6_toc : 3,
        frg_6_fragment_separator : 'page_break',
        frg_7 : 'none',
        frg_7_toc : 3,
        frg_7_fragment_separator : 'page_break',
        frg_8 : 'none',
        frg_8_toc : 3,
        frg_8_fragment_separator : 'page_break',
        frg_9 : 'none',
        frg_9_toc : 3,
        frg_9_fragment_separator : 'page_break',
        frg_10 : 'none',
        frg_10_toc : 3,
        frg_10_fragment_separator : 'page_break',
        frg_11 : 'none',
        frg_11_toc : 3,
        frg_11_fragment_separator : 'page_break',
        frg_12 : 'none',
        frg_12_toc : 3,
        frg_12_fragment_separator : 'page_break',
        show_bubble_text : true,
        doc_bubbles : 'demo',
        hinweis_left_indent : 0,
        heading_from : 'none',
        singledoc_headinglevel : 2,
        show_branch : true,
        branch_as_header : true,
        hide_screenshots : false,
        image_scale : 100,
        images_with_caption : false,
        image_caption_from_new_page : true,
        screenshot_border : 0,
        screenshot_border_color : 16777215,
        word_screenshot_format : 'rgb',
        html_screenshot_format : 'rgb',
        marker_offset : 2,
        marker_border : 3,
        marker_color : 255,
        marker_text_color : 0,
        marker_bg_color : 8454143,
        arrow_len : 30,
        arrow_width : 20,
        doc_index_scope : 'tourstop_frame',
        doc_index_style : '(%N)',
        quizzes_in_doc : true,
        print_solution : false,
        use_fieldname : true,
        use_value : true,
        use_bubbletext : false,
        use_ROC : false,
        use_description : true,
        skip_revision_entries_in_content : true,
        rev_history_sort_order : 'rev_history_sort_bydate',
        print_cdoc_header : false,
        print_slide_header : true,
        slide_format : 0,
        slide_details : true,
        book_image_max_width : 580,
        book_show_links : true,
        book_show_page_images : true,
        slide_refresh_preview : false 
};

function FragmentProcessorNavi(Config) {
    FragmentProcessor.prototype.constructor.call(this, Config);
}

FragmentProcessorNavi.prototype = new FragmentProcessor;
FragmentProcessorNavi.superClass = FragmentProcessor.prototype;

FragmentProcessor.prototype.init_translations_ = function () {
    this.progr_caption_ = winnavp_glossary.GetValue("IDS_PARSE_PROJECT");
}

FragmentProcessorNavi.prototype.prepare_doc_eng_ = function (style) {
    var doc_eng = new DocEngineHandsOn(style);
    doc_eng.SetConfig(this.cfg);
    doc_eng.initialize();
    return doc_eng;
}