
var debug = false;
var optracker_active = false;
var optrackerdir = "C:\\";

function ByD_Compat(param) {
    if (typeof(cfg) != "undefined" && cfg.standard && cfg.standard.winrec) {
        return cfg.standard.winrec[param];
    } else {
        return false;
    }
}

var hinweis_image = {
}

var def_lang = ReadStringSetting("record_language", UILang());

function get_default_tourstop_style() {
    return ByD_Compat("byd_show_ts_not_in_timeline") ?
        Tourstop_HIDE_JUMP : Tourstop_SHOW_JUMP;
}

function create_init_tourstop() {
    var ts = Project.AddTourstop(Translate("start_topic"), Tourstop_HIDE_NOJUMP);
    var start_unit = Project.CreateMacro("start_unit");
    update_node_(start_unit, "scaling", get_screen_resolution());
    Project.InsertEventAfter(start_unit);
    if (ByD_Compat("byd_fill_intro_page")) {
        var px = 995;
        var py = 605;
        var size = CreatePoint(px,py);
        ts = Project.AddTourstop("Intro Page", Tourstop_SHOW_JUMP);
        var intro_item = Project.CreateMacro("intro_page_item");
        intro_item.SetParam('link_text', "Start");
        Project.InsertEventAfter(intro_item);
        var intro_page = Project.CreateMacro("intro_page");
        intro_page.SetParam('caption', prj_trans('intro_caption'));
        intro_page.SetParam('caption_p', prj_trans('intro_caption_p'));
        intro_page.SetParam('caption_t', prj_trans('intro_caption_t'));
        intro_page.SetParam('intro_text', prj_trans('intro_text'));
        intro_page.SetParam('intro_text_p', prj_trans('intro_text_p'));
        intro_page.SetParam('intro_text_t', prj_trans('intro_text_t'));
        intro_page.SetParam('dump_page_size', size);
        Project.InsertEventAfter(intro_page);
    }
    return ts;
}

function insert_end_unit() {
    var eu_mac = Project.CreateMacro("end_unit");

    if (ByD_Compat("byd_fill_intro_page")) {
        eu_mac.SetParam('end_caption', prj_trans('end_caption'));
        eu_mac.SetParam('end_caption_p', prj_trans('end_caption_p'));
        eu_mac.SetParam('end_caption_t', prj_trans('end_caption_t'));
        eu_mac.SetParam('end_text', prj_trans('end_text'));
        eu_mac.SetParam('end_text_p', prj_trans('end_text_p'));
        eu_mac.SetParam('end_text_t_passed', prj_trans('end_text_t_passed'));
        eu_mac.SetParam('end_text_t_failed', prj_trans('end_text_t_failed'));
        eu_mac.SetParam('show_end_page', true);
}
    Project.InsertEventAfter(eu_mac);
}

// returns new orientation
function demo_bubble_pos2(relpos, info, screen) {
    var elem_rect = info.GetRect();
    var win_rect = null;
    if (screen) {
        win_rect = CreateRect(0, 0, screen.Width(), screen.Height());
    }
    return demo_bubble_pos_fn(relpos, elem_rect, win_rect);
}

