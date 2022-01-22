function MacroRenderer() { };

MacroRenderer.prototype.sourceContext = {};

MacroRenderer.prototype._get_item = function (capt,dscr,trgt,ps) {
    dscr = !dscr || dscr === 'undefined' ? ' ' : dscr;
    return '<div style="font-size:10pt;color:'+ps.dscr_col+';">'+dscr+'</div><table cellspacing="0" cellpadding="0"><tr onclick="javascript:ctx.cfg_show(\''+trgt+'\',null,null)"><td style="cursor:pointer;" valign="middle"><img src="'+ps.link_img+'" border="0"/>&nbsp;&nbsp;</td><td><span onclick="" style="font-size:12pt;color:'+ps.item_col+';cursor:pointer;">'+capt+'</span></td></tr></table>';
}

MacroRenderer.prototype.end_unit = function(c, params) {
    if (!params.show_end_page || c.active_mode == 'praxis') return;

    c.udc.phi = 0.618033;
    var prst = {
        byD_FP25: {
            item_col: '#F0AB00',
            dscr_col: '#000000',
            capt_col: '#F0AB00',
            page_col: '#FFFFFF',
            capt_spc: '',
            link_img: 'style:image/tri_link_ora2.png',
            bg_col: '#9F9F9F',
            page_img: ''
        },
        Gold_Reflection: {
            item_col: '#2DA5FF',
            dscr_col: '#AFAFAF',
            capt_col: '#E8E8E8',
            page_col: 'transparent',
            capt_spc: '<br>',
            link_img: 'style:image/tri_link_2011.png',
            bg_col: '#232323',
            page_img: ''
        }
    };
    c.udc.intro_preset = c.udc.intro_preset || 'Gold_Reflection';
    var ps = prst[c.udc.intro_preset];
    var pc = new ParamChecker(c.defaults, "end_unit", params);
    pc.Check("ende", "TEXT");
    pc.Check("last_page_pause", "INTEGER", 0);
    pc.Check("end_caption", "TEXT");
    pc.Check("end_caption_p", "TEXT");
    pc.Check("end_caption_t", "TEXT");
    pc.Check("end_text", "HTML");
    pc.Check("end_text_p", "HTML");
    pc.Check("end_text_t_passed", "HTML");
    pc.Check("end_text_t_failed", "HTML");
    if (ctx.cfg_config('mode') === 'test') {
        var score = ctx_control.cfg_getscore();
        params.end_text_mode = score.current >= score.pass ? params.end_text_mode : params.end_text_mode2;
    }
    ////////// GENERAL (preset independant) START //////////
    var cont = '<p style="font-family:Arial Black;font-size:18pt;color:'+ps.capt_col+';" class="div">'+params.end_caption_mode+'</p>'+ps.capt_spc+'<span class="div" style="font-family:Arial;font-size:10pt;color:'+ps.dscr_col+';">'+params.end_text_mode+'</span><br>';
    cont += this._get_item(ctx.cfg_tr('btn_restart'), ' ', 'tourstop!2', ps);
    //SLIDE ELEMENT: page
    var slide_element = {};
    var imgsrc = ps.page_img;
    slide_element.background_image_centered = c.global_params.g_background_image_centered;
    slide_element.type = 'page';
    slide_element.id = params.uid;
    slide_element.border = 0;
    slide_element.background_color = ps.bg_col;
    slide_element.canvas_color = ps.page_col;
    slide_element.image = { id: imgsrc, w: c.udc.dump_w, h: c.udc.dump_h };
    slide_element.w = c.udc.dump_w;
    slide_element.h = c.udc.dump_h;
    slide_element.z = -4;
    slide_element.fontsizeInPt = 1;
    //SLIDE ELEMENT 0: page background image
    var se0 = {};
    se0.id = params.uid + 'bg';
    se0.x = 0;
    se0.y = 0;
    se0.border = 0;
    //SLIDE ELEMENT 1: end page text
    var se1 = {};
    se1.type = 'text';
    se1.id = params.uid + 'txt1';
    se1.text = cont;
    se1.z = 3;
    se1.w = 672;
    se1.h = 456;
    se1.background_color = 'transparent';
    se1.padding = 4;
    se1.border = 0;
    //SLIDE ELEMENT 2: application image link
    var se2 = {};
    se2.id = params.uid + 'image';
    se2.href = 'tourstop!2';
    se2.z = 8;
    se2.background_color = 'transparent';
    se2.padding = 0;
    se2.border = 0;
    ////////// GENERAL (preset independant) END //////////
    ////////// SPECIFIC (preset dependant) START //////////
    if (c.udc.intro_preset === 'Gold_Reflection') {
        //SLIDE ELEMENT 0: page background image
        se0.type = 'image';
        se0.image = { id: 'style:image/startpage.png', w: 995, h: 605 };
        se0.z = 1;
        se0.w = 995;
        se0.h = 605;
        se0.background_color = '#232323';
        se0.padding = 0;
        se0.onhide = params.uid + 'txt1.hide'; //on hide, hide next slide element
        //SLIDE ELEMENT 1: end page text
        se1.x = 336;
        se1.y = 14;
        //SLIDE ELEMENT 2: application image link
        se2.type = 'hrefarea';
        se2.text = '';
        se2.w = 250;
        se2.h = 240;
        se2.x = 28;
        se2.y = 330;
    } else {
        //SLIDE ELEMENT 0: gray background
        se0.type = 'hrefarea';
        se0.text = '';
        se0.z = 2;
        se0.w = slide_element.w;
        se0.h = Math.round(slide_element.h*c.udc.phi);
        se0.background_color = '#F4F4F4';
        se0.padding = 4;
        //SLIDE ELEMENT 1: end page text
        se1.x = 13;
        se1.y = 17;
        //SLIDE ELEMENT 2: application image
        se2.type = 'image';
        se2.image = { id: 'style:image/bbd_start_pic1.png', w: 261, h: 435 };
        se2.w = 266;
        se2.h = 435;
        se2.x = slide_element.w - se2.w - 30;
        se2.y = se0.h - Math.round(se2.h/2) - 40;
    }
    ////////// SPECIFIC (preset dependant) END //////////
    cleanupUndefined(slide_element);
    cleanupUndefined(se0);
    cleanupUndefined(se1);
    cleanupUndefined(se2);
    this.sourceContext = {_this: 'macro',
                        project: ctx.cfg_config('show'),
                        macro: params.uid
                        };
    c.cfg_setSourceContext(this.sourceContext);
    c.cfg_createElement(se0);
    c.cfg_createElement(se1);
    c.cfg_createElement(se2);
    c.cfg_createElement(slide_element);
}


MacroRenderer.prototype.intro_page = function(c, params) {
    if (c.active_mode == 'praxis') {
        delete c.intro_items;
        return;
    }
    
    c.udc.phi = 0.618033;
    var prst = {
        byD_FP25: {
            item_col: '#F0AB00',
            dscr_col: '#000000',
            capt_col: '#F0AB00',
            page_col: '#FFFFFF',
            capt_spc: '',
            link_img: 'style:image/tri_link_ora2.png',
            bg_col: '#9F9F9F',
            page_img: 'style:image/1.gif'
        },
        Gold_Reflection: {
            item_col: '#2DA5FF',
            dscr_col: '#AFAFAF',
            capt_col: '#E8E8E8',
            page_col: 'transparent',
            capt_spc: '<br>',
            link_img: 'style:image/tri_link_2011.png',
            bg_col: '#232323',
            page_img: ''
        }
    };
    var is_inter = !!params.inter_page_duration;
    var pc = new ParamChecker(c.defaults, "intro_page", params);
    pc.Check("caption", "TEXT");
    pc.Check("caption_p", "TEXT");
    pc.Check("caption_t", "TEXT");
    pc.Check("intro_text", "HTML");
    pc.Check("intro_text_p", "HTML");
    pc.Check("intro_text_t", "HTML");
    pc.Check("Preset", "ENUM", "Gold_Reflection");
    c.udc.intro_preset = params.Preset;
    var ps = prst[c.udc.intro_preset];
    var page_w = params.dump_page_size && params.dump_page_size.width ? params.dump_page_size.width : 995;
    var page_h = params.dump_page_size && params.dump_page_size.height ? params.dump_page_size.height : 605;
    c.udc.dump_w = page_w;
    c.udc.dump_h = page_h;
    var slide_element = {};
    slide_element.background_image_centered = c.global_params.g_background_image_centered;
    ////////// GENERAL (preset independant) START //////////
    //SLIDE ELEMENT: slide page
    slide_element.type = 'page';
    slide_element.id = params.uid;
    slide_element.border = 0;
    slide_element.background_color = ps.bg_col;
    slide_element.canvas_color = ps.page_col;
    slide_element.image = { id: ps.page_img, w: page_w, h: page_h };
    slide_element.w = page_w;
    slide_element.h = page_h;
    slide_element.z = -4;
    slide_element.onhide = params.uid + 'txt1.hide';
    //SLIDE ELEMENT 0: gray background
    var se0 = {};
    se0.id = params.uid + 'bg';
    se0.x = 0;
    se0.y = 0;
    se0.z = 2;
    se0.padding = 0;
    se0.border = 0;
    se0.onhide = params.uid + 'txt1.hide'; //on hide, hide next slide element
    //SET INTRO PAGE CONTENT HTML FROM INTRO PAGE ITEMS
    if (typeof(c.intro_items) == 'undefined') {
        c.intro_items = [];
    }
    var cont = '<p style="font-family:Arial Black;font-size:18pt;color:'+ps.capt_col+';" class="div">'+params.caption_mode+'</p>'+ps.capt_spc+'<span class="div" style="font-family:Arial;font-size:10pt;color:'+ps.dscr_col+';">'+params.intro_text_mode+'</span><br><br><br>';
    for (var i = 0; i < c.intro_items.length; i++) {
        var trig = is_inter ? 'trigger!' : 'tourstop!';
        var targ = is_inter ? params.uid+'inter'+i+'.show' : c.intro_items[i].link_target;
        targ = targ ? targ : 3;
        cont += this._get_item(c.intro_items[i].link_text, c.intro_items[i].intro_text, trig+targ, ps);
    }
    //SLIDE ELEMENT 1: dynamic text & links
    var se1 = {};
    se1.type = 'text';
    se1.id = params.uid + 'txt1';
    se1.z = 3;
    se1.h = 456;
    se1.text = cont;
    se1.background_color = 'transparent';
    se1.padding = 4;
    se1.border = 0;
    se1.onhide = params.uid + 'image.hide'; //on hide, hide next slide element
    //SLIDE ELEMENT 2: application image
    var se2 = {};
    se2.id = params.uid + 'image';
    se2.z = 4;
    se2.href = 'action!PLAY';
    se2.background_color = 'transparent';
    se2.padding = 0;
    se2.border = 0;
    //SET INTER PAGE(s) CONTENT
    var inter_elements = [];
    for (var j = 0; j < c.intro_items.length; j += 1) {
        var cap = c.intro_items[j].link_text;
        var trg = c.intro_items[j].link_target;
        var se3 = {};
        se3.type = 'text';
        se3.id = params.uid + 'inter' + j;
        se3.x = 10;
        se3.y = 15;
        se3.w = 975;
        se3.h = 575;
        se3.z = 5;
        se3.text = '<table cellspacing=\"0\" cellpadding=\"0\"><tr height=\"560\"><td valign=\"middle\"><span style=\"font-family:Arial Black;font-size:18pt;color:'+ps.capt_col+';\">'+cap+'</span></td></tr></table>';
        se3.background_color = 'transparent';
        se3.padding = 0;
        se3.border = 0;
        se3.hidden = 1;
        se3.onshow = params.uid + 'timer'+j+'.start';
        se3.onhide = params.uid + 'inter_link'+j+'.follow_link';
        var se4 = {};
        se4.type = 'hrefarea';
        se4.id = params.uid + 'inter_link' + j;
        se4.x = 10;
        se4.y = 15;
        se4.w = 200;
        se4.h = 40;
        se4.z = 5;
        se4.href = 'tourstop!'+trg;
        se4.background_color = 'transparent';
        se4.padding = 0;
        se4.border = 0;
        se4.hidden = 1;
        var se5 = {};
        se5.type = 'timer';
        se5.id = params.uid + 'timer' + j;
        se5.name = 'inter_timer' + j;
        se5.x = 437;
        se5.y = 5;
        se5.w = 100;
        se5.h = 28;
        se5.z = 8;
        se5.time0 = 1;
        se5.ontimeout0 = params.uid + 'bg.hide';
        se5.time1 = Math.round(params.inter_page_duration*20);
        se5.ontimeout1 = params.uid+'inter'+j+'.hide';
        se5.border = 0;
        se5.hidden = 1;
        se5.background_color = '#fcaa00';

        inter_elements.push(se3,se4,se5);
    }
    for (var j = 0; j < inter_elements.length; j += 1) {
        cleanupUndefined(inter_elements[j]);
        c.cfg_createElement(inter_elements[j]);
    }
    delete c.intro_items;
    ////////// GENERAL (preset independant) END //////////
    ////////// SPECIFIC (preset dependant) START //////////
    if (params.Preset === 'Gold_Reflection') {
        se0.type = 'image';
        se0.image = { id: 'style:image/startpage.png', w: 995, h: 605 };
        se0.w = 995;
        se0.h = 605;
        se0.background_color = '#232323';
        se1.x = 336;
        se1.y = 14;
        se1.w = 640;
        se2.type = 'hrefarea';
        se2.w = 250;
        se2.h = 240;
        se2.x = 28;
        se2.y = 330;
        se2.text = '';
    } else {
        se0.type = 'hrefarea';
        se0.text = '';
        se0.w = page_w;
        se0.h = Math.round(page_h*c.udc.phi);
        se0.background_color = '#F4F4F4';
        se1.x = 13;
        se1.y = 17;
        se1.w = 672;
        se2.type = 'image';
        se2.w = 266;
        se2.h = 435;
        se2.x = page_w - 296; // page_w-(se2.w-30)
        se2.y = Math.round(page_h*c.udc.phi) - 258; //se0.h-(se2.h/2)-40
        se2.image = { id: 'style:image/bbd_start_pic1.png', w: 261, h: 435 };
    }
    ////////// SPECIFIC (preset dependant) END //////////
    //CLEAN-UP ELEMENTS AND CREATE SLIDE
    cleanupUndefined(se0);
    cleanupUndefined(se1);
    cleanupUndefined(se2);
    cleanupUndefined(slide_element);
    this.sourceContext = {_this: 'macro',
                        project: ctx.cfg_config('show'),
                        macro: params.uid
                        };
    c.cfg_setSourceContext(this.sourceContext);
    c.cfg_createElement(se0);
    c.cfg_createElement(se1);
    c.cfg_createElement(se2);
    c.cfg_createElement(slide_element);
}


MacroRenderer.prototype.new_page = function(c, params) {
    var pc = new ParamChecker(c.defaults, "new_page", params);

    var slide_element = {};

    pc.Check("skin", "TEXT", c.global_params.g_icon_skin);
    pc.Check("border", "INTEGER", 0);
    pc.Check("show_arrows", "INTEGER", 0);
    pc.Check("show_toc", "INTEGER", 0);
    pc.Check("fontsizeInPt", "INTEGER", 1);
    pc.Check("pagesound", "TEXT", "");
    pc.Check("ctl_button", "BOOL_TRUE_FALSE", 'false');
    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);
    pc.Check("screenshot_rect", "POSSIZE");
    pc.Check("dump_page_size", "SIZE");

    slide_element.type = 'page';
    slide_element.id = params.uid;
    slide_element.skin = params.skin;

    var regexp_ = new RegExp('\\\\|/' +'/', 'g');
    var imgsrc = params.dump_page + '/img.png'; /* added slash for security */
    while (imgsrc != imgsrc.replace(regexp_, '/')) { /* attention, obfuscation problem with double slash */
        imgsrc = imgsrc.replace(regexp_, '/');
    }

    var page_w = params.dump_page_size.width;
    var page_h = params.dump_page_size.height;

    if (page_w <= 0) {
        page_w = 800;
    }
    if (page_h <= 0) {
        page_h = 600;
    }

    slide_element.image = { id: imgsrc, w: page_w, h: page_h };

    slide_element.w = page_w;
    slide_element.h = page_h;
    slide_element.fontsizeInPt = params.fontsizeInPt;

    slide_element.background_color = c.global_params.g_background_color;
    slide_element.canvas_color = c.global_params.g_canvas_color;
    slide_element.border = c.global_params.g_border;
    slide_element.border_color = c.global_params.g_border_color;
    slide_element.border_style = c.global_params.g_border_style;
    slide_element.background_image_centered = c.global_params.g_background_image_centered;

    cleanupUndefined(slide_element);
    this.sourceContext = {_this: 'macro',
                        project: ctx.cfg_config('show'),
                        macro: params.uid
                        };
    c.cfg_setSourceContext(this.sourceContext);
    c.cfg_createElement(slide_element);
}

MacroRenderer.prototype.imported_page = function(c, params) {
    var pc = new ParamChecker(c.defaults, "imported_page", params);

    var slide_element = {};

    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test") ||
        (params.in_prax && c.active_mode == "praxis"))
    {
        slide_element.type = 'page';
        slide_element.id = params.uid;

        var regexp_ = new RegExp('\\\\|/' +'/', 'g');
        var imgsrc = params.dump_page + '/img.png'; /* added slash for security */
        while (imgsrc != imgsrc.replace(regexp_, '/')) { /* attention, obfuscation problem with double slash */
            imgsrc = imgsrc.replace(regexp_, '/');
        }

        var page_w = params.dump_page_size.width;
        var page_h = params.dump_page_size.height;

        if (page_w <= 0) {
            page_w = 800;
        }
        if (page_h <= 0) {
            page_h = 600;
        }

        slide_element.image = { id: imgsrc, w: page_w, h: page_h };

        slide_element.w = page_w;
        slide_element.h = page_h;

        slide_element.border = 0;
        slide_element.background_image_centered = c.global_params.g_background_image_centered;

        cleanupUndefined(slide_element);
        this.sourceContext = {_this: 'macro',
                            project: ctx.cfg_config('show'),
                            macro: params.uid
                            };
        c.cfg_setSourceContext(this.sourceContext);
        c.cfg_createElement(slide_element);
    }
}

MacroRenderer.prototype.new_slide = function(c, params) {
    var pc = new ParamChecker(c.defaults, "new_slide", params);

    var slide_element = {};

    pc.Check("w", "INTEGER", 670);
    pc.Check("h", "INTEGER", 515);

    pc.Check("src", "TEXT", "");
    pc.Check("skin", "TEXT", c.global_params.g_icon_skin);

    pc.Check("show_arrows", "BOOL_0_1", 0);
    pc.Check("show_toc", "BOOL_0_1", 0);
    pc.Check("doc_enable", "BOOL_0_1", 1);

    pc.Check("toc_position", "TEXT", "window_top");
    pc.Check("toc_scroll", "TEXT", "arrows");
    pc.Check("toc_structure", "TEXT", "group");

    pc.Check("pagesound", "TEXT", "");
    pc.Check("fontsizeInPt", "INTEGER", 1);
    pc.Check("autoplay", "INTEGER", 0);

    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 0);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);

    slide_element.type = 'page';
    slide_element.id = params.uid;

    slide_element.w = params.w;
    slide_element.h = params.h;

    slide_element.slide_id = params.slide_id;
    slide_element.skin = params.skin;
    slide_element.background_color = c.global_params.g_background_color;
    slide_element.canvas_color = c.global_params.g_canvas_color;
    slide_element.border = c.global_params.g_border;
    slide_element.border_color = c.global_params.g_border_color;
    slide_element.border_style = c.global_params.g_border_style;
    slide_element.background_image_centered = c.global_params.g_background_image_centered;

    slide_element.show_arrows = params.show_arrows;
    slide_element.show_toc = params.show_toc;
    slide_element.toc_position = params.toc_position;
    slide_element.toc_scroll = params.toc_scroll;
    slide_element.toc_structure = params.toc_structure;
    slide_element.pagesound = params.pagesound;
    slide_element.fontsizeInPt = params.fontsizeInPt;
    slide_element.version = params.version;
    slide_element.doc_enable = params.doc_enable;
    slide_element.autoplay = params.autoplay;

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test") ||
        (params.in_prax && c.active_mode == "praxis"))
    {
        var sid_ = params.src;
        if (sid_) {
            this.sourceContext = {_this: 'slide',
                                 slide:  sid_.substr(sid_.indexOf('!') + 1),
                                 macro: params.uid
                                };
            c.cfg_setSpecialProtocol('slide', 'wa:' + sid_ + '/')
            var slide_ = c.cfg_load_file_sync(c.cfg_resolve(sid_ + '/slide.js'));
            if (slide_.responseText.length > 0) {
                slide_ = slide_.responseText;

                eval("var slideObj = " + slide_ + ";");

                if (!slideObj) { return false }

                var controls_ = slideObj.controls;
                for (var o in controls_) {
                    if (controls_[o].autoplay > 0) {
                        delete controls_[o].autoplay;
                    }

                    controls_[o].uid = Math.random() + controls_[o].id;
                    c.cfg_setSourceContext(this.sourceContext);
                    c.cfg_createElement(controls_[o]);
                }
            }
        } else {
            this.sourceContext = {_this: 'macro',
                        project: ctx.cfg_config('show'),
                        macro: params.uid
                        };
            c.cfg_setSourceContext(this.sourceContext);
            c.cfg_createElement(slide_element);
        }
    }

}

MacroRenderer.prototype.click = function(c, params) {
    var pc = new ParamChecker(c.defaults, "click", params);
    checkObjectPositionSize(params);

    params.w = params.ctl_rect.width;
    params.h = params.ctl_rect.height;
    params.x = params.ctl_rect.left;
    params.y = params.ctl_rect.top;

    pc.Check("x", "INTEGER", 140);
    pc.Check("y", "INTEGER", 120);
    pc.Check("w", "INTEGER", 200);
    pc.Check("h", "INTEGER", 200);
    pc.Check("z", "INTEGER", 1);
    pc.Check("r", "INTEGER", 0);

    pc.Check("border", "INTEGER", 0);
    pc.Check("padding", "INTEGER", 0);
    pc.Check("keep_aspect", "INTEGER", 1);
    pc.Check("locked", "BOOL_0_1", 0);
    pc.Check("hidden", "BOOL_0_1", 0);

    pc.Check("ctl_init_text", "TEXT", "");
    pc.Check("ctl_font_color", "COLOR", "#000000" );
    pc.Check("ctl_bg_color", "COLOR", "#FFFFFF" );
    pc.Check("ctl_font_family", "TEXT", "Arial" );
    pc.Check("ctl_font_size", "INTEGER", 12);

    pc.Check("ctl_font_italic", "BOOL_TRUE_FALSE", false);
    pc.Check("ctl_font_bold", "BOOL_TRUE_FALSE", false);
    pc.Check("ctl_font_underline", "BOOL_TRUE_FALSE", false);

    pc.Check("ctl_button", "BOOL_TRUE_FALSE", false);
    pc.Check("href", "TEXT", "");
    pc.Check("ctl_disabled", "BOOL_TRUE_FALSE", false);
    pc.Check("cursor_hand", "BOOL_TRUE_FALSE", false);
    pc.Check("ctl_tooltip", "TEXT", "");

    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);

    var slide_element = {};

    slide_element.type = 'inputclick';
    slide_element.id = params.uid;

    var imgsrc = params.fieldicon;

    if (imgsrc) {
        slide_element.image = { id: imgsrc.toString(),
                                w: params.ctl_rect.width,
                                h: params.ctl_rect.height};
    }
    slide_element.w = params.w;
    slide_element.h = params.h;
    slide_element.x = params.x;
    slide_element.y = params.y;
    slide_element.z = params.z;
    slide_element.r = params.r;

    slide_element.border = params.border;
    slide_element.padding = params.padding;
    slide_element.keep_aspect = params.keep_aspect;
    slide_element.locked = params.locked;
    slide_element.hidden = params.hidden;

    slide_element.text = params.ctl_init_text;
    slide_element.text_color = params.ctl_font_color;
    slide_element.background_color = params.ctl_bg_color;
    slide_element.font_family = params.ctl_font_family;
    slide_element.font_size = params.ctl_font_size;

    slide_element.italic = params.ctl_font_italic;
    slide_element.bold = params.ctl_font_bold;
    slide_element.underline = params.ctl_font_underline;

    slide_element.button = params.ctl_button;
    slide_element.href = params.href;
    slide_element.cursorhand = params.cursor_hand;
    slide_element.tooltip = params.ctl_tooltip;

    cleanupUndefined(slide_element);
    this.sourceContext._this = 'macro';
    this.sourceContext.macro = params.uid;
    c.cfg_setSourceContext(this.sourceContext);
    c.cfg_createElement(slide_element);
}

