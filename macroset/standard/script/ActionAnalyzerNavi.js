#use(macroset!standard:script/ActionAnalyzer.js)

var cfg = {
    "standard" : {
        "autocrop" : {
            "crop_min_off_l"    : 60,
            "crop_min_off_t"    : 60,
            "crop_min_off_r"    : 60,
            "crop_min_off_b"    : 60,
            "crop_min_w"        : 320,
            "crop_min_h"        : 200,
            "crop_max_size"     : 580,
            "crop_keep_topleft" : true,
            "crop_adjust_size"  : true
        }
    }
};

function ActionAnalyzerNavi(automat, project, base_dir) {
    ActionAnalyzer.prototype.constructor.call(this, automat, project, base_dir);
}

ActionAnalyzer.prototype.init_translations_ = function() {
    this.progress_caption_ = winnavp_glossary.GetValue("IDS_ANALYZE_ACTIONS");
    this.start_topic_caption_ = "";
}


ActionAnalyzerNavi.prototype = new ActionAnalyzer;
ActionAnalyzerNavi.superClass = ActionAnalyzer.prototype;



ActionAnalyzerNavi.prototype.do_post_crop_ = function() {
    for (var pos = 0; pos < this.project_.NumTourstops(); pos++) {
        var ts = this.project_.GetTourstop(pos);
        var mac = ts.NextMacro();

        if (mac.Template() == "new_page") {
            auto_crop_macro(mac, this.project_);
            GarbageCollect();
        }
    }
}

ActionAnalyzerNavi.prototype.get_infotxt_ = function(type, click_type) {
    return get_infotxt(type + "::" + click_type);
}

ActionAnalyzerNavi.prototype.insert_screenshot_ = function(screen_data, action_timestamp) {
    sa_logger.Write(3, "ActionAnalyzer::insert_screenshot_", "", "");
    var dump = null;
    if (screen_data.scr_dump == null) screen_data.scr_dump = this.fetch_screen_(screen_data);
    
    if (screen_data.scr_dump) {
        dump = screen_data.scr_dump;

        var ts = this.project_.AddTourstop(screen_data.title, Tourstop_SHOW_JUMP);
        var from = this.intermediate_timestamp - this.initial_timestamp;
        var to = action_timestamp - this.initial_timestamp;
        if (this.record_audio_) this.project_.AddAudio(from, to);
        this.intermediate_timestamp = action_timestamp;

        var mac = this.project_.CreateMacro("new_page");

        this.create_asset_(mac, screen_data);

        if (mac.HasParam("sc_config_file")) {
            mac.SetParam("sc_config_file", QUICK_RECORDING);
        }

        if (this.record_video_) {
            this.curr_mac_ = mac;
        }

        screen_data.scr_dump.Save();
        this.project_.InsertEventAfter(mac);
    }
    sa_logger.DeWrite(3);
    return dump;
}

ActionAnalyzer.prototype.create_asset_ = function(mac, screen_data) {
    sa_logger.Write(3, "win_update_asset", "", "");

    if (mac.HasParam("element_type")) {
        mac.SetParam("element_type", "screenshot");
    }

    if (mac.HasParam("screenshot_file")) {
        mac.SetParam("screenshot_file", "img.png");
    }

    if (screen_data != null) {
        if (!mac.HasParam("new_step_modified") || !mac.GetParam("new_step_modified")) {
            if (mac.HasParam("new_step")) {
                mac.SetParam("new_step", screen_data.scr_dump.title);
            }
        }

        if (screen_data.scr_dump != null && mac.HasParam("dump_page")) {
            var res = mac.GetResource();
            var subres = res.CreateSubResource("dump_page");

            screen_data.scr_dump.SetResource(subres);
            mac.SetObjectParam("dump_page", screen_data.scr_dump);
            screen_data.scr_dump.Save();
        }

        if (mac.HasParam("screenshot_rect")) {
            var r = CreateRect(0, 0, screen_data.scr_dump.width, screen_data.scr_dump.height);
            mac.SetParam("screenshot_rect", r);
        }

        if (mac.HasParam("dump_page_size")) {
            var sz = CreatePoint(screen_data.scr_dump.width, screen_data.scr_dump.height);
            mac.SetParam("dump_page_size", sz);
        }

        if (screen_data.executable != "" && mac.HasParam("executable")) {
            mac.SetParam("executable", screen_data.executable);
        }
    }
    sa_logger.DeWrite(3);
}



