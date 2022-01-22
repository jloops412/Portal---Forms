#use(macroset!standard:script/TextBuffer.js)


//UserAction class
var ActionType = { 
    UNKNOWN_ACTION  : 0,
    MOUSE_ACTION    : 1, 
    KEYBOARD_ACTION : 2 , 
    SCREEN          : 3,
    MOUSE_MOVE      : 4,
    PAUSE           : 5,
    UNPAUSE         : 6
};
                  
function UserAction(action_type, action) {
    this.action_type = action_type;
    this.timestamp = action.timestamp;

    this.modified_timestamp = action.timestamp;// Used for timecode of video

    if (this.action_type == ActionType.MOUSE_ACTION) {
        this.rc = CreateRect(action.x - 150, action.y - 100, action.x + 150, action.y + 100);
    
        this.mods = {ctrl:  action.mouse_ctrl, 
            alt:   action.mouse_alt, 
            shift: action.mouse_shift };
                     
        this.pt = CreatePoint(action.x, action.y);
        this.click_type = action.click_type;
        this.direction = action.direction;
        this.rotation = action.rotation;
        //this.executable = action.executable;
        //this.wnd_class = action.wnd_class;

    } else if (this.action_type == ActionType.KEYBOARD_ACTION) {
        this.mods = {ctrl:  action.ctrl, 
            alt:   action.alt, 
            shift: action.shift };

        this.key_code = action.key_code;
        this.key_name = KeyUtils.KeyName(this.key_code);
    }
}

//general
UserAction.prototype.action_type = ActionType.UNKNOWN_ACTION;
UserAction.prototype.timestamp = -1;
UserAction.prototype.initial_timestamp = 0;
UserAction.prototype.intermediate_timestamp = 0;
UserAction.prototype.rc = CreateRect(0, 0, 0, 0);
UserAction.prototype.mods = { ctrl: false, alt: false, shift: false };
UserAction.prototype.record_audio_ = false;
UserAction.prototype.record_video_ = false;
//mouse
UserAction.prototype.click_type = "";
UserAction.prototype.direction = 0;
UserAction.prototype.rotation = 0;
UserAction.prototype.pt = CreatePoint(0, 0);
UserAction.prototype.modified_timestamp = 0;
//UserAction.prototype.executable = "";
//UserAction.prototype.wnd_class = "";
//kbd
UserAction.prototype.key_code = "";
UserAction.prototype.key_name = "";
    
//ActionAnalyzer class
function ActionAnalyzer(automat, project, base_dir) {
    this.automat_ = automat;
    this.actions_ = [];
    this.last_ctrl_ = null;
    this.input_buffer_ = new TextBuffer();
    this.input_screen_ = null;
    this.last_screen_index_ = 0; // last screen index before a click
    this.last_screen_ = null;// last mouse click screen
    this.skip_drop_ = false;
    this.scr_rect_ = null;
    this.diffs_rects_ = [];
    this.project_ = project;
    this.base_dir_ = base_dir;
    this.rebuilt_images_ = [];
    this.init_translations_();
}

ActionAnalyzer.prototype.automat_ = null;
ActionAnalyzer.prototype.actions_ = [];
ActionAnalyzer.prototype.last_ctrl_ = null;
ActionAnalyzer.prototype.input_buffer_ = new TextBuffer();
ActionAnalyzer.prototype.progress_ = null;
ActionAnalyzer.prototype.offset_ = 10;
ActionAnalyzer.prototype.current_action_ = null;
ActionAnalyzer.prototype.project_ = null;
ActionAnalyzer.prototype.base_dir_ = "";
ActionAnalyzer.prototype.save_only_screen_change_ = true;
ActionAnalyzer.prototype.input_screen_ = null;
ActionAnalyzer.prototype.last_screen_ = null;
ActionAnalyzer.prototype.last_screen_index_ = 0;
ActionAnalyzer.prototype.diffs_rects_ = [];
ActionAnalyzer.prototype.rebuilt_images_ = [];
ActionAnalyzer.prototype.temp_screendump_ = null;
ActionAnalyzer.prototype.previous_mouse_pos_ = CreatePoint(0, 0);
ActionAnalyzer.prototype.prev_click_control_ = CreateRect(0, 0, 0, 0);
ActionAnalyzer.prototype.analyze_all_ = true;
ActionAnalyzer.prototype.analyze_width_ = 50;
ActionAnalyzer.prototype.analyze_height_ = 250;
ActionAnalyzer.prototype.curr_mac_ = null;
ActionAnalyzer.prototype.images_ = [];
ActionAnalyzer.prototype.prev_image_ = null; // needed to create an additional image with click timestamp
ActionAnalyzer.prototype.first_timestamp_cur_macro_ = 0;
ActionAnalyzer.prototype.first_kbd_entry_ = true;
ActionAnalyzer.prototype.qr_frame_data_ = "";
ActionAnalyzer.prototype.cursor_ids_qrframes_ = [];
ActionAnalyzer.prototype.images_compressor_ = 0; // TODO
ActionAnalyzer.prototype.frame_ = 0;
ActionAnalyzer.prototype.nb_images_ = 0;
ActionAnalyzer.prototype.save_whole_image_ = false;
ActionAnalyzer.prototype.is_rtl_ = false;
//ActionAnalyzer.prototype.screen_width_ = 0;
//ActionAnalyzer.prototype.screen_height_ = 0;

var IMAGE_NAME = "000000000000000";
var IMG_NAME_LEN = IMAGE_NAME.length;
var FRAME_DATA_FILENAME = "frame_data.txt";
var RECTANGLE = "rectangle";
var PT_RECTANGLE = "pt_rectangle";

ActionAnalyzer.prototype.init_translations_ = function() {
    this.progress_caption_ = Translate('analyze_actions');
    this.start_topic_caption_ = Translate('start_topic');
}

ActionAnalyzer.prototype.collect_actions_ = function() {
    var screens = FrameCapturer.GetScreens();

    if (screens.length) {
        this.initial_timestamp = screens[0].timestamp;
        this.intermediate_timestamp = screens[0].timestamp;
        this.first_timestamp_cur_macro_ = screens[0].timestamp;
    } else {
        log("ERROR - ActionAnalyzer.prototype.collect_actions_ - FrameCapturer.GetScreens - No screens captured.");
        return 0;
    }

    if (this.record_video_) {
        var mouse_move = FrameCapturer.GetMouseData();
        ////find max screenwidth and max screenheight
        //if (this.automat_.IsForegroundMode()) {
        //    for (var i = 0; i < screens.length; i++) {
        //        var width = screens[i].rect.right - screens[i].rect.left;
        //        var height = screens[i].rect.bottom - screens[i].rect.top;
        //        this.screen_width_ = Math.max(this.screen_width_, width);
        //        this.screen_height_ = Math.max(this.screen_height_, height);
        //    }
        //} else {
        //    this.screen_width_ = this.scr_rect_.right - this.scr_rect_.left;
        //    this.screen_height_ = this.scr_rect_.bottom - this.scr_rect_.top;
        //}

        screens = screens.concat(mouse_move);
        screens.sort(function(p1, p2) {
            if (p1.timestamp <= p2.timestamp) {
                return -1;
            } else if (p2.timestamp < p1.timestamp) {
                return 1;
            } else {
                return 0;
            }
        });
        FrameCapturer.SaveMouseIcons();//this should be called before WriteMouseMove2File()
        //FrameCapturer.WriteMouseMove2File(this.project_.BaseDir + "\\mouse_move.txt", this.initial_timestamp);

    }
    this.actions_ = this.actions_.concat(screens);
    this.actions_.sort(function(p1, p2) {
        if (p1.timestamp < p2.timestamp) {
            return -1;
        } else if (p2.timestamp < p1.timestamp) {
            return 1;
        } else if (p1.timestamp == p2.timestamp) {
            if (p2.action_type == ActionType.SCREEN) return -1;
            else return 1;
        } else {
            return 0;
        }
    });
    if (this.record_video_) {
        // Remove pause during recording from timestamp, to avoid idle phase in the video
        this.preprocess_input_data_();
    }
    //this.print_actions_();
    log("ACTIONS: " + this.actions_.length);
    log("SCREENS: " + screens.length);
    if (this.record_video_) {
        var scr_nb = screens.length - mouse_move.length;
        log("SCREENS: " + scr_nb);
        log("MOUSEMOVE: " + mouse_move.length);
    }
    return (screens.length);
}

ActionAnalyzer.prototype.preprocess_input_data_ = function() {

    var pause = 0;
    var start_pause = 0;
    var end_pause = 0;

    for (var i = 0; i < this.actions_.length; i++) {
        if (this.actions_[i].action_type === ActionType.PAUSE) {
            start_pause = this.actions_[i].timestamp;
        } else if (this.actions_[i].action_type === ActionType.UNPAUSE) {
            end_pause = this.actions_[i].timestamp;
            pause += (end_pause - start_pause);
        } else {
            this.actions_[i].modified_timestamp -= pause;
        }
    }
}

ActionAnalyzer.prototype.input_text_cross_prev_control_ = function(rects_vec, rectangle) {
    //log("the length of the diff rects = " + rects_vec.length);
    //var rectangle_h = rectangle.height;
    //var rectangle_w = rectangle.width;
    if (rects_vec === null) {
        return false;
    }
    for (var i = 0; i < rects_vec.length; i++) {
        //log("rect[" + i+ "]: l=" + rects_vec[i].left + "r=" + rects_vec[i].right + "t=" + rects_vec[i].top + "b=" + rects_vec[i].bottom)
        if ( /*rects_vec[i].height <= rectangle_h && rects_vec[i].width <= rectangle_w &&*/
            rects_vec[i].IntersectRect(rectangle)) {
            //log("rect[" + i+ "] intersects rectangle: l=" + rectangle.left + "r=" + rectangle.right + "t=" + rectangle.top + "b=" + rectangle.bottom + "RETURN  TRUE (input_text_inside_prev_control) ");
            return true;
        } //else log("rect[" + i+ "] does NOT Intersect with rectangle: l=" + rectangle.left + "r=" + rectangle.right + "t=" + rectangle.top + "b=" + rectangle.bottom);
    }
    return false;
}