MacroRenderer.prototype.input_text = function(c, params) {
    var pc = new ParamChecker(c.defaults, "input_text", params);
    checkObjectPositionSize(params);

    params.w = params.ctl_rect.width;
    params.h = params.ctl_rect.height;
    params.x = params.ctl_rect.left;
    params.y = params.ctl_rect.top;

    pc.Check("x", "INTEGER", 140);
    pc.Check("y", "INTEGER", 120);
    pc.Check("w", "INTEGER", 200);
    pc.Check("h", "INTEGER", 200);
    pc.Check("z", "INTEGER", 1);
    pc.Check("r", "INTEGER", 0);

    pc.Check("padding", "INTEGER", 2);
    pc.Check("locked", "BOOL_0_1", 0);
    pc.Check("hidden", "BOOL_0_1", 0);

    pc.Check("ctl_init_text", "TEXT", "");
    pc.Check("ctl_font_color", "COLOR", "#000000" );
    pc.Check("ctl_bg_color", "COLOR", "#FFFFFF" );
    pc.Check("ctl_border", "INTEGER", 0);
    pc.Check("ctl_border_color", "COLOR", "" );
    pc.Check("ctl_border_style", "TEXT", "" );
    pc.Check("ctl_font_family", "TEXT", "Arial" );
    pc.Check("ctl_font_size", "INTEGER", 9);
    pc.Check("ctl_text_align", "TEXT", "Left" );
    pc.Check("ctl_max_len", "INTEGER", -1);

    pc.Check("ctl_font_italic", "BOOL_TRUE_FALSE", false);
    pc.Check("ctl_font_bold", "BOOL_TRUE_FALSE", false);
    pc.Check("ctl_font_underline", "BOOL_TRUE_FALSE", false);

    pc.Check("ctl_password", "BOOL_TRUE_FALSE", false);
    pc.Check("is_textarea", "BOOL_TRUE_FALSE", false);
    pc.Check("ctl_disabled", "BOOL_TRUE_FALSE", false);
    pc.Check("ctl_no_edit_cursor", "BOOL_TRUE_FALSE", false);
    pc.Check("ctl_tooltip", "TEXT", "");
    pc.Check("affirmation_button", "BOOL_TRUE_FALSE", false);

    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);

    var slide_element = {};

    slide_element.type = 'inputtext';
    slide_element.id = params.uid;

    slide_element.w = params.w;
    slide_element.h = params.h;

    slide_element.x = params.x;
    slide_element.y = params.y;

    slide_element.z = params.z;
    slide_element.r = params.r;
    slide_element.padding = params.padding;
    slide_element.locked = params.locked;
    slide_element.hidden = params.hidden;

    slide_element.text = params.ctl_init_text;
    slide_element.text_color = params.ctl_font_color;
    slide_element.background_color = params.ctl_bg_color;
    slide_element.border = params.ctl_border;
    if (params.ctl_border_color != '') {
        slide_element.set_border_color = true;
    }
    slide_element.border_color = params.ctl_border_color;
    slide_element.border_style = params.ctl_border_style;
    slide_element.font_family = params.ctl_font_family;
    slide_element.font_size = params.ctl_font_size;
    slide_element.align = params.ctl_text_align;
    slide_element.max_length = params.ctl_max_len;

    slide_element.italic = params.ctl_font_italic;
    slide_element.bold = params.ctl_font_bold;
    slide_element.underline = params.ctl_font_underline;

    slide_element.password = params.ctl_password;
    slide_element.textarea = params.is_textarea;
    slide_element.hide_scrollbars = !params.is_textarea;
    slide_element.disabled = params.ctl_disabled;
    slide_element.noeditcursor = params.ctl_no_edit_cursor;
    slide_element.tooltip = params.ctl_tooltip;

    cleanupUndefined(slide_element);
    this.sourceContext._this = 'macro';
    this.sourceContext.macro = params.uid;
    c.cfg_setSourceContext(this.sourceContext);
    c.cfg_createElement(slide_element);

    // create additional confirmation button
    if (params.affirmation_button == true &&
        typeof(params.btn_rect) != 'undefined')
    {
        this.click(c, {
            'uid': params.uid + '_CONFIRMB',
            'ctl_button': params.btn_is_button,
            'cursor_hand': params.btn_cursor_hand,
            'ctl_rect': {
                'width': params.btn_rect.width,
                'height': params.btn_rect.height,
                'left': params.btn_rect.left,
                'top': params.btn_rect.top}
        });
    }
}

function as_boolean(v) {
    if (v == 1 || v == '1' || v === true || v == 'true' || v == 'on') {
        return true;
    } else {
        return false;
    }
}

MacroRenderer.prototype.input_radio = function(c, params) {
    var pc = new ParamChecker(c.defaults, "input_radio", params);
    checkObjectPositionSize(params);

    /* undo of DPS-11159, width and height must be set*/
    params.w = params.ctl_rect.width;
    params.h = params.ctl_rect.height;
    params.x = params.ctl_rect.left;
    params.y = params.ctl_rect.top;

    pc.Check("x", "INTEGER", 140);
    pc.Check("y", "INTEGER", 120);
    /* undo of DPS-11159 must be set*/
    pc.Check("w", "INTEGER", 13);
    pc.Check("h", "INTEGER", 13);
    pc.Check("z", "INTEGER", 1);
    pc.Check("r", "INTEGER", 0);

    pc.Check("border", "INTEGER", 0);
    pc.Check("padding", "INTEGER", 0);
    pc.Check("locked", "BOOL_0_1", 0);
    pc.Check("hidden", "BOOL_0_1", 0);

    pc.Check("is_radio", "BOOL_TRUE_FALSE", false);
    pc.Check("radio_group_name", "TEXT", "radioGroup1");
    pc.Check("choose_bool", "BOOL_TRUE_FALSE", false);
    pc.Check("ctl_disabled", "BOOL_TRUE_FALSE", false);
    pc.Check("cursor_hand", "BOOL_TRUE_FALSE", false);
    pc.Check("ctl_tooltip", "TEXT", "");

    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);

    var slide_element = {};

    slide_element.type = 'inputradio';
    slide_element.id = params.uid;

    /* undo of DPS-11159 must be set*/
    slide_element.w = params.w;
    slide_element.h = params.h;
    slide_element.x = params.x;
    slide_element.y = params.y;
    slide_element.z = params.z;
    slide_element.r = params.r;

    slide_element.border = params.border;
    slide_element.padding = params.padding;
    slide_element.locked = params.locked;
    slide_element.hidden = params.hidden;

    slide_element.radio = params.is_radio;
    slide_element.radiogroupname = params.radio_group_name;
    slide_element.choose = as_boolean(params.choose_bool);
    slide_element.checked = !as_boolean(params.choose_bool);
    slide_element.cursorhand = params.cursor_hand;
    slide_element.disabled = params.ctl_disabled;
    slide_element.tooltip = params.ctl_tooltip;

    cleanupUndefined(slide_element);
    this.sourceContext._this = 'macro';
    this.sourceContext.macro = params.uid;
    c.cfg_setSourceContext(this.sourceContext);
    c.cfg_createElement(slide_element);
}

MacroRenderer.prototype.select_single = function(c, params) {
    var pc = new ParamChecker(c.defaults, "select_single", params);
    checkObjectPositionSize(params);

    params.w = params.ctl_rect.width;
    params.h = params.ctl_rect.height;
    params.x = params.ctl_rect.left;
    params.y = params.ctl_rect.top;

    pc.Check("x", "INTEGER", 140);
    pc.Check("y", "INTEGER", 120);
    pc.Check("w", "INTEGER", 200);
    pc.Check("h", "INTEGER", 200);
    pc.Check("z", "INTEGER", 1);
    pc.Check("r", "INTEGER", 0);

    pc.Check("border", "INTEGER", 0);
    pc.Check("padding", "INTEGER", 0);
    pc.Check("locked", "BOOL_0_1", 0);
    pc.Check("hidden", "BOOL_0_1", 0);

    pc.Check("ctl_font_color", "COLOR", "#000000" );
    pc.Check("ctl_bg_color", "COLOR", "#FFFFFF" );
    pc.Check("ctl_font_family", "TEXT", "Arial" );
    pc.Check("ctl_font_size", "INTEGER", 12);

    pc.Check("ctl_font_italic", "BOOL_TRUE_FALSE", false);
    pc.Check("ctl_font_bold", "BOOL_TRUE_FALSE", false);

    pc.Check("all_values", "TEXT", "");
    pc.Check("choose_nr", "INTEGER", 0);
    pc.Check("ctl_disabled", "BOOL_TRUE_FALSE", false);
    pc.Check("cursor_hand", "BOOL_TRUE_FALSE", false);
    pc.Check("ctl_tooltip", "TEXT", "");

    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);

    var slide_element = {};

    slide_element.type = 'inputselect';
    slide_element.id = params.uid;

    slide_element.w = params.w;
    slide_element.h = params.h;
    slide_element.x = params.x;
    slide_element.y = params.y;
    slide_element.z = params.z;
    slide_element.r = params.r;

    slide_element.border = params.border;
    slide_element.padding = params.padding;
    slide_element.locked = params.locked;
    slide_element.hidden = params.hidden;

    slide_element.text_color = params.ctl_font_color;
    slide_element.background_color = params.ctl_bg_color;
    slide_element.font_family = params.ctl_font_family;
    slide_element.font_size = params.ctl_font_size;

    slide_element.italic = params.ctl_font_italic;
    slide_element.bold = params.ctl_font_bold;

    slide_element.values = params.all_values;
    slide_element.choose = params.choose_nr;
    slide_element.cursorhand = params.cursor_hand;
    slide_element.disabled = params.ctl_disabled;
    slide_element.tooltip = params.ctl_tooltip;

    cleanupUndefined(slide_element);
    this.sourceContext._this = 'macro';
    this.sourceContext.macro = params.uid;
    c.cfg_setSourceContext(this.sourceContext);
    c.cfg_createElement(slide_element);
}

MacroRenderer.prototype.free_highlight = function(c, params) {
    var pc = new ParamChecker(c.defaults, "free_highlight", params);

    checkObjectPositionSize(params);

    var slide_element = {};

    slide_element.type = 'inputclick';
    slide_element.id = params.uid;

    slide_element.w = params.ctl_rect.width;
    slide_element.h = params.ctl_rect.height;

    slide_element.x = params.ctl_rect.left;
    slide_element.y = params.ctl_rect.top;
    slide_element.button = false;

    slide_element.z = 1;
    slide_element.r = 0;
    slide_element.border = 0;
    slide_element.padding = 0;
    slide_element.keep_aspect = 1;
    slide_element.locked = 0;
    slide_element.hidden = 1; /* DPS-12179 */

    slide_element.href = '';
    slide_element.cursorhand = false;

    cleanupUndefined(slide_element);
    this.sourceContext._this = 'macro';
    this.sourceContext.macro = params.uid;
    c.cfg_setSourceContext(this.sourceContext);
    c.cfg_createElement(slide_element);
}

MacroRenderer.prototype.explanation_long = function(c, params) {
    var pc = new ParamChecker(c.defaults, "explanation_long", params);

    checkObjectPositionSize(params);

    var slide_element = {};

    slide_element.type = 'inputclick';
    slide_element.id = params.uid;

    slide_element.w = params.ctl_rect.width;
    slide_element.h = params.ctl_rect.height;

    slide_element.x = params.ctl_rect.left;
    slide_element.y = params.ctl_rect.top;
    slide_element.button = false;

    slide_element.z = 1;
    slide_element.r = 0;
    slide_element.border = 0;
    slide_element.padding = 0;
    slide_element.keep_aspect = 1;
    slide_element.locked = 0;
    slide_element.hidden = 1; /* DPS-12179 */

    slide_element.href = '';
    slide_element.cursorhand = false;

    cleanupUndefined(slide_element);
    this.sourceContext._this = 'macro';
    this.sourceContext.macro = params.uid;
    c.cfg_setSourceContext(this.sourceContext);
    c.cfg_createElement(slide_element);
}

MacroRenderer.prototype.slide_arrow = function(c, params) {
    var pc = new ParamChecker(c.defaults, "slide_arrow", params);

    pc.Check("x0", "INTEGER", 140);
    pc.Check("y0", "INTEGER", 190);
    pc.Check("x1", "INTEGER", 240);
    pc.Check("y1", "INTEGER", 190);
    pc.Check("z", "INTEGER", 100);
    pc.Check("thickness", "INTEGER", 5);
    pc.Check("color", "COLOR", "#000000" );
    pc.Check("head", "TEXT", "standard" );
    pc.Check("locked", "BOOL_TRUE_FALSE", "false");
    pc.Check("hidden", "BOOL_TRUE_FALSE", "false");

    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("trigger_error_on_use", "BOOL_0_1", 0);

    params.type = 'arrow';
    params.id = params.uid;

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test"))
    {
        cleanupUndefined(params);
        this.sourceContext._this = 'macro';
        this.sourceContext.macro = params.uid;
        c.cfg_setSourceContext(this.sourceContext);
        c.cfg_createElement(params);
    }
}

MacroRenderer.prototype.slide_big_arrow = function(c, params) {
    var pc = new ParamChecker(c.defaults, "slide_big_arrow", params);
    pc.Check("text", "TEXT", "");
    pc.Check("x", "INTEGER", 140);
    pc.Check("y", "INTEGER", 120);
    pc.Check("w", "INTEGER", 200);
    pc.Check("h", "INTEGER", 200);
    pc.Check("z", "INTEGER", 100);
    pc.Check("dir", "TEXT", "right" );
    pc.Check("thickness", "INTEGER", 30);
    pc.Check("background_color", "COLOR", "transparent" );
    pc.Check("arrow_color", "COLOR", "#8080FF" );
    pc.Check("border_color", "COLOR", "#666666" );
    pc.Check("border", "INTEGER", 0);
    pc.Check("padding", "INTEGER", 0);
    pc.Check("href", "TEXT", "" );
    pc.Check("openInNewWindow", "BOOL_TRUE_FALSE", "true" );
    pc.Check("locked", "BOOL_TRUE_FALSE", "false");
    pc.Check("hidden", "BOOL_TRUE_FALSE", "false");
    pc.Check("doc_enable", "BOOL_TRUE_FALSE", "true");

    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("trigger_error_on_use", "BOOL_0_1", 0);

    params.type = 'big_arrow';
    params.id = params.uid;
    params.ctl_rect = {};
    params.ctl_rect.width = params.w;
    params.ctl_rect.height = params.h;
    params.ctl_rect.left = params.x;
    params.ctl_rect.top = params.y;
    checkObjectPositionSize(params);


    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test"))
    {
        cleanupUndefined(params);
        this.sourceContext._this = 'macro';
        this.sourceContext.macro = params.uid;
        c.cfg_setSourceContext(this.sourceContext);
        c.cfg_createElement(params);
    }
}

MacroRenderer.prototype.slide_link_textBoxIcon = function(c, params) {
    if (c.active_mode == "praxis") return; // DPS-17733 - prevent textbox in concurrent mode
    var pc = new ParamChecker(c.defaults, "slide_link_textBoxIcon", params);
    pc.Check("text", "TEXT", "enter text here...");
    pc.Check("x", "INTEGER", 300);
    pc.Check("y", "INTEGER", 80);
    pc.Check("w", "INTEGER", 33);
    pc.Check("h", "INTEGER", 26);
    pc.Check("z", "INTEGER", 100);
    pc.Check("textBoxW", "INTEGER", 300);
    pc.Check("textBoxH", "INTEGER", 200);
    pc.Check("textBoxX", "INTEGER", 330);
    pc.Check("textBoxY", "INTEGER", 80);
    pc.Check("textBoxZ", "INTEGER", 1000);
    pc.Check("font_family", "TEXT", "Arial" );
    pc.Check("font_size", "INTEGER", 10);
    pc.Check("align", "TEXT", "Left" );
    pc.Check("background_color", "COLOR", "#ffffff" );
    pc.Check("border_color", "COLOR", "#666666" );
    pc.Check("border", "INTEGER", 2);
    pc.Check("padding", "INTEGER", 0);
    pc.Check("text_color", "COLOR", "#000000" );
    pc.Check("fadeing", "BOOL_TRUE_FALSE", "true");
    pc.Check("hide_scrollbars", "BOOL_TRUE_FALSE", "false");

    pc.Check("locked", "BOOL_TRUE_FALSE", "false");
    pc.Check("hidden", "BOOL_TRUE_FALSE", "false");
    pc.Check("hide_textbox_in_editor", "BOOL_TRUE_FALSE", "false");
    pc.Check("doc_enable", "BOOL_TRUE_FALSE", "true");

    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);
    pc.Check("trigger_error_on_use", "BOOL_0_1", 0);

    params.type = 'link_textBoxIcon';
    params.id = params.uid;
    params.ctl_rect = {};
    params.ctl_rect.width = params.w;
    params.ctl_rect.height = params.h;
    params.ctl_rect.left = params.x;
    params.ctl_rect.top = params.y;
    checkObjectPositionSize(params);

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test") ||
        (params.in_prax && c.active_mode == "praxis"))
    {
        cleanupUndefined(params);
        this.sourceContext._this = 'macro';
        this.sourceContext.macro = params.uid;
        c.cfg_setSourceContext(this.sourceContext);
        c.cfg_createElement(params);
    }
}

MacroRenderer.prototype.slide_image = function(c, params) {
    var pc = new ParamChecker(c.defaults, "slide_image", params);
    pc.Check("x", "INTEGER", 140);
    pc.Check("y", "INTEGER", 120);
    pc.Check("w", "INTEGER", 200);
    pc.Check("h", "INTEGER", 200);
    pc.Check("z", "INTEGER", 100);
    pc.Check("background_color", "COLOR", "transparent" );
    pc.Check("border_color", "COLOR", "#666666" );
    pc.Check("border", "INTEGER", 0);
    pc.Check("padding", "INTEGER", 0);
    pc.Check("image", "TEXT", "" );
    pc.Check("href", "TEXT", "" );
    pc.Check("openInNewWindow", "BOOL_TRUE_FALSE", "true" );
    pc.Check("locked", "BOOL_TRUE_FALSE", "false");
    pc.Check("hidden", "BOOL_TRUE_FALSE", "false");
    pc.Check("keep_aspect", "BOOL_TRUE_FALSE", "true");
    pc.Check("doc_enable", "BOOL_TRUE_FALSE", "true");

    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);
    pc.Check("trigger_error_on_use", "BOOL_0_1", 0);

    params.type = 'image';
    params.id = params.uid;

    params.ctl_rect = {};
    params.ctl_rect.width = params.w;
    params.ctl_rect.height = params.h;
    params.ctl_rect.left = params.x;
    params.ctl_rect.top = params.y;
    checkObjectPositionSize(params);


    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test") ||
        (params.in_prax && c.active_mode == "praxis"))
    {
        cleanupUndefined(params);
        this.sourceContext._this = 'macro';
        this.sourceContext.macro = params.uid;
        c.cfg_setSourceContext(this.sourceContext);
        c.cfg_createElement(params);
    }
}

MacroRenderer.prototype.slide_icon_link = function(c, params) {
    var pc = new ParamChecker(c.defaults, "slide_icon_link", params);
    pc.Check("x", "INTEGER", 300);
    pc.Check("y", "INTEGER", 130);
    pc.Check("w", "INTEGER", 33);
    pc.Check("h", "INTEGER", 26);
    pc.Check("z", "INTEGER", 100);
    pc.Check("link_to", "TEXT", "" );
    pc.Check("icon_skin", "TEXT", "standard" );
    pc.Check("mode_icon", "TEXT", "demo" );
    pc.Check("image", "TEXT", "" );
    pc.Check("openInNewWindow", "BOOL_TRUE_FALSE", "true" );
    pc.Check("image", "TEXT", "" );
    pc.Check("locked", "BOOL_TRUE_FALSE", "false");
    pc.Check("hidden", "BOOL_TRUE_FALSE", "false");
    pc.Check("doc_enable", "BOOL_TRUE_FALSE", "true");

    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);
    pc.Check("trigger_error_on_use", "BOOL_0_1", 0);

    params.type = 'link_' + params.mode_icon;
    params.id = params.uid;

    if (params.image && params.image.id) {
    } else {
        params.image = {};
        params.image.id = 'book_style!' +
                          c.global_params.g_icon_skin +
                          ':icons/' +
                          (params.mode_icon == 'document' ? 'start' : params.mode_icon) +
                          '.png';
    }

    params.ctl_rect = {};
    params.ctl_rect.width = params.w;
    params.ctl_rect.height = params.h;
    params.ctl_rect.left = params.x;
    params.ctl_rect.top = params.y;
    checkObjectPositionSize(params);


    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test") ||
        (params.in_prax && c.active_mode == "praxis"))
    {
        cleanupUndefined(params);
        this.sourceContext._this = 'macro';
        this.sourceContext.macro = params.uid;
        c.cfg_setSourceContext(this.sourceContext);
        c.cfg_createElement(params);
    }
}

MacroRenderer.prototype.slide_hrefarea = function(c, params) {
    var pc = new ParamChecker(c.defaults, "slide_hrefarea", params);
    pc.Check("text", "TEXT", "link text ..." );
    pc.Check("href", "TEXT", "" );
    pc.Check("x", "INTEGER", 40);
    pc.Check("y", "INTEGER", 220);
    pc.Check("w", "INTEGER", 120);
    pc.Check("h", "INTEGER", 120);
    pc.Check("z", "INTEGER", 100);
    pc.Check("font_family", "TEXT", "Arial" );
    pc.Check("font_size", "INTEGER", 14);
    pc.Check("align", "TEXT", "Left" );
    pc.Check("text_color", "COLOR", "#000000" );
    pc.Check("background_color", "COLOR", "transparent" );
    pc.Check("border_color", "COLOR", "#666666" );
    pc.Check("border", "INTEGER", 0);
    pc.Check("padding", "INTEGER", 4);
    pc.Check("openInNewWindow", "BOOL_TRUE_FALSE", "true" );
    pc.Check("locked", "BOOL_TRUE_FALSE", "false");
    pc.Check("hidden", "BOOL_TRUE_FALSE", "false");
    pc.Check("doc_enable", "BOOL_TRUE_FALSE", "true");
    pc.Check("hide_scrollbars", "BOOL_TRUE_FALSE", "false");

    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);
    pc.Check("trigger_error_on_use", "BOOL_0_1", 0);

    params.type = 'hrefarea';
    params.id = params.uid;

    params.ctl_rect = {};
    params.ctl_rect.width = params.w;
    params.ctl_rect.height = params.h;
    params.ctl_rect.left = params.x;
    params.ctl_rect.top = params.y;
    checkObjectPositionSize(params);


    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test") ||
        (params.in_prax && c.active_mode == "praxis"))
    {
        cleanupUndefined(params);
        this.sourceContext._this = 'macro';
        this.sourceContext.macro = params.uid;
        c.cfg_setSourceContext(this.sourceContext);
        c.cfg_createElement(params);
    }
}

