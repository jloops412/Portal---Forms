#use(macroset!standard:script/automation_interface.js)

var OP_SUCCESS                  = 0;
var ERR_NAV_WRONG_STATE         = 1;
var ERR_REREC_TYPE_MISMATCH     = 2;
var ERR_REREC_CTRL_NOT_FOUND    = 3;
var ERR_REREC_WRONG_APPLICATION = 4;
var ERR_REREC_UNSUPPORTED_CTRL  = 5;
var ERR_REREC_EMPTY_ACTION = 6;

function start_test_engine(profile, pa_project, delay, steps, filename) {

    automation_mode = TESTING_MODE;

    if (pa_project && !steps) {
        function CollectSteps(pa) {
            var wa_proj = WA.GetObject(pa);
            log("Loading PA Project " + wa_proj.Caption);
            var prj = wa_proj.Open(false);
            var steps = [];

            for (var i = 0; i < prj.NumTourstops(); i++) {
                var ns = prj.GetTourstop(i);
                var mac = ns.NextMacro();
                
                while (mac != null) {
                    if (mac.Template() == "step") {
                        steps.push(mac.GetParam("uid"));
                    }
                    mac = ns.NextMacro(mac.TourPosition());
                }
            }

            log("Number of Steps: " + steps.length);
            /*for (var i = 0; i < steps.length; i++) {
                log("" + steps[i]);
            }*/
            return steps;
        }

        steps = CollectSteps(pa_project);
    }

    if (!delay) {
        delay = 1000;
    }

    if (!pa_project) { // rerec only mode
        Hook.Enable(HOOK_OUTOFPROC);
        Hook.EnableTestingMode(true);
    }
    new TestingAutomat().Start(steps, profile, delay, filename);


    sa_logger.DeWrite(0);
}



function TestingOverride(par) {
    this.parent_ = par;
}

TestingOverride.prototype.parent_ = null;
TestingOverride.prototype.prev_type_ = "";
TestingOverride.prototype.re_recording_infos_txt_ = "";

TestingOverride.prototype.ReportError = function(err) {
    NavPlayer.SetErrorCode(err, this.parent_.get_trace_(NavPlayer.GetStep()));
    this.parent_.stop_();
    return false; //!!!
}

TestingOverride.prototype.AppendText = function (txt) {
    this.re_recording_infos_txt_ = this.re_recording_infos_txt_ + txt + "\n";
}
TestingOverride.prototype.execute_step_ = function() {
    var action = get_keyaction('roll'); //the hotkey setting for the DA should be updated accordingly
    action.ctrl = true;
    action.alt = true;     
    execute_keyboard_action(action);
}