ActionAnalyzer.prototype.add_prev_screen_and_prev_mouse_move_ = function(action_timestamp, cursor, prev_mouse_move) {
    var prev_scr = this.get_prev_screen_();
    var prev_image = GetBitmapFromScreendump(prev_scr.scr_dump);
    this.save_whole_image_ = true;
    this.save_change_area_in_temp_folder_(prev_image, action_timestamp); // current_action represents the previous action
    var rc_change = " l " + prev_scr.change_rect.left +  " t " + prev_scr.change_rect.top + " r " + prev_scr.change_rect.right + " b " + prev_scr.change_rect.bottom;
    this.qr_frame_data_ += prev_mouse_move;
    var prev_win = CreateRect(0, 0, 0, 0);

    if (this.automat_.IsForegroundMode()) prev_win = prev_scr.rect;
    prev_winrc = " win_rc_l " + prev_win.left + " win_rc_t " + prev_win.top + " win_rc_r " + prev_win.right + " win_rc_b " + prev_win.bottom;

    //if (action_timestamp !== this.first_timestamp_cur_macro_) {
    //    this.first_timestamp_cur_macro_ = action_timestamp;
    //}
    var name = (IMAGE_NAME + (action_timestamp - this.first_timestamp_cur_macro_)).slice(-IMG_NAME_LEN);
    this.qr_frame_data_ +=  "actiontype " + "SCREEN " + "name " + name + ".png" + rc_change +
    prev_winrc + " ts " + name + " cursor_id " + cursor.cursor_id + " orig_ts_screen = prev screen \n";
    this.nb_images_ = 1;
}
ActionAnalyzer.prototype.process_screens_qr_video_ = function(current_action, screen, cursor, prev_mouse_move) {
    sa_logger.Write(3, "ActionAnalyzer::process_screens_qr_video_", "", "");
    var img = this.fetch_screen_change_area_(screen);
    var win_rc = CreateRect(0, 0, 0, 0);
    if (this.automat_.IsForegroundMode()) {
        win_rc = screen.rect;
    }
    if ((this.prev_image_ !== null && this.nb_images_ === 0 /*this.qr_frame_data_ === ""*/)) {
        //if (this.qr_frame_data_ !== "") log("this.qr_frame_data_ not empty and num images === 0, current_action.timestamp = " + current_action.timestamp);
        this.add_prev_screen_and_prev_mouse_move_(current_action.modified_timestamp, cursor, prev_mouse_move);
    }


    this.save_whole_image_ = false;

    this.save_only_screen_change_area_(img, screen.modified_timestamp);
    var time =  screen.modified_timestamp - this.first_timestamp_cur_macro_;
    // if action and screen have the same timestamp we dont need to add the same screenshot to qr_frames.
    // 1st screen of the current macro is already added in the previous if
    if (time === 0 && this.nb_images_ !== 0) {
        return;
    }
    var name = (IMAGE_NAME + time).slice(-IMG_NAME_LEN);
    var rc_change = " l " + screen.orig_change_rect.left +  " t " + screen.orig_change_rect.top + " r " + screen.orig_change_rect.right + " b " + screen.orig_change_rect.bottom;
    var curr_screen = "actiontype " + "SCREEN " + "name " + name + ".png" + rc_change +
        " win_rc_l " + win_rc.left + " win_rc_t " + win_rc.top + " win_rc_r " + win_rc.right + " win_rc_b " + win_rc.bottom + " ts " + name + " cursor_id " + cursor.cursor_id + " orig_ts_screen " + screen.timestamp +"\n";
    this.qr_frame_data_ += curr_screen;
    this.nb_images_ ++;
    
    sa_logger.DeWrite(3);
}
ActionAnalyzer.prototype.process_mouse_move_ = function(action, screen) {
    sa_logger.Write(3, "ActionAnalyzer::process_mouse_move_", "", "");
    var cursor = {cursor_timestamp: 0, cursor_id: "", cursor_position: CreatePoint(0, 0), hotspot: CreatePoint(0, 0)};
    if (ExpertFeature("QRDebug")) {
        cursor.cursor_id = "";
        //if (action.mac) {
        //    cursor_icon  = action.mac.GetObjectParam("dump_page");
        //} else  cursor.cursor_id = "";
    }
    var win_rc = CreateRect(0, 0, 0, 0);
    if (screen !== null) win_rc = screen.rect; //else alert("no screen");

    var cursorpt = CreatePoint(action.position.x, action.position.y);
    if (this.automat_.IsForegroundMode()) {
        cursorpt.x = cursorpt.x - action.hotspot.x /*- win_rc.left*/- this.scr_rect_.left;
        cursorpt.y = cursorpt.y - action.hotspot.y /*- win_rc.top*/ - this.scr_rect_.top;
        //log("ISForeground is true new position: cursor_position.x = " + cursor.cursor_position.x + " cursor_position.y =" + cursor.cursor_position.y) ;
    } else {
        cursorpt.x = cursorpt.x - action.hotspot.x- this.scr_rect_.left;
        cursorpt.y = cursorpt.y - action.hotspot.y- this.scr_rect_.top;
    }
    var time = action.modified_timestamp - this.first_timestamp_cur_macro_;
    var tstamp = (IMAGE_NAME + time).slice(-IMG_NAME_LEN);
    var cur_mouse_move = "actiontype " + "MOUSE_MOVE" + " name " + (action.cursor_id + ".png") + " and_mask " + (action.cursor_id + "_and_mask.bmp") + " xor_mask " + (action.cursor_id + "_xor_mask.png") +
        " x " + cursorpt.x + " y " + cursorpt.y + " ts " + tstamp + " cursor_id " + action.cursor_id + "\n";
    this.qr_frame_data_ += cur_mouse_move;
    cursor = {cursor_timestamp: action.modified_timestamp, cursor_id: action.cursor_id, cursor_position: cursorpt, hotspot: action.hotspot};
    if (this.cursor_ids_qrframes_.indexOf(action.cursor_id) < 0) {
        //log("action.cursor_id = " + action.cursor_id);
        this.cursor_ids_qrframes_.push(action.cursor_id);
    }
    sa_logger.DeWrite(3);
    return {cursor : cursor, prev_mouse_move : cur_mouse_move};
}

ActionAnalyzer.prototype.analyze_actions_ = function(total) {
    var screen = null;
    this.last_screen_index_ = 0;
    this.processor_ = CreateADIGProcessor();
    this.processor_.Init(this.analyze_all_, this.analyze_width_, this.analyze_height_);
    var orig_ts_num = this.project_.NumTourstops();
    var start_ts_pos = 0;
    

    if (this.project_.NumTourstops() === 0) {
        var ts = this.project_.AddTourstop(this.start_topic_caption_, 0);
        this.project_.InsertEventAfter(this.project_.CreateMacro("start_unit"));
    } else {
        start_ts_pos = this.automat_.FindStartPos(this.project_) + 1;
    }
    
    for (var i = 0; i < this.actions_.length; i++) {
        this.actions_[i].action_index = i;
    }
    var cursor = {cursor_timestamp: 0, cursor_id: "", cursor_position: CreatePoint(0, 0), hotspot: CreatePoint(0, 0)};
    //if (this.record_video_) {
        //this.images_compressor_ = CreateQRImagesManip();
        //var dir = this.base_dir_ + "\qr_frames_temp";
        //CreateDirTree(dir);
        //var path = dir + "\\video.mp4";
        //var success = this.images_compressor_.Init(path, this.screen_width_, this.screen_height_);

        //var cursor_icon = null;
        // var filename ="C:\\Temp\\video.mp4";
        //var res = this.images_compressor_.GetFramesFromVideo(filename, this.screen_width_, this.screen_height_);
        //alert("res = " + res);

        //this.record_video_ = success && this.record_video_;
        //return;
    //}

    this.nb_images_ = 0;
    this.progress_ = CreateProgressDlg();
    this.progress_.ProgressRTL(this.is_rtl_);
    this.progress_.ProgressCancable(true);
    this.progress_.ProgressStepsBegin(this.progress_caption_, total);

    var prev_mouse_move = "";
    var prev_screen = "";
    for (this.index_ = 0; this.index_ < this.actions_.length; this.index_++) {
        var action = this.actions_[this.index_];
        if (action.action_type === ActionType.SCREEN) {
            screen = action;
            this.last_screen_index_ = this.index_;
            if (this.record_video_) {
                this.process_screens_qr_video_(this.current_action_, screen, cursor, prev_mouse_move);
            }
        } else if (action.action_type === ActionType.MOUSE_MOVE) {
            if (this.record_video_) {
                var res = this.process_mouse_move_(action, screen, cursor);
                cursor = res.cursor;
                prev_mouse_move = res.prev_mouse_move;
            }
        } else if (action.action_type === ActionType.MOUSE_ACTION) {
            if (!screen) continue;
            var scr_dump = this.fetch_screen_(screen);
            screen.scr_dump = scr_dump;
            OpTrackerStartOp("ActionAnalyzer::analyze_mouse_action_()", "OpTrackerQRPerformance");
            this.prev_click_control_ = this.analyze_mouse_action_(action, screen, cursor, prev_mouse_move);
            OpTrackerEndOp("OpTrackerQRPerformance");
            this.input_buffer_.clean();
            if (this.last_screen_) {
                this.last_screen_.scr_dump = null;
                this.last_screen_ = null;
            }
            this.last_screen_ = screen;
            this.input_screen_ = screen;
            this.current_action_ = action;
            if (this.record_video_) {

                if ((action.click_type === "wheel_up" || action.click_type === "wheel_down")) {
                } else {
                    // save an additional image that has the timestamp of the click
                    var name = (IMAGE_NAME + (action.modified_timestamp - this.first_timestamp_cur_macro_)).slice(-IMG_NAME_LEN);
                    var win_rc = CreateRect(0, 0, 0, 0);
                    if (this.automat_.IsForegroundMode()) {
                        win_rc = screen.rect;
                    }
                    var rc_change = " l " + screen.orig_change_rect.left +  " t " + screen.orig_change_rect.top + " r " + screen.orig_change_rect.right + " b " + screen.orig_change_rect.bottom;
                    this.qr_frame_data_ +=  "actiontype " + "SCREEN " + "name " + name + ".png" + rc_change +
                    " win_rc_l " + win_rc.left + " win_rc_t " + win_rc.top + " win_rc_r " + win_rc.right + " win_rc_b " + win_rc.bottom + " ts " + name + " cursor_id " + cursor.cursor_id + " orig_ts_screen = prev screen \n";
                    this.save_change_area_in_temp_folder_(this.prev_image_, action.modified_timestamp);
                    //log("move_images_to_current_macro_ from MOUSE_ACTION ")
                    this.move_images_to_current_macro_();
                    this.first_timestamp_cur_macro_ = action.modified_timestamp;
                    this.qr_frame_data_ = "";
                    this.nb_images_ = 0;
                }
            }
            this.progress_.ProgressStep();
        } else if (action.action_type === ActionType.KEYBOARD_ACTION) {
            if (!screen) continue;
            var scr_dump = this.fetch_screen_(screen);
            screen.scr_dump = scr_dump;
            var next_screen = this.get_next_screen_();
            var same_controle = false;
            if (!this.input_buffer_.has_text() && this.last_screen_ != null) {
                // Some logic to differentiate scenario(1) (1- a click inside an edit field then 2- type a text)
                // from scenario(2) (1-click on a button then 2- entre a text in a new editfield in a new screenshot)
                if (next_screen != null && next_screen.scr_dump != null) {
                    var consider_small_diffs = true;
                    var rects = GetScreenDiffs(next_screen.scr_dump, screen.scr_dump, consider_small_diffs);
                    if ((screen.rect.width != this.last_screen_.rect.width || screen.rect.height != this.last_screen_.rect.height/*scenario(2)*/) ||
                        (this.prev_click_control_ !== null && !this.input_text_cross_prev_control_(rects, this.prev_click_control_))) {
                        this.last_ctrl_ = null;
                        //log("----- prev_screen is diff from current_screen OR input text is not inside prev_control_rect --> NEW CONTROL ---- ");
                    } else {
                        same_controle = true;
                        //log(" +++++ input text is inside prev_control_rect --> SAME CONTROL +++++");
                    }
                    this.prev_click_control_ = null;
                    if (this.last_screen_) {
                        this.last_screen_.scr_dump = null;
                        this.last_screen_ = null;
                    }
                    this.last_screen_ = screen;

                }
            }
            this.current_action_ = action;
            OpTrackerStartOp("ActionAnalyzer::analyze_kbd_action_()", "OpTrackerQRPerformance");
            this.analyze_kbd_action_(action, screen, cursor, prev_mouse_move);
            OpTrackerEndOp("OpTrackerQRPerformance");
            if (this.record_video_ && this.first_kbd_entry_) {
                if (!same_controle) {
                    this.first_timestamp_cur_macro_ = action.modified_timestamp;// - TIMESTAMP_OFFSET;
                }
                this.first_kbd_entry_ = false;
            }
            this.progress_.ProgressStep();
        }

        GarbageCollect();

        if (this.progress_.GetCancelled()) {
            break;
        }
    }
    var scr_dump = this.fetch_screen_(screen);
    screen.scr_dump = scr_dump;
    this.insert_pending_kbd_input_(screen);

    if (this.project_.NumTourstops() > 0 && this.project_.CurrentTourstop() + 1 == this.project_.NumTourstops()) {
        if (screen) {
            this.insert_screenshot_(screen, action.timestamp);
            screen.scr_dump = null;
            screen = null;
            if (this.record_video_) {
                this.move_images_to_current_macro_();
                this.qr_frame_data_ = "";
                this.nb_images_ = 0;
            }
        }
        
        var eu_mac = this.project_.CreateMacro("end_unit");
        this.project_.InsertEventAfter(eu_mac);
    }

    this.progress_.ProgressEnd();
    this.processor_ = 0;
    if (cfg && cfg.standard.winrec && cfg.standard.winrec.auto_crop) {
        this.do_post_crop_(start_ts_pos, this.project_.NumTourstops() - orig_ts_num + start_ts_pos);
    }

    if (this.input_screen_) {
        this.input_screen_.scr_dump = null;
        this.input_screen_ = null;
    }
    if (this.last_screen_) {
        this.last_screen_.scr_dump = null;
        this.last_screen_ = null;
    }
    GarbageCollect();
}

ActionAnalyzer.prototype.AnalyzeActions = function(actions, scr_rect, record_audio, record_video) {
    this.actions_ = actions;
    this.scr_rect_ = scr_rect;
    var total = this.actions_.length;
    this.record_audio_ = record_audio;
    this.record_video_ = record_video;

    var nb_screens = this.collect_actions_();
    if (nb_screens > 0) this.analyze_actions_(total);
    this.cleanup_();
}