MacroRenderer.prototype.text = function(c, params) {
    var pc = new ParamChecker(c.defaults, "text", params);
    pc.Check("text", "TEXT", "text ..." );
    pc.Check("x", "INTEGER", 40);
    pc.Check("y", "INTEGER", 220);
    pc.Check("w", "INTEGER", 120);
    pc.Check("h", "INTEGER", 120);
    pc.Check("z", "INTEGER", 100);
    pc.Check("font_family", "TEXT", "Arial" );
    pc.Check("font_size", "INTEGER", 12);
    pc.Check("align", "TEXT", "Left" );
    pc.Check("text_color", "COLOR", "#000000" );
    pc.Check("background_color", "COLOR", "transparent" );
    pc.Check("border_color", "COLOR", "#666666" );
    pc.Check("border", "INTEGER", 0);
    pc.Check("padding", "INTEGER", 4);
    pc.Check("locked", "BOOL_TRUE_FALSE", "false");
    pc.Check("hidden", "BOOL_TRUE_FALSE", "false");
    pc.Check("doc_enable", "BOOL_TRUE_FALSE", "true");


    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 0);
    pc.Check("in_test", "BOOL_0_1", 0);
    pc.Check("in_prax", "BOOL_0_1", 1);

    params.type = 'hrefarea';
    params.id = params.uid;

    params.ctl_rect = {};
    params.ctl_rect.width = params.w;
    params.ctl_rect.height = params.h;
    params.ctl_rect.left = params.x;
    params.ctl_rect.top = params.y;
    checkObjectPositionSize(params);


    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test") ||
        (params.in_prax && c.active_mode == "praxis"))
    {
        cleanupUndefined(params);
        this.sourceContext._this = 'macro';
        this.sourceContext.macro = params.uid;
        c.cfg_setSourceContext(this.sourceContext);
        c.cfg_createElement(params);
    }
}

function cleanupUndefined(data_) {
    for (var d in data_) {
        if (typeof(data_[d]) == 'undefined') {
            delete data_[d];
        }
    }
}

function checkObjectPositionSize(data_) {
    if (data_ && typeof(data_.ctl_rect) == 'undefined')
    {
        data_.ctl_rect = {
            'left'  :10,
            'top'   :10,
            'width' :10,
            'height':10};
    }
}

function MacroSet() { };

MacroSet.prototype.build_globals = function(c) {
    if (!("global_params" in c)) c.global_params = {};
    var pc = new ParamChecker(c.defaults, "global", c.global_params);
    pc.Check("g_highlight_name", "TEXT", "hl" );
    pc.Check("g_highlight_effect", "ENUM", "light" );
    pc.Check("g_highlight_style", "TEXT", "" );
    pc.Check("g_highlight_fillstyle", "TEXT", "" );
    pc.Check("g_highlight_border", "ENUM", "2" );
    pc.Check("g_highlight_rgb", "COLOR", "FF0000" );
    pc.Check("g_linktextpraxis", "TEXT", "<img src=\"style:image/next_red.int.gif\" border=0 >" );
    pc.Check("g_back_link", "TEXT", "<img src=\"style:image/prev_red.int.gif\" border=0 >" );
    pc.Check("g_close_link", "TEXT", "<img src=\"style:image/close_red.int.gif\" border=0 >" );
    pc.Check("g_alternate_link", "TEXT", "Show Step" );
    pc.Check("g_show_ok_bubble", "BOOL_0_1", 1 );
    pc.Check("g_skip_ok_bubble_on_mistake", "BOOL_0_1", 0 );
    pc.Check("g_show_step_bubble", "BOOL_0_1", 0 );
    pc.Check("g_show_mouse", "BOOL_0_1", 0 );
    pc.Check("g_bubblestyle_ok", "SHELF", "_default" );
    pc.Check("g_bubblestyle_feedback", "SHELF", "_default" );
    pc.Check("g_logging", "BOOL_0_1", 0);
    pc.Check("g_feedback_enable", "BOOL_0_1", 0);
    pc.Check("g_feedback_popup", "BOOL_0_1", 0);
    pc.Check("g_feedback_pass", "HTML", "");
    pc.Check("g_feedback_fail", "HTML", "");
    pc.Check("g_feedback_time", "HTML", "");
    pc.Check("g_quiz_timeout", "INTEGER", 0);
    pc.Check("g_quiz_style_dir", "ENUM", "standard");
    pc.Check("g_feedback_correct_solutions", "BOOL_0_1", 0);
    pc.Check("g_quiz_skipping", "BOOL_0_1", 0);
    pc.Check("g_in_demo", "BOOL_0_1", 1);
    pc.Check("g_in_practice", "BOOL_0_1", 1);
    pc.Check("g_in_test", "BOOL_0_1", 1);
    pc.Check("g_in_prax", "BOOL_0_1", 1);
    pc.Check("g_no_praxis_links", "BOOL_0_1", 0);
    pc.Check("g_action_after_audio", "BOOL_0_1", 0);
    pc.Check("g_sync_demo_bubble_dur_to_audio", "BOOL_0_1", 0);
    pc.Check("g_always_show_explanations", "BOOL_0_1", 0);
    pc.Check("g_watch_failure_without_focus", "BOOL_0_1", 0);

    pc.Check("g_background_color", "COLOR", "#9f9f9f");
    pc.Check("g_canvas_color", "COLOR", "#9f9f9f" );
    pc.Check("g_border", "INTEGER", 0);
    pc.Check("g_border_color", "COLOR", "#666666");
    pc.Check("g_border_style", "TEXT", "solid");
    pc.Check("g_background_image_centered", "BOOL_TRUE_FALSE", true);
    pc.Check("g_icon_skin", "TEXT", "standard");

    pc.Check("g_expl_min", "BOOL_0_1", false);
    pc.Check("g_expl_mov", "BOOL_0_1", false);
    pc.Check("g_demo_min", "BOOL_0_1", false);
    pc.Check("g_demo_mov", "BOOL_0_1", false);
    pc.Check("g_prac_min", "BOOL_0_1", false);
    pc.Check("g_prac_mov", "BOOL_0_1", false);
    pc.Check("g_conc_min", "BOOL_0_1", false);
    pc.Check("g_conc_mov", "BOOL_0_1", false);
}

function show_task_bubble(c, ctx, time, params, mac) {
    c.ew.textbubble(ctx, time, {
        text: params.task_text,
        width: params.task_width,
        height: params.task_height,
        orientation: params.task_orientation,
        type: "element",
        style: "comic",
        replace: true,
        movable: false,
        closable: false,
        minimizable: false,
        transparent: false,
        alwaystop: true,
        cover: true,
        object_name: "task_bubble",
        x_frame: true,
        relpos: {FP: "-2", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} }
    }, mac);
}

function hide_task_bubble(c, ctx, time, params, mac) {
    // alert('hide_task_bubble');
    c.ew.textbubble(ctx, time,
        {
            relpos: {FP: "-2", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            object_name: "task_bubble",
            type: "close"
        },
        mac);
}

function timed_alert(c, ctx, time, mac, text) {
    c.ew.javascript(ctx, time, {
        relpos: {FP: "-1", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: "alert('" + text + "')"
    }, mac);
}

function trainer_check(c, ctx, time, mac, params) {
    c.ew.javascript(ctx, time, {
        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text:
            "var version = ctx.cfg_config(\'version\');" +
            "var i;" +
            "if (0 <= (i = version.search(/[1-9]\\.[0-9]/))) {" +
            "    version = version.substr(i);" +
            "    if (version < \'5.2.5\') {" +
            "        ctx.cfg_tourerror(\'The macro set used for this tour needs trainer >= 5.2.5\');" +
            "    }" +
            "}"
    }, mac);
}

function log_init(c, ctx, time, mac, params) {
    // alert('log_init');
    if (!c.global_params.g_logging) return;
    if (ctx.cfg_config("logurl").length == 0) return;
    //alert('log_init II: ' + ctx.cfg_config("logurl"));

    // get SID
    c.ew.javascript(ctx, time, {
        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, "") },
    text: c.h.EVAL_TEMPLATE("log_init",
                            {
                                user: ctx.cfg_config("lmuser") || "dummy_user",
                                pwd: ctx.cfg_config("lmpassword") || "dummy_pwd"
                            } )
    }, mac);
}

function log_request(c, ctx, time, mac, params, method) {
    if (!c.global_params.g_logging) return;
    if (ctx.cfg_config("logurl").length == 0) return;
    // alert(c.h.EVAL_TEMPLATE("log_" + method, params));

    c.ew.javascript(ctx, time, {
        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, "") },
        text: c.h.EVAL_TEMPLATE("log_" + method, params)
    }, mac);
}

function lms_init(c, ctx, time, mac, params) {
    c.ew.javascript(ctx, time, {
        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text:
            "ctx.pj_fieldcount = 0;" +
            "ctx.pj_triggercount = 0;" +
            "ctx.cfg_setmaxscore(" + params.possible_points + " , " + params.mastery_score + ");" +
            "ctx.mastery_score = " + params.mastery_score+ ";" +
            "ctx.collected_points = 0;"
    }, mac);
}

function page_init(c, ctx, time, mac, params) {
    ctx.pj_fieldcount = 0;
    ctx.pj_triggercount = 0;
    c.ew.javascript(ctx, time, {
        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: c.h.EVAL_TEMPLATE("init_new_page", params)
    }, mac);
}