function set_hotspot_offset(relpos, ori) {
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

function demo_bubble_pos_fn(relpos, elem_rect, win_rect) {
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
			set_hotspot_offset(relpos, ori);
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

var t2s_mode = 'd';


function mouse_over_effect(click_type, rec_mode, mouse_over) {
    if (ByD_Compat("byd_alternate_rollover")) { // merged from 851 sap
      var consume_mouse_over = false;

      if (click_type == "dragging" || click_type == "rdragging") {
          consume_mouse_over = false;
      } else {
          if (rec_mode == IN_PROCESS) {
             consume_mouse_over = !mouse_over;
          } else {
             consume_mouse_over = false;
          }
      }
      return consume_mouse_over;

    } else {
    var ret = false;

    if (rec_mode == IN_PROCESS)
        ret = !mouse_over;
    else
        ret = false;

    return ret;
}
}

function update_on_drop(consume_mouse_over, rec_mode, mouse_over) {
    if (ByD_Compat("byd_alternate_rollover"))  { // merged from 851 sap
      var ret = false;
      if (rec_mode == IN_PROCESS)
          ret = !mouse_over;
      else
          ret = false;

      return ret;
    } else {
    return consume_mouse_over;
}
}

function update_on_dragging(consume_mouse_over) {
    if (ByD_Compat("byd_alternate_rollover"))  { // merged from 851 sap
      return false;
    } else {
    return consume_mouse_over;
}
}

function update_on_drag(consume_mouse_over) {
    if (ByD_Compat("byd_alternate_rollover"))  { // merged from 851 sap
      return false;
    } else {
    return consume_mouse_over;
}
}

function update_mouse_over(consume_mouse_over, mouse_over) {
    if (ByD_Compat("byd_alternate_rollover"))  { // merged from 851 sap
      return !mouse_over;
    } else {
    return consume_mouse_over;
}
}

function auto_crop_macro(scmac, project) {
    var max = CreateRect(99999, 99999, -1, -1);

    var prj = project ? project : Project;
    var cur = prj.NextMacro(scmac.TourPosition());

    var targets = 0;
    while (cur &&
           (cur.Template() != "new_page" || !cur.GetParam("doc_enable")) &&
           (cur.Template() != "new_window" || !cur.GetParam("doc_enable")) &&
           (cur.Template() != "screenshot_part" || !cur.GetParam("show_actions")))
    {
        if (cur.Template() != "screenshot_part" &&
            cur.Template() != "new_page" &&
            cur.Template() != "new_window" &&
            cur.HasParam("screenshot_rect"))
        {
            targets += 1;

            var r = null;
            if (cur.HasParam("screenshot_rect")) {
                r = cur.GetParam("screenshot_rect");
            }

            if (!r && cur.HasParam("ctl_rect")) {
                r = cur.GetParam("ctl_rect");
            }

            if (cur.HasParam("show_hl_doc") && !cur.GetParam("show_hl_doc")) { // used in explanation_long
                r = null;
                targets -= 1;
            }

            if (r) {
                if (r.left < max.left) max.left = r.left;
                if (r.top < max.top) max.top = r.top;
                if (r.right > max.right) max.right = r.right;
                if (r.bottom > max.bottom) max.bottom = r.bottom;
            }
        }

        var cur = prj.NextMacro(cur.TourPosition());
    }

    if (targets != 0) {
        var base_img = CreateImage(page_image_path(scmac));

        max.left -= cfg.standard.autocrop.crop_min_off_l;
        max.top -= cfg.standard.autocrop.crop_min_off_t;
        max.right += cfg.standard.autocrop.crop_min_off_r;
        max.bottom += cfg.standard.autocrop.crop_min_off_b;

        var min_w = cfg.standard.autocrop.crop_min_w;
        var min_h = cfg.standard.autocrop.crop_min_h;

        // min-size is most screenshot-size
        if (min_w > base_img.width) min_w = base_img.width;
        if (min_h > base_img.height) min_h = base_img.height;

        // adjust for min-width
        if (max.right - max.left < min_w) {
            var d = min_w - (max.right - max.left);
            max.left -= d/2;
            max.right += (d - d/2);
        }

        // adjust for min-height
        if (max.bottom - max.top < min_h) {
            var d = min_h - (max.bottom - max.top);
            max.top -= d/2;
            max.bottom += (d - d/2);
        }

        // don't go out left
        if (max.left < base_img.left) {
            max.right += base_img.left - max.left;
            max.left = base_img.left;
        }

        // don't go out top
        if (max.top < base_img.top) {
            max.bottom += base_img.top - max.top;
            max.top = base_img.top;
        }

        // don't go out right
        if (max.right > base_img.right) {
            max.left -= (max.right - base_img.right);
            max.right = base_img.right;
            if (max.left < base_img.left) max.left = 0;
        }

        // don't go out bottom
        if (max.bottom > base_img.bottom) {
            max.top -= max.bottom - base_img.bottom;
            max.bottom = base_img.bottom;
            if (max.top < base_img.top) max.top = 0;
        }

        if (cfg.standard.autocrop.crop_keep_topleft) {
            max.left = 0;
            max.top = 0;
        }
        scmac.SetParam("screenshot_rect", max);
    } else { // nothing to crop, do uncrop
        if (scmac.HasParam("dump_page_size") && scmac.ParamSpecified("dump_page_size")) {
            max.top = 0;
            max.left = 0;
            var orig = scmac.GetParam("dump_page_size");
            max.right = orig.x;
            max.bottom = orig.y;
            scmac.SetParam("screenshot_rect", max);
        }
    }

    if (cfg.standard.autocrop.crop_adjust_size) {
        var w = max.right - max.left;
        var new_size = Math.round((100 * cfg.standard.autocrop.crop_max_size) / w);
        if (new_size > 100) new_size = 100;
        scmac.SetParam("imagesize", new_size);
    }

    return max;
}

function page_image_path(mac) {
    var res = mac.GetResource();
    if (res) {
        if (mac.HasParam("dump_page")) {
            return res.FullPath() + "\\" + mac.GetParam("dump_page") + "\\img.png";
        } else if (mac.HasParam("screenshot_file")) {
            return res.FullPath() + "\\" + mac.GetParam("screenshot_file");
        }
    } else {
        return null;
    }
}
