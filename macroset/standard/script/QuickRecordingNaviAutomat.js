#use(macroset!standard:script/ActionAnalyzerNavi.js)

var act_type  = {
    "GENERAL_ACT"       : 1,
    "MOUSE_ACT"         : 2,
    "KEYBOARD_ACT"      : 3
};

var act_subtype  = {
    "STOP"                  :  1,
    "RECORD"                :  2,
    "PAUSE"                 :  3,
    "CLOSE"                 :  4,
    "CHOOSE_APP"            :  5,
    "OPTIONS"               :  6,
    "TOGGLE_CLICKBLOCK"     :  8,
    "EDIT_INFO"             : 10,
    "RERECORD"              : 15,
    "MINIMIZE"              : 16, 
    "NEW_PAGE"              : 20, 
    "EXPLANATION"           : 21, 
    "EXPLANATION_END"       : 22, 
    "SCREEN_PREVIEW"        : 35,
    "UNDO"                  : 37
};

var sa_logger = null;

var QUICK_RECORDING = "QuickRecording";
var QUICK = 3;
var NON_FGROUND_WINS = [
    "dgoEffectWindow",
    "dgoBubbleWindow",
    "dgoMiniBubble",
    "dgoMouseTip",
    "Afx:00480000:1803",
    "tooltips_class32",
    "VBBubble",
    "_sdm_Mso96",
    "MSCTFIME UI",
    "IME",
    "OfficeTooltip",
    "WorkerW",
    "ComboLBox",
    "THintWindow",
    "InternetToolbarHost",
    "Shell_TrayWnd",
    "AS_WindowTransition", // window transition in MSWord during screenshotting in QR
    "MSO_BORDEREFFECT_WINDOW_CLASS",// border in MSWord during screenshotting in QR
    "WAModeWin"
];

function QuickRecordingNaviAutomat() {
    
}

QuickRecordingNaviAutomat.prototype.continue_loop_ = false;
//QuickRecordingNaviAutomat.prototype.hotkey_command = null; //TODO
QuickRecordingNaviAutomat.prototype.actions_ = [];
QuickRecordingNaviAutomat.prototype.action_analyzer_ = null;
QuickRecordingNaviAutomat.prototype.skip_drop_ = false;
QuickRecordingNaviAutomat.prototype.black_keys_ = [];
QuickRecordingNaviAutomat.prototype.is_foreground_ = false;
QuickRecordingNaviAutomat.prototype.windows_stack_ = null;
QuickRecordingNaviAutomat.prototype.params_ = {};
QuickRecordingNaviAutomat.prototype.base_dir_ = "";
QuickRecordingNaviAutomat.prototype.project_ = null;
QuickRecordingNaviAutomat.prototype.result_ = {success: false};
QuickRecordingNaviAutomat.prototype.lang_set_ = [];


QuickRecordingNaviAutomat.prototype.fix_lang_item_ = function(it) {
    var res = it;

    res = res.replace( "[B_NAME_ICON]", " <b>$#{fieldname}&nbsp;$I{fieldicon}</b> "  );
    res = res.replace( "[B_ICON_NAME]", " <b>$#{fieldname}&nbsp;$I{fieldicon}</b> ");
    res = res.replace( "[B_TCODE]"    , " <b>$#{transaction_code}</b> "              );
    res = res.replace( "[B_HOTKEY]"   , " <b>$#{key_desc}</b> "                        );
    res = res.replace( "[B_KEY]"      , " <b>$#{key_desc}</b> "                      );
    res = res.replace( "[B_INPUT]"    , " <b>$#{text_d}</b> "                        );
    res = res.replace( "[INPUT]"    , " $#{text_d} "                        );
    res = res.replace( "[B_SELECTED]" , " <b>$#{choose_text}</b> "                   );
    res = res.replace( "[NAME]"       , " $#{fieldname} "                            );
    res = res.replace( "[B_NAME]"     , " <b>$#{fieldname}</b> "                     );
    res = res.replace( "[ICON]"       , " $I{fieldicon} "                           );
    res = res.replace( "[B_ICON]"     , " $I{fieldicon} "                           );
    res = res.replace( /  +/g         , " "                                         );
    res = res.replace( "} ."          , "}."                                        );
    res = res.replace( " \."           , "."                                        );

    return res;
}

QuickRecordingNaviAutomat.prototype.init_lang_table_ = function(lang_id) {
    lang_tbl = LoadRecordGlossary(_W("record_glossary!standard"), lang_id);

    for (var it in lang_tbl) {
        lang_tbl[it] = this.fix_lang_item_(lang_tbl[it]);
    }
}