// Sometimes the screen image after typing a character does not contain that character yet,
// That is why I will try to get the correct screen with the entered character.
ActionAnalyzer.prototype.get_next_screen_before_next_kbd_ = function() {
    var kbd_action = false;
    var screen_index = -1;
    
    for (var i = this.index_ + 1; i < this.actions_.length; i++) {
        //log("******************ActionType.ACTION = " + this.actions_[i].action_type);
        if (this.actions_[i].action_type == ActionType.KEYBOARD_ACTION) {
            //log("-------------------------------------------------KEYBOARD_ACTION FOUND");
            kbd_action = true;
            break;
        } else if (this.actions_[i].action_type == ActionType.SCREEN) {
            screen_index = i;
            kbd_action = true;
        } else if (this.actions_[i].action_type == ActionType.MOUSE_ACTION) {
            break;
        }
    }
    if (kbd_action && screen_index != -1 ) {
        var screen = this.actions_[screen_index];
        var scr_dump = this.fetch_screen_(screen);
        screen.scr_dump = scr_dump;
        //log("-------------------------------------------------SCREEN FOUND");
        return screen;
    }
    return 0;
}
ActionAnalyzer.prototype.get_next_screen_ = function() {
    sa_logger.Write(2, "ActionAnalyzer::get_next_screen_", "", "");
    for (var i = this.index_ + 1; i < this.actions_.length; i++) {
        if (this.actions_[i].action_type == ActionType.SCREEN) {
            var screen = this.actions_[i];
            var scr_dump = this.fetch_screen_(screen);
            screen.scr_dump = scr_dump;
            sa_logger.DeWrite(2);
            return screen;
        }
    }
    sa_logger.DeWrite(2);
    return 0;
}

ActionAnalyzer.prototype.get_prev_screen_ = function() {
    sa_logger.Write(2, "ActionAnalyzer::get_prev_screen_", "", "");
    for (var i = this.index_ - 1; i >= 0; i--) {
        if (this.actions_[i].action_type == ActionType.SCREEN) {
            var screen = this.actions_[i];
            var scr_dump = this.fetch_screen_(screen);
            screen.scr_dump = scr_dump;
            sa_logger.DeWrite(2);
            return screen;
        }
    }
    sa_logger.DeWrite(2);
    return 0;
}
ActionAnalyzer.prototype.get_prevprev_screen_ = function() {
    sa_logger.Write(2, "ActionAnalyzer::get_prevprev_screen_", "", "");
    for (var i = this.index_ - 2; i >= 0; i--) {
        if (this.actions_[i].action_type == ActionType.SCREEN) {
            var screen = this.actions_[i];
            var scr_dump = this.fetch_screen_(screen);
            screen.scr_dump = scr_dump;
            sa_logger.DeWrite(2);
            return screen;
        }
    }
    sa_logger.DeWrite(2);
    return 0;
}

ActionAnalyzer.prototype.fetch_screen_change_area_ = function(screen) {
    var screen_id = screen.timestamp;
    var mode = this.automat_.IsForegroundMode() ? "fg" : "full";
    var rect_str = "_l" + screen.orig_change_rect.left +  "_t" + screen.orig_change_rect.top + "_r" + screen.orig_change_rect.right + "_b" + screen.orig_change_rect.bottom;
    var fname = this.base_dir_ + "\screens\\" + screen_id + mode + rect_str + ".png";
    //log("-------------------------- fname = " + fname);
    var image = CreateImage(fname);
    //var fname = "C:\\Temp\\frames\\__" + screen_id + mode + rect_str + ".png";
    //image.Save(fname);
    return image;
}


ActionAnalyzer.prototype.fetch_screen_ = function(screen) {
    sa_logger.Write(3, "ActionAnalyzer::fetch_screen_", "", "");
    var scr_dump = 0;
    if (screen.mac) {
        scr_dump  = screen.mac.GetObjectParam("dump_page");
        scr_dump.SetScreenRect(CreateRect(0, 0, scr_dump.width, scr_dump.height)); //needed for ADIG proc
    } else {
        var img = null;
        if (!this.save_only_screen_change_) {    // option a: just load the full image
            var screen_id = screen.timestamp;
            var fname = this.base_dir_ + "\screens\\" + screen_id + ".png";
            img = CreateImage(fname);
        } else {    // option b: DPS-36730
            var changes = {
                images: [],
                change_rects: []
            };
            var res = this.collect_screen_changes_(screen, changes);
            var mode = this.automat_.IsForegroundMode() ? "fg" : "full";
            var rect_str = "_l" + res.change_rc.left +  "_t" + res.change_rc.top + "_r" + res.change_rc.right + "_b" + res.change_rc.bottom;
            var fname = this.base_dir_ + "\screens\\" + screen.timestamp + mode + rect_str + ".png";
            //var fname2 = this.base_dir_+ "\screens\\" + screen.timestamp + mode + rect_str + "_0000000_" + ".png";
            img = changes.images.length === 1 ? changes.images[0] : FlattenImages(changes.images, changes.change_rects);//, fname2);
            this.rebuilt_images_.push(fname);
            //log("screenid "+ screen.timestamp +" is pusched");
            var index = screen.action_index;
            // Change the current image (which represents a diff of scrennshots) with the rebuilt image (whole screenshot)
            // not good: one image and one change_rect are lost from the array.
            screen.timestamp = screen.timestamp;
            screen.change_rect = res.change_rc;//new rect

            for (var i = 0; i < changes.images.length; i++) {
                changes.images[i] = null;
            }
            GarbageCollect();
        }
        scr_dump = CreateScreendumpFromBitmap(img);
        this.temp_screendump_ = scr_dump;
        //log("---------------------this.temp_screendump_ is saved, for timestemp: " + screen.timestamp);
    }
    sa_logger.DeWrite(3);
    return scr_dump;
}

ActionAnalyzer.prototype.collect_screen_changes_ = function(start_screen, changes) {
    sa_logger.Write(4, "ActionAnalyzer::collect_screen_changes_", "", "");
    var start_rect = start_screen.rect;
    var current_screen = start_screen;
    var current_index = start_screen.action_index;
    var mode = this.automat_.IsForegroundMode() ? "fg" : "full";
    var last_change_rc = start_screen.change_rect;

    for (var i = current_index; i >= 0; i--) {
        if (this.actions_[i].action_type === ActionType.SCREEN) {
            current_screen = this.actions_[i];

            var screen_rect = current_screen.rect;
            if (this.automat_.IsForegroundMode()) {
                if (screen_rect.height != start_rect.height || screen_rect.width != start_rect.width) {
                    // screens are different
                    log("screen_rect - l:" + screen_rect.left + " t:" + screen_rect.top + "r:" + screen_rect.right + " b:" + screen_rect.bottom);
                    log("start_rect - l:" + start_rect.left + " t:" + start_rect.top + "r:" + start_rect.right + " b:" + start_rect.bottom);
                    log("different screen rect - breaking at " + current_screen.timestamp);
                    break;
                }
            }

            //log("collecting screen[" + i + "] -" + current_screen.timestamp +  " - l:" + screen_rect.left + " t:" + screen_rect.top + "r:" + screen_rect.right + " b:" + screen_rect.bottom);
            var screen_id = current_screen.timestamp;
            //log("+-- screen_id = " + screen_id );//+ " Image name = " + fname);
            var rect_str = "_l" + current_screen.change_rect.left +  "_t" + current_screen.change_rect.top + "_r" + current_screen.change_rect.right + "_b" + current_screen.change_rect.bottom;
            var fname = this.base_dir_ + "\screens\\" + screen_id + mode + rect_str + ".png";
            var image_available = this.is_current_image_rebuilt_image_(fname);
            //log("screen_id = " + screen_id + " is contained in rebuild images? = -----------------------" + image_available);
            var img = null;
            //log("------------image_available = " + image_available);
            if (image_available) {
                //log("screen_id contained in rebuilt image = " + screen_id);
                //log("screen[" + i + "] -" + current_screen.timestamp +  " - l:" + screen_rect.left + " t:" + screen_rect.top + "r:" + screen_rect.right + " b:" + screen_rect.bottom);
                if (current_screen.scr_dump != null) {
                    img = GetBitmapFromScreendump(current_screen.scr_dump);//this.temp_screendump_);//
                } else {
                    //log("- current_screen.scr_dump is NULL - ");
                    img = GetBitmapFromScreendump(this.temp_screendump_);//
                }
            } else {
                img = CreateImage(fname);
            }
            changes.images.push(img);
            changes.change_rects.push(current_screen.change_rect);

            last_change_rc = current_screen.change_rect;
            if (image_available) {
                //log(" +++++++++++++++++++  current image is a rebuilt image = "+ fname);
                break;
            }
        }
    }
    sa_logger.DeWrite(4);
    return {changes : changes, change_rc : last_change_rc};
    //return changes;
}

ActionAnalyzer.prototype.is_current_image_rebuilt_image_ = function(img_name) {
    var length = this.rebuilt_images_.length;

    for (var i = length-1; i >= 0; i--) {
        if (img_name === this.rebuilt_images_[i]) return true
    }
    //if (length != 0 && img_name === this.rebuilt_images_[length-1]) {
    //    return true;
    //}
    return false;
}


ActionAnalyzer.prototype.cleanup_ = function() {
    this.temp_screendump_ = null;
    this.prev_image_ = null;
    this.cursor_ids_qrframes_ = [];
    var scr_dir = this.base_dir_ + "\\screens";
    var qr_frames_dir = this.base_dir_ + "\\qr_frames_temp\\";
    DeleteDirTree(scr_dir);
    DeleteDirTree(qr_frames_dir);
    this.nb_images_ = 0;
    //this.screen_width_ = 0;
    //this.screen_height_ = 0;
}

ActionAnalyzer.prototype.do_post_crop_ = function(start_ts_pos, new_ts_num) {
    this.progress_ = CreateProgressDlg();
    this.progress_.ProgressCancable(true);
    this.progress_.ProgressStepsBegin(Translate('crop_macros'), this.project_.NumTourstops());

    for (var pos = start_ts_pos; pos < new_ts_num; pos++) {
        var ts = this.project_.GetTourstop(pos);
        var mac = ts.NextMacro();

        if (mac.Template() == "new_page") {
            auto_crop_macro(mac);
            GarbageCollect();
        }

        this.progress_.ProgressStep();
        
        if (this.progress_.GetCancelled()) {
            break;
        }
    }
    this.progress_.ProgressEnd();
}

ActionAnalyzer.prototype.is_last_same_direction_wheel_control_ = function(action) {
    if (!this.last_ctrl_) return false;
    
    if (this.last_ctrl_.HasParam("action")) {
        var act = this.last_ctrl_.GetParam("action");
        if (act == "wheel_up" && action.direction == 1) {
            return true;
        }
        if (act == "wheel_down" && action.direction == 2) {
            return true;
        }
    }
    return false;
}

ActionAnalyzer.prototype.update_wheel_control_ = function(action) {
    if (this.last_ctrl_.HasParam("click_count")) {
        var cnt = this.last_ctrl_.GetParam("click_count") - 0 + action.rotation;
        this.last_ctrl_.SetParam("click_count", cnt);
    }
}

ActionAnalyzer.prototype.update_qr_frames_info_ = function(action, screen, cursor, prev_mouse_move) {

    var win_rc = CreateRect(0, 0, 0, 0);
    if (this.automat_.IsForegroundMode()) {
        win_rc = screen.rect;
    }
    var rc_change = " l " + screen.orig_change_rect.left +  " t " + screen.orig_change_rect.top + " r " + screen.orig_change_rect.right + " b " + screen.orig_change_rect.bottom;

    if (this.nb_images_ === 0 /*&& this.qr_frame_data_ === "" mouse_move are available in qr_frame_data_*/) {
        var prev_action_timestamp = action.modified_timestamp;
        // Add prev mouse move and prev screen to qr_frame_data_ for the current macro
        for (var i = this.index_ - 1; i >= 0; i--) {
            if (this.actions_[i].action_type === ActionType.MOUSE_ACTION || this.actions_[i].action_type === ActionType.KEYBOARD_ACTION) {
                prev_action_timestamp = this.actions_[i].modified_timestamp;
                break;
            }
        }
        this.add_prev_screen_and_prev_mouse_move_(prev_action_timestamp, cursor, prev_mouse_move);
    }
    var name = (IMAGE_NAME + (action.modified_timestamp - this.first_timestamp_cur_macro_)).slice(-IMG_NAME_LEN);
    this.qr_frame_data_ +=  "actiontype " + "SCREEN " + "name " + name + ".png" + rc_change +
    " win_rc_l " + win_rc.left + " win_rc_t " + win_rc.top + " win_rc_r " + win_rc.right + " win_rc_b " + win_rc.bottom + " ts " + name + " cursor_id " + cursor.cursor_id + " orig_ts_screen = prev screen \n";
    this.save_change_area_in_temp_folder_(this.prev_image_, action.modified_timestamp);
    this.move_images_to_current_macro_();

    // Add prev mouse move and prev screen to qr_frame_data_ for the next macro
    this.first_timestamp_cur_macro_ = action.modified_timestamp;
    this.qr_frame_data_ = "";
    this.qr_frame_data_ += prev_mouse_move;
    rc_change = " l " + screen.change_rect.left +  " t " + screen.change_rect.top + " r " + screen.change_rect.right + " b " + screen.change_rect.bottom;
    name = (IMAGE_NAME + (action.modified_timestamp - this.first_timestamp_cur_macro_)).slice(-IMG_NAME_LEN);
    this.qr_frame_data_ +=  "actiontype " + "SCREEN " + "name " + name + ".png" + rc_change +
    " win_rc_l " + win_rc.left + " win_rc_t " + win_rc.top + " win_rc_r " + win_rc.right + " win_rc_b " + win_rc.bottom + " ts " + name + " cursor_id " + cursor.cursor_id + " orig_ts_screen = prev screen \n";
    var scr_dump = this.fetch_screen_(screen);
    var prev_image = GetBitmapFromScreendump(scr_dump);
    this.save_whole_image_ = true;
    this.save_change_area_in_temp_folder_(prev_image, action.modified_timestamp);
    this.nb_images_ = 1;
}