ActionAnalyzer.prototype.set_pos_ = function(mac, rect, scr_dump) {
    sa_logger.Write(3, "ActionAnalyzer::set_pos_", "", "");

    var rp = CreatePosition();
    rp.FramePathPush(0);

    if (mac.HasParam("position_h")) {
        mac.SetParam("position_h", rp);
    }

    var rp_b = rp.Clone();
    var win_rect = CreateRect(0, 0, scr_dump.width, scr_dump.height);
    var ori = this.demo_bubble_pos_(rp_b, rect, win_rect);

    if (mac.HasParam("orientation")) {
        mac.SetParam("orientation", ori);
    }

    if (mac.HasParam("position_b")) {
        mac.SetParam("position_b", rp_b);
    }

    if (mac.HasParam("position_bu")) {
        if (cfg !== undefined && cfg.standard.winrec && cfg.standard.winrec.practice_bubble_at_element) {
            if (mac.HasParam("orientation_p")) {
                mac.SetParam("orientation_p", ori);
            }
            mac.SetParam("position_bu", rp_b);
        } else {
            rp.ElementPath = "";
            rp.ID = "page";
            rp.DocX = 50;
            rp.DocY = 50;
            rp.X = 50;
            rp.Y = 50;
            if (mac.HasParam("orientation_p")) {
                mac.SetParam("orientation_p", "C");
            }
            mac.SetParam("position_bu", rp);
        }
    }
    sa_logger.DeWrite(3);
}


ActionAnalyzer.prototype.demo_bubble_pos_ = function(relpos, elem_rect, win_rect) {
    if (elem_rect != null && win_rect != null) {
        var can_left = true;
        var can_right = true;
        var can_top = true;
        var can_bottom = true;

        if (elem_rect.left < 0.3 * win_rect.width || 0.3 * win_rect.width < 150) {
            can_left = false;
        }
        if (elem_rect.right > 0.7 * win_rect.width && 0.3 * win_rect.width >= 150) {
            can_right = false;
        }
        if (elem_rect.top < 0.3 * win_rect.height || 0.3 * win_rect.height < 150) {
            can_top = false;
        }
        if (elem_rect.bottom > 0.7 * win_rect.height && 0.3 * win_rect.height >= 150) {
            can_bottom = false;
        }

        var h_ori = can_left ? "W" : (can_right ? "E" : "");
        var v_ori = can_top ? "N" : (can_bottom ? "S" : "");

        var ori = v_ori + h_ori;
        if (ori == "") ori = "C";

        if (h_ori == "E") {
            relpos.X = 100;
            relpos.OffsetX = 4;
        } else if (h_ori == "W") {
            relpos.X = 0
            relpos.OffsetX = -4;
        } else {
            // horizontal center
            relpos.X = 50
            relpos.OffsetX = 0;
        }

        if (v_ori == "S") {
            relpos.Y = 100;
            relpos.OffsetY = 4;
        } else if (v_ori == "N") {
            relpos.Y = 0;
            relpos.OffsetY = -4;
        } else {
            relpos.Y = 50;
            relpos.OffsetY = 0;
        }

		if (ori == "NW" || ori == "SW") {
			relpos.OffsetX = 6;
		} else if (ori == "NE" || ori == "SE") {
			relpos.OffsetX = -6;
		}
		if ((elem_rect.left == elem_rect.right) && (elem_rect.top == elem_rect.bottom)) {
			this.set_hotspot_offset_(relpos, ori);
		}

        return ori;
    } else {
        var winid = relpos.WindowID;

        // clip of longer frame-paths for demo bubble
        if (relpos.FramePath.match("" + relpos.WindowID + ":0.*")) {
            relpos.FramePath = "" + relpos.WindowID + ":0";
        } else if (relpos.FramePath.match("" + relpos.WindowID + ":1.*")) {
            relpos.FramePath = "" + relpos.WindowID + ":1";
        }

        relpos.ElementPath = "";
        relpos.DocX = 90;
        relpos.DocY = 90;
        relpos.X = 90;
        relpos.Y = 90;
        relpos.OffsetX = -100;
        relpos.OffsetY = -100;

        return "C";
    }
}


ActionAnalyzer.prototype.set_hotspot_offset_ = function(relpos, ori) {
    switch(ori) {
		case "N" :
		case "NE":
		case "NW":  relpos.OffsetX = 0;
					relpos.OffsetY = -15;
				    break;
		case "S" :
		case "SE":
		case "SW":  relpos.OffsetX = 0;
					relpos.OffsetY = 15;
					break;
		case "E" :  relpos.OffsetX = -15;
					relpos.OffsetY = 0;
					break;
		case "W" :  relpos.OffsetX = -15;
					relpos.OffsetY = 0;
					break;
		case "C" : break;
	}
}
///////////////////////////helpers////////////////////////////////////////



function update_fieldicon(mac, sc_dump) {

    var rect = mac.GetParam("screenshot_rect");

    if (sc_dump != null) {

        sc_dump.SaveImgFragment("screenshot_file.png", mac.GetResource(), rect);

        if (mac.HasParam("screenshot_file")) {
                mac.SetParam("screenshot_file", "screenshot_file.png");
        }

        var img_name = sc_dump.SaveUniqueImgFragment("fieldicon.png", mac.GetResource(), rect);

        if (mac.HasParam("fieldicon")) {
            mac.SetParam("fieldicon", img_name);
        }
    }
}