QuickRecordingNaviAutomat.prototype.Start = function(params, logger, project, base_dir, lang_set, doc_path, video_path, mode) {
    sa_logger = logger;
    
    sa_logger.Write(0, "QuickRecordingNaviAutomat::Start", "", "");
    
    this.lang_set_ = lang_set;

    this.params_ = params;
    this.scr_rect_ = params.area;
    this.base_dir_ = base_dir;
    this.project_ = project;
    this.action_analyzer_ = new ActionAnalyzerNavi(this, project, base_dir);
    this.action_analyzer_.SetRTL(IsRTL(this.params_.language));
    this.doc_path_ = doc_path;
    this.video_path_ = video_path;
    this.rec_mode_ = mode;
    this.init_members_();

    this.action_queue_ = NavPlayer.GetActionQueue();
    this.action_queue_.Flush();

    this.windows_stack_.Flush();
    if (!winnavp_da.qr_bother_) {
        var result = ShowQRHintDlg(params.language, false, false, "wa!" + params.wa_id + ":glossary!standard", params.is_da);
        winnavp_da.qr_bother_ = result.dont_bother;
        winnavp_appdata.Save();
    }
    
    SetQuickRecCursor();
    //this.hotkey_command = new hotkeycommands(); //TODO
    //this.hotkey_command.initialize_keymap(); //TODO
    
    this.record_();
    this.Loop();
    sa_logger.DeWrite(0);
    
    params.project_title = this.result_.project_title;
    
    return this.result_.success;
}

QuickRecordingNaviAutomat.prototype.SetContinueLoop = function(status) {
    this.continue_loop_ = status;
}

QuickRecordingNaviAutomat.prototype.clean_ = function() {
    sa_logger.Write(3, "QuickRecordingNaviAutomat::clean_", "", "");
    this.actions_ = [];
    this.last_ctrl_ = null;
    this.current_action_ = null;
    this.continue_loop_ = false;
    this.skip_drop_ = false;

    sa_logger.DeWrite(3);
}

QuickRecordingNaviAutomat.prototype.init_members_ = function() {
    sa_logger.Write(3, "QuickRecordingNaviAutomat::init_members_", "", "");

    this.windows_stack_ = CreateAutomationWins();
    this.clean_();

    this.action_queue_ = null;
    this.wa_rect_ = GetWARect();
    
    this.init_black_keys_();
    
    sa_logger.DeWrite(3);
}

QuickRecordingNaviAutomat.prototype.init_black_keys_ = function() {
    var end_key_data  = {
        keycode : KeyUtils.KeyCode("end"), 
        ctrl : false, 
        alt : false, 
        shift : false
    };
    
    this.black_keys_ = [];
    this.black_keys_.push(end_key_data);
}

QuickRecordingNaviAutomat.prototype.close_ = function() {
    RestoreMouseCursor();
    StopQuickRecorder();
    FrameCapturer.Cleanup();
    HideGrayLayer();
    Hook.Enable(HOOK_OUTOFPROC);
}

                
QuickRecordingNaviAutomat.prototype.Loop = function() {
    sa_logger.Write(3, "QuickRecordingNaviAutomat::loop_", "", "");

    do {
        sa_logger.Log(3, "QuickRecordingNaviAutomat::loop_ - Get next action", "", "");

        this.current_action_ = this.action_queue_.Front();
        this.action_queue_.Pop();
        sa_logger.Log(2, "QuickRecordingNaviAutomat::loop_ - action type: " + this.current_action_.type, "", "");

        if (this.current_action_.type == act_type["GENERAL_ACT"]) {
            sa_logger.Log(2, "QuickRecordingNaviAutomat::loop_ - GENERAL_ACT - subtype:" + this.current_action_.subtype, "", "");

            if (this.current_action_.subtype == act_subtype["STOP"]) {
                sa_logger.Log(2, "QuickRecordingNaviAutomat::loop_ - STOP", "", "");
                this.stop_();
                break;
            } else if (this.current_action_.subtype == act_subtype["CLOSE"]) {
                sa_logger.Log(3, "QuickRecordingNaviAutomat::loop_ - CLOSE", "", "");
                this.close_();
                break;
            } else if (this.current_action_.subtype == act_subtype["RECORD"]) {
                sa_logger.Log(2, "QuickRecordingNaviAutomat::loop_ - RECORD", "", "");
                this.record_();
            } else if (this.current_action_.subtype == act_subtype["PAUSE"]) {
                sa_logger.Log(2, "QuickRecordingNaviAutomat::loop_ - PAUSE", "", "");
                break;
            } else if (this.current_action_.subtype == act_subtype["TOGGLE_PAUSE"]) {

            }
        } else if (this.current_action_.type == act_type["MOUSE_ACT"]) {
            sa_logger.Log(2, "QuickRecordingNaviAutomat::loop_ - Mouse Action: " + this.current_action_.click_type, "", "");
            if (this.check_mouse_action_()) {
                this.handle_action_();
            }
        } else if (this.current_action_.type == act_type["KEYBOARD_ACT"]) {
            var key_name = KeyUtils.KeyName(this.current_action_.key_code);
            sa_logger.Log(0, "QuickRecordingNaviAutomat::loop_ - Key Action", "", "" + key_name);
            //if (this.hotkey_command.validate(this.current_action_, this)) { //TODO
            //    return;
            //} else { 
            if (key_name == "end") {
                this.stop_();
                break;
            } else {
                this.handle_action_();
            }
            //}
        }

        GarbageCollect();
    } while (1);

    GarbageCollect();
    
    sa_logger.DeWrite(3);
}