ActionAnalyzer.prototype.get_following_screenchanges_ = function(pt, rc, win_rc, cur_control_carea) {
    sa_logger.Write(2, "ActionAnalyzer::get_following_screenchange_rects_", "", "");

    var screen_changes = {
        images: [],
        change_rects: []
    };
    var max_rects = 3;
    var ind = 0;
    for (var i = this.index_ + 1; i < this.actions_.length && ind < max_rects; i++) {
        if (this.actions_[i].action_type === ActionType.SCREEN) {
            var current_rect = this.actions_[i].orig_change_rect;
            var win_cur_r = this.actions_[i].rect;
            //log("win_cur_r: " + win_cur_r.left + " " + win_cur_r.top + " " + win_cur_r.right + " " + win_cur_r.bottom);
            if (current_rect && win_cur_r.Equal(win_rc) && current_rect.PtInRect(pt.x, pt.y) && rc.OverlappingRect(current_rect)) {
                var image = this.fetch_screen_change_area_(this.actions_[i]);
                if (current_rect.ContainedRect(rc) && cur_control_carea) {
                    ind ++;
                    screen_changes.images.push(image);
                    screen_changes.change_rects.push(current_rect);
                }
                if (!cur_control_carea) {
                    screen_changes.images.push(image);
                    screen_changes.change_rects.push(current_rect);
                    ind ++;
                }
            }
        } else if (this.actions_[i].action_type === ActionType.MOUSE_ACTION) {
            break;
        }
    }
    sa_logger.DeWrite(2);
    return screen_changes;
}

ActionAnalyzer.prototype.post_process_mouse_action_ = function(pt, rc, win_rc, c_type, screen) {
    var control_type_is_rectangle = (c_type === PT_RECTANGLE || c_type === RECTANGLE);
    //if (c_type === PT_RECTANGLE || c_type === RECTANGLE) { // suspicious, maybe click area too big DPS-36079
    var screen_changes = this.get_following_screenchanges_(pt, rc, win_rc, !control_type_is_rectangle);
    var res = [];
    var rc_width = rc.right - rc.left + 3;
    var offset_x = control_type_is_rectangle ? 0 : rc_width;
    for (var i = 0; i < screen_changes.change_rects.length; i++) {
        var scr_dump = CreateScreendumpFromBitmap(screen_changes.images[i]);
        var point = CreatePoint(pt.x - screen_changes.change_rects[i].left + offset_x, pt.y - screen_changes.change_rects[i].top);
        var r = this.processor_.GetRect(point, scr_dump, win_rc, true /*this.automat_.IsForegroundMode()*/, this.scr_rect_, true);
        var type = this.processor_.GetControlType();
        if (r != null &&  (type === PT_RECTANGLE || type === RECTANGLE)) {
            r.MoveBy(screen_changes.change_rects[i].left, screen_changes.change_rects[i].top);
            res.push(r);
        }
    }
    if (res.length) {
        if (control_type_is_rectangle) {
        var result = rc;
        var min_area = rc.width * rc.height;
        var min_width = rc.width - 5;
        var min_height = rc.height - 5;
        for(var j = 0; j < res.length; j++) {
            if (rc.Equal(res[j])) {
            } else if (rc.ContainedRect(res[j]) && (res[j].width > min_width || res[j].height > min_height) ) {
                var area = res[j].width * res[j].height;
                if (area < min_area) {
                    result = res[j];
                    min_area = area;
                }
            }
        }
        return result;
        } else { // find a better logic to find the correct resulting rectangle from the screenchange + ADIGProc rects
            var r = this.processor_.GetRect(pt, screen.scr_dump, win_rc, this.automat_.IsForegroundMode(), this.scr_rect_, true);
            if (r != null) res.push(r);
            result = res[0];
            var min_area = res[0].width * res[0].height;
            for(var j = 1; j < res.length; j++) {
                if (rc.Equal(res[j])) {
                } else if (res[j].ContainedRect(rc)) {
                    var area = res[j].width * res[j].height;
                    if (area < min_area) {
                        result = res[j];
                        min_area = area;
                    }
                }
            }
            return result;
        }
    }
    return rc;
}

ActionAnalyzer.prototype.analyze_mouse_action_ = function(action, screen, cursor, prev_mouse_move) {
    sa_logger.Write(1, "ActionAnalyzer::analyze_mouse_action_", "", "");
    this.insert_pending_kbd_input_(screen);
    var rectangle_res = CreateRect(0, 0, 0, 0);
    if (action.click_type === "wheel_up" || action.click_type === "wheel_down") {
        if (this.is_last_same_direction_wheel_control_(action)) {
            this.update_wheel_control_(action);
        } else {
            this.insert_screenshot_(screen, action.timestamp);
            this.last_ctrl_ = this.insert_wheel_control_(action, screen.scr_dump);
            if (this.record_video_) {
                this.update_qr_frames_info_(action, screen, cursor, prev_mouse_move);
            }
        }
    } else {
        var win_rc = screen.rect;
        //DPS-41814
        //if (!screen.rect.PtInRect(action.pt.x, action.pt.y)) { //TODO; be carefull on crop
        //    win_rc = action.rc;
        //}
        if (this.automat_.IsForegroundMode()) {
            action.pt.x -= win_rc.left;
            action.pt.y -= win_rc.top;
        }

        var rc = this.processor_.GetRect(action.pt, screen.scr_dump, win_rc, this.automat_.IsForegroundMode(), this.scr_rect_);
        if (rc == null) {
            log("rect is null");
            rc = CreateRect(action.pt.x - this.offset_, action.pt.y - this.offset_, action.pt.x + this.offset_, action.pt.y + this.offset_);
        }
        var c_type = this.processor_.GetControlType();
        if (c_type === PT_RECTANGLE || c_type === RECTANGLE /*|| c_type === ""*/) {
            rc = this.post_process_mouse_action_(action.pt, rc, win_rc, c_type, screen);
        }

        var dump = this.insert_screenshot_(screen, action.timestamp);
        this.last_ctrl_ = this.insert_click_control_(action, rc, dump);
        rectangle_res = rc.Clone();
        //log("RECT: " + rc.left + " " + rc.top + " " + rc.right + " " + rc.bottom);
    }
    GarbageCollect();
    sa_logger.DeWrite(1);
    return rectangle_res;
}

ActionAnalyzer.prototype.get_last_change_rect_at_pt_ = function(point) {
    sa_logger.Write(3, "ActionAnalyzer::get_last_change_rect_at_pt_", "", "");
    var cur_screen = this.actions_[this.last_screen_index_];
    cur_screen.scr_dump = this.fetch_screen_(cur_screen);
    var prev_screen = null;
    var change_rects = [];
    for (var i = this.last_screen_index_ - 1; i >= 0; i--) {
        if (this.actions_[i].action_type == ActionType.SCREEN) {
            prev_screen = this.actions_[i];
            prev_screen.scr_dump = this.fetch_screen_(prev_screen);

            // compare screens
            if (cur_screen && prev_screen && cur_screen.scr_dump && prev_screen.scr_dump) {
                log("Checking diff between screens " + i + " and " + (i + 1));
                var diff_rect = null;
                var diff_rects = GetRectsFromOpencvScreenDiff(prev_screen.scr_dump, cur_screen.scr_dump);
                if (diff_rects) {
                    log("Found " + diff_rects.length + " rects, checking for point x: " + point.x + " y: " + point.y);
                    for (var ri = 0; ri < diff_rects.length; ri++) {
                        //log("?DIFF RECT[" + ri + "]: " + diff_rects[ri].left + " " + diff_rects[ri].top + " " + diff_rects[ri].right + " " + diff_rects[ri].bottom);
                        // point hits
                        // to do: make sure it's the biggest change at the point
                        if (diff_rects[ri].PtInRect(point.x, point.y)) {
                            log("Point hits!");
                            diff_rect = diff_rects[ri];
                            break;
                        }
                    }
                }
                //var diff_rect = GetRectFromDiff(prev_screen.scr_dump, cur_screen.scr_dump, point);
                if (diff_rect) {
                    log("!DIFF RECT: " + diff_rect.left + " " + diff_rect.top + " " + diff_rect.right + " " + diff_rect.bottom);
                    //var diff_w = diff_rect.right - diff_rect.left;
                    //var diff_h = diff_rect.bottom - diff_rect.top;

                    //var max_width = 300;
                    //var max_height = 50;
                    //if ((diff_w < max_width) && (diff_h < max_height)) {
                    //if (cur_screen) {
                    //    cur_screen.scr_dump = null;
                    //    cur_screen = null;
                    //}
                    //if (prev_screen) {
                    //    prev_screen.scr_dump = null;
                    //    prev_screen = null;
                    //}
                    // collect change point rects
                    change_rects.push(diff_rect);
                    //log("returning");
                    //sa_logger.DeWrite(3);
                    //return diff_rect;
                    //}
                }
            }
            //cur_screen = prev_screen;
        } else {
            break;  // only go back through screen changes
        }
    }
    if (cur_screen) {
        cur_screen.scr_dump = null;
        cur_screen = null;
    }
    if (prev_screen) {
        prev_screen.scr_dump = null;
        prev_screen = null;
    }
    // from all point change rects that happened before the click, pick the smallest one
    var min_cr = -1;
    var min_area = -1;
    for (var cr = 0; cr < change_rects.length; cr++) {
        var r = change_rects[cr];
        var w = cr.right - cr.left;
        var h = cr.bottom - cr.top;
        if (min_area < 0 || w * h < min_area) {
            min_area = w * h;
            min_cr = cr;
        }
    }
    sa_logger.DeWrite(3);
    if (min_cr == -1) return null;
    else return change_rects[min_cr];
}

function sort_function(r2, r1) {
    if (r1.left < r2.left) {
        return 1;
    } else if (r1.left > r2.left) {
        return -1;
    } else if (r1.top < r2.top) {
        return 1;
    }
}