function init_show_demo(c, ctx, time, mac, params) {
    c.ew.javascript(ctx, time, {
        relpos: {FP: "-1", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text:
            "ctx.pj_show_demo = function() {\r\n" +
            "    var ride = this.cfg_config(\"program\");\r\n" +
            "    var demo_config = ride.replace(\"lesson.js\", \"demo.js\");\r\n" +
            "    if (this.cfg_tourload2(CFG_TOUR_OPTION_WINDOW | CFG_TOUR_OPTION_CURRENT_SUB_ONLY,\r\n" +
            "                            demo_config,\r\n" +
            "                            \'window=&startpage=style%2fstandard%2fpage%2fno_pause.html&stoppage=style%2fstandard%2fpage%2fquickclose.html\',\r\n" +
            "                            \'resizable=1\'))\r\n" +
            "    {\r\n" +
            "       var score;\r\n" +
            "       if (score = cfg_get_exercise_points()) {\r\n" +
            "           this.cfg_track({ 'id': 'user_action_show_demo', 'max_score': score.possible_points, 'action_score': 0});\r\n" +
            "       }\r\n" +
            "       this.cfg_set_exercise_points(0);\r\n" +
            "    }\r\n" +
            "}"
    }, mac);
}

function default_highlight(c, ctx, time, mac, position) {
    c.ew.highlight(ctx, time, {
        relpos: position,
        border: c.global_params.g_highlight_border,
        effect: c.global_params.g_highlight_effect,
        object_name: c.global_params.g_highlight_name,
        style: c.global_params.g_highlight_style,
        fillstyle: c.global_params.g_highlight_fillstyle,
        rgbcolor: c.global_params.g_highlight_rgb
    }, mac);
}

function register_multi_hl(c, ctx) {
    if (typeof(c.highlights) != 'object') {
        return;
    }

    var hl_name = "phl" + c.highlights.length;
    c.highlights.push(hl_name);
    return hl_name;
}

function remove_multi_hls(c, ctx, time, mac, params) {
    if (typeof(c.highlights) != 'object') {
        return;
    }

    var i;
    for (i = 0; i < c.highlights.length; i++) {
        c.ew.textbubble(ctx, time, { type: "close", object_name: c.highlights[i] }, mac);
    }
}

function multi_highlight(c, ctx, time, mac, position) {
    c.ew.highlight(ctx, time, {
        relpos: position,
        border: c.global_params.g_highlight_border,
        effect: c.global_params.g_highlight_effect,
        style: c.global_params.g_highlight_style,
        fillstyle: c.global_params.g_highlight_fillstyle,
        rgbcolor: c.global_params.g_highlight_rgb,
        object_name: register_multi_hl(c, ctx)
    }, mac);
}


function bubble(c, ctx, time, mac, params) {
    c.ew.textbubble(ctx, time, {
        relpos: params.bubble_position,
        text: params.bubbletext_expanded,
        customStyle: params.bubble_style,
        orientation: params.bubble_orientation,
        width: params.bubble_width,
        height: params.bubble_height,
        type: "element",
        replace: true,
        movable: c.global_params.g_expl_mov,
        closable: false,
        minimizable: c.global_params.g_expl_min,
        transparent: false,
        alwaystop: true,
        object_name: "_default",
        cover: true,
        x_frame: true
    }, mac);
}

function p_bubble(c, ctx, time, mac, params) {
    c.ew.textbubble(ctx, time, {
        relpos: params.position_bu,
        text: c.h.EVAL_TEMPLATE("bubbletext_p", params),
        customStyle: params.bubblestyle_p,
        orientation: params.orientation_p,
        width: params.b_width_p,
        height: params.b_height_p,
        type: "element",
        //style: "comic",
        replace: true,
        movable: c.global_params.g_prac_mov,
        closable: false,
        minimizable: c.global_params.g_prac_min,
        transparent: false,
        alwaystop: true,
        object_name: "_default",
        cover: true,
        x_frame: true
    }, mac);
}

function d_bubble(c, ctx, time, mac, params) {
    var has_audio = c.ts_audio_duration > 0 && c.show_audio;
    var bubble_tpl = params.b_duration < 0 && (!has_audio || !c.global_params.g_sync_demo_bubble_dur_to_audio)
        ? 'bubbletext_d_nav'
        : 'bubbletext_d';

    c.ew.textbubble(ctx, time, {
        relpos: params.position_b,
        orientation: params.orientation,
        text: c.h.EVAL_TEMPLATE(bubble_tpl, params),
        customStyle: params.bubblestyle_d,
        width: params.b_width,
        height: params.b_height,
        type: "element",
        //style: "comic",
        replace: true,
        movable: c.global_params.g_demo_mov,
        closable: false,
        minimizable: c.global_params.g_demo_min,
        transparent: false,
        alwaystop: true,
        object_name: "_default",
        cover: true,
        x_frame: true
    }, mac);
}

function x_bubble(c, ctx, time, mac, params) {
    c.ew.textbubble(ctx, time, {
        customStyle: params.bubblestyle_d,
        width: params.b_width,
        height: params.b_height,
        relpos: params.position_b,
        orientation: params.orientation,
        text: c.global_params.g_no_praxis_links ?
            c.h.EVAL_TEMPLATE("bubbletext_d", params) :
            c.h.EVAL_TEMPLATE("bubbletext_x", params),
        type: "element",
        style: "comic",
        replace: true,
        movable: c.global_params.g_conc_mov,
        closable: false,
        minimizable: c.global_params.g_conc_min,
        transparent: false,
        alwaystop: true,
        object_name: "_default",
        cover: true,
        x_frame: true
    }, mac);
}

function step_bubble(c, ctx, time, mac, params) {
    params.show_step_help_text = ctx.cfg_tr('EXER_HINT_HELPCANCELS');
    c.ew.textbubble(ctx, time, {
        customStyle: params.bubblestyle_p,
        width: params.b_width_p,
        height: params.b_height_p,
        relpos: params.position_bu,
        text: c.h.EVAL_TEMPLATE("step_bubble", params),
        type: "element",
        style: "comic",
        replace: true,
        movable: c.global_params.g_prac_mov,
        closable: false,
        minimizable: c.global_params.g_prac_min,
        transparent: false,
        orientation: "C",
        alwaystop: true,
        cover: true,
        x_frame: true
    }, mac);
}

function ok_bubble(c, ctx, time, mac, params) {
    var position_ok = {
        FP: '0',
        EP: new ctx.ElementRef('0:0:0:0:1:0', '', 0, 0, 'eep_path=\"0:0:0:0:0:0\";eep_options=3;eep_version=\"6.1.0\";eep_atts={tagName:\"IMG\"};eep_coll={n:\"images\",i:0,ii:-1};eep_parents=[{id:\"dgo_base_div\",tagName:\"DIV\"},{tagName:\"TD\"},{tagName:\"TR\"},{tagName:\"TBODY\"},{tagName:\"TABLE\"}];eep_siblingTags2=\"_IMG_:FORM\";'),
        Off:   { x:0,   y:  0 },
        XY:    { x:0.5, y:0.5 },
        DocXY: { x:0.5, y:0.5 }
    };
    c.ew.textbubble(ctx, time, {
        relpos: position_ok,
        customStyle: c.global_params.g_bubblestyle_ok,
        textStyle: "StyleOK",
        type: "element",
        orientation: "C",
        width: "80",
        height: "30",
        style: "comic",
        replace: true,
        alwaystop: true,
        cover: true,
        x_frame: true,
        movable: false,
        closable: false,
        minimizable: false,
        transparent: false,
        text: "<B><P style=\"width:100%;height:100%;vertical-align:top;margin:0px;padding:0px;border:0px none;text-align:center\">" + ctx.cfg_tr('TOK_OK') + "</P></B>",
        object_name: c.global_params.g_skip_ok_bubble_on_mistake ? "ok_bubble_skip" : "ok_bubble"
    }, mac);

    c.ew.pause(ctx, time, { type: "timeout", timeout: "1" }, mac);

    c.ew.textbubble(ctx, time, { type: "close", object_name: c.global_params.g_skip_ok_bubble_on_mistake ? "ok_bubble_skip" : "ok_bubble" }, mac);
}

function default_highlight_off(c, ctx, time, mac, params) {
    c.ew.textbubble(ctx, time, {
                relpos: params.position_h, object_name: "hl", type: "close" }, mac);
}

function default_bubble_close(c, ctx, time, mac, params) {
    // timed_alert(c, ctx, time, mac, 'default-bubble-close');

    c.ew.textbubble(ctx, time, { type: "close", object_name: "_default" }, mac);
}

function jump_to_target(c, ctx, time, mac, params) {
    // a jump_to_target will break audio if the bubble duration not -1
    if (params.jump_target && params.jump_target.length) {
        // if playing audio, put the jump after the audio to avoid cutting it
        if (!c.global_params.g_action_after_audio &&
            c.ts_audio_duration > 0 &&
            c.show_audio && params.b_duration >= 0 &&
            time > 0)
        {
            time += c.ts_audio_duration;
        }
        else {
            c.jumped = true;
    }
    }
    c.ew.javascript(ctx, time, {
        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: c.h.EVAL_TEMPLATE("jump_to_target", params)
    }, mac);
}

function clone_jsobject(obj) {
    var cl = {};
    for (i in obj) {
        if (typeof(obj[i]) == 'object') {
            cl[i] = clone_jsobject(obj[i]);
        } else {
            cl[i] = obj[i];
        }
    }
    return cl;
}

function calculateMouseAction(c, ctx, time, mac, params) {
    var action = params.action || 'lclick';
    if (params.ctrl_key) {
        action = 'ctrl ' + action;
    }
    if (params.shift_key) {
        action = 'shift ' + action;
     }
    if (params.alt_key) {
        action = 'alt ' + action;
    }
    c.lastAction = action;
    return c.lastAction;
}

function move_mouse(c, ctx, time, mac, params, clickfollows) {
    var mouse_pos = clone_jsobject(params.position_h);
    if (clickfollows) {
        mouse_pos.XY.x = 0.5;
        mouse_pos.XY.y = 0.5;
    } else {
        mouse_pos.XY.x = 0.8;
        mouse_pos.XY.y = 0.6;
    }
    c.ew.mouse(ctx, time, {
        relpos: mouse_pos, duration: -1, type: params.action == 'drop' ? c.lastAction : 'position'
    }, mac);
}

function ani_mouse(c, ctx, time, mac, params) {
    var mouse_pos = clone_jsobject(params.position_h);
    mouse_pos.XY.x = 0.5;
    mouse_pos.XY.y = 0.5;
    c.ew.mouse(ctx, time, {
        relpos: mouse_pos, duration: 10 /* no animation */, type: calculateMouseAction(c, ctx, time, mac, params)
    }, mac);
}

function test_watch(c, ctx, time, mac, params) {
    var txt = c.global_params.g_watch_failure_without_focus
        ? "evt_watch(-1, WATCH_SHOWSCORE | WATCH_FAILURE_WITHOUT_FOCUS | WATCH_HELP | WATCH_DEFAULT_ANIMATED | WATCH_DEFAULT | WATCH_COMPLETE_FEEDBACK | WATCH_FORBID_ALL, null, null, null);"
        : "evt_watch(-1, WATCH_SHOWSCORE | WATCH_HELP | WATCH_DEFAULT_ANIMATED | WATCH_DEFAULT | WATCH_COMPLETE_FEEDBACK | WATCH_FORBID_ALL, null, null, null);";

    c.ew.javascript(ctx, time, {
        relpos: {FP: "-1", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: txt
    }, mac);
}

function practice_watch(c, ctx, time, mac, params) {
    var txt = c.global_params.g_watch_failure_without_focus
        ? "evt_watch(-1, WATCH_HELP | WATCH_FAILURE_WITHOUT_FOCUS | WATCH_DEFAULT | WATCH_DEFAULT_ANIMATED | WATCH_COMPLETE_FEEDBACK | WATCH_FORBID_ALL, null, null, null); "
        : "evt_watch(-1, WATCH_HELP | WATCH_DEFAULT | WATCH_DEFAULT_ANIMATED | WATCH_COMPLETE_FEEDBACK | WATCH_FORBID_ALL, null, null, null); ";

    c.ew.javascript(ctx, time, {
        relpos: {FP: "-1", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: txt
    }, mac);
}

function form_test_watch(c, ctx, time, mac, params) {
    c.ew.javascript(ctx, time, {
        relpos: {FP: "-1", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: "evt_watch(-1, WATCH_SHOWSCORE | WATCH_HELP | WATCH_DEFAULT_ANIMATED | WATCH_DEFAULT | WATCH_COMPLETE_FEEDBACK | WATCH_FORBID_ALL, null, " + ctx.pj_possible_form_points + ", null);"
    }, mac);
}

function form_practice_watch(c, ctx, time, mac, params) {
    c.ew.javascript(ctx, time, {
        relpos: {FP: "-1", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: "evt_watch(-1, WATCH_HELP | WATCH_DEFAULT | WATCH_DEFAULT_ANIMATED | WATCH_COMPLETE_FEEDBACK | WATCH_FORBID_ALL, null, " + ctx.pj_possible_form_points + ", null); "
    }, mac);
}

function do_watch(c, ctx, time, mac, params) {
    if (!c.form_mode && !c.branch_mode) {
        if (c.active_mode == "uebung") {
            practice_watch(c, ctx, time, mac, params);
        } else if (c.active_mode == "test") {
            test_watch(c, ctx, time, mac, params);
        }
    } else if (c.form_mode) {
        ctx.pj_possible_form_points += 3;
    }
}

function set_track_info(c, ctx, time, mac, params) {
    if (typeof(c.bubbles) == 'string') {
        var task = c.bubbles;
    } else {
        task = c.h.EVAL_TEMPLATE("bubbletext_p", params);
    }
    task = task.replace(/\n/g, '\\n').replace(/\r/g, '').replace(/'/g, '\\\'');
    var par = "{macuid:'" + mac.uid + "', task:'" + task + "', " + "timestamp: '" + (new Date()).toString() + "'}";
    c.ew.javascript(ctx, time, {
        relpos: {FP: "-1", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: "evt_settrackinfo(-1, " + par + ", '{uid:\"" + mac.uid + "\"}');"
    }, mac);
}

function default_wait(c, ctx, time, mac, params) {
    set_track_info(c, ctx, time, mac, params);
    c.ew.javascript(ctx, time, {
        relpos: {FP: "-1", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: "evt_wait(-1, WAIT_DISABLE_GUI_NAVIGATION, { uid: '" + params.uid + "' });"
    }, mac);
}

function focus_wait(c, ctx, time, mac, params) {
    set_track_info(c, ctx, time, mac, params);
    c.ew.javascript(ctx, time, {
        relpos: {FP: "-1", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: "ctx_window.focus();evt_wait(-1, WAIT_DISABLE_GUI_NAVIGATION, { uid: '" + params.uid + "' });"
    }, mac);
}

function add_branch_bubble_d(c, ctx, time, mac, params) {
    if (typeof(c.bubbles) == 'string') {
        c.bubbles += "<BR><P style=\"text-align:center\">" + ctx.cfg_tr('EXER_OR') + "</P>";
    } else {
        c.bubbles = '';
    }
    c.cfg_setcurmac(mac.uid, true);
    if (params.jump_target.length) {
        c.bubbles += c.cfg_resolve_string_against(c.h.EVAL_TEMPLATE("demo_branch_link", params), 'macro:');
    } else {
        c.bubbles += c.cfg_resolve_string_against(c.h.EVAL_TEMPLATE("demo_branch_link_none", params), 'macro:');
    }
}

function add_or_bubble_p(c, ctx, time, mac, params) {
    if (typeof(c.bubbles) == 'string') {
        c.bubbles += "<BR><P style=\"text-align:center\">" + ctx.cfg_tr('EXER_OR') + "</P>";
    } else {
        c.bubbles = '';
    }
    c.cfg_setcurmac(mac.uid, true);
    c.bubbles += c.cfg_resolve_string_against(c.h.EVAL_TEMPLATE("bubbletext_p", params), 'macro:');
}

function add_and_bubble_p_drag(c, ctx, time, mac, params) {
    if (typeof(c.bubbles) == 'string') {
        c.bubbles += "<BR><P style=\"text-align:center\">" + ctx.cfg_tr('EXER_AND') + "</P>";
    } else {
        c.bubbles = '';
    }
    c.cfg_setcurmac(mac.uid, true);
    c.bubbles += c.cfg_resolve_string_against(c.h.EVAL_TEMPLATE("bubbletext_p", params), 'macro:');
}

function add_and_bubble_p(c, ctx, time, mac, params) {
    if (typeof(c.dragging) != 'undefined' && c.dragging) {
        return add_and_bubble_p_drag(c, ctx, time, mac, params);
    }

    if (!c.form_bubble_open) {
        if (!c.bubbles) {
            c.form_bubble_open = true;
            c.bubbles = "<p style='vertical-valign:top;border:0px none;margin:0px;padding:0px'>";
            c.bubbles += ctx.cfg_tr('EXER_FORM_PREFIX');
            c.bubbles += "</p><BR>";
            c.bubbles += "<p><table cellspacing=\"4\" style=\"border-spacing:4px\">";
            c.bubbleclicks = '';
            c.bubbleclicks_lastvalue = 'xxx'; /* anything but empty string */
        }
    }

    var value;
    if (typeof(params.text_d) == 'string') {
        value = "<b>" + params.text_d + "</b>";
    } else if (typeof(params.choose_text) == 'string') {
        value = "<b>" + params.choose_text + "</b>";
    } else if (typeof(params.choose_bool) == 'string') {
        c.cfg_setcurmac(mac.uid, true);
        value = c.cfg_resolve_string_against(c.h.EVAL_TEMPLATE("bubbletext_p", params), 'macro:');
        if (!value) value = '<BR>';
    }

    if (value) {
        if (typeof(params.fieldname) == 'string' && params.fieldname.length) {
            c.bubbles += "<tr><td valign='top' align='right' style='text-align:right;vertical-align:top'>" + params.fieldname + ":</td><td valign='bottom' style='text-align:left;vertical-align:bottom'>" + (value || "<BR>") + "</td>" + "</tr>";
        } else {
            c.bubbles += "<tr><td valign='top' align='right' style='text-align:right;vertical-align:top'></td><td valign='bottom' style='text-align:left;vertical-align:bottom'>" + (value || "<BR>") + "</td>" + "</tr>";
        }
    } else {
        /* Do not close bubble here because DPS-10991 */
        if (c.bubbleclicks_lastvalue == '') {
            c.bubbleclicks += '<BR>';
        }
        if (c.bubbleclicks != '') {
            c.bubbleclicks += "<CENTER>" + ctx.cfg_tr('EXER_OR') + "</CENTER>";
        }
        c.cfg_setcurmac(mac.uid, true);
        c.bubbleclicks_lastvalue = c.cfg_resolve_string_against(c.h.EVAL_TEMPLATE("bubbletext_p", params), 'macro:');
        c.bubbleclicks += c.bubbleclicks_lastvalue;
    }
}

function handle_test_practice(c, ctx, time, mac, params) {
    if (c.branch_mode) {
        if (c.active_mode != 'uebung' || params.show_bubble_p) {
        if (c.form_mode && (params.action == 'drop')) {
            add_and_bubble_p(c, ctx, time, mac, params);
        } else {
            add_or_bubble_p(c, ctx, time, mac, params);
        }
        }
        if (params.show_hl_p && (c.active_mode != "test")) {
            multi_highlight(c, ctx, time, mac, params.position_h);
        }
    } else if (c.form_mode) {
        if (c.active_mode != 'uebung' || params.show_bubble_p) {
        add_and_bubble_p(c, ctx, time, mac, params);
        }
        if (params.show_hl_p && (c.active_mode != "test")) {
            multi_highlight(c, ctx, time, mac, params.position_h);
        }
    } else {
        if (c.active_mode == "uebung") {
            if (c.show_text && params.show_bubble_p) p_bubble(c, ctx, time, mac, params);

            if (params.show_hl_p) {
                default_highlight(c, ctx, time, mac, params.position_h);
            }
        } else if (c.active_mode == "test") {
            if (c.global_params.g_show_step_bubble) {
                step_bubble(c, ctx, time, mac, params);
            }
        }

        default_wait(c, ctx, time, mac, params);
        default_highlight_off(c, ctx, time, mac, params);

        if (c.active_mode == 'test' && c.global_params.g_show_ok_bubble) {
            ok_bubble(c, ctx, time, mac, params);
        }
        transition_end_jump(c, ctx, time, mac, params);
    }
}

function transition_end_jump(c, ctx, time, mac, params) {
    c.ew.javascript(ctx, time, {
        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: "ctx.cfg_jumptransition();"
    }, mac);
}

function multi_macro_end(c, ctx, time, mac, params) {
    if (c.active_mode == "uebung" && params.show_bubble_p && typeof c.bubbles != 'string') {
        c.bubbles = '';
        c.form_bubble_open = false;
        c.bubbleclicks = null;
    }

    if (typeof(c.bubbles) == 'string') {
        if (c.form_bubble_open) {
            c.form_bubble_open = false;
            c.bubbles += '</table></p>';
        }
        if (typeof(c.bubbleclicks) == 'string') {
            c.bubbles += "<P style=\"text-align:center\">" + ctx.cfg_tr('EXER_AND') + "</P>";
            c.bubbles += c.bubbleclicks;
        }
        c.bubbleclicks = null;
        params.explanation_p = c.bubbles;
        if ((c.active_mode == "uebung" || c.global_params.g_show_step_bubble) && params.show_bubble_p) {
            p_bubble(c, ctx, time, mac, params);
        }
    }

    default_wait(c, ctx, time, mac, params);
    remove_multi_hls(c, ctx, time, mac, params);
    if (c.active_mode == 'test' && c.global_params.g_show_ok_bubble) {
        ok_bubble(c, ctx, time, mac, params);
    }
    transition_end_jump(c, ctx, time, mac, params);
}

function tour_init(c, ctx) {
    if (!c.initialized) {
        c.initialized = true;
        if (!ctx.udc.playback_mode) {
            if (c.active_mode == 'test' &&
                (ctx.cfg_config('hide_audio_text_buttons') ||
                 ctx.cfg_config('hidden') ||
                 ctx.cfg_config('skin') == 'hidden'))
            {
                ctx.udc.playback_mode = 'text';
            }
            else {
                if (ctx.cfg_config('playback_mode') != '') {
                    ctx.udc.playback_mode = ctx.cfg_config('playback_mode');
                }
                else {
                    var def = ctx.cfg_config('mute') ? 'text' : 'audiotext';
                    ctx.udc.playback_mode = ctx.cfg_getCookie('pbm' + c.active_mode, def);
                }
            }
        }
    }

    var m = ctx.udc.playback_mode;
    if (m == 'audio') {
        c.show_audio = true;
        c.show_text = false;
    } else if (m == 'audiotext') {
        c.show_audio = true;
        c.show_text = true;
    } else {
        c.show_audio = false;
        c.show_text = true;
    }
    ctx.cfg_setconfig("mute", !c.show_audio);
    ctx.cfg_refreshgui();
}

MacroSet.prototype.start_tourstop = function(c, ctx, time, params) {
    var pc = new ParamChecker(c.defaults, "start_tourstop", params);

    pc.Check("name", "TEXT", "");
    pc.Check("label", "TEXT", "");
    pc.Check("index", "INTEGER", -1);

    c.active_mode = c.mode;
    tour_init(c, ctx);
    // alert(params.label);

    if (ctx.udc.replay_jump_target &&
        ctx.udc.replay_jump_target == 'init')
    {
        ctx.udc.replay_jump_target = params.name;
    }
    // SET replay_intro, dump_w, dump_h IF NOT SET YET
    if (!ctx.udc.replay_intro) ctx.udc.replay_intro = c.ts_name;
    if (!ctx.udc.dump_w) ctx.udc.dump_w = 995;
    if (!ctx.udc.dump_h) ctx.udc.dump_h = 605;

    c.ts_first = true;
    c.ts_idx = params.index;
    c.ts_name = params.name;
    c.ts_audio_duration = params.audio_duration;
    c.ts_event_duration = params.event_duration;
    c.show_audio = !ctx.cfg_config("mute");
    c.jumped = false;
}

MacroSet.prototype.end_tourstop = function(c, ctx, time, params) {
    var pc = new ParamChecker(c.defaults, "end_tourstop", params);

    // alert("End Tourstop:" + c.active_mode);
}


MacroSet.prototype.start_unit = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "start_unit", params);

    pc.Check("possible_points", "INTEGER", 0);
    pc.Check("mastery_score", "INTEGER", 0);
    pc.Check("task_text", "HTML");
    pc.Check("task_width", "INTEGER", 240);
    pc.Check("task_height", "INTEGER", 0);
    pc.Check("task_orientation", "ORIENTATION_BUBBLE", "NW");
    pc.Check("task_bgcolor", "COLOR", "#FFFFB7");
    pc.Check("in_practice", "BOOL_0_1", 0);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("config_templates", "TXT_TEXT_LONG", "");

    c.initialized = false; /* DPS-12587 */
    tour_init(c, ctx);
    c.lastAction = 'position'; /* for mouse movements */
    trainer_check(c, ctx, time, mac, params);

    log_init(c, ctx, time, mac, params);
    /* DPS-9194 */
    init_show_demo(c, ctx, time, mac, params);

    switch(c.active_mode) {
        case "demo":
            lms_init(c, ctx, time, mac, params);

        break;
        case "uebung":
            lms_init(c, ctx, time, mac, params);

            if (params.in_practice) {
                c.cfg_setcurmac(mac.uid, true);
                c.task_params = {
                    task_mac: mac,
                    task_text: c.cfg_resolve_string_against(c.h.EVAL_TEMPLATE("start_unit__bubble_text_task", params), 'macro:'),
                    task_width: params.task_width,
                    task_height: params.task_height,
                    task_orientation: params.task_orientation
            }
                c.task_bubble_visible = false;
                if (!c.last_page_is_special) {
                    if (c.task_params && !c.task_bubble_visible && !c.jumped) {
                        show_task_bubble(c, ctx, time, c.task_params, mac);
                        c.task_bubble_visible = true;
                    }
                }
            }
            break;
        case "test":
            lms_init(c, ctx, time, mac, params);

            if (params.in_test) {
                c.cfg_setcurmac(mac.uid, true);
                c.task_params = {
                    task_mac: mac,
                    task_text: c.cfg_resolve_string_against(c.h.EVAL_TEMPLATE("start_unit__bubble_text_task", params), 'macro:'),
                    task_width: params.task_width,
                    task_height: params.task_height,
                    task_orientation: params.task_orientation
            }
                c.task_bubble_visible = false;
                if (!c.last_page_is_special) {
                    if (c.task_params && !c.task_bubble_visible && !c.jumped) {
                        show_task_bubble(c, ctx, time, c.task_params, mac);
                        c.task_bubble_visible = true;
                    }
                }
            }
            break;
        case "praxis":
            // Set Focus to Window
            c.ew.javascript(ctx, time, {
                relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                text: "ctx_window.focus();"
            }, mac);
        break;

    };
}


MacroSet.prototype.new_page = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "new_page", params);

    pc.Check("dump_page", "RELATIVE_URL");
    pc.Check("new_step", "TEXT");
    pc.Check("doc_enable", "BOOL_YES_NO", 1);
    pc.Check("process_enable", "BOOL_YES_NO", 1);
    pc.Check("doc_heading", "BOOL_YES_NO", 1);
    pc.Check("imagesize", "INTEGER", 100);
    pc.Check("screenshot_file", "IMAGE");
    pc.Check("screenshot_rect", "POSSIZE");
    pc.Check("dump_page_size", "SIZE");
    pc.Check("screenshot_border", "INTEGER");
    pc.Check("element_type", "TEXT");

    c.last_page_is_special = false;
    if (ctx.cfg_config('recording_mode') != 'nodump') {
        c.ew.fileurl(ctx, time, {
            url: 'macro:' + params.dump_page + "/index.html",
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} }
        }, mac);
    } else {
        c.ew.fileurl(ctx, time, {
            url: null,
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} }
        }, mac);
    }
    c.ew.loaded(ctx, time, { }, mac);

    c.bubbles = null;
    c.bubbleclicks = null;
    c.branch_mode = false;
    c.form_mode = false;
    c.highlights = [];

    c.ew.loaded(ctx, time, { }, mac);

    log_request(c, ctx, time, mac, { index: c.ts_idx, label: params.new_step }, "page_view");

    page_init(c, ctx, time, mac, params);

    if (c.task_params && !c.task_bubble_visible && !c.jumped) {
        show_task_bubble(c, ctx, time, c.task_params, mac);
        c.task_bubble_visible = true;
}
}

MacroSet.prototype.imported_page = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "new_page", params);

    pc.Check("dump_page", "RELATIVE_URL");
    pc.Check("new_step", "TEXT");
    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 0);
    pc.Check("in_prax", "BOOL_0_1", 0);
    pc.Check("page_duration", "INTEGER", 3);

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test") ||
        (params.in_prax && c.active_mode == "praxis"))
    {
        c.last_page_is_special = false;
        if (ctx.cfg_config('recording_mode') != 'nodump') {
            c.ew.fileurl(ctx, time, {
                url: 'macro:' + params.dump_page + "/index.html",
                relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} }
            }, mac);
        } else {
            c.ew.fileurl(ctx, time, {
                url: null,
                relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} }
            }, mac);
        }
        c.ew.loaded(ctx, time, { }, mac);

        c.bubbles = null;
        c.bubbleclicks = null;
        c.branch_mode = false;
        c.form_mode = false;
        c.highlights = [];

        c.ew.loaded(ctx, time, { }, mac);

        page_init(c, ctx, time, mac, params);

        c.ew.pause(ctx, time, { timeout: params.page_duration, type: "timeout" }, mac);
    }
}

MacroSet.prototype.new_slide = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "new_slide", params);

    pc.Check("new_step", "TEXT");
    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 0);
    pc.Check("in_test", "BOOL_0_1", 0);
    pc.Check("in_prax", "BOOL_0_1", 1);
    pc.Check("page_duration", "INTEGER", -1);

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test") ||
        (params.in_prax && c.active_mode == "praxis"))
    {
        if (ctx.cfg_config('recording_mode') != 'nodump') {
            c.ew.slideurl(ctx, time, {
                uid: params.uid,
                filename: params.filename,
                relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} }
            }, mac);
        } else {
            c.ew.fileurl(ctx, time, {
                url: null,
                relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} }
            }, mac);
        }

        c.ew.loaded(ctx, time, { }, mac);

        page_init(c, ctx, time, mac, params);

        c.ew.pause(ctx, time, { timeout: params.page_duration, type: "timeout" }, mac);
        log_request(c, ctx, time, mac, { index: c.ts_idx, label: params.new_step }, "slide_view");
    }
}

MacroSet.prototype.new_window = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "new_window", params);

    pc.Check("dump_page", "RELATIVE_URL");
    pc.Check("new_step", "TEXT");
    pc.Check("dump_win_relpos", "RELPOS_DOCREF");
    pc.Check("dump_win_left", "INTEGER");
    pc.Check("dump_win_top", "INTEGER");
    pc.Check("dump_win_width", "INTEGER");
    pc.Check("dump_win_height", "INTEGER");
    pc.Check("doc_enable", "BOOL_YES_NO", 1);
    pc.Check("doc_heading", "BOOL_YES_NO", 1);
    pc.Check("imagesize", "INTEGER", 100);
    pc.Check("screenshot_file", "IMAGE");
    pc.Check("screenshot_rect", "POSSIZE");
    pc.Check("screenshot_border", "INTEGER");
    pc.Check("record_window_id", "INTEGER");
    pc.Check("element_type", "TEXT");
    pc.Check("rerec_manual", "BOOL_0_1");
    pc.Check("exec_mouse", "BOOL_0_1");

    c.bubbles = null;
    c.bubbleclicks = null;
    c.branch_mode = false;
    c.form_mode = false;
    c.highlights = [];

    c.ew.window(ctx, time, {
        url: 'macro:' + params.dump_page + "/index.html",
        relpos: params.dump_win_relpos,
        left: params.dump_win_left,
        top: params.dump_win_top,
        width: params.dump_win_width,
        height: params.dump_win_height,
        type: "open",
        menubar: "no",
        toolbar: "no",
        location: "no",
        status: "no",
        resizable: "no",
        scrollbars: "no"
    }, mac);

    c.ew.loaded(ctx, time, { }, mac);

    log_request(c, ctx, time, mac, { index: c.ts_idx, label: params.new_step }, "page_view");

    page_init(c, ctx, time, mac, params);
}


MacroSet.prototype.new_window_close = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "new_window_close", params);

    pc.Check("win_relpos", "RELPOS_DOCREF");

    c.ew.window(ctx, time, {
                relpos: params.win_relpos, type: "close" }, mac);
}


MacroSet.prototype.explanation = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "explanation", params);

    pc.Check("fieldname", "TEXT");
    pc.Check("fieldicon", "IMAGE");
    pc.Check("explanation_d", "HTML");
    pc.Check("explanation_p", "HTML");
    pc.Check("position_h", "RELPOS_RECT");
    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 0);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);
    pc.Check("show_hl_d", "BOOL_0_1", 1);
    pc.Check("show_hl_p", "BOOL_0_1", 1);

    pc.Check("position_b", "RELPOS");
    pc.Check("bubblestyle_d", "SHELF", "_default");
    pc.Check("b_width", "INTEGER", 180);
    pc.Check("b_height", "INTEGER", 40);
    pc.Check("orientation", "ORIENTATION_BUBBLE", "SE");
    pc.Check("b_duration", "INTEGER", 3);

    pc.Check("position_bu", "RELPOS");
    pc.Check("bubblestyle_p", "SHELF");
    pc.Check("b_width_p", "INTEGER", 180);
    pc.Check("b_height_p", "INTEGER", 40);
    pc.Check("orientation_p", "ORIENTATION_BUBBLE");
    pc.Check("b_duration_p", "INTEGER", 3);
    pc.Check("doc_enable", "BOOL_YES_NO", 1);
    pc.Check("screenshot_rect", "POSSIZE");
    pc.Check("explanation_d_modified", "BOOL_0_1");
    pc.Check("explanation_p_modified", "BOOL_0_1");

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test") ||
        (params.in_prax && c.active_mode == "praxis"))
    {

        if (c.active_mode == "demo") {
            if (params.show_hl_d) {
                default_highlight(c, ctx, time, mac, params.position_h);
            }
            d_bubble(c, ctx, time, mac, params);
            if (params.b_duration > 0) {
                c.ew.pause(ctx, time, { timeout: params.b_duration, type: "timeout" }, mac);
            }
        } else if (c.active_mode == "praxis")  {
            if (params.show_hl_d) {
                default_highlight(c, ctx, time, mac, params.position_h);
            }
            x_bubble(c, ctx, time, mac, params);
            if (params.b_duration > 0) {
                c.ew.pause(ctx, time, { timeout: params.b_duration, type: "timeout" }, mac);
            }
        } else {
            if (params.show_hl_p) {
                default_highlight(c, ctx, time, mac, params.position_h);
            }
            p_bubble(c, ctx, time, mac, params);
            if (params.b_duration_p > 0) {
                c.ew.pause(ctx, time, { timeout: params.b_duration_p, type: "timeout" }, mac);
            }
        }

        default_highlight_off(c, ctx, time + duration, mac, params);
        default_bubble_close(c, ctx, time + duration, mac, params);
    }
}


MacroSet.prototype.explanation_long = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "explanation_long", params);

    pc.Check("fieldname", "TEXT");
    pc.Check("fieldicon", "IMAGE");
    pc.Check("explanation_d", "HTML");
    pc.Check("type", "ENUM", "none");
    pc.Check("all_like_demo", "BOOL_0_1");

    pc.Check("show_nav_buttons", "BOOL_0_1", 1);
    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);
    pc.Check("element_type", "TEXT");

    pc.Check("position_h", "RELPOS_RECT");
    pc.Check("position_b", "RELPOS");
    pc.Check("bubblestyle_d", "SHELF", "_default");
    pc.Check("b_width", "INTEGER", 400);
    pc.Check("b_height", "INTEGER", 40);
    pc.Check("orientation", "ORIENTATION_BUBBLE", "C");
    pc.Check("b_duration", "INTEGER", -1);

    pc.Check("explanation_p", "HTML", params.explanation_d);
    pc.Check("position_bu", "RELPOS", params.position_b);
    pc.Check("bubblestyle_p", "SHELF", params.bubblestyle_d);
    pc.Check("b_width_p", "INTEGER", params.b_width);
    pc.Check("b_height_p", "INTEGER", params.b_height);
    pc.Check("orientation_p", "ORIENTATION_BUBBLE", params.orientation);
    pc.Check("b_duration_p", "INTEGER", params.b_duration);

    pc.Check("show_hl_d", "BOOL_0_1", 0);
    pc.Check("show_hl_p", "BOOL_0_1", 0);

    var has_audio = c.ts_audio_duration > 0 && c.show_audio;
    var show_text = !has_audio || c.show_text;
    if (!show_text && !c.global_params.g_always_show_explanations) return;

    /* DPS-1618
    if (!params.show_nav_buttons) {
        if (params.b_duration < 0) params.b_duration = 3;
        if (params.b_duration_p < 0) params.b_duration_p = 3;
    }
    */

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test") ||
        (params.in_prax && c.active_mode == "praxis"))
    {

        if (c.active_mode == "demo" || c.active_mode == "praxis" || params.all_like_demo) {
            params.bubbletext =  params.explanation_d;
            params.bubble_position = params.position_b;
            params.bubble_style = params.bubblestyle_d;
            params.bubble_orientation = params.orientation;
            params.bubble_width = params.b_width;
            params.bubble_height = params.b_height;
            params.bubble_duration = params.b_duration;
            params.show_hl = params.show_hl_d;
        } else {
            params.bubbletext =  params.explanation_p;
            params.bubble_position = params.position_bu;
            params.bubble_style = params.bubblestyle_p;
            params.bubble_orientation = params.orientation_p;
            params.bubble_width = params.b_width_p;
            params.bubble_height = params.b_height_p;
            params.bubble_duration = params.b_duration_p;
            params.show_hl = params.show_hl_p;
        }

        if (params.show_hl && params.position_h) default_highlight(c, ctx, time, mac, params.position_h);

        if (c.active_mode == "test") {
            if (params.show_nav_buttons) {
                params.bubbletext_expanded = c.h.EVAL_TEMPLATE("explanation_long_nav_forw", params);
            } else {
                params.bubbletext_expanded = c.h.EVAL_TEMPLATE("explanation_long_nonav", params);
            }
        } else if (c.active_mode == "praxis") {
            params.bubbletext_expanded = c.global_params.g_no_praxis_links
                ? c.h.EVAL_TEMPLATE("explanation_long_nonav", params)
                : c.h.EVAL_TEMPLATE("explanation_long_nav_all", params);
        } else {
            if (params.show_nav_buttons) {
                params.bubbletext_expanded = c.h.EVAL_TEMPLATE("explanation_long_nav_all", params);
            } else {
                params.bubbletext_expanded = c.h.EVAL_TEMPLATE("explanation_long_nonav", params);
            }
        }

        bubble(c, ctx, time, mac, params);

        /* DPS-2160 DPS-2697 type timeout with timeout == -1 waits for end of audio */
        if (params.bubble_duration < 0 || c.active_mode == "praxis") {
            c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);
        } else if (params.bubble_duration > 0) {
            c.ew.pause(ctx, time, { timeout: params.bubble_duration, type: "timeout" }, mac);
        }

        if (params.show_hl) default_highlight_off(c, ctx, time + duration, mac, params);
        default_bubble_close(c, ctx, time + duration, mac, params);
    }
}


