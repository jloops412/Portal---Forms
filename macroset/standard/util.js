
function ParamChecker(defaults, macro_name, params) {
    this.defaults_ = defaults;
    this.macro_name_ = macro_name;
    this.params_ = params;
}

ParamChecker.prototype.Check = function(pname, param_type, builtin) {
    builtin_ = builtin != undefined ? builtin:
        param_type.indexOf("BOOL") >= 0 ? false:
        param_type.indexOf("INTEGER") >=0 ? 0:
        "";
    if (! (pname in this.params_)) {
        if (this.defaults_ != null && this.macro_name_ in this.defaults_) { // macro is defined in defaults
            var macrodefaults = this.defaults_[this.macro_name_];
            if (pname in macrodefaults){ // parameter is defined in macrodefaults
                this.params_[pname] = macrodefaults[pname];
            } else {
                this.params_[pname] = builtin_;
            }
        } else {
            this.params_[pname] = builtin_;
        }
    }
    /* DPS-2676 */
    if (param_type && param_type.indexOf('RELPOS') == 0) {
        if (this.params_[pname] &&
            this.params_[pname].EP &&
            this.params_[pname].EP.eep &&
            this.params_[pname].EP.eep.indexOf('execScript') >= 0)
        {
            this.params_[pname].EP.eep = '';
        }
    }
}

function CtxHelper(context){
    this.ctx_ = context;
    this.value = function(pname, params) {
        var res =
            pname in params ? params[pname] :
            this.ctx_.global_params && pname in this.ctx_.global_params ? this.ctx_.global_params[pname]:
            "???";
        return res;
    };
}

CtxHelper.prototype.EVAL_TEMPLATE = function (t, params) {
    var src = this.ctx_.string_templates[t];
    return this.EVAL_STRING(src, params);
}