ActionAnalyzer.prototype.merge_rects_ = function(rect1, rect2) {
    var merge = CreateRect(0, 0, 0, 0);
    merge.left = Math.min(rect1.left, rect2.left);
    merge.right = Math.max(rect1.right, rect2.right);
    merge.top = Math.min(rect1.top, rect2.top);
    merge.bottom = Math.max(rect1.bottom, rect2.bottom); 
    return merge;
    
}
ActionAnalyzer.prototype.merge_vec_rectangles_ = function(rects, threshold) {
        
    // for (var i = 0; i < rects.length; i++) {
    // log("Before Merge: rects["+i+"]: left = " + rects[i].left + " right = " + rects[i].right +", top = " + rects[i].top +", bottom = " + rects[i].bottom);          
    // }
    //rects.sort(sort_function);    
    // merge rects
    var merged = false;
    var rects2 = [];
    var threshold = 8;
    var rect_merg = rects[0];
    for (var i = 1; i < rects.length; i++) {
        if (Math.abs(rect_merg.right - rects[i].left) < threshold && Math.abs(rect_merg.bottom - rects[i].bottom) < threshold) {
            rect_merg = this.merge_rects_(rect_merg, rects[i]);
            merged = true;
        } else if (merged) {
            merged = false;
            rects2.push(rect_merg);
            rect_merg = rects[i];
        } else {
            rects2.push(rect_merg);
            rect_merg = rects[i];
            merged = false;
        }
    }
    rects2.push(rect_merg);
    //for (var i = 0; i < rects2.length; i++) {
    //   log("After Merge: rects["+i+"]: left = " + rects2[i].left + " right = " + rects2[i].right +", top = " + rects2[i].top +", bottom = " + rects2[i].bottom);          
    //}
    return rects2;
}
// Does the screendiff between input_screen (before starting the writting process) and last screen "nextscreen"(when pressing enter or tab...)
ActionAnalyzer.prototype.get_rect_from_diff_ = function(input_screen, next_screen) {
    sa_logger.Write(1, "ActionAnalyzer::get_rect_from_diff_", "", "");
    var rect = null;
    var bg_color = '#FFFFFF';
    var txt_color = '#000000';
    //if (input_screen == null || input_screen.scr_dump == null) alert("input_screen.scr_dump = null");
    if (input_screen == null || next_screen == null || input_screen.scr_dump == null || next_screen.scr_dump == null) {
        //alert(" ----------------- in get_rect_from_diff_ input_screen or next_screen is null ----------------------------------------");
        this.diffs_rects_ = [];
        sa_logger.DeWrite(1);
        return {rect : rect, bg_color : bg_color, txt_color : txt_color};
    }
    var rects;
    var s2;
    var overlapp_scr_app;
    var max_screendiff = 50;
    if (!this.automat_.IsForegroundMode()) {
        overlapp_scr_app = input_screen.rect.OverlappingRect(this.scr_rect_);
        var r1 = CreateRect(overlapp_scr_app.left - this.scr_rect_.left, overlapp_scr_app.top - this.scr_rect_.top, overlapp_scr_app.right - this.scr_rect_.left, overlapp_scr_app.bottom - this.scr_rect_.top);
        var s1 = input_screen.scr_dump.Crop(r1);
        var r02 = next_screen.rect.OverlappingRect(this.scr_rect_);
        var r2 = CreateRect(r02.left - this.scr_rect_.left, r02.top - this.scr_rect_.top, r02.right - this.scr_rect_.left, r02.bottom - this.scr_rect_.top);            
        s2 = next_screen.scr_dump.Crop(r2);      
        rects = GetScreenDiffs(s1, s2);
        if (rects.length > max_screendiff) {
            //log("------------------------------------------------rects.length = " + rects.length);
            var screen = this.get_prevprev_screen_();
            if (screen) {
                var r02 = screen.rect.OverlappingRect(this.scr_rect_);
                var r2 = CreateRect(r02.left - this.scr_rect_.left, r02.top - this.scr_rect_.top, r02.right - this.scr_rect_.left, r02.bottom - this.scr_rect_.top);            
                s2 = screen.scr_dump.Crop(r2);
                rects = GetScreenDiffs(s1, s2);
                //log("------------------------------------------------ after applying get_prevprev_screen_; rects.length = " + rects.length);
            }
        }
        if (s1) s1.Destroy();
    } else {
        rects = GetScreenDiffs(input_screen.scr_dump, next_screen.scr_dump);
        if (rects && rects.length > max_screendiff) {
            //it is mostly because next_screen represents the screen after "enter" kbd (we need the screen right before "enter" kbd)
            //log("------------------------------------------------rects.length = " + rects.length);
            var screen = this.get_prevprev_screen_();
            rects = GetScreenDiffs(input_screen.scr_dump, screen.scr_dump);
            //log("------------------------------------------------ after applying get_prevprev_screen_; rects.length = " + rects.length);
        }
    }
    if (rects && rects.length > 0) {
        // sort rects
        // for (var i = 0; i < rects.length; i++) {  
        // log("RECT BEFORE sorted: left=" + rects[i].left +", right= " + rects[i].right + ", top=" + rects[i].top + ", bottom= " + rects[i].bottom);
        // }    
        //rects.sort(sort_function);
        // for (var i = 0; i < rects.length; i++) {  
        // log("RECT sorted: left=" + rects[i].left + ", right= " + rects[i].right +", top= " + rects[i].top +  ", bottom= " + rects[i].bottom);
        // }     
        // merge rects
        var merged = false;
        var rects2 = [];
        var threshold = 12; // in case of cmd, the space between words is egual to 10px
        var rect_merg = rects[0];
        for (var i = 1; i < rects.length; i++) {
            if (Math.abs(rect_merg.right - rects[i].left) < threshold && Math.abs(rect_merg.bottom - rects[i].bottom) < threshold) {
                rect_merg = this.merge_rects_(rect_merg, rects[i]);
                merged = true;
            } else if (merged) {
                merged = false;
                rects2.push(rect_merg);
                rect_merg = rects[i];
            } else {
                rects2.push(rect_merg);
                rect_merg = rects[i];
                merged = false;
            }
        }
        rects2.push(rect_merg);
        //for (var i = 0; i < rects2.length; i++) {  
        //    log(" ++++++++++++ ::get_rect_from_diff_ RECT MERGED: left=" + rects2[i].left + ", right= " + rects2[i].right + ", top= "+ rects2[i].top + ", bottom= "  + rects2[i].bottom);
        //}
        if (rects2 && rects2.length > 0) {
            //rect = this.get_largest_control_rect_(rects2); // get the bigger area instead.
            //log("------------------rects2.length =" + rects2.length);
            // for (var i = 0; i < rects2.length; i++) {
            // log("before calling find_final_edit_rect_ rects2["+i+"]: left = " + rects2[i].left + " right = " + rects2[i].right +", top = " + rects2[i].top +", bottom = " + rects2[i].bottom);          
            // }
            if (rects2.length == 1) rect = rects2[0];
            else rect = this.find_final_edit_rect_(rects2);
            // // DPS-37223
            var expand_rect = false;
            var pt = CreatePoint(rect.left + (rect.right - rect.left) / 2, rect.top + (rect.bottom - rect.top) / 2);
            var rc = this.processor_.GetEditFieldRect(pt, input_screen.scr_dump, input_screen.rect, this.automat_.IsForegroundMode());
            if (rc != null && rc.height < rect.height * 3) {
                rect = rc;
            } else {
                expand_rect = true;
                // if (rc != null) log("GetEditFieldRect returns: left=" + rc.left + ", right= " + rc.right + ", top= "+ rc.top + ", bottom= "  + rc.bottom);
                // log("find_final_edit_rect_ returns: left=" + rect.left + ", right= " + rect.right + ", top= "+ rect.top + ", bottom= "  + rect.bottom);
                // alert("GetEditFieldRect returns no rect or a hight rectangle");
            }
            // //---- End DPS-37223
            var ctr_rect;
            if (!this.automat_.IsForegroundMode()) {
                ctr_rect = s2.Crop(rect);
            } else {
                ctr_rect = next_screen.scr_dump.Crop(rect);
            }
            if (expand_rect) {
                rect.Expand(1, 2);
                rect.bottom += 2;
                rect.right += 2;
            }

            if (ctr_rect) {
                var bg_color_res = GetBackgroundColor(ctr_rect);
                if (bg_color_res) bg_color = bg_color_res;
                if (bg_color == txt_color) txt_color = '#FFFFFF';
                ctr_rect.Destroy();
            }
            if (!this.automat_.IsForegroundMode()) {
                rect.left = rect.left + overlapp_scr_app.left - this.scr_rect_.left;
                rect.top = rect.top + overlapp_scr_app.top - this.scr_rect_.top;
                rect.right = rect.right + overlapp_scr_app.left - this.scr_rect_.left;
                rect.bottom = rect.bottom + overlapp_scr_app.top - this.scr_rect_.top;
                // pt.x = pt.x + overlapp_scr_app.left  - this.scr_rect_.left;
                // pt.y = pt.y + overlapp_scr_app.top - this.scr_rect_.top;          
            }
        }
    }
    this.diffs_rects_ = [];
    sa_logger.DeWrite(1);
    GarbageCollect();
    if (s2) s2.Destroy();
    return {rect : rect, bg_color : bg_color, txt_color : txt_color};
}
// Implemented to avoid getting a wrong edit field, when the screendiff results into more than one rectangle.
ActionAnalyzer.prototype.find_final_edit_rect_ = function(rects2) {
    sa_logger.Write(2, "ActionAnalyzer::find_final_edit_rect_", "", "");
    if (rects2.length == 1) {
        sa_logger.DeWrite(2);
        return rects2[0];
    }
    var score = [];
    for (var i = 0; i < rects2.length; i++) {
        score.push(0);
    }
    // this.diffs_rects_[j].length represents the number of screendiff when entering the j (eme) character.
    //this.diffs_rects_.length is the number of entered character
    //log("this.diffs_rects_.length =" + this.diffs_rects_.length);
    // // // visu this.diffs_rects_
    // for (var i = 0; i < this.diffs_rects_.length; i++) {
    // for (var j = 0; j < this.diffs_rects_[i].length; j++) {
    // log("diffs_rects_["+i+"]["+j+"]: left = " + this.diffs_rects_[i][j].left + " right = " + this.diffs_rects_[i][j].right +", top = " + this.diffs_rects_[i][j].top +", bottom = " + this.diffs_rects_[i][j].bottom);
    // }
    // }
    //log("------------------rects2.length =" + rects2.length);    
    // for (var i = 0; i < rects2.length; i++) {
    // log("rects2["+i+"]: left = " + rects2[i].left + " right = " + rects2[i].right +", top = " + rects2[i].top +", bottom = " + rects2[i].bottom);          
    // }
    // this idea did not work always
    // var one_change_each_screendiff = true;
    // for (var i = 0; i < this.diffs_rects_.length; i++) {
    // if (this.diffs_rects_[i].length > 1) one_change_each_screendiff = false;           
    // }    
    // if (one_change_each_screendiff) {
    // var r;
    // for (var i = 0; i < this.diffs_rects_.length; i++) {
    // if (i == 0) r = this.diffs_rects_[0][0];
    // else {for (var j = 0; j < this.diffs_rects_[i].length; j++) {
    // //log("r.left = " + r.left + ", right = " + r.right +", top = " + r.top +", bottom = " + r.bottom); 
    // r = this.merge_rects_(r, this.diffs_rects_[i][j]);          
    // }
    // }
    // }
    // return r;
    // }

    var min_width_character = 4;
    var min_rect_width = min_width_character * this.diffs_rects_.length;
    for (var i = 0; i < rects2.length; i++) {
        if (rects2[i].right - rects2[i].left > min_rect_width) {
            for (var j = 0; j < this.diffs_rects_.length; j++) {
                for (var k = 0; k < this.diffs_rects_[j].length; k++) {
                    if (rects2[i].ContainedRect(this.diffs_rects_[j][k], 3)) {
                        score[i]++;
                        break;
                    }
                }
            }
        }
    }
    var max_score = score[0];
    var res_rc = rects2[0];
    //log("ActionAnalyzer::find_final_edit_rect_------res_rc.left = " + res_rc.left + "res_rc.right = " + res_rc.right +" res_rc.top = " + res_rc.top);

    for (var i = 1; i < rects2.length; i++) {
        if (score[i] > max_score) {
            max_score = score[i];
            res_rc = rects2[i];
        } else if (max_score > 0 && score[i] == max_score) {
            if ((res_rc.right - res_rc.left) < (rects2[i].right - rects2[i].left)) res_rc = rects2[i]; 
        }
    }
    GarbageCollect();
    //// Vizu
    //for (var i = 0; i < score.length; i++) {
    //log("score["+i+"] = " + score[i]);
    //}
    sa_logger.DeWrite(2);
    //log("max_score = " + max_score);
    //log("ActionAnalyzer::find_final_edit_rect_------res_rc.left = " + res_rc.left + "res_rc.right = " + res_rc.right +" res_rc.top = " + res_rc.top);
    return res_rc;
}

ActionAnalyzer.prototype.insert_pending_kbd_input_ = function(screen, confirmation) {
    sa_logger.Write(1, "ActionAnalyzer::insert_pending_kbd_input_", "", "");
    if (this.aggregate_input_) {
        this.input_buffer_.postprocess();
        if (this.input_buffer_.is_plain() && this.input_buffer_.app_value_ != "") {
            if (screen && this.input_buffer_.app_value_.length > 1) {
                // get the rectangle from initial screen this.input_screen_(before typing) and final screen(after finish the typing)
                var result = this.get_rect_from_diff_(this.input_screen_, screen);
                if (result) {
                    var rect = result.rect;
                    if (rect) {
                        this.last_ctrl_.SetParam("screenshot_rect", rect);
                        this.last_ctrl_.SetParam("ctl_rect", rect);
                        //log("result.bg_color = " + result.bg_color);
                        if (result.bg_color && this.last_ctrl_.HasParam("ctl_bg_color")) this.last_ctrl_.SetParam("ctl_bg_color", result.bg_color);
                        if (result.txt_color && this.last_ctrl_.HasParam("ctl_font_color")) this.last_ctrl_.SetParam("ctl_font_color", result.txt_color);
                    }
                }
            }
            var password = this.check_if_edit_is_password_(screen);
            this.convert_control_to_editfield_(confirmation, password);
        }
        this.aggregate_input_ = false;
        this.input_buffer_.clean();
    }
}

ActionAnalyzer.prototype.copy_param_ = function(mac1, mac2, param) {
    if (mac1.HasParam(param) && mac2.HasParam(param)) {
        mac2.SetParam(param, mac1.GetParam(param));
    }
}
 