MacroSet.prototype.quick_click = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "quick_click", params);

    pc.Check("fieldname", "TEXT");
    pc.Check("fieldicon", "IMAGE");
    pc.Check("explanation_p", "HTML");
    pc.Check("action", "ENUM", "lclick");
    pc.Check("position_h", "RELPOS_RECT");
    pc.Check("position_bu", "RELPOS");
    pc.Check("doc_enable", "BOOL_YES_NO", 1);
    pc.Check("screenshot_file", "IMAGE");
    pc.Check("screenshot_rect", "POSSIZE");
    pc.Check("element_type", "TEXT");
    pc.Check("click_pos", "POSITION");
    pc.Check("jump_target", "TOURSTOP_CAPTION");

    switch(c.active_mode) {
        case "demo":
            if (!c.branch_mode) {
                default_highlight(c, ctx, time, mac, params.position_h);

                c.ew.pause(ctx, time, { type: "timeout", timeout: "1" }, mac);

                default_highlight_off(c, ctx, time + duration, mac, params);

                jump_to_target(c, ctx, time + duration, mac, params);
            }
        break;
        case "uebung":
        case "test":
            do_watch(c, ctx, time, mac, params);

            default_bubble_close(c, ctx, time, mac, params);

            if (c.form_mode) {
                c.ew.javascript(ctx, time, {
                    text: c.h.EVAL_TEMPLATE("click_trans_pt_form", params),
                    relpos: params.position_h
                }, mac);
            } else {
                c.ew.javascript(ctx, time, {
                    text: c.h.EVAL_TEMPLATE("click_trans_pt_standard", params),
                    relpos: params.position_h
                }, mac);
            }

            c.ew.javascript(ctx, time, {
                relpos: params.position_h,
                text: c.h.EVAL_TEMPLATE("click__jstext_trig_pt", params)
            }, mac);

            if (c.active_mode == "uebung") {
                c.ew.highlight(ctx, time, {
                    relpos: params.position_h,
                    effect: "frame",
                    rgbcolor: "#FF0000",
                    // style: "",
                    // fillstyle: "img: yellow25tr",
                    object_name: register_multi_hl(c, ctx),
                    border: "4"
                }, mac);
            }

            handle_test_practice(c, ctx, time, mac, params);

            break;
        break;
        case "praxis":
            default_highlight(c, ctx, time, mac, params.position_h);

            c.ew.pause(ctx, time, { type: "timeout", timeout: "1" }, mac);

            default_highlight_off(c, ctx, time, mac, params);

            jump_to_target(c, ctx, time, mac, params);
        break;

    };
}


MacroSet.prototype.free_highlight = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };


    var pc = new ParamChecker(c.defaults, "click", params);

    pc.Check("position_h", "RELPOS_RECT");
    pc.Check("obj_name", "TEXT", "highlight1");
    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);
    pc.Check("highlight_off", "BOOL_0_1", 0);

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test") ||
        (params.in_prax && c.active_mode == "praxis"))
    {
        if (params.highlight_off) {
            c.ew.textbubble(ctx, time, {
                relpos: params.position_h, object_name: params.obj_name, type: "close" }, mac);
        } else {

            if (!params.highlight_rgb) params.highlight_rgb = c.global_params.g_highlight_rgb;

            c.ew.highlight(ctx, time, {
                relpos: params.position_h,
                border: c.global_params.g_highlight_border,
                effect: c.global_params.g_highlight_effect,
                object_name: params.obj_name,
                style: c.global_params.g_highlight_style,
                fillstyle: c.global_params.g_highlight_fillstyle,
                rgbcolor: params.highlight_rgb
            }, mac);
        }
    }
}


MacroSet.prototype.click = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "click", params);

    pc.Check("fieldname", "TEXT");
    pc.Check("fieldicon", "IMAGE");
    pc.Check("explanation_d", "HTML");
    pc.Check("explanation_p", "HTML");
    pc.Check("hotkey", "TEXT");
    pc.Check("action", "ENUM", "lclick");
    pc.Check("ctrl_key", "BOOL_0_1", 0);
    pc.Check("alt_key", "BOOL_0_1", 0);
    pc.Check("shift_key", "BOOL_0_1", 0);
    pc.Check("position_h", "RELPOS_RECT");
    pc.Check("show_hl_d", "BOOL_0_1", 1);
    pc.Check("show_hl_p", "BOOL_0_1", 0);
    pc.Check("bubblestyle_d", "SHELF", "_default");
    pc.Check("b_width", "INTEGER", 150);
    pc.Check("b_height", "INTEGER", 40);
    pc.Check("orientation", "ORIENTATION_BUBBLE", "SE");
    pc.Check("position_b", "RELPOS");
    pc.Check("b_duration", "INTEGER", 3);
    pc.Check("bubblestyle_p", "SHELF", "_default");
    pc.Check("b_width_p", "INTEGER", 180);
    pc.Check("b_height_p", "INTEGER", 40);
    pc.Check("orientation_p", "ORIENTATION_BUBBLE", "C");
    pc.Check("position_bu", "RELPOS");
    pc.Check("doc_enable", "BOOL_YES_NO", 1);
    pc.Check("screenshot_file", "IMAGE");
    pc.Check("screenshot_rect", "POSSIZE");
    pc.Check("element_type", "TEXT");
    pc.Check("click_pos", "POSITION");
    pc.Check("click_count", "INTEGER", 1);
    pc.Check("rerec_manual", "BOOL_0_1");
    pc.Check("exec_mouse", "BOOL_0_1");
    pc.Check("explanation_d_modified", "BOOL_0_1");
    pc.Check("explanation_p_modified", "BOOL_0_1");
    pc.Check("jump_target", "TOURSTOP_CAPTION");
    pc.Check("show_bubble_d", "BOOL_0_1", 1);
    pc.Check("show_bubble_p", "BOOL_0_1", 1);

    if (c.global_params.g_action_after_audio && c.show_audio && c.active_mode != "praxis") {
        time += c.ts_audio_duration;
    }

    switch(c.active_mode) {
        case "demo":
            if (c.branch_mode) {
                if (params.show_hl_d) multi_highlight(c, ctx, time, mac, params.position_h);
                if (params.show_bubble_d) add_branch_bubble_d(c, ctx, time, mac, params);
            } else {
                var has_audio = c.ts_audio_duration > 0 && c.show_audio;
                var show_text = params.show_bubble_d && (!has_audio || c.show_text);
                var audio_sync = has_audio && c.global_params.g_sync_demo_bubble_dur_to_audio;

                if (params.show_hl_d) default_highlight(c, ctx, time, mac, params.position_h);
                if (show_text) d_bubble(c, ctx, time, mac, params);

                if (c.global_params.g_show_mouse) {
                    if (params.is_input) {
                        move_mouse(c, ctx, time, mac, params, 0.05, 0.6);
                    } else {
                        move_mouse(c, ctx, time, mac, params, 0.7, 0.6);
                    }
                    ani_mouse(c, ctx, time, mac, params);
                }

                if (audio_sync) {
                    c.ew.pause(ctx, time, { timeout: 1, type: "timeout" }, mac);
                } else if (has_audio && !show_text && c.ts_first) {
                    c.ew.pause(ctx, time, { timeout: c.ts_audio_duration / 1000, type: "timeout" }, mac);
                } else {
                c.ew.pause(ctx, time, { timeout: params.b_duration, type: "timeout" }, mac);
                }
                c.ts_first = false;

                if (!audio_sync || c.global_params.g_action_after_audio) {
                    default_highlight_off(c, ctx, time + duration, mac, params);
                    default_bubble_close(c, ctx, time + duration, mac, params);
                }

                jump_to_target(c, ctx, time + duration, mac, params);
            }

        break;
        case "uebung":
        case "test":
            do_watch(c, ctx, time, mac, params);

            default_bubble_close(c, ctx, time, mac, params);
            if (params.action == 'drag') {
                c.dragging = true;
                c.form_mode = true;
            }

            if (c.form_mode) {
                c.ew.javascript(ctx, time, {
                    text: c.h.EVAL_TEMPLATE("click_trans_pt_form", params),
                    relpos: params.position_h
                }, mac);
            } else {
                if (!c.branch_mode &&
                    c.active_mode == "test" && c.global_params.g_show_step_bubble)
                {
                    step_bubble(c, ctx, time, mac, params);
                }

                c.ew.javascript(ctx, time, {
                    text: c.h.EVAL_TEMPLATE("click_trans_pt_standard", params),
                    relpos: params.position_h
                }, mac);
            }

            c.ew.javascript(ctx, time, {
                relpos: params.position_h,
                text: c.h.EVAL_TEMPLATE("click__jstext_trig_pt", params)
            }, mac);

            if (params.hotkey.length) {
                if (c.form_mode) {
                    c.ew.javascript(ctx, time, {
                        text: c.h.EVAL_TEMPLATE("click_trig_pt_key", params),
                        relpos: params.position_b
                    }, mac);
                } else {
                    c.ew.javascript(ctx, time, {
                        text: c.h.EVAL_TEMPLATE("click_trig_pt_key", params),
                        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} }
                    }, mac);
                }
            }

            handle_test_practice(c, ctx, time, mac, params);

            if (params.action == 'drop') {
                c.form_mode = false;
                c.dragging = false;
                if (!c.branch_mode) {
                    multi_macro_end(c, ctx, time, mac, params);
                }
            }
        break;
        case "praxis":
            if (params.show_hl_d) {
                default_highlight(c, ctx, time, mac, params.position_h);
            }

            x_bubble(c, ctx, time, mac, params);
            c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);

            default_highlight_off(c, ctx, time, mac, params);
            default_bubble_close(c, ctx, time, mac, params);

            jump_to_target(c, ctx, time, mac, params);
        break;

    };
}


MacroSet.prototype.click_SAP = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "click_SAP", params);

    pc.Check("fieldname", "TEXT");
    pc.Check("fieldicon", "IMAGE");
    pc.Check("transaction_code", "TEXT");
    pc.Check("explanation_d", "HTML");
    pc.Check("explanation_p", "HTML");
    pc.Check("position_h", "RELPOS_RECT");
    pc.Check("position_tc", "RELPOS", {FP: "0: 0", EP: new ctx.ElementRef("", "forms", 0, 0, "eep_path=\"1: 0: 0: 0: 0: 0: 0: 0: 0: 0: 0: 2: 0: 0: 0: 0: 3: 0\";\r\n" +
            "eep_options=3;eep_version=\"4.4\";\r\n" +
            "eep_atts={id: \"OKCodeField\",name: \"~ToolbarOkCode\",tagName: \"INPUT\",type: \"text\"};\r\n" +
            "eep_coll={n: \"forms\",i: 0,ii: 0};\r\n" +
            "eep_parents=[{eep_path: \"1: 0: 0: 0: 0: 0: 0: 0: 0: 0: 0: 2: 0: 0: 0: 0: 3\",eep_atts: {tagName: \"TD\"}}\r\n" +
            ",{eep_path: \"1: 0: 0: 0: 0: 0: 0: 0: 0: 0: 0: 2: 0: 0: 0: 0\",eep_atts: {tagName: \"TR\"}}\r\n" +
            ",{eep_path: \"1: 0: 0: 0: 0: 0: 0: 0: 0: 0: 0: 2: 0: 0: 0\",eep_atts: {tagName: \"TBODY\"}}\r\n" +
            ",{eep_path: \"1: 0: 0: 0: 0: 0: 0: 0: 0: 0: 0: 2: 0: 0\",eep_atts: {id: \"webguiStdButtonBar\",tagName: \"TABLE\"}}\r\n" +
            ",{eep_path: \"1: 0: 0: 0: 0: 0: 0: 0: 0: 0: 0: 2: 0\",eep_atts: {tagName: \"TD\"}}\r\n" +
            ",{eep_path: \"1: 0: 0: 0: 0: 0: 0: 0: 0: 0: 0: 2\",eep_atts: {tagName: \"TR\"}}\r\n" +
            ",{eep_path: \"1: 0: 0: 0: 0: 0: 0: 0: 0: 0: 0\",eep_atts: {tagName: \"TBODY\"}}\r\n" +
            ",{eep_path: \"1: 0: 0: 0: 0: 0: 0: 0: 0: 0\",eep_atts: {tagName: \"TABLE\"}}\r\n" +
            ",{eep_path: \"1: 0: 0: 0: 0: 0: 0: 0: 0\",eep_atts: {tagName: \"TD\"}}\r\n" +
            ",{eep_path: \"1: 0: 0: 0: 0: 0: 0: 0\",eep_atts: {tagName: \"TR\"}}\r\n" +
            ",{eep_path: \"1: 0: 0: 0: 0: 0: 0\",eep_atts: {tagName: \"TBODY\"}}\r\n" +
            ",{eep_path: \"1: 0: 0: 0: 0: 0\",eep_atts: {id: \"webguiToolbar\",tagName: \"TABLE\"}}\r\n" +
            ",{eep_path: \"1: 0: 0: 0: 0\",eep_atts: {tagName: \"TD\"}}\r\n" +
            ",{eep_path: \"1: 0: 0: 0\",eep_atts: {tagName: \"TR\"}}\r\n" +
            ",{eep_path: \"1: 0: 0\",eep_atts: {tagName: \"TBODY\"}}\r\n" +
            ",{eep_path: \"1: 0\",eep_atts: {name: \"toolbarform\",tagName: \"FORM\"}}\r\n" +
            ",{eep_path: \"1\",eep_atts: {id: \"webguiPage\",tagName: \"TABLE\"}}\r\n" +
            "];\r\n" +
            "eep_siblingTags=\"\";"), XY: {x: 0.000000, y: 0.000000} , DocXY: {x: 0.050248, y: 0.059846} , XY2: {x: 1.000000, y: 1.000000} , DocXY2: {x: 0.252644, y: 0.094484} , Off: {x: 0, y: 0} }, mac);
    pc.Check("show_hl_d", "BOOL_0_1", 1);
    pc.Check("show_hl_p", "BOOL_0_1", 0);
    pc.Check("bubblestyle_d", "SHELF", "_default");
    pc.Check("b_width", "INTEGER", 150);
    pc.Check("b_height", "INTEGER", 40);
    pc.Check("orientation", "ORIENTATION_BUBBLE", "SE");
    pc.Check("position_b", "RELPOS");
    pc.Check("b_duration", "INTEGER", 3);
    pc.Check("bubblestyle_p", "SHELF", "_default");
    pc.Check("b_width_p", "INTEGER", 180);
    pc.Check("b_height_p", "INTEGER", 40);
    pc.Check("orientation_p", "ORIENTATION_BUBBLE", "C");
    pc.Check("position_bu", "RELPOS");
    pc.Check("doc_enable", "BOOL_YES_NO", 1);
    pc.Check("screenshot_file", "IMAGE");
    pc.Check("screenshot_rect", "POSSIZE");
    pc.Check("element_type", "TEXT");
    pc.Check("click_pos", "POSITION");
    pc.Check("rerec_manual", "BOOL_0_1");
    pc.Check("exec_mouse", "BOOL_0_1");
    pc.Check("explanation_d_modified", "BOOL_0_1");
    pc.Check("explanation_p_modified", "BOOL_0_1");
    pc.Check("jump_target", "TOURSTOP_CAPTION");

    switch(c.active_mode) {
        case "demo":
            if (c.branch_mode) {
                if (params.show_hl_d) {
                    multi_highlight(c, ctx, time, mac, params.position_h);
                }
                if (params.show_bubble_d) {
                add_branch_bubble_d(c, ctx, time, mac, params);
                }
            } else {
                if (params.show_hl_d) default_highlight(c, ctx, time, mac, params.position_h);
                d_bubble(c, ctx, time, mac, params);

                c.ew.pause(ctx, time, { timeout: params.b_duration, type: "timeout" }, mac);

                if (!c.global_params.g_sync_demo_bubble_dur_to_audio ||
                    c.global_params.g_action_after_audio ||
                    c.ts_audio_duration == 0 ||
                    !c.show_audio)
                {
                    default_highlight_off(c, ctx, time + duration, mac, params);
                    default_bubble_close(c, ctx, time + duration, mac, params);
                }

                jump_to_target(c, ctx, time + duration, mac, params);
            }

        break;
        case "uebung":
        case "test":
            do_watch(c, ctx, time, mac, params);

            default_bubble_close(c, ctx, time, mac, params);

            if (c.form_mode) {
                alert("click_SAP not useful in form_mode");
            } else {
                c.ew.javascript(ctx, time, {
                    relpos: params.position_h,
                    text: c.h.EVAL_TEMPLATE("click_SAP__jstext_trans_pt", params)
                }, mac);

                c.ew.javascript(ctx, time, {
                    relpos: params.position_h,
                    text: c.h.EVAL_TEMPLATE("click_SAP__jstext_trig_pt", params)
                }, mac);

                c.ew.javascript(ctx, time, {
                    relpos: params.position_tc,
                    text: c.h.EVAL_TEMPLATE("click_SAP__jstext_trig_tcode_pt", params)
                }, mac);

                c.ew.javascript(ctx, time, {
                    relpos: params.position_tc,
                    text: c.h.EVAL_TEMPLATE("click_SAP__jstext_trig_tcode_pt2", params)
                }, mac);
            }

            handle_test_practice(c, ctx, time, mac, params);
        break;

        case "praxis":
            if (params.show_hl_d) {
                default_highlight(c, ctx, time, mac, params.position_h);
            }

            x_bubble(c, ctx, time, mac, params);
            c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);

            default_highlight_off(c, ctx, time, mac, params);
            default_bubble_close(c, ctx, time, mac, params);

            jump_to_target(c, ctx, time, mac, params);
        break;

    };
}

MacroSet.prototype.key_press = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "key_press", params);

    pc.Check("key_name", "TEXT");
    pc.Check("key_desc", "TEXT");
    pc.Check("explanation_d", "HTML");
    pc.Check("explanation_p", "HTML");
    pc.Check("position_h", "RELPOS_RECT");
    pc.Check("bubblestyle_d", "SHELF", "_default");
    pc.Check("b_width", "INTEGER", 150);
    pc.Check("b_height", "INTEGER", 40);
    pc.Check("orientation", "ORIENTATION_BUBBLE", "C");
    pc.Check("position_b", "RELPOS");
    pc.Check("b_duration", "INTEGER", 3);
    pc.Check("bubblestyle_p", "SHELF", "_default");
    pc.Check("b_width_p", "INTEGER", 180);
    pc.Check("b_height_p", "INTEGER", 40);
    pc.Check("orientation_p", "ORIENTATION_BUBBLE", "C");
    pc.Check("position_bu", "RELPOS");
    pc.Check("doc_enable", "BOOL_YES_NO", 1);
    pc.Check("explanation_d_modified", "BOOL_0_1");
    pc.Check("explanation_p_modified", "BOOL_0_1");
    pc.Check("jump_target", "TOURSTOP_CAPTION");
    pc.Check("show_bubble_d", "BOOL_0_1", 1);
    pc.Check("show_bubble_p", "BOOL_0_1", 1);

    if (c.global_params.g_action_after_audio && c.show_audio && c.active_mode != "praxis") {
        time += c.ts_audio_duration;
    }

    switch(c.active_mode) {
        case "demo":
            if (c.branch_mode) {
                if (params.show_hl_d) multi_highlight(c, ctx, time, mac, params.position_h);
                if (params.show_bubble_d) add_branch_bubble_d(c, ctx, time, mac, params);
            } else {
                var has_audio = c.ts_audio_duration > 0 && c.show_audio;
                var show_text = params.show_bubble_d && (!has_audio || c.show_text);
                var audio_sync = has_audio && c.global_params.g_sync_demo_bubble_dur_to_audio;

                if (show_text) d_bubble(c, ctx, time, mac, params);

                if (audio_sync) {
                    c.ew.pause(ctx, time, { timeout: 1, type: "timeout" }, mac);
                } else if (has_audio && !show_text && c.ts_first) {
                    c.ew.pause(ctx, time, { timeout: c.ts_audio_duration / 1000, type: "timeout" }, mac);
                } else {
                c.ew.pause(ctx, time, { timeout: params.b_duration, type: "timeout" }, mac);
                }
                c.ts_first = false;

                if (!audio_sync || c.global_params.g_action_after_audio) {
                    default_bubble_close(c, ctx, time + duration, mac, params);
                }

                jump_to_target(c, ctx, time + duration, mac, params);
            }
        break;
        case "uebung":
        case "test":
            do_watch(c, ctx, time, mac, params);

            default_bubble_close(c, ctx, time, mac, params);

            if (!c.branch_mode &&
                c.active_mode == 'test' && c.global_params.g_show_step_bubble)
            {
                step_bubble(c, ctx, time, mac, params);
            }

            if (c.form_mode) {
                c.ew.javascript(ctx, time, {
                    relpos: params.position_h,
                    text: c.h.EVAL_TEMPLATE("key_press_trans_pt_form", params)
                }, mac);
            } else {
                c.ew.javascript(ctx, time, {
                    relpos: params.position_h,
                    text: c.h.EVAL_TEMPLATE("key_press_trans_pt_standard", params)
                }, mac);
            }

            c.ew.javascript(ctx, time, {
                relpos: params.position_h,
                text: c.h.EVAL_TEMPLATE("key_press__jstext_trig_pt", params)
            }, mac);


            handle_test_practice(c, ctx, time, mac, params);
        break;
        case "praxis":
            x_bubble(c, ctx, time, mac, params);
            c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);
            default_bubble_close(c, ctx, time, mac, params);
            jump_to_target(c, ctx, time, mac, params);
        break;

    };
}