QuickRecordingNaviAutomat.prototype.is_drag_ = function(action) {
    return (action.click_type == "drag" || action.click_type == "rdrag");
}

QuickRecordingNaviAutomat.prototype.is_drop_ = function(action) {
    return (action.click_type == "drop" || action.click_type == "rdrop");
}

QuickRecordingNaviAutomat.prototype.check_mouse_action_ = function() {

    if (this.is_drag_(this.current_action_)) {
        if (!this.scr_rect_.PtInRect(this.current_action_.x, this.current_action_.y)) {
            this.skip_drop_ = true;
            return false;
        }
    } else if (this.is_drop_(this.current_action_) && this.skip_drop_) {
        this.skip_drop_ = false;
        return false;
    }

    if (!this.is_drag_(this.current_action_) &&
        !this.is_drop_(this.current_action_) &&
        this.current_action_.click_type != "enter")
    {
        var is_in_area = this.scr_rect_.PtInRect(this.current_action_.x, this.current_action_.y);

        if (is_in_area) {
            this.windows_stack_.Push(this.current_action_);
            return true;
        } else {
            return false;
        }
    }
    return true;
}

QuickRecordingNaviAutomat.prototype.handle_action_ = function() {
    sa_logger.Write(3, "QuickRecordingNaviAutomat::handle_action_", "", "");
    if (this.current_action_.type == act_type["MOUSE_ACT"]) {
        if (this.scr_rect_.PtInRect(this.current_action_.x, this.current_action_.y)) {
            this.current_action_.x -= this.scr_rect_.left;
            this.current_action_.y -= this.scr_rect_.top;
            this.actions_.push(new UserAction(ActionType.MOUSE_ACTION, this.current_action_));      
        }
    } else if (this.current_action_.type == act_type["KEYBOARD_ACT"]) {
        var key_name = KeyUtils.KeyName(this.current_action_.key_code);
        if (key_name !== "pause") this.actions_.push(new UserAction(ActionType.KEYBOARD_ACTION, this.current_action_));
    }

    sa_logger.DeWrite(3);
}

QuickRecordingNaviAutomat.prototype.record_ = function() {
    sa_logger.Write(2, "QuickRecordingNaviAutomat::record_", "", "");
    
    this.prepare_record_();
    
    this.SetContinueLoop(true);

    sa_logger.DeWrite(2);
}

QuickRecordingNaviAutomat.prototype.IsForegroundMode = function() {
    return this.is_foreground_;
}

QuickRecordingNaviAutomat.prototype.stop_ = function() {
    sa_logger.Write(0, "QuickRecordingNaviAutomat::stop_", "", "");
    this.result_ = {success: false};
    Sleep(500);
    RestoreMouseCursor();
    HideGrayLayer();
    StopQuickRecorder();

    FrameCapturer.Stop(IsRTL(this.params_.language));
    
    var glossary_path = "wa!" + this.params_.wa_id + ":glossary!navigator";
    
    var res = ShowQRLangDlg(glossary_path, this.params_.language, this.lang_set_, this.doc_path_, this.video_path_, this.rec_mode_);
    
    if (res.success) {
        this.result_.success = true;
        this.result_.project_title = res.project_title;
        this.result_.project_lang = res.language;
        
        this.init_lang_table_(res.language);
        this.project_.Language = res.language;
        this.project_.DisplayName = res.project_title;
        
        this.action_analyzer_.AnalyzeActions(this.actions_, this.scr_rect_, false, this.params_.record_video);
        
        this.action_analyzer_.do_post_crop_();

        this.clean_();
    } else {
        DeleteDirTree(this.doc_path_ + this.project_.UID);
    }
    
    OpTrackerGetOperationTree(0);

    FrameCapturer.Cleanup();
    Hook.Enable(HOOK_OUTOFPROC);
    
    sa_logger.DeWrite(0);
}

QuickRecordingNaviAutomat.prototype.prepare_record_ = function() {
    ShowGrayLayer(this.scr_rect_, true, 40, true);

    Hook.Enable(HOOK_OUTOFPROC);
    var manager_hwnd = FrameCapturer.StartScreensManager(this.base_dir_ + "\\screens\\", this.IsForegroundMode(), this.scr_rect_);
    StartQuickRecorder(this.black_keys_, this.IsForegroundMode(), manager_hwnd);

    FrameCapturer.SetRect(this.scr_rect_);
    FrameCapturer.SetNonForegroundWins(NON_FGROUND_WINS);
    var use_dxgi = true;
    FrameCapturer.UseDxgiScreenshotMethod(use_dxgi);
    //FrameCapturer.ChangeDisplaySettings();
    FrameCapturer.Start(this.base_dir_ + "\\screens\\", false);
}