TestingOverride.prototype.write_info_details_ = function (ts_caption, mac, matchval_info) {

    this.AppendText("<NextControl Caption = '" + ts_caption + "' mac.id = '" + mac.GetParam("uid") + "' > ");
    this.AppendText("<MacroInfoDetails >");
    var mac_info_type = mac.GetParam("element_type");
    this.AppendText("<type = '" + mac_info_type + "' />" );
    var mac_fieldname;
    if (mac.HasParam("fieldname")) {
        mac_fieldname = mac.GetParam("fieldname");
        this.AppendText("<fieldname = '" + mac_fieldname + "' />" );
    }
    var mac_method;
    if (mac.HasParam("rec_method")) {
        mac_method = mac.GetParam("rec_method");
        this.AppendText("<method: '" + mac_method + "' />" );
    }
    var ctrl_rect = mac.GetParam("ctl_rect");
    this.AppendText("<ctrl_rect = left: '" + ctrl_rect.left + "' right: '" + ctrl_rect.right + "' top: '" + ctrl_rect.top + "' bottom: '" + ctrl_rect.bottom + "' />");
    //var page_key = mac.GetParam("key");
    var mac_path = mac.GetParam("elem_key");
    this.AppendText("<PATH > \n" + mac_path + " \n </PATH>");
    this.AppendText("</MacroInfoDetails >");

    // ------------------------ rerecorded info ------------------------ //
    this.AppendText("<RE-recognizedInfoDetails />");
    if (matchval_info != null) {
        var type = matchval_info.GetProperty(info_attributes["TYPE"]);
        var fieldname = matchval_info.GetProperty(info_attributes["FIELDNAME"]);
        var method = matchval_info.RecMethod;
        var rere_ctrl_rect = matchval_info.GetRect();
        var path = matchval_info.Key;

        if (mac_method != method) {
            this.AppendText("<Method = '" + method + "' />");
            this.AppendText("<Warning 'ERR_REREC_RECOGNITION_METHOD_MISSMATCH' /> ");
        }
        if (mac_info_type != type) {
            this.AppendText("<type = '" + type + "' />");
            this.AppendText("< Warning 'ERR_REREC_TYPE_MISMATCH' />");
        }
        if (mac_fieldname != fieldname) {
            this.AppendText("<FIELDNAME = '" + fieldname + "' />");
            this.AppendText("< Warning  'ERR_REREC_FIELDNAME_MISSMATCH' /> ");
        }
        if (mac_path != path) {
            this.AppendText("<PATH> \n" + path + "\n </PATH>");
            this.AppendText("< Warning 'ERR_REREC_PATH_MISSMATCH' /> ");
        }
        if (ctrl_rect.left != rere_ctrl_rect.left || ctrl_rect.top != rere_ctrl_rect.top) {
            this.AppendText("<ctrl_rect = left: '" + rere_ctrl_rect.left + "'  right: '" + rere_ctrl_rect.right + "' top: '" + rere_ctrl_rect.top + "' bottom: '" + rere_ctrl_rect.bottom + "' />");
            this.AppendText("< Warning 'ERR_REREC_RECTANGLE_MISSMATCH' /> ");
        }
    } else {
        //log("ERROR: control " + mac.GetParam("uid") + " NOT re recognized, Aboarting process ...");
        this.AppendText("< ERROR = 'Error: control is not rerecognized ' /> ");
    }
    //this.AppendText("</RE-recognizedInfoDetails >");
    this.AppendText("</NextControl >");
}
TestingOverride.prototype.rerecord_ctrl_macro_ = function(ts, mac, retry) {
    var mouse_wheel = false;

    this.parent_.entered_once_ = false;

    if (mac.HasParam("element_type") && mac.HasParam("screenshot_rect")) {

        var action = this.parent_.init_action_(mac);
        if (action == null) {
            return this.ReportError(ERR_REREC_EMPTY_ACTION);
        }

        var matchval = { info:null, type_match:"mismatch" };

        if (this.parent_.execute_macro_ || is_explanation(mac)) {
            if (!is_manual(mac)) {
                this.parent_.update_hotspot_(mac);
            }
            
            this.parent_.execute_macro_ = false;

            if (!this.parent_.CheckState()) {
                return this.ReportError(ERR_NAV_WRONG_STATE);
            }

            this.execute_step_();

            this.parent_.play_macro_(mac, info_from_macro(mac), action);
            return true;
        } else if (is_hotspot(mac) && !is_manual(mac) && !this.parent_.is_quick_recorder_project_) {

            this.parent_.update_hotspot_(mac);

            if (cfg.standard.winrerec.handle_hotspot == HANDLE_HOTSPOT_WYSIWYG) {
                return this.ReportError(ERR_REREC_UNSUPPORTED_CTRL);
            } else {
                this.parent_.execute_macro_ = false;

                if (!this.parent_.CheckState()) {
                    return this.ReportError(ERR_NAV_WRONG_STATE);
                }

                this.parent_.play_macro_(mac, info_from_macro(mac), action);
                return true;
            }
        } else if (is_mouse_wheel(mac)) {
			mouse_wheel = true;
		} else {
            if (is_drop(action) && !cfg.standard.winrec.analyze_on_drop) {
                matchval = { info: info_from_macro(mac), type_match: "match" };
            } else if (is_manual(mac) || (is_dropdwon_mac(mac) && cfg.standard.winrerec.interactive_at_dropdown)) {
                return this.ReportError(ERR_REREC_UNSUPPORTED_CTRL);
            } else {
                matchval = this.parent_.get_matching_info_(ts, mac, action);
            }
        }

        if (mouse_wheel || (matchval.info != null && matchval.type_match == "match")) {
            var curr_type = mac.GetParam("element_type");

            if (this.filename_!== "") {
                this.write_info_details_(ts.Caption, mac, matchval.info);
            }
            if (!(this.prev_type_ == "WINButtonCombo" && curr_type == "WINCBListItem")) {
                if (!this.parent_.CheckState()) {
                    return this.ReportError(ERR_NAV_WRONG_STATE);
                }
            }
            this.prev_type_ = curr_type;
            this.parent_.process_macro_(mac, matchval.info, action, true);
        } else {
            // retry
            if (!matchval.info && retry !== true) {
                log("WARNING: control " + mac.GetParam("uid") + " NOT found! Retrying one more time!");
                this.parent_.sleep_(mac);
                return this.rerecord_ctrl_macro_(ts, mac, true);
            }
            if (this.filename_ !== "") {
                this.write_info_details_(ts.Caption, mac, matchval.info);
            }
            return this.ReportError(matchval.info ? ERR_REREC_TYPE_MISMATCH : ERR_REREC_CTRL_NOT_FOUND);
        }

        this.parent_.sleep_(mac);
    }

    return true;
}


function TestingAutomat() {
}

TestingAutomat.prototype = new ReRecordingBase;
TestingAutomat.superClass = ReRecordingBase.prototype;
TestingAutomat.prototype.delay_ = 1000;

TestingAutomat.prototype.rerecord_keypress_ = function (mac) {

    if (!this.CheckState()) {
        return this.automat_.ReportError(ERR_NAV_WRONG_STATE);
    }

    ReRecordingBase.prototype.rerecord_keypress_.call(this, mac);
    return true;
}