MacroSet.prototype.input_text = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "input_text", params);

    pc.Check("fieldname", "TEXT");
    pc.Check("fieldicon", "IMAGE");
    pc.Check("text_d", "TEXT");
    pc.Check("regexp", "TEXT");
    pc.Check("explanation_d", "HTML");
    pc.Check("explanation_p", "HTML");
    pc.Check("position_h", "RELPOS_RECT");
    pc.Check("position_af", "RELPOS_ELEMREF");
    pc.Check("confirmation_tab", "BOOL_0_1", 1);
    pc.Check("confirmation_enter", "BOOL_0_1");
    pc.Check("affirmation_button", "BOOL_0_1");
    pc.Check("show_hl_d", "BOOL_0_1", 1);
    pc.Check("show_hl_p", "BOOL_0_1", 0);
    pc.Check("bubblestyle_d", "SHELF", "_default");
    pc.Check("b_width", "INTEGER", 180);
    pc.Check("b_height", "INTEGER", 40);
    pc.Check("orientation", "ORIENTATION_BUBBLE", "SE");
    pc.Check("position_b", "RELPOS");
    pc.Check("b_duration", "INTEGER", 3);
    pc.Check("bubblestyle_p", "SHELF", "_default");
    pc.Check("b_width_p", "INTEGER", 180);
    pc.Check("b_height_p", "INTEGER", 40);
    pc.Check("orientation_p", "ORIENTATION_BUBBLE", "C");
    pc.Check("position_bu", "RELPOS");
    pc.Check("doc_enable", "BOOL_YES_NO", 1);
    pc.Check("screenshot_file", "IMAGE");
    pc.Check("overlay_pos", "POSITION");
    pc.Check("screenshot_rect", "POSSIZE");
    pc.Check("element_type", "TEXT");
    pc.Check("click_pos", "POSITION");
    pc.Check("rerec_manual", "BOOL_0_1");
    pc.Check("exec_mouse", "BOOL_0_1");
    pc.Check("explanation_d_modified", "BOOL_0_1");
    pc.Check("explanation_p_modified", "BOOL_0_1");
    pc.Check("jump_target", "TOURSTOP_CAPTION");
    pc.Check("set_focus", "BOOL_0_1", 1);
    pc.Check("animated", "BOOL_0_1", 1);
    pc.Check("text_full", "TEXT", params.text_d);
    pc.Check("check_full_text", "BOOL_0_1", 1);
    pc.Check("show_bubble_d", "BOOL_0_1", 1);
    pc.Check("show_bubble_p", "BOOL_0_1", 1);

    // ByDesign - user needs to click correct text-input-field
    //params.action = 'FOCUS_ENTER';
    //params.is_input = true;
    /*
    this.click(c, ctx, time, duration, params);

    //CONFIRMATION METHOD NOW DEFINED VIA SETTINGS
    params.confirmation_tab = 0;
    params.confirmation_button = 0;
    params.confirmation_enter = 1;
    params.animated = 1;
    */
    /* dont't call it twice (if 'click' is called above) */
    if (c.global_params.g_action_after_audio && c.show_audio && c.active_mode != "praxis") {
        time += c.ts_audio_duration;
    }

    switch(c.active_mode) {
        case "demo":
            if (c.branch_mode) {
                if (params.show_hl_d) multi_highlight(c, ctx, time, mac, params.position_h);
                if (params.show_bubble_d) add_branch_bubble_d(c, ctx, time, mac, params);
            } else {
                var has_audio = c.ts_audio_duration > 0 && c.show_audio;
                var show_text = params.show_bubble_d && (!has_audio || c.show_text);
                var audio_sync = has_audio && c.global_params.g_sync_demo_bubble_dur_to_audio;

                if (params.show_hl_d) default_highlight(c, ctx, time, mac, params.position_h);
                if (show_text) d_bubble(c, ctx, time, mac, params);

                c.ew.javascript(ctx, time, {
                    relpos: params.position_h,
                    text: "style.backgroundImage = \'none\';"
                }, mac);

                if (c.global_params.g_show_mouse) {
                    move_mouse(c, ctx, time, mac, params, false);
                }

                c.ew.formtext(ctx, time, {
                    relpos: params.position_h,
                    text: params.text_full,
                    autoduration: params.animated,
                    comment: "Texteingabe",
                    suppressHandler: "1",
                    start: "0",
                    end: "-1"
                }, mac);

                if (audio_sync) {
                    c.ew.pause(ctx, time, { timeout: 1, type: "timeout" }, mac);
                } else if (has_audio && !show_text && c.ts_first) {
                    c.ew.pause(ctx, time, { timeout: c.ts_audio_duration / 1000, type: "timeout" }, mac);
                } else {
                c.ew.pause(ctx, time, { timeout: params.b_duration, type: "timeout" }, mac);
                }
                c.ts_first = false;

                if (!audio_sync || c.global_params.g_action_after_audio) {
                    default_highlight_off(c, ctx, time + duration, mac, params);
                    default_bubble_close(c, ctx, time + duration, mac, params);
                }

                jump_to_target(c, ctx, time + duration, mac, params);
            }
        break;
        case "uebung":
        case "test":
            if (params.check_full_text) {
            do_watch(c, ctx, time, mac, params);

            default_bubble_close(c, ctx, time, mac, params);

            if (typeof(params.regexp) == 'string' && /* DPS-1358 */
                params.regexp.length > 0 &&
                params.regexp.substr(0, 1) == '/')
            {
                params.regexpflags = params.regexp.substr(params.regexp.lastIndexOf('/') + 1); '/';
                params.regexp = params.regexp.substr(1, params.regexp.lastIndexOf('/') - 1); '/';
            } else {
                params.regexpflags = '';
            }

            c.ew.javascript(ctx, time, {
                relpos: params.position_h,
                text: c.h.EVAL_TEMPLATE("input_text_init_trans", params)
            }, mac);

            c.ew.javascript(ctx, time, {
                relpos: params.position_h,
                text: c.h.EVAL_TEMPLATE("input_text_init_trans2", params)
            }, mac);

            if (c.form_mode) {
                c.ew.javascript(ctx, time, {
                    relpos: params.position_h,
                    text: c.h.EVAL_TEMPLATE("input_text_trans_pt_form", params)
                }, mac);
            } else {
                c.ew.javascript(ctx, time, {
                    relpos: params.position_h,
                    text: c.h.EVAL_TEMPLATE("input_text_trans_pt_standard", params)
                }, mac);

                /* formular mode only works with click on button, no triggers on edit boxes */
                var have_trigger = false;

                if (params.confirmation_tab) {
                    c.ew.javascript(ctx, time, {
                        text: c.h.EVAL_TEMPLATE("input_text_trig_pt_tab", params),
                        relpos: params.position_h
                    }, mac);
                    have_trigger = true;
                }

                if (params.confirmation_enter) {
                    c.ew.javascript(ctx, time, {
                        text: c.h.EVAL_TEMPLATE("input_text_trig_pt_enter", params),
                        relpos: params.position_h
                    }, mac);
                    have_trigger = true;
                }

                if (params.affirmation_button)
                {
                    if (ctx.cfg_config('recording_mode') == 'nodump') {
                        if (typeof(params.position_af) != 'undefined') {
                            params.position_af = {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} };
                        }
                        params.position_af.EP.eep = mac.uid + '_CONFIRMB';
                    }
                    c.ew.javascript(ctx, time, {
                        text: c.h.EVAL_TEMPLATE("input_text_trig_pt_button", params),
                        relpos: params.position_af
                    }, mac);
                    have_trigger = true;
                }

                if (!have_trigger) {
                    c.ew.javascript(ctx, time, {
                        text: c.h.EVAL_TEMPLATE("input_text_trig_pt_none", params),
                        relpos: params.position_h
                    }, mac);
                }
            }

            if (!(c.form_mode || c.branch_mode)) {
                if (params.set_focus) {
                    c.ew.javascript(ctx, time, {
                        relpos: params.position_h,
                        text: "focus();"
                    }, mac);
                }
            }

            handle_test_practice(c, ctx, time, mac, params);
            } else {
                this.click(c, ctx, time, duration, params);
                if (c.form_mode || c.branch_mode) {
                    c.ew.formtext(ctx, time, {
                        relpos: params.position_h,
                        text: params.text_d,
                        autoduration: 0,
                        duration: 1,
                        suppressHandler: "1",
                        start: "0",
                        end: "-1"
                    }, mac);
                }
                else {
                    c.ew.formtext(ctx, time, {
                        relpos: params.position_h,
                        text: params.text_d,
                        autoduration: 2,
                        suppressHandler: "1",
                        start: "0",
                        end: "-1"
                    }, mac);
                }
            }

        break;
        case "praxis":
            if (params.show_hl_d) {
                default_highlight(c, ctx, time, mac, params.position_h);
            }

            x_bubble(c, ctx, time, mac, params);

            c.ew.javascript(ctx, time, {
                relpos: params.position_h,
                text: "style.backgroundImage = \'none\';"
            }, mac);

            c.ew.formtext(ctx, time, {
                relpos: params.position_h,
                text: params.text_full,
                comment: "Texteingabe",
                suppressHandler: "1",
                start: "0",
                end: "-1"
            }, mac);


            c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);

            default_highlight_off(c, ctx, time, mac, params);
            default_bubble_close(c, ctx, time, mac, params);

            jump_to_target(c, ctx, time, mac, params);
        break;

    };
}

MacroSet.prototype.select_single = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "select_single", params);

    pc.Check("fieldname", "TEXT");
    pc.Check("fieldicon", "IMAGE");
    pc.Check("choose_nr", "INTEGER", 0);
    pc.Check("choose_text", "TEXT");
    pc.Check("explanation_d", "HTML", "");
    pc.Check("explanation_p", "HTML", "");
    pc.Check("position_h", "RELPOS");
    pc.Check("show_hl_d", "BOOL_0_1", 1);
    pc.Check("show_hl_p", "BOOL_0_1", 0);
    pc.Check("bubblestyle_d", "SHELF", "_default");
    pc.Check("b_width", "INTEGER", 180);
    pc.Check("b_height", "INTEGER", 40);
    pc.Check("orientation", "ORIENTATION_BUBBLE", "SE");
    pc.Check("position_b", "RELPOS");
    pc.Check("b_duration", "INTEGER", 3);
    pc.Check("bubblestyle_p", "SHELF", "_default");
    pc.Check("b_width_p", "INTEGER", 180);
    pc.Check("b_height_p", "INTEGER", 40);
    pc.Check("orientation_p", "ORIENTATION_BUBBLE", "C");
    pc.Check("position_bu", "RELPOS");
    pc.Check("doc_enable", "BOOL_YES_NO", 1);
    pc.Check("screenshot_file", "IMAGE");
    pc.Check("screenshot_rect", "POSSIZE");
    pc.Check("overlay_pos", "POSITION");
    pc.Check("element_type", "TEXT");
    pc.Check("click_pos", "POSITION");
    pc.Check("rerec_manual", "BOOL_0_1");
    pc.Check("exec_mouse", "BOOL_0_1");
    pc.Check("explanation_d_modified", "BOOL_0_1");
    pc.Check("explanation_p_modified", "BOOL_0_1");
    pc.Check("jump_target", "TOURSTOP_CAPTION");
    pc.Check("animated", "BOOL_0_1", 1);
    pc.Check("show_bubble_d", "BOOL_0_1", 1);
    pc.Check("show_bubble_p", "BOOL_0_1", 1);

    if (c.global_params.g_action_after_audio && c.show_audio && c.active_mode != "praxis") {
        time += c.ts_audio_duration;
    }

    switch(c.active_mode) {
        case "demo":
            if (c.branch_mode) {
                if (params.show_hl_d) multi_highlight(c, ctx, time, mac, params.position_h);
                if (params.show_bubble_d) add_branch_bubble_d(c, ctx, time, mac, params);
            } else {
                var has_audio = c.ts_audio_duration > 0 && c.show_audio;
                var show_text = params.show_bubble_d && (!has_audio || c.show_text);
                var audio_sync = has_audio && c.global_params.g_sync_demo_bubble_dur_to_audio;

                if (params.show_hl_d) default_highlight(c, ctx, time, mac, params.position_h);
                if (show_text) d_bubble(c, ctx, time, mac, params);

                c.ew.formselect1(ctx, time, {
                    relpos: params.position_h,
                    selected: params.choose_nr,
                    autoduration: params.animated,
                    duration: "0", suppressHandler: "1"
                }, mac);

                if (audio_sync) {
                    c.ew.pause(ctx, time, { timeout: 1, type: "timeout" }, mac);
                } else if (has_audio && !show_text && c.ts_first) {
                    c.ew.pause(ctx, time, { timeout: c.ts_audio_duration / 1000, type: "timeout" }, mac);
                } else {
                c.ew.pause(ctx, time, { timeout: params.b_duration, type: "timeout" }, mac);
                }
                c.ts_first = false;

                if (!audio_sync || c.global_params.g_action_after_audio) {
                    default_highlight_off(c, ctx, time + duration, mac, params);
                    default_bubble_close(c, ctx, time + duration, mac, params);
                }

                jump_to_target(c, ctx, time + duration, mac, params);
            }
        break;
        case "uebung":
        case "test":
            do_watch(c, ctx, time, mac, params);

            default_bubble_close(c, ctx, time, mac, params);

            c.ew.javascript(ctx, time, {
                relpos: params.position_h,
                text: c.h.EVAL_TEMPLATE("select_single_init_tracker", params)
            }, mac);

            c.ew.javascript(ctx, time, {
                relpos: params.position_h,
                text: c.h.EVAL_TEMPLATE("select_single_init_tracker2", params)
            }, mac);

            if (c.form_mode) {
                c.ew.javascript(ctx, time, {
                    relpos: params.position_h,
                    text: c.h.EVAL_TEMPLATE("select_single_trans_pt_form", params)
                }, mac);
            } else {
                c.ew.javascript(ctx, time, {
                    relpos: params.position_h,
                    text: c.h.EVAL_TEMPLATE("select_single_trans_pt_standard", params)
                }, mac);
                c.ew.javascript(ctx, time, {
                    relpos: params.position_h,
                    text: c.h.EVAL_TEMPLATE("select_single__jstext_trig_pt", params)
                }, mac);
            }

            handle_test_practice(c, ctx, time, mac, params);
        break;
        case "praxis":

            if (params.show_hl_d) {
                default_highlight(c, ctx, time, mac, params.position_h);
            }

            x_bubble(c, ctx, time, mac, params);

            c.ew.formselect1(ctx, time, {
                relpos: params.position_h,
                selected: params.choose_nr,
                auto_duration: params.animated,
                duration: "0", autoduration: "1", suppressHandler: "1"
            }, mac);

            c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);

            default_highlight_off(c, ctx, time, mac, params);
            default_bubble_close(c, ctx, time, mac, params);

            jump_to_target(c, ctx, time, mac, params);
        break;

    };
}

MacroSet.prototype.input_radio = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "input_radio", params);

    pc.Check("fieldname", "TEXT");
    pc.Check("fieldicon", "IMAGE");
    pc.Check("choose_bool", "TEXT");
    pc.Check("explanation_d", "HTML");
    pc.Check("explanation_p", "HTML");
    pc.Check("position_h", "RELPOS_ELEMREF");
    pc.Check("show_hl_d", "BOOL_0_1", 1);
    pc.Check("show_hl_p", "BOOL_0_1", 0);
    pc.Check("bubblestyle_d", "SHELF", "_default");
    pc.Check("b_width", "INTEGER", 180);
    pc.Check("b_height", "INTEGER", 40);
    pc.Check("orientation", "ORIENTATION_BUBBLE", "SE");
    pc.Check("position_b", "RELPOS");
    pc.Check("b_duration", "INTEGER", 3);
    pc.Check("bubblestyle_p", "SHELF", "_default");
    pc.Check("b_width_p", "INTEGER", 180);
    pc.Check("b_height_p", "INTEGER", 40);
    pc.Check("orientation_p", "ORIENTATION_BUBBLE", "C");
    pc.Check("position_bu", "RELPOS");
    pc.Check("doc_enable", "BOOL_YES_NO", 1);
    pc.Check("screenshot_file", "IMAGE");
    pc.Check("overlay_pos", "POSITION");
    pc.Check("screenshot_rect", "POSSIZE");
    pc.Check("element_type", "TEXT");
    pc.Check("click_pos", "POSITION");
    pc.Check("rerec_manual", "BOOL_0_1");
    pc.Check("exec_mouse", "BOOL_0_1");
    pc.Check("explanation_d_modified", "BOOL_0_1");
    pc.Check("explanation_p_modified", "BOOL_0_1");
    pc.Check("jump_target", "TOURSTOP_CAPTION");
    pc.Check("show_bubble_d", "BOOL_0_1", 1);
    pc.Check("show_bubble_p", "BOOL_0_1", 1);

    if (c.global_params.g_action_after_audio && c.show_audio && c.active_mode != "praxis") {
        time += c.ts_audio_duration;
    }

    switch(c.active_mode) {
        case "demo":
            if (c.branch_mode) {
                if (params.show_hl_d) multi_highlight(c, ctx, time, mac, params.position_h);
                if (params.show_bubble_d) add_branch_bubble_d(c, ctx, time, mac, params);
            } else {
                var has_audio = c.ts_audio_duration > 0 && c.show_audio;
                var show_text = params.show_bubble_d && (!has_audio || c.show_text);
                var audio_sync = has_audio && c.global_params.g_sync_demo_bubble_dur_to_audio;

                if (c.global_params.g_show_mouse) {
                    move_mouse(c, ctx, time, mac, params, true);
                    ani_mouse(c, ctx, time, mac, params);
                }

                if (params.show_hl_d) default_highlight(c, ctx, time, mac, params.position_h);
                if (show_text) d_bubble(c, ctx, time, mac, params);

                c.ew.formcheck(ctx, time, {
                    relpos: params.position_h,
                    checked: as_boolean(params.choose_bool),
                    suppressHandler: "0"
                }, mac);

                if (audio_sync) {
                    c.ew.pause(ctx, time, { timeout: 1, type: "timeout" }, mac);
                } else if (has_audio && !show_text && c.ts_first) {
                    c.ew.pause(ctx, time, { timeout: c.ts_audio_duration / 1000, type: "timeout" }, mac);
                } else {
                c.ew.pause(ctx, time, { timeout: params.b_duration, type: "timeout" }, mac);
                }
                c.ts_first = false;

                if (!audio_sync || c.global_params.g_action_after_audio) {
                    default_highlight_off(c, ctx, time + duration, mac, params);
                    default_bubble_close(c, ctx, time + duration, mac, params);
                }

                jump_to_target(c, ctx, time + duration, mac, params);
            }
        break;
        case "uebung":
        case "test":
            do_watch(c, ctx, time, mac, params);

            default_bubble_close(c, ctx, time, mac, params);

            if (ctx.cfg_config('recording_mode') == 'nodump') {
                if (params.position_h &&
                    params.position_h.EP)
                {
                    params.position_h.EP.mac = mac.uid + "#main#check";
                }
            }
            c.ew.javascript(ctx, time, {
                relpos: params.position_h,
                text: c.h.EVAL_TEMPLATE("input_radio_init_trans", params)
            }, mac);

            c.ew.javascript(ctx, time, {
                relpos: params.position_h,
                text: c.h.EVAL_TEMPLATE("input_radio_init_trans2", params)
            }, mac);

            if (c.form_mode) {
                c.ew.javascript(ctx, time, {
                    relpos: params.position_h,
                    text: c.h.EVAL_TEMPLATE("input_radio_trans_pt_form", params)
                }, mac);

            } else {
                c.ew.javascript(ctx, time, {
                    relpos: params.position_h,
                    text: c.h.EVAL_TEMPLATE("input_radio_trans_pt_standard", params)
                }, mac);
                c.ew.javascript(ctx, time, {
                    relpos: params.position_h,
                    text: c.h.EVAL_TEMPLATE("input_radio__jstext_trig_p", params)
                }, mac);
            }

            handle_test_practice(c, ctx, time, mac, params);
        break;
        case "praxis":

            if (params.show_hl_d) {
                default_highlight(c, ctx, time, mac, params.position_h);
            }

            x_bubble(c, ctx, time, mac, params);

            c.ew.formcheck(ctx, time, {
                relpos: params.position_h,
                checked: as_boolean(params.choose_bool),
                suppressHandler: "0"
            }, mac);

            c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);

            default_highlight_off(c, ctx, time, mac, params);
            default_bubble_close(c, ctx, time, mac, params);
            jump_to_target(c, ctx, time, mac, params);
        break;
    };
}

MacroSet.prototype.scroll_hor = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "scroll_hor", params);

    pc.Check("scrollleft", "INTEGER", 1000);
    pc.Check("position_h", "RELPOS");
    pc.Check("explanation_d", "HTML");
    pc.Check("show_hl_d", "BOOL_0_1", 0);
    pc.Check("show_hl_p", "BOOL_0_1", 0);
    pc.Check("bubblestyle_d", "SHELF", "_default");
    pc.Check("b_width", "INTEGER", 180);
    pc.Check("b_height", "INTEGER", 40);
    pc.Check("orientation", "ORIENTATION_BUBBLE", "NW");
    pc.Check("position_b", "RELPOS");
    pc.Check("b_duration", "INTEGER", 3);
    pc.Check("doc_enable", "BOOL_YES_NO", 1);
    pc.Check("imagesize", "INTEGER", 100);
    pc.Check("element_type", "TEXT", "HScroll");
    pc.Check("screenshot_file", "IMAGE");
    pc.Check("caption", "TEXT");
    pc.Check("screenshot_rect", "POSSIZE");
    pc.Check("screenshot_border", "INTEGER");
    pc.Check("explanation_d_modified", "BOOL_0_1");

    if ((params.show_hl_d && (c.active_mode == "demo" || c.active_mode == "praxis")) ||
        (params.show_hl_p && (c.active_mode == "uebung" || c.active_mode == "test"))
       )
    {
        default_highlight(c, ctx, time, mac, params.position_h);
    }

    if (c.active_mode == "praxis") {
        x_bubble(c, ctx, time, mac, params);
        c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);
        default_highlight_off(c, ctx, time, mac, params);
        default_bubble_close(c, ctx, time, mac, params);
    } else {
        d_bubble(c, ctx, time, mac, params);

        if (c.show_audio && c.ts_audio_duration > 0 && c.global_params.g_sync_demo_bubble_dur_to_audio) {
            c.ew.pause(ctx, time, { timeout: 1, type: "timeout" }, mac);
        } else {
        c.ew.pause(ctx, time, { timeout: params.b_duration, type: "timeout" }, mac);
        }

        if (!c.global_params.g_sync_demo_bubble_dur_to_audio ||
            c.active_mode != "demo" ||
            c.ts_audio_duration == 0 ||
            !c.show_audio)
        {
            default_highlight_off(c, ctx, time + duration, mac, params);
            default_bubble_close(c, ctx, time + duration, mac, params);
        }
    }

    c.ew.javascript(ctx, time, {
        relpos: params.position_h,
        text: c.h.EVAL_TEMPLATE("scroll_hor__jstext_scroll", params)
    }, mac);
}