function get_key_infotxt(tk) {
    var dt = '';
    var pt = '';
    
    if (typeof(lang_tbl[tk + '.demo']) == 'string') {
        dt = lang_tbl[tk + '.demo'];
    }

    if (typeof(lang_tbl[tk + '.prac']) == 'string') {
        pt = lang_tbl[tk + '.prac'];
    }

    res = {
        demo: dt,
        prac: pt
    };

    return res;
}

function get_infotxt(type, action) {

    var text_keys = {
        'WINClick' : 'click_img', 
        'WINClick::drag' : 'drag_img', 
        'WINClick::drop' : 'drop_img', 
        'WINHotspotEdit' : 'hotspot_edit',
        'WINRightMouse' : 'rclick_context', 
        'WINScrollWheel::wheel_up' : 'mouse_wheel_info_up', 
        'WINScrollWheel::wheel_down' : 'mouse_wheel_info_down', 
        'WINKeyPress' : 'keypress'
    };
    
    var res = {
        demo: '', 
        prac: ''
    };
    
    if (text_keys[type]) {
        res = get_key_infotxt(text_keys[type]);
    }
 
    return res;
}


function win_set_msg_param(mac, infotext) {
    sa_logger.Write(3, "win_set_msg_param", "", "");

    if (infotext == null) {
        sa_logger.DeWrite(3);
        return;
    }
    if (infotext.demo != "" && mac.HasParam("explanation_d")) {
        var replace = true;
        var exp_d = mac.GetParam("explanation_d");
        if (mac.HasParam("explanation_d_modified") && mac.GetParam("explanation_d_modified")) {
            replace = false;
        }

        if (replace) {
            mac.SetParam("explanation_d", infotext.demo);
        }
    }

    if (infotext.prac != "" && mac.HasParam("explanation_p")) {
        var replace = true;
        var exp_p = mac.GetParam("explanation_p");
        if (mac.HasParam("explanation_p_modified") && mac.GetParam("explanation_p_modified")) {
            replace = false;
        }

        if (replace) {
            mac.SetParam("explanation_p", infotext.prac);
        }
    }
    sa_logger.DeWrite(3);
}

function win_update_keypress(mac, params) {
    sa_logger.Write(3, "win_update_keypress", "", "");
    if (mac.HasParam("hotkeyV2")) {
        var key_codes = KeyUtils.KeysV2(params.Action.key_code, params.Action.shift, params.Action.ctrl, params.Action.alt);
        mac.SetParam("hotkeyV2", key_codes);
    }

    var key_name = KeyUtils.KeyName(params.Action.key_code, params.Action.shift, params.Action.ctrl, params.Action.alt);

    var key_desc = KeyUtils.LocalizedName(params.Action.key_code, params.Action.shift, params.Action.ctrl, params.Action.alt);
    
    var key_scan = params.Action.scancode;
    var key_ascii_code = params.Action.key_code;

    mac.SetParam("scan_code", key_scan);
    mac.SetParam("key_code", key_ascii_code);

    if (mac.HasParam("key_name")) {
        mac.SetParam("key_name", key_name);
    }

    if (mac.HasParam("key_desc")) {
        // xxx keyname in js
        if (key_desc == "ctrl pause_break") {
            key_desc = "ctrl pause/break";
        }
        mac.SetParam("key_desc", key_desc);
    }

    if (params.ReplaceTxt) {
        var infotext = get_infotxt(params.Type);
        win_set_msg_param(mac, infotext);
    }

    var rp = CreatePosition(Position_ELEMENT_POS);
    rp.ElementPath = "";
    rp.ID = "page";
    rp.DocX = 50;
    rp.DocY = 50;
    rp.X = 50;
    rp.Y = 50;

    if (mac.HasParam("position_b")) {
        mac.SetParam("position_b", rp);
    }

    if (mac.HasParam("position_bu")) {
        mac.SetParam("position_bu", rp);
    }

    if (mac.HasParam("position_h")) {
        var rp_h = CreatePosition(Position_ELEMENT_POS);
        rp_h.ElementPath = "";
        rp_h.ID = "page";
        rp_h.FP = "0";
        rp_h.DocX = rp_h.DocY = rp_h.DocX2 = rp_h.DocY2 = 0;
        rp_h.X = rp_h.Y = rp_h.X2 = rp_h.Y2 = 0;

        mac.SetParam("position_h", rp_h);
    }
    
    sa_logger.DeWrite(3);
}

//////////////////////////////////////////////////////////////

var lang_tbl = {};