ActionAnalyzer.prototype.check_if_edit_is_password_ = function(screen) {

    // DPS-36499 check if it is a password field
    var ctr_rect;
    var rect = this.last_ctrl_.GetParam("ctl_rect");
    // rect.Expand(-1, -1);
    // rect.bottom -= 2;
    // rect.right -= 2;
    var password = false;

    if (rect) {
        if (!this.automat_.IsForegroundMode()) {
            var r02 = screen.rect.OverlappingRect(this.scr_rect_);
            var r2 = CreateRect(r02.left - this.scr_rect_.left, r02.top - this.scr_rect_.top, r02.right - this.scr_rect_.left, r02.bottom - this.scr_rect_.top);
            var s2 = screen.scr_dump.Crop(r2); 
            ctr_rect = s2.Crop(rect);
        } else {
            ctr_rect = screen.scr_dump.Crop(rect);
        }

        var min_password_length = 3;
        if (this.input_buffer_.app_value_.length > min_password_length) {
            var dissimilar_char = false;
            var char1 = this.input_buffer_.app_value_[0];
            for (var i = 1; i < this.input_buffer_.app_value_.length; i++) {
                if (char1 != this.input_buffer_.app_value_[i]) {
                    dissimilar_char = true;
                    break;
                }
            }
            if (dissimilar_char) password = this.processor_.IsPassword(ctr_rect, this.input_buffer_.app_value_.length);
        }
    }
    return password;
}
 
ActionAnalyzer.prototype.convert_control_to_editfield_ = function(confirmation, password) {  
 
    sa_logger.Write(1, "ActionAnalyzer::convert_control_to_editfield_", "", "");

    var last_type = this.last_ctrl_.GetParam("element_type");
    var edit_mac = this.last_ctrl_;

    if (last_type != "WINHotspotEdit") { //only convert if necessary WINEdit or WINHotspotEdit???
        var type = "WINHotspotEdit";
        edit_mac = this.project_.CreateMacro("input_text");
        edit_mac.SetParam("element_type", type);
        win_set_msg_param(edit_mac, get_infotxt(type));

        this.copy_param_(this.last_ctrl_, edit_mac, "click_pos");
        this.copy_param_(this.last_ctrl_, edit_mac, "ctl_rect");
        this.copy_param_(this.last_ctrl_, edit_mac, "screenshot_rect");
        this.copy_param_(this.last_ctrl_, edit_mac, "position_h");
        this.copy_param_(this.last_ctrl_, edit_mac, "position_b");
        this.copy_param_(this.last_ctrl_, edit_mac, "position_bu");
        this.copy_param_(this.last_ctrl_, edit_mac, "orientation");
        this.copy_param_(this.last_ctrl_, edit_mac, "orientation_p");

        if (this.record_audio_) {
            // //add audio for the current editfield
            var from = this.intermediate_timestamp - this.initial_timestamp;
            //log("------------------- convert_control_to_editfield_::AddAudio2CurrentAudioTrack");
            var to = this.current_action_.timestamp - this.initial_timestamp;
            //log("----------- this.current_action_.timestamp = ------------------------------------------------" + this.current_action_.timestamp)        
            this.project_.AddAudio2CurrentAudioTrack(from, to); //concatenated the audio to get the audio of the click + entered text
            this.intermediate_timestamp = this.current_action_.timestamp;
        }
    }

    edit_mac.SetParam("ctl_password", password);
    if (!password) edit_mac.SetParam("text_d", this.input_buffer_.app_value_);

    //heuristic to adapt size of an edit field
    var rc = edit_mac.GetParam("screenshot_rect");
    var width = (rc.right - rc.left);
    if (width < 7) width = 8;
    var textlen = this.input_buffer_.app_value_.length * 8;
    var is_hotspot = (width <= (2 * this.offset_));
    if (is_hotspot && textlen > width) {
        rc.right = rc.left + textlen;
        edit_mac.SetParam("screenshot_rect", rc);
        edit_mac.SetParam("ctl_rect", rc);
    }

    if (confirmation == "tab") {
        if (edit_mac.HasParam("confirmation_tab")) {
            edit_mac.SetParam("confirmation_tab", true);
        }
    } else if (confirmation == "enter") {
        this.input_buffer_.clean();
        if (edit_mac.HasParam("confirmation_enter")) {
            edit_mac.SetParam("confirmation_enter", true);
        }
    }

    if (last_type != "WINHotspotEdit") {
        this.project_.InsertEventAfter(edit_mac);
        this.project_.DeleteEvent(this.last_ctrl_.TourPosition());
    }
    sa_logger.DeWrite(1);
}


ActionAnalyzer.prototype.is_printable_ = function(action) {
    return (KeyUtils.IsPrintable(action.key_code) || action.key_name == "back");
}


ActionAnalyzer.prototype.analyze_kbd_action_ = function(action, screen, cursor, prev_mouse_move) {
    sa_logger.Write(1, "ActionAnalyzer::analyze_kbd_action_", "", "");
    var add_key_control = true;  
    var delete_screen = false;
    if (action.key_name == "tab" || action.key_name == "enter") {
        if (this.last_ctrl_ != null) {
            this.insert_pending_kbd_input_(screen, action.key_name);
            this.diffs_rects_ = [];
            this.last_ctrl_ = null;
            if (this.input_screen_) {
                this.input_screen_.scr_dump = null;
                this.input_screen_ = null;
            }
            this.input_screen_ = screen;// this.get_prev_screen_();
            add_key_control = false;
            this.input_buffer_.clean();
        }
    } else if (this.is_printable_(action)) {
        this.aggregate_input_ = true;
        var next_screen = this.get_next_screen_();  // this.get_next_screen_before_next_kbd_();//
        if (this.last_ctrl_ != null) {
            this.insert_input_to_buffer_(action);
            if (next_screen) this.find_diff_rects_(screen, next_screen);
            add_key_control = false;
            delete_screen = true;
        } else {
            if (this.input_screen_) {
                this.input_screen_.scr_dump = null;
                this.input_screen_ = null;
            }
            this.input_screen_ = screen;//this.get_prev_screen_();//
            if (next_screen) {
                var consider_small_diffs = true; // consider cursor as a valid screendiff, in order to recognize rectangle of editfield password(ex:SAPGUI)
                add_key_control = !this.get_control_from_diff_(this.input_screen_, next_screen, action, false);
                if (add_key_control) add_key_control = !this.get_control_from_diff_(this.input_screen_, next_screen, action, consider_small_diffs);
            }
        }
        if (next_screen) {
            next_screen.scr_dump = null;
            next_screen = null;
        }
    }

    if (add_key_control) {
        this.aggregate_input_ = false;
        this.insert_screenshot_(screen, action.timestamp);
        this.insert_key_control_(action);
        if (this.record_video_ && cursor !== null) {
            this.update_qr_frames_info_(action, screen, cursor, prev_mouse_move);
        }
    }
    if (delete_screen && screen) {
        screen.scr_dump = null;
        screen = null;
    }
    GarbageCollect();
    sa_logger.DeWrite(1);
}

// Stores all rectangles comming from screendiff during typing.
ActionAnalyzer.prototype.find_diff_rects_ = function(screen, next_screen) {
    sa_logger.Write(2, "ActionAnalyzer::find_diff_rects_", "", "");
    var rects, overlapp_scr_app;
    if (screen == null || next_screen == null || screen.scr_dump == null || next_screen.scr_dump == null) {
        sa_logger.DeWrite(1);
        return;
    }
    //log("find_diff_rects_:: screen timestamp = " + screen.timestamp + "  Next screen timestamp = " + next_screen.timestamp);
    // TODO: issue when comparing next screen with current screen in Notepad++: next_screen does not contain the entered character
    if (!this.automat_.IsForegroundMode()) {
        overlapp_scr_app = screen.rect.OverlappingRect(this.scr_rect_);
        var r1 = CreateRect(overlapp_scr_app.left - this.scr_rect_.left, overlapp_scr_app.top - this.scr_rect_.top, overlapp_scr_app.right - this.scr_rect_.left, overlapp_scr_app.bottom - this.scr_rect_.top);
        var s1 = screen.scr_dump.Crop(r1);
        var r02 = next_screen.rect.OverlappingRect(this.scr_rect_);
        var r2 = CreateRect(r02.left - this.scr_rect_.left, r02.top - this.scr_rect_.top, r02.right - this.scr_rect_.left, r02.bottom - this.scr_rect_.top);
        var s2 = next_screen.scr_dump.Crop(r2);

        rects = GetScreenDiffs(s1, s2);
        if (s1) s1.Destroy();
        if (s2) s2.Destroy();
    } else {
        rects = GetScreenDiffs(screen.scr_dump, next_screen.scr_dump);
    }

    if (rects && rects.length > 0) {
        if (rects.length > 2) {
            var rects_merged = this.merge_vec_rectangles_(rects, 10);
            if (rects_merged) this.diffs_rects_.push(rects_merged);
        } else this.diffs_rects_.push(rects);
    }
    GarbageCollect();
    sa_logger.DeWrite(2);
}

// does screendiff and returns one rectangle that represents the editfield controls
ActionAnalyzer.prototype.get_control_from_diff_ = function(screen, next_screen, action, consider_small_diffs) {
    sa_logger.Write(1, "ActionAnalyzer::get_control_from_diff_", "", "");
    var rects;
    var s1, s2;
    var overlapp_scr_app;
    if (screen == null || next_screen == null || screen.scr_dump == null || next_screen.scr_dump == null) {
        //alert("in get_control_from_diff_ screen == null || next_screen == null");
        sa_logger.DeWrite(1);
        return false;
    }
    //log("get_control_from_diff_:: screen timestamp = " + screen.timestamp + "  Next screen timestamp = " + next_screen.timestamp);
    if (!this.automat_.IsForegroundMode()) {
        //log("this.scr_rect_ left = " + this.scr_rect_.left + " right = " + this.scr_rect_.right+ " top = " + this.scr_rect_.top+ " bottom = " + this.scr_rect_.bottom);
        overlapp_scr_app = screen.rect.OverlappingRect(this.scr_rect_);
        var r1 = CreateRect(overlapp_scr_app.left - this.scr_rect_.left, overlapp_scr_app.top - this.scr_rect_.top, overlapp_scr_app.right - this.scr_rect_.left, overlapp_scr_app.bottom - this.scr_rect_.top);
        s1 = screen.scr_dump.Crop(r1);
        var r02 = next_screen.rect.OverlappingRect(this.scr_rect_);
        var r2 = CreateRect(r02.left - this.scr_rect_.left, r02.top - this.scr_rect_.top, r02.right - this.scr_rect_.left, r02.bottom - this.scr_rect_.top);            
        s2 = next_screen.scr_dump.Crop(r2);
        rects = GetScreenDiffs(s1, s2, consider_small_diffs);
    } else {
        rects = GetScreenDiffs(screen.scr_dump, next_screen.scr_dump, consider_small_diffs);
    }

    if (rects && rects.length > 0) {
        this.diffs_rects_.push(rects);
        //var rc = this.guess_control_rect_(rects);
        // if we write only one character in an editfiels and we get 2 rects from screendiff, then we return the one who gets the bigger rect from ADIG
        var rc;
        if (rects.length > 1 || consider_small_diffs) {
            if (!this.automat_.IsForegroundMode()) {
                rc = this.processor_.GetRectFromDiffRects(rects, s1, consider_small_diffs);
            } else rc = this.processor_.GetRectFromDiffRects(rects, screen.scr_dump, consider_small_diffs);
        } else {
            rc = rects[0];
        }

        if (rc != null) {
            if (!consider_small_diffs) rc.Expand(2, 5);
            var ctr_rect;
            if (!this.automat_.IsForegroundMode()) {
                ctr_rect = s2.Crop(rc);
            } else ctr_rect = next_screen.scr_dump.Crop(rc);
            var bg_color = '#FFFFFF';
            var txt_color = '#000000';
            if (ctr_rect) { 
                var bg_color_res = GetBackgroundColor(ctr_rect);
                ctr_rect.Destroy();
                if (bg_color_res) bg_color = bg_color_res;
                if (bg_color == txt_color) txt_color = '#FFFFFF';
            }
            var pt = CreatePoint(rc.left + (rc.right - rc.left) / 2, rc.top + (rc.bottom - rc.top) / 2);

            //var ctrl_rc = this.processor_.GetRect(pt, screen.scr_dump, screen.rect);
            // if (ctrl_rc != null) {
            //     rc = ctrl_rc;
            // }     
            if (!this.automat_.IsForegroundMode()) {
                rc.left = rc.left + overlapp_scr_app.left - this.scr_rect_.left;
                rc.top = rc.top + overlapp_scr_app.top - this.scr_rect_.top;
                rc.right = rc.right + overlapp_scr_app.left - this.scr_rect_.left;
                rc.bottom = rc.bottom + overlapp_scr_app.top - this.scr_rect_.top;
                pt.x = pt.x + overlapp_scr_app.left  - this.scr_rect_.left;
                pt.y = pt.y + overlapp_scr_app.top - this.scr_rect_.top;
            }
            this.insert_screenshot_(screen, action.timestamp);
            this.insert_input_to_buffer_(action);
            this.last_ctrl_ = this.insert_edit_control_(pt, rc, screen.scr_dump);
            this.last_ctrl_.SetParam("ctl_bg_color", bg_color);
            this.last_ctrl_.SetParam("ctl_font_color", txt_color);
            if (this.record_video_) {
                //var name = (IMAGE_NAME + (action.timestamp - this.first_timestamp_cur_macro_)).slice(-IMG_NAME_LEN);
                //this.qr_frame_data_ +=  "actiontype " + "SCREEN " + "name " + name + ".png \n";
                //this.save_image_in_temp_folder_(this.prev_image_, action.timestamp);
                this.move_images_to_current_macro_();
                this.qr_frame_data_ = "";
                this.nb_images_ = 0;
            }
            if (s2) s2.Destroy();
            if (s1) s1.Destroy();
            GarbageCollect();
            sa_logger.DeWrite(1);
            return true;
        }
    }
    GarbageCollect();
    if (s1) s1.Destroy();
    if (s2) s2.Destroy();
    sa_logger.DeWrite(1);
    return false;
}