MacroSet.prototype.scroll_vert = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "scroll_vert", params);

    pc.Check("scrolltop", "INTEGER", 1000);
    pc.Check("position_h", "RELPOS");
    pc.Check("explanation_d", "HTML");
    pc.Check("show_hl_d", "BOOL_0_1", 0);
    pc.Check("show_hl_p", "BOOL_0_1", 0);
    pc.Check("bubblestyle_d", "SHELF", "_default");
    pc.Check("b_width", "INTEGER", 180);
    pc.Check("b_height", "INTEGER", 40);
    pc.Check("orientation", "ORIENTATION_BUBBLE", "NW");
    pc.Check("position_b", "RELPOS");
    pc.Check("b_duration", "INTEGER", 3);
    pc.Check("doc_enable", "BOOL_YES_NO", 1);
    pc.Check("imagesize", "INTEGER", 100);
    pc.Check("element_type", "TEXT", "HScroll");
    pc.Check("screenshot_file", "IMAGE");
    pc.Check("caption", "TEXT");
    pc.Check("screenshot_rect", "POSSIZE");
    pc.Check("screenshot_border", "INTEGER");
    pc.Check("explanation_d_modified", "BOOL_0_1");

    if ((params.show_hl_d && (c.active_mode == "demo" || c.active_mode == "praxis")) ||
        (params.show_hl_p && (c.active_mode == "uebung" || c.active_mode == "test"))
       )
    {
        default_highlight(c, ctx, time, mac, params.position_h);
    }

    if (c.active_mode == "praxis") {
        x_bubble(c, ctx, time, mac, params);
        c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);
        default_highlight_off(c, ctx, time, mac, params);
        default_bubble_close(c, ctx, time, mac, params);

    } else {
        d_bubble(c, ctx, time, mac, params);

        if (c.show_audio && c.ts_audio_duration > 0 && c.global_params.g_sync_demo_bubble_dur_to_audio) {
            c.ew.pause(ctx, time, { timeout: 1, type: "timeout" }, mac);
        } else {
        c.ew.pause(ctx, time, { timeout: params.b_duration, type: "timeout" }, mac);
        }

        if (!c.global_params.g_sync_demo_bubble_dur_to_audio ||
            c.active_mode != "demo" ||
            c.ts_audio_duration == 0 ||
            !c.show_audio)
        {
            default_highlight_off(c, ctx, time + duration, mac, params);
            default_bubble_close(c, ctx, time + duration, mac, params);
        }
    }

    c.ew.javascript(ctx, time, {
        relpos: params.position_h,
        text: c.h.EVAL_TEMPLATE("scroll_vert__jstext_scroll", params)
    }, mac);
}


MacroSet.prototype.goto_tourstop = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "goto_tourstop", params);

    pc.Check("jump_target", "TOURSTOP_NAME");
    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test") ||
        (params.in_prax && c.active_mode == "praxis"))
    {
        jump_to_target(c, ctx, time, mac, params);
    }
}

MacroSet.prototype.end_unit = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "end_unit", params);
    pc.Check("ende", "TEXT");
    pc.Check("last_page_pause", "INTEGER", 0);
    pc.Check("end_caption", "TEXT");
    pc.Check("end_caption_p", "TEXT");
    pc.Check("end_caption_t", "TEXT");
    pc.Check("end_text", "HTML");
    pc.Check("end_text_p", "HTML");
    pc.Check("end_text_t_passed", "HTML");
    pc.Check("end_text_t_failed", "HTML");
    pc.Check("show_end_page", "BOOL_0_1", 0);

    if (!params.show_end_page || c.active_mode == 'praxis') {
    if (params.last_page_pause > 0) {
        c.ew.pause(ctx, time, { timeout: params.last_page_pause, type: "timeout" }, mac);
    } else if (params.last_page_pause < 0) {
        if (c.active_mode == "demo" || c.active_mode == "praxis") {
            c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);
        }
    }

    log_request(c, ctx, time, mac, { }, "finish");

    if (c.active_mode == "demo" || c.active_mode == "praxis") {
        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: "ctx.cfg_tourend();"
        }, mac);
    } else {
        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: "var score;\r\n" +
                "if (score = cfg_getscore()) {\r\n" +
                "    ctx.collected_points = score.current;\r\n" +
                "    ctx.possible_points = score.max;\r\n" +
                "    ctx.result_scaled = score.scaled;\r\n" +
                "}\r\n" +
                "ctx.cfg_tourend();\r\n"
        }, mac);
    };

        return;
}

    // fetch Preset value from Show Intro Page macro of the current project
    // needed for "Preview from here..."
    // Note: Show Intro Page macro has to be the second macro in topic 2 (else fallback is used)
    var prg_ = null;
    if (c &&
        c.dgo7 &&
        c.dgo7.XFJ &&
        c.dgo7.XFJ() &&
        c.dgo7.XFJ().XCo) {
        prg_ = c.dgo7.XFJ().XCo;
    } else if (c &&
        c.dgoAgent_ &&
        c.dgoAgent_.getProgram &&
        c.dgoAgent_.getProgram() &&
        c.dgoAgent_.getProgram().contentArray_) {
        prg_ = c.dgoAgent_.getProgram().contentArray_;
    }
    if (prg_) {
        if (prg_[0] && prg_[0].macros) {
            for (var j = 0, mc = prg_[0].macros.length; j < mc; j += 1) {
                if (typeof prg_[0].macros[j] === 'object' && typeof prg_[0].macros[j].Preset !== 'undefined') c.udc.intro_preset = prg_[0].macros[j].Preset;
            }
        }
    }

    if (c.task_params && c.task_bubble_visible) {
        hide_task_bubble(c, ctx, time, c.task_params, mac);
        c.task_bubble_visible = false;
    }
    
    c.cfg_setcurmac(mac.uid, true);
    params.end_text = c.cfg_resolve_string_against(params.end_text, 'macro:');
    params.end_text_p = c.cfg_resolve_string_against(params.end_text_p, 'macro:');
    params.end_text_t_passed = c.cfg_resolve_string_against(params.end_text_t_passed, 'macro:');
    params.end_text_t_failed = c.cfg_resolve_string_against(params.end_text_t_failed, 'macro:');

    if (params.last_page_pause > 0) {
        c.ew.pause(ctx, time, { timeout: params.last_page_pause, type: "timeout" }, mac);
    } else if (params.last_page_pause < 0) {
        if (c.active_mode == "demo" || c.active_mode == "praxis") {
            c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);
        }
    }
    if (c.active_mode == "demo") {
        params.end_caption_mode = params.end_caption;
        params.end_text_mode = params.end_text;
    } else if (c.active_mode == "uebung") {
        params.end_caption_mode = params.end_caption_p;
        params.end_text_mode = params.end_text_p;
    } else if (c.active_mode == "test") {
        params.end_caption_mode = params.end_caption_t;
        params.end_text_mode = params.end_text_t_passed;
        params.end_text_mode2 = params.end_text_t_failed;
    }

    c.ew.javascript(ctx, time, {
        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: "ctx.cfg_setAllVisited(true);"
    }, mac);

    if (c.active_mode != "praxis") {
        if (params.end_text_mode.length > 2 && params.end_caption_mode.length > 2) {
            c.last_page_is_special = true;
            c.ew.loaded(ctx, time, { });

            c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);
        }

        log_request(c, ctx, time, mac, { }, "finish");

        if (c.active_mode == "demo" || c.active_mode == "praxis") {
            c.ew.javascript(ctx, time, {
                relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                text: "ctx.cfg_tourend();"
            }, mac);
        } else {
            c.ew.javascript(ctx, time, {
                relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                text: "var score;\r\n" +
                    "if (score = cfg_getscore()) {\r\n" +
                    "    ctx.collected_points = score.current;\r\n" +
                    "    ctx.possible_points = score.max;\r\n" +
                    "    ctx.result_scaled = score.scaled;\r\n" +
                    "}\r\n" +
                    "ctx.cfg_tourend();\r\n"
            }, mac);
        };
    }
}

MacroSet.prototype.intro_page_item = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };
    var pc = new ParamChecker(c.defaults, "intro_page_item", params);

    pc.Check("intro_text", "HTML");
    pc.Check("link_text", "TEXT");
    pc.Check("link_target", "TOURSTOP_NAME", "");

    if (typeof(c.intro_items) == 'undefined') {
        c.intro_items = [];
    }

    c.cfg_setcurmac(mac.uid, true);
    params.intro_text = c.cfg_resolve_string_against(params.intro_text, 'macro:');

    c.intro_items.push({ intro_text: params.intro_text,
                         link_text: params.link_text,
                         link_target: params.link_target
                        });
}

MacroSet.prototype.intro_page = function(c, ctx, time, duration, params) {
    if (c.active_mode == 'praxis') {
        delete c.intro_items;
        return;
    }
    
    var mac = { uid: params.uid };
    var pc = new ParamChecker(c.defaults, "intro_page", params);

    pc.Check("caption", "TEXT");
    pc.Check("caption_p", "TEXT");
    pc.Check("caption_t", "TEXT");
    pc.Check("intro_text", "HTML");
    pc.Check("intro_text_p", "HTML");
    pc.Check("intro_text_t", "HTML");
    pc.Check("inter_page_duration", "INTEGER");
    pc.Check("intro_image", "IMAGE");
    pc.Check("ii_width", "INTEGER", 0);
    pc.Check("ii_height", "INTEGER", 0);
    pc.Check("page_template", "ENUM", "nice");

    //assessment: reset Score and AllVisited (after restart)
    ctx.cfg_setscore(0);
    ctx.cfg_setAllVisited(false);

    c.intro_page_ts_name = c.ts_name;
    ctx.udc.replay_intro = c.ts_name;

    c.cfg_setcurmac(mac.uid, true);
    params.intro_text = c.cfg_resolve_string_against(params.intro_text, 'macro:');
    params.intro_text_p = c.cfg_resolve_string_against(params.intro_text_p, 'macro:');
    params.intro_text_t = c.cfg_resolve_string_against(params.intro_text_t, 'macro:');

    // NO SAP START PAGE IN CONCURRENT MODE
    if (c.active_mode == "praxis") return;

    if (c.task_params && c.task_bubble_visible) {
        hide_task_bubble(c, ctx, time, c.task_params, mac);
        c.task_bubble_visible = false;
    }

    c.last_page_is_special = true;
//    c.ew.fileurl(ctx, time, {
//        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
//        url: "style:page/intro_nice.html"
//    }, mac);
//    c.ew.loaded(ctx, time, { }, mac);
//
//    for (var i = 0; i < c.intro_items.length; i++) {
//        var it = c.intro_items[i];
//
//        c.ew.javascript(ctx, time, {
//            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
//            text: c.h.EVAL_TEMPLATE("intro_add_item", it)
//        }, mac);
//    }
//    delete c.intro_items;

    if (c.active_mode == "demo") {
        params.caption_mode = params.caption;
        params.intro_text_mode = params.intro_text;
    } else if (c.active_mode == "uebung") {
        params.caption_mode = params.caption_p;
        params.intro_text_mode = params.intro_text_p;
    } else if (c.active_mode == "test") {
        params.caption_mode = params.caption_t;
        params.intro_text_mode = params.intro_text_t;
    }

//    c.ew.javascript(ctx, time, {
//        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
//        text: c.h.EVAL_TEMPLATE("intro_set_page", params)
//    }, mac);

    if (!c.show_audio) {
        c.ew.pause(ctx, time, { type: "simple" }, mac);
    } else {
        c.ew.pause(ctx, c.ts_audio_duration, { type: "simple"}, mac);
    }

//    c.ew.javascript(ctx, time, {
//        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
//        text: "ctx_window.show_caption('start')"
//    }, mac);

    if (params.inter_page_duration > 0) {
        c.ew.pause(ctx, time, { type: "timeout", timeout: params.inter_page_duration }, mac);
    }
}

MacroSet.prototype.kurs = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "kurs", params);

    pc.Check("titel", "TEXT");
    pc.Check("bezeichnung", "TEXT");
}


MacroSet.prototype.transaction_info = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "transaction_info", params);

    pc.Check("tcode", "TEXT");
    pc.Check("sap_path", "TEXT");
}

MacroSet.prototype.tts_options = function(c, ctx, time, duration, params) { }
MacroSet.prototype.tts_override = function(c, ctx, time, duration, params) { }


MacroSet.prototype.info_page = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "info_page", params);

    pc.Check("title", "TEXT");
    pc.Check("explanation_d", "HTML");
    pc.Check("b_width", "INTEGER", 360);
    pc.Check("dump_win_relpos", "RELPOS_DOCREF");
    pc.Check("type", "ENUM");

    c.last_page_is_special = false;
    c.ew.fileurl(ctx, time, {
        relpos: params.dump_win_relpos,
        url: c.h.EVAL_TEMPLATE("info_page__res_url", params)
    }, mac);

    c.ew.loaded(ctx, time, { }, mac);

    c.ew.javascript(ctx, time, {
        relpos: params.dump_win_relpos,
        text: c.h.EVAL_TEMPLATE("info_page__js_page", params)
    }, mac);

    c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);
}

MacroSet.prototype.swf_page = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "swf_page", params);

    pc.Check("swf_file", "RELATIVE_URL");
    pc.Check("swf_width", "INTEGER", -1);
    pc.Check("swf_height", "INTEGER", -1);
    pc.Check("in_demo", "BOOL_0_1", 1);
    pc.Check("in_test", "BOOL_0_1", 0);
    pc.Check("in_practice", "BOOL_0_1", 1);
    pc.Check("in_prax", "BOOL_0_1", 1);

    if (params.swf_width  < 10) params.swf_width = 10;
    if (params.swf_height  < 10) params.swf_height = 10;

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test") ||
        (params.in_prax && c.active_mode == "praxis"))
    {
        c.ew.fileurl(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            url: c.h.EVAL_TEMPLATE("swf_base_page_url", params)
        }, mac);

        c.ew.loaded(ctx, time, { }, mac);

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: c.h.EVAL_TEMPLATE("swf_page_add_embed", params)
        }, mac);

        c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);
    }
}

MacroSet.prototype.form_on = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "form_on", params);
    pc.Check("jump_target", "TOURSTOP_CAPTION");

    ctx.pj_possible_form_points = 0;

    c.ew.javascript(ctx, time, {
        relpos: {FP: "-1", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: c.h.EVAL_TEMPLATE("init_form_mode", params)
    }, mac);

    c.form_mode = true;
    c.form_bubble_open = false;
    c.bubbles = null;
    c.bubbleclicks = null;
}


MacroSet.prototype.form_off = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "form_off", params);

    pc.Check("show_bubble_p", "BOOL_0_1", 1);

    if (c.active_mode == "uebung") {
        form_practice_watch(c, ctx, time, mac, params);
    } else if (c.active_mode == "test") {
        form_test_watch(c, ctx, time, mac, params);
    }

    c.ew.javascript(ctx, time, {
        relpos: {FP: "-1", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: c.h.EVAL_TEMPLATE("end_form_mode", params)
    }, mac);

    switch(c.active_mode) {
        case "demo":
        case "praxis":
        break;
        case "uebung":
        case "test":
            multi_macro_end(c, ctx, time, mac, params);
            break;
        break;

    };

    c.form_mode = false;
    c.bubbles = null;
    c.bubbleclicks = null;
    c.form_bubble_open = false;
}

MacroSet.prototype.branch_on = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "branch_on", params);

    c.branch_mode = true;
    ctx.hasBranches = true;

    if (c.active_mode == "uebung") {
        practice_watch(c, ctx, time, mac, params);
    } else if (c.active_mode == "test") {
        test_watch(c, ctx, time, mac, params);
    }

    switch(c.active_mode) {
        case "demo":
        case "praxis":
        break;
        case "uebung":
        case "test":
        break;
    };
    c.bubbles = null;
    c.bubbleclicks = null;
}


MacroSet.prototype.branch_off = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "branch_off", params);

    pc.Check("bubblestyle_d", "SHELF", "_default");
    pc.Check("b_width", "INTEGER", 200);
    pc.Check("b_height", "INTEGER", 200);
    pc.Check("orientation", "ORIENTATION_BUBBLE", "C");
    pc.Check("position_b", "RELPOS");
    pc.Check("b_duration", "INTEGER", -1);
    pc.Check("bubblestyle_p", "SHELF", "_default");
    pc.Check("b_width_p", "INTEGER", 200);
    pc.Check("b_height_p", "INTEGER", 200);
    pc.Check("orientation_p", "ORIENTATION_BUBBLE", "C");
    pc.Check("position_bu", "RELPOS");
    pc.Check("show_bubble_d", "BOOL_0_1", 1);
    pc.Check("show_bubble_p", "BOOL_0_1", 1);

    switch(c.active_mode) {
        case "demo":
            var has_audio = c.ts_audio_duration > 0 && c.show_audio;
            var show_text = params.show_bubble_d && (!has_audio || c.show_text);
            var audio_sync = has_audio && c.global_params.g_sync_demo_bubble_dur_to_audio;

            if (show_text) {
                var save_ = params.explanation_d;
                params.explanation_d = typeof c.bubbles == 'string' ? c.bubbles : '';
                d_bubble(c, ctx, time, mac, params);
                params.explanation_d = save_;
            }

            if (audio_sync) {
                c.ew.pause(ctx, time, { timeout: 1, type: "timeout" }, mac);
            } else if (has_audio && !show_text && c.ts_first) {
                c.ew.pause(ctx, time, { timeout: c.ts_audio_duration / 1000, type: "timeout" }, mac);
            } else {
                c.ew.pause(ctx, time, { timeout: params.b_duration, type: "timeout" }, mac);
            }
            c.ts_first = false;
            break;
        case "praxis":
            if (typeof(c.bubbles) == 'string') {
                var save_ = params.explanation_d;
                params.explanation_d = c.bubbles;
                d_bubble(c, ctx, time, mac, params);
                params.explanation_d = save_;
                    c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);
                }
        break;
        case "uebung":
        case "test":
            multi_macro_end(c, ctx, time, mac, params);
        break;
    };
    c.branch_mode = false;
    c.bubbles = null;
    c.bubbleclicks = null;
}

MacroSet.prototype.mode_change = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "mode_change", params);

    pc.Check("in_demo_to", "ENUM", "demo");
    pc.Check("in_uebung_to", "ENUM", "uebung");
    pc.Check("in_test_to", "ENUM", "test");
    pc.Check("in_praxis_to", "ENUM", "praxis");

    switch(c.mode) {
        case "demo":
            c.active_mode = params.in_demo_to;
        break;
        case "praxis":
            c.active_mode = params.in_praxis_to;
        break;
        case "uebung":
            c.active_mode = params.in_uebung_to;
        break;
        case "test":
            c.active_mode = params.in_test_to;
        break;
    };
}

MacroSet.prototype.mode_change_end = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "mode_change", params);

    c.active_mode = c.mode;
}

/* DPS-4385 */
MacroSet.prototype.event = function(c, ctx, time, duration, params) {
    ctx.ew && params.event_type && ctx.ew[params.event_type] && ctx.ew[params.event_type](ctx, time, params);
}

MacroSet.prototype.mchoice = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var quizname = "mchoice";
    var max_answers = 6;

    var pc = new ParamChecker(c.defaults, quizname, params);
    if (quiz_basic_param_check(pc, c, ctx, quizname)) return;

    for (var i = 1; i <= max_answers; i++) {
        var id = "answer_"+i;

        pc.Check(id, "TEXT", "");
        pc.Check(id + "_correct", "BOOL_0_1", 0);
    }
    pc.Check("shuffle_solutions", "BOOL_0_1", 0);
    pc.Check("force_multiple_choice", "BOOL_0_1", 0);

    var num_corr_answers = 0;
    for (var i = 1; i <= max_answers; i++) {
        if (params["answer_" + i + "_correct"]) {
            num_corr_answers++;

            if (params["answer_" + i] == "") {
                //alert("Quiz Error: You selected an empty answer to be correct.");
                return;
            }
        }
    }

    if (num_corr_answers == 0) {
        //alert("Quiz Error: You have to select a correct answer.");
        return;
    }

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test"))
    {
        quiz_basic_events(quizname, params, c, time);

        var shuffle = [];
        for (var i = 0; i < max_answers; i++) {
            shuffle.push(i + 1);
        }
        if (params.shuffle_solutions == 1 && shuffle.length > 1) {
            var xyz = shuffle.copy();
            do {
                shuffle.mix();
            } while (shuffle.join("") == xyz.join(""));
        }

        for (var i = j = 1; i <= max_answers; i++) {
            var pname = 'answer_' + shuffle[i - 1];
            if (params[pname] != "") {
                params.answer = params[pname];
                c.ew.javascript(ctx, time, {
                    relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                    text: c.h.EVAL_TEMPLATE("quiz_add_answer", params)
                }, mac);

                params.flag_name = "correct_answer_" + j++;
                params.flag_data = params[pname + '_correct'];
                c.ew.javascript(ctx, time, {
                    relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                    text: c.h.EVAL_TEMPLATE("quiz_set_flag_boolean", params)
                }, mac);
            }
        }

        var fb = "force_multiple_choice";
        params.flag_name = fb;
        params.flag_data = params[params.flag_name];
        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: c.h.EVAL_TEMPLATE("quiz_set_flag_boolean", params)
        }, mac);

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: "ctx_window.quiz_enable('" + quizname + "');"
        }, mac);

        default_wait(c, ctx, time, mac, params);
    };
}

MacroSet.prototype.sqmaquiz = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var quizname = "sqmaquiz";
    var max_answers = 8;

    var pc = new ParamChecker(c.defaults, quizname, params);
    if (quiz_basic_param_check(pc, c, ctx, quizname)) return;

    pc.Check("answer_type", "ENUM", "qt_comma_list");

    var p2;
    var p3;
    switch(params.answer_type) {
        case "at_comma_list":
        case "at_regexp":
        case "at_text":
        case "at_cs_text":
        case "at_cs_comma_list":
            p2 = "TEXT";
            p3 = "";
            break;
        case "at_integer":
            p2 = "INTEGER";
            p3 = 0;
            break;
        case "at_float":
            p2 = "FLOAT";
            p3 = 0.0;
            break;
        default:
            //alert("Quiz Error: Answer_type '" + params.answer_type + "' is not correct.");
            return;
    }

    var only_empty = 1;
    for (var i = 1; i <= max_answers; i++) {
        pc.Check("answer_"+i, p2, p3);
        if (params["answer_" + i] != "") {
            only_empty = 0;
            switch (params.answer_type) {
                case "at_integer":
                    if (params["answer_" + i].search(/^(?:<(?:>|=)?|>=?)?\d+$/) == -1 &&
                        params["answer_" + i].search(/^\d+-\d+$/) == -1) {
                        //alert("Quiz Error: Required answer (" + params["answer_" + i] + ") does not match question type (integer).");
                        return;
                    }
                    break;
                case "at_float":
                    params["answer_" + i] = params["answer_" + i].replace(/,/g, ".");
                    if (params["answer_" + i].search(/^(?:<(?:>|=)?|>=?)?\d+(?:\.\d+)?$/) == -1 &&
                        params["answer_" + i].search(/^\d+(?:\.\d+)?-\d+(?:\.\d+)?$/) == -1) {
                        //alert("Quiz Error: Required answer (" + params["answer_" + i] + ") does not match question type (float).");
                        return;
                    }
                    break;
                case "at_comma_list":
                case "at_cs_comma_list":
                    var answ = params["answer_" + i].split(",");
                    for (var j = 0; j < answ.length; j++) {
                        answ[j] = answ[j].replace(/^( )*/, "");
                        answ[j] = answ[j].replace(/( )*$/, "");
                    }
                    params["answer_" + i] = answ.join(",");
                    break;
            }
        }
    }

    if (only_empty) {
        //alert("Quiz Error: At least one answer required.");
        return;
    }

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test"))
    {
        quiz_basic_events(quizname, params, c, time);

        for (var i = 1; i <= max_answers; i++) {
            var pname = 'answer_' + i;
            if (params[pname] != "") {
                params.answer = params[pname];
                c.ew.javascript(ctx, time, {
                    relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                    text: c.h.EVAL_TEMPLATE("quiz_add_answer", params)
                }, mac);
            }
        }

        params.flag_name = 'answer_type';
        params.flag_data = params.answer_type;
        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: c.h.EVAL_TEMPLATE("quiz_set_flag", params)
        }, mac);

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: "ctx_window.quiz_enable('" + quizname + "');"
        }, mac);

        default_wait(c, ctx, time, mac, params);
    };
}