TestingAutomat.prototype.sleep_ = function (mac) {
    ReRecordingBase.prototype.sleep_.call(this, mac);
    Sleep(this.delay_);
}

TestingAutomat.prototype.rerecord_ = function () {
    ReRecordingBase.prototype.rerecord_.call(this);
    return true; //!!!
}

TestingAutomat.prototype.HookDisable = function () {
    //do nothing
}

TestingAutomat.prototype.HookEnable = function (mode) {
    //do nothing
}

TestingAutomat.prototype.stop_callback_ = function () {
    if (this.filename_ !== "") {
        var txt = this.automat_.re_recording_infos_txt_;
        WriteFile(this.filename_, txt);
    }
    //do nothing
}

TestingAutomat.prototype.save_project_ = function() {
    //do nothing
}

TestingAutomat.prototype.check_conformity_ = function () {
    return true; //assume application is correct: otherwise either navigator or testing_automat will still give an error
}

TestingAutomat.prototype.update_edit_macro_ = function (mac, info, action, type, do_update) {
    ReRecordingBase.prototype.update_edit_macro_.call(this, mac, info, action, type, do_update);

    if (!this.action_executed_ && mac.HasParam("confirmation_key")) {
        log('Injecting Tab');
        var action = get_keyaction('tab');
        execute_keyboard_action(action);
    }
}

TestingAutomat.prototype.check_executable_callback_ = function (params) {
    if (this.check_executable_() == WRONG_EXECUTABLE) {
        NavPlayer.SetErrorCode(ERR_REREC_WRONG_APPLICATION, this.get_trace_(NavPlayer.GetStep()));
        this.stop_();
        return false;
    }

    return true;
}

TestingAutomat.prototype.check_executable_ = function () {
    var curr_exec = this.windows_stack_.GetExecutable();

    if (this.tourstops_.length == 0) {
        this.fill_buffer_(true);
    }

    for (var ti = this.ti_; ti < this.tourstops_.length; ti++) {
        var ts = this.tourstops_[ti];

        for (var mi = 0; mi < ts.macro_num(); mi++) {
            var mac = ts.get_macro(mi);

            if (mac.Template() == "new_page") {
                var orig_exec = mac.GetParam("executable");
                if (!this.executables_match_(curr_exec, orig_exec)) {
                    return WRONG_EXECUTABLE;
                }
                return OK;
            }
        }
    }

    return OK;
}


TestingAutomat.prototype.CheckState = function () {
    if (!this.states_) {
        return true;
    }

    var state = NavPlayer.GetStep();

    log(this.get_trace_(state));

    if (this.state_ind_ < this.states_.length && this.states_[this.state_ind_] == state) {
        this.state_ind_++;
        return true;
    }

    log('State Mismatch');
    return false;
}

TestingAutomat.prototype.get_trace_ = function(nav_state) {
    var rec_state = this.curr_macro_ ? this.curr_macro_.GetParam('uid') : '';

    var str = rec_state ? ("Recorder State: " + rec_state + '\n') : '';

    if (!this.states_) {
        return str;
    }

    str += "Navigator State: " + nav_state + '\n';
    str += "State Machine - Current Index: " + this.state_ind_ + '\n';

    for (var i = 0; i < this.states_.length; i++) {
        str += (this.state_ind_ == i) ? "-->" : "      ";
        str += this.states_[i] + '\n';
    }

    return str;
}

TestingAutomat.prototype.select_application_callback_ = function (mode) {
    this.rerecord_selected_ = false;
    this.rerecord_from_ = false;
   
    this.windows_stack_.PushForeground();
    this.windows_stack_.BringToForeground();

    var params = {
        hwnd:  this.windows_stack_.Hwnd(), 
        config_file: this.default_config_file_, 
        revise_values: false, 
        language: Project.Language, 
        clone_project: false
    };

    if (!this.init_producer_(SA_RERECORDING_MODE, params)) {
        return false;
    }

    return true; //!!!
}

var fake_cfg = {
    'standard': {
        'winrerec' : { 
            'lang_dep_type' :  false,
            'keep_bubble_or' : false, 
            'always_wait' : false, 
            'wait' : 2000, 
            'wysiwyg_bubble' : 0, 
            'crop_mode' : 0
        }, 
        'winrec' : {
            'atomize_scroll_buttons' : true, 
            'input_confirm_tab' : false, 
            'input_confirm_enter' : false, 
            'practice_bubble_at_element' : false,
            'insert_inactive_edit_macros' : false 
        }
    }
}

TestingAutomat.prototype.Start = function (states, profile, delay, filename) {
    log("Starting Testing Automat: " + Project.UID);

    this.states_ = states;
    this.state_ind_ = 0;
    this.default_config_file_ = profile;
    this.delay_ = delay;

    this.filename_ = filename;
    cfg = cfg || fake_cfg;

    ReRecordingBase.prototype.Start.call(this, 0);
    this.bar_.Close();

    return true;
}

TestingAutomat.prototype.set_automat_ = function(interactive) { 
    this.automat_ = new TestingOverride(this);
}