ActionAnalyzer.prototype.insert_input_to_buffer_ = function(action) {
    this.input_buffer_.insert(action.key_code, action.mods.shift, action.mods.ctrl, action.mods.alt);
}

ActionAnalyzer.prototype.insert_screenshot_ = function(screen_data, action_timestamp) {
    sa_logger.Write(3, "ActionAnalyzer::insert_screenshot_", "", "");
    var dump = null;
    if (screen_data.scr_dump == null) screen_data.scr_dump = this.fetch_screen_(screen_data);
    if (screen_data.scr_dump) {
        dump = screen_data.scr_dump;
        /*if (this.automat_.IsForegroundMode()) {
            dump = screen_data.scr_dump.Crop(screen_data.rect);
        }*/

        var screen = new ScreenExporter(this.automat_);
        screen.SetScreenDump(dump);
        screen.SetExecutable(screen_data.executable);
        var ts = this.project_.AddTourstop(screen_data.title, get_default_tourstop_style());
        var from = this.intermediate_timestamp - this.initial_timestamp;
        var to = action_timestamp - this.initial_timestamp;
        if (this.record_audio_) {
            //log("audio recorded; from: " + from + " to: " + to );
            this.project_.AddAudio(from, to);
        }
        this.intermediate_timestamp = action_timestamp;
        //log("------ ActionAnalyzer::insert_screenshot_::AUDIO was added");

        var mac = win_create_asset(screen);

        if (screen.Executable() != "" && mac.HasParam("executable")) {
            mac.SetParam("executable", screen.Executable());
        }
        if (mac.HasParam("sc_config_file")) {
            mac.SetParam("sc_config_file", QUICK_RECORDING);
        }

        if (this.record_video_) {
            this.curr_mac_ = mac;
        }

        screen.Save();
        this.project_.InsertEventAfter(mac);
    }
    sa_logger.DeWrite(3);
    return dump;
}

ActionAnalyzer.prototype.save_only_screen_change_area_ = function(screen_change_area, scr_timestamp) {
    sa_logger.Write(3, "ActionAnalyzer::save_only_screen_change_area_", "", "");

    var image = screen_change_area;
    this.save_change_area_in_temp_folder_(image, scr_timestamp);
    sa_logger.DeWrite(3);
    return;
}

ActionAnalyzer.prototype.save_change_area_in_temp_folder_ = function(image, screen_timestamp) {
    sa_logger.Write(3, "ActionAnalyzer::save_change_area_in_temp_folder_", "", "");

    if (image) {

        var time = screen_timestamp - this.first_timestamp_cur_macro_;
        //alert("time = " + time + "   ----- \n this.first_timestamp_cur_macro_ = " + this.first_timestamp_cur_macro_);
        var name = (IMAGE_NAME + time).slice(-IMG_NAME_LEN);
        var dir = this.base_dir_ + "\\qr_frames_temp\\";
        CreateDirTree(dir);
        var fname = dir + name + ".png";
        image.Save(fname);
        //var filename = dir  + "\\" + FRAME_DATA_FILENAME;
        //this.qr_frame_data_ =  this.qr_frame_data_ + "actiontype " + "SCREEN " + "name " + name + ".png" + "\n";
        //log("------------------------------- START ------- Mouse_move_info = " + this.qr_frame_data_ + "++++++++++++++++END+++++++++++++");
        if (!this.save_whole_image_) this.prev_image_ = image;
        //this.images_compressor_.AddFrame(image, this.frame_++);
    }
    sa_logger.DeWrite(3);
}