MacroSet.prototype.fibquiz = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var quizname = "fibquiz";
    var max_answers = 8;

    var pc = new ParamChecker(c.defaults, quizname, params);
    if (quiz_basic_param_check(pc, c, ctx, quizname)) return;

    pc.Check("shuffle_solutions", "BOOL_0_1", 0);
    pc.Check("fibtext", "HTML", "");
    params.fibtext = remove_outer_p_tags(params.fibtext);
    for (var i = 1; i <= max_answers; i++) {
        pc.Check("answer_" + i, "TEXT", "");
    }
    pc.Check("quiz_type", "ENUM", "qt_text");
    pc.Check("one_for_all", "BOOL_0_1", 0);

    if (params.fibtext == '') {
        return;
    } else if (params.fibtext.search("___") == -1) {
        return;
    } else {
        var quizType_ = params.quiz_type;
        var parts_ = params.fibtext.split("___");
        var count_ = 0;

        for (var i = 1; i <= max_answers; i++) {
            var answer_ = params["answer_" + i].replace(/^( )+/, '').replace(/,( )+/g, ',');
            if (answer_.length) {
                count_++;

                if (quizType_ == "qt_drop_down" || quizType_ == "qt_drag_drop") {
                    if (answer_.indexOf(",*") == -1 && answer_.substr(0, 1) != '*') {
                        return;
                    }
                }
            }
        }

        if (params.one_for_all == 0) {
            if (count_ + 1 != parts_.length) {
                return;
            }
            if (params.shuffle_solutions == 1 && (quizType_ == "qt_text" || quizType_ == "qt_cs_text")) {
                return;
            }
        } else {
            if (quizType_ == "qt_text" || quizType_ == "qt_cs_text") {
                return;
            }
            if (params.answer_1 == "") {
                return;
            } else {
                var answer_ = params.answer_1.split(",");
                var len_ = answer_.length;
                var countCorrect_ = 0;

                for (var i = 0; i < len_; i++) {
                    if (answer_[i].substr(0, 1) == '*') countCorrect_++;
                }
                if (countCorrect_ + 1 != parts_.length) {
                    return;
                }
            }
        }
    }

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test"))
    {
        quiz_basic_events(quizname, params, c, time);

        for (var i = 1; i <= max_answers; i++) {
            var pname = 'answer_' + i;
            if (params[pname] != "") {
                params.answer = params[pname];
                c.ew.javascript(ctx, time, {
                    relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                    text: c.h.EVAL_TEMPLATE("quiz_add_answer", params)
                }, mac);
            }
        }

        var fb = ["quiz_type", "one_for_all", "shuffle_solutions", "fibtext"];
        for (var i = 0; i < fb.length; i++) {
            var type_ = '';

            switch (fb[i]) {
                case 'one_for_all':
                case 'shuffle_solutions':
                    type_ = '_boolean';
                    break;
            }

            params.flag_name = fb[i];
            params.flag_data = params[params.flag_name];
            c.ew.javascript(ctx, time, {
                relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                text: c.h.EVAL_TEMPLATE("quiz_set_flag" + type_, params)
            }, mac);
        }

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: "ctx_window.quiz_enable('" + quizname + "');"
        }, mac);

        default_wait(c, ctx, time, mac, params);
    };
}

MacroSet.prototype.matchquiz = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var quizname = "matchquiz";
    var max_answers = 8;

    var pc = new ParamChecker(c.defaults, quizname, params);
    pc.Check("matchquestion", "HTML", "");
    pc.params_.question = params.matchquestion;
    if (quiz_basic_param_check(pc, c, ctx, quizname)) return;

    var atLeastTwo_ = 0;
    for (var i = 1; i <= max_answers; i++) {
        var q = "question_" + i;
        var a = "answer_" + i;
        pc.Check(q, "HTML", "");
        pc.Check(a, "HTML", "");
        params[q] = remove_outer_p_tags(params[q]);
        params[a] = remove_outer_p_tags(params[a]);

        if (params[a] != '') atLeastTwo_++;

        if (params[q] == "" && params[a] != "" ||
            params[q] != "" && params[a] == "") {
            //alert("Quiz Error: Each question must have an answer and each answer must have a question.");
            return;
        }
    }

    if (atLeastTwo_ < 2) {
        //alert("Quiz Error: At least two answers required.");
        return;
    }

    for (var i = 1; i <= max_answers; i++) {
        var a1_ = params['answer_' + i];
        if (a1_.length != 0) {
            for (var j = i + 1; j <= max_answers; j++) {
                var a2_ = params['answer_' + j];
                if (a2_.length != 0 && a1_ == a2_) {
                   return;
                }
            }
        }
    }

    pc.Check("quiz_type", "ENUM", "qt_drop_down");

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test"))
    {
        quiz_basic_events(quizname, params, c, time);

        for (var i = 1; i <= max_answers; i++) {
            var qname = 'question_' + i;
            var aname = 'answer_' + i;
            if (params[aname] != "" && params[qname] != "") {
                params.question_n = params[qname];
                params.answer_n = params[aname];
                c.ew.javascript(ctx, time, {
                    relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                    text: c.h.EVAL_TEMPLATE("quiz_add_question_answer_pair", params)
                }, mac);
            }
        }

        params.flag_name = 'quiz_type';
        params.flag_data = params.quiz_type;
        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: c.h.EVAL_TEMPLATE("quiz_set_flag", params)
        }, mac);

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: "ctx_window.quiz_enable('" + quizname + "');"
        }, mac);

        default_wait(c, ctx, time, mac, params);
    };
}

MacroSet.prototype.connquiz = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var quizname = "connquiz";
    var max_answers = 8;

    var pc = new ParamChecker(c.defaults, quizname, params);
    pc.Check("connquestion", "HTML", "");
    pc.params_.question = params.connquestion;
    if (quiz_basic_param_check(pc, c, ctx, quizname)) return;

    var atLeastTwo_ = 0;
    for (var i = 1; i <= max_answers; i++) {
        var q = "question_" + i;
        var a = "answer_" + i;
        pc.Check(q, "HTML", "");
        pc.Check(a, "HTML", "");
        params[q] = remove_outer_p_tags(params[q]);
        params[a] = remove_outer_p_tags(params[a]);

        if (params[a] != '') atLeastTwo_++;

        if (params[q] == "" && params[a] != "" ||
            params[q] != "" && params[a] == "") {
            //alert("Quiz Error: Each question must have an answer and each answer must have a question.");
            return;
        }
    }

    if (atLeastTwo_ < 2) {
        //alert("Quiz Error: At least two answers required.");
        return;
    }

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test"))
    {
        quiz_basic_events(quizname, params, c, time);

        for (var i = 1; i <= max_answers; i++) {
            var qname = 'question_' + i;
            var aname = 'answer_' + i;
            if (params[aname] != "" && params[qname] != "") {
                params.question_n = params[qname];
                params.answer_n = params[aname];
                c.ew.javascript(ctx, time, {
                    relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                    text: c.h.EVAL_TEMPLATE("quiz_add_question_answer_pair", params)
                }, mac);
            }
        }

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: "ctx_window.quiz_enable('" + quizname + "');"
        }, mac);

        default_wait(c, ctx, time, mac, params);
    };
}

MacroSet.prototype.mixquiz = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var quizname = "mixquiz";
    var max_answers = 8;

    var pc = new ParamChecker(c.defaults, quizname, params);
    if (quiz_basic_param_check(pc, c, ctx, quizname)) return;

    var count_answers = 0;
    var answers_ = [];
    for (var i = 1; i <= max_answers; i++) {
        pc.Check("answer_" + i, "TEXT", "");
        if (params["answer_" + i] != "") {
            count_answers++;
            params["answer_" + i] = params["answer_" + i].replace(/\s+$/g, '');
            answers_.push(params["answer_" + i]);
        }
    }

    var first_ = answers_[0];
    var allEqual_ = true;
    for (var i = answers_.length - 1; i >= 1; i--) {
        if (answers_[i] != first_) {
            allEqual_ = false;
            break;
        }
    }

    pc.Check("quiz_alignment", "ENUM", "qa_horizontal");
    pc.Check("quiz_type", "ENUM", "qt_drop_down");

    if (count_answers < 2 || allEqual_) {
        //alert("Quiz Error: You have to specify at least two answers!");
        //alert("Quiz Error: Your answers need to be different!!");
        return;
    }

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test"))
    {
        quiz_basic_events(quizname, params, c, time);

        for (var i = 1; i <= max_answers; i++) {
            var aname = 'answer_' + i;
            if (params[aname] != "") {
                params.answer = params[aname];
                c.ew.javascript(ctx, time, {
                    relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                    text: c.h.EVAL_TEMPLATE("quiz_add_answer", params)
                }, mac);
            }
        }

        var fb = ["quiz_type", "quiz_alignment"];
        for (var i = 0; i < fb.length; i++) {
            params.flag_name = fb[i];
            params.flag_data = params[params.flag_name];
            c.ew.javascript(ctx, time, {
                relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                text: c.h.EVAL_TEMPLATE("quiz_set_flag", params)
            }, mac);
        }

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: "ctx_window.quiz_enable('" + quizname + "');"
        }, mac);

        default_wait(c, ctx, time, mac, params);
    };
}

MacroSet.prototype.scalequiz = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var quizname = "scalequiz";

    var pc = new ParamChecker(c.defaults, quizname, params);
    if (quiz_basic_param_check(pc, c, ctx, quizname)) return;

    pc.Check("range", "TEXT", "");
    pc.Check("answer", "TEXT", "");

    var a = params.answer;
    var r = params.range;
    if (a == "") {
        //alert("Quiz Error: You have to specify an answer!");
        return;
    }
    if (r == "") {
        //alert("Quiz Error: You have to specify the range!");
        return;
    }
    if (a.search(/^(\d+)$/) == -1 &&
        a.search(/^(\d+)-(\d+)$/) == -1 &&
        a.search(/^<(\d+)$/) == -1 &&
        a.search(/^>(\d+)$/) == -1) {
        //alert("Quiz Error: Required answer (" + params.answer + ") does not match question type (integer).");
        return;
    }
    if (r.search(/^(\d+)-(\d+)$/) == -1) {
        //alert("Quiz Error: Range (" + params.range + ") does not match required format (min-max).");
        return;
    }
    var h = r.split("-");
    if (h[0] > parseInt(a) || h[1] < parseInt(a)) {
        //alert("Quiz Error: Answer (" + a + ") is not in range (" + r + ").");
        return;
    }

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test"))
    {
        quiz_basic_events(quizname, params, c, time);

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: c.h.EVAL_TEMPLATE("quiz_add_answer", params)
        }, mac);

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: c.h.EVAL_TEMPLATE("quiz_add_answer", {answer: params.range})
        }, mac);

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: "ctx_window.quiz_enable('" + quizname + "');"
        }, mac);

        default_wait(c, ctx, time, mac, params);
    };
}

MacroSet.prototype.gridquiz = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var quizname = "gridquiz";
    var max_answers = 8;

    var pc = new ParamChecker(c.defaults, quizname, params);
    if (quiz_basic_param_check(pc, c, ctx, quizname)) return;

    pc.Check("shuffle_solutions", "BOOL_0_1", 0);
    pc.Check("grid_list", "TEXT", "");
    if (params.grid_list == "") {
        //alert("Quiz Error: You have to specify some answers for the grid!");
        return;
    }
    for (var i = 1; i <= max_answers; i++) {
        pc.Check("question_" + i, "TEXT", "");
        pc.Check("answer_" + i, "TEXT", "");

        if (params["question_" + i] == "" && params["answer_" + i] != "" ||
            params["question_" + i] != "" && params["answer_" + i] == "") {
            //alert("Quiz Error: Each question must have an answer and each answer must have a question.");
            return;
        }
    }

    var h = params.grid_list.split(",");
    for (var j = 1; j <= max_answers; j++) {
        if (params["answer_" + j] != "") {
            if (params["answer_" + j].toString().search(/^(\d+)$/) == -1) {
                //alert("Quiz Error: Your grid answer " + params["answer_" + j] + " is not required type Integer");
                return;
            } else if (parseInt(params["answer_" + j]) < 1 || parseInt(params["answer_" + j]) > h.length) {
                //alert("Quiz Error: Your grid answer " + params["answer_" + j] + " is not in 1 - " + h.length + " for grid: " + params.grid_list);
                return;
            }
        }
    }

    if (params.shuffle_solutions == 1) {
        for (var i = 0; i < h.length; i++) {
            h[i] = (i + 1) + "_" + h[i];
        }
        if (h.length > 1) {
            var xyz = h.copy();
            do {
                h.mix();
            } while (h.join("") == xyz.join(""));
        }
        for (var i = 1; i <= max_answers; i++) {
            if (params["answer_" + i] != "") {
                for (var j = 0; j < h.length; j++) {
                    if (parseInt(params["answer_" + i]) == parseInt(h[j])) {
                        params["answer_" + i] = j + 1;
                        break;
                    }
                }
            }
        }
        for (var i = 0; i < h.length; i++) {
            var nbr = parseInt(h[i]);
            h[i] = h[i].substr(nbr.toString().length + 1);
        }
        params.grid_list = h.join(",");
    }

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test"))
    {
        quiz_basic_events(quizname, params, c, time);

        for (var i = 1; i <= max_answers; i++) {
            var qname = 'question_' + i;
            var aname = 'answer_' + i;
            if (params[aname] != "" && params[qname] != "") {
                params.question_n = params[qname];
                params.answer_n = params[aname];
                c.ew.javascript(ctx, time, {
                    relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                    text: c.h.EVAL_TEMPLATE("quiz_add_question_answer_pair", params)
                }, mac);
            }
        }

        params.flag_name = 'grid_list';
        params.flag_data = params.grid_list;
        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: c.h.EVAL_TEMPLATE("quiz_set_flag", params)
        }, mac);

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: "ctx_window.quiz_enable('" + quizname + "');"
        }, mac);

        default_wait(c, ctx, time, mac, params);
    };
}

MacroSet.prototype.puzzlequiz = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var quizname = "puzzlequiz";

    var pc = new ParamChecker(c.defaults, quizname, params);
    if (quiz_basic_param_check(pc, c, ctx, quizname)) return;

    pc.Check("quiz_type", "ENUM", "qt_oneplace_puzzle");
    pc.Check("qp_show_hint", "BOOL_0_1", 1);
    pc.Check("qp_pieces_x", "INTEGER", 2);
    pc.Check("qp_pieces_y", "INTEGER", 2);
    if (params.qp_pieces_x == -1) params.qp_pieces_x = 2;
    if (params.qp_pieces_y == -1) params.qp_pieces_y = 2;

    if (params.qm_file == '') {
        //alert("Quiz Error: An image is required");
        return;
    }

    if (params.qp_pieces_x <= 0 || params.qp_pieces_y <= 0) {
        //alert("Quiz Error: Puzzle pieces must be greater than 0!");
        return;
    }

    if (params.qp_pieces_x * params.qp_pieces_y > 200) {
        //alert("Quiz Error: Puzzle is limited to max. 400 pieces!");
        return;
    }

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test"))
    {
        quiz_basic_events(quizname, params, c, time);

        var fb = ["qp_pieces_x", "qp_pieces_y", "qp_show_hint", "quiz_type"];
        for (var i = 0; i < fb.length; i++) {
            var type_ = (fb[i] == 'qp_show_hint') ? '_boolean' : '';

            params.flag_name = fb[i];
            params.flag_data = params[params.flag_name];
            c.ew.javascript(ctx, time, {
                relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                text: c.h.EVAL_TEMPLATE("quiz_set_flag" + type_, params)
            }, mac);
        }

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: "ctx_window.quiz_enable('" + quizname + "');"
        }, mac);

        default_wait(c, ctx, time, mac, params);
    };
}

MacroSet.prototype.hotspotquiz = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var quizname = "hotspotquiz";

    var pc = new ParamChecker(c.defaults, quizname, params);
    if (quiz_basic_param_check(pc, c, ctx, quizname)) return;

    pc.Check("hs_image", "IMAGE");
    pc.Check("selection_rect", "POSSIZE");

    if (params.hs_image == '') {
        //alert("Quiz Error: An image is required");
        return;
    }

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test"))
    {
        quiz_basic_events(quizname, params, c, time);

        params.selection_left = params.selection_rect.left;
        params.selection_right = params.selection_rect.left + params.selection_rect.width;
        params.selection_top = params.selection_rect.top;
        params.selection_bottom = params.selection_rect.top + params.selection_rect.height;

        var fb = ["hs_image", "selection_left", "selection_right", "selection_top", "selection_bottom"];
        for (var i = 0; i < fb.length; i++) {
            var type_ = (fb[i] == 'hs_image') ? '' : '_int';

            params.flag_name = fb[i];
            params.flag_data = params[params.flag_name];
            c.ew.javascript(ctx, time, {
                relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                text: c.h.EVAL_TEMPLATE("quiz_set_flag" + type_, params)
            }, mac);
        }

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: "ctx_window.quiz_enable('" + quizname + "');"
        }, mac);

        default_wait(c, ctx, time, mac, params);
    };
}

MacroSet.prototype.quiz_shuffle_on = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "quiz_shuffle_on", params);

    pc.Check("points", "INTEGER", 0);
    pc.Check("quiz_selection_count", "INTEGER", 1);
    pc.Check("quiz_selection_type", "ENUM", "qst_random_choice");
    pc.Check("in_demo", "BOOL_0_1", c.global_params.g_in_demo);
    pc.Check("in_test", "BOOL_0_1", c.global_params.g_in_test);
    pc.Check("in_practice", "BOOL_0_1", c.global_params.g_in_practice);

    c.quiz_on = true;
    c.quizzes = {};
    c.quizzes.macros = [];
    c.quizzes.points = params.points;
    c.quizzes.selection_type = params.quiz_selection_type;
    c.quizzes.selection_count = params.quiz_selection_count;
    c.quizzes.in_demo = params.in_demo;
    c.quizzes.in_test = params.in_test;
    c.quizzes.in_practice = params.in_practice;
}

MacroSet.prototype.quiz_shuffle_off = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    c.quiz_on = false;

    if (!c || !c.quizzes || !c.quizzes.macros || !c.quizzes.macros.length) {
        return;
    }

    if (c.quizzes.selection_type == "qst_random_choice") {
        var pos_ = Math.floor(Math.random() * c.quizzes.macros.length);
        var cur_ = c.quizzes.macros[pos_];

        cur_.params.in_demo = c.quizzes.in_demo;
        cur_.params.in_test = c.quizzes.in_test;
        cur_.params.in_practice = c.quizzes.in_practice;
        cur_.params.points = c.quizzes.points;

        MacroSet.prototype[cur_.type](c, ctx, time, duration, cur_.params);
    } else {
        var len_ = c.quizzes.macros.length;
        var order_ = [];

        for (var i = 0; i < len_; i++) {
            order_.push(i);
        }
        if (len_ > 1) order_.mix();

        var count_ = c.quizzes.selection_count;
        if (c.quizzes.selection_type == "qst_shuffle_count" && len_ > count_) {
            order_.splice(count_, len_ - count_);
            len_ = count_;
        }

        for (var i = 0; i < len_; i++) {
            var cur_ = c.quizzes.macros[order_[i]];

            cur_.params.in_demo = c.quizzes.in_demo;
            cur_.params.in_test = c.quizzes.in_test;
            cur_.params.in_practice = c.quizzes.in_practice;

            MacroSet.prototype[cur_.type](c, ctx, time, duration, cur_.params);
        }
    }

    c.quizzes = null;
}

MacroSet.prototype.quiz_eval = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "gridquiz", params);

    pc.Check("proj_title", "TEXT", "");
    pc.Check("quiz_threshold", "TEXT", "pj_init_empty");
    pc.Check("eval_type", "ENUM", "et_reduced");
    pc.Check("in_demo", "BOOL_0_1", c.global_params.g_in_demo);
    pc.Check("in_test", "BOOL_0_1", c.global_params.g_in_test);
    pc.Check("in_practice", "BOOL_0_1", c.global_params.g_in_practice);
    pc.Check("feedback_enable", "BOOL_0_1", c.global_params.g_feedback_enable);
    pc.Check("feedback_pass", "HTML", c.global_params.g_feedback_pass);
    pc.Check("feedback_fail", "HTML", c.global_params.g_feedback_fail);

    if (params.quiz_threshold != "" &&
        params.quiz_threshold != "pj_init_empty" &&
        params.quiz_threshold != "empty")
    {
        if (params.quiz_threshold.search(/^(\d+)$/) == -1) {
            //alert("Quiz Error: Threshold have to be type integer.");
            return;
        }
    } else {
        params.quiz_threshold = "empty";
    }

    if ((params.in_demo && c.active_mode == "demo") ||
        (params.in_practice && c.active_mode == "uebung") ||
        (params.in_test && c.active_mode == "test"))
    {
        params.quiz_style_dir = c.global_params.g_quiz_style_dir;
        c.last_page_is_special = false;
        c.ew.fileurl(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            url: ctx.cfg_resolve("quiz_eval.html", "quiz_style:")
        }, mac);

        time += 200;
        c.ew.loaded(ctx, time, { }, mac);
        time += 200;

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: c.h.EVAL_TEMPLATE("evalquiz_check_page", params)
        }, mac);

        var fb = ["proj_title", "quiz_threshold", "eval_type", "feedback_enable", "feedback_pass", "feedback_fail"];
        for (var i = 0; i < fb.length; i++) {
            var type_ = (fb[i] == 'feedback_enable') ? '_boolean' : '';

            params.param_name = fb[i];
            params.param_data = params[params.param_name];
            c.ew.javascript(ctx, time, {
                relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
                text: c.h.EVAL_TEMPLATE("eval_set_param" + type_, params)
            }, mac);
        }

        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: "ctx_window.eval_enable();"
        }, mac);

        c.ew.pause(ctx, time, { timeout: -1, type: "timeout" }, mac);
    };
}

MacroSet.prototype.guide_init = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "guide_init", params);
    pc.Check("app_url", "TEXT");

    if (c.active_mode == 'praxis') {
        if (params.app_url.length) {
            c.ew.javascript(ctx, time, {
                relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, "") },
                text: c.h.EVAL_TEMPLATE("guide_init", params)
            });
        }
    }
}

MacroSet.prototype.guide_page = function(c, ctx, time, duration, params) {
    var mac = { uid: params.uid };

    var pc = new ParamChecker(c.defaults, "guide_page", params);

    if (c.active_mode == 'praxis') {
        c.ew.loaded(ctx, time, { }, mac);

        params.bubbletext_expanded = params.explanation_d;
        params.bubble_position = {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, "") };
        params.bubble_orientation = "C";
        params.bubble_style = "sap_arrow";
        bubble(c, ctx, time, mac, params);

        if (c.ts_audio_duration && c.ts_audio_duration > 0) {
            c.ew.pause(ctx, time + c.ts_audio_duration, { type: "simple" }, mac);
        } else {
            c.ew.pause(ctx, time, { type: "simple" }, mac);
        }
    }
}

MacroSet.prototype.hpqc_header = function(c, ctx, time, duration, params) {
}

MacroSet.prototype.slide_big_arrow = function(c, ctx, time, duration, params) {
}

MacroSet.prototype.slide_arrow = function(c, ctx, time, duration, params) {
}

MacroSet.prototype.slide_link_textBoxIcon = function(c, ctx, time, duration, params) {
}

MacroSet.prototype.slide_image = function(c, ctx, time, duration, params) {
}

MacroSet.prototype.slide_icon_link = function(c, ctx, time, duration, params) {
}

MacroSet.prototype.slide_hrefarea = function(c, ctx, time, duration, params) {
}