function js_encode(s) {
    s = s.replace(/\\/g, '\\\\');
    s = s.replace(/'/g, "\\'");
    s = s.replace(/"/g, '\\"');
    s = s.replace(/\r/g, '\\r');
    s = s.replace(/\n/g, '\\n');
    return s;
}

function url_encode(s) {
    s = s.replace(/ /g, '+');
    return s;
}

function html_encode(s) {
    s = s.replace(/&/g, '&amp;');
    s = s.replace(/>/g, '&gt;');
    s = s.replace(/</g, '&lt;');
    return s;
}

CtxHelper.prototype.EVAL_STRING = function (s, params) {
    var src = s;
    var re_js2 = /\$%%(\w*)\$/g;
    var re_js = /\$%(\w*)\$/g;
    var re_url = /\$@(\w*)\$/g;
    var re = /\$(\w*)\$/g;
    var re_html = /\$[#|%]\{(\w*)\}/g; /* DPS-12232 */
    var re2 = /\$\{(\w*)\}/g;
    var re_img = /\$I\{(\w*)\}/g;
    var re_pimg = /\$P\{(\w*)\}/g;
    var re_doc = /\$D\{(\w*)\}/g;
    var param;
    var res = src;

    var pname;
    var val;
    changed = true;
    while (changed) {
        changed = false;
        while ((param = re_js2.exec(res)) != null) {
            changed = true;
            pname = param[1];
            res = res.replace(param[0], js_encode(js_encode(''+ this.value(pname, params))));
            // log("RE : " + res);
        }
        while ((param = re_js.exec(res)) != null) {
            changed = true;
            pname = param[1];
            res = res.replace(param[0], js_encode(''+ this.value(pname, params)));
            // log("RE : " + res);
        }
        while ((param = re_url.exec(res)) != null) {
            changed = true;
            pname = param[1];
            res = res.replace(param[0], url_encode(''+ this.value(pname, params)));
            // log("RE : " + res);
        }
        while ((param = re_html.exec(res)) != null) {
            changed = true;
            pname = param[1];
            res = res.replace(param[0], ''+ html_encode(this.value(pname, params)));
            // log("HTML: " + res);
        }
        while ((param = re.exec(res)) != null) {
            changed = true;
            pname = param[1];
            res = res.replace(param[0], ''+ this.value(pname, params));
            // log("RE : " + res);
        }
        while ((param = re2.exec(res)) != null) {
            changed = true;
            pname = param[1];
            res = res.replace(param[0], ''+this.value(pname, params));
            // log("RE2: " + res);
        }
        while ((param = re_img.exec(res)) != null) {
            changed = true;
            pname = param[1];
            var val = this.value(pname, params);
            if (val.length) {
                res = res.replace(param[0], '<img src="' + this.value(pname, params) +'"/>');
            } else {
                res = res.replace(param[0], '');
            }
            // log("RE3: " + res);
        }
        while ((param = re_pimg.exec(res)) != null) {
            changed = true;
            pname = param[1];
            var val = this.value(pname, params);
            if (val.length) {
                res = res.replace(param[0], '<img src="' + this.value(pname, params) +'"/>');
            } else {
                res = res.replace(param[0], '');
            }
            // log("RE3: " + res);
        }
        while ((param = re_doc.exec(res)) != null) {
            changed = true;
            pname = param[1];
            var val = this.value(pname, params);
            if (val.length) {
                res= res.replace(param[0], '<img src="doc/'+ this.value(pname, params)+'"/>');
            } else {
                res= res.replace(param[0], '');
            }
            // log("RE4: " + res);
        }
    }

    return res;
}

CtxHelper.prototype.BUILD_GLOBALS =function (project_globals, default_globals, builtin_globals) {
    res = new Array();
    for (param in builtin_globals) {
        res[param] = param in project_globals ? project_globals[param] :
            param in default_globals ? default_globals[param] :
            builtin_globals[param];
    };
    return res;
}

function remove_outer_p_tags(str) {
    var str_length = str.length;
    if (str.substring(0, 3).toLowerCase() == "<p>" &&
        str.substring(str_length-4, str_length).toLowerCase() == "</p>") {
        str = str.substr(3,str_length-7);
    }
    return str;
}

function remove_html(txt) {
    var res = txt;
    res = res.replace(/\n/g, '');
    res = res.replace(/<[^>]*>/g, '');
    res = res.replace(/&nbsp;/gi, '');
    res = res.replace(/&lt;/gi, '<');
    res = res.replace(/&gt;/gi, '>');
    return res;
}

Array.prototype.mix = function() {
    var len_ = this.length;

    if (len_ < 2) return;

    for (var j = len_ - 1; j > 0; j--) {
        var r = Math.floor(Math.random() * (j + 1));
        var t = this[j];

        this[j] = this[r];
        this[r] = t;
    }
}

Array.prototype.copy = function() {
    var len_ = this.length;
    var result_ = new Array(len_);

    for (var i = 0; i < len_; i++) {
        result_[i] = this[i];
    }

    return result_;
}

function quiz_basic_param_check(pc, c, ctx, quizname) {
    if (c.quiz_on) {
        var mymacro = {};
        c.quizzes.macros.push(mymacro);
        mymacro.type = quizname;
        mymacro.params = pc.params_;
        return true;
    }

    pc.Check("uid", "STRING", "");
    pc.Check("points", "INTEGER", 1);
    pc.Check("title", "TEXT", "");
    pc.Check("quiz_timeout", "INTEGER", 0);
    pc.Check("question", "HTML", "");
    pc.Check("qm_file", "IMAGE", "");
    pc.Check("qm_file_type", "TEXT", "");
    pc.Check("qm_width", "INTEGER", -1);
    pc.Check("qm_height", "INTEGER", -1);
    pc.Check("qm_as_question", "BOOL_0_1", 0);
    pc.Check("in_demo", "BOOL_0_1", c.global_params.g_in_demo);
    pc.Check("in_test", "BOOL_0_1", c.global_params.g_in_test);
    pc.Check("in_practice", "BOOL_0_1", c.global_params.g_in_practice);
    pc.Check("in_prax", "BOOL_0_1", c.global_params.g_in_prax);
    pc.Check("feedback_enable", "BOOL_0_1", c.global_params.g_feedback_enable);
    pc.Check("feedback_popup", "BOOL_0_1", c.global_params.g_feedback_popup);
    pc.Check("feedback_correct_solutions", "BOOL_0_1", c.global_params.g_feedback_correct_solutions);
    pc.Check("feedback_pass", "HTML", c.global_params.g_feedback_pass);
    pc.Check("feedback_fail", "HTML", c.global_params.g_feedback_fail);
    pc.Check("feedback_time", "HTML", c.global_params.g_feedback_time);
    pc.Check("quiz_skipping", "BOOL_0_1", c.global_params.g_quiz_skipping);

    if (parseInt(pc.params_.points) < 0) {
        //alert("it is not allowed to enter points < 0");
        return true;
    }

    if (typeof(ctx.pj_global_timeout) == 'undefined' && c.global_params.g_quiz_timeout != 0) {
        ctx.pj_global_timeout = c.global_params.g_quiz_timeout;
    }

    if (typeof(ctx.pj_quiz_numbers) == 'undefined') {
        ctx.pj_quiz_numbers = 1;
        pc.params_.quiz_number = 1;
    } else {
        ctx.pj_quiz_numbers++;
        pc.params_.quiz_number = ctx.pj_quiz_numbers;
    }

    pc.params_.question = remove_outer_p_tags(pc.params_.question);
    c.bubbles = pc.params_.question;

    if (pc.params_.qm_file != "") {
        var m_type = "";
        if (pc.params_.qm_file.lastIndexOf(".") >= 0) { /* this respects DPS-12718 and is surer */
            m_type = pc.params_.qm_file.substr(pc.params_.qm_file.lastIndexOf(".") + 1);
        }
        switch (m_type.toLowerCase()) {
            case "wma":
            case "mp3":
            case "wav":
                pc.params_.qm_file_type = "wma";
                pc.params_.qm_file = unescape(pc.params_.qm_file); /* whole path must be unescaped for wmp */
                if (pc.params_.qm_as_question == 1) {
                    //alert("Mediatype Audio not supported with option qm_as_question");
                    return true;
                }
                break;
            case "swf":
                pc.params_.qm_file_type = "swf";
                break;
            case "wmv":
                pc.params_.qm_file_type = "wmv";
                pc.params_.qm_file = unescape(pc.params_.qm_file); /* whole path must be unescaped for wmp */
                break;
            case "mov":
                pc.params_.qm_file_type = "mov";
                break;
            case "jpg":
            case "jpeg":
            case "bmp":
            case "gif":
            case "png":
                pc.params_.qm_file_type = "img";
                break;
            default:
                pc.params_.qm_file = "";
                break;
        }
    }

    return false;
}

function quiz_basic_events(quizname, params, c, time) {
    var mac = { uid: params.uid };

    c.cfg_setQuizStyle(c.global_params.g_quiz_style_dir);

    c.ew.fileurl(ctx, time, {
        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        url: ctx.cfg_resolve("quiz_blank.html", "quiz_style:")
    });

    time += 200;
    c.ew.loaded(ctx, time, { });
    time += 200;

    c.ew.javascript(ctx, time, {
        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: c.h.EVAL_TEMPLATE(quizname + "_check_page", params)
    }, mac);

    c.ew.javascript(ctx, time, {
        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: c.h.EVAL_TEMPLATE("quiz_set_uid", params)
    }, mac);

    c.ew.javascript(ctx, time, {
        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: c.h.EVAL_TEMPLATE("quiz_set_question", params)
    }, mac);

    if (params.title.length) {
        c.ew.javascript(ctx, time, {
            relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
            text: c.h.EVAL_TEMPLATE("quiz_set_caption", params)
        });
    }

    c.ew.javascript(ctx, time, {
        relpos: {FP: "0", EP: new ctx.ElementRef("", "", 0, 0, ""), XY: {x: 0, y: 0} , DocXY: {x: 0, y: 0} , XY2: {x: 0, y: 0} , DocXY2: {x: 0, y: 0} , Off: {x: 0, y: 0} },
        text: c.h.EVAL_TEMPLATE("quiz_set_score", params)
    }, mac);

    var fb = ['quiz_number', 'quiz_skipping', 'quiz_timeout', 'qm_file', 'qm_file_type', 'qm_width', 'qm_height', 'qm_as_question',
              'feedback_enable', 'feedback_popup', 'feedback_correct_solutions', 'feedback_pass', 'feedback_fail', 'feedback_time'];

    for (var i = 0; i < fb.length; i++) {
        var type_ = '';

        switch (fb[i]) {
            case 'quiz_number':
            case 'quiz_timeout':
            case 'qm_width':
            case 'qm_height':
                type_ = '_int';
                break;
            case 'quiz_skipping':
            case 'qm_as_question':
            case 'feedback_enable':
            case 'feedback_popup':
            case 'feedback_correct_solutions':
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
}

function navi_get_bubble(pc, params) {
    pc.Check("explanation_d", "HTML", "");
    pc.Check("orientation", "ORIENTATION_BUBBLE");
    pc.Check("type", "ENUM", "none");
    pc.Check("bubblestyle_d", "SHELF", "_default");
    pc.Check("b_width", "INTEGER");
    pc.Check("b_height", "INTEGER");

    var bubble = new winnavp_Bubble();

    bubble.text = dgo_resolve(params, params.explanation_d, 1);
    bubble.style = "orange_border"; //params.bubblestyle_d;
    bubble.width = params.b_width;
    bubble.height = params.b_height;
    bubble.orientation = params.orientation;

    return bubble;
}

function navi_get_unique_objectname(name) {
    var my_name = name;
    var index = 0;

    while (1) {
        if (winnavp_player.Applications.FindObject(my_name) == null) return my_name;

        my_name = name + index;

        index++;
    }
}


function dgo_resolve(params, html_txt, format) {
    //alert(html_txt);
    var resolved = "";

    if (params != null) {
        if (format == 1) {
            html_txt = expand_images(html_txt, params, winnavp_player.uid, params.uid);
        }

        resolved = Document.ResolveHtml(html_txt, format, CreateContext("macro", params.uid, "project", winnavp_player.uid), params);
    } else {
        resolved = Document.ResolveHtml(html_txt, format);
       // alert(resolved);
    }

    //alert(resolved);

    return resolved;
}


function O2S(obj) {
    return Ss(obj, 0);
}

function Ss(obj, ind) {
    var indent = "";
    for (var i = 0; i < ind + 1; ++i) {
        indent += "  ";
    };

    if (obj == null) {
        return "<null>";
    } else if (typeof (obj) == 'string') {
        return '"' + obj + '"';
    } else if (obj.constructor.toString().indexOf("Array") >= 0) {
        var s_arr = new Array();
        for (var ii = 0; ii < obj.length; ++ii) {
            s_arr.push(indent + Ss(obj[ii], ind + 1));
        }
        var res = "[(" + obj.length + ")\n" + s_arr.join(",\n") + "\n" + indent + "]";
        return res;
    } else
    if (typeof (obj) == 'object') {
        var s_arr = new Array();
        for (s in obj) {
            s_arr.push(indent + s + ": " + Ss(obj[s], ind + 1));
        }
        var res = "{\n" + s_arr.join(",\n") + "\n" + indent + "}";
        return res;
    } else {
        return "" + obj;
    }
}

function string_to_map_of_map(string, outer_dlm, inner_dlm) {
    try {
        var params = string.split(outer_dlm);
        var map = new Array();
        for (var i = 0; i < params.length; i++) {
            var parts = params[i].split(inner_dlm);
            map[i] = new Array();
            for (var j = 0; j < parts.length; j++) {
                map[i].push(parts[j]);
            }
        }
        return map;
    } catch (err) {
    }
}