ActionAnalyzer.prototype.move_images_to_current_macro_ = function() {
    if (!this.curr_mac_) {
        return;
    }
    var res = this.curr_mac_.GetResource();
    var subres = res.CreateSubResource("qr_frames");
    this.curr_mac_.SetParam("qr_frames", "qr_frames");

    var src_path = this.base_dir_ + "\\qr_frames_temp\\";
    //this.images_compressor_.Finalize();
    var dest_path = subres.FullPath();
    var res = MoveFile(src_path, dest_path);
    var retry = 1;

    while (!res.success && retry <= 3) {
        log("Error moving src path: " + src_path + " To dest path: " + dest_path + "; Error = " + res.error + " Retry: " + retry);
        Sleep(1000*retry);
        res = MoveFile(src_path, dest_path);
        retry++;
    }
    //if (res.success) log("Successfully moved src path: " + src_path + " To dest path: " + dest_path);
    if (!res.success) log("Error moving src path: " + src_path + " To dest path: " + dest_path + "; Error = " + res.error);

    // Add qr_frames Info to qr_frames folder
    subres.SaveText(FRAME_DATA_FILENAME, this.qr_frame_data_);
    // Add mouse cursor to qr_frames
    for (var i = 0; i < this.cursor_ids_qrframes_.length; i++) {
        var path_and_mask = this.base_dir_ + "\screens\\" + this.cursor_ids_qrframes_[i] + "_and_mask.bmp";
        var name_and_mask = dest_path +  this.cursor_ids_qrframes_[i] + "_and_mask.bmp";
        CopyFile(path_and_mask, name_and_mask);
        var path_xor_mask = this.base_dir_ + "\screens\\" + this.cursor_ids_qrframes_[i] + "_xor_mask.png";
        var name_xor_mask = dest_path +  this.cursor_ids_qrframes_[i] + "_xor_mask.png";
        CopyFile(path_xor_mask, name_xor_mask);
        // for debugging
        //var path_xor_mask = this.base_dir_ + "\screens\\" + this.cursor_ids_qrframes_[i] + ".png";
        //var name_xor_mask = dest_path +  this.cursor_ids_qrframes_[i] + ".png";
        //CopyFile(path_xor_mask, name_xor_mask);
    }
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
    var ori = demo_bubble_pos_fn(rp_b, rect, win_rect);

    if (mac.HasParam("orientation")) {
        mac.SetParam("orientation", ori);
    }

    if (mac.HasParam("position_b")) {
        mac.SetParam("position_b", rp_b);
    }

    if (mac.HasParam("position_bu")) {
        if (cfg !== undefined && cfg.standard.winrec.practice_bubble_at_element) {
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

ActionAnalyzer.prototype.set_central_pos_ = function(mac, scr_dump) {
    sa_logger.Write(3, "ActionAnalyzer::set_pos_", "", "");

    var rp = CreatePosition();
    rp.FramePathPush(0);

    if (mac.HasParam("position_h")) {
        mac.SetParam("position_h", rp);
    }

    rp.ElementPath = "";
    rp.ID = "page";
    rp.DocX = 50;
    rp.DocY = 50;
    rp.X = 50;
    rp.Y = 50;

    if (mac.HasParam("orientation")) {
        mac.SetParam("orientation", "C");
    }
    if (mac.HasParam("position_b")) {
        mac.SetParam("position_b", rp);
    }

    if (mac.HasParam("orientation_p")) {
        mac.SetParam("orientation_p", "C");
    }

    if (mac.HasParam("position_bu")) {
        mac.SetParam("position_bu", rp);
    }

    sa_logger.DeWrite(3);
}

ActionAnalyzer.prototype.get_infotxt_ = function(type, click_type) {
    return get_infotxt_act(type, click_type);
}

ActionAnalyzer.prototype.insert_wheel_control_ = function(action, scr_dump) {
    sa_logger.Write(2, "ActionAnalyzer::insert_wheel_control_", "", "");

    var type = "WINScrollWheel";

    var mac = this.project_.CreateMacro("click");
    var click_pos = CreatePoint(action.pt.x, action.pt.y);
    mac.SetParam("click_pos", click_pos);
    mac.SetParam("element_type", type);

    var rect = CreateRect(click_pos.x, click_pos.y, click_pos.x + 1, click_pos.y + 1);

    if (mac && mac.HasParam("ctl_rect")) {
        mac.SetParam("ctl_rect", rect);
    }

    this.set_central_pos_(mac, scr_dump);

    var infotext = this.get_infotxt_(type, action.click_type);
    win_set_msg_param(mac, infotext);

    if (mac.HasParam("action")) {
        mac.SetParam("action", action.click_type);
    }

    if (mac.HasParam("click_count")) {
        mac.SetParam("click_count", action.rotation);
    }

    if (mac.HasParam("ctrl_key")) {
        mac.SetParam("ctrl_key", action.mods.ctrl);
    }

    if (mac.HasParam("alt_key")) {
        mac.SetParam("alt_key", action.mods.alt);
    }

    if (mac.HasParam("shift_key")) {
        mac.SetParam("shift_key", action.mods.shift);
    }

    this.project_.InsertEventAfter(mac);
    sa_logger.DeWrite(2);

    return mac;
}

ActionAnalyzer.prototype.insert_click_control_ = function(action, rect, scr_dump) {
    sa_logger.Write(2, "ActionAnalyzer::insert_click_control_", "", "");
    var type = "WINClick";
    if (action.click_type === "rclick" || action.click_type === "rdblclick") {
        type = "WINRightMouse";
    } else if (action.click_type === "ldblclick") {
        type = "WINHotspotArea::ldblclick";
    }
    var mac = this.project_.CreateMacro("click");
    mac.SetParam("screenshot_rect", rect);
    mac.SetParam("ctl_rect", rect);
    var click_pos = CreatePoint(action.pt.x, action.pt.y);
    mac.SetParam("click_pos", click_pos);
    mac.SetParam("element_type", type);

    if (mac.HasParam("rec_method")) {
        mac.SetParam("rec_method", "Active area");
    }

    this.set_pos_(mac, rect, scr_dump);
        
    if (action.click_type === "drag" || action.click_type === "drop") {
        type = type + "::" + action.click_type;
    } 

    var infotext = get_infotxt(type);
    win_set_msg_param(mac, infotext);

    if (mac.HasParam("action")) {
        mac.SetParam("action", action.click_type);
    }

    if (mac.HasParam("ctrl_key")) {
        mac.SetParam("ctrl_key", action.mods.ctrl);
    }

    if (mac.HasParam("alt_key")) {
        mac.SetParam("alt_key", action.mods.alt);
    }

    if (mac.HasParam("shift_key")) {
        mac.SetParam("shift_key", action.mods.shift);
    }

    update_fieldicon(mac, scr_dump);
    this.project_.InsertEventAfter(mac);

    sa_logger.DeWrite(2);

    return mac;
}

ActionAnalyzer.prototype.insert_edit_control_ = function(click_pos, rect, scr_dump) {
    sa_logger.Write(2, "ActionAnalyzer::insert_edit_control_", "", "");

    var type = "WINHotspotEdit";
    var edit_mac = this.project_.CreateMacro("input_text");
    edit_mac.SetParam("element_type", type);
    win_set_msg_param(edit_mac, get_infotxt(type));
    this.set_pos_(edit_mac, rect, scr_dump);

    edit_mac.SetParam("click_pos", click_pos);
    edit_mac.SetParam("screenshot_rect", rect);
    edit_mac.SetParam("ctl_rect", rect);

    //update_fieldicon(edit_mac, scr_dump);
    this.project_.InsertEventAfter(edit_mac);

    sa_logger.DeWrite(2);
    this.first_kbd_entry_ = true;
    return edit_mac;
}

ActionAnalyzer.prototype.insert_key_control_ = function(action) {
    sa_logger.Write(3, "ActionAnalyzer::add_keypress_macro_", "", "");
    var key_mac = this.project_.CreateMacro("key_press");

    var kdb_action = CreateAction(action_type["KEYBOARD_ACT"]);
    kdb_action.key_code = action.key_code;
    kdb_action.shift = action.mods.shift;
    kdb_action.ctrl = action.mods.ctrl;
    kdb_action.alt = action.mods.alt;

    var params = {Action: kdb_action, ReplaceTxt: true, Type: "WINKeyPress"};
    win_update_keypress(key_mac, params)

    this.project_.InsertEventAfter(key_mac);
    sa_logger.DeWrite(3);
}

ActionAnalyzer.prototype.print_actions_ = function() {
    for (var i = 0; i < this.actions_.length; i++) {
        var str = "";
        var action = this.actions_[i];
        if (action.action_type == ActionType.MOUSE_ACTION) {
            str += "MOUSE: " + "(" + action.pt.x + " ; " + action.pt.y + ") " + action.click_type + " time: " + action.timestamp;
        } else if (action.action_type == ActionType.KEYBOARD_ACTION) {
            str += "KBD: " + action.key_code + " " + action.key_name + " time: " + action.timestamp;
        } else if (action.action_type == ActionType.SCREEN) {
            str += "SCREEN: " /*+ action.title + " " +  "(" + action.rect.left + " ; " + action.rect.top + ") "*/ + action.timestamp;
            //str += "SCREEN: title = " + action.title + " classname = " + action.classname +  "(" + action.rect.left + " ; " + action.rect.top + ") " + action.timestamp;
            // + "(" + action.pos.x + " ; " + action.pos.y + ") " 
            //   + "; rect.reft = " + action.rect.left + "; rect.right = "+ action.rect.right + "; rect.top = "+ action.rect.top + "; rect.bottom = "+ action.rect.bottom;
            //str += "  --------- SCREEN change_rect: rect.left = " + action.change_rect.left + "; rect.right = "+ action.change_rect.right + "; rect.top = "+ action.change_rect.top + "; rect.bottom = "+ action.change_rect.bottom;
        } else if (action.action_type == ActionType.MOUSE_MOVE && this.record_video_) {
            //continue;
            str += "MOUSEMOVE: " + "(" + action.position.x + " ; " + action.position.y + ") " + " time: " + action.timestamp;
        } else if (action.action_type == ActionType.PAUSE) {
            str += " PAUSE: time: " + action.timestamp;
        } else if (action.action_type == ActionType.UNPAUSE) {
            str += " UNPAUSE: time: " + action.timestamp;
        }

        log("" + str);
    }
}

//////////////////////////////////////////// for debugging only (QRDebug=1) /////////////////////////////////////////////////////////

ActionAnalyzer.prototype.CreateRawProject = function(actions) {
    sa_logger.Write(0, "ActionAnalyzer::CreateRawProject", "", "");
    this.actions_ = actions;
    this.base_dir_ = GetTemporaryPath();

    this.collect_actions_();
    this.append_macros_();

    // create video
    //var prn = new LessonPrinter();
    //var audio_files = "";
    //prn.PrintFiles(this.project_, audio_files);
    //delete prn;
    //prn = null;
    // end create video
    this.cleanup_();
    //DeleteDirTree(this.base_dir_ + "\screens_video\\");
    sa_logger.DeWrite(0);
}

ActionAnalyzer.prototype.append_macros_ = function() {

    this.progress_ = CreateProgressDlg();
    this.progress_.ProgressCancable(true);
    this.progress_.ProgressStepsBegin(Translate('append_macros'), this.actions_.length);

    for (var i = 0; i < this.actions_.length; i++) {
        this.actions_[i].action_index = i;
    }

    var timestamp_start = this.actions_.length > 0 ? this.actions_[0].timestamp : 0;
    for (this.index_ = 0; this.index_ < this.actions_.length; this.index_++) {
        var action = this.actions_[this.index_];

        if (action.action_type == ActionType.SCREEN) {
            this.insert_screen_action_(action, timestamp_start);
        } else if (action.action_type == ActionType.MOUSE_ACTION) {
            this.insert_mouse_action_(action);
        } else if (action.action_type == ActionType.KEYBOARD_ACTION) {
            this.insert_kdb_action_(action);
        } else if (action.action_type == ActionType.MOUSE_MOVE) {
            this.insert_mouse_move_action_(action);
        }

        this.progress_.ProgressStep();
        GarbageCollect();

        if (this.progress_.GetCancelled()) {
            break;
        }
    }

    this.progress_.ProgressEnd();
}

ActionAnalyzer.prototype.insert_mouse_action_ = function(action) {
    var mac = this.project_.CreateMacro("mouse_action");
    var click_pos = CreatePoint(action.pt.x, action.pt.y);
    var time = action.timestamp + "";
    mac.SetParam("timestamp", time);

    mac.SetParam("click_pos", click_pos);
    mac.SetParam("action", action.click_type);
    mac.SetParam("ctrl_key", action.mods.ctrl);
    mac.SetParam("alt_key", action.mods.alt);
    mac.SetParam("shift_key", action.mods.shift);
    mac.SetParam("click_count", action.rotation);

    this.project_.InsertEventAfter(mac);
}

ActionAnalyzer.prototype.insert_kdb_action_ = function(action) {
    var mac = this.project_.CreateMacro("kbd_action");
    var time = action.timestamp + "";
    mac.SetParam("timestamp", time);

    var key_codes = KeyUtils.KeysV2(action.key_code, action.mods.shift, action.mods.ctrl, action.mods.alt);
    mac.SetParam("hotkeyV2", key_codes);

    var key_name = KeyUtils.KeyName(action.key_code, action.mods.shift, action.mods.ctrl, action.mods.alt);
    mac.SetParam("key_name", key_name);

    var key_desc = KeyUtils.LocalizedName(action.key_code, action.mods.shift, action.mods.ctrl, action.mods.alt);
    mac.SetParam("key_desc", (key_desc == "ctrl pause_break") ?  "ctrl pause/break" : key_desc);

    mac.SetParam("ctrl_key", action.mods.ctrl); //to convert easily
    mac.SetParam("alt_key", action.mods.alt);
    mac.SetParam("shift_key", action.mods.shift);
    mac.SetParam("key_code", action.key_code);

    this.project_.InsertEventAfter(mac);
}

ActionAnalyzer.prototype.insert_screen_action_ = function(action, timestamp_start) {
    var ts = this.project_.AddTourstop(action.title, get_default_tourstop_style());

    var mac = this.project_.CreateMacro("screen_page");
    var time = action.timestamp + "";
    mac.SetParam("timestamp", time);
    mac.SetParam("new_step", action.title);
    
    var scr_dump = this.fetch_screen_(action);

    if (!scr_dump) return;

    var res = mac.GetResource();
    var subres = res.CreateSubResource("dump_page");
    scr_dump.SetResource(subres);
    mac.SetObjectParam("dump_page", scr_dump);
    scr_dump.Save();
    //var time = action.timestamp - timestamp_start;
    //var name = (IMAGE_NAME + time).slice(-IMG_NAME_LEN);
    //var fname = this.base_dir_  + "\screens_video\\"+ name + ".png";
    //scr_dump.SaveToFile(fname);

    mac.SetParam("rect", action.rect);
    mac.SetParam("mouse_pos", action.pos);
    if (action.executable != "" && mac.HasParam("executable")) {
        mac.SetParam("executable", action.executable);
    }

    this.project_.InsertEventAfter(mac);
}

ActionAnalyzer.prototype.insert_mouse_move_action_ = function(action) {
    var mac = this.project_.CreateMacro("mouse_move");
    var mouse_pos = CreatePoint(action.position.x, action.position.y);
    var cursor_hotspot_pos = CreatePoint(action.hotspot.x, action.hotspot.y);

    var time = action.timestamp + "";
    mac.SetParam("timestamp", time);
    mac.SetParam("mouse_pos", mouse_pos);
    mac.SetParam("hotspot_pos", cursor_hotspot_pos);
    mac.SetParam("cursor_id", action.cursor_id);

    // create image of the cursor icon
    var fname = this.base_dir_ + "\screens\\" + action.cursor_id + ".png";
    img = CreateImage(fname);
    var scr_dump = CreateScreendumpFromBitmap(img);

    if (!scr_dump) return;

    var res = mac.GetResource();
    var subres = res.CreateSubResource("dump_page");
    scr_dump.SetResource(subres);
    mac.SetObjectParam("dump_page", scr_dump);
    scr_dump.SaveCursorIcon();

    this.project_.InsertEventAfter(mac);
}

ActionAnalyzer.prototype.ConvertRawProject = function(Project, Settings) {
    sa_logger.Write(0, "ActionAnalyzer::ConvertRawProject", "", "");
    this.project_ = Project; // this.project_ contains the original project with the stream of QR data.
    var total = this.convert_macs_to_actions_();
    if (total < 1) {
        sa_logger.DeWrite(0);
        alert("Number of Actions = " + total + ".\nOriginal Project has no mouse or keyboard actions, or it is not a QR debug project.");
        return;
    }
    if (CreateProject(this.project_.ClonedName, 
            "standard", "" + this.project_.Language, this.project_.UID)) 
    {
        //this.project_ = Project;
        load_project_dictionary();
        Project.StartRecording(""); // Project is the newly created project

        AutoEngine.DisableGUIUpdates();
        this.scr_rect_ = Settings.Rect;
        this.analyze_actions_(total);
        AutoEngine.EnableGUIUpdates();

        Project.StopRecording();
        Project.SetCreator();
        Project.Generate();
        Project.SaveProject();
    }
    sa_logger.DeWrite(0);
}

ActionAnalyzer.prototype.convert_macs_to_actions_ = function() {
    sa_logger.Write(1, "ActionAnalyzer::convert_macs_to_actions_", "", "");
    var total = 0;
    this.actions_ = [];

    this.progress_ = CreateProgressDlg();
    this.progress_.ProgressCancable(true);
    this.progress_.ProgressStepsBegin(Translate('collect_actions'), this.project_.NumTourstops());
    var first_screen = true;
    for (var pos = 0; pos < this.project_.NumTourstops(); pos++) {
        if (this.progress_.GetCancelled()) {
            break;
        }

        var ts = this.project_.GetTourstop(pos);
        var mac = ts.NextMacro();

        while (mac != null) {
            var action = this.convert_mac_to_action_(mac);

            if (action.action_type == ActionType.MOUSE_ACTION ||
                action.action_type == ActionType.KEYBOARD_ACTION) {
                total += 1;
            }
            if (first_screen && action.action_type == ActionType.SCREEN) {
                this.initial_timestamp = action.timestamp;
                first_screen = false;
            }

            this.actions_.push(action);
            mac = ts.NextMacro(mac.TourPosition());
        }
        this.progress_.ProgressStep();
    }
    this.progress_.ProgressEnd();
    this.print_actions_();
    log("ACTIONS: " + this.actions_.length);
    //log("SCREENS: " + screens.length);
    sa_logger.DeWrite(1);
    return total;
}

ActionAnalyzer.prototype.convert_mac_to_action_ = function(mac) {
    sa_logger.Write(2, "ActionAnalyzer::convert_mac_to_action_", "", "");
    var action = {mods : {}};

    if (mac.HasParam("timestamp")) {
        action.timestamp = mac.GetParam("timestamp") - 0;
    }

    if (mac.Template() == "screen_page") {
        action.action_type = ActionType.SCREEN;
        action.mac = mac; //to fetch the screen dump
        action.title = mac.GetParam("new_step");
        action.rect = mac.GetParam("rect");
        action.executable = mac.GetParam("executable");
        action.pos = mac.GetParam("mouse_pos");

    } else if (mac.Template() == "mouse_action") {
        action.action_type = ActionType.MOUSE_ACTION;

        action.mods.ctrl = mac.GetParam("ctrl_key");
        action.mods.alt = mac.GetParam("alt_key");
        action.mods.shift = mac.GetParam("shift_key");
        
        action.click_type = mac.GetParam("action");
        action.pt = mac.GetParam("click_pos");
        action.rotation = mac.GetParam("click_count");
        action.rc = CreateRect(action.pt.x - 150, action.pt.y - 100, action.pt.x + 150, action.pt.y + 100);

    } else if (mac.Template() == "kbd_action") {
        action.action_type = ActionType.KEYBOARD_ACTION;

        action.mods.ctrl = mac.GetParam("ctrl_key");
        action.mods.alt = mac.GetParam("alt_key");
        action.mods.shift = mac.GetParam("shift_key");

        action.key_code = mac.GetParam("key_code");
        action.key_name = KeyUtils.KeyName(action.key_code);
    } else if (mac.Template() === "mouse_move") {
        action.action_type = ActionType.MOUSE_MOVE;
        action.mac = mac; //to fetch the cursor_id
        action.cursor_id = mac.GetParam("cursor_id");
        action.position = mac.GetParam("mouse_pos");
        action.hotspot = mac.GetParam("hotspot_pos");
    }
    sa_logger.DeWrite(2);
    return action;
}

ActionAnalyzer.prototype.SetRTL = function(is_rtl) {
    this.is_rtl_ = is_rtl;
}
