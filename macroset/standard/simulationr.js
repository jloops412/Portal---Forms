var MacroDefaults={Globals:{'g_linktextpraxis': {t: 'TEXT', v: '<img src="skin:next_red.int.gif" border=0 >'},'g_show_step_bubble': {t: 'BOOL_0_1', v: 0},'g_bydesign_playback': {t: 'BOOL_0_1', v: 0},'g_show_mouse': {t: 'BOOL_0_1', v: 1},'g_show_mouse_dur': {t: 'INTEGER', v: 1900},'g_handle_wheel_error': {t: 'BOOL_0_1', v: 0},'g_highlight_border': {t: 'ENUM', v: '4'},'g_highlight_rgb': {t: 'COLOR', v: '0FAAFF'},'g_highlight_help_rgb': {t: 'COLOR', v: '#17B01C'},'g_highlight_form_correct_rgb': {t: 'COLOR', v: 'FFFF00'},'g_highlight_type': {t: 'ENUM', v: 'rect'},'g_highlight_effect': {t: 'ENUM', v: 'pulsate'},'g_highlight_help_effect': {t: 'ENUM', v: 'pulsate'},'g_gm_show_highlight': {t: 'BOOL_0_1', v: 0},'g_gm_highlight_border': {t: 'ENUM', v: '2'},'g_gm_highlight_color': {t: 'COLOR', v: 'F0AB00'},'g_gm_highlight_type': {t: 'ENUM', v: 'rect'},'g_gm_highlight_effect': {t: 'ENUM', v: 'pulsate'},'g_bubblestyle_ok': {t: 'SHELF', v: 'white_island'},'g_bubblestyle_feedback': {t: 'SHELF', v: 'white_island'},'g_expl_min': {t: 'BOOL_0_1'},'g_expl_mov': {t: 'BOOL_0_1'},'g_demo_min': {t: 'BOOL_0_1'},'g_demo_mov': {t: 'BOOL_0_1'},'g_prac_min': {t: 'BOOL_0_1'},'g_prac_mov': {t: 'BOOL_0_1'},'g_conc_min': {t: 'BOOL_0_1'},'g_conc_mov': {t: 'BOOL_0_1'},'g_quiz_skipping': {t: 'BOOL_0_1'},'g_feedback_enable': {t: 'BOOL_0_1'},'g_feedback_popup': {t: 'BOOL_0_1'},'g_feedback_correct_solutions': {t: 'BOOL_0_1'},'g_feedback_pass': {t: 'HTML'},'g_feedback_fail': {t: 'HTML'},'g_feedback_time': {t: 'HTML'},'g_in_demo': {t: 'BOOL_0_1', v: 1},'g_in_practice': {t: 'BOOL_0_1', v: 1},'g_in_test': {t: 'BOOL_0_1', v: 1},'g_in_guided': {t: 'BOOL_0_1', v: 0},'g_in_pres': {t: 'BOOL_0_1', v: 0},'g_quiz_page_size': {t: 'SIZE'},'g_quiz_timeout': {t: 'INTEGER'},'g_quiz_template': {t: 'SHELF'},'g_icon_skin': {t: 'SHELF', v: 'standard'},'g_background_image_centered': {t: 'BOOL_TRUE_FALSE', v: true},'g_canvas_color': {t: 'COLOR', v: '#9f9f9f'},'g_background_color': {t: 'COLOR', v: '#9f9f9f'},'g_border': {t: 'INTEGER', v: 0},'g_border_color': {t: 'COLOR', v: '#666666'},'g_border_style': {t: 'ENUM', v: 'solid'},'g_show_ok_bubble': {t: 'BOOL_0_1', v: 1},'g_skip_ok_bubble_on_mistake': {t: 'BOOL_0_1', v: 0},'g_practice_feedback': {t: 'ENUM', v: 'standard'},'g_vm_infinite_bubble_dur': {t: 'INTEGER', v: 8},'g_vm_infinite_slide_dur': {t: 'INTEGER', v: 8},'g_vm_infinite_page_dur': {t: 'INTEGER', v: 8},'g_vm_infinite_end_page_dur': {t: 'INTEGER', v: 8}},start_unit:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'possible_points': {t: 'INTEGER', v: 0},'mastery_score': {t: 'INTEGER', v: 0},'scaling': {t: 'TEXT', v: '100%'},'app_res_time': {t: 'INTEGER', v: 500},'task_text': {t: 'HTML'},'task_text_modified': {t: 'BOOL_0_1', v: false},'task_width': {t: 'INTEGER', v: 240},'task_height': {t: 'INTEGER', v: 0},'task_orientation': {t: 'ORIENTATION_BUBBLE', v: 'NW'},'task_bgcolor': {t: 'COLOR', v: '#FFFFB7'},'in_practice': {t: 'BOOL_0_1', v: 0},'in_test': {t: 'BOOL_0_1', v: 1},'ecatt_info': {t: 'STATIC_TEXT_SHORT'},'config_templates': {t: 'TXT_TEXT_LONG'}},tts_options:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'tts_voice': {t: 'SHELF'},'tts_speed': {t: 'ENUM', v: '0'},'tts_pre_silence': {t: 'INTEGER', v: 200},'tts_use_demo_text': {t: 'BOOL_0_1', v: 0}},tts_override:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'tts_pre_silence': {t: 'INTEGER'},'tts_source': {t: 'TEXT_SHORT'}},intro_page:{'uid': {t: 'TEXT'},'caption': {t: 'TEXT'},'caption_p': {t: 'TEXT'},'caption_t': {t: 'TEXT'},'intro_text': {t: 'HTML'},'intro_text_p': {t: 'HTML'},'intro_text_t': {t: 'HTML'},'Preset': {t: 'ENUM', v: 'Gold_Reflection'},'dump_page_size': {t: 'SIZE'}},intro_page_item:{'uid': {t: 'TEXT'},'intro_text': {t: 'HTML'},'link_text': {t: 'TEXT'},'link_target': {t: 'TOURSTOP_NAME'}},new_page:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'new_step': {t: 'TEXT'},'dump_page': {t: 'PAGE', v: 'dump_page'},'dump_page_size': {t: 'SIZE'},'alt_txt': {t: 'TEXT'},'new_step_modified': {t: 'BOOL_0_1', v: 0},'qr_frames': {t: 'QR_FRAMES', v: 'qr_frames'},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'},'process_enable': {t: 'BOOL_YES_NO', v: 'yes'},'doc_heading': {t: 'BOOL_YES_NO', v: 'yes'},'imagesize': {t: 'INTEGER', v: 40},'screenshot_rect': {t: 'POSSIZE'},'screenshot_border': {t: 'INTEGER', v: 0},'element_type': {t: 'TEXT'},'executable': {t: 'TEXT'},'sc_config_file': {t: 'TEXT'},'key': {t: 'TEXT_SHORT'},'exclude_from_da': {t: 'BOOL_0_1'},'record_window_id': {t: 'INTEGER', v: 0},'context': {t: 'TEXT_SHORT'}},new_slide:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'new_step': {t: 'TEXT'},'src': {t: 'LINK'},'page_duration': {t: 'INTEGER', v: -1},'new_step_modified': {t: 'BOOL_0_1'},'in_demo': {t: 'BOOL_0_1', v: 1},'in_practice': {t: 'BOOL_0_1', v: 1},'in_test': {t: 'BOOL_0_1', v: 0},'in_prax': {t: 'BOOL_0_1', v: 0},'in_guided': {t: 'BOOL_0_1', v: 0},'in_pres': {t: 'BOOL_0_1', v: 0},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'},'process_enable': {t: 'BOOL_YES_NO', v: 'no'},'doc_heading': {t: 'BOOL_YES_NO', v: 'no'},'imagesize': {t: 'INTEGER', v: 40},'screenshot_rect': {t: 'POSSIZE'},'screenshot_border': {t: 'INTEGER', v: 0}},imported_page:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'new_step': {t: 'TEXT'},'dump_page': {t: 'PAGE', v: 'dump_page'},'dump_page_size': {t: 'SIZE'},'page_duration': {t: 'INTEGER', v: 3},'new_step_modified': {t: 'BOOL_0_1'},'in_demo': {t: 'BOOL_0_1', v: 1},'in_practice': {t: 'BOOL_0_1', v: 1},'in_test': {t: 'BOOL_0_1', v: 0},'in_prax': {t: 'BOOL_0_1', v: 0},'in_guided': {t: 'BOOL_0_1', v: 0},'in_pres': {t: 'BOOL_0_1', v: 0},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'},'process_enable': {t: 'BOOL_YES_NO', v: 'yes'},'doc_heading': {t: 'BOOL_YES_NO', v: 'yes'},'imagesize': {t: 'INTEGER', v: 40},'screenshot_rect': {t: 'POSSIZE'},'screenshot_border': {t: 'INTEGER', v: 0}},new_window:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'new_step': {t: 'TEXT'},'dump_page': {t: 'PAGE', v: 'dump_page'},'new_step_modified': {t: 'BOOL_0_1', v: 0},'dump_win_relpos': {t: 'RELPOS_DOCREF'},'dump_win_left': {t: 'INTEGER'},'dump_win_top': {t: 'INTEGER'},'dump_win_width': {t: 'INTEGER'},'dump_win_height': {t: 'INTEGER'},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'},'doc_heading': {t: 'BOOL_YES_NO', v: 'yes'},'imagesize': {t: 'INTEGER', v: 40},'screenshot_rect': {t: 'POSSIZE'},'screenshot_border': {t: 'INTEGER', v: 0},'record_window_id': {t: 'INTEGER'},'element_type': {t: 'TEXT'},'rerec_manual': {t: 'BOOL_0_1'},'exec_mouse': {t: 'BOOL_0_1'}},new_window_close:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'win_relpos': {t: 'RELPOS_DOCREF'}},explanation:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'fieldname': {t: 'TEXT'},'fieldicon': {t: 'IMAGE'},'expl_like': {t: 'ENUM', v: 'default'},'explanation_d': {t: 'HTML'},'explanation_p': {t: 'HTML'},'position_h': {t: 'RELPOS_RECT'},'bubblestyle_d': {t: 'SHELF', v: 'white_island'},'b_width': {t: 'INTEGER', v: 180},'b_height': {t: 'INTEGER', v: 40},'orientation': {t: 'ORIENTATION_BUBBLE', v: 'SE'},'position_b': {t: 'RELPOS'},'b_duration': {t: 'INTEGER', v: 4},'explanation_d_modified': {t: 'BOOL_0_1'},'bubblestyle_p': {t: 'SHELF'},'b_width_p': {t: 'INTEGER', v: 180},'b_height_p': {t: 'INTEGER', v: 40},'orientation_p': {t: 'ORIENTATION_BUBBLE'},'position_bu': {t: 'RELPOS'},'b_duration_p': {t: 'INTEGER', v: 3},'explanation_p_modified': {t: 'BOOL_0_1'},'in_demo': {t: 'BOOL_0_1', v: 1},'in_practice': {t: 'BOOL_0_1', v: 1},'in_test': {t: 'BOOL_0_1', v: 0},'in_prax': {t: 'BOOL_0_1', v: 1},'show_hl_d': {t: 'BOOL_0_1', v: 1},'show_hl_p': {t: 'BOOL_0_1', v: 1},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'},'screenshot_rect': {t: 'POSSIZE'},'marker_orientation': {t: 'ENUM'}},explanation_long:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'all_like_demo': {t: 'BOOL_0_1'},'explanation_d': {t: 'HTML'},'explanation_p': {t: 'HTML'},'type': {t: 'ENUM', v: 'none'},'fieldname': {t: 'TEXT'},'fieldicon': {t: 'IMAGE'},'position_h': {t: 'RELPOS_RECT'},'bubblestyle_d': {t: 'SHELF', v: 'white_island'},'b_width': {t: 'INTEGER', v: 240},'b_height': {t: 'INTEGER', v: 160},'orientation': {t: 'ORIENTATION_BUBBLE', v: 'C'},'position_b': {t: 'RELPOS'},'b_duration': {t: 'INTEGER', v: -1},'explanation_d_modified': {t: 'BOOL_0_1', v: 1},'bubblestyle_p': {t: 'SHELF', v: 'white_island'},'b_width_p': {t: 'INTEGER', v: 180},'b_height_p': {t: 'INTEGER', v: 40},'orientation_p': {t: 'ORIENTATION_BUBBLE', v: 'C'},'position_bu': {t: 'RELPOS'},'b_duration_p': {t: 'INTEGER', v: -1},'explanation_p_modified': {t: 'BOOL_0_1', v: 1},'in_demo': {t: 'BOOL_0_1', v: 1},'in_practice': {t: 'BOOL_0_1', v: 1},'in_test': {t: 'BOOL_0_1', v: 1},'in_prax': {t: 'BOOL_0_1', v: 1},'in_guided': {t: 'BOOL_0_1', v: 0},'in_pres': {t: 'BOOL_0_1', v: 0},'show_nav_buttons': {t: 'BOOL_0_1', v: 1},'show_hl_d': {t: 'BOOL_0_1'},'show_hl_p': {t: 'BOOL_0_1'},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'},'screenshot_rect': {t: 'POSSIZE'},'marker_orientation': {t: 'ENUM'},'show_hl_doc': {t: 'BOOL_0_1', v: 1},'element_type': {t: 'TEXT', v: 'WINExplainLong'},'rerec_manual': {t: 'BOOL_0_1', v: 1},'exec_mouse': {t: 'BOOL_0_1'},'ctl_rect': {t: 'POSSIZE'}},click:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'expl_like': {t: 'ENUM', v: 'default'},'explanation_d': {t: 'HTML'},'explanation_p': {t: 'HTML'},'fieldname': {t: 'TEXT'},'fieldicon': {t: 'IMAGE'},'hotkeyV2': {t: 'KEY'},'hotkey': {t: 'TEXT'},'key_desc': {t: 'TEXT'},'action': {t: 'ENUM', v: 'lclick'},'ctrl_key': {t: 'BOOL_0_1'},'alt_key': {t: 'BOOL_0_1'},'shift_key': {t: 'BOOL_0_1'},'position_h': {t: 'RELPOS_RECT'},'bubblestyle_d': {t: 'SHELF', v: 'white_island'},'b_width': {t: 'INTEGER', v: 240},'b_height': {t: 'INTEGER', v: 160},'orientation': {t: 'ORIENTATION_BUBBLE', v: 'SE'},'position_b': {t: 'RELPOS'},'b_duration': {t: 'INTEGER', v: 4},'explanation_d_modified': {t: 'BOOL_0_1'},'bubblestyle_p': {t: 'SHELF', v: 'white_island'},'b_width_p': {t: 'INTEGER', v: 180},'b_height_p': {t: 'INTEGER', v: 40},'orientation_p': {t: 'ORIENTATION_BUBBLE', v: 'C'},'position_bu': {t: 'RELPOS'},'explanation_p_modified': {t: 'BOOL_0_1'},'show_hl_d': {t: 'BOOL_0_1', v: 1},'show_hl_p': {t: 'BOOL_0_1', v: 0},'show_bubble_d': {t: 'BOOL_0_1', v: 1},'show_bubble_p': {t: 'BOOL_0_1', v: 1},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'},'expected_result': {t: 'TEXT'},'screenshot_rect': {t: 'POSSIZE'},'marker_orientation': {t: 'ENUM'},'element_type': {t: 'TEXT'},'click_pos': {t: 'POSITION'},'click_count': {t: 'INTEGER', v: 1},'rerec_manual': {t: 'BOOL_0_1'},'exec_mouse': {t: 'BOOL_0_1'},'rec_method': {t: 'TEXT'},'elem_key': {t: 'TEXT_SHORT'},'hotspot_client_rect': {t: 'POSSIZE'},'ctl_rect': {t: 'POSSIZE'},'cursor_hand': {t: 'BOOL_0_1'},'ctl_button': {t: 'BOOL_0_1'},'ctl_tooltip': {t: 'TEXT'},'ctl_disabled': {t: 'BOOL_0_1', v: 0},'all_values': {t: 'TEXT_SHORT'},'jump_target': {t: 'TOURSTOP_NAME'}},click_SAP:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'fieldname': {t: 'TEXT'},'fieldicon': {t: 'IMAGE'},'transaction_code': {t: 'TEXT'},'expl_like': {t: 'ENUM', v: 'default'},'explanation_d': {t: 'HTML'},'explanation_p': {t: 'HTML'},'position_h': {t: 'RELPOS_RECT'},'position_tc': {t: 'RELPOS'},'show_hl_d': {t: 'BOOL_0_1', v: 1},'show_hl_p': {t: 'BOOL_0_1', v: 0},'bubblestyle_d': {t: 'SHELF', v: 'white_island'},'b_width': {t: 'INTEGER', v: 240},'b_height': {t: 'INTEGER', v: 160},'orientation': {t: 'ORIENTATION_BUBBLE', v: 'SE'},'position_b': {t: 'RELPOS'},'b_duration': {t: 'INTEGER', v: 4},'explanation_d_modified': {t: 'BOOL_0_1'},'bubblestyle_p': {t: 'SHELF', v: 'white_island'},'b_width_p': {t: 'INTEGER', v: 180},'b_height_p': {t: 'INTEGER', v: 40},'orientation_p': {t: 'ORIENTATION_BUBBLE', v: 'C'},'position_bu': {t: 'RELPOS'},'explanation_p_modified': {t: 'BOOL_0_1'},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'},'screenshot_file': {t: 'IMAGE'},'screenshot_rect': {t: 'POSSIZE'},'marker_orientation': {t: 'ENUM'},'element_type': {t: 'TEXT'},'click_pos': {t: 'POSITION'},'rerec_manual': {t: 'BOOL_0_1'},'exec_mouse': {t: 'BOOL_0_1'},'rec_method': {t: 'TEXT'},'elem_key': {t: 'TEXT_SHORT'},'jump_target': {t: 'TOURSTOP_NAME'}},key_press:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'expl_like': {t: 'ENUM', v: 'default'},'explanation_d': {t: 'HTML'},'explanation_p': {t: 'HTML'},'scan_code': {t: 'INTEGER', v: -1},'key_code': {t: 'INTEGER', v: -1},'hotkeyV2': {t: 'KEY'},'key_name': {t: 'TEXT'},'key_desc': {t: 'TEXT'},'position_h': {t: 'RELPOS_RECT'},'show_bubble_d': {t: 'BOOL_0_1', v: 1},'show_bubble_p': {t: 'BOOL_0_1', v: 1},'bubblestyle_d': {t: 'SHELF', v: 'white_island'},'b_width': {t: 'INTEGER', v: 240},'b_height': {t: 'INTEGER', v: 160},'orientation': {t: 'ORIENTATION_BUBBLE', v: 'C'},'position_b': {t: 'RELPOS'},'b_duration': {t: 'INTEGER', v: 4},'explanation_d_modified': {t: 'BOOL_0_1'},'bubblestyle_p': {t: 'SHELF', v: 'white_island'},'b_width_p': {t: 'INTEGER', v: 180},'b_height_p': {t: 'INTEGER', v: 40},'orientation_p': {t: 'ORIENTATION_BUBBLE', v: 'C'},'position_bu': {t: 'RELPOS'},'explanation_p_modified': {t: 'BOOL_0_1'},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'},'expected_result': {t: 'TEXT'},'jump_target': {t: 'TOURSTOP_NAME'}},input_text:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'expl_like': {t: 'ENUM', v: 'default'},'explanation_d': {t: 'HTML'},'explanation_p': {t: 'HTML'},'fieldname': {t: 'TEXT'},'fieldicon': {t: 'IMAGE'},'ctl_init_text': {t: 'TEXT_SHORT'},'text_d': {t: 'TEXT'},'text_full': {t: 'TEXT_SHORT'},'regexp': {t: 'TEXT'},'confirmation_tab': {t: 'BOOL_0_1', v: 1},'confirmation_enter': {t: 'BOOL_0_1'},'confirmation_blur': {t: 'BOOL_0_1'},'affirmation_button': {t: 'BOOL_0_1'},'position_h': {t: 'RELPOS_RECT'},'btn_rect': {t: 'POSSIZE'},'btn_cursor_hand': {t: 'BOOL_0_1'},'btn_is_button': {t: 'BOOL_0_1'},'position_af': {t: 'RELPOS_ELEMREF'},'check_full_text': {t: 'BOOL_0_1', v: 1},'bubblestyle_d': {t: 'SHELF', v: 'white_island'},'b_width': {t: 'INTEGER', v: 180},'b_height': {t: 'INTEGER', v: 40},'orientation': {t: 'ORIENTATION_BUBBLE', v: 'SE'},'position_b': {t: 'RELPOS'},'b_duration': {t: 'INTEGER', v: 4},'explanation_d_modified': {t: 'BOOL_0_1'},'bubblestyle_p': {t: 'SHELF', v: 'white_island'},'b_width_p': {t: 'INTEGER', v: 180},'b_height_p': {t: 'INTEGER', v: 40},'orientation_p': {t: 'ORIENTATION_BUBBLE', v: 'C'},'position_bu': {t: 'RELPOS'},'explanation_p_modified': {t: 'BOOL_0_1'},'show_hl_d': {t: 'BOOL_0_1', v: 1},'show_hl_p': {t: 'BOOL_0_1', v: 0},'show_bubble_d': {t: 'BOOL_0_1', v: 1},'show_bubble_p': {t: 'BOOL_0_1', v: 1},'set_focus': {t: 'BOOL_0_1', v: 1},'animated': {t: 'BOOL_0_1', v: 1},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'},'expected_result': {t: 'TEXT'},'ROC': {t: 'ENUM'},'description': {t: 'HTML'},'screenshot_file': {t: 'IMAGE'},'overlay_pos': {t: 'POSITION'},'screenshot_rect': {t: 'POSSIZE'},'marker_orientation': {t: 'ENUM'},'element_type': {t: 'TEXT', v: 'WINEdit'},'confirmation_key': {t: 'TEXT'},'click_pos': {t: 'POSITION'},'rerec_manual': {t: 'BOOL_0_1'},'exec_mouse': {t: 'BOOL_0_1'},'rec_method': {t: 'TEXT'},'elem_key': {t: 'TEXT_SHORT'},'ctl_rect': {t: 'POSSIZE'},'ctl_no_edit_cursor': {t: 'BOOL_0_1', v: 0},'ctl_password': {t: 'BOOL_0_1', v: 0},'is_textarea': {t: 'BOOL_0_1', v: 0},'ctl_disabled': {t: 'BOOL_0_1', v: 0},'ctl_max_len': {t: 'INTEGER', v: -1},'all_values': {t: 'TEXT_SHORT'},'ctl_text_align': {t: 'ENUM', v: '3'},'ctl_font_family': {t: 'TEXT', v: 'Arial'},'ctl_font_size': {t: 'INTEGER', v: 9},'ctl_font_bold': {t: 'BOOL_0_1', v: 0},'ctl_font_italic': {t: 'BOOL_0_1', v: 0},'ctl_font_underline': {t: 'BOOL_0_1', v: 0},'ctl_font_color': {t: 'COLOR', v: '#000000'},'ctl_bg_color': {t: 'COLOR', v: '#ffffff'},'ctl_border': {t: 'INTEGER', v: 0},'ctl_border_color': {t: 'COLOR', v: '#000000'},'ctl_border_style': {t: 'ENUM'},'padding': {t: 'INTEGER', v: 2},'jump_target': {t: 'TOURSTOP_NAME'}},select_single:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'expl_like': {t: 'ENUM', v: 'default'},'explanation_d': {t: 'HTML'},'explanation_p': {t: 'HTML'},'fieldname': {t: 'TEXT'},'fieldicon': {t: 'IMAGE'},'choose_nr': {t: 'INTEGER', v: 0},'choose_text': {t: 'TEXT'},'position_h': {t: 'RELPOS_ELEMREF'},'bubblestyle_d': {t: 'SHELF', v: 'white_island'},'b_width': {t: 'INTEGER', v: 180},'b_height': {t: 'INTEGER', v: 40},'orientation': {t: 'ORIENTATION_BUBBLE', v: 'SE'},'position_b': {t: 'RELPOS'},'b_duration': {t: 'INTEGER', v: 4},'explanation_d_modified': {t: 'BOOL_0_1'},'bubblestyle_p': {t: 'SHELF', v: 'white_island'},'b_width_p': {t: 'INTEGER', v: 180},'b_height_p': {t: 'INTEGER', v: 40},'orientation_p': {t: 'ORIENTATION_BUBBLE', v: 'C'},'position_bu': {t: 'RELPOS'},'explanation_p_modified': {t: 'BOOL_0_1'},'show_hl_d': {t: 'BOOL_0_1', v: 1},'show_hl_p': {t: 'BOOL_0_1', v: 0},'show_bubble_d': {t: 'BOOL_0_1', v: 1},'show_bubble_p': {t: 'BOOL_0_1', v: 1},'animated': {t: 'BOOL_0_1', v: 1},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'},'expected_result': {t: 'TEXT'},'ROC': {t: 'ENUM'},'description': {t: 'HTML'},'screenshot_file': {t: 'IMAGE'},'screenshot_rect': {t: 'POSSIZE'},'overlay_pos': {t: 'POSITION'},'marker_orientation': {t: 'ENUM'},'element_type': {t: 'TEXT'},'click_pos': {t: 'POSITION'},'rerec_manual': {t: 'BOOL_0_1'},'exec_mouse': {t: 'BOOL_0_1'},'rec_method': {t: 'TEXT'},'elem_key': {t: 'TEXT_SHORT'},'ctl_rect': {t: 'POSSIZE'},'cursor_hand': {t: 'BOOL_0_1'},'ctl_disabled': {t: 'BOOL_0_1', v: 0},'all_values': {t: 'TEXT_SHORT'},'ctl_font_family': {t: 'TEXT', v: 'Arial'},'ctl_font_size': {t: 'INTEGER', v: 12},'ctl_font_bold': {t: 'BOOL_0_1', v: 0},'ctl_font_italic': {t: 'BOOL_0_1', v: 0},'ctl_font_underline': {t: 'BOOL_0_1', v: 0},'ctl_font_color': {t: 'COLOR', v: '#000000'},'ctl_bg_color': {t: 'COLOR', v: '#ffffff'},'jump_target': {t: 'TOURSTOP_NAME'}},input_radio:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'expl_like': {t: 'ENUM', v: 'default'},'explanation_d': {t: 'HTML'},'explanation_p': {t: 'HTML'},'fieldname': {t: 'TEXT'},'fieldicon': {t: 'IMAGE'},'choose_bool': {t: 'TEXT'},'hotkeyV2': {t: 'KEY'},'hotkey': {t: 'TEXT'},'key_desc': {t: 'TEXT'},'position_h': {t: 'RELPOS_ELEMREF'},'bubblestyle_d': {t: 'SHELF', v: 'white_island'},'b_width': {t: 'INTEGER', v: 240},'b_height': {t: 'INTEGER', v: 160},'orientation': {t: 'ORIENTATION_BUBBLE', v: 'SE'},'position_b': {t: 'RELPOS'},'b_duration': {t: 'INTEGER', v: 4},'explanation_d_modified': {t: 'BOOL_0_1'},'bubblestyle_p': {t: 'SHELF', v: 'white_island'},'b_width_p': {t: 'INTEGER', v: 180},'b_height_p': {t: 'INTEGER', v: 40},'orientation_p': {t: 'ORIENTATION_BUBBLE', v: 'C'},'position_bu': {t: 'RELPOS'},'explanation_p_modified': {t: 'BOOL_0_1'},'show_hl_d': {t: 'BOOL_0_1', v: 1},'show_hl_p': {t: 'BOOL_0_1', v: 0},'show_bubble_d': {t: 'BOOL_0_1', v: 1},'show_bubble_p': {t: 'BOOL_0_1', v: 1},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'},'expected_result': {t: 'TEXT'},'ROC': {t: 'ENUM'},'description': {t: 'HTML'},'screenshot_file': {t: 'IMAGE'},'overlay_pos': {t: 'POSITION'},'screenshot_rect': {t: 'POSSIZE'},'marker_orientation': {t: 'ENUM'},'element_type': {t: 'TEXT', v: 'WINCheckbox'},'click_pos': {t: 'POSITION'},'rerec_manual': {t: 'BOOL_0_1'},'exec_mouse': {t: 'BOOL_0_1'},'rec_method': {t: 'TEXT'},'elem_key': {t: 'TEXT_SHORT'},'ctl_rect': {t: 'POSSIZE'},'cursor_hand': {t: 'BOOL_0_1'},'is_radio': {t: 'BOOL_0_1'},'radio_group_name': {t: 'TEXT', v: 'radioGroup1'},'ctl_disabled': {t: 'BOOL_0_1', v: 0},'jump_target': {t: 'TOURSTOP_NAME'}},scroll_hor:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'scrollleft': {t: 'INTEGER', v: 1000},'position_h': {t: 'RELPOS'},'explanation_d': {t: 'HTML'},'bubblestyle_d': {t: 'SHELF', v: 'white_island'},'b_width': {t: 'INTEGER', v: 180},'b_height': {t: 'INTEGER', v: 40},'orientation': {t: 'ORIENTATION_BUBBLE', v: 'NW'},'position_b': {t: 'RELPOS'},'explanation_d_modified': {t: 'BOOL_0_1'},'b_duration': {t: 'INTEGER', v: 4},'show_hl_d': {t: 'BOOL_0_1', v: 0},'show_hl_p': {t: 'BOOL_0_1', v: 0},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'},'imagesize': {t: 'INTEGER', v: 40},'element_type': {t: 'TEXT', v: 'HScroll'},'rec_method': {t: 'TEXT'},'elem_key': {t: 'TEXT_SHORT'},'screenshot_file': {t: 'IMAGE'},'caption': {t: 'TEXT'},'screenshot_rect': {t: 'POSSIZE'},'screenshot_border': {t: 'INTEGER', v: 0},'marker_orientation': {t: 'ENUM'}},scroll_vert:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'scrolltop': {t: 'INTEGER', v: 1000},'position_h': {t: 'RELPOS'},'explanation_d': {t: 'HTML'},'bubblestyle_d': {t: 'SHELF', v: 'white_island'},'b_width': {t: 'INTEGER', v: 180},'b_height': {t: 'INTEGER', v: 40},'orientation': {t: 'ORIENTATION_BUBBLE', v: 'NW'},'position_b': {t: 'RELPOS'},'b_duration': {t: 'INTEGER', v: 4},'explanation_d_modified': {t: 'BOOL_0_1'},'show_hl_d': {t: 'BOOL_0_1', v: 0},'show_hl_p': {t: 'BOOL_0_1', v: 0},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'},'imagesize': {t: 'INTEGER', v: 40},'element_type': {t: 'TEXT', v: 'HScroll'},'rec_method': {t: 'TEXT'},'elem_key': {t: 'TEXT_SHORT'},'screenshot_file': {t: 'IMAGE'},'caption': {t: 'TEXT'},'screenshot_rect': {t: 'POSSIZE'},'screenshot_border': {t: 'INTEGER', v: 0}},goto_tourstop:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'jump_target': {t: 'TOURSTOP_NAME'},'in_demo': {t: 'BOOL_0_1', v: 1},'in_practice': {t: 'BOOL_0_1', v: 1},'in_test': {t: 'BOOL_0_1', v: 1},'in_prax': {t: 'BOOL_0_1', v: 1},'in_guided': {t: 'BOOL_0_1', v: 1},'in_pres': {t: 'BOOL_0_1', v: 1},'doc_enable': {t: 'BOOL_YES_NO'}},end_unit:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'last_page_pause': {t: 'INTEGER'},'show_end_page': {t: 'BOOL_0_1', v: 0},'end_caption': {t: 'TEXT'},'end_caption_p': {t: 'TEXT'},'end_caption_t': {t: 'TEXT'},'end_text': {t: 'HTML'},'end_text_p': {t: 'HTML'},'end_text_t_passed': {t: 'HTML'},'end_text_t_failed': {t: 'HTML'}},kurs:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'titel': {t: 'TEXT'},'bezeichnung': {t: 'TEXT'}},hpqc_header:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'hpqc_path': {t: 'TEXT'},'hpqc_status': {t: 'ENUM'},'hpqc_description': {t: 'HTML'}},transaction_info:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'tcode': {t: 'TEXT'},'sap_path': {t: 'TEXT'}},screenshot_part:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'caption': {t: 'TEXT'},'screenshot_file': {t: 'IMAGE'},'imagesize': {t: 'INTEGER', v: 40},'screenshot_rect': {t: 'POSSIZE'},'show_actions': {t: 'BOOL_TRUE_FALSE', v: false},'screenshot_border': {t: 'INTEGER', v: 0},'source_macro': {t: 'TEXT'}},hinweis:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'type': {t: 'ENUM', v: 'hinweis'},'text': {t: 'HTML'},'in_standard': {t: 'BOOL_0_1', v: 1},'in_training': {t: 'BOOL_0_1', v: 1},'in_testsheet': {t: 'BOOL_0_1', v: 1},'in_business_script': {t: 'BOOL_0_1', v: 1},'in_bpp': {t: 'BOOL_0_1', v: 0},'in_fda': {t: 'BOOL_0_1', v: 0},'in_ppt': {t: 'BOOL_0_1', v: 1},'in_hands_on': {t: 'BOOL_0_1', v: 1}},beschreibung:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'text': {t: 'HTML'},'reset_indexcounter': {t: 'BOOL_0_1', v: 0},'in_standard': {t: 'BOOL_0_1', v: 1},'in_training': {t: 'BOOL_0_1', v: 1},'in_testsheet': {t: 'BOOL_0_1', v: 1},'in_business_script': {t: 'BOOL_0_1', v: 1},'in_bpp': {t: 'BOOL_0_1', v: 0},'in_fda': {t: 'BOOL_0_1', v: 0},'in_hands_on': {t: 'BOOL_0_1', v: 1}},doc_caption:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'caption': {t: 'TEXT'},'type': {t: 'TEXT'}},free_marker:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'screenshot_rect': {t: 'POSSIZE'},'text': {t: 'HTML'},'marker_orientation': {t: 'ENUM'}},arrow:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'text': {t: 'HTML'},'screenshot_rect': {t: 'POSSIZE'},'arrow_macro_color': {t: 'COLOR'},'orientation': {t: 'ENUM', v: '2'}},page_break:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'in_standard': {t: 'BOOL_0_1', v: 1},'in_training': {t: 'BOOL_0_1', v: 1},'in_testsheet': {t: 'BOOL_0_1', v: 1},'in_business_script': {t: 'BOOL_0_1', v: 1},'in_bpp': {t: 'BOOL_0_1', v: 1},'in_fda': {t: 'BOOL_0_1', v: 1}},doc_properties:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'name1': {t: 'TEXT'},'value1': {t: 'TEXT'},'name2': {t: 'TEXT'},'value2': {t: 'TEXT'},'name3': {t: 'TEXT'},'value3': {t: 'TEXT'},'name4': {t: 'TEXT'},'value4': {t: 'TEXT'},'name5': {t: 'TEXT'},'value5': {t: 'TEXT'},'name6': {t: 'TEXT'},'value6': {t: 'TEXT'}},doc_revision_entry:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'revision_date': {t: 'TEXT'},'revision_changes': {t: 'TEXT'},'revision_changed_by': {t: 'TEXT'},'revision_id': {t: 'TEXT'},'in_standard': {t: 'BOOL_0_1', v: 0},'in_training': {t: 'BOOL_0_1', v: 0},'in_testsheet': {t: 'BOOL_0_1', v: 0},'in_bpp': {t: 'BOOL_0_1', v: 1},'in_fda': {t: 'BOOL_0_1', v: 1}},doc_input_table:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'use_fieldname': {t: 'BOOL_0_1', v: 1},'use_value': {t: 'BOOL_0_1', v: 1},'use_bubbletext': {t: 'BOOL_0_1'},'use_ROC': {t: 'BOOL_0_1'},'use_description': {t: 'BOOL_0_1'},'in_standard': {t: 'BOOL_0_1'},'in_training': {t: 'BOOL_0_1'},'in_testsheet': {t: 'BOOL_0_1'},'in_bpp': {t: 'BOOL_0_1', v: 1},'in_fda': {t: 'BOOL_0_1', v: 1}},doc_logon_table:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'logon_id': {t: 'TEXT'},'role': {t: 'TEXT'},'work_center': {t: 'TEXT'},'view': {t: 'TEXT'},'in_standard': {t: 'BOOL_0_1'},'in_training': {t: 'BOOL_0_1'},'in_testsheet': {t: 'BOOL_0_1'},'in_bpp': {t: 'BOOL_0_1', v: 1},'in_fda': {t: 'BOOL_0_1', v: 1}},swf_page:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'swf_file': {t: 'FILENAME'},'swf_width': {t: 'INTEGER', v: 320},'swf_height': {t: 'INTEGER', v: 200},'in_demo': {t: 'BOOL_0_1', v: 1},'in_practice': {t: 'BOOL_0_1', v: 1},'in_test': {t: 'BOOL_0_1', v: 0},'in_prax': {t: 'BOOL_0_1', v: 1},'in_guided': {t: 'BOOL_0_1', v: 0},'in_pres': {t: 'BOOL_0_1', v: 0}},info_page:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'title': {t: 'TEXT'},'explanation_d': {t: 'HTML'},'b_width': {t: 'INTEGER', v: 360},'dump_win_relpos': {t: 'RELPOS_DOCREF'},'type': {t: 'ENUM'}},form_on:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'}},form_off:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'show_bubble_p': {t: 'BOOL_0_1'},'bubblestyle_p': {t: 'SHELF', v: 'white_island'},'b_width_p': {t: 'INTEGER', v: 160},'b_height_p': {t: 'INTEGER', v: 100},'orientation_p': {t: 'ORIENTATION_BUBBLE', v: 'C'},'position_bu': {t: 'RELPOS'}},branch_on:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'doc_enable': {t: 'BOOL_YES_NO', v: 'yes'}},branch_off:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'show_bubble_d': {t: 'BOOL_0_1', v: 1},'show_bubble_p': {t: 'BOOL_0_1', v: 1},'bubblestyle_d': {t: 'SHELF', v: 'white_island'},'b_width': {t: 'INTEGER', v: 200},'b_height': {t: 'INTEGER', v: 200},'orientation': {t: 'ORIENTATION_BUBBLE', v: 'C'},'position_b': {t: 'RELPOS'},'b_duration': {t: 'INTEGER', v: -1},'explanation_d_modified': {t: 'BOOL_0_1'},'bubblestyle_p': {t: 'SHELF', v: 'white_island'},'b_width_p': {t: 'INTEGER', v: 200},'b_height_p': {t: 'INTEGER', v: 200},'orientation_p': {t: 'ORIENTATION_BUBBLE', v: 'C'},'position_bu': {t: 'RELPOS'},'explanation_p_modified': {t: 'BOOL_0_1'}},mode_change:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'in_demo_to': {t: 'ENUM', v: 'demo'},'in_uebung_to': {t: 'ENUM', v: 'uebung'},'in_test_to': {t: 'ENUM', v: 'test'},'in_praxis_to': {t: 'ENUM', v: 'praxis'}},mode_change_end:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'}},free_highlight:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'obj_name': {t: 'TEXT', v: 'highlight1'},'position_h': {t: 'RELPOS_RECT'},'highlight_rgb': {t: 'COLOR', v: '#0FAAFF'},'in_demo': {t: 'BOOL_0_1', v: 1},'in_practice': {t: 'BOOL_0_1', v: 1},'in_test': {t: 'BOOL_0_1', v: 0},'in_prax': {t: 'BOOL_0_1', v: 1},'in_guided': {t: 'BOOL_0_1', v: 1},'in_pres': {t: 'BOOL_0_1', v: 1},'highlight_off': {t: 'BOOL_0_1', v: 0},'ctl_rect': {t: 'POSSIZE'},'doc_enable': {t: 'BOOL_YES_NO', v: '1'},'screenshot_rect': {t: 'POSSIZE'}},mchoice:{'macro_comment': {t: 'COMMENT'},'quiz_template': {t: 'SHELF'},'uid': {t: 'TEXT'},'points': {t: 'INTEGER', v: 1},'title': {t: 'TEXT'},'question': {t: 'HTML'},'answer_1': {t: 'TEXT'},'answer_1_correct': {t: 'BOOL_0_1', v: 0},'answer_2': {t: 'TEXT'},'answer_2_correct': {t: 'BOOL_0_1', v: 0},'answer_3': {t: 'TEXT'},'answer_3_correct': {t: 'BOOL_0_1', v: 0},'answer_4': {t: 'TEXT'},'answer_4_correct': {t: 'BOOL_0_1'},'answer_5': {t: 'TEXT'},'answer_5_correct': {t: 'BOOL_0_1'},'answer_6': {t: 'TEXT'},'answer_6_correct': {t: 'BOOL_0_1'},'answer_7': {t: 'TEXT'},'answer_7_correct': {t: 'BOOL_0_1'},'answer_8': {t: 'TEXT'},'answer_8_correct': {t: 'BOOL_0_1'},'shuffle_solutions': {t: 'BOOL_0_1', v: 0},'force_multiple_choice': {t: 'BOOL_0_1', v: 0},'quiz_timeout': {t: 'INTEGER'},'qm_file': {t: 'LINK'},'qm_alt_txt': {t: 'TEXT'},'qm_width': {t: 'INTEGER'},'qm_height': {t: 'INTEGER'},'qm_as_question': {t: 'BOOL_0_1'},'feedback_enable': {t: 'BOOL_0_1'},'feedback_pass': {t: 'HTML'},'feedback_fail': {t: 'HTML'},'feedback_time': {t: 'HTML'},'heading_enable': {t: 'BOOL_TRUE_FALSE'}},sqmaquiz:{'macro_comment': {t: 'COMMENT'},'quiz_template': {t: 'SHELF'},'uid': {t: 'TEXT'},'points': {t: 'INTEGER', v: 1},'title': {t: 'TEXT'},'question': {t: 'HTML'},'answer_type': {t: 'ENUM', v: 'at_comma_list'},'answer_1': {t: 'TEXT'},'answer_2': {t: 'TEXT'},'answer_3': {t: 'TEXT'},'answer_4': {t: 'TEXT'},'answer_5': {t: 'TEXT'},'answer_6': {t: 'TEXT'},'answer_7': {t: 'TEXT'},'answer_8': {t: 'TEXT'},'quiz_timeout': {t: 'INTEGER'},'qm_file': {t: 'LINK'},'qm_alt_txt': {t: 'TEXT'},'qm_width': {t: 'INTEGER'},'qm_height': {t: 'INTEGER'},'qm_as_question': {t: 'BOOL_0_1'},'feedback_enable': {t: 'BOOL_0_1'},'feedback_pass': {t: 'HTML'},'feedback_fail': {t: 'HTML'},'feedback_time': {t: 'HTML'},'heading_enable': {t: 'BOOL_TRUE_FALSE'}},fibquiz:{'macro_comment': {t: 'COMMENT'},'quiz_template': {t: 'SHELF'},'uid': {t: 'TEXT'},'points': {t: 'INTEGER', v: 1},'title': {t: 'TEXT'},'question': {t: 'HTML'},'fibtext': {t: 'HTML'},'quiz_type': {t: 'ENUM', v: 'qt_text'},'answer_1': {t: 'TEXT'},'answer_2': {t: 'TEXT'},'answer_3': {t: 'TEXT'},'answer_4': {t: 'TEXT'},'answer_5': {t: 'TEXT'},'answer_6': {t: 'TEXT'},'answer_7': {t: 'TEXT'},'answer_8': {t: 'TEXT'},'shuffle_solutions': {t: 'BOOL_0_1', v: 0},'one_for_all': {t: 'BOOL_0_1'},'quiz_timeout': {t: 'INTEGER'},'qm_file': {t: 'LINK'},'qm_alt_txt': {t: 'TEXT'},'qm_width': {t: 'INTEGER'},'qm_height': {t: 'INTEGER'},'qm_as_question': {t: 'BOOL_0_1'},'feedback_enable': {t: 'BOOL_0_1'},'feedback_pass': {t: 'HTML'},'feedback_fail': {t: 'HTML'},'feedback_time': {t: 'HTML'},'heading_enable': {t: 'BOOL_TRUE_FALSE'}},matchquiz:{'macro_comment': {t: 'COMMENT'},'quiz_template': {t: 'SHELF'},'uid': {t: 'TEXT'},'points': {t: 'INTEGER', v: 1},'title': {t: 'TEXT'},'matchquestion': {t: 'HTML'},'quiz_type': {t: 'ENUM', v: 'qt_drop_down'},'question_1': {t: 'HTML'},'answer_1': {t: 'HTML'},'question_2': {t: 'HTML'},'answer_2': {t: 'HTML'},'question_3': {t: 'HTML'},'answer_3': {t: 'HTML'},'question_4': {t: 'HTML'},'answer_4': {t: 'HTML'},'question_5': {t: 'HTML'},'answer_5': {t: 'HTML'},'question_6': {t: 'HTML'},'answer_6': {t: 'HTML'},'question_7': {t: 'HTML'},'answer_7': {t: 'HTML'},'question_8': {t: 'HTML'},'answer_8': {t: 'HTML'},'quiz_timeout': {t: 'INTEGER'},'qm_file': {t: 'LINK'},'qm_alt_txt': {t: 'TEXT'},'qm_width': {t: 'INTEGER'},'qm_height': {t: 'INTEGER'},'qm_as_question': {t: 'BOOL_0_1'},'feedback_enable': {t: 'BOOL_0_1'},'feedback_pass': {t: 'HTML'},'feedback_fail': {t: 'HTML'},'feedback_time': {t: 'HTML'},'heading_enable': {t: 'BOOL_TRUE_FALSE'}},connquiz:{'macro_comment': {t: 'COMMENT'},'quiz_template': {t: 'SHELF'},'uid': {t: 'TEXT'},'points': {t: 'INTEGER', v: 1},'title': {t: 'TEXT'},'connquestion': {t: 'HTML'},'question_1': {t: 'HTML'},'answer_1': {t: 'HTML'},'question_2': {t: 'HTML'},'answer_2': {t: 'HTML'},'question_3': {t: 'HTML'},'answer_3': {t: 'HTML'},'question_4': {t: 'HTML'},'answer_4': {t: 'HTML'},'question_5': {t: 'HTML'},'answer_5': {t: 'HTML'},'question_6': {t: 'HTML'},'answer_6': {t: 'HTML'},'question_7': {t: 'HTML'},'answer_7': {t: 'HTML'},'question_8': {t: 'HTML'},'answer_8': {t: 'HTML'},'quiz_timeout': {t: 'INTEGER'},'qm_file': {t: 'LINK'},'qm_alt_txt': {t: 'TEXT'},'qm_width': {t: 'INTEGER'},'qm_height': {t: 'INTEGER'},'qm_as_question': {t: 'BOOL_0_1'},'feedback_enable': {t: 'BOOL_0_1'},'feedback_pass': {t: 'HTML'},'feedback_fail': {t: 'HTML'},'feedback_time': {t: 'HTML'},'heading_enable': {t: 'BOOL_TRUE_FALSE'}},mixquiz:{'macro_comment': {t: 'COMMENT'},'quiz_template': {t: 'SHELF'},'uid': {t: 'TEXT'},'points': {t: 'INTEGER', v: 1},'title': {t: 'TEXT'},'question': {t: 'HTML'},'quiz_type': {t: 'ENUM', v: 'qt_drop_down'},'quiz_alignment': {t: 'ENUM', v: 'qa_horizontal'},'answer_1': {t: 'TEXT'},'answer_2': {t: 'TEXT'},'answer_3': {t: 'TEXT'},'answer_4': {t: 'TEXT'},'answer_5': {t: 'TEXT'},'answer_6': {t: 'TEXT'},'answer_7': {t: 'TEXT'},'answer_8': {t: 'TEXT'},'quiz_timeout': {t: 'INTEGER'},'qm_file': {t: 'LINK'},'qm_alt_txt': {t: 'TEXT'},'qm_width': {t: 'INTEGER'},'qm_height': {t: 'INTEGER'},'qm_as_question': {t: 'BOOL_0_1'},'feedback_enable': {t: 'BOOL_0_1'},'feedback_pass': {t: 'HTML'},'feedback_fail': {t: 'HTML'},'feedback_time': {t: 'HTML'},'heading_enable': {t: 'BOOL_TRUE_FALSE'}},scalequiz:{'macro_comment': {t: 'COMMENT'},'quiz_template': {t: 'SHELF'},'uid': {t: 'TEXT'},'points': {t: 'INTEGER', v: 1},'title': {t: 'TEXT'},'question': {t: 'HTML'},'range': {t: 'TEXT'},'answer': {t: 'TEXT'},'quiz_timeout': {t: 'INTEGER'},'qm_file': {t: 'LINK'},'qm_alt_txt': {t: 'TEXT'},'qm_width': {t: 'INTEGER'},'qm_height': {t: 'INTEGER'},'qm_as_question': {t: 'BOOL_0_1'},'feedback_enable': {t: 'BOOL_0_1'},'feedback_pass': {t: 'HTML'},'feedback_fail': {t: 'HTML'},'feedback_time': {t: 'HTML'},'heading_enable': {t: 'BOOL_TRUE_FALSE'}},gridquiz:{'macro_comment': {t: 'COMMENT'},'quiz_template': {t: 'SHELF'},'uid': {t: 'TEXT'},'points': {t: 'INTEGER', v: 1},'title': {t: 'TEXT'},'question': {t: 'HTML'},'grid_list': {t: 'TEXT'},'question_1': {t: 'TEXT'},'answer_1': {t: 'TEXT'},'question_2': {t: 'TEXT'},'answer_2': {t: 'TEXT'},'question_3': {t: 'TEXT'},'answer_3': {t: 'TEXT'},'question_4': {t: 'TEXT'},'answer_4': {t: 'TEXT'},'question_5': {t: 'TEXT'},'answer_5': {t: 'TEXT'},'question_6': {t: 'TEXT'},'answer_6': {t: 'TEXT'},'question_7': {t: 'TEXT'},'answer_7': {t: 'TEXT'},'question_8': {t: 'TEXT'},'answer_8': {t: 'TEXT'},'shuffle_solutions': {t: 'BOOL_0_1', v: 0},'quiz_timeout': {t: 'INTEGER'},'qm_file': {t: 'LINK'},'qm_alt_txt': {t: 'TEXT'},'qm_width': {t: 'INTEGER'},'qm_height': {t: 'INTEGER'},'qm_as_question': {t: 'BOOL_0_1'},'feedback_enable': {t: 'BOOL_0_1'},'feedback_pass': {t: 'HTML'},'feedback_fail': {t: 'HTML'},'feedback_time': {t: 'HTML'},'heading_enable': {t: 'BOOL_TRUE_FALSE'}},puzzlequiz:{'macro_comment': {t: 'COMMENT'},'quiz_template': {t: 'SHELF'},'uid': {t: 'TEXT'},'points': {t: 'INTEGER', v: 1},'title': {t: 'TEXT'},'question': {t: 'HTML'},'quiz_type': {t: 'ENUM', v: 'qt_oneplace_puzzle'},'qp_show_hint': {t: 'BOOL_0_1', v: 1},'qp_pieces_x': {t: 'INTEGER', v: 2},'qp_pieces_y': {t: 'INTEGER', v: 2},'qm_file': {t: 'IMAGE'},'quiz_timeout': {t: 'INTEGER'},'feedback_enable': {t: 'BOOL_0_1'},'feedback_pass': {t: 'HTML'},'feedback_fail': {t: 'HTML'},'feedback_time': {t: 'HTML'},'heading_enable': {t: 'BOOL_TRUE_FALSE'}},hotspotquiz:{'macro_comment': {t: 'COMMENT'},'quiz_template': {t: 'SHELF'},'uid': {t: 'TEXT'},'points': {t: 'INTEGER', v: 1},'title': {t: 'TEXT'},'question': {t: 'HTML'},'hs_image': {t: 'IMAGE'},'selection_rect': {t: 'POSSIZE'},'quiz_timeout': {t: 'INTEGER'},'qm_file': {t: 'LINK'},'qm_alt_txt': {t: 'TEXT'},'qm_width': {t: 'INTEGER'},'qm_height': {t: 'INTEGER'},'feedback_enable': {t: 'BOOL_0_1'},'feedback_pass': {t: 'HTML'},'feedback_fail': {t: 'HTML'},'feedback_time': {t: 'HTML'},'heading_enable': {t: 'BOOL_TRUE_FALSE'}},quiz_shuffle_on:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'quiz_selection_type': {t: 'ENUM', v: 'qst_random_choice'},'points': {t: 'INTEGER', v: 1},'quiz_selection_count': {t: 'INTEGER', v: 1}},quiz_shuffle_off:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'}},quiz_eval:{'macro_comment': {t: 'COMMENT'},'quiz_template': {t: 'SHELF'},'uid': {t: 'TEXT'},'proj_title': {t: 'TEXT'},'quiz_threshold': {t: 'TEXT'},'eval_type': {t: 'ENUM', v: 'et_full'},'track_completion': {t: 'BOOL_0_1', v: 1},'feedback_enable': {t: 'BOOL_0_1'},'feedback_pass': {t: 'HTML'},'feedback_fail': {t: 'HTML'},'heading_enable': {t: 'BOOL_TRUE_FALSE'}},slide_arrow:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'name': {t: 'TEXT'},'head0': {t: 'ENUM', v: 'none'},'head1': {t: 'ENUM', v: 'none'},'color': {t: 'COLOR', v: '#000000'},'thickness': {t: 'INTEGER', v: 2},'opacity': {t: 'INTEGER', v: 100},'x0': {t: 'INTEGER', v: 140},'y0': {t: 'INTEGER', v: 190},'x1': {t: 'INTEGER', v: 240},'y1': {t: 'INTEGER', v: 190},'locked': {t: 'BOOL_TRUE_FALSE', v: false},'hidden': {t: 'BOOL_TRUE_FALSE', v: false},'l0': {t: 'INTEGER', v: 6},'w0': {t: 'INTEGER', v: 4},'l1': {t: 'INTEGER', v: 6},'w1': {t: 'INTEGER', v: 4},'in_demo': {t: 'BOOL_0_1', v: 1},'in_practice': {t: 'BOOL_0_1', v: 1},'in_test': {t: 'BOOL_0_1', v: 1},'in_guided': {t: 'BOOL_0_1', v: 0},'in_pres': {t: 'BOOL_0_1', v: 0},'trigger_error_on_use': {t: 'BOOL_0_1', v: 0}},slide_big_arrow:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'name': {t: 'TEXT'},'dir': {t: 'ENUM', v: 'right'},'text': {t: 'HTML'},'font_family': {t: 'SHELF', v: 'Arial'},'font_size': {t: 'SHELF', v: '10'},'text_color': {t: 'COLOR'},'bold': {t: 'BOOL_TRUE_FALSE'},'italic': {t: 'BOOL_TRUE_FALSE'},'underline': {t: 'BOOL_TRUE_FALSE'},'align': {t: 'ENUM'},'valign': {t: 'ENUM'},'background_color': {t: 'COLOR', v: 'transparent'},'arrow_color': {t: 'COLOR', v: '#008FD3'},'border_color': {t: 'COLOR', v: '#0076CB'},'rotation': {t: 'INTEGER'},'thickness': {t: 'INTEGER', v: 30},'border': {t: 'INTEGER', v: 0},'padding': {t: 'INTEGER', v: 0},'opacity': {t: 'INTEGER', v: 100},'gradient': {t: 'ENUM'},'shape_color2': {t: 'COLOR'},'border_color2': {t: 'COLOR'},'visual_over': {t: 'BOOL_TRUE_FALSE'},'text_color_over': {t: 'COLOR'},'shape_color_over': {t: 'COLOR'},'shape_color2_over': {t: 'COLOR'},'border_color_over': {t: 'COLOR'},'border_color2_over': {t: 'COLOR'},'visual_down': {t: 'BOOL_TRUE_FALSE'},'text_color_down': {t: 'COLOR'},'shape_color_down': {t: 'COLOR'},'shape_color2_down': {t: 'COLOR'},'border_color_down': {t: 'COLOR'},'border_color2_down': {t: 'COLOR'},'x': {t: 'INTEGER', v: 140},'y': {t: 'INTEGER', v: 120},'w': {t: 'INTEGER', v: 200},'h': {t: 'INTEGER', v: 200},'locked': {t: 'BOOL_TRUE_FALSE', v: false},'hidden': {t: 'BOOL_TRUE_FALSE', v: false},'href': {t: 'LINK'},'tooltip': {t: 'TEXT'},'openInNewWindow': {t: 'BOOL_TRUE_FALSE', v: true},'forceDownload': {t: 'BOOL_TRUE_FALSE'},'nWF_top': {t: 'INTEGER'},'nWF_left': {t: 'INTEGER'},'nWF_width': {t: 'INTEGER'},'nWF_height': {t: 'INTEGER'},'nWF_fullscreen': {t: 'BOOL_TRUE_FALSE'},'nWF_location': {t: 'BOOL_TRUE_FALSE'},'nWF_menubar': {t: 'BOOL_TRUE_FALSE'},'nWF_scrollbars': {t: 'BOOL_TRUE_FALSE'},'nWF_resizable': {t: 'BOOL_TRUE_FALSE'},'nWF_status': {t: 'BOOL_TRUE_FALSE'},'nWF_toolbar': {t: 'BOOL_TRUE_FALSE'},'in_demo': {t: 'BOOL_0_1', v: 1},'in_practice': {t: 'BOOL_0_1', v: 1},'in_test': {t: 'BOOL_0_1', v: 1},'in_guided': {t: 'BOOL_0_1', v: 0},'in_pres': {t: 'BOOL_0_1', v: 0},'trigger_error_on_use': {t: 'BOOL_0_1', v: 0}},slide_link_textBoxIcon:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'name': {t: 'TEXT'},'text': {t: 'HTML'},'border_style': {t: 'SHELF'},'textBox_type': {t: 'ENUM', v: 'default'},'textBox_title': {t: 'TEXT'},'hide_scrollbars': {t: 'BOOL_TRUE_FALSE', v: false},'hover_mode': {t: 'BOOL_TRUE_FALSE'},'fadeing': {t: 'BOOL_TRUE_FALSE', v: true},'hide_textbox_in_editor': {t: 'BOOL_TRUE_FALSE', v: false},'font_family': {t: 'SHELF', v: 'Arial'},'font_size': {t: 'SHELF', v: '10'},'text_color': {t: 'COLOR', v: '#000000'},'bold': {t: 'BOOL_TRUE_FALSE'},'italic': {t: 'BOOL_TRUE_FALSE'},'underline': {t: 'BOOL_TRUE_FALSE'},'align': {t: 'ENUM', v: 'start'},'valign': {t: 'ENUM', v: 'top'},'background_color': {t: 'COLOR', v: '#ffffff'},'border_color': {t: 'COLOR', v: '#666666'},'border': {t: 'INTEGER', v: 2},'border_t': {t: 'INTEGER'},'border_r': {t: 'INTEGER'},'border_b': {t: 'INTEGER'},'border_l': {t: 'INTEGER'},'padding': {t: 'INTEGER', v: 0},'padding_t': {t: 'INTEGER'},'padding_r': {t: 'INTEGER'},'padding_b': {t: 'INTEGER'},'padding_l': {t: 'INTEGER'},'image': {t: 'IMAGE_WH'},'opacity': {t: 'INTEGER', v: 100},'popup_opacity': {t: 'INTEGER', v: 100},'shadow_show': {t: 'BOOL_TRUE_FALSE', v: false},'shadow_color': {t: 'COLOR', v: '#000000'},'shadow_trans': {t: 'INTEGER', v: 25},'shadow_blur': {t: 'INTEGER', v: 3},'shadow_spread': {t: 'INTEGER', v: 0},'shadow_h': {t: 'INTEGER', v: 3},'shadow_v': {t: 'INTEGER', v: 3},'box_shadow_show': {t: 'BOOL_TRUE_FALSE', v: false},'box_shadow_color': {t: 'COLOR', v: '#000000'},'box_shadow_trans': {t: 'INTEGER', v: 25},'box_shadow_blur': {t: 'INTEGER', v: 3},'box_shadow_spread': {t: 'INTEGER', v: 0},'box_shadow_h': {t: 'INTEGER', v: 3},'box_shadow_v': {t: 'INTEGER', v: 3},'x': {t: 'INTEGER', v: 300},'y': {t: 'INTEGER', v: 80},'w': {t: 'INTEGER', v: 33},'h': {t: 'INTEGER', v: 26},'locked': {t: 'BOOL_TRUE_FALSE', v: false},'hidden': {t: 'BOOL_TRUE_FALSE', v: false},'textBoxW': {t: 'INTEGER', v: 300},'textBoxH': {t: 'INTEGER', v: 200},'textBoxX': {t: 'INTEGER', v: 330},'textBoxY': {t: 'INTEGER', v: 80},'textBoxZ': {t: 'INTEGER', v: 1000},'in_demo': {t: 'BOOL_0_1', v: 1},'in_practice': {t: 'BOOL_0_1', v: 1},'in_test': {t: 'BOOL_0_1', v: 1},'in_prax': {t: 'BOOL_0_1', v: 0},'in_guided': {t: 'BOOL_0_1', v: 0},'in_pres': {t: 'BOOL_0_1', v: 0},'trigger_error_on_use': {t: 'BOOL_0_1', v: 0}},slide_image:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'name': {t: 'TEXT'},'image': {t: 'IMAGE_WH'},'image_mouseover': {t: 'IMAGE_WH'},'image_mousedown': {t: 'IMAGE_WH'},'alt_txt': {t: 'TEXT'},'keep_aspect': {t: 'BOOL_TRUE_FALSE', v: true},'zoomable': {t: 'BOOL_TRUE_FALSE'},'background_color': {t: 'COLOR', v: 'transparent'},'border_color': {t: 'COLOR', v: '#666666'},'border': {t: 'INTEGER', v: 0},'border_t': {t: 'INTEGER'},'border_r': {t: 'INTEGER'},'border_b': {t: 'INTEGER'},'border_l': {t: 'INTEGER'},'padding': {t: 'INTEGER', v: 0},'padding_t': {t: 'INTEGER'},'padding_r': {t: 'INTEGER'},'padding_b': {t: 'INTEGER'},'padding_l': {t: 'INTEGER'},'opacity': {t: 'INTEGER', v: 100},'shadow_show': {t: 'BOOL_TRUE_FALSE', v: false},'shadow_color': {t: 'COLOR', v: '#000000'},'shadow_trans': {t: 'INTEGER', v: 25},'shadow_blur': {t: 'INTEGER', v: 3},'shadow_spread': {t: 'INTEGER', v: 0},'shadow_h': {t: 'INTEGER', v: 3},'shadow_v': {t: 'INTEGER', v: 3},'x': {t: 'INTEGER', v: 140},'y': {t: 'INTEGER', v: 120},'w': {t: 'INTEGER', v: 200},'h': {t: 'INTEGER', v: 200},'locked': {t: 'BOOL_TRUE_FALSE', v: false},'hidden': {t: 'BOOL_TRUE_FALSE', v: false},'href': {t: 'LINK'},'tooltip': {t: 'TEXT'},'openInNewWindow': {t: 'BOOL_TRUE_FALSE', v: true},'forceDownload': {t: 'BOOL_TRUE_FALSE'},'nWF_top': {t: 'INTEGER'},'nWF_left': {t: 'INTEGER'},'nWF_width': {t: 'INTEGER'},'nWF_height': {t: 'INTEGER'},'nWF_fullscreen': {t: 'BOOL_TRUE_FALSE'},'nWF_location': {t: 'BOOL_TRUE_FALSE'},'nWF_menubar': {t: 'BOOL_TRUE_FALSE'},'nWF_scrollbars': {t: 'BOOL_TRUE_FALSE'},'nWF_resizable': {t: 'BOOL_TRUE_FALSE'},'nWF_status': {t: 'BOOL_TRUE_FALSE'},'nWF_toolbar': {t: 'BOOL_TRUE_FALSE'},'in_demo': {t: 'BOOL_0_1', v: 1},'in_practice': {t: 'BOOL_0_1', v: 1},'in_test': {t: 'BOOL_0_1', v: 1},'in_prax': {t: 'BOOL_0_1', v: 1},'in_guided': {t: 'BOOL_0_1', v: 0},'in_pres': {t: 'BOOL_0_1', v: 0},'trigger_error_on_use': {t: 'BOOL_0_1', v: 0}},slide_icon_link:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'name': {t: 'TEXT'},'mode_icon': {t: 'ENUM', v: 'demo'},'image': {t: 'IMAGE_WH'},'opacity': {t: 'INTEGER', v: 100},'shadow_show': {t: 'BOOL_TRUE_FALSE', v: false},'shadow_color': {t: 'COLOR', v: '#000000'},'shadow_trans': {t: 'INTEGER', v: 25},'shadow_blur': {t: 'INTEGER', v: 3},'shadow_spread': {t: 'INTEGER', v: 0},'shadow_h': {t: 'INTEGER', v: 3},'shadow_v': {t: 'INTEGER', v: 3},'link_to': {t: 'LINK'},'tooltip': {t: 'TEXT'},'openInNewWindow': {t: 'BOOL_TRUE_FALSE', v: true},'forceDownload': {t: 'BOOL_TRUE_FALSE'},'nWF_top': {t: 'INTEGER'},'nWF_left': {t: 'INTEGER'},'nWF_width': {t: 'INTEGER'},'nWF_height': {t: 'INTEGER'},'nWF_fullscreen': {t: 'BOOL_TRUE_FALSE'},'nWF_location': {t: 'BOOL_TRUE_FALSE'},'nWF_menubar': {t: 'BOOL_TRUE_FALSE'},'nWF_scrollbars': {t: 'BOOL_TRUE_FALSE'},'nWF_resizable': {t: 'BOOL_TRUE_FALSE'},'nWF_status': {t: 'BOOL_TRUE_FALSE'},'nWF_toolbar': {t: 'BOOL_TRUE_FALSE'},'x': {t: 'INTEGER', v: 300},'y': {t: 'INTEGER', v: 130},'w': {t: 'INTEGER', v: 33},'h': {t: 'INTEGER', v: 26},'locked': {t: 'BOOL_TRUE_FALSE', v: false},'hidden': {t: 'BOOL_TRUE_FALSE', v: false},'in_demo': {t: 'BOOL_0_1', v: 1},'in_practice': {t: 'BOOL_0_1', v: 1},'in_test': {t: 'BOOL_0_1', v: 1},'in_prax': {t: 'BOOL_0_1', v: 1},'in_guided': {t: 'BOOL_0_1', v: 0},'in_pres': {t: 'BOOL_0_1', v: 0},'trigger_error_on_use': {t: 'BOOL_0_1', v: 0}},slide_hrefarea:{'macro_comment': {t: 'COMMENT'},'uid': {t: 'TEXT'},'name': {t: 'TEXT'},'text': {t: 'HTML'},'hide_scrollbars': {t: 'BOOL_TRUE_FALSE', v: false},'border_style': {t: 'SHELF'},'href': {t: 'LINK'},'tooltip': {t: 'TEXT'},'openInNewWindow': {t: 'BOOL_TRUE_FALSE'},'forceDownload': {t: 'BOOL_TRUE_FALSE'},'nWF_top': {t: 'INTEGER'},'nWF_left': {t: 'INTEGER'},'nWF_width': {t: 'INTEGER'},'nWF_height': {t: 'INTEGER'},'nWF_fullscreen': {t: 'BOOL_TRUE_FALSE'},'nWF_location': {t: 'BOOL_TRUE_FALSE'},'nWF_menubar': {t: 'BOOL_TRUE_FALSE'},'nWF_scrollbars': {t: 'BOOL_TRUE_FALSE'},'nWF_resizable': {t: 'BOOL_TRUE_FALSE'},'nWF_status': {t: 'BOOL_TRUE_FALSE'},'nWF_toolbar': {t: 'BOOL_TRUE_FALSE'},'font_family': {t: 'SHELF', v: 'Arial'},'font_size': {t: 'SHELF', v: '14'},'text_color': {t: 'COLOR', v: '#000000'},'align': {t: 'ENUM', v: 'Left'},'background_color': {t: 'COLOR', v: 'transparent'},'border_color': {t: 'COLOR', v: '#666666'},'border': {t: 'INTEGER', v: 0},'border_t': {t: 'INTEGER'},'border_r': {t: 'INTEGER'},'border_b': {t: 'INTEGER'},'border_l': {t: 'INTEGER'},'padding': {t: 'INTEGER', v: 4},'padding_t': {t: 'INTEGER'},'padding_r': {t: 'INTEGER'},'padding_b': {t: 'INTEGER'},'padding_l': {t: 'INTEGER'},'opacity': {t: 'INTEGER', v: 100},'shadow_show': {t: 'BOOL_TRUE_FALSE', v: false},'shadow_color': {t: 'COLOR', v: '#000000'},'shadow_trans': {t: 'INTEGER', v: 25},'shadow_blur': {t: 'INTEGER', v: 3},'shadow_spread': {t: 'INTEGER', v: 0},'shadow_h': {t: 'INTEGER', v: 3},'shadow_v': {t: 'INTEGER', v: 3},'visual_over': {t: 'BOOL_TRUE_FALSE'},'background_color_over': {t: 'COLOR'},'text_color_over': {t: 'COLOR'},'border_color_over': {t: 'COLOR'},'visual_down': {t: 'BOOL_TRUE_FALSE'},'background_color_down': {t: 'COLOR'},'text_color_down': {t: 'COLOR'},'border_color_down': {t: 'COLOR'},'x': {t: 'INTEGER', v: 40},'y': {t: 'INTEGER', v: 220},'w': {t: 'INTEGER', v: 120},'h': {t: 'INTEGER', v: 120},'locked': {t: 'BOOL_TRUE_FALSE', v: false},'hidden': {t: 'BOOL_TRUE_FALSE', v: false},'in_demo': {t: 'BOOL_0_1', v: 1},'in_practice': {t: 'BOOL_0_1', v: 1},'in_test': {t: 'BOOL_0_1', v: 1},'in_prax': {t: 'BOOL_0_1', v: 1},'in_guided': {t: 'BOOL_0_1', v: 0},'in_pres': {t: 'BOOL_0_1', v: 0},'trigger_error_on_use': {t: 'BOOL_0_1', v: 0}},guide_init:{'uid': {t: 'TEXT'},'macro_comment': {t: 'COMMENT'},'app_url': {t: 'TEXT'}},guide_page:{'uid': {t: 'TEXT'},'macro_comment': {t: 'COMMENT'},'explanation_d': {t: 'HTML'}},screen_page:{'uid': {t: 'TEXT'},'timestamp': {t: 'TEXT'},'new_step': {t: 'TEXT'},'executable': {t: 'TEXT'},'dump_page': {t: 'PAGE', v: 'dump_page'},'rect': {t: 'POSSIZE'},'mouse_pos': {t: 'POSITION'},'cursor_id': {t: 'TEXT'}},mouse_action:{'uid': {t: 'TEXT'},'timestamp': {t: 'TEXT'},'click_count': {t: 'INTEGER'},'click_pos': {t: 'POSITION'},'action': {t: 'ENUM', v: 'lclick'},'ctrl_key': {t: 'BOOL_0_1'},'alt_key': {t: 'BOOL_0_1'},'shift_key': {t: 'BOOL_0_1'}},kbd_action:{'uid': {t: 'TEXT'},'timestamp': {t: 'TEXT'},'hotkeyV2': {t: 'KEY'},'key_name': {t: 'TEXT'},'key_desc': {t: 'TEXT'},'key_code': {t: 'INTEGER', v: -1},'ctrl_key': {t: 'BOOL_0_1'},'alt_key': {t: 'BOOL_0_1'},'shift_key': {t: 'BOOL_0_1'}},mouse_move:{'uid': {t: 'TEXT'},'timestamp': {t: 'TEXT'},'mouse_pos': {t: 'POSITION'},'hotspot_pos': {t: 'POSITION'},'cursor_id': {t: 'TEXT'},'dump_page': {t: 'PAGE', v: 'dump_page'}}};


var MacroDefaultsHandler = (function() {
    var APPLY_GLOBALS = {
        new_page: {
            skin: 'g_icon_skin',
            background_color: 'g_background_color',
            canvas_color: 'g_canvas_color'
        },

        free_highlight: {
            highlight_rgb: 'g_highlight_rgb'
        },

        puzzlequiz: {
            feedback_enable: 'g_feedback_enable',
            feedback_fail: 'g_feedback_fail',
            feedback_pass: 'g_feedback_pass',
            feedback_time: 'g_feedback_time'
        },

        quiz_eval: {
            feedback_enable: 'g_feedback_enable',
            feedback_fail: 'g_feedback_fail',
            feedback_pass: 'g_feedback_pass'
        }
    };

    APPLY_GLOBALS.mchoice = APPLY_GLOBALS.puzzlequiz;
    APPLY_GLOBALS.fibquiz = APPLY_GLOBALS.puzzlequiz;
    APPLY_GLOBALS.sqmaquiz = APPLY_GLOBALS.puzzlequiz;
    APPLY_GLOBALS.gridquiz = APPLY_GLOBALS.puzzlequiz;
    APPLY_GLOBALS.matchquiz = APPLY_GLOBALS.puzzlequiz;
    APPLY_GLOBALS.connquiz = APPLY_GLOBALS.puzzlequiz;
    APPLY_GLOBALS.mixquiz = APPLY_GLOBALS.puzzlequiz;
    APPLY_GLOBALS.scalequiz = APPLY_GLOBALS.puzzlequiz;
    APPLY_GLOBALS.hotspotquiz = APPLY_GLOBALS.puzzlequiz;

    var SPECIAL = {
        explanation_long: function(c, params, name) {
            var sf = c.defaults && c.defaults[name] || {};
            var bi = MacroDefaults[name] || {};
            one_('all_like_demo', params, sf, bi);
            one_('b_duration', params, sf, bi);
            one_('orientation', params, sf, bi);
            one_('bubblestyle_d', params, sf, bi);
            one_('explanation_d', params, sf, bi);
            one_('show_hl_d', params, sf, bi);
            one_('b_width', params, sf, bi);
            one_('b_height', params, sf, bi);
            one_('position_b', params, sf, bi);

            if (c.video_mode && params.b_duration < 0) {
                params.b_duration = c.global_params.g_vm_infinite_bubble_dur;
            }

            if (params.all_like_demo) {
                params.b_duration_p = params.b_duration;
                params.orientation_p = params.orientation;
                params.bubblestyle_p = params.bubblestyle_d;
                params.explanation_p = params.explanation_d;
                params.show_hl_p = params.show_hl_d;
                params.b_width_p = params.b_width;
                params.b_height_p = params.b_height;
                params.position_bu = params.position_b;
            }
        },

        click: function(c, params, name) {
            var sf = c.defaults && c.defaults[name] || {};
            var bi = MacroDefaults[name] || {};
            one_('explanation_d', params, sf, bi);
            one_('explanation_p', params, sf, params.explanation_d);
        },

        input_text: function(c, params, name) {
            var sf = c.defaults && c.defaults[name] || {};
            var bi = MacroDefaults[name] || {};
            one_('explanation_d', params, sf, bi);
            one_('explanation_p', params, sf, params.explanation_d);
            one_('text_d', params, sf, bi);
            one_('text_full', params, sf, params.text_d);
        },

        input_radio: function(c, params, name) {
            var sf = c.defaults && c.defaults[name] || {};
            var bi = MacroDefaults[name] || {};
            one_('choose_bool', params, sf, bi);
            one_('text_full', params, sf, params.choose_bool == 1 ? '1' : '0');
        },

        select_single: function(c, params, name) {
            var sf = c.defaults && c.defaults[name] || {};
            var bi = MacroDefaults[name] || {};
            one_('choose_text', params, sf, bi);
            one_('text_full', params, sf, params.choose_text);
        }
    };

    function one_(key, pa, sf, bi) {
        // do not override already defined params
        if (pa[key] != undefined) return;

        if (sf[key] != undefined) {
            // user-space default exists
            pa[key] = sf[key];
            return;
        }

        // else: built-in info is available
        if (typeof bi != 'object') {
            // built-in is a direct value
            pa[key] = bi;
        } else if (bi[key]) {
            // fallback exists
            if (bi[key].v != undefined) {
                // built-in default exists
                pa[key] = bi[key].v;
            } else {
                // try to set sth depending on type
                switch (bi[key].t.toLowerCase()) {
                    case 'integer':
                        if (key.indexOf('padding_') === 0 || key.indexOf('border_') === 0) break;
                        pa[key] = 0;
                        break;
                    case 'bool_0_1':
                        pa[key] = 0;
                        break;
                    case 'bool_true_false':
                    case 'bool_yes_no':
                        pa[key] = false;
                        break;
                    case 'size':
                        pa[key] = {width: 0, height: 0};
                        break;
                    case 'image_wh':
                        pa[key] = {id: ''};
                        break;
                    default:
                        pa[key] = '';
                        break;
                }
            }
        } // else: wrong key; ignore
    };

    function all_(c, name, params) {
        var pa = params || {};  // list of params
        var bi = MacroDefaults[name == 'global' ? 'Globals' : name] || {};  // list of built-in defaults from Headers.xml
        var sf = c.defaults && c.defaults[name] || {};  // list of defaults from "config:simulation_fallbacks.js"
        var gl = APPLY_GLOBALS[name] || {};  // list of attributes that should be clamped to a c.global_param
        var gp = c.global_params;

        // determine max attribute map

        var keys = [];
        for (var key in pa) keys.push(key);
        for (var key in bi) keys.push(key);
        for (var key in sf) keys.push(key);

        // apply global params
        for (var key in gl) {
            // do not override already defined params or available user-space params
            if (pa[key] == undefined && sf[key] == undefined && gl[key] != undefined) {
                pa[key] = gp[gl[key]];
            }
        }

        // apply defaults
        for (var i = 0, key = null; key = keys[i++];) {
            one_(key, pa, sf, bi);
        }

        var m = {demo: ['p', 'd'], practice: ['d', 'p']}[params.expl_like];
        if (m) params['explanation_' + m[0]] = params['explanation_' + m[1]];
    };

    return {  // MacroDefaultsHandler
        PrepareGlobals: function(c) {
            all_(c, 'global', c.global_params);
        },

        PrepareMacro: function(c, name, params) {
            params.tabindex = c.mode === 'pres' ? 1 : name.slice(0,6) === 'slide_' ? 2 : -1;

            if (SPECIAL[name]) SPECIAL[name](c, params, name);
            all_(c, name, params);
        }
    };  // MacroDefaultsHandler
})();

/* ------------------------ String Templates -------------------- */

var string_templates = {
    explanation_long_nav_forw:
        '<ul class="expl_bub" style="padding:0;margin:0;width:100%;list-style-type:none;display:table;">' +
        '<li style="display:table-cell;vertical-align:top;"><img style="margin-right:4px;" src="skin:$#{type}.gif"></li>' +
        '<li style="display:table-cell;vertical-align:top;width:99%;">$%{bubbletext}</li>' +
        '<li style="display:table-row;"><div style="display:table-cell"></div><div style="text-align:right;white-space:nowrap;display:table-cell;vertical-align:bottom;">' +
        '<a role="button" tabindex="1" href="javascript:ctx.cfg_show(\'trigger!page.task_next\');" title="Next" aria-label="Next" style="cursor:pointer;vertical-align:top;margin:1px;margin-top:0.75em;display:inline-block;border:0;text-decoration:none;background-color:transparent;">$%{g_linktextpraxis}</a>' +
        '</div></li>' +
        '</ul>',

    explanation_long_nonav:
        '<ul class="expl_bub" style="padding:0;margin:0;width:100%;list-style-type:none;display:table;">' +
        '<li style="display:table-cell;vertical-align:top;"><img alt="$#{type}" style="margin-right:4px;" src="skin:$#{type}.gif"></li>' +
        '<li style="display:table-cell;vertical-align:top;width:99%;">$%{bubbletext}</li>' +
        '</ul>',

    bubbletext_d:
        "$%{explanation_d}",

    bubbletext_d_nav:
        '$%{explanation_d}<div style="text-align:right;white-space:nowrap;clear:both;">' +
        '<a role="button" tabindex="1" href="javascript:ctx.cfg_show(\'trigger!page.task_next\');" title="Next" aria-label="Next" style="cursor:pointer;vertical-align:top;margin:1px;margin-top:0.75em;display:inline-block;border:0;text-decoration:none;background-color:transparent;">$%{g_linktextpraxis}</a></div>'
};  // string_templates

var MacroHelper = (function() {
    var DEF_TS_DURATION = 3000;

    function cleanup_undef_(data) {
        for (var k in data) {
            if (typeof data[k] == 'undefined') {
                delete data[k];
            }
        }
    };

    return {  // MacroHelper
        GetMode: function(c) {
            var i = c.internal;
            var m = i.mode;

            if (i.form) {
                return 'form_' + m;
            } else if (i.branch) {
                return 'branch_' + m;
            }

            return m;
        },

        IsPresMode: function(c) {
            return c.mode == 'pres' || c.mode == 'guided';
        },

        IsManualDemoMode: function(c) {
            return c.mode == 'praxis' || this.IsPresMode(c);
        },

        FinalizeMacro: function(c, mac, params) {
            if (mac.task_set && params.uid) c.TaskSetSetMacroUid(mac.task_set, params.uid);

            if (mac.coll && mac.coll.id && mac.coll.count0 > 0) {
                MacroHelper.AddControl(c, mac.coll, mac.task_set);
            }
        },

        CreateTrackingDummy: function(c, params, where /*, taskset*/) {
            var fn = 'TaskSetAdd' + (where == 'start' ? 'Start' : 'End') + 'Event';
            var id = params.uid + '_tracking_dummy';
            var ctl = {
                type: 'tracking_dummy',  // will create a SR.RectControl
                id: id,
                hidden: true,
                macro_uid: params.uid,
                macro_caption: params.macro_template
            };

            if (params.dummy_desc) ctl.macro_description = params.dummy_desc;

            var ts;
            var ev = '';
            if (arguments[3]) {
                // taskset exists
                ts = arguments[3];
            } else {
                ts = id;
                ev = ';page.task_next';
                c.AddTaskSet(ts);
            }

            c[fn](ts, 'page.track#' + id + ev);
            MacroHelper.AddControl(c, ctl, ts);
        },

        CreateActionUebung: function(c, mac) {
            var is_test = c.internal.mode == 'test';

            var hl_id = mac.hl && mac.hl.id || '';
            if (mac.hl_overlay) hl_id += ';' + mac.hl_overlay.id;

            mac.testo = MacroCtlCreator.Testomat(c, mac, hl_id, mac.coll.id + '.flag_' + mac.coll.count0++);
            mac.testo.scorable = is_test;
            MacroHelper.AddControl(c, mac.testo, mac.task_set, 'activate');

            if (is_test || c.global_params.g_practice_feedback == 'standard') {
                mac.b_info = MacroBubbleCreator.Info(c, mac.params);
                MacroHelper.AddControl(c, mac.b_info, mac.task_set);

                if (c.global_params.g_show_ok_bubble && c.internal.mode == 'test') {
                    mac.b_ok = MacroBubbleCreator.Ok(c, mac.params);

                    if (mac.b_ok) MacroHelper.AddControl(c, mac.b_ok, mac.task_set);
                    if (!c.global_params.g_skip_ok_bubble_on_mistake) {
                        mac.b_fail = MacroBubbleCreator.Fail(c, mac.params);
                        if (mac.b_fail) MacroHelper.AddControl(c, mac.b_fail, mac.task_set);
                    }
                }
            } else {
                mac.testo.await_correct = c.global_params.g_practice_feedback == 'never_await_correct';
            }

            if (mac.ctl) {
                c.TaskSetAddStartEvent(mac.task_set, 'page.ignore_sim_action#' + mac.ctl.id);
                c.TaskSetAddEndEvent(mac.task_set, 'page.handle_sim_action#' + mac.ctl.id);
                mac.ctl.oncorrectanswer = mac.testo.id + '.correct_answer';
                mac.ctl.onwronganswer = mac.testo.id + '.wrong_answer';
            }
        },

        GetTaskset: function(c, params) {
            if (c.internal.branch) {
                return c.internal.branch.set;
            } else if (c.internal.form) {
                return c.internal.form.set;
            } else {
                c.AddTaskSet(params.uid);
                return params.uid;
            }
        },

        GetTasksetTime: function(c, mac) {
            // calc taskset duration with respect to params and audio
            var int = c.internal;
            var bub_d = mac.params.b_duration;
            var dur;
            int.wait_user = false;
            if (bub_d < 0) {
                if (c.video_mode) {
                    bub_d = c.global_params.g_vm_infinite_bubble_dur * 1000;
                } else {
                    int.wait_user = true;
                    bub_d = DEF_TS_DURATION;
                }
            } else {
                bub_d = Math.max(0, bub_d * 1000);
            }
            if (int.ts_audio_dur && int.audio_on) {
                var hidden_b_d = int.mode == 'demo' && mac.params.show_bubble_d === false;
                var hidden_b = !int.text_on || hidden_b_d;
                dur = hidden_b
                    ? int.ts_audio_dur
                    : Math.max(int.ts_audio_dur, bub_d);
            } else if (int.ts_audio_remaining) {
                var hidden_b_d = int.mode == 'demo' && mac.params.show_bubble_d === false;
                var hidden_b = !int.text_on || hidden_b_d;
                dur = hidden_b
                    ? int.ts_audio_remaining
                    : Math.max(int.ts_audio_remaining, bub_d);
                int.ts_audio_remaining = 0;
            } else {
                dur = bub_d;
            }
            if (int.ts_has_audio && !int.audio_on && c.global_params.g_bydesign_playback) {
                int.wait_user = true;
            }
            return dur;
        },

        AddControl: function(c, ctl /*, task_set, action*/) {
            cleanup_undef_(ctl);
            c.AddControl(ctl);

            var task_set = arguments[2];
            var action = arguments[3];
            if (task_set) {
                c.TaskSetAddControl(task_set, ctl.id);
                if (action) c.TaskSetAddStartEvent(task_set, ctl.id + '.' + action);
            } else if (action) {
                c.AddStartEvent(ctl.id + '.' + action);
            }
        },

        EvalString: function(c, s, params) {
            var plist = WCT.DeepCopy(c.global_params);
            WCT.ExtendObject(plist, params);

            var ci = c.GetContentInfo();
            WCT.ExtendObject(plist, {
                'project:.uid': ci.uid,
                'project:.caption': ci.caption,
                'project:.shortdesc': ci.shortdesc,
                'project:.description': ci.description
            });

            var ctx = MacroHelper.CreateContext(c, params);
            return WCT.Placeholder.Resolve(s, ctx, null, {param_list: plist});
        },

        GetMacroDescription: function(c, params /*, mode*/) {
            var mode = arguments[2] || c.internal.mode;

            if (mode == 'test' || mode == 'uebung') {
                params.bubbletext = params.explanation_p;
            } else if (mode == 'demo') {
                params.bubbletext = params.explanation_d;
            } else {
                // unsupported
                return '';
            }

            // when we have branches with overlaying input fields that will be merged
            if (params.text_d && params.text_d.isArray) {
                params = WCT.DeepCopy(params);
                params.text_d = params.text_d.join(' ' + c.Trans('EXER_OR') + ' ');
            }

            // params.bubbletext = MacroRenderer.FixDescriptionPlaceholder(params, params.bubbletext);
            return this.EvalString(c, params.bubbletext || '', params);
        },

        GetClickConf: function(c, params, type) {
            var b = Number(c.global_params[c.mode == 'guided' ? 'g_gm_highlight_border' : 'g_highlight_border']);
            var x = params.x;
            var y = params.y;
            var w = params.w;
            var h = params.h;
            var circle = false;

            if (params.macro_template == 'click') {
                circle = params.w == 0 && params.h == 0;

                if (circle && (type == 'hl' || MacroHelper.IsPresMode(c) || MacroHelper.GetMode(c).indexOf('demo') < 0)) {
                    // to prevent that border is clamped to 0 in SR
                    w = Math.max(20, b * 2 + 1);
                    h = w;

                    var r = w >> 1;
                    x -= r;
                    y -= r;
                }
            }

            return {
                x: x,
                y: y,
                w: w,
                h: h,
                b: b,
                c: circle
            };
        },

        ShowCursorHand: function(c, v) {
            return this.IsPresMode(c) ? true : v;
        },

        ShowHighlight: function(c /*, custom*/) {
            switch (c.mode) {
                case 'guided':
                    return c.global_params.g_gm_show_highlight;
                case 'pres':
                    return true;
                default:
                    return arguments[1] ? true : false;
            }
        },

        ShowBubble: function(c /*, custom*/) {
            return this.IsPresMode(c) ? false : (arguments[1] ? true : false);
        },

        ShowMouse: function(c) {
            switch (c.mode) {
                case 'demo':
                case 'praxis':
                case 'guided':
                    return c.global_params.g_show_mouse;
                default:
                    return false;
            }
        },

        CreateContext: function(c /*, params*/) {
            var params = arguments[1];
            var ctx = c.GetContext() || new WCT.context();
            ctx.SetScope('macro');
            if (params) ctx.Set('macro', params.uid);
            return ctx;
        },

        ConsumeTourstopAudio: function(c, mac) {
            var int = c.internal;
            var ac = int.ts_audio_ctl;
            var m = BROWSER.MOBILE;
            if (ac && int.audio_on) {
                if (mac.audio_onfinish) {
                    ac.onfinish = (ac.onfinish || '') + mac.audio_onfinish;
                } else if (mac.coll && int.ts_audio_dur) {
                    // std finish action
                    ac.onfinish = (ac.onfinish || '') + mac.coll.id + '.flag_' + mac.coll.count0++;
                }
                // do not try to start audio in mobile playback, it wont work
                // and will lead to error event from media object handler
                if (int.ts_audio_dur || !int.starter_done) {
                    MacroHelper.AddControl(c, ac, null, !m || int.starter_done || mac.type != 'intro_page' ? 'play' : undefined);
                }
                if (m) int.starter_done = true;
                if (mac.time && int.ts_audio_dur) {
                    int.ts_audio_remaining = Math.max(0, int.ts_audio_dur - mac.time);
                }
                int.ts_audio_ctl = null;
                int.ts_audio_dur = 0;
                return true;
            }
            int.ts_audio_ctl = null;
            int.ts_audio_dur = 0;
            return false;
        },

        ReverseQuizOrder: function(c, mac, gr) {
            // reverse skin data
            var g = mac.skin[gr].groups;
            var l = g.length - 1;
            for (var i = 0; i <= l; i++) {
                g[i].elements.reverse();
            }
            // reverse controls in mac
            mac.controls[gr].reverse();
            // reset order in mac.positions
            for (var p in mac.controls) {
                if (p == 'frame') continue;
                var skin_groups = mac.skin[p].groups;
                var gl = skin_groups.length - 1;
                for (var k = 0; k <= gl; k++) {
                    var skin = skin_groups[k].elements;
                    var l = skin.length - 1;
                    for (var i = 0; i <= l; i++) {
                        var s = skin[i];
                        for (var a in mac.positions) {
                            if (s.type == a) {
                                mac.positions[s.type] = {
                                    pos: p,
                                    group: k,
                                    ind: i
                                };
                            }
                        }
                    }
                }
            }
        }
    };  // MacroHelper
})();

var MacroBubbleCreator = (function() {
    function create_bubble_(c, params, sub_id) {
        var mode = c.internal.mode;
        if (mode == 'test') mode = 'uebung';

        var map = {
            demo: {
                orientation: 'orientation',
                bubblestyle: 'bubblestyle_d',
                width: 'b_width',
                height: 'b_height',
                position: 'position_b'
            },
            uebung: {
                orientation: 'orientation_p',
                bubblestyle: 'bubblestyle_p',
                width: 'b_width_p',
                height: 'b_height_p',
                position: 'position_bu'
            }
        }[mode];
        if (!map) return null;  // unsupported mode

        // bubble orientation
        var ori = params[map.orientation];
        var rp = params[map.position];
        var bub_style = params[map.bubblestyle];
        var bub_width = params[map.width];
        var bub_height = params[map.height];

        // bubble position (XXX: not proper now)
        var x;
        var y;
        if (!rp.elem) {
            // if no elem available place in center of screenshot and set to center
            x = (c.internal.page_size_w >> 1) - (bub_width >> 1);
            y = (c.internal.page_size_h >> 1) - (bub_height >> 1);
            ori = 'c';
        } else if (params.ctl_rect && rp.elem.id != 'page') {
            x = params.ctl_rect.left + params.ctl_rect.width * rp.XY.x;
            y = params.ctl_rect.top + params.ctl_rect.height * rp.XY.y;
        } else {
            if (!c.internal.page_size_w || !c.internal.page_size_h) {
                // happens when explanation bubble is in front of new page macro (working with T7)
                c.internal.page_size_w = 800;
                c.internal.page_size_h = 600;
                var np = c.GetMacrosByType('new_page', true);
                np = np.length ? np[0] : null;
                np = np && np.dump_page_size;
                if (np) {
                    if (np.width > 0) c.internal.page_size_w = np.width;
                    if (np.height > 0) c.internal.page_size_h = np.height;
                }
            }
            x = c.internal.page_size_w * rp.XY.x;
            y = c.internal.page_size_h * rp.XY.y;
        }

        if (isNaN(x)) x = 0;  // happens if page is missing
        if (isNaN(y)) y = 0;  // happens if page is missing
        if (rp.Off) {
            x += rp.Off.x;
            y += rp.Off.y;
        }
        x = Math.floor(x);
        y = Math.floor(y);

        return {
            type: 'bubble',
            id: params.uid + sub_id,
            text: MacroHelper.GetMacroDescription(c, params),
            tabindex: 1,
            bubblestyle: bub_style,
            orientation: ori,
            hidden: true,
            x: x,
            y: y,
            w: bub_width,
            h: bub_height,
            z: 1000
        };
    };

    return {  // MacroBubbleCreator
        BUB_ID_TASK: '_bub',
        BUB_ID_INFO: '_binfo',
        BUB_ID_OK: '_bok',
        BUB_ID_FAIL: '_bfail',
        BUB_ID_EXPL: '_bexpl',

        Info: function(c, params) {
            var x = c.internal.page_size_w / 4;
            var y = Math.floor(c.internal.page_size_h / 2);
            var w = 240;
            var h = 80;

            if (c.taskinfo_ori_.indexOf('E') < 0) x *= 3;
            x = Math.floor(x);

            if (PLATFORM.WINCE) {
                x = 125;
                y = 50;
                w = 200;
            }

            return {
                type: 'bubble',
                id: params.uid + this.BUB_ID_INFO,
                hidden: true,
                tabindex: 1,
                bubblestyle: c.global_params.g_bubblestyle_feedback,
                orientation: 'C',
                movable: true,
                ignore_sim_action: true,
                x: x,
                y: y,
                w: w,
                h: h,
                z: 1001
            };
        },

        Fail: function(c, params) {
            var x = c.internal.page_size_w / 2;
            var y = c.internal.page_size_h / 2;

            return {
                type: 'bubble',
                id: params.uid + this.BUB_ID_FAIL,
                text: '<p style="font-size:16px;font-weight:bold;text-align:center;">' + c.Trans('CONTINUING') + '</p>',
                hidden: true,
                tabindex: 1,
                bubblestyle: c.global_params.g_bubblestyle_ok,
                orientation: 'C',
                ignore_sim_action: true,
                x: x,
                y: y,
                w: 96,
                h: 48,
                z: 1002
            };
        },

        Ok: function(c, params) {
            var x = c.internal.page_size_w / 2;
            var y = c.internal.page_size_h / 2;

            return {
                type: 'bubble',
                id: params.uid + this.BUB_ID_OK,
                text: '<p style="font-size:16px;font-weight:bold;text-align:center;">' + c.Trans('OK') + '</p>',
                hidden: true,
                tabindex: 1,
                bubblestyle: c.global_params.g_bubblestyle_ok,
                orientation: 'C',
                ignore_sim_action: true,
                x: x,
                y: y,
                w: 96,
                h: 48,
                z: 1002
            };
        },

        Task: function(c, params /*, string_tpl*/) {
            var ctl = create_bubble_(c, params, this.BUB_ID_TASK);
            if (!ctl) return null;

            var string_tpl = arguments[2];
            if (string_tpl && string_templates[string_tpl]) {
                ctl.text = MacroHelper.EvalString(c, string_templates[string_tpl], params);
                //ctl.text = MacroRenderer.FixDescriptionPlaceholder(params, ctl.text);
            }

            var gp = c.global_params;
            if (c.mode == 'praxis') {
                // praxis mode is mapped to demo in BeginTourstop
                if (gp.g_conc_min) ctl.closable = true;
                if (gp.g_conc_mov) ctl.movable = true;
            } else if (c.internal.mode == 'demo') {
                if (gp.g_demo_min) ctl.closable = true;
                if (gp.g_demo_mov) ctl.movable = true;
            } else if (c.internal.mode == 'uebung') {
                if (gp.g_prac_min) ctl.closable = true;
                if (gp.g_prac_mov) ctl.movable = true;
            }
            ctl.ignore_sim_action = true;
            ctl.mr_bubble_task = true;

            return ctl;
        },

        Explanation: function(c, params, string_tpl) {
            var ctl = create_bubble_(c, params, this.BUB_ID_EXPL);
            if (!ctl) return null;

            var tpl = string_templates[string_tpl];
            ctl.text = MacroHelper.EvalString(c, tpl || params.bubbletext, params);
            ctl.mr_bubble_expl = true;

            var gp = c.global_params;
            if (gp) {
                if (gp.g_expl_min) ctl.closable = true;
                if (gp.g_expl_mov) ctl.movable = true;
            }

            return ctl;
        }
    };  // MacroBubbleCreator
})();

var MacroCtlCreator = {
    MACRO_SCORE: 3,

    Testomat: function(c, mac, help_hl_id, on_continue) {
        var params = mac.params;
        var tb_id = c.internal.mode == 'uebung' && params.show_bubble_p
            ? params.uid + MacroBubbleCreator.BUB_ID_TASK
            : null;

        var desc;
        if (mac.ctl && mac.ctl.macro_description) {
            desc = mac.ctl.macro_description;
        } else {
            desc = MacroHelper.GetMacroDescription(c, params);
            if (desc) {
                // resolve desc
                var ctx = MacroHelper.CreateContext(c, params);
                desc = ctx.ResolveHtmlString(desc);
            }
        }

        return {
            type: 'testomat',
            id: params.uid + '_testo',
            macro_uid: params.uid,
            macro_caption: params.macro_template,
            macro_description: desc,
            max_points: this.MACRO_SCORE,
            task_bubble: tb_id,
            info_bubble: params.uid + MacroBubbleCreator.BUB_ID_INFO,
            ok_bubble: params.uid + MacroBubbleCreator.BUB_ID_OK,
            fail_bubble: params.uid + MacroBubbleCreator.BUB_ID_FAIL,
            help_hl: help_hl_id,
            help_effect: c.global_params.g_highlight_help_effect || '',
            lesson_continue: on_continue,
            target_id: params.uid,
            ok_time: 400,
            active: 1,
            debug: c.global_params.g_macroset_debug,
            x: 200,
            y: -30,
            w: 90,
            h: 20,
            z: 1
        };
    },

    Poi: function(c, mac /*, params*/) {
        var p = arguments[2] || mac.params;
        var x = p.x || 0;
        var y = p.y || 0;
        var w = p.w || 1;
        var h = p.h || 1;

        if (mac.bub) {
            var cx1 = x;
            var cy1 = y;
            var cx2 = x + w;
            var cy2 = y + h;
            var bx1 = mac.bub.x;
            var by1 = mac.bub.y;
            var bx2 = bx1 + mac.bub.w;
            var by2 = by1 + mac.bub.h;
            x = Math.min(cx1, bx1);
            y = Math.min(cy1, by1);
            w = Math.max(cx2, bx2) - x;
            h = Math.max(cy2, by2) - y;
        }

        return {
            type: 'poi',
            id: mac.ctl.id + '_poi',
            x: x,
            y: y,
            w: w,
            h: h,
            time: 200,
            focus_type: 'centered'
        };
    },

    Highlight: function(c, params, sub_id, z, target_id /*, effect*/) {
        var cfg = MacroHelper.GetClickConf(c, params, 'hl');
        var gps = c.global_params;
        var clr = params.highlight_rgb || gps.g_highlight_rgb || '#00ffff';
        var overlay = params.overlay;
        var tpe = overlay ? 'overlay' : (cfg.c ? 'ellipse' : gps.g_highlight_type || 'rect');
        var eff = overlay ? '' : cfg.c ? 'hotspot' : gps.g_highlight_effect;

        if (c.mode == 'guided') {
            if (gps.g_gm_highlight_color) clr = gps.g_gm_highlight_color;
            if (gps.g_gm_highlight_type && !cfg.c) tpe = gps.g_gm_highlight_type;
            if (gps.g_gm_highlight_effect) eff = gps.g_gm_highlight_effect;
        } else if (c.mode === 'pres') {
            if (gps.g_highlight_help_rgb) clr = gps.g_highlight_help_rgb;
        }

        var isKeyPress = params.macro_template === 'key_press';
        var offset = overlay ? (isKeyPress ? 0 : 20) : 0;
        var ignoreTarget = !overlay && (cfg.c || target_id == null);
        var keyPressOverlay = isKeyPress && overlay;
        if (keyPressOverlay) ignoreTarget = true;

        return {
            type: 'highlight',
            id: params.uid + sub_id,
            color: clr,
            color_correct: gps.g_highlight_form_correct_rgb || '#000000',
            offset: offset,
            border: cfg.b,
            hidden: true,
            msie5: c.is_topmost && BROWSER.IE,
            x: cfg.x,
            y: cfg.y,
            w: keyPressOverlay ? 0 : cfg.w,
            h: keyPressOverlay ? 0 : cfg.h,
            z: z,
            target: target_id || null,
            ignore_target: ignoreTarget,
            hl_type: tpe,
            show_effect: eff != 'show' && eff != 'animate' ? 'show' : eff,
            flash_effect: eff
        };
    },

    Jumper: function(c, params) {
        return {
            type: 'jumper',
            id: params.uid + '_jmp',
            target: params.jump_target || 'tourstop!next'
        };
    },

    DropDownAni: function(c, params, target, duration, onfinish) {
        return {
            type: 'drop_down_ani',
            target: target,
            id: params.uid + '_dda',
            duration: duration,
            x: params.x,
            y: params.y,
            w: params.w,
            h: params.h,
            z: params.z + 1,
            use_mouse: MacroHelper.ShowMouse(c),
            wait_mouse: 200,
            action_mouse: c.mode == 'guided' ? '' : 'lclick',
            choose_text: params.choose_text,
            choose_nr: params.choose_nr,
            onfinish: onfinish
        };
    },

    Mouse: function(c, params, sub_id, z_offset, duration, onfinish) {
        var act = params.action;
        if (c.mode == 'guided') {
            act = act == 'drop' || act == 'rdrop' ? 'ndrop' : '';
        }

        return {
            type: 'mouse',
            id: params.uid + sub_id,
            duration: duration,
            action: act,
            ctrl: params.ctrl_key,
            alt: params.alt_key,
            shift: params.shift_key,
            drag_image: {id: params.fieldicon_drag || params.fieldicon || ''},
            x: params.x + (params.w * 0.3),
            y: params.y + (params.h * 0.8),
            z: params.z + z_offset,
            onfinish: onfinish
        };
    },

    Typist: function(c, params, sub_id, z_offset, target_id, duration) {
        return {
            type: 'typist',
            id: params.uid + sub_id,
            target_value: params.text_d,
            target: target_id,
            max_duration: duration,
            x: 0,
            y: 0,
            w: 20,
            h: 20,
            z: params.z + z_offset
        };
    },

    Collector: function(c, params, sub_id /*, count, action*/) {
        var count = typeof arguments[3] == 'number' ? arguments[3] : 0;
        var action = arguments[4] || null;
        return {
            type: 'collector',
            id: params.uid + sub_id,
            count0: count,
            oncount0: action,
            debug: c.global_params.g_macroset_debug,
            x: 100,
            y: -30,
            w: 90,
            h: 20,
            z: 0
        };
    },

    Timer: function(c, params, sub_id /*, time, action, ...*/) {
        var ctl = {
            type: 'timer',
            id: params.uid + sub_id,
            x: 0,
            y: -30,
            w: 90,
            h: 20,
            z: 0,
            debug: c.global_params.g_macroset_debug
        };

        var l = arguments.length;
        for (var i = 3, c = 0; i < l; i+=2) {
            if (arguments[i] != null && arguments[i + 1] != null) {
                ctl['time' + c] = arguments[i];
                ctl['ontimeout' + c++] = arguments[i + 1];
            }
        }

        return ctl;
    }
};  // MacroCtlCreator
if (!window.MacroRenderer) MacroRenderer = {};

(function() {

/*
valid mode encoding scheme examples:
quiz_default guided pres demo übung test praxis
0            0      0    1    1     0    0         => 12
0            0      0    1    1     0    1         => 13
0            0      0    1    1     1    0         => 14
0            0      0    1    1     1    1         => 15
0            1      1    1    1     0    1         => 61
0            1      1    1    1     1    1         => 63
1            0      0    0    0     0    0         => 64
*/
var PP_VALID_MODE = {
    imported_page: 13,
    new_slide: 13,
    explanation_long: 15,
    free_highlight: 61,
    goto_tourstop: 63,
    swf_page: 13,
    slide_arrow: 15,
    slide_big_arrow: 15,
    slide_link_textBoxIcon: 15,
    slide_image: 15,
    slide_icon_link: 15,
    slide_hrefarea: 15,
    mode_change: 15,
    mode_change_end: 15,
    puzzlequiz: 64,
    mchoice: 64,
    fibquiz: 64,
    sqmaquiz: 64,
    gridquiz: 64,
    matchquiz: 64,
    connquiz: 64,
    mixquiz: 64,
    scalequiz: 64,
    hotspotquiz: 64,
    quiz_eval: 64,
    quiz_shuffle_on: 64,
    quiz_shuffle_off: 64
};
var PP_OMMIT_Z = {
    start_unit: 1,
    end_unit: 1,
    form_on: 1,
    form_off: 1,
    new_page: 1,
    imported_page: 1,
    new_slide: 1
};
var PP_COMMON = {
    new_page: 1,
    imported_page: 1,
    new_slide: 1
};
var PP_PERM = {
    free_highlight: 1,
    slide_arrow: 1,
    slide_big_arrow: 1,
    slide_link_textBoxIcon: 1,
    slide_icon_link: 1,
    slide_hrefarea: 1
};
var PP_QUIZ = {
    puzzlequiz: 1,
    mchoice: 1,
    fibquiz: 1,
    sqmaquiz: 1,
    gridquiz: 1,
    matchquiz: 1,
    connquiz: 1,
    mixquiz: 1,
    scalequiz: 1,
    hotspotquiz: 1,
    quiz_shuffle_on: 1,
    quiz_shuffle_off: 1,
    quiz_eval: 1
};
var PP_NO_SINGLE_IN_VIDEO = {
    slide_arrow: 1,
    slide_big_arrow: 1,
    free_highlight: 1,
    slide_link_textBoxIcon: 1,
    slide_icon_link: 1,
    slide_image: 1,
    slide_hrefarea: 1,
    click: 1,
    key_press: 1,
    input_text: 1,
    select_single: 1,
    input_radio: 1
};
var PP_SINGLETON = {
    swf_page: 1,
    end_unit: 1
};
var PP_QUIZ_SHUFFLE = {
    on: 'quiz_shuffle_on',
    off: 'quiz_shuffle_off',
    t_random: 'qst_random_choice',
    t_shuffle: 'qst_shuffle_quizzes',
    t_some: 'qst_shuffle_count'
};
var PP_BRANCH = {
    on: 'branch_on',
    off: 'branch_off'
};
var PP_FORM = {
    on: 'form_on',
    off: 'form_off'
};
var PP_NOT_IN_TOPMOST = {
    intro_page: 1,
    slide_link_textBoxIcon: 1,
    puzzlequiz: 1,
    mchoice: 1,
    fibquiz: 1,
    sqmaquiz: 1,
    gridquiz: 1,
    matchquiz: 1,
    connquiz: 1,
    mixquiz: 1,
    scalequiz: 1,
    hotspotquiz: 1,
    quiz_shuffle_on: 1,
    quiz_shuffle_off: 1,
    quiz_eval: 1
};

function extend_address_(c, src, tclass, val) {
    if (src) {
        var a = {project: c.uid};
        a[tclass] = val;

        var co = new WCT.context({atts_: a, this_: tclass});
        return co.Expand(src).AsString();
    }

    return src;
};

function pp_get_by_list_(macros, list) {
    var res = [];
    for (var i = 0, m = null; m = macros[i++];) {
        if (list[m.macro_template]) res.push(m);
    }
    return res;
};

function pp_has_macro_(macros, list) {
    var idx = [];
    for (var k in list) {
        idx.push(macros.indexOfAtt(k, 'macro_template'));
    }
    return Math.max.apply(null, idx) >= 0;
};

function pp_assemble_(new_ts, t, blocks, no_audio) {
    if (blocks.length > 1) {
        delete t.macros;
        // re-assemble
        for (var j = 0, b = null; b = blocks[j++];) {
            var new_t = WCT.DeepCopy(t);
            if (no_audio == 'always' && j > 1 ||
                no_audio == 'onspecial' && b.is_special)
            {
                // do not play audio more than once OR
                // no audio for special topics
                new_t.audio = null;
                new_t.audio_duration = 0;
                delete b.is_special;
            }
            if (j > 1) {
                // do not show the virtual topics within timeline
                new_t.visible = false;
            }
            new_t.macros = b;
            new_ts.push(new_t);
        }
    } else {
        // unchanged topic; full copy
        new_ts.push(t);
    }
};

function pp_split_(tourstops, list, type) {
    var new_ts = [];
    for (var i = 0, t = null; t = tourstops[i++];) {
        var ms = t.macros;
        // splittable content inside?
        if (!pp_has_macro_(ms, list)) {
            // no; full copy
            new_ts.push(t);
            continue;
        }
        // get common macros
        var common = pp_get_by_list_(ms, PP_COMMON);
        // split
        var blocks = [];
        var perm = {};
        for (var j = 0, b = 0, is_special = false, m = null; m = ms[j++];) {
            if (PP_COMMON[m.macro_template]) continue;  // already processed
            if (list[m.macro_template]) {
                if (!is_special) {
                    if (blocks[b] && blocks[b].length) b++;
                    if (!blocks[b]) blocks[b] = [];
                    blocks[b].is_special = true;
                    is_special = true;
                    blocks[b].push(m);
                } else {
                    blocks[b].push(m);
                }
                continue;
            } else if (is_special || !blocks[b]) {
                if (is_special) {
                    is_special = false;
                    b++;
                }
                blocks[b] = WCT.DeepCopy(common);
                for (var k = 0; k < b; k++) {
                    if (perm[k]) blocks[b] = blocks[b].concat(perm[k]);
                }
            }
            if (PP_PERM[m.macro_template]) {
                if (!perm[b]) perm[b] = [];
                perm[b].push(m);
            }
            blocks[b].push(m);
        }
        if (blocks.length == 1 && common.length && type == 'quiz') {
            // in case we have a quiz combined with only common macros
            // they have to be splitted into a new block as well
            blocks.push(common);
        }
        // assemble
        pp_assemble_(new_ts, t, blocks, 'onspecial');
    }
    return new_ts;
};

function pp_prune_(tourstops, list) {
    for (var i = 0, t = null; t = tourstops[i++];) {
        var ms = t.macros;
        for (var j = 0, m = null; m = ms[j]; j++) {
            if (list[m.macro_template]) ms.splice(j--, 1);
        }
    }
};

function pp_remove_invalid_(c, tourstops) {
    var gp = c.global_params;
    var mo = c.mode;

    for (var i = 0, ts = null; ts = tourstops[i++];) {
        var ms = ts.macros;

        for (var j = 0, m = null; m = ms[j++];) {
            var vm = PP_VALID_MODE[m.macro_template];
            if (vm == null) continue;

            // clamp
            if ((vm & 64) != 0) {  // quiz default?
                // ..to global quiz defaults
                if (m.in_demo == null) m.in_demo = gp.g_in_demo != 0;
                if (m.in_practice == null) m.in_practice = gp.g_in_practice != 0;
                if (m.in_test == null) m.in_test = gp.g_in_test != 0;
                if (m.in_prax == null) m.in_prax = false;
                if (m.in_guided == null) m.in_guided = gp.g_in_guided != 0;
                if (m.in_pres == null) m.in_pres = gp.g_in_pres != 0;
            } else {
                // ..in standard way
                var gu = (vm & 32) != 0;  // in guided?
                var ps = (vm & 16) != 0;  // in pres?
                var de = (vm & 8) != 0;  // in demo?
                var pr = (vm & 4) != 0;  // in practice?
                var te = (vm & 2) != 0;  // in test?
                var co = (vm & 1) != 0;  // in concurrent?

                if (m.in_demo == null) m.in_demo = de;
                if (m.in_practice == null) m.in_practice = pr;
                if (m.in_test == null) m.in_test = te;
                if (m.in_prax == null) m.in_prax = co;
                if (m.in_guided == null) m.in_guided = gu;
                if (m.in_pres == null) m.in_pres = ps;
            }

            // prune
            if (mo == 'demo' && !m.in_demo ||
                mo == 'uebung' && !m.in_practice ||
                mo == 'test' && !m.in_test ||
                mo == 'praxis' && !m.in_prax ||
                mo == 'guided' && !m.in_guided ||
                mo == 'pres' && !m.in_pres ||
                c.video_mode &&
                    (PP_QUIZ[m.macro_template] ||
                    m.macro_template == 'mode_change' ||
                    m.macro_template == 'mode_change_end'))
            {
                // not accepted in this (video) mode
                ms.splice(--j, 1);
            }
        }
    }

    if (c.video_mode) {
        for (var i = 0, ts = null; ts = tourstops[i++];) {
            var ms = ts.macros;
            var iv = true;

            // scan for any macro that is allowed in video_mode for current topic
            for (var j = 0, m = null; m = ms[j++];) {
                if (!PP_NO_SINGLE_IN_VIDEO[m.macro_template]) {
                    iv = false;
                    break;
                }
            }

            // no such macro found; all macros of current topic are invalid
            if (iv) ts.macros = [];
        }
    }
};

function pp_lesson_end_special_(tourstops) {
    for (var i = 0, ts = null; ts = tourstops[i++];) {
        var idx = ts.macros.indexOfAtt('end_unit', 'macro_template');

        if (idx >= 0) {
            var m = ts.macros[idx];
            var lpp = m.last_page_pause;
            var sep = m.show_end_page;
            if (lpp > 0 && sep) {
                // scenario with end page and last page pause, need to split tourstop
                var new_t = WCT.DeepCopy(ts);
                new_t.uid += '_end_page';
                var nm = new_t.macros[idx];
                nm.last_page_pause = -1;
                var mac = new_t.macros;
                var res = [];
                // remove all macros that we do not want to have in the
                // last tourstop as they would appear twice
                for (var j = 0, cm = null; cm = mac[j++];) {
                    if ({new_page: 1, end_unit: 1}[cm.macro_template]) res.push(cm);
                }
                new_t.macros = res;

                // add macro after current
                tourstops.splice(i, 0, new_t);

                // alter original show_end_page value
                m.show_end_page = false;
                m.macro_template = 'end_unit_wait';  // pseudo macro to be called
            }
        }
    }
    return tourstops;
};

function pp_lesson_fixes_(tourstops) {
    var tests = [{
        obj: PP_QUIZ_SHUFFLE,
        cond: false
    }, {
        obj: PP_BRANCH,
        cond: true
    }, {
        obj: PP_FORM,
        cond: true
    }];
    // start_unit macro needs to be on top of lesson (very first macro)
    for (var i = 0, ts = null; ts = tourstops[i++];) {
        var idx = ts.macros.indexOfAtt('start_unit', 'macro_template');
        if (idx >= 0) {
            if (i == 1 && idx == 0) break;  // already 1st macro
            // move to front
            var su = ts.macros.splice(idx, 1)[0];
            tourstops[0].macros.unshift(su);
            break;
        }
    }
    // quizz-shuffle, branches, form-mode fixes
    for (var i = 0, ts = null; ts = tourstops[i++];) {
        var ms = ts.macros;
        for (var j = 0, t = null; t = tests[j++];) {
            var s = ms.indexOfAtt(t.obj.on, 'macro_template');
            var e = ms.indexOfAtt(t.obj.off, 'macro_template');
            if (s < 0 && e < 0) continue;
            if (s >= 0 && e >= 0) {
                var extra = [];
                // gather all not accepted macros
                var c = 0;
                for (var k = s + 1; k < e; k++) {
                    if (t.cond && PP_QUIZ[ms[k].macro_template] ||
                        !t.cond && !PP_QUIZ[ms[k].macro_template])
                    {
                        extra.push(ms.splice(k--, 1)[0]);
                        e--;
                    } else {
                        c++;
                    }
                }
                if (!c) {
                    // empty quiz selection / branch; remove start and end macro; useless
                    ms.splice(s, 2);
                    var len = extra.length;
                    while (len--) {
                        ms.push(extra.shift());
                    }
                } else {
                    // put extra macros before quiz / branch start
                    var len = extra.length;
                    while (len--) {
                        ms.splice(s, 0, extra.pop());
                    }
                }
            } else {
                // no start and end macro; useless; remove other
                ms.splice(Math.max(s, e), 1);
            }
        }
        // DPS-22205
        if (ms.length == 1 && ms[0].macro_template == 'new_page') {
            // DPS-23177: do not prune new_page only topics that contain audio
            if (!ts.audio || !ts.audio_duration) ms.pop();
        }
    }
};

function extend_address_(c, src, tclass, val) {
    if (src) {
        var a = {project: c.uid};
        a[tclass] = val;
        var co = new WCT.context({atts_: a, this_: tclass});
        return co.Expand(src).AsString();
    }
    return src;
};

function pp_prepare_dnd_(c, tourstops) {
    for (var i = 0, t = null; t = tourstops[i++];) {
        var ms = t.macros;

        for (var j = 1, m = null; m = ms[j]; j++) {
            if (m.macro_template == 'click') {
                var pm = ms[j - 1];

                if ((m.action == 'drop' || m.action == 'rdrop') &&
                     (pm.action == 'drag' || pm.action == 'rdrag'))
                {
                    if (c.mode == 'demo' || c.mode == 'praxis' || c.mode == 'guided') {
                        m.fieldicon = extend_address_(c, m.fieldicon, 'macro', m.uid);
                        pm.fieldicon = extend_address_(c, pm.fieldicon, 'macro', pm.uid);
                        m.fieldicon_drag = pm.fieldicon || ''; // needed for mouse dnd display
                    } else {
                        m.right = !BROWSER.MOBILE && m.action.charAt(0) == 'r';  // DPS-39004
                        m.action = 'dragdrop';
                        m.fieldicon_drag = pm.fieldicon ? extend_address_(c, pm.fieldicon, 'macro', pm.uid) : '';
                        m.fieldname_drag = pm.fieldname || '';

                        if (pm.ctl_rect) {
                            m.drag_x = pm.ctl_rect.left;
                            m.drag_y = pm.ctl_rect.top;
                            m.drag_w = pm.ctl_rect.width;
                            m.drag_h = pm.ctl_rect.height;
                        } else {
                            m.drag_x = pm.x;
                            m.drag_y = pm.y;
                            m.drag_w = pm.w;
                            m.drag_h = pm.h;
                        }

                        m.alt_key = pm.alt_key || m.alt_key;
                        m.ctrl_key = pm.ctrl_key || m.ctrl_key;
                        m.shift_key = pm.shift_key || m.shift_key;

                        m.explanation_p = pm.explanation_p.replace(/fieldname/g, 'fieldname_drag')
                            .replace(/fieldicon/g, 'fieldicon_drag') + '<br/>' + m.explanation_p;

                        ms.splice(--j, 1);
                    }
                }
            }
        }
    }
};

function _preprocessQuizTemplate(tourstops) {
    var new_ts = [];
    var last = '';
    var cnt = -1;

    for (var i = 0, l = tourstops.length; i < l; i++) {
        var t = tourstops[i];
        var ms = t.macros;
        new_ts.push(WCT.DeepCopy(t));
        new_ts[++cnt].macros = [];  // reset macros

        for (var j = 0, k = ms.length; j < k; j++) {
            var m = ms[j];
            if (!PP_QUIZ[m.macro_template]) {
                new_ts[cnt].macros.push(m);
                continue;
            }
            // we have a quiz macro, check for template
            var ct = m.quiz_template || '';
            if (ct === last) {
                // same templates or no templates at all,
                // take macro and go on
                new_ts[cnt].macros.push(m);
                continue;
            }
            // quiz template change
            // create new ts just if necessary
            // (check if there is a macro already in current ts)
            if (new_ts[cnt].macros.length > 0) {
                new_ts.push(WCT.DeepCopy(t));
                new_ts[++cnt].macros = [];
            }
            new_ts[cnt].macros.push(m);
            last = ct;  // store last template id
        }
    }
    return new_ts;
};

function pp_quiz_shuffle_(tourstops) {
    // remember: topics contains non-quiz topics and pure-quiz topics only
    for (var i = 0, t = null; t = tourstops[i++];) {
        var ms = t.macros;
        for (var j = 0, m = null; m = ms[j]; j++) {
            if (m.macro_template == PP_QUIZ_SHUFFLE.on) {
                // shuffle starts, remove macro from topic
                var on_idx = j;
                ms.splice(j, 1);
                // search shuffle-end and collect all in-between quizzes
                var q = [];
                while (ms[j].macro_template != PP_QUIZ_SHUFFLE.off) {
                    q.push(ms.splice(j, 1)[0]);
                };
                ms.splice(j, 1);  // remove shuffle end macro
                var len = q.length;
                switch (m.quiz_selection_type) {
                    case PP_QUIZ_SHUFFLE.t_shuffle:
                        m.quiz_selection_count = len;
                    case PP_QUIZ_SHUFFLE.t_some:
                        q = q.shuffle();
                        var qsc = typeof m.quiz_selection_count == 'number' ? m.quiz_selection_count : 1;
                        var cnt = Math.min(qsc, len);
                        if (cnt != len) q.splice(cnt, len - cnt);
                        while (cnt--) {
                            ms.splice(on_idx++, 0, q.pop());
                        }
                        break;
                    case PP_QUIZ_SHUFFLE.t_random:
                    default:
                        var idx = Math.round(Math.random() * (len - 1));
                        q = q[idx];
                        q.points = m.points;
                        ms.splice(on_idx, 0, q);
                        break;
                }
            }
        }
    }
};

//disabled due to DPS-21588
//function pp_macro_split_(tourstops) {
//    var new_ts = [];
//    for (var i = 0, t = null; t = tourstops[i++];) {
//        var ms = t.macros;
//
//        // find all common macros within topic
//        var common = pp_get_by_list_(ms, PP_COMMON);
//
//        // split by non-perm and non-common macros
//        var blocks = [];
//        var perm = {};
//        var is_branch_form = false;
//        for (var j = 0, b = 0, m = null; m = ms[j++];) {
//            if (PP_COMMON[m.macro_template]) continue;  // already processed
//
//            if (PP_PERM[m.macro_template] && !is_branch_form) {
//                if (!perm[b]) perm[b] = [];
//                perm[b].push(m);
//            } else {
//                if (!blocks[b]) {
//                    blocks[b] = WCT.DeepCopy(common);
//
//                    for (var k = 0; k <= b; k++) {
//                        if (perm[k]) blocks[b] = blocks[b].concat(perm[k]);
//                    }
//                }
//
//                switch (m.macro_template) {
//                    case PP_BRANCH.on:
//                    case PP_FORM.on:
//                        is_branch_form = true;
//                        break;
//                    case PP_BRANCH.off:
//                    case PP_FORM.off:
//                        is_branch_form = false;
//                        break;
//                }
//
//                blocks[b].push(m);
//                if (!is_branch_form) b++;
//            }
//        }
//
//        // assemble
//        pp_assemble_(new_ts, t, blocks, 'always');
//    }
//
//    return new_ts;
//};

function pp_button_inputs_(c, tourstops) {
    for (var i = 0, t = null; t = tourstops[i++];) {
        var ms = t.macros;
        var is_branch_form = false;

        for (var j = 0, b = 0, m = null; m = ms[j]; j++) {
            switch (m.macro_template) {
                case PP_BRANCH.on:
                case PP_FORM.on:
                    is_branch_form = true;
                    break;
                case PP_BRANCH.off:
                case PP_FORM.off:
                    is_branch_form = false;
                    break;
                case 'input_text':
                    if (is_branch_form) {
                        m.affirmation_button = false;
                    } else if (m.affirmation_button) {
                        var desc = MacroHelper.GetMacroDescription(c, m, c.mode);
                        if (desc) {
                            // resolve desc
                            var ctx = MacroHelper.CreateContext(c, m);
                            desc = ctx.ResolveHtmlString(desc);
                        }

                        var fs = {
                            macro_template: 'form_on',
                            uid: m.uid + '_form_on',
                            input_affirmation: true
                        };
                        var fe = {
                            macro_template: 'form_off',
                            uid: m.uid + '_form_off',
                            show_bubble_p: m.show_bubble_p,
                            bubblestyle_p: m.bubblestyle_p,
                            b_width_p: m.b_width_p,
                            b_height_p: m.b_height_p,
                            orientation_p: m.orientation_p,
                            position_bu: m.position_bu,
                            form_text_p: desc,
                            form_score: 3,
                            form_affirmation: true
                        };

                        var btn = {
                            macro_template: 'click',
                            uid: m.uid + '_click',
                            orig_input_ctl_uid: m.uid,
                            action: 'lclick',
                            bubblestyle_d: m.bubblestyle_d,
                            b_width: m.b_width,
                            b_height: m.b_height,
                            orientation: 'SE',
                            position_b: m.position_b,
                            b_duration: m.b_duration,
                            bubblestyle_p: m.bubblestyle_p,
                            b_width_p: m.b_width_p,
                            b_height_p: m.b_height_p,
                            orientation_p: 'C',
                            position_bu: m.position_bu,
                            show_hl_d: m.show_hl_d,
                            show_hl_p: m.show_hl_p,
                            show_bubble_d: false,
                            show_bubble_p: false,
                            click_pos: {left: -1, top: -1},
                            click_count: 1,
                            ctl_button: m.btn_is_button,
                            ctl_rect: m.btn_rect,
                            cursor_hand: MacroHelper.ShowCursorHand(c, m.btn_cursor_hand),
                            autopilot: 'automatic'
                        };

                        // XXX: m.check_full_text ???
                        ms.splice(j, 1, fs, m, btn, fe);
                        j += 3;
                    }
                    break;
            }
        }
    }
};


function pp_branch_input_text_(c, tourstops) {
    if (!{'uebung': 1, 'test': 1}[c.mode]) return;
    // collect the macros which need to be combined
    var com = {};

    for (var i = 0, t = null; t = tourstops[i++];) {
        var ms = t.macros;
        var is_branch = false;
        var ctl_rects = [];  // collecting ctl rects and checking if they intersect later on

        for (var j = 0, b = 0, m = null; m = ms[j]; j++) {
            switch (m.macro_template) {
                case PP_BRANCH.on:
                    is_branch = true;
                    break;
                case PP_BRANCH.off:
                   is_branch = false;
                   var cur = {};
                    // branch off, check ctl_rects for current branch
                    for (var k = 0, l = ctl_rects.length; k < l; k++) {
                        var r1 = ctl_rects[k];
                        if (r1.is_intersecting) continue;  // already intersecting, continue

                        for (var m = 0, n = ctl_rects.length; m < n; m++) {
                            if (m === k) continue;  // no need to handle the same rects
                            var r2 = ctl_rects[m];
                            if (r2.is_intersecting) continue;  // already intersecting, continue

                            if (WCT.geometry.IntersectRect(r1, r2)) {
                                if (!cur[r1.uid]) cur[r1.uid] = [];
                                cur[r1.uid].push(r2.uid);
                                r1.is_intersecting = true;  // mark ctl rects, no need to handle them again
                                r2.is_intersecting = true;  // mark ctl rects, no need to handle them again
                            }
                        }
                    }

                    if (!com[t.uid]) com[t.uid] = {pos: i - 1};
                    com[t.uid].macros = cur;
                    ctl_rects = [];  // reset
                    break;
                case 'input_text':
                    if (!is_branch) continue;
                    var cr = m.ctl_rect;
                    ctl_rects.push({
                        uid: m.uid,
                        x: cr.left,
                        y: cr.top,
                        w: cr.width,
                        h: cr.height
                    });
                    break;
            }
        }
    }

    for (var ck in com) {
        var tc = com[ck];
        var ts = tourstops[tc.pos];
        var tsm = ts.macros;
        var tcm = tc.macros;

        for (var id in tcm) {
            var tar = tsm[tsm.indexOfAtt(id, 'uid')];
            var combine = tcm[id];
            for (var a = 0, l = combine.length; a < l; a++) {
                var idx = tsm.indexOfAtt(combine[a], 'uid');
                var src = tsm[idx];
                if (!tar.jump_target.isArray) tar.jump_target = [tar.jump_target];
                tar.jump_target.push(src.jump_target);

                if (!tar.text_d.isArray) tar.text_d = [tar.text_d];
                tar.text_d.push(src.text_d);

                tsm.splice(idx, 1);
            }
        }
    }
};

function pp_assign_z_index_(c, tourstops) {
    for (var i = 0, t = null; t = tourstops[i++];) {
        var ms = t.macros;
        var idx = 10;
        for (var j = 0, m = null; m = ms[j++];) {
            if (!PP_OMMIT_Z[m.macro_template]) m.z = idx++;
        }
    }
};

MacroRenderer.PreProcessTourstops = function(c, tourstops, config) {
    var new_ts = WCT.DeepCopy(tourstops);
    // save all original indexes and ensure robustness
    for (var i = 0, t = null; t = new_ts[i++];) {
        t.orig_index_ = t.index;
        if (!t.macros) t.macros = [];
    }
    if (c.mode == 'praxis') {
        // prune all macros that cannot be displayed in topmost
        pp_prune_(new_ts, PP_NOT_IN_TOPMOST);
    }
    // checking and fixing start_unit macro, quiz_shuffle and branches (DPS-21306)
    pp_lesson_fixes_(new_ts);
    // removing all macros that do not fit to current mode
    pp_remove_invalid_(c, new_ts);
    // checking and fixing drag and drop click macros
    pp_prepare_dnd_(c, new_ts);
    // handling special case end unit scenario (show end page and pause active)
    new_ts = pp_lesson_end_special_(new_ts);
    // splitting topics by singletons (macros that are supposed to be standalone)
    new_ts = pp_split_(new_ts, PP_SINGLETON, 'singleton');
    // splitting topics by quizzes (quizzes always standalone)
    new_ts = pp_split_(new_ts, PP_QUIZ, 'quiz');
    // processing quiz_shuffle
    pp_quiz_shuffle_(new_ts);
    // processing multiple quiz templates in one tourstop
    new_ts = _preprocessQuizTemplate(new_ts);
    // confirm with button input fields
    pp_button_inputs_(c, new_ts);
//    disabled due to DPS-21588
//    if (config.navigation == 'taskset' || config.mode == 'praxis') {
//        // navigation mode is set to taskset, so split all topics once again
//        // until they contain only common elements and exactly one non-common one
//        new_ts = pp_macro_split_(new_ts);
//    }
    pp_branch_input_text_(c, new_ts);


    // prune empty topics and set serially numbered internal indexes
    for (var i = 0, idx = 0, oidx = -1, t = null; t = new_ts[i]; i++) {
        if (t.orig_index_ > oidx) {
            oidx++;
        } else {
            delete t.orig_index_;
        }
        if (!t.macros.length) {
            new_ts.splice(i--, 1);
        } else {
            t.index = idx++;
        }
    }
    // set zindex in controls according to sequence in lesson.js
    pp_assign_z_index_(c, new_ts);
    return new_ts;
};

})();

if (!window.MacroRenderer) MacroRenderer = {};
(function() {
var INTRO_PAGE_INFO = {  // see also: create_intro_page_ -> intro_page_info
    def_preset_: 'Gold_Reflection',
    def_mod_ : '',
    def_w_: 995,
    def_h_: 605,
    def_link_target_: 2,  // this is SAP standard; 3rd tourstop is default
    byD_FP25: {
        item_col: '#F0AB00',
        dscr_col: '#000000',
        capt_col: '#F0AB00',
        canv_col: '#FFFFFF',
        bg_col: '#9F9F9F',
        capt_spc: '',
        link_img: 'skin:tri_link_ora2.png',
        page_img: 'skin:bbd_startpage.png',
        pic_img: 'skin:bbd_start_pic1.png'
    },
    Gold_Reflection: {
        item_col: '#2DA5FF',
        dscr_col: '#AFAFAF',
        capt_col: '#E8E8E8',
        canv_col: '#232323',
        bg_col: '#232323',
        capt_spc: '<br><br>',
        link_img: 'skin:tri_link_2011.png',
        page_img: 'skin:gr_startpage.png',
        pic_img: 'skin:gr_start_pic.png'
    },
    none: {
        item_col: '#F0AB00',
        dscr_col: '#000000',
        capt_col: '#F0AB00',
        canv_col: '#FFFFFF',
        bg_col: '#9F9F9F',
        capt_spc: '',
        link_img: 'skin:tri_link_ora2.png',
        page_img: 'skin:1.gif',
        pic_img: 'skin:1.gif'
    }
};
function add_allinf_ctls_(c, mac) {
    var p = mac.params;
    var d = p.all_info;
    if (typeof d != 'string' || !d) return;
    d = '{"info":' + d.replace(/'/g, '"') + '}';
    try {
        d = JSON.parse(d).info;
    } catch(e) {
        d = [];
    }
    var id = p.uid + '#';
    for (var i = 0, a = null; a = d[i++];) {
        switch (a.type) {
            case 'button':
                WCT.ExtendObject(a, {
                    id: id + i,
                    type: 'inputclick',
                    hidden: false,
                    hide_scrollbars: true,
                    x: a.x,
                    y: a.y,
                    w: a.w,
                    h: a.h,
                    z: 1,
                    button: true,
                    border: 0,
                    padding: 0
                });
                break;
            case 'input':
                WCT.ExtendObject(a, {
                    type: 'inputtext',
                    id: id + i,
                    z: 1
                });
                break;
            default:
                a = null;
                break;
        }
        c.AddControl(a);
    }
};
function intro_item_text_(capt, desc, target, ps) {
    return ['<div style="font-size:10pt;color:', ps.dscr_col, '">', (desc || ''),
        '</div><table cellspacing="0" cellpadding="0" border="0"><tr onclick="ctx.cfg_show(\'',
        target, '\',null,null)"><td style="cursor:pointer;" valign="middle"><img src="',
        ps.link_img, '" border="0" />&nbsp;&nbsp;</td><td>',
        '<a href="javascript:void(0);" style="text-decoration:none;font-size:12pt;color:',
        ps.item_col, ';cursor:pointer;">', capt, '</a></td></tr></table><br>'
    ].join('');
};
function prepare_macro_(c, mac_type, mac) {
    var p = mac.params;
    var itl = c.internal;
    mac.type = mac_type;
    mac.sctx = {_this: 'macro', macro: p.uid};
    c.SetSourceContext(mac.sctx);
};
function set_internal_mode_(c /*, mode*/) {
    var m = arguments[1] || c.mode;
    c.internal.mode = {praxis: 'demo', pres: 'demo', guided: 'demo'}[m] || m;
};
function create_intro_page_(c, mac) {
    var params = mac.params;
    mac.task_set = c.AddTaskSet(params.uid);
    c.TaskSetAddStartEvent(params.uid, 'taskinfo.hide;page.hide_mouse');
    c.TaskSetSetMacroUid(params.uid, params.uid);
    var ps = INTRO_PAGE_INFO[params.Preset];
    if (params.Preset != 'none') {
        this.new_page(c, {
            uid: params.uid,
            background_color: ps.bg_col,
            canvas_color: ps.canv_col,
            dump_page: ps.page_img,
            dump_page_size: { width: params.page_w_, height: params.page_h_ }
        });
    } else {
        c.SetSourceContext({_this: 'macro', macro: params.uid});
        // XXX: take page_w/page_h from previous slide/new_page?
    }
    var ctx = MacroHelper.CreateContext(c, params);
    var intro_page_info = {
        byD_FP25: {
            pic_x: params.page_w_ - 291, // page_w - app_img.w - 30
            pic_y: Math.round(params.page_h_ * 0.618033) - 258,  // bg.h - app_img.h / 2 - 40
            pic_w: 261,
            pic_h: 435,
            txt_x: 13,
            txt_y: 17,
            txt_w: 672,
            txt_h: 456
        },
        Gold_Reflection: {
            pic_x: 10,
            pic_y: params.page_h_ - 445,  // page_h - app_img.h - 10
            pic_w: 261,
            pic_h: 435,
            txt_x: 336,
            txt_y: 14,
            txt_w: 640,
            txt_h: 456
        },
        none: {
            pic_x: 1,
            pic_y: 1,
            pic_w: 1,
            pic_h: 1,
            txt_x: 336,
            txt_y: 14,
            txt_w: 640,
            txt_h: 456
        }
    }[params.Preset];
    ps = WCT.ExtendObject(ps, intro_page_info);
    var cap = WCT.CleanupHTMLString(params['caption' + params.mod_]);
    var txt = ctx.ExpandHtmlString(params['intro_text' + params.mod_]);
    var cont = ['<h1 style="font-family:Arial Black;font-size:18pt;color:', ps.capt_col, '">',
        cap, '</h1>', ps.capt_spc, '<div style="font-family:Arial;font-size:10pt;color:',
        ps.dscr_col, '">', txt, '</div><br /><br /><br />'
    ].join('');
    var ii = c.internal.intro_items || [];
    var first_act = null;
    for (var i = 0, ci = null; ci = ii[i]; i++) {
        var ts = ci.link_target || INTRO_PAGE_INFO.def_link_target_;
        ts = ts.toString().indexOf('!') < 0 ? 'tourstop!' + ts : ts;
        if (!first_act) first_act = ts.split('!')[1];
        ctx.Set('macro', ci.uid);
        ctx.SetScope('macro');
        cont += ctx.ResolveHtmlString(intro_item_text_(ci.link_text, ci.intro_text, ts, ps));
    }
    delete c.internal.intro_items;
    // intro page text
    var txt_ctl = {
        type: 'text',
        id: params.uid + '_txt',
        x: ps.txt_x,
        y: ps.txt_y,
        w: ps.txt_w,
        h: ps.txt_h,
        z: 3,
        text: cont,
        background_color: 'transparent',
        padding: 4,
        border: 0
    };
    // preview image
    var img_ctl = {
        type: 'image',
        id: params.uid + '_img',
        x: ps.pic_x,
        y: ps.pic_y,
        w: ps.pic_w,
        h: ps.pic_h,
        z: 4,
        href: params.macro_template == 'end_unit' ? 'action!restart' : 'trigger!page.task_next',
        background_color: 'transparent',
        image: { id: ps.pic_img, w: ps.pic_w, h: ps.pic_h },
        padding: 0,
        border: 0
    };
    if (c.is_audio_lesson && BROWSER.MOBILE) {
        txt_ctl.onclick = c.internal.ts_audio_ctl.id + '.play#mobile_confirmed;';
        img_ctl.onclick = c.internal.ts_audio_ctl.id + '.play#mobile_confirmed;';
    }
    if (c.video_mode && first_act) {
        var tmr = MacroCtlCreator.Timer(c, params, '_vm_tmr', c.global_params.g_vm_infinite_page_dur * 1000, 'page.tourstop_jump#' + first_act);
        MacroHelper.AddControl(c, tmr, null, 'start');
    }
    MacroHelper.AddControl(c, txt_ctl);
    MacroHelper.AddControl(c, img_ctl);
};

function handle_placeholders_(c, params, ctls, ctx, doAdd) {
    var re = /\$[#|%]\{([^\}]*?)\}/g;
    var se = null;
    var tried = false;

    for (var id in ctls) {
        var ctl = ctls[id];

        if (ctl.type == 'placeholder') {
            // DPS-29474
            if (ctl.placeholder_text == 'slidetitle' ||
                ctl.placeholder_text == 'slidedescription')
            {
                if (!se && !tried) {
                    se = c.LoadFile(params.src + ':entity.txt');
                    tried = true;
                }
                if (se) {
                    ctl.type = 'text';
                    ctl.text = ctl.placeholder_text == 'slidetitle'
                        ? se.caption
                        : se.description;
                }
            }
        } else if (ctl.text) {
            // DPS-39350
            var t = ctl.text;
            var m = t.match(re);
            // DPS-39827
            var l =  m ? m.length : 0;
            if (!se && !tried) {
                se = c.LoadFile(params.src + ':entity.txt');
                tried = true;
            }
            if (se) {
                for (var i = 0; i < l; i++) {
                    var key = m[i].replace(/[$|%|#|{|}|.|:]/g, '').replace('slide', '');
                    t = t.replace(m[i], se[key] || m[i]);
                }
            }
            ctl.text = t;
        }

        ctx.ExpandSlideControl(ctl);
        if (doAdd) c.AddControl(ctl);
    }
};

MacroRenderer.T2_BUILDNUMBER = '~~~T2-VERSION~~~';
MacroRenderer.AUDIO_MACROS = {
    input_text: 1,
    input_radio: 1,
    select_single: 1,
    click: 1,
    key_press: 1,
    explanation_long: 1
};
MacroRenderer.first_step_ = true;
/*
FixDescriptionPlaceholder: function(params, text) {
    var has_fi = params.fieldicon != '';
    var has_fn = params.fieldname != '';
    var has_one = has_fi || has_fn;
    if (has_fi && has_fn) return text; // nothing to do, leave it as it is
    var reg = new RegExp('<span style="font-weight:bold">(.*?)</span>');
    var res = text.split(reg);
    if (res.length != 3) return text;// we dont know how to handle that, return original string
    var span1 = '<span style="font-weight:bold">';
    var span2 = '</span>';
    var nbsp = '&nbsp;';
    return has_one ?
        res[0] + span1 + res[1].replace(nbsp, '') + span2 + res[2] :
        res[0] + res[2];
},
*/
MacroRenderer.Cleanup = function() {};
MacroRenderer.BeginTourstop = function(c, ts) {
    var int = c.internal;
    int.ts_uid = ts.uid;
    set_internal_mode_(c);
    // reset per-tourstop internals
    int.form = null;
    int.branch = null;
    int.page_size_w = null;
    int.page_size_h = null;
    int.highlight_cnt = 0;
    if (ts.audio && ts.audio_duration || c.is_audio_lesson && BROWSER.MOBILE) {
        var ctl = {
            type: 'audio',
            id: ts.uid + '_sound',
            name: ts.title + ' sound',
            src: '',
            soundchannel: 'tour_sound',
            volume: c.audio_vol,
            playonstart: 0,
            loop: 0,
            hidden: 0,
            video_mode: c.video_mode,
            x: 10,
            y: 10,
            w: 10,
            h: 10,
            z: 1,
            locked: 0
        };
        if (ts.audio) {
            ctl.src = 'project:' + ts.audio + c.audio_ext;
            if (ts.audio_duration) {
                int.ts_has_audio = true;
                int.ts_audio_dur = ts.audio_duration;
                int.ts_audio_remaining = 0;
                ctl.duration = ts.audio_duration;
            }
            if (c.video_mode) {
                ctl.onplay = 'page.video_audio_play;';
                ctl.onfinish = 'page.video_audio_finish;';
            }
        }
        int.ts_audio_ctl = ctl;
    } else {
        int.ts_has_audio = false;
        delete int.ts_audio_ctl;
    }
};
MacroRenderer.EndTourstop = function(c, ts) {
    // cleanup
    delete c.internal.form;
    delete c.internal.branch;
    delete c.internal.ts_audio_ctl;

    delete c.internal.quiz_template;

};
MacroRenderer.GetEmptyCommon = function() {
    // is called by T2.core in case that macroset did not create any
    // common element (no new_page, imported_page, new_slide, ...)
    return {
        page: {
            id: 'page',
            onload: 'page.task_next',
            w: 1000,
            h: 562
        }
    };
};
MacroRenderer.start_unit = function(c, params) {
    this.first_step_ = true;
    MacroDefaultsHandler.PrepareMacro(c, 'start_unit', params);
    var tinfo = {
        text: params.task_text,
        bgcolor: params.task_bgcolor,
        orientation: params.task_orientation,
        w: params.task_width,
        h: params.task_height,
        macro_uid: params.uid,
        in_demo: params.in_demo ? true : false,
        in_practice: params.in_practice ? true : false,
        in_test: params.in_test ? true : false,
        in_prax: params.in_prax ? true : false
    };
    c.SetTaskInfo(tinfo);
    c.SetScores(params.possible_points, params.mastery_score);
};

// pseudo control, just needed for combination of last page pause and show end page option
MacroRenderer.end_unit_wait = function(c, params) {
    MacroRenderer.end_unit.call(this, c, params, true);
};

MacroRenderer.end_unit = function(c, params/*, prevent_end */) {
    MacroDefaultsHandler.PrepareMacro(c, 'end_unit', params);
    var m = c.internal.mode;
    c.AddTaskSet(params.uid);
    c.TaskSetAddStartEvent(params.uid, 'page.hide_mouse');
    c.SetSourceContext({_this: 'macro', macro: params.uid});
    MacroHelper.CreateTrackingDummy(c, params, 'start', params.uid);
    var lpp = params.last_page_pause;
    if (!params.show_end_page || c.mode == 'praxis') {
        if (MacroHelper.IsPresMode(c)) {
           if (c.internal.last_page_ctl) {
               var lpc = c.internal.last_page_ctl;
               lpc.onclick = 'page.task_next;';

               if (!c.GetPageCtl()) {
                   // need to tell engine where to find the image
                   if (lpc.image && lpc.image.id) {
                       lpc.image.id = 'macro!' + lpc.macro_uid + ':' + lpc.image.id;
                   }
                   MacroHelper.AddControl(c, lpc);
               }
           }
        } else if (lpp > 0) {
            // wait lpp ms and go on
            var ctl = MacroCtlCreator.Timer(c, params, '_t', lpp * 1000, 'page.task_next');
            MacroHelper.AddControl(c, ctl, params.uid, 'start');
        } else if (!lpp || m != 'demo') {
            // go on immediately, in case no lpp == 0 or not demo/praxis mode
            // (remember: praxis mode mapped to demo in BeginTourstop)
            c.TaskSetAddStartEvent(params.uid, 'page.task_next');
        } else if (c.video_mode) {
            // DPS-33895
            var ctl = MacroCtlCreator.Timer(c, params, '_t', c.global_params.g_vm_infinite_end_page_dur * 1000, 'page.task_next');
            MacroHelper.AddControl(c, ctl, params.uid, 'start');
        }
        // else: wait for user interaction
        if (!arguments[2]) c.EndLesson(params.uid);
        return;
    }
    // display end page
    var mod = null;
    switch (c.internal.mode) {
        case 'demo':
            mod = '';
            break;
        case 'uebung':
            mod = '_p';
            break;
        case 'test':
            mod = '_t';
            params.end_text_t = c.LessonPassed(true)
                ? params.end_text_t_passed
                : params.end_text_t_failed;
            break;
        default:
            return;  // unsupported
    }
    c.TaskSetAddStartEvent(params.uid, 'panel.exit');
    // prevent infinite stop in video mode (DPS-33895)
    if (c.video_mode) {
        var ctl = MacroCtlCreator.Timer(c, params, '_t', c.global_params.g_vm_infinite_end_page_dur * 1000, 'page.task_next');
        MacroHelper.AddControl(c, ctl, params.uid, 'start');
        c.TaskSetAddEndEvent(params.uid, 'tracking.end');  // XXX maybe not even necessary for video mode!?
    } else {
        c.TaskSetAddStartEvent(params.uid, 'tracking.end');
    }
    if (c.internal.intro_page) {
        var ip = c.internal.intro_page;
        params.Preset = ip.preset || INTRO_PAGE_INFO.def_preset_;
        params.page_w_ = ip.page_w_ || INTRO_PAGE_INFO.def_w_;
        params.page_h_ = ip.page_h_ || INTRO_PAGE_INFO.def_h_;
        delete c.internal.intro_page;
    } else {
        var ip = c.GetMacrosByType('intro_page');
        ip = ip.length > 0 ? ip[0] : {};
        params.Preset = ip.Preset || INTRO_PAGE_INFO.def_preset_;
        params.page_w_ = INTRO_PAGE_INFO.def_w_;
        params.page_h_ = INTRO_PAGE_INFO.def_h_;
    }
    c.internal.intro_items = [{
        link_target: 'action!restart',
        link_text: c.Trans('RESTART')
    }];
    params.mod_ = mod;
    params['caption' + mod] = params['end_caption' + mod];
    params['intro_text' + mod] = params['end_text' + mod];
    create_intro_page_.call(this, c, {type: 'end_unit', params: params});
    c.EndLesson(params.uid);
};
MacroRenderer.new_page = function(c, params) {
    MacroDefaultsHandler.PrepareMacro(c, 'new_page', params);

    var mac = {params: params};
    prepare_macro_(c, 'new_page', mac);
    add_allinf_ctls_(c, mac);

    var regexp = new RegExp('\\\\|/' + '/', 'g');
    var imgsrc = params.dump_page.indexOf('.') >= 0
        ? params.dump_page
        : params.dump_page + '/img.png';

    while (imgsrc != imgsrc.replace(regexp, '/')) {
        imgsrc = imgsrc.replace(regexp, '/');
    }

    var int = c.internal;
    var page_w = params.dump_page_size.width > 0 ? params.dump_page_size.width : 800;
    var page_h = params.dump_page_size.height > 0 ? params.dump_page_size.height : 600;
    int.page_size_w = page_w;
    int.page_size_h = page_h;

    var images;
    var bimgs = params.base_images;
    var oimgs = params.overlay_image;
    if (bimgs) {
        images = [];
        var bases = bimgs.split(';');
        for (var i = 0, bil = bases.length; i < bil; i++) {
            if (bases[i]) images.push({id: bases[i], w: page_w, h: page_h});
        }
        if (oimgs) images.push({id: oimgs, w: page_w, h: page_h});
    } else {
        images = {id: imgsrc, w: page_w, h: page_h, alt: params.alt_txt || params.new_step};
    }

    var ctl = {
        type: 'page',
        id: 'page',
        macro_uid: params.uid,
        macro_caption: params.macro_template,  // called by imported_page macro!
        skin: params.skin,
        image: images,
        w: page_w,
        h: page_h,
        fontsizeInPt: 1,
        mobile_view_mode: c.global_params.g_mobile_view_mode || 'fit',
        background_color: params.background_color,
        canvas_color: params.canvas_color,
        border: c.global_params.g_border,
        border_color: c.global_params.g_border_color,
        border_style: c.global_params.g_border_style,
        background_image_centered: c.global_params.g_background_image_centered,
        handle_wheel_error: c.global_params.g_handle_wheel_error,
        screenreader_mode: 'polite',
        onload: 'page.task_next;'
    };
    if (c.mode == 'guided') {
        ctl.onclick = 'page.task_next;';
        if (this.first_step_) {
            ctl.onload = '';
            this.first_step_ = false;
        }
    }
    int.last_page_ctl = ctl;
    MacroHelper.AddControl(c, ctl);

    if (int.ts_audio_dur && int.audio_on) {
        if (params.macro_template === 'new_page' && int.mode === 'demo') {
            var mcnt = c.GetCurTourstopMacroCount(true);
            if (!mcnt) {
                // DPS-23177
                // would normally have been pruned by pp_lesson_fixes_
                // so, this single new_page macro indicates that we have a topic with audio
                // so - play that audio here
                // ATTENTION: don't do it for imported_page macro!
                c.AddTaskSet(params.uid);
                c.TaskSetSetMacroUid(params.uid, params.uid);
                mac.task_set = params.uid;
                mac.audio_onfinish = 'page.task_next';
                MacroHelper.ConsumeTourstopAudio(c, mac);
            }
        }

        if (int.mode === 'uebung' && int.ts_audio_ctl && c.global_params.g_play_demo_audio_in_uebung) {
            ctl.pagesound = int.ts_audio_ctl.src;
        }
    }

    c.SetMacroUid(params.uid);
    c.AddStartEvent('taskinfo.show');
    MacroHelper.FinalizeMacro(c, mac, params);
};
MacroRenderer.imported_page = function(c, params) {
    MacroDefaultsHandler.PrepareMacro(c, 'imported_page', params);
    this.new_page(c, params);
    c.AddTaskSet(params.uid);
    c.TaskSetSetMacroUid(params.uid, params.uid);
    var dur = params.page_duration * 1000;
    if (dur == 0) {
        c.TaskSetAddStartEvent(params.uid, 'page.task_next');
        return;
    } else if (dur < 0 && c.video_mode) {
        dur = c.global_params.g_vm_infinite_page_dur * 1000;
    }
    var mcnt = c.GetCurTourstopMacroCount(true);
    var int = c.internal;
    var has = false; // has audio
    if (int.ts_audio_dur && int.audio_on && int.mode == 'demo') {
        var mac = {
            task_set: params.uid,
            audio_onfinish: !mcnt && dur > 0 ? 'page.task_next' : null
        };
        if (mcnt && dur > 0) mac.time = dur;
        MacroHelper.ConsumeTourstopAudio(c, mac);
        has = true;
    }
    if (dur > 0 && (!has || mcnt)) {
        var timer = MacroCtlCreator.Timer(c, params, '_t', dur, 'page.task_next');
        MacroHelper.AddControl(c, timer, params.uid, 'start');
    }
    // DPS-27729 - hide mouse on imported page
    c.TaskSetAddStartEvent(params.uid, 'page.hide_mouse');
};
MacroRenderer.new_slide = function(c, params) {
    MacroDefaultsHandler.PrepareMacro(c, 'new_slide', params);
    params.b_duration = params.page_duration;  // small fake for MacroHelper.GetTasksetTime
    var times = typeof params.b_duration != 'number' || params.b_duration != -1
        ? MacroHelper.GetTasksetTime(c, {params: params})
        : -1;
    if (!times) return;
    if (c.video_mode && times == -1) {
        times = c.global_params.g_vm_infinite_slide_dur * 1000;
    }
    var sl = c.LoadFile(params.src + ':slide.js');
    var ctls = sl && sl.controls || null;
    var page = ctls && ctls.page || null;
    if (!page) return;
    var ctx = MacroHelper.CreateContext(c);
    ctx.SetScope('slide');
    ctx.Set('slide', params.src.substr(params.src.indexOf('!') + 1));
    var mytpl = page.template ? c.LoadFile(page.template + ':slide.js') : null;
    var tplctls = mytpl && mytpl.controls || {};
    var tplpage = tplctls.page || {};
    var int = c.internal;

    page.macro_uid = params.uid;
    page.macro_caption = params.macro_template;
    // add indicator for lesson generator that this is a new_slide macro control
    page.is_new_slide = true;

    if (page.onload) {
        page.onload += ';page.task_next';
    } else {
        page.onload = 'page.task_next';
    }
    if (c.mode == 'guided') {
        if (page.onclick) {
            page.onclick += ';page.task_next';
        } else {
            page.onclick = 'page.task_next';
        }
    }
    int.page_size_w = page.w || tplpage.w || 0;
    int.page_size_h = page.h || tplpage.h || 0;
    c.SetMacroUid(params.uid);
    c.AddTaskSet(params.uid);
    c.TaskSetSetMacroUid(params.uid);
    c.TaskSetAddStartEvent(params.uid, 'page.hide_mouse');

    // just handle the placeholder, do not add to the page
    if (mytpl && mytpl.controls) handle_placeholders_(c, params, mytpl.controls, ctx, false);

    for (var cid in ctls) {
        if (tplctls[cid]) {
            // we have a control which comes from the template
            var dest = ctls[cid];
            var src = tplctls[cid];
            for (var o in src) {
                if (typeof dest[o] === 'undefined') dest[o] = src[o];
            }
        }
    }

    handle_placeholders_(c, params, ctls, ctx, true);

    if (int.ts_audio_dur && int.audio_on && int.mode === 'uebung' && int.ts_audio_ctl && c.global_params.g_play_demo_audio_in_uebung) {
        ctl.pagesound = int.ts_audio_ctl.src;
    }

    if (int.ts_audio_dur && int.audio_on && int.mode == 'demo') {
        var mac = {task_set: params.uid};
        mac.coll = MacroCtlCreator.Collector(c, params, 'coll', 0, 'page.task_next');
        MacroHelper.AddControl(c, mac.coll, params.uid);
        if (times > 0) {
            var timer = MacroCtlCreator.Timer(c, params, '_t', times, mac.coll.id + '.flag_' + mac.coll.count0++);
            MacroHelper.AddControl(c, timer, params.uid, 'start');
        } else {
            // never continue
            mac.coll.count0++;
        }
        MacroHelper.ConsumeTourstopAudio(c, mac);
    } else if (times > 0) {
        var timer = MacroCtlCreator.Timer(c, params, '_t', times, 'page.task_next');
        MacroHelper.AddControl(c, timer, params.uid, 'start');
    }
};
MacroRenderer.intro_page = function(c, params) {
    MacroDefaultsHandler.PrepareMacro(c, 'intro_page', params);
    var int = c.internal;
    params.mod_ = {demo: '', uebung: '_p', test: '_t'}[int.mode];
    if (params.mod_ == null) return;  // unsupported
    if (params.dump_page_size &&
        params.dump_page_size.width &&
        params.dump_page_size.height)
    {
        params.page_w_ = params.dump_page_size.width;
        params.page_h_ = params.dump_page_size.height;
    } else {
        params.page_w_ = INTRO_PAGE_INFO.def_w_;
        params.page_h_ = INTRO_PAGE_INFO.def_h_;
    }
    int.intro_page = {
        preset: params.Preset,
        page_w: params.page_w_,
        page_h: params.page_h_
    };
    var mac = {type: 'intro_page', params: params};
    create_intro_page_.call(this, c, mac);
    if (int.mode == 'demo') MacroHelper.ConsumeTourstopAudio(c, mac);  // DPS-23688
};
MacroRenderer.explanation_long = function(c, params) {
    MacroDefaultsHandler.PrepareMacro(c, 'explanation_long', params);
    var mac = {params: params};
    prepare_macro_(c, 'explanation_long', mac);

    c.AddTaskSet(params.uid);
    mac.task_set = params.uid;
    mac.coll = MacroCtlCreator.Collector(c, params, '_coll', 0, 'page.task_next');

    var mode = c.internal.mode;
    if ((c.mode != 'pres' || c.global_params.g_pm_show_highlight) &&
        (params.ctl_rect || params.screenshot_rect) &&
        (params.show_hl_d && mode == 'demo' ||
         params.show_hl_p && (mode == 'uebung' || mode == 'test')))
    {
        if (params.ctl_rect) {
            params.x = params.ctl_rect.left || 0;
            params.y = params.ctl_rect.top || 0;
            params.w = params.ctl_rect.width || 0;
            params.h = params.ctl_rect.height || 0;
        } else if (params.screenshot_rect) {
            params.x = params.screenshot_rect.left || 0;
            params.y = params.screenshot_rect.top || 0;
            params.w = params.screenshot_rect.width || 0;
            params.h = params.screenshot_rect.height || 0;
        }
        var hl = MacroCtlCreator.Highlight(c, params, '_hl', 50);
        MacroHelper.AddControl(c, hl, mac.task_set, 'flash');

        var showOverlay = c.GetConfig('show_focus_layer');
        showOverlay = typeof showOverlay === 'boolean' ? showOverlay : c.global_params.g_show_focus_layer;
        if (showOverlay) {  // config param check
            mac.hl_overlay = MacroCtlCreator.Highlight(c, {uid: params.uid, overlay: true}, '_overlay', 900, hl.id);
            MacroHelper.AddControl(c, mac.hl_overlay, mac.task_set, 'show');
        }


    }

    var d_key = {demo: 'b_duration', uebung: 'b_duration_p', test: 'b_duration_p'}[mode];
    var dur = params[d_key];
    if (c.video_mode && c.internal.ts_audio_remaining) {
        dur = c.internal.ts_audio_remaining / 1000;
        c.internal.ts_audio_remaining = 0;
    }

    var str_tpl = 'explanation_long_nonav';
    if (!c.is_topmost && (params.show_nav_buttons || c.mode == 'praxis' || mode == 'demo' && dur < 0)) {
        str_tpl = 'explanation_long_nav_forw';
    }

    mac.ctl = MacroBubbleCreator.Explanation(c, params, str_tpl);
    if (mac.ctl) {
        mac.ctl.macro_uid = params.uid;
        mac.ctl.macro_caption = params.macro_template;
        MacroHelper.AddControl(c, mac.ctl, mac.task_set, 'show');
        c.TaskSetAddStartEvent(mac.task_set, 'page.track#' + mac.ctl.id);
        var poi = MacroCtlCreator.Poi(c, mac, mac.ctl);
        MacroHelper.AddControl(c, poi, mac.task_set, 'focus');
    } else {
        MacroHelper.CreateTrackingDummy(c, params, 'start', mac.task_set);
    }

    var timer = dur > 0
        ? MacroCtlCreator.Timer(c, params, '_t', dur * 1000, mac.coll.id + '.flag_' + mac.coll.count0++)
        : null;

    var audio = false;
    if (mode == 'demo') {
        c.TaskSetAddStartEvent(mac.task_set, 'page.hide_mouse');
        audio = MacroHelper.ConsumeTourstopAudio(c, mac);
    }

    if (!audio || dur > 0) {
        if (timer) MacroHelper.AddControl(c, timer, mac.task_set, 'start');
    } else if (dur < 0) {
        // audio sets count0++ but we do not want an infinite explanation bubble (duration == -1)
        // to be continued automatically after audio is completed
        mac.coll.count0--;
    }

    MacroHelper.FinalizeMacro(c, mac, params);
};
MacroRenderer.free_highlight = function(c, params) {
    if (!MacroHelper.ShowHighlight(c, true)) return;
    if (params.ctl_rect) {
        params.w = params.ctl_rect.width;
        params.h = params.ctl_rect.height;
        params.x = params.ctl_rect.left;
        params.y = params.ctl_rect.top;
    }
    if (typeof params.x == 'undefined') params.x = 0;
    if (typeof params.y == 'undefined') params.y = 0;
    if (typeof params.w == 'undefined') params.w = 0;
    if (typeof params.h == 'undefined') params.h = 0;
    if (typeof params.z == 'undefined') params.z = 1;
    MacroDefaultsHandler.PrepareMacro(c, 'free_highlight', params);
    var mac = {params: params};
    prepare_macro_(c, 'free_highlight', mac);
    // creating the highlight
    var p = WCT.DeepCopy(params);
    var cnt = c.internal.highlight_cnt++;
    p.uid = p.obj_name + '_';
    var hl = MacroCtlCreator.Highlight(c, p, cnt, 50);
    MacroHelper.AddControl(c, hl);
    // highlight is in common (not a taskset) but is not allowed to be displayed right from
    // the beginning. so it's created invisible. adding taskset with start event to make it visible
    // at the right time.
    c.AddTaskSet(params.uid);
    if (c.mode != 'pres' && !params.highlight_off) c.TaskSetAddStartEvent(params.uid, hl.id + '.flash');
    c.TaskSetAddStartEvent(params.uid, 'page.task_next');
    // might be that highlights with same name are already inside
    // in this case, they have to be made invisible in case their number is below mine
    // (what means: I am successor of them)
    var hl = c.GetFreeHighlights(p.uid);
    if (hl) {
        var l = p.uid.length;
        for (var i = hl.length - 1; i >= 0; i--) {
            var hl_cnt = Number(hl[i].id.substr(l));
            if (hl_cnt < cnt) {
                c.TaskSetAddStartEvent(params.uid, hl[i].id + '.hide');
            }
        }
    }
    MacroHelper.FinalizeMacro(c, mac, params);
};
MacroRenderer.goto_tourstop = function(c, params) {
    MacroDefaultsHandler.PrepareMacro(c, 'goto_tourstop', params);
    c.AddTaskSet(params.uid);
    c.TaskSetSetMacroUid(params.uid, params.uid);
    var ctl = MacroCtlCreator.Jumper(c, params);
    MacroHelper.AddControl(c, ctl, params.uid, 'jump');
};
MacroRenderer.swf_page = function(c, params) {
    if (c.video_mode) return;
    MacroDefaultsHandler.PrepareMacro(c, 'swf_page', params);
    if (params.swf_width < 10) params.swf_width = 10;
    if (params.swf_height < 10) params.swf_height = 10;
    c.SetSourceContext({_this: 'macro', macro: params.uid});
    MacroHelper.AddControl(c, {
        type: 'page',
        id: 'page',
        w: params.swf_width,
        h: params.swf_height,
        onload: 'page.task_next'
    });
    var ctl = {
        type: 'flash',
        id: params.uid,
        src: params.swf_file,
        wmode: 'transparent',
        playonstart: 1,
        loop: 1,
        hidden: 0,
        x: 0,
        y: 0,
        w: params.swf_width,
        h: params.swf_height
    };
    c.AddTaskSet(params.uid);
    c.TaskSetSetMacroUid(params.uid, params.uid);
    c.TaskSetAddStartEvent(params.uid, 'page.hide_mouse');
    MacroHelper.AddControl(c, ctl, params.uid, 'play');
};
MacroRenderer.mode_change = function(c, params) {
    if (MacroHelper.IsPresMode(c)) return;

    MacroDefaultsHandler.PrepareMacro(c, 'mode_change', params);
    var key = 'in_' + c.mode + '_to';
    set_internal_mode_(c, params[key]);
};
MacroRenderer.mode_change_end = function(c, params) {
    if (MacroHelper.IsPresMode(c)) return;

    c.AddTaskSet(params.uid);
    c.TaskSetAddStartEvent(params.uid, 'page.hide_mouse;page.task_next');
    set_internal_mode_(c);
};
MacroRenderer.intro_page_item = function(c, params) {
    MacroDefaultsHandler.PrepareMacro(c, 'intro_page_item', params);
    if (!c.internal.intro_items) c.internal.intro_items = [];
    c.internal.intro_items.push({
        uid: params.uid,
        intro_text: params.intro_text,
        link_text: WCT.CleanupHTMLString(params.link_text),
        link_target: params.link_target
    });
};
MacroRenderer.slide_arrow = function(c, params) {
    MacroDefaultsHandler.PrepareMacro(c, 'slide_arrow', params);
    c.SetSourceContext({_this: 'macro', macro: params.uid});
    params.type = 'arrow';
    params.id = params.uid;
    MacroHelper.AddControl(c, params);
};
MacroRenderer.slide_big_arrow = function(c, params) {
    MacroDefaultsHandler.PrepareMacro(c, 'slide_big_arrow', params);
    c.SetSourceContext({_this: 'macro', macro: params.uid});
    params.type = 'big_arrow';  // XXX: should use shape
    params.id = params.uid;
    MacroHelper.AddControl(c, params);
};
MacroRenderer.slide_link_textBoxIcon = function(c, params) {
    MacroDefaultsHandler.PrepareMacro(c, 'slide_link_textBoxIcon', params);
    c.SetSourceContext({_this: 'macro', macro: params.uid});
    params.type = 'link_textBoxIcon';
    params.id = params.uid;
    MacroHelper.AddControl(c, params);
};
MacroRenderer.slide_image = function(c, params) {
    MacroDefaultsHandler.PrepareMacro(c, 'slide_image', params);
    c.SetSourceContext({_this: 'macro', macro: params.uid});
    params.type = 'image';
    params.id = params.uid;
    if (c.is_topmost) params.zoomable = false;
    MacroHelper.AddControl(c, params);
};
MacroRenderer.slide_icon_link = function(c, params) {
    MacroDefaultsHandler.PrepareMacro(c, 'slide_icon_link', params);
    c.SetSourceContext({_this: 'macro', macro: params.uid});
    if (!params.image || !params.image.id) {
        var id = 'book_style!' + c.global_params.g_icon_skin + ':icons/';
        id += params.mode_icon == 'document' ? 'start' : params.mode_icon;
        id += '.png';
        params.image = {id: id};
    }
    params.type = 'link_' + params.mode_icon;
    params.id = params.uid;
    MacroHelper.AddControl(c, params);
};
MacroRenderer.slide_hrefarea = function(c, params) {
    MacroDefaultsHandler.PrepareMacro(c, 'slide_hrefarea', params);
    c.SetSourceContext({_this: 'macro', macro: params.uid});
    params.type = 'hrefarea';
    params.id = params.uid;
    params.msie5 = c.is_topmost && (BROWSER.IE6 || BROWSER.IE7 || BROWSER.IE8);
    MacroHelper.AddControl(c, params);
};
})();

if (!window.MacroRenderer) MacroRenderer = {};

(function() {

function prepare_macro_(c, mac_type, mac) {
    var p = mac.params;
    var itl = c.internal;

    mac.type = mac_type;
    mac.sctx = {_this: 'macro', macro: p.uid};
    c.SetSourceContext(mac.sctx);

    mac.task_set = MacroHelper.GetTaskset(c, p);
    c.AddTaskSet(mac.task_set);
};

function add_testo_(ctl, testo, testo_list) {
    if (testo && testo_list[ctl.id]) {
        ctl.oncorrectanswer = testo.id + '.correct_answer';
        ctl.onwronganswer = testo.id + '.wrong_answer';
    }
};

function get_hide_string_(data, cur_id) {
    // returns trigger to hide all controls in data besides cur_id
    var ret = [];
    for (var i = 0, it = null; it = data.items[i++];) {
        if (it.uid !== cur_id)
            ret.push(it.uid + '.hide', it.uid + '_hl.hide');
    }

    return ret.length ? ret.join(';') : '';
}

function branch_off_demo_(c, mac, params) {
    MacroHelper.ConsumeTourstopAudio(c, mac);

    var data = c.internal.branch;
    var bhide = params.uid + MacroBubbleCreator.BUB_ID_TASK + '.hide;';
    var start = [];
    var end = [];
    var bt = [];

    // handle all branch items
    for (var i = 0, it = null; it = data.items[i++];) {
        var h = get_hide_string_(data, it.uid);
        // set proper source context
        c.SetSourceContext(it.sctx);

        // insert common controls
        for (var j = 0, ctl = null; ctl = it.common[j++];) {
            MacroHelper.AddControl(c, ctl.ctl, mac.task_set, ctl.evt);
        }

        // insert special controls
        for (var j = 0, ctl = null; ctl = it.special[j++];) {
            MacroHelper.AddControl(c, ctl, mac.task_set);
        }

        if (MacroHelper.IsPresMode(c) && it.type == 'key_press') {
            if (it.start) start.push(it.start);
            if (it.end) end.push(it.end);
        } else if (it.text) {
            it.start = bhide + it.start;
            bt.push('<a role="button" tabindex="1" style="display:block;cursor:pointer;vertical-align:top;margin:1px;" href="javascript:ctx.cfg_show(\'trigger!' + h + ';' + it.start + '\')">' +
                it.text + '</a>');
        }

        // do not insert unneeded ctls; will use first one immediately
        if (c.mode == 'guided' || c.video_mode) break;
    }

    // key_press macro events in pres modes
    start = start.join(';').replace(/;;+/g, ';').replace(/^;/, '').replace(/;$/, '');
    end = end.join(';').replace(/;;+/g, ';').replace(/^;/, '').replace(/;$/, '');
    if (start) c.TaskSetAddStartEvent(mac.task_set, start);
    if (end) c.TaskSetAddEndEvent(mac.task_set, end);

    // prepare the branch task bubble content
    var or = '<div style="padding:5px 0;text-align:center">' +
        c.Trans('EXER_OR').replace(/\\r|\\n/g, '') +
        '</div>';

    params.explanation_d = bt.join(or);

    var first = data.items.length ? data.items[0].start : null;
    if (first && (c.mode == 'guided' || c.video_mode)) {
        var t = MacroCtlCreator.Timer(c, mac.params, '_timer', 0, first);
        MacroHelper.AddControl(c, t, mac.task_set, 'start');
    } else {
        var tbub = null;
        if (MacroHelper.ShowBubble(c, params.show_bubble_d)) {
            // create the overall task bubble
            tbub = MacroBubbleCreator.Task(c, params);
            if (tbub) MacroHelper.AddControl(c, tbub, mac.task_set, 'show');
        }

        var dur = params.b_duration;
        if (first && dur > 0) {
            if (tbub) {
                first += first.charAt(first.length - 1) == ';'
                    ? tbub.id + '.hide'
                    : ';' + tbub.id + '.hide';
            }

            var t = MacroCtlCreator.Timer(c, mac.params, '_timer', dur * 1000, first);
            MacroHelper.AddControl(c, t, mac.task_set, 'start');
        }
    }
};

function branch_off_test_(c, mac, params) {
    var data = c.internal.branch;

    mac.hl = {id: data.hl_ids.join(';')};
    mac.coll = {id: '', count0: 0};
    MacroHelper.CreateActionUebung(c, mac);
    mac.testo.lesson_continue = 'page.task_next';
    mac.bt = MacroBubbleCreator.Task(c, params);  // task bubble (uebung only!)

    // handle all branch items
    var bt = [];
    var start = [];
    var end = [];

    for (var i = 0, it = null; it = data.items[i++];) {
        // set proper source context
        c.SetSourceContext(it.sctx);

        // insert common controls
        for (var j = 0, ctl = null; ctl = it.common[j++];) {
            add_testo_(ctl.ctl, mac.testo, data.testo_ctls);
            MacroHelper.AddControl(c, ctl.ctl, mac.task_set, ctl.evt);
        }

        // insert special controls
        for (var j = 0, ctl = null; ctl = it.special[j++];) {
            add_testo_(ctl, mac.testo, data.testo_ctls);
            MacroHelper.AddControl(c, ctl, mac.task_set);
        }

        bt.push(it.text);
        start.push(it.start);
        end.push(it.end);
        mac.testo['on_' + it.ctl.id] = it.next;
    }

    // prepare the branch task bubble content
    var or = '<div style="padding:5px 0;text-align:center">' +
        c.Trans('EXER_OR').replace(/\\r|\\n/g, '') +
        '</div>';

    params.explanation_d = bt.join(or);

    // testo + bubbles
    mac.testo.help_msg = params.explanation_d;
    mac.testo.macro_description = bt.join(' ' + c.Trans('EXER_OR') + ' ');
    params.dummy_desc = mac.testo.macro_description;

    if (c.internal.mode == 'uebung' && params.show_bubble_p) {
        mac.bt.text = params.explanation_d;
        MacroHelper.AddControl(c, mac.bt, mac.task_set);
    }

    // events
    start = start.join(';').replace(/;;+/g, ';').replace(/^;/, '').replace(/;$/, '');
    end = end.join(';').replace(/;;+/g, ';').replace(/^;/, '').replace(/;$/, '');
    c.TaskSetAddStartEvent(mac.task_set, start);
    c.TaskSetAddEndEvent(mac.task_set, end);
};

MacroRenderer.branch_on = function(c, params) {
    c.internal.branch = {
        set: params.uid,
        items: [],
        testo_ctls: {},
        hl_ids: []
    };

    // branch_on macro needs to be tracked
    // so create dummy ctl just for tracking
    MacroHelper.CreateTrackingDummy(c, params, 'start');
};

MacroRenderer.branch_off = function(c, params) {
    if (!c.internal.branch) return;

    MacroDefaultsHandler.PrepareMacro(c, 'branch_off', params);

    var mac = {params: params};
    prepare_macro_(c, 'branch_off', mac);

    if (c.internal.mode == 'demo') {
        branch_off_demo_(c, mac, params);
    } else {
        branch_off_test_(c, mac, params);
    }

    // branch_off macro needs to be tracked
    // so create dummy ctl just for tracking
    MacroHelper.CreateTrackingDummy(c, params, 'end', mac.task_set);

    c.internal.branch = null;
    MacroHelper.FinalizeMacro(c, mac, params);
};

MacroRenderer.form_on = function(c, params) {
    if (c.internal.mode == 'demo') return;

    c.internal.form = {
        set: params.uid,
        idx: 1,  // used for tabindex
        items: [],
        testo_ctls: {},
        hl_ids: [],
        input_affirmation: params.input_affirmation || false
    };

    // form_on macro needs to be tracked
    // so create dummy ctl just for tracking
    MacroHelper.CreateTrackingDummy(c, params, 'start');
};

MacroRenderer.form_off = function(c, params) {
    if (!c.internal.form) return;

    MacroDefaultsHandler.PrepareMacro(c, 'form_off', params);

    var mac = {params: params};
    prepare_macro_(c, 'form_off', mac);

    var is_test = c.internal.mode == 'test';
    var bhide = params.uid + MacroBubbleCreator.BUB_ID_TASK + '.hide';
    var data = c.internal.form;
    var fi = data.items;

    mac.hl = {id: data.hl_ids.join(';')};
    mac.coll = {id: '', count0: 0};

    MacroHelper.CreateActionUebung(c, mac);

    mac.testo.lesson_continue = 'page.task_next';
    mac.testo.form_mode = true;
    mac.testo.form_affirmation = params.form_affirmation;
    mac.testo.form_items = {};
    mac.bt = MacroBubbleCreator.Task(c, params);  // task bubble (uebung only!)

    var m_or_and = {
        input_text: 'and',
        input_radio: 'and',
        select_single: 'and',
        click: 'or',
        key_press: 'or'
    };

    // handle all form items
    var bt = {and: [], or: []};
    var start = [];
    var end = [];
    var req = [];
    var pt = 0;
    var pt_goon = 0;

    for (var i = 0, it = null; it = fi[i++];) {
        // set proper source context
        c.SetSourceContext(it.sctx);

        // insert common controls
        for (var j = 0, ctl = null; ctl = it.common[j++];) {
            add_testo_(ctl.ctl, mac.testo, data.testo_ctls);
            MacroHelper.AddControl(c, ctl.ctl, mac.task_set, ctl.evt);
        }

        // insert special controls
        for (var j = 0, ctl = null; ctl = it.special[j++];) {
            MacroHelper.AddControl(c, ctl, mac.task_set);
            add_testo_(ctl, mac.testo, data.testo_ctls);
        }

        var tt = m_or_and[it.mac_type];
        var ct = it.text;
        if (tt == 'and') {
            // this is a control that will not evaluate (input, selectbox, checkbox, radio, ...)
            ct = '<tr><td style="vertical-align:top;padding-right:5px;text-align:right">' + it.label +
              ':</td><td style="vertical-align:top;font-weight:bold">' + it.value + '</td></tr>';
            mac.testo.form_items[it.ctl.id] = null;
            pt++;  // scorable items
        } else {
            // this is a control that will evaluate the form mode (click, hotkey, ...)
            mac.testo['on_' + it.ctl.id] = it.next;
            pt_goon = 1;  // only counted once
        }

        bt[tt].push(ct);
        start.push(it.start);
        end.push(it.end);
    }

    // testomat max points:
    // each std. form-item has 3 points
    // all evaluation form-items together have 3 points
    mac.testo.max_points = params.form_score != null ? params.form_score : pt * 3 + pt_goon * 3;

    // prepare the form task bubble content
    var tr_pref = '<div style="margin-bottom:20px">' + c.Trans('EXER_FORM_PREFIX') + '</div>';
    var tr_or = c.Trans('EXER_OR');
    var tr_and = c.Trans('EXER_AND');
    var html_or = '<div style="padding:2px 0;text-align:center">' + tr_or + '</div>';
    var html_and = '<div style="padding:20px 0;text-align:center">' + tr_and + '</div>';
    var bt_raw = {
        or: bt.or.join(' ' + tr_or + ' '),
        and: '<table>' + bt.and.join('') + '</table>'
    };
    bt_raw = tr_pref + (bt_raw.or ? bt_raw.and + ' ' + tr_and + ' ' + bt_raw.or : bt_raw.and);
    bt.or = bt.or.join(html_or);
    bt.and = '<table style="margin-left:5px">' + bt.and.join('') + '</table>';
    bt = tr_pref + (bt.or ? bt.and + html_and + bt.or : bt.and);

    // override (DPS-21026)
    if (params.form_text_p && (c.internal.mode == 'uebung' || is_test)) {
        bt = params.form_text_p;
        bt_raw = bt;
    }

    // testo + bubbles
    mac.testo.help_msg = bt;
    mac.testo.macro_description = bt_raw;
    params.dummy_desc = bt_raw;
    if (!is_test && params.show_bubble_p) {
        mac.bt.text = bt;
        MacroHelper.AddControl(c, mac.bt, mac.task_set);
    }

    // events
    start = start.join(';').replace(/;;+/g, ';').replace(/^;/, '').replace(/;$/, '');
    end = end.join(';').replace(/;;+/g, ';').replace(/^;/, '').replace(/;$/, '');
    c.TaskSetAddStartEvent(mac.task_set, start);
    c.TaskSetAddEndEvent(mac.task_set, end);

    c.internal.form = null;
    MacroHelper.FinalizeMacro(c, mac, params);
};

})();
if (!window.MacroRenderer) MacroRenderer = {};

(function() {

function create_std_next_action_(c, mac) {
    var p = mac.params;
    var n = 'page.task_next';

    if (p.jump_target) {
        var jmp = MacroCtlCreator.Jumper(c, p);
        jmp.id += '_next';  // avoid interference with any other jumper that might be created later

        if (MacroHelper.IsManualDemoMode(c)) {
            jmp.target = 't2_config!next_task:tourstop!' + p.jump_target;
            MacroHelper.AddControl(c, jmp, mac.task_set, 'jump');
        } else {
            MacroHelper.AddControl(c, jmp, mac.task_set);
            n = jmp.id + '.jump';
        }
    }

    mac.coll = MacroCtlCreator.Collector(c, p, '_coll', 0, n);
};

function input_text_fulltext_(c, mac, is_branch_form) {
    var par = mac.params;

    if (!par.check_full_text) {
        var ctl = mac.ctl;
        var corr = is_branch_form ? ctl.id + '.correct' : ctl.oncorrectanswer;

        var tctl;
        if (par.animated) {
            tctl = MacroCtlCreator.Typist(c, par, '_typist', 0, ctl.id, mac.time - 200);
            tctl.onfinish = corr;
            ctl.check_full_text_anim = tctl.id + '.start;';
        } else {
            tctl = MacroCtlCreator.Timer(c, par, '_timer', 200, corr);
            ctl.check_full_text_next = tctl.id + '.start;';
        }

        if (is_branch_form) {
            mac.special.push(tctl);
        } else {
            MacroHelper.AddControl(c, tctl, mac.task_set);
            par.set_focus = false;
        }
    }
};

function prepare_macro_(c, mac_type, mac) {
    var p = mac.params;
    var itl = c.internal;

    mac.type = mac_type;
    mac.sctx = {_this: 'macro', macro: p.uid};
    c.SetSourceContext(mac.sctx);

    var m = MacroHelper.GetMode(c);
    var desc = MacroHelper.GetMacroDescription(c, p);
    if (desc) {
        // resolve desc
        var ctx = MacroHelper.CreateContext(c, p);
        desc = ctx.ResolveHtmlString(desc);
    }

    mac.ctl.macro_uid = p.uid;
    mac.ctl.macro_caption = p.macro_template;
    mac.ctl.macro_description = desc;

    var is_form = !m.indexOf('form_');
    var is_branch = !m.indexOf('branch_');
    if (is_form || is_branch) {
        // form or branch mode
        mac.uid = p.uid;
        mac.common = [{ctl: mac.ctl}];
        mac.special = [];
        mac.text = '';
        mac.mac_type = mac_type;
        mac.label = p.fieldname;
        mac.value = p.text_full;
        mac.start = 'page.track#' + mac.ctl.id + ';';
        mac.end = '';
        mac.next = 'page.task_next;';
        if (is_form) {
            mac.ctl.form_mode = true;
            mac.ctl.tabindex = ++c.internal.form.idx;
        } else {
            mac.ctl.branch_mode = true;
        }
    } else {
        // single mode
        mac.task_set = MacroHelper.GetTaskset(c, p);
        create_std_next_action_(c, mac);
        c.TaskSetAddStartEvent(mac.task_set, 'page.track#' + mac.ctl.id);
    }

    if (mac.ctl.type == 'dragdrop' && (m == 'uebung' && p.show_hl_p || c.mode == 'pres')) {
        var hl_par = {
            macro_template: p.macro_template,
            uid: p.uid,
            x: p.drag_x,
            y: p.drag_y,
            w: p.drag_w,
            h: p.drag_h
        };
        mac.hl2 = MacroCtlCreator.Highlight(c, hl_par, '_hl2', 50, mac.ctl.id);
        mac.hl2.ignore_target = true; // needed as we do not create drag control for target referencing

        MacroHelper.AddControl(c, mac.hl2, mac.task_set, c.mode != 'pres' ? 'flash' : null);
    }

    var isValid = {demo: 2, uebung: 1, test: 1, praxis: 2}[c.mode];
    if (isValid) {
        var showOverlay = c.GetConfig('show_focus_layer');
        showOverlay = typeof showOverlay === 'boolean' ? showOverlay : c.global_params.g_show_focus_layer;
        if (showOverlay) {  // config param check
            mac.hl_overlay = MacroCtlCreator.Highlight(c, {uid: p.uid, overlay: true, macro_template: p.macro_template}, '_overlay', 900, mac.ctl.id);
            MacroHelper.AddControl(c, mac.hl_overlay, mac.task_set, isValid === 2  && m.substr(0, 6) !== 'branch' ? 'show' : '');
        }
    }

    switch (m) {
        case 'demo':
            var t = MacroHelper.GetTasksetTime(c, mac);
            mac.time = t;

            if (itl.wait_user || MacroHelper.IsManualDemoMode(c)) {
                mac.coll.count0++;  // never go on automatically
            } else if (!t) {
                // no topic duration, continue immediately
                c.TaskSetAddStartEvent(mac.task_set, 'page.task_next');
                return false;
            }

            MacroHelper.ConsumeTourstopAudio(c, mac);

            var s = MacroHelper.ShowBubble(c, p.show_bubble_d);
            var k = c.mode === 'pres' && mac_type === 'key_press';

            if (s || k) {
                var bub_t = itl.ts_has_audio && !itl.audio_on && c.global_params.g_bydesign_playback ||
                    !c.is_topmost && (p.b_duration < 0 || c.mode == 'praxis')
                    ? 'bubbletext_d_nav'
                    : 'bubbletext_d';
                mac.bub = MacroBubbleCreator.Task(c, p, bub_t);
                if (mac.bub) MacroHelper.AddControl(c, mac.bub, mac.task_set, k ? '' : 'show');
            }

            if (mac.type != 'key_press' && MacroHelper.ShowHighlight(c, p.show_hl_d)) {
                mac.hl = MacroCtlCreator.Highlight(c, p, '_hl', 50, mac.ctl.id);
                MacroHelper.AddControl(c, mac.hl, mac.task_set, c.mode != 'pres' ? 'flash' : null);
            }

            mac.poi = MacroCtlCreator.Poi(c, mac);
            MacroHelper.AddControl(c, mac.poi, mac.task_set, 'focus');
            break;
        case 'branch_demo':
            if (MacroHelper.ShowBubble(c, p.show_bubble_d)) {
                var bub = MacroBubbleCreator.Task(c, p, 'bubbletext_d');
                if (bub) {
                    mac.special.push(bub);
                    mac.text = desc;
                    mac.start += bub.id + '.show;' + p.uid + '_overlay.show;';
                }
            } else if (MacroHelper.IsPresMode(c)) {
                mac.text = desc;
            }

            if (mac.type != 'key_press' && MacroHelper.ShowHighlight(c, p.show_hl_d)) {
                var hl = MacroCtlCreator.Highlight(c, p, '_hl', 50, mac.ctl.id);
                mac.common.push({ctl: hl, evt: c.mode != 'pres' ? 'flash' : null});
            }

            var poi = MacroCtlCreator.Poi(c, mac);
            mac.special.push(poi);
            mac.start += poi.id + '.focus;';

            if (p.jump_target) {
                var jmp = MacroCtlCreator.Jumper(c, p);
                mac.special.push(jmp);
                mac.next = jmp.id + '.jump;';
            }

            c.internal.branch.items.push(mac);
            break;
        case 'form_uebung':
        case 'branch_uebung':
            if (p.show_hl_p) {
                var hl = MacroCtlCreator.Highlight(c, p, '_hl', 50, mac.ctl.id);
                mac.common.push({ctl: hl, evt: 'flash'});
                mac.has_hl = true;
            }
        case 'form_test':
        case 'branch_test':
            var dkey = is_form ? 'form' : 'branch';
            mac.text = desc;
            mac.start += mac.ctl.id + '.activate;';
            mac.end += mac.ctl.id + '.deactivate;';

            if (!mac.has_hl && mac_type != 'key_press') {
                var tp = WCT.DeepCopy(p);
                // XXX help / default highlight crash
                tp.highlight_rgb = c.global_params.g_highlight_help_rgb;
                var hl = MacroCtlCreator.Highlight(c, tp, '_hl', 50, mac.ctl.id);
                mac.common.push({ctl: hl});
                c.internal[dkey].hl_ids.push(hl.id);
            }

            if (p.jump_target) mac.next = p.jump_target;

            mac.ctl.ignore_sim_action = true;
            mac.ctl.fire_events = true;

            c.internal[dkey].testo_ctls[mac.ctl.id] = 1;
            c.internal[dkey].items.push(mac);
            break;
        case 'uebung':
            if (p.show_bubble_p) {
                mac.bub = MacroBubbleCreator.Task(c, p);
                if (mac.bub) MacroHelper.AddControl(c, mac.bub, mac.task_set);
            }

            if (p.show_hl_p) {
                p.highlight_rgb = c.global_params.g_highlight_rgb;
                mac.hl = MacroCtlCreator.Highlight(c, p, '_hl', 50, mac.ctl.id);
                MacroHelper.AddControl(c, mac.hl, mac.task_set, 'flash');
            }
        case 'test':
            if (!mac.hl && mac_type != 'key_press') {
                var tp = WCT.DeepCopy(p);
                tp.highlight_rgb = c.global_params.g_highlight_help_rgb;

                mac.hl = MacroCtlCreator.Highlight(c, tp, '_hl', 50, mac.ctl.id);
                MacroHelper.AddControl(c, mac.hl, mac.task_set);
            }

            MacroHelper.CreateActionUebung(c, mac);
            mac.ctl.fire_events = true;

            if (m == 'test' && c.global_params.g_show_step_bubble) {
                mac.bub = MacroBubbleCreator.Task(c, p);
                if (mac.bub) {
                    mac.bub.text += [
                        '<p style="margin:15px 0 1px">',
                        c.Trans('EXER_ASK4HELP').replace(/\\r|\\n/g, ''),
                        '</p><p style="margin:1px 0">',
                        '<img src="skin:help.png" style="vertical-align:middle;margin:0 10px;cursor:pointer" ',
                            'onclick="ctx.cfg_show(\'trigger!page.show_demo_help#',
                            c.internal.ts_uid, '#', p.uid, '#', mac.testo.id,
                            '\', null, null)" ',
                        '/>',
                        c.Trans('EXER_SHOWHELP').replace(/\\r|\\n/g, ''),
                        '</p>'
                    ].join('');
                    MacroHelper.AddControl(c, mac.bub, mac.task_set, 'show');
                }
            }

            // deactivate (= set wrong) on insert
            // activate (= enable evaluation) on taskset start
            // deactivate (disable evalution / set wrong) on tasket end
            c.AddStartEvent(mac.ctl.id + '.deactivate');
            c.TaskSetAddStartEvent(mac.task_set, mac.ctl.id + '.activate');
            c.TaskSetAddEndEvent(mac.task_set, mac.ctl.id + '.deactivate');
            break;
    }

    return true;
};

function finalize_macro_(c, mac, params) {
    if (!c.internal.branch && !c.internal.form) {
        MacroHelper.AddControl(c, mac.ctl);
    }

    MacroHelper.FinalizeMacro(c, mac, params);
};

MacroRenderer.click = function(c, params) {
    if (params.ctl_rect) {
        params.x = params.ctl_rect.left;
        params.y = params.ctl_rect.top;
        params.w = params.ctl_rect.width;
        params.h = params.ctl_rect.height;
    }
    if (params.click_pos) {
        params.mx = params.click_pos.left;
        params.my = params.click_pos.top;
    }
    if (typeof params.x == 'undefined') params.x = 140;
    if (typeof params.y == 'undefined') params.y = 120;
    if (typeof params.w == 'undefined') params.w = 200;
    if (typeof params.h == 'undefined') params.h = 200;
    if (typeof params.z == 'undefined') params.z = 1;
    if (typeof params.mx == 'undefined') params.mx = 140;
    if (typeof params.my == 'undefined') params.my = 120;

    MacroDefaultsHandler.PrepareMacro(c, 'click', params);

    var mode = MacroHelper.GetMode(c);
    if (c.mode == 'pres') mode = mode.replace(/demo/, 'pres');

    var ctl;
    if (params.action == 'dragdrop' && (mode == 'uebung' || mode == 'test' || mode == 'pres')) {
        var conf_drag = MacroHelper.GetClickConf(c, {
            macro_template: params.macro_template,
            x: params.drag_x,
            y: params.drag_y,
            w: params.drag_w,
            h: params.drag_h
        }, 'ctl');

        var conf_drop = MacroHelper.GetClickConf(c, params, 'ctl');
        ctl = {
            id: params.uid,
            type: 'dragdrop',
            drag_x: conf_drag.x,
            drag_y: conf_drag.y,
            drag_w: conf_drag.w,
            drag_h: conf_drag.h,
            drop_x: conf_drop.x,
            drop_y: conf_drop.y,
            drop_w: conf_drop.w,
            drop_h: conf_drop.h,
            z: params.z,
            right: params.right,
            image: params.fieldicon_drag ? {id: params.fieldicon_drag} : params.fieldicon ? {id: params.fieldicon} : {},
            tabindex: params.tabindex
        };
    } else {
        var conf = MacroHelper.GetClickConf(c, params, 'ctl');
        ctl = {
            id: params.uid,
            type: 'inputclick',
            hidden: false,
            hide_scrollbars: true,
            cursorhand: MacroHelper.ShowCursorHand(c, params.cursor_hand),
            tooltip: params.ctl_tooltip,
            tabindex: c.mode === 'pres' ? params.tabindex : -1,
            text: '',
            disabled: params.ctl_disabled,
            x: conf.x,
            y: conf.y,
            w: conf.w,
            h: conf.h,
            z: params.z,
            action: params.action,
            text_full: '',
            regexp: '',
            font_family: 'Arial',
            font_size: 10,
            text_color: '#000000',
            align: 'Left',
            bold: false,
            italic: false,
            underline: false,
            background_color: 'transparent',
            border: 0,
            set_border_color: false,
            border_color: '',
            border_style: '',
            padding: 0
        };
    }

    if (BROWSER.MOBILE || PLATFORM.WINCE) {
        ctl.button = 1;
        ctl.ctrl_key = false;
        ctl.alt_key = false;
        ctl.shift_key = false;
        ctl.action = 'lclick';
    } else if (mode == 'pres') {
        ctl.button = params.ctl_button;
        ctl.ctrl_key = false;
        ctl.alt_key = false;
        ctl.shift_key = false;
        ctl.action = 'lclick';
    } else {
        ctl.button = params.ctl_button;
        ctl.ctrl_key = params.ctrl_key;
        ctl.alt_key = params.alt_key;
        ctl.shift_key = params.shift_key;
    }

    var mac = {ctl: ctl, params: params};
    if (!prepare_macro_(c, 'click', mac)) return;

    if (c.mode == 'guided') ctl.onclick = 'page.task_next';

    var bf_key = 'branch';
    switch (mode) {
        case 'pres':
            if (params.orig_input_ctl_uid) {  // DPS-34442
                c.TaskSetAddStartEvent(mac.task_set, 'page.task_next');
            } else {
                ctl[ctl.type == 'dragdrop' ? 'oncorrectanswer' : 'onclick'] = mac.coll.id + '.flag_' + mac.coll.count0;
            }
            break;
        case 'branch_pres':
            ctl.onclick = mac.next;
            break;
        case 'demo':
            var mdur = c.global_params.g_show_mouse_dur;
            var next = mac.coll.id + '.flag_' + mac.coll.count0++;
            var man = MacroHelper.IsManualDemoMode(c);
            var dyn = null;

            if (MacroHelper.IsPresMode(c) && (params.action == 'drag' || params.action == 'rdrag')) {
                next = 'page.task_next;';
            }

            if (MacroHelper.ShowMouse(c)) {
                dyn = MacroCtlCreator.Mouse(c, params, '_m', 2, mdur, next);
            } else if (!man) {
                dyn = MacroCtlCreator.Timer(c, params, '_m', mdur, next);
            }

            if (dyn) {
                if (man) {
                    MacroHelper.AddControl(c, dyn, mac.task_set, 'start');
                } else {
                    var t = Math.max(0, mac.time - mdur);
                    var tmr = MacroCtlCreator.Timer(c, params, '_t', t, dyn.id + '.start');

                    MacroHelper.AddControl(c, dyn, mac.task_set);
                    MacroHelper.AddControl(c, tmr, mac.task_set, 'start');
                }
            }
            break;
        case 'branch_demo':
            var dyn = null;
            if (MacroHelper.ShowMouse(c)) {
                // guided; optional: demo+praxis
                dyn = MacroCtlCreator.Mouse(c, params, '_m', 2, params.b_duration * 1000, !MacroHelper.IsPresMode(c) ? mac.next : null);
            } else if (!MacroHelper.IsManualDemoMode(c) || c.mode == 'praxis') {
                // optional: demo+praxis
                dyn = MacroCtlCreator.Timer(c, params, '_t', params.b_duration * 1000, mac.next);
            }

            if (dyn) {
                mac.special.push(dyn);
                mac.start += dyn.id + '.start;';
            }
            break;
        case 'form_uebung':
        case 'form_test':
            bf_key = 'form';
        case 'branch_uebung':
        case 'branch_test':
            if (params.action != 'dragdrop' && params.hotkey) {
                var hk = {
                    type: 'hotkey',
                    id: params.uid + '_hotkey',
                    hotkey: params.hotkey.replace(/ /g, '_')
                };
                c.internal[bf_key].testo_ctls[hk.id] = 1;
                mac.special.push(hk);
                mac.end += hk.id + '.disable;';
            }
            break;
        case 'uebung':
        case 'test':
            if (params.action == 'dragdrop') {
                var msg = c.Trans('EXER_FAILDROP1');
                var msg_help_keys = [];
                if (params.ctrl_key) msg_help_keys.push(c.Trans('CTRLKEY'));
                if (params.alt_key) msg_help_keys.push(c.Trans('ALTKEY'));
                if (params.shift_key) msg_help_keys.push(c.Trans('SHIFTKEY'));

                msg = msg.replace(/@1_keys_/, msg_help_keys.join(', '));
                mac.testo.help_msg = msg;

                var tp = WCT.DeepCopy(params);
                tp.highlight_rgb = c.global_params.g_highlight_help_rgb;

                if (!mac.hl2) {
                    mac.hl2 = MacroCtlCreator.Highlight(c, {
                        uid : tp.uid,
                        highlight_rgb : tp.highlight_rgb,
                        macro_template : tp.macro_template,
                        x: tp.drag_x,
                        y: tp.drag_y,
                        w: tp.drag_w,
                        h: tp.drag_h
                    }, '_hl2', 50, mac.ctl.id);
                    mac.hl2.ignore_target = true; // needed as we do not create drag control for target referencing
                    MacroHelper.AddControl(c, mac.hl2, mac.task_set);
                }

                mac.testo.help_hl += ';' + mac.hl2.id;
            } else {
                mac.testo.help_msg = c.Trans('EXER_FAILCLICK1');

                if (params.hotkey) {
                    var hk = {
                        type: 'hotkey',
                        id: params.uid + '_hotkey',
                        hotkey: params.hotkey.replace(/ /g, '_'),
                        oncorrectanswer: mac.testo.id + '.correct_answer',
                        disabled: true,
                        hidden: true
                    };

                    MacroHelper.AddControl(c, hk, mac.task_set, 'enable');
                    c.TaskSetAddEndEvent(mac.task_set, hk.id + '.disable');
                }
            }
            break;
    }

    finalize_macro_(c, mac, params);
};

MacroRenderer.input_text = function(c, params) {
    if (params.ctl_rect) {
        params.x = params.ctl_rect.left;
        params.y = params.ctl_rect.top;
        params.w = params.ctl_rect.width;
        params.h = params.ctl_rect.height;
    }
    if (typeof params.x == 'undefined') params.x = 140;
    if (typeof params.y == 'undefined') params.y = 120;
    if (typeof params.w == 'undefined') params.w = 200;
    if (typeof params.h == 'undefined') params.h = 200;
    if (typeof params.z == 'undefined') params.z = 1;

    MacroDefaultsHandler.PrepareMacro(c, 'input_text', params);

    // DPS-24394
    if (!params.ctl_border_style) params.ctl_border_style = 'solid';
    var ctl = {
        type: 'inputtext',
        id: params.uid,
        x: params.x,
        y: params.y,
        w: params.w,
        h: params.h,
        z: params.z,
        regexp: params.regexp,
        padding: params.padding,
        locked: params.locked,
        hidden: params.hidden,
        text: params.ctl_init_text,
        text_color: params.ctl_font_color,
        background_color: params.ctl_bg_color,
        border: params.ctl_border,
        border_color: params.ctl_border_color,
        border_style: params.ctl_border_style,
        set_border_color: params.ctl_border_color ? true : false,
        font_family: params.ctl_font_family,
        font_size: params.ctl_font_size,
        align: params.ctl_text_align,
        max_length: params.ctl_max_len,
        italic: params.ctl_font_italic,
        bold: params.ctl_font_bold,
        underline: params.ctl_font_underline,
        password: params.ctl_password,
        tabindex: params.tabindex,
        textarea: params.is_textarea,
        hide_scrollbars: !params.is_textarea,
        disabled: params.ctl_disabled,
        noeditcursor: params.ctl_no_edit_cursor,
        tooltip: params.ctl_tooltip,
        fieldname: params.fieldname,
        msie5: c.is_topmost && (BROWSER.IE6 || BROWSER.IE7 || BROWSER.IE8 || BROWSER.IE9),
        check_full_text: params.check_full_text
    };

    var mac = {ctl: ctl, params: params};
    if (!prepare_macro_(c, 'input_text', mac)) return;

    if (BROWSER.MOBILE && mac.bub) ctl.task_bubble = mac.bub.id;  // DPS-21667

    var mpar = {
        uid: params.uid,
        action: 'lclick',
        x: params.x,
        y: params.y,
        w: params.w,
        h: params.h,
        z: params.z
    };

    var mode = MacroHelper.GetMode(c);
    if (c.mode == 'pres') mode = mode.replace(/demo/, 'pres');

    switch (mode) {
        case 'pres':
            if (params.set_focus && params.text_d) c.TaskSetAddStartEvent(mac.task_set, ctl.id + '.focus');
            ctl.onenforced = mac.coll.id + '.flag_' + mac.coll.count0;
        case 'branch_pres':
            if (!ctl.onenforced) ctl.onenforced = mac.next;
            if (!params.text_d) ctl.onclick = 'page.task_next;';

            ctl.enforce_value = !params.text_d && params.regexp ? '12345678' : params.text_d;
            ctl.fire_events = true;
            ctl.confirmation_tab = true;
            ctl.confirmation_enter = true;
            ctl.confirmation_blur = true;
            break;
        case 'demo':
            var mdur = c.global_params.g_show_mouse_dur;

            if (!MacroHelper.IsManualDemoMode(c)) {
                var next = mac.coll.id + '.flag_' + mac.coll.count0++;
                var tmr = MacroCtlCreator.Timer(c, params, '_t', mac.time, next);
                MacroHelper.AddControl(c, tmr, mac.task_set, 'start');
            }

            if (params.animated) {
                // attention: duration for typist is not min/max duration but only max!
                // time is set to mac.time - mouse animation - 200 (to allow user to see changes)
                var typ = MacroCtlCreator.Typist(c, params, '_typist', 0, ctl.id, mac.time - mdur - 200);
                MacroHelper.AddControl(c, typ, mac.task_set);

                var dyn = null;
                if (MacroHelper.ShowMouse(c)) {
                    dyn = MacroCtlCreator.Mouse(c, mpar, '_mouse', 2, mdur, typ.id + '.start');
                } else if (!MacroHelper.IsManualDemoMode(c)) {
                    dyn = MacroCtlCreator.Timer(c, params, '_mouse', mdur, typ.id + '.start');
                } else {
                    dyn = MacroCtlCreator.Timer(c, params, '_mouse', 0, typ.id + '.start');
                }
                MacroHelper.AddControl(c, dyn, mac.task_set, 'start');
            } else {
                ctl.text = params.text_d;
            }
            break;
        case 'branch_demo':
            var mdur = c.global_params.g_show_mouse_dur;
            var time = params.b_duration * 1000;

            if (!MacroHelper.IsPresMode(c)) {
                var tmr = MacroCtlCreator.Timer(c, params, '_t', time, mac.next);
                mac.special.push(tmr);
                mac.start += tmr.id + '.start;';
            }

            if (params.animated) {
                // attention: duration for typist is not min/max duration but only max!
                var typ = null;
                if (MacroHelper.ShowMouse(c)) {
                    var typ = MacroCtlCreator.Typist(c, params, '_typist', 0, ctl.id, time - mdur - 200);
                    var mouse = MacroCtlCreator.Mouse(c, mpar, '_mouse', 2, mdur, typ.id + '.start');
                    mac.special.push(mouse);
                    mac.start += mouse.id + '.start;';
                } else {
                    var typ = MacroCtlCreator.Typist(c, params, '_typist', 0, ctl.id, time - 200);
                    mac.start += typ.id + '.start;';
                }

                mac.special.push(typ);
            } else {
                mac.start += ctl.id + '.set_text#' + params.text_d + ';';
            }
            break;
        case 'form_uebung':
        case 'form_test':
            mac.end += ctl.id + '.disable';
            ctl.text_full = params.text_full;
            if (!params.affirmation_button) {
                ctl.confirmation_tab = false;
                ctl.confirmation_enter = false;
                ctl.affirmation_button = false;
            } else {
                ctl.form_affirmation = true;
                ctl.confirmation_tab = params.confirmation_tab;
                ctl.confirmation_enter = params.confirmation_enter;
                ctl.affirmation_button = params.affirmation_button;
                if (c.internal.form.input_affirmation && params.set_focus) mac.start += ctl.id + '.focus;';
            }
            ctl.confirmation_blur = false;
            input_text_fulltext_(c, mac, true);
            break;
        case 'branch_uebung':
        case 'branch_test':
            mac.end += ctl.id + '.disable';
            ctl.text_full = params.text_full;
            ctl.confirmation_tab = params.confirmation_tab;
            ctl.confirmation_enter = params.confirmation_enter;

            input_text_fulltext_(c, mac, true);
            if (BROWSER.MOBILE && ctl.confirmation_tab) {
                // set confirm_enter also to true to make it easier to go on in mobile devices
                // dont set tab to false, on windows 8 tablets the user could also use a normal
                // keyboard to enter text and use the tab key to confirm
                ctl.confirmation_enter = true;
            }
            break;
        case 'uebung':
        case 'test':
            mac.testo.help_msg = c.Trans('EXER_FAILINPUT');
            ctl.text_full = params.text_full;
            ctl.confirmation_tab = params.confirmation_tab;
            ctl.confirmation_enter = params.confirmation_enter;

            ctl.confirmation_blur = params.confirmation_blur;

            if (ctl.confirmation_blur) {
                var page = c.GetPageCtl();
                if (page) {
                    // clicking page should not lead to error
                    page.ignore_sim_action = true;
                    if (!page.onclick) page.onclick = ''; // prevent to be "undefined"
                    page.onclick += ';' + ctl.id + '.blur;';
                }
                if (BROWSER.MOBILE) {
                    ctl.confirmation_tab = true;
                    ctl.confirmation_enter = true;
                }
            }

            input_text_fulltext_(c, mac, false);
            if (BROWSER.MOBILE && ctl.confirmation_tab) {
                // set confirm_enter also to true to make it easier to go on in mobile devices
                // dont set tab to false, on windows 8 tablets the user could also use a normal
                // keyboard to enter text and use the tab key to confirm
                ctl.confirmation_enter = true;
            }
            if (params.set_focus) c.TaskSetAddStartEvent(mac.task_set, ctl.id + '.focus');
            c.TaskSetAddEndEvent(mac.task_set, ctl.id + '.disable;' + ctl.id + '.set_text#' + params.text_full);
            break;
    }

    finalize_macro_(c, mac, params);
};

MacroRenderer.input_radio = function(c, params) {
    if (params.ctl_rect) {
        params.x = params.ctl_rect.left;
        params.y = params.ctl_rect.top;
        params.w = params.ctl_rect.width;
        params.h = params.ctl_rect.height;
    }
    if (typeof params.x == 'undefined') params.x = 140;
    if (typeof params.y == 'undefined') params.y = 120;
    if (typeof params.w == 'undefined') params.w = 13;
    if (typeof params.h == 'undefined') params.h = 13;
    if (typeof params.z == 'undefined') params.z = 1;

    MacroDefaultsHandler.PrepareMacro(c, 'input_radio', params);

    var ctl = {
        type: 'inputradio',
        id: params.uid,
        radio: params.is_radio,
        radiogroupname: params.radio_group_name,
        checked: params.choose_bool == 0,  // do like this as choose_bool could be "0" or "1"
        choose: params.choose_bool,
        cursorhand: MacroHelper.ShowCursorHand(c, params.cursor_hand),
        tabindex: params.tabindex,
        disabled: params.ctl_disabled,
        hidden: params.hidden,
        x: params.x,
        y: params.y,
        w: params.w,
        h: params.h,
        z: params.z,
        locked: params.locked
    };

    var mac = {ctl: ctl, params: params};
    if (!prepare_macro_(c, 'input_radio', mac)) return;

    var ani_params = {
        uid: params.uid,
        action: 'lclick',
        ctrl: false,
        alt: false,
        shift: false,
        x: params.x,
        y: params.y,
        w: params.w,
        h: params.h,
        z: params.z
    };
    var ani_wait_time = 250;

    var sel = params.choose_bool == 1 ? '.check;' : '.uncheck;';
    var mode = MacroHelper.GetMode(c);
    if (c.mode == 'pres') mode = mode.replace(/demo/, 'pres');

    switch (mode) {
        case 'pres':
            ctl.onclick = ctl.id + sel + mac.coll.id + '.flag_' + mac.coll.count0;
            break;
        case 'branch_pres':
            ctl.onclick = mac.next;
            break;
        case 'demo':
            var mdur = c.global_params.g_show_mouse_dur;
            var next = ctl.id + sel + mac.coll.id + '.flag_' + mac.coll.count0++;

            if (MacroHelper.ShowMouse(c)) {
                var ani = MacroCtlCreator.Mouse(c, ani_params, '_m', 2, mdur, next);
                MacroHelper.AddControl(c, ani, mac.task_set);

                // check the box 250ms before taskset end, to allow the user to see the checked box
                var t_dyn = Math.max(0, mac.time - mdur - ani_wait_time);
                var tmr = MacroCtlCreator.Timer(c, ani_params, '_t', t_dyn, ani.id + '.start', mac.time, mac.coll.id + '.flag_' + mac.coll.count0++);
                MacroHelper.AddControl(c, tmr, mac.task_set, 'start');
            } else {
                // check immediately but do not continue
                var tmr = MacroCtlCreator.Timer(c, params, '_t1', 0, next);
                MacroHelper.AddControl(c, tmr, mac.task_set, 'start');

                if (!MacroHelper.IsManualDemoMode(c)) {
                    // auto continue
                    tmr = MacroCtlCreator.Timer(c, params, '_t2', mac.time, mac.coll.id + '.flag_' + mac.coll.count0++);
                    MacroHelper.AddControl(c, tmr, mac.task_set, 'start');
                }
            }
            break;
        case 'branch_demo':
            var act = ctl.id + sel;
            var dur = params.b_duration * 1000;

            if (MacroHelper.ShowMouse(c)) {
                // guided; demo+praxis

                // mouse (ani) will move to ctl and will check it
                // we will wait another 250ms in order to let user see the checked box
                if (!MacroHelper.IsPresMode(c)) {
                    // demo+praxis
                    var tmr = MacroCtlCreator.Timer(c, ani_params, '_t', ani_wait_time, mac.next);
                    mac.special.push(tmr);
                    act += tmr.id + '.start';
                    dur = Math.max(10, dur - ani_wait_time);  // reduce time by timer time
                }

                var ani = MacroCtlCreator.Mouse(c, ani_params, '_m', 2, dur, act);
                mac.special.push(ani);
                mac.start += ani.id + '.start;';
            } else if (!MacroHelper.IsManualDemoMode(c) || c.mode == 'praxis') {
                var tmr = MacroCtlCreator.Timer(c, params, '_t', dur, mac.next);
                mac.special.push(tmr);
                mac.start = act + tmr.id + '.start';
            }
            break;
        case 'form_uebung':
        case 'form_test':
        case 'branch_uebung':
        case 'branch_test':
            var act = params.choose_bool == 0 ? '.check' : '.uncheck';
            mac.start += mac.ctl.id + act + ';';
            break;
        case 'uebung':
        case 'test':
            mac.testo.help_msg = c.Trans('EXER_FAILRADIO');
            var act = params.choose_bool == 0 ? '.check' : '.uncheck';
            c.TaskSetAddStartEvent(mac.task_set, mac.ctl.id + act);
            break;
    }

    finalize_macro_(c, mac, params);
};

MacroRenderer.select_single = function(c, params) {
    if (params.ctl_rect) {
        params.w = params.ctl_rect.width;
        params.h = params.ctl_rect.height;
        params.x = params.ctl_rect.left;
        params.y = params.ctl_rect.top;
    }
    if (typeof params.x == 'undefined') params.x = 140;
    if (typeof params.y == 'undefined') params.y = 120;
    if (typeof params.w == 'undefined') params.w = 200;
    if (typeof params.h == 'undefined') params.h = 200;
    if (typeof params.z == 'undefined') params.z = 1;

    MacroDefaultsHandler.PrepareMacro(c, 'select_single', params);

    var ctl = {
        type: 'inputselect',
        id: params.uid,
        values: params.all_values,
        cursorhand: MacroHelper.ShowCursorHand(c, params.cursor_hand),
        font_family: params.ctl_font_family,
        font_size: params.ctl_font_size,
        text_color: params.ctl_font_color,
        bold: params.ctl_font_bold,
        italic: params.ctl_font_italic,
        background_color: params.ctl_bg_color,
        disabled: params.ctl_disabled,
        tabindex: params.tabindex,
        x: params.x,
        y: params.y,
        w: params.w,
        h: params.h,
        z: params.z,
        choose_nr: params.choose_nr,
        choose_text: params.choose_text,
        fieldname: params.fieldname
    };

    var mac = {ctl: ctl, params: params};
    if (!prepare_macro_(c, 'select_single', mac)) return;

    var mode = MacroHelper.GetMode(c);
    if (c.mode == 'pres') mode = mode.replace(/demo/, 'pres');

    switch (mode) {
        case 'pres':
            ctl.fire_events = true;
            ctl.oncorrectanswer = mac.coll.id + '.flag_' + mac.coll.count0;
            break;
        case 'branch_pres':
            ctl.fire_events = true;
            ctl.oncorrectanswer = mac.next;
            break;
        case 'demo':
            var next = mac.coll.id + '.flag_' + mac.coll.count0++;
            if (params.animated) {
                var ani = MacroCtlCreator.DropDownAni(c, params, ctl.id, mac.time, next);
                MacroHelper.AddControl(c, ani, mac.task_set, 'start');
            } else {
                var tmr = MacroCtlCreator.Timer(c, params, '_t1', 0, ctl.id + '.select;');
                MacroHelper.AddControl(c, tmr, mac.task_set, 'start');

                if (!MacroHelper.IsManualDemoMode(c)) {
                    tmr = MacroCtlCreator.Timer(c, params, '_t2', mac.time, next);
                    MacroHelper.AddControl(c, tmr, mac.task_set, 'start');
                }
            }
            break;
        case 'branch_demo':
            if (params.animated) {
                var ani = MacroCtlCreator.DropDownAni(c, params, ctl.id, params.b_duration * 1000, !MacroHelper.IsPresMode(c) ? mac.next : null);
                mac.special.push(ani);
                mac.start += ani.id + '.start;';
            } else if (!MacroHelper.IsManualDemoMode(c) || c.mode == 'praxis') {
                var tmr = MacroCtlCreator.Timer(c, params, '_t', params.b_duration * 1000, mac.next);
                mac.special.push(tmr);
                mac.start += ctl.id + '.select;' + tmr.id + '.start;';
            } else {
                mac.start += ctl.id + '.select;';
            }
            break;
        case 'uebung':
        case 'test':
            mac.testo.help_msg = c.Trans('EXER_FAILSELECT');
            break;
    }

    finalize_macro_(c, mac, params);
};

MacroRenderer.key_press = function(c, params) {
    MacroDefaultsHandler.PrepareMacro(c, 'key_press', params);

    var ctl = {
        type: 'hotkey',
        id: params.uid,
        hotkey: params.key_name.replace(/ /g, '_'),
        disabled: true
    };

    var mac = {ctl: ctl, params: params};
    if (!prepare_macro_(c, 'key_press', mac)) return;

    var mode = MacroHelper.GetMode(c);
    if (MacroHelper.IsPresMode(c)) mode = mode.replace(/demo/, 'pres');

    switch (mode) {
        case 'pres':
            var next = mac.coll.id + '.flag_' + mac.coll.count0;
            ctl.oncorrectanswer = next;
            c.TaskSetAddStartEvent(mac.task_set, ctl.id + '.enable');
            c.TaskSetAddEndEvent(mac.task_set, ctl.id + '.disable');
            break;
        case 'branch_pres':
            ctl.oncorrectanswer = mac.next;
            mac.start = ctl.id + '.enable;';
            mac.end = ctl.id + '.disable;';
            break;
        case 'demo':
            if (!MacroHelper.IsManualDemoMode(c)) {
                var timer = MacroCtlCreator.Timer(c, params, '_t', mac.time, mac.coll.id + '.flag_' + mac.coll.count0++);
                MacroHelper.AddControl(c, timer, mac.task_set, 'start');
            }
            break;
        case 'branch_demo':
            if (!MacroHelper.IsPresMode(c)) {
                var tmr = MacroCtlCreator.Timer(c, params, '_t', params.b_duration * 1000, mac.next);
                mac.special.push(tmr);
                mac.start += tmr.id + '.start;';
            }
            break;
        case 'form_uebung':
        case 'form_test':
        case 'branch_uebung':
        case 'branch_test':
            mac.start += ctl.id + '.enable;';
            mac.end += ctl.id + '.disable;';
            break;
        case 'uebung':
        case 'test':
            var hlp = params.key_name.toUpperCase();
            mac.testo.help_msg = c.Trans('EXER_FAILKEY2').replace(/@1_keys_/, ' "' + hlp + '"');
            c.TaskSetAddStartEvent(mac.task_set, ctl.id + '.enable');
            c.TaskSetAddEndEvent(mac.task_set, ctl.id + '.disable');
            break;
    }

    finalize_macro_(c, mac, params);
};

})();
if (!window.MacroRenderer) MacroRenderer = {};
if (!window.MacroRenderer.Quiz) MacroRenderer.Quiz = {};

MacroRenderer.Quiz = {
    // common quiz handling
    QUIZ_OMMIT: {
        next: 1,
        next_enabled: 1,
        next_enabled_nocheck: 1,
        next_disabled: 1,
        feedback: 1,
        feedback_correct: 1,
        feedback_wrong: 1,
        feedback_timeout: 1,
        mediaobject: 1
    },

    prepare_macro_: function(c, mac_type, mac) {
        var p = mac.params;
        mac.type = mac_type;
        mac.sctx = {_this: 'macro', macro: p.uid};
        c.SetSourceContext(mac.sctx);

        var tctls = null;
        var eval = mac_type === 'quiz_eval';

        var qtpl = p.quiz_template || c.global_params.g_quiz_template;
        if (qtpl) {
            var tpl = c.LoadFile(qtpl + ':slide.js', 'JSON');
            tctls = tpl && tpl.controls;

            var templ = {};
            var found = false;
            for (var cid in tctls) {
                var tctl = tctls[cid];
                templ[tctl.name || cid] = tctl;
                found = true;
            }
            mac.template = found ? templ : false;
            if (found) {
                mac.template_id = qtpl;
                c.internal.quiz_template = mac.template;
                c.internal.quiz_template_id = mac.template_id;
            }
        }

        // either no template, or template invalid. Fallback to default skin handling
        if (!tctls) {
            // either we do not have a template OR the template file is corrupt.
            mac.skin_addr = c.GetSkinAddr();
            mac.skin = c.LoadFile(mac.skin_addr + ':quiz.txt');
            mac.template = false;  // falling back to skin
        }

        // no skin or template, can not go on
        if (!mac.template && !mac.skin) return;

        // set current style handler
        mac.style = mac.template ? 'template' : 'skin';

        // add hide mouse event
        mac.task_set = MacroHelper.GetTaskset(c, p);
        c.TaskSetAddStartEvent(mac.task_set, 'page.hide_mouse');

        // define quiz w/h
        var gps = c.global_params;
        var psize = gps.g_quiz_page_size;
        if (!psize || !psize.width || !psize.height) psize = {};
        var tpage = mac.template ? mac.template.page : null;

        var s = mac.skin || {};
        // DPS-45859
        // in case of template, use template w/h or the default w/h values
        // in case no template is set, use global params quiz page w/h or skin w/h as last fallback
        mac.quiz_w = tpage ? (tpage.w || 1024) : psize.width || s.w;
        mac.quiz_h = tpage ? (tpage.h || 672) : psize.height || s.h;

        // set some internal values
        var itl = c.internal;
        if (!itl.quiz_counter) itl.quiz_counter = 1;
        if (!itl.quiz_number) itl.quiz_number = {};
        if (!itl.quiz_number[mac.ctl.id]) itl.quiz_number[mac.ctl.id] = itl.quiz_counter;
        itl.quiz_zindex = 0;
        mac.is_eval = eval;
        mac.is_rtl = c.GetContentInfo().rtl || false;
        mac.has_timeout = p.quiz_timeout && p.quiz_timeout != 0 || false;
        mac.has_g_timeout = !eval && gps.g_quiz_timeout && gps.g_quiz_timeout > 0 || false;
        mac.has_question = p.question && p.question != '' || false;
        mac.has_media = p.qm_file && p.qm_file != '' || false;
        mac.has_media_as_question = p.qm_file && p.qm_as_question || false;
        mac.has_feedback = !eval && p.feedback_enable;
        mac.has_feedback_popup = gps.g_feedback_popup || false;
        mac.allow_skipping = gps.g_quiz_skipping || false;
        if (!eval) c.TaskSetSetQuiz(mac.task_set, mac.allow_skipping);

        this[mac.style].prepare_macro_(c, !eval, mac);

        if (!eval) {
            mac.ctl.oncorrectanswer = ['', '.track_correct;', '_points.update_placeholder;', '.disable;'].join(p.uid);
            mac.ctl.onwronganswer = ['', '.track_wrong;', '_points.update_placeholder;', '.disable;'].join(p.uid);

            if (mac.has_feedback) {
                mac.ctl.oncorrectanswer += p.uid + '_feedback_correct.show;';
                mac.ctl.onwronganswer += p.uid + '_feedback_wrong.show;';
                mac.ctl.onskip = 'page.task_next;';
                mac.coll = MacroCtlCreator.Collector(c, p, '_coll', 0, 'page.task_next');

                if (mac.has_feedback_popup) {
                    mac.ctl.oncorrectanswer += p.uid + '_feedback_close.show;';
                    mac.ctl.onwronganswer += p.uid + '_feedback_close.show;';
                }
            }

            mac.ctl.skip_allowed = mac.allow_skipping;
            if (!mac.allow_skipping) {
                mac.ctl.onready = ['', '_next_disabled.hide;', '_next_enabled.show;'].join(p.uid);
                mac.ctl.onnotready = ['', '_next_disabled.show;', '_next_enabled.hide;'].join(p.uid);
            }
        }
        this[mac.style].create_controls_(c, mac);
    },

    finalize_macro_: function(c, mac, params) {
        c.AddStartEvent('taskinfo.show');
        if (mac.task_set && params.uid) c.TaskSetSetMacroUid(mac.task_set, params.uid);

        // using skin file and layout manager to position controls
        if (!mac.template) this.skin.apply_skin_positions_(c, mac);

        var uid = params.uid;
        if (!mac.ctl.z && !mac.template) mac.ctl.z = c.internal.quiz_zindex++;

        // feedback controls
        if (mac.has_feedback) {
            var popup = mac.has_feedback_popup;
            if (c.global_params.g_feedback_correct_solutions) {
                mac.ctl.feedback_info = {
                    wrong_id : uid + '_feedback_wrong',
                    timeout_id : uid + '_feedback_timeout',
                    as_popup : popup,
                    icons: this.get_feedback_icon_object_(c, mac) // need to give img strings to slide engine to make icons skinnable
                };
            }

            this[mac.style].create_feedback_(c, mac);

            // TODO: textcontrol is buggy, need to create controls without hiding them and hiding them afterwards
            if (!popup && !BROWSER.MOBILE || mac.template) {
                c.TaskSetAddStartEvent(uid, [
                     '',
                     '_feedback_correct.hide;',
                     '_feedback_wrong.hide;',
                     '_feedback_timeout.hide;'
                 ].join(uid));
            }
        } else if (mac.is_eval && mac.ctl.feedback.enable) {
            this[mac.style].handle_eval_feedback_icon_(c, mac);
        }

        this.create_next_buttons_(c, mac);

        if (!mac.is_eval) {
            // quiz.(g_)timeout leads to show of wrong feedback and shows that, need to hide again - XXX ontimeout action for quizzes would be better
            var act = ['', '_next_enabled_nocheck.show;', '_next_enabled.hide;', '_next_disabled.hide;', '.timeout;', '_feedback_wrong.hide;', '_feedback_timeout.show;', '.disable;'].join(uid);
            if (mac.has_timeout) {
                var timeout = mac.params.quiz_timeout || 0;
                mac.timer = MacroCtlCreator.Timer(c, mac.params, '_t', timeout * 1000, act);
                mac.timer.countdown = params.uid + '_countdown.set_text;';
                MacroHelper.AddControl(c, mac.timer, mac.params.uid, 'start');
            }
            if (mac.has_g_timeout) {
                mac.ctl.g_timeout = c.global_params.g_quiz_timeout * 1000;
                mac.g_timer = MacroCtlCreator.Timer(c, mac.params, '_g_t', '${g_quiz_timeout}', act.replace('.timeout;', '.g_timeout;'));
                mac.g_timer.countdown = params.uid + '_g_countdown.set_text;';
                MacroHelper.AddControl(c, mac.g_timer, mac.params.uid, 'start');
            }

            c.TaskSetAddStartEvent(uid, uid + '_countdown.' + (mac.has_timeout ? 'show' : 'hide'));
            c.TaskSetAddStartEvent(uid, uid + '_g_countdown.' + (mac.has_g_timeout ? 'show' : 'hide'));

            if (!mac.template) this.skin.correct_hourglass_position_(mac);
        }

        // quiz media
        if (mac.has_media) this.create_media_object_(c, mac);

        // no question set, do not create element
        var ommit = MacroRenderer.Quiz.QUIZ_OMMIT;
        ommit.question = !mac.has_question;

        // add controls to the current task set
        var mc = mac.controls;
        for (var p in mc) {
            for (var i = 0; i <= mc[p].length - 1; i++) {
                if (!mc[p][i].type || ommit[mc[p][i].name]) continue;
                if (!mc[p][i].z && !mac.template) mc[p][i].z = c.internal.quiz_zindex++;
                MacroHelper.AddControl(c, mc[p][i], mac.task_set);
            }
        }

        if (mac.template) {
            // do not show quiz control / evaluation page directly but by show event to trigger
            // possible onshow handlers attached to the template element
            mac.ctl.hidden = 1;
            var p = mac.params;
            c.TaskSetAddStartEvent(p.uid, mac.ctl.id + '.show');
        }

        MacroHelper.AddControl(c, mac.ctl, mac.task_set);

        if (mac.coll && mac.coll.id && mac.coll.count0 > 0) {
            MacroHelper.AddControl(c, mac.coll, mac.task_set);
        }
    },

    create_next_buttons_: function(c, mac) {
        var p = mac.params;

        var buttons = this[mac.style].get_next_buttons_(c, mac);
        var next_enabled = buttons[0];
        var next_enabled_nocheck = buttons[1];
        var next_disabled = buttons[2];

        if (next_enabled) {
            next_enabled.id = p.uid + '_next_enabled';
            next_enabled.hidden = !mac.allow_skipping;
            if (!next_enabled.tooltip) next_enabled.tooltip = c.Trans('NEXT');
            next_enabled.onclick = ['',
                '.check;',
                '_g_t.stop;',
                '_g_countdown.hide;',
                '_g_hourglass.hide;',
                '_t.stop;',
                '_countdown.hide;',
                '_hourglass.hide;',
                '_next_enabled.hide;',
                '_next_enabled_nocheck.show;'].join(p.uid);
            next_enabled.tabindex = 15;
            if (!mac.has_feedback) next_enabled.onclick += 'page.task_next;';
            MacroHelper.AddControl(c, next_enabled, mac.task_set);
        }

        if (next_enabled_nocheck) {
            next_enabled_nocheck.id = p.uid + '_next_enabled_nocheck';
            next_enabled_nocheck.hidden = 1;
            next_enabled_nocheck.onclick = 'page.task_next;';
            if (!next_enabled_nocheck.tooltip) next_enabled_nocheck.tooltip = c.Trans('NEXT');
            next_enabled_nocheck.onshow = ['' ,
               '_g_t.stop;',
               '_g_countdown.hide;',
               '_g_hourglass.hide;',
               '_t.stop;',
               '_countdown.hide;',
               '_hourglass.hide;'].join(p.uid);
            next_enabled_nocheck.tabindex = 20;
            MacroHelper.AddControl(c, next_enabled_nocheck, mac.task_set);
        }

        if (next_disabled) {
            next_disabled.id = p.uid + '_next_disabled';
            next_disabled.hidden = mac.allow_skipping;
            next_disabled.tabindex = -1;
            MacroHelper.AddControl(c, next_disabled, mac.task_set);
        }
    },

    cleanup_html_fields_: function(params, info) {
        for (var key in info) {
            var ki = info[key];
            if (ki === 0) {
                // just this element needs to be handled
                if (params[key]) params[key] = WCT.CleanupHTMLString(params[key]);
            } else if (ki) {
                // handle all occasions of this key value
                if (params.answer_type !== 'at_regexp') {
                    // only for non regexp answer type
                    for (var i = 1; i <= ki; i++) {
                        var pk = key + '_' + i;
                        if (params[pk]) params[pk] = WCT.CleanupHTMLString(params[pk]);
                    }
                }
            }
        }
    },

    get_context_: function(c, mac) {
        if (mac.template) {
            var ctx = new WCT.context();
            ctx.SetScope('slide');
            ctx.Set('slide', mac.template_id);
            return ctx;
        }
        return c.GetContext();
    },

    get_feedback_icon_object_: function(c, mac) {
        var sc_img = this[mac.style].get_feedback_icon_(mac, 'correct');
        var sw_img = this[mac.style].get_feedback_icon_(mac, 'wrong');

        var saddr = mac.skin_addr ? mac.skin_addr + '/' : '';
        var cimg_id = saddr + sc_img.image.id;
        var wimg_id = saddr + sw_img.image.id;

        return {
            correct_icon : {
                id: cimg_id,
                w: sc_img.w || sc_img.image.w || 0,
                h: sc_img.h || sc_img.image.h || 0,
                x: sc_img.image.x || 0,
                y: sc_img.image.y || 0,
                template: mac.template_id
            },
            wrong_icon: {
                id: wimg_id,
                w: sw_img.w || sw_img.image.w || 0,
                h: sw_img.h || sw_img.image.h || 0,
                x: sw_img.image.x || 0,
                y: sw_img.image.y || 0,
                template: mac.template_id
            }
        };
    },
    get_feedback_text_: function(c, params, type) {
        if (params['feedback_' + type]) {
            return params['feedback_' + type];
        } else if (c.global_params['g_feedback_' + type]) {
            return c.global_params['g_feedback_' + type];
        }
        return '';
    },

    get_media_type_: function(file) {
        var i = file.lastIndexOf('.');
        /* this respects DPS-12718 and is surer */
        var ext = i >= 0 ? file.substr(i + 1) : null;
        if (!ext) return;
        ext = ext.toLowerCase();

        if ({avi: true, m4v: true, mov: true, mp4: true, wmv: true, mpg: true, mpeg: true, qt: true, rm: true}[ext]) return 'video';
        if ({wav: true, mp3: true, wma: true}[ext]) return 'audio';
        if ({gif: true, jpg: true, png: true, bmp: true, jpeg: true}[ext]) return 'image';
        if ({swf: true}[ext]) return 'flash';
    },

    create_media_object_: function(c, mac) {
        var p = mac.params;
        var m_type = this.get_media_type_(p.qm_file);
        if (!m_type) return; // unsupported file format

        var id = p.uid + '_media';
        var action_open =
            p.uid + '_media_open_play.hide;' +
            p.uid + '_media_close_stop.show;' +
            id + '.show;' +
            id + '.play;';
        var action_close =
            p.uid + '_media_open_play.show;' +
            p.uid + '_media_close_stop.hide;' +
            id + '.stop;' +
            id + '.hide;';

        var ctx = c.GetContext();
        var m_file = ctx.ToAbsPath(p.qm_file);

        // get the controls corresponding to current style (template / skin)
        var ctls = this[mac.style].get_media_objects_(c, mac, !p.qm_as_question, m_type);
        var mctl = ctls[0];
        var octl = ctls[1];
        var cctl = ctls[2];
        var pctl = ctls[3];

        var puz = mac.type === 'puzzlequiz';
        var sh = puz && mac.params.qp_show_hint;
        var is_image = m_type === 'image';
        var prevent_show = is_image && puz && !sh;
        if (prevent_show && !mac.template) return;

        // GENERAL HANDLING FOR MEDIA CONTROL
        if (mctl) {
            mctl.id = id;
            mctl.type = m_type;
            if (!mac.template) {
                mctl.z = mac.ctl.z ? mac.ctl.z + 1 : mctl.z || c.internal.quiz_zindex++;
            }

            switch (m_type) {
                case 'audio':
                    mctl.type = 'wmp'; // should be 'audio'
                    // we will need to add a setting to make audio control visible on the site
                    // for now it will play but not be seen, therefore no seek bar or anything else available
                case 'video':
                    mctl.playonstart = p.qm_as_question ? 1 : 0;
                    mctl.src = m_file;
                    mctl.showControls = 1;
                    mctl.showStatusBar = 0;
                    mctl.loop = 0;
                    mctl.hidden = !mac.has_media_as_question;
                    break;
                case 'image':
                    mctl.image = {id: p.qm_file};
                    mctl.alt_txt = p.qm_alt_txt;
                    mctl.keep_aspect = 1;
                    mctl.zoomable = typeof mctl.zoomable !== 'undefined' ? mctl.zoomable : mac.has_media_as_question;
                    mctl.hidden = !mac.has_media_as_question && mac.style === 'template';  // by default image will be visible, even if not qm_as_question
                    break;
                case 'flash':
                    mctl.src = p.qm_file;
                    mctl.wmode = 'transparent';
                    mctl.playonstart = 1;
                    mctl.loop = 1;
                    mctl.hidden = !mac.has_media_as_question;
                    break;
            }
        }

        if (mac.template && is_image && pctl && !mac.has_media_as_question) {
            // template handling / media is image - use image as opener
            pctl.id = p.uid + '_media_open_play';
            pctl.type = m_type;
            pctl.image = {id: p.qm_file};
            pctl.alt_txt = p.qm_alt_txt;
            pctl.keep_aspect = 1;
            pctl.zoom = 0;
            pctl.onclick = action_open;
            if (octl) octl.hidden = 1;  // hide original opener
        } else if (octl) {
            // OPEN BUTTON
            octl.id = p.uid + '_media_open_play';
            octl.alt_txt = p.qm_alt_txt;
            octl.onclick = action_open;
            octl.hidden = mac.has_media_as_question ? 1 : 0;
        }

        // CLOSE BUTTON
        if (cctl) {
            cctl.id = p.uid + '_media_close_stop';
            cctl.onclick = action_close;
            cctl.hidden = 1;
            cctl.z = mctl.z + 1;
        }

        if (pctl) {
            if (mac.has_media_as_question) pctl.hidden = 1;
            if (!is_image) pctl.hidden = 1;
        }


        if (!mac.template) {
            var ts = mac.task_set;
            if (mctl) MacroHelper.AddControl(c, mctl, ts);
            if (octl) MacroHelper.AddControl(c, octl, ts);
            if (cctl) MacroHelper.AddControl(c, cctl, ts);
        } else if (prevent_show) {
            // puzzle quiz - help should not be visible
            octl.hidden = 1;
        }
    },

    // ~~~~~~~~~~~~~~~ TEMPLATE RELATED HANDLING ~~~~~~~~~~~~~~~~~~~~~~
    template: {
        prepare_macro_: function(c, not_eval, mac) {
            mac.controls = {template: []};

            var tmpl = mac.template;
            var tpage = tmpl.page || {};

            MacroHelper.AddControl(c, {
                type: 'page',
                id: 'page',
                is_quiz: not_eval,
                z: 1,
                onload: 'page.task_next;' + (tpage.onload || ''),
                w: tpage.w,
                h: tpage.h,
                background_image_centered: tpage.background_image_centered,
                background_color: tpage.background_color,
                border: tpage.border,
                border_color: tpage.border_color,
                border_style: tpage.border_style,
                canvas_color: tpage.canvas_color,
                image: tpage.image,
                pagesound: tpage.pagesound,
                fontsizeInPt: tpage.fontsizeInPt,
                skin: tpage.skin,
                version: tpage.version
            });

            // apply template values to quiz element
            var ctl = mac.ctl;
            var tctl = mac.is_eval && tmpl.quiz_evaluation ? tmpl.quiz_evaluation : tmpl.quiz_element;
            var skip = ['id', 'name', 'type', 'text'];
            var quiz_types = ['mchoice', 'puzzlequiz', 'fibquiz', 'sqmaquiz', 'gridquiz', 'matchquiz', 'connquiz', 'mixquiz', 'scalequiz', 'hotspotquiz'];
            var specials = {
                line_color: 'connquiz',
                random_line_color: 'connquiz',
                scale_color: 'scalequiz',
                scale_thickness: 'scalequiz',
                slider_color: 'scalequiz',
                slider_border_color: 'scalequiz',
                slider_w: 'scalequiz',
                slider_h: 'scalequiz'
            };

            // allowed center alignments
            var cm = {
                mchoice:     {v: 1, h: 1},
                sqmaquiz:    {v: 1, h: 0},
                fibquiz:     {v: 1, h: 1},
                matchquiz:   {v: 1, h: 1},
                connquiz:    {v: 1, h: 0},
                mixquiz:     {v: 1, h: 1},
                scalequiz:   {v: 1, h: 0},
                gridquiz:    {v: 1, h: 1},
                puzzlequiz:  {v: 1, h: 1},
                hotspotquiz: {v: 1, h: 1},
                quiz_eval:   {v: 0, h: 0}
            };

            var type = ctl.type;
            for (var i in tctl) {
                var pid = i;
                if (skip.indexOf(i) !== -1) continue;
                var idx = pid.lastIndexOf('_');
                var qt = pid.substr(idx + 1);

                if (quiz_types.indexOf(qt) !== -1) {
                    // its a quiz specific parameter if quiz type of this param is
                    // same as currently created quiz type apply param, otherwise discard
                    if (qt === type) {
                        pid = pid.substr(0, idx);
                    } else {
                        continue;
                    }
                }
                // is in the list of special macros but does not fit to current type
                if (specials[pid] && specials[pid] !== type) continue;

                // special handling for background color and mixquiz as it was already definable and it would lead
                // to moving all background color params from the common section to every quiz style section
                if (type === 'mixquiz' && pid === 'action_background_color') pid = 'background_color_dnd';

                // prevent setting of center_quiz_X in case not allowed
                if (i === 'center_quiz_v' && tctl[i] && !cm[type]['v']) continue;
                if (i === 'center_quiz_h' && tctl[i] && !cm[type]['h']) continue;

                ctl[pid] = tctl[i];
            }

            mac.template_map = {};
            if (!mac.is_eval) {
                mac.template_map[tctl.id] = ctl.id;
            }
        },

        get_media_objects_: function(c, mac, create_opener/*, m_type*/) {
            var t = mac.controls.template;
            // basic media object control
            var idx = t.indexOfAtt('media', 'name');
            var p = mac.params;
            var media_ctl = idx >= -1 ? t[idx] : null;  // no media object in template

            if (!create_opener) {
                // case that quiz media should be shown instead of task
                // get x, y, w, h from quiz task and apply it to media ctl
                idx = t.indexOfAtt('task', 'name');
                if (idx === -1) {
                    // no task found!
                    create_opener = true;
                } else {
                    var task = t[idx];
                    task.hidden = 1;
                    media_ctl.x = task.x;
                    media_ctl.y = task.y;
                    media_ctl.w = task.w;
                    media_ctl.h = task.h;
                }
            } else if (p.qm_width && p.qm_height) {
                // IMPLEMENT PROPER SCALED VIDEO ELEMENT IF MEDIA W / H GIVEN
                var w = p.qm_width;
                var h = p.qm_height;
                var tw = media_ctl.w;
                var th = media_ctl.h;

                if (w < tw || h < th) {
                    var new_x = Math.max(0, media_ctl.x + (tw - w >> 1));
                    var new_y = Math.max(0, media_ctl.y + (th - h >> 1));
                    media_ctl.w = w;
                    media_ctl.h = h;
                    media_ctl.x = new_x;
                    media_ctl.y = new_y;
                }
            }

            var open_play_ctl = null;
            idx = t.indexOfAtt('media_open', 'name');
            if (idx !== -1) open_play_ctl = t[idx];
            if (open_play_ctl) this.correct_image_path_(mac, open_play_ctl);

            var close_stop_ctl = null;
            idx = t.indexOfAtt('media_close', 'name');
            if (idx !== -1) close_stop_ctl = t[idx];
            if (close_stop_ctl) this.correct_image_path_(mac, close_stop_ctl);

            var preview_ctl = null;
            idx = t.indexOfAtt('media_preview', 'name');
            if (idx !== -1) preview_ctl = t[idx];
            if (preview_ctl) this.correct_image_path_(mac, preview_ctl);

            return [media_ctl, open_play_ctl, close_stop_ctl, preview_ctl];
        },

        correct_image_path_: function(mac, ctl) {
            if (!ctl.image || !ctl.image.id) return;
            if (ctl.image.id.search(':') === -1) { // no typical dgo address, no protocol
                ctl.image.id = mac.template_id + ':' + ctl.image.id;
            }
        },

        create_feedback_: function(c, mac) {
            // handles normal and popup feedback
            var p = mac.params;
            var t = mac.controls.template;
            var pop = mac.has_feedback_popup ? '_popup' : '';
            var gp = c.global_params;
            if (!mac.template_info) mac.template_info = {};
            var tinfo = mac.template_info;

            // TODO: textcontrol is buggy, need to create controls without hiding them and hiding them afterwards
            var cidx = t.indexOfAtt('feedback_correct' + pop, 'name');
            var widx = t.indexOfAtt('feedback_wrong' + pop, 'name');
            var tidx = t.indexOfAtt('feedback_timeout' + pop, 'name');

            if (pop) {
                // popup feedback, check existence of controls, otherwise fallback to default feedback element
                if (cidx === -1) cidx = t.indexOfAtt('feedback_correct', 'name');
                if (widx === -1) widx = t.indexOfAtt('feedback_wrong', 'name');
                if (tidx === -1) tidx = t.indexOfAtt('feedback_timeout', 'name');
            }

            tinfo.feedback_correct = cidx !== -1;
            tinfo.feedback_wrong = widx !== -1;
            tinfo.feedback_timeout = tidx !== -1;

            if (tinfo.feedback_correct) {
                var feedback_c = WCT.DeepCopy(t[cidx]);
                feedback_c.hidden = BROWSER.MOBILE;
                feedback_c.id =  p.uid + '_feedback_correct';
                feedback_c.padding = 4;
                feedback_c.text = p['feedback_pass'] || gp['g_feedback_pass'] || '';
                feedback_c.onshow += ';' + p.uid + '_feedback_passed_icon.show;';
                feedback_c.z = Math.max(mac.ctl.z + 1, feedback_c.z);
                MacroHelper.AddControl(c, feedback_c, mac.task_set);
            }

            if (tinfo.feedback_wrong) {
                var feedback_w = WCT.DeepCopy(t[widx]);
                feedback_w.hidden = BROWSER.MOBILE;
                feedback_w.id =  p.uid + '_feedback_wrong';
                feedback_w.text = p['feedback_fail'] || gp['g_feedback_fail'] || '';
                feedback_w.text += '${quiz_correct_answers}';
                feedback_w.onshow += ';' + p.uid + '_feedback_failed_icon.show;';
                feedback_w.z = Math.max(mac.ctl.z + 1, feedback_w.z);
                MacroHelper.AddControl(c, feedback_w, mac.task_set);
            }

            if (tinfo.feedback_timeout) {
                var feedback_t = WCT.DeepCopy(t[tidx]);
                feedback_t.hidden = BROWSER.MOBILE;
                feedback_t.id =  p.uid + '_feedback_timeout';
                feedback_t.text = p['feedback_time'] || gp['g_feedback_time'] || '';
                feedback_t.text += '${quiz_correct_answers}';
                feedback_t.onshow += ';' + p.uid + '_feedback_failed_icon.show;';
                feedback_t.z = Math.max(mac.ctl.z + 1, feedback_t.z);
                MacroHelper.AddControl(c, feedback_t, mac.task_set);
            }

            // close button
            var cbidx = t.indexOfAtt('feedback_close' + pop, 'name');
            if (cbidx !== -1) {
                var close_popup = WCT.DeepCopy(t[cbidx]);

                close_popup.hidden = 1;
                close_popup.id =  p.uid + '_feedback_close';
                close_popup.onclick = ['', '_feedback_correct.hide;', '_feedback_wrong.hide;', '_feedback_timeout.hide;', '_feedback_close.hide'].join(p.uid);
                close_popup.z = Math.max(feedback_c && feedback_c.z || 0, feedback_w && feedback_w.z || 0, feedback_t && feedback_t.z || 0) + 1;
                MacroHelper.AddControl(c, close_popup, mac.task_set);
            }

            if (!pop) {
                var co = feedback_c && feedback_c.z ? feedback_c.z + 1 : 1;
                var wr = feedback_w && feedback_w.z ? feedback_w.z + 1 : 1;
                var to = feedback_t && feedback_t.z ? feedback_t.z + 1 : 1;

                // correct icon
                idx = t.indexOfAtt('feedback_passed_icon', 'name');
                if (idx !== -1) {
                    var passed_icon = WCT.DeepCopy(t[idx]);
                    passed_icon.hidden = 1;
                    passed_icon.id =  p.uid + '_feedback_passed_icon';
                    passed_icon.z = Math.max(co, passed_icon.z);
                    MacroHelper.AddControl(c, passed_icon, mac.task_set);
                }

                // wrong icon
                idx = t.indexOfAtt('feedback_failed_icon', 'name');
                if (idx !== -1) {
                    var failed_icon = WCT.DeepCopy(t[idx]);
                    failed_icon.hidden = 1;
                    failed_icon.id =  p.uid + '_feedback_failed_icon';
                    failed_icon.z = Math.max(wr, to, failed_icon.z);
                    MacroHelper.AddControl(c, failed_icon, mac.task_set);
                }
            }
        },

        get_feedback_icon_: function(mac, type) {
            var t = mac.controls.template;
            var idx = t.indexOfAtt('feedback_' + type + '_icon', 'name');

            if (idx > -1) return {image: t[idx].image};
            return {image: {id: ''}, w: 0, h: 0};
        },


        handle_eval_feedback_icon_: function(c, mac) {
            var t = mac.controls.template;

            // correct icon
            var idx = t.indexOfAtt('feedback_passed_icon', 'name');
            if (idx !== -1) mac.ctl.feedback.pass_icon = WCT.DeepCopy(t[idx]);

            // wrong icon
            idx = t.indexOfAtt('feedback_failed_icon', 'name');
            if (idx !== -1) mac.ctl.feedback.fail_icon = WCT.DeepCopy(t[idx]);
        },

        get_next_buttons_: function(c, mac) {
            var t = mac.controls.template;

            var next_enabled = null;
            var next_enabled_nocheck = null;
            var next_disabled = null;

            // next enabled buttons
            var idx = t.indexOfAtt('next_enabled', 'name');
            if (idx !== -1) {
                next_enabled = t[idx];
                next_enabled_nocheck = WCT.DeepCopy(next_enabled);
            }

            // next disabled buton
            idx = t.indexOfAtt('next_disabled', 'name');
            if (idx !== -1) next_disabled = t[idx];

            // need to return a copy, as we would otherwise return references to our template
            // then we could not add one control twice for several quiz macros in one step
            return WCT.DeepCopy([next_enabled, next_enabled_nocheck, next_disabled]);
        },

        // quiz template based
        create_controls_: function(c, mac) {
            var t = mac.template;
            var mct = mac.controls.template;
            var p = mac.params;
            var skip = ['page', 'quiz_evaluation', 'quiz_element'];  // will be handled seperately
            var id_map = mac.template_map;
            for (var id in t) {
                if (skip.indexOf(id) !== -1) continue;
                var tctl = WCT.DeepCopy(t[id]);
                var org_id = tctl.id;
                var tidx = tctl.tabindex;
                switch (id) {
                    case 'print_button':
                        tctl.id = p.uid + '_print';
                        tctl.hidden = !mac.is_eval;
                        tctl.onclick = p.uid + '.print';
                        tctl.tabindex = tidx || 40;
                        break;
                    case 'title':
                        tctl.id = p.uid + '_quiz_title';
                        tctl.text = WCT.CleanupHTMLString(p.title);
                        tctl.tabindex = tidx || 1;
                        break;
                    case 'task':
                        tctl.id = p.uid + '_quiz_question';
                        tctl.hidden = mac.has_media_as_question || false;
                        tctl.text = p.question;
                        tctl.tabindex = tidx || 2;
                        break;
                    case 'points':
                        tctl.id = p.uid + '_points';
                        tctl.text = '${quiz_cur_score} / ${quiz_max_score}';
                        tctl.tabindex = tidx || 40;
                        break;
                    case 'countdown':
                        tctl.id = p.uid + '_countdown';
                        tctl.hidden = 1;
                        tctl.tabindex = tidx || 3;
                        break;
                    case 'countdown_global':
                        tctl.id = p.uid + '_g_countdown';
                        tctl.hidden = 1;
                        tctl.tabindex = tidx || 3;
                        break;
                    case 'number':
                        tctl.id = p.uid + '_number';
                        tctl.tabindex = tidx || -1;
                        tctl.text = '<p>' + (c.internal.quiz_number[mac.ctl.id]) + '</p>';
                        if (!mac.is_eval) c.internal.quiz_counter++;
                        break;
                    case 'media_open':
                    case 'media_preview':
                        tctl.hidden = !mac.has_media;
                        tctl.tabindex = tidx || 4;
                        break;
                    case 'media_close':
                        tctl.hidden = !mac.has_media;
                        if (!tctl.tooltip) tctl.tooltip = c.Trans('CLOSE');
                        tctl.tabindex = tidx || 6;
                        break;
                    case 'media':
                        tctl.tabindex = tidx || 5;
                        break;
                    case 'feedback_failed_icon':
                    case 'feedback_passed_icon':
                        tctl.tabindex = tidx || -1;
                        break;
                    case 'feedback_correct':
                    case 'feedback_wrong':
                    case 'feedback_timeout':
                    case 'feedback_correct_popup':
                    case 'feedback_wrong_popup':
                    case 'feedback_timeout_popup':
                        tctl.tabindex = tidx || 16;
                        break;
                    case 'next_enabled':
                    case 'next_disabled':
                        // these controls are added and will be adapted in separate functions
                        break;
                    default:
                        tctl.tabindex = tidx || 50;
                        break;
                }

                // set image src correctly
                if (tctl.image && tctl.image.id) {
                    tctl.image.id = tctl.image.id.replace(/^slide:/, mac.template_id + ':');
                }
                if (tctl.image_mouseover && tctl.image_mouseover.id) {
                    tctl.image_mouseover.id = tctl.image_mouseover.id.replace(/^slide:/, mac.template_id + ':');
                }
                if (tctl.image_mousedown && tctl.image_mousedown.id) {
                    tctl.image_mousedown.id = tctl.image_mousedown.id.replace(/^slide:/, mac.template_id + ':');
                }
                if (tctl.text) {
                    tctl.text = tctl.text.replace(/src=\"slide:/, 'src=\"' + mac.template_id + ':');
                }

                id_map[org_id] = tctl.id;
                mct.push(tctl);
            }

            // remap triggers / targets
            for (var i = 0, l = mct.length; i < l; i++) {
                this.remap_trigger_and_targets_(mac, mct[i]);
            }

            // also remap quiz control (as its not in the list above)
            this.remap_trigger_and_targets_(mac, mac.ctl);
        },

        remap_trigger_and_targets_: function(mac, el) {
         // check all values for possible trigger to make things like animations of quiz elements possible
            var id_map = mac.template_map;
            for (var k in el) {
                if (typeof el[k] === 'string' && k.search(/^on|^target/) === 0) {
                    var act = el[k].split(';');
                    for (var j = 0, al = act.length; j < al; j++) {
                        var id = act[j].split('.')[0];
                        if (id_map[id]) act[j] = act[j].replace(id, id_map[id]);
                    }
                    el[k] = act.join(';');
                }
            }
        }
    },

    // ~~~~~~~~~~~~~~~ SKIN RELATED HANDLING ~~~~~~~~~~~~~~~~~~~~~~
    skin: {
        prepare_macro_: function(c, not_eval, mac) {
            // init positions and controls
            mac.positions = {};
            mac.controls = {};
            var pos = ['feedback_popup', 'feedback', 'feedback_icon', 'print', 'next',
                       'question', 'quiz_impl', 'mediaobject', 'timeout', 'g_timeout'];
            var con = ['top', 'content', 'bottom', 'frame', 'free'];
            for (var i = 0, l = pos.length; i < l; i++) mac.positions[pos[i]] = {};
            for (i = 0, l = con.length; i < l; i++) mac.controls[con[i]] = [];

            var s = mac.skin;
            var ctl = {
                type: 'page',
                id: 'page',
                is_quiz: not_eval,
                w: mac.quiz_w,
                h: mac.quiz_h,
                fontsizeInPt: false,
                version: '8.3.0.065',
                background_color: s.background_color || '',
                canvas_color: s.canvas_color || '',
                image: {id: '', w: 0, h: 0},
                z: c.internal.quiz_zindex++,
                onload: 'page.task_next'
            };
            this.apply_skin_image_to_ctl_(mac, ctl, s);
            this.apply_frame_from_skin_(c, mac);

            MacroHelper.AddControl(c, ctl);
        },

        get_media_objects_: function(c, mac, create_opener, m_type) {
            var p = mac.params;
            var obj_pos = mac.positions.mediaobject;
            var sk = mac.skin[obj_pos.pos].groups[obj_pos.group].elements[obj_pos.ind];
            var top_h = this.get_max_height_(mac.controls.top, mac.skin.top); // XXX determine if pos is really content!
            var is_image = false;
            var get_type = m_type;

            switch (m_type) {
                case 'audio':
                case 'video':
                    get_type += '_tag';
                    break;
                case 'image':
                    is_image = true;
                    create_opener = false;
                    break;
            }

            var media_ctl = this.get_ctl_(get_type, c, mac, sk);

            var mst = mac.lm_style[obj_pos.pos][obj_pos.ind];
            var qst = {};
            var mposq = mac.positions[(p.qm_as_question ? 'question' : 'quiz_impl')];
            qst = this.get_style_or_control_(mac, mposq, true);

            var open_play_ctl = null;
            var close_stop_ctl = null;
            if (media_ctl && create_opener) {
                open_play_ctl = this.get_ctl_('media_open_play', c, mac, sk);
                close_stop_ctl = this.get_ctl_('media_close_stop', c, mac, sk);
                var opx = mst.x;
                var opy = mst.y + top_h;
                var csx = mst.x;
                var csy = mst.y + top_h;
                switch (sk.align) {
                    case 'right':
                        opx = mst.x + (mst.w - open_play_ctl.w);
                        csx = mst.x + (mst.w - close_stop_ctl.w);
                        break;
                    case 'center':
                        opx = mst.x + ((mst.w >> 1)- (open_play_ctl.w >> 1));
                        csx = mst.x + ((mst.w >> 1) - (close_stop_ctl.w >> 1));
                        break;
                }
                open_play_ctl.x = opx;
                open_play_ctl.y = opy;
                close_stop_ctl.x = csx;
                close_stop_ctl.y = csy;
                media_ctl.x = qst.x;
                media_ctl.y = qst.y + top_h;
                media_ctl.w = qst.w;
                media_ctl.h = qst.h;
            } else if (media_ctl) {
                if (p.qm_as_question) mst = qst;
                media_ctl.x = mst.x;
                media_ctl.y = mst.y + top_h;
                media_ctl.w = mst.w;
                media_ctl.h = mst.h;
                if (is_image && p.qm_width) {
                    switch (sk.align) {
                        case 'right':
                            media_ctl.x = mst.x + (mst.w - p.qm_width);
                            break;
                        case 'center':
                            media_ctl.x = mst.x + ((mst.w >> 1)- (p.qm_width >> 1));
                            break;
                    }
                }
            }

            if (media_ctl) {
                if (p.qm_width) media_ctl.w = p.qm_width;
                if (p.qm_height) media_ctl.h = p.qm_height;
                if (p.qm_as_question) c.TaskSetAddStartEvent(p.uid, media_ctl.id + '.play');
            }
            return [media_ctl, open_play_ctl, close_stop_ctl];
        },

        apply_frame_from_skin_: function(c, mac) {
            var s = mac.skin.frame;
            if (!s) return;

            var con = mac.controls.frame;
            var p = mac.params;
            var ctl;

            if (s.nw) {
                ctl = this.create_sprite_ctl_(c, mac, p, 'nw', s.nw, 0, 0, s.w_w, s.n_h);
                ctl.tabindex = -1;
                this.apply_skin_image_to_ctl_(mac, ctl, s.nw);
                con.push(ctl);
            }

            if (s.n) {
                ctl = this.create_sprite_ctl_(c, mac, p, 'n', s.n, s.w_w, 0, mac.quiz_w - s.w_w - s.e_w, s.n_h);
                ctl.tabindex = -1;
                this.apply_skin_image_to_ctl_(mac, ctl, s.n);
                con.push(ctl);
            }

            if (s.ne) {
                ctl = this.create_sprite_ctl_(c, mac, p, 'ne', s.ne, mac.quiz_w - s.e_w, 0, s.e_w, s.n_h);
                ctl.tabindex = -1;
                this.apply_skin_image_to_ctl_(mac, ctl, s.ne);
                con.push(ctl);
            }

            if (s.w) {
                ctl = this.create_sprite_ctl_(c, mac, p, 'w', s.w, 0, s.n_h, s.w_w, mac.quiz_h - s.n_h - s.s_h);
                ctl.tabindex = -1;
                this.apply_skin_image_to_ctl_(mac, ctl, s.w);
                con.push(ctl);
            }

            if (s.e) {
                ctl = this.create_sprite_ctl_(c, mac, p, 'e', s.e, mac.quiz_w - s.e_w, s.n_h, s.e_w, mac.quiz_h - s.n_h - s.s_h);
                ctl.tabindex = -1;
                this.apply_skin_image_to_ctl_(mac, ctl, s.e);
                con.push(ctl);
            }

            if (s.sw) {
                ctl = this.create_sprite_ctl_(c, mac, p, 'sw', s.sw, 0, mac.quiz_h - s.s_h, s.w_w, s.s_h);
                ctl.tabindex = -1;
                this.apply_skin_image_to_ctl_(mac, ctl, s.sw);
                con.push(ctl);
            }

            if (s.s) {
                ctl = this.create_sprite_ctl_(c, mac, p, 's', s.s, s.w_w, mac.quiz_h - s.s_h, mac.quiz_w - s.w_w - s.e_w, s.s_h);
                ctl.tabindex = -1;
                this.apply_skin_image_to_ctl_(mac, ctl, s.s);
                con.push(ctl);
            }

            if (s.se) {
                ctl = this.create_sprite_ctl_(c, mac, p, 'se', s.se, mac.quiz_w - s.w_w, mac.quiz_h - s.s_h, s.e_w, s.s_h);
                ctl.tabindex = -1;
                this.apply_skin_image_to_ctl_(mac, ctl, s.se);
                con.push(ctl);
            }

            if (mac.skin.content) {
                ctl = this.create_sprite_ctl_(c, mac, p, 'content', mac.skin.content, s.e_w, s.n_h, mac.quiz_w - s.e_w - s.w_w, mac.quiz_h - s.n_h - s.s_h);
                ctl.tabindex = -1;
                this.apply_skin_image_to_ctl_(mac, ctl, mac.skin.content);
                con.push(ctl);
            }
        },

        get_style_or_control_: function(mac, o /*, style*/) {
            var idx = this.get_control_index_(mac, o);
            return mac[arguments[2] ? 'lm_style' : 'controls'][o.pos][idx];
        },

        create_sprite_ctl_: function(c, mac, params, sub_id, skin, x, y, w, h) {
            var r = skin.image && skin.image.repeat || '';

            return {
                type: 'sprite',
                id: params.uid + '_' + sub_id,
                name: sub_id,
                hidden: skin.hidden || 0,
                z: c.internal.quiz_zindex++,
                background_color: skin.background_color || 'transparent',
                offset_left: skin.image && skin.image.x || 0,
                offset_top: skin.image && skin.image.y || 0,
                repeat_x: r.search('x') != -1,
                repeat_y: r.search('y') != -1,
                x: x,
                y: y,
                w: w,
                h: h
            };
        },

        correct_hourglass_position_: function(mac) {
            // move hourglass animation slightly down
            // not possible over LM as this is a horizontal layout
            var process = ['timeout', 'g_timeout'];
            var mc = mac.controls;
            for (var i = 0; i < 2; i++) {
                var cur = process[i];
                if (mac['has_' + cur]) {
                    obj_pos = mac.positions[cur];
                    if (obj_pos && obj_pos.pos == 'bottom') {
                        var idx = this.get_control_index_(mac, obj_pos);
                        var y = mac.skin[obj_pos.pos].groups[obj_pos.group].elements[obj_pos.ind].y || 0;
                        mc.bottom[idx].y += y;
                    }
                }
            }
        },

        create_feedback_popup_: function(c, mac, text_p, text_f, text_t) {
            var p = mac.params;
            var obj_pos = mac.positions.feedback_popup;
            var ctl = this.get_style_or_control_(mac, obj_pos);
            var feedback_c = WCT.DeepCopy(ctl);
            var feedback_w = WCT.DeepCopy(ctl);
            var feedback_t = WCT.DeepCopy(ctl);
            feedback_c.hidden = 1;
            feedback_w.hidden = 1;
            feedback_t.hidden = 1;
            feedback_c.id =  p.uid + '_feedback_correct';
            feedback_w.id =  p.uid + '_feedback_wrong';
            feedback_t.id =  p.uid + '_feedback_timeout';
            feedback_c.text = '<table width="100%" height="100%"><tr><td>' + text_p + '</td></tr></table>';
            feedback_w.text = '<table width="100%" height="100%"><tr><td>' + text_f + '${quiz_correct_answers}</td></tr></table>';
            feedback_t.text = '<table width="100%" height="100%"><tr><td>' + text_t + '${quiz_correct_answers}</td></tr></table>';
            var show_action = p.uid + '_next_enabled.hide;' +
                p.uid + '_next_enabled_nocheck.show;';
            feedback_c.onpopupshow = show_action;
            feedback_w.onpopupshow = show_action;
            feedback_t.onpopupshow = show_action;
            var hide_action = 'page.task_next;';
            feedback_c.onpopuphide = hide_action;
            feedback_w.onpopuphide = hide_action;
            feedback_t.onpopuphide = hide_action;
            MacroHelper.AddControl(c, feedback_c, mac.task_set);
            MacroHelper.AddControl(c, feedback_w, mac.task_set);
            MacroHelper.AddControl(c, feedback_t, mac.task_set);
        },

        create_feedback_: function(c, mac) {
            var p = mac.params;
            var gp = c.global_params;
            var text_p = p['feedback_pass'] || gp['g_feedback_pass'] || '';
            var text_f = p['feedback_fail'] || gp['g_feedback_fail'] || '';
            var text_t = p['feedback_time'] || gp['g_feedback_time'] || '';

            if (mac.has_feedback_popup) {
                this.create_feedback_popup_(c, mac, text_p, text_f, text_t);
                return;
            }

            var show_action = p.uid + '_next_enabled.hide;' + p.uid + '_next_enabled_nocheck.show;';
            var obj_pos = mac.positions.feedback;
            var ctl = this.get_style_or_control_(mac, obj_pos);
            var skin_passed_icon = this.get_feedback_icon_(mac, 'passed');
            var skin_failed_icon = this.get_feedback_icon_(mac, 'failed');
            var pa = 'padding_' + (mac.is_rtl ? 'r' : 'l');
            var s = mac.skin[obj_pos.pos].groups[obj_pos.group].elements[obj_pos.ind];

            ctl.hidden = BROWSER.MOBILE;
            ctl.padding = 4;
            ctl.border_t = s.border_top_width || 0;
            ctl.border_color = s.border_top_color || '#000000';

            var feedback_c = WCT.DeepCopy(ctl);
            feedback_c.id = p.uid + '_feedback_correct';
            feedback_c.onshow = p.uid + '_feedback_passed_icon.show;' + show_action;
            feedback_c.text = text_p;
            feedback_c[pa] = skin_passed_icon.w;

            var feedback_w = WCT.DeepCopy(ctl);
            feedback_w.id = p.uid + '_feedback_wrong';
            feedback_w.onshow = p.uid + '_feedback_failed_icon.show;' + show_action;
            feedback_w.text = text_f + '${quiz_correct_answers}';
            feedback_w[pa] = skin_failed_icon.w;

            var feedback_t = WCT.DeepCopy(ctl);
            feedback_t.id = p.uid + '_feedback_timeout';
            feedback_t.onshow = feedback_w.onshow;
            feedback_t.text = text_t + '${quiz_correct_answers}';
            feedback_t[pa] = skin_failed_icon.w;

            var passed_icon = this.get_ctl_('feedback_passed_icon', c, mac, skin_passed_icon);
            passed_icon.x = feedback_c.x - passed_icon.w + (mac.is_rtl ? feedback_c.w : 0);
            passed_icon.y = feedback_c.y + (feedback_c.h >> 1) - (passed_icon.h >> 1);

            var failed_icon = this.get_ctl_('feedback_failed_icon', c, mac, skin_failed_icon);
            failed_icon.x = feedback_c.x - passed_icon.w + (mac.is_rtl ? feedback_c.w : 0);
            failed_icon.y = feedback_c.y + (feedback_c.h >> 1) - (passed_icon.h >> 1);

            // add controls and correct / wrong icons
            MacroHelper.AddControl(c, feedback_c, mac.task_set);
            MacroHelper.AddControl(c, feedback_w, mac.task_set);
            MacroHelper.AddControl(c, feedback_t, mac.task_set);
            MacroHelper.AddControl(c, passed_icon, mac.task_set);
            MacroHelper.AddControl(c, failed_icon, mac.task_set);
        },

        handle_eval_feedback_icon_: function(c, mac) {
            var skin_passed_icon = this.get_feedback_icon_(mac, 'passed');
            var skin_failed_icon = this.get_feedback_icon_(mac, 'failed');
            mac.ctl.feedback.fail_icon = this.get_ctl_('feedback_failed_icon', c, mac, skin_failed_icon);
            mac.ctl.feedback.pass_icon = this.get_ctl_('feedback_passed_icon', c, mac, skin_passed_icon);
        },

        get_feedback_icon_: function(mac, type) {
            var pos = mac.positions.feedback;
            var obj = mac.skin[pos.pos];
            var grp = obj && obj.groups[pos.group];
            var el = grp && grp.elements[pos.ind];
            return el && el[type + '_icon'] || {image: {id: ''}, w: 0, h: 0};
        },

        get_next_buttons_: function(c, mac) {
            var obj_pos = mac.positions.next;
            var ctl = this.get_style_or_control_(mac, obj_pos);
            var skin = mac.skin[obj_pos.pos].groups[obj_pos.group].elements[obj_pos.ind];

            var next_enabled = {};
            var next_enabled_nocheck = {};
            var next_disabled = {};

            // next button - enabled
            next_enabled = WCT.DeepCopy(ctl);
            next_enabled.image.id =  mac.skin_addr + ':' + skin.image.id;
            next_enabled.offset_left = skin.image.x;
            next_enabled.offset_top = skin.image.y;

            // next button - enabled - not checking quiz
            next_enabled_nocheck = WCT.DeepCopy(next_enabled);

            // next button - disabled
            next_disabled = WCT.DeepCopy(next_enabled);
            next_disabled.image.id =  mac.skin_addr + ':' + skin.image_d.id;
            next_disabled.offset_left = skin.image_d.x;
            next_disabled.offset_top = skin.image_d.y;
            next_disabled.onclick = '';  // remove previously set values from next_enabled button

            return [next_enabled, next_enabled_nocheck, next_disabled];
        },

        get_control_index_: function(mac, o) {
            var grps = mac.skin[o.pos].groups;
            var idx = o.ind;

            for (var cnt = o.group - 1; cnt >= 0; cnt--) {
                idx += grps[cnt].elements.length;
            }

            return idx;
        },

        apply_skin_positions_: function(c, mac) {
            var s = mac.skin;
            if (!s) return;

            var mc = mac.controls;
            var qw = mac.quiz_w;
            var qh = mac.quiz_h;
            var top_h = this.get_max_height_(mc.top, mac.skin.top);
            var bottom_h = this.get_max_height_(mc.bottom, mac.skin.bottom);
            var center_h = qh - top_h - bottom_h;
            var lm_style = {
                top: [],
                content: [],
                bottom: [],
                free: []
            };
            mac.lm_style = lm_style;
            // layout manager
            // DPS-21879; layout manager will not be destructed, obfuscation renames Destructor function
            // into something else. minimization of code in this case more important than cleanup
            // of two small objects (that can most likely be cleaned by garbage collector automatically)
            var lm = new LayoutManager();
            lm.FromPanelSkin(s.top.groups, 'hor');
            lm_style.top = lm.Apply(qw, top_h);
            if (mac.has_media_as_question) {
                var p = mac.params;
                var mw = p.qm_width;
                var mh = p.qm_height;
                if (typeof mw != 'undefined' || typeof mh != 'undefined') {
                    obj_pos = mac.positions.question;
                    if (obj_pos.pos == 'content') {
                        var st = s[obj_pos.pos].groups[obj_pos.group].elements[obj_pos.ind];
                        if (st && mw) st.w = mw;
                        if (st && mh) st.h = mh;
                    }
                }
            }
            lm.FromPanelSkin(s.content.groups, 'vert');
            var obj_pos = {};
            if (!mac.has_media) {
                obj_pos = mac.positions.mediaobject;
                if (obj_pos.pos == 'content') {
                    var midx = this.get_control_index_(mac, obj_pos);
                    lm.Visible(midx, false);
                }
            }
            if (!mac.has_question && !mac.has_media) {
                obj_pos = mac.positions.question;
                if (obj_pos.pos == 'content') {
                    var qidx = this.get_control_index_(mac, obj_pos);
                    lm.Visible(qidx, false);
                }
            }
            if (!mac.has_feedback) {
                obj_pos = mac.positions.feedback;
                if (obj_pos.pos == 'content') {
                    var fidx = this.get_control_index_(mac, obj_pos);
                    lm.Visible(fidx, false);
                }
            }
            lm_style.content = lm.Apply(qw, center_h);
            if (!mac.has_media) {
                obj_pos = mac.positions.question;
                if (obj_pos.pos == 'content') {
                    // no media set, question width can be as big as quiz width
                    var idx = this.get_control_index_(mac, mac.positions.question);
                    lm_style.content[idx].w = this.get_style_or_control_(mac, mac.positions.quiz_impl, true).w;
                }
            }
            lm.FromPanelSkin(s.free.groups, 'hor');
            lm_style.free = lm.Apply(qw, qh);
            if (mac.has_feedback_popup) {
                obj_pos = mac.positions.feedback_popup;
                if (obj_pos.pos == 'free') {
                    var idx = this.get_control_index_(mac, mac.positions.feedback_popup);
                    mc.free[idx].textBoxW = lm_style.free[idx].w;
                    mc.free[idx].textBoxH = lm_style.free[idx].h;
                    mc.free[idx].textBoxX = (mac.skin.w - lm_style.free[idx].w) >> 1;
                    mc.free[idx].textBoxY = (mac.skin.h - lm_style.free[idx].h) >> 1;
                }
            }
            if (mac.is_rtl) MacroHelper.ReverseQuizOrder(c, mac, 'bottom');
            lm.FromPanelSkin(s.bottom.groups, 'hor');
            lm_style.bottom = lm.Apply(qw, bottom_h);
            this.apply_positions_(mc, lm_style, s, top_h, center_h);
            // done layoutmanager
        },

        apply_positions_: function (controls, positions, skin, top_h, content_h) {
            for (var a in positions) {
                var ctls = controls[a];
                if (!ctls) continue;

                var y = 0;
                if (a == 'content') {
                    y = top_h;
                } else if (a == 'bottom') {
                    y = top_h + content_h;
                }

                var pos = positions[a];
                for (var i = 0, l = ctls.length; i < l; i++) {
                    ctls[i].x = pos[i].x;
                    ctls[i].y = pos[i].y + y;
                    ctls[i].w = pos[i].w;
                    ctls[i].h = pos[i].h;
                }
            }
        },

        get_max_height_: function(controls, skin) {
            var max = [];
            for (var i = controls.length - 1; i >= 0; i--) {
                max.push(controls[i].h || 0);
            }
            max = Math.max.apply(null, max);

            var ts = [];
            var bs = [];
            for (var i = 0, grp = null; grp = skin.groups[i++];) {
                ts.push(grp.outer_spacing_t || 0);
                bs.push(grp.outer_spacing_b || 0);
            }
            ts = Math.max.apply(null, ts);
            bs = Math.max.apply(null, bs);

            return max + ts + bs;
        },

        create_controls_: function(c, mac) {
            var map = {
                points: true,
                quiznumber: true
            };

            var ctls = mac.controls;
            for (var p in ctls) {
                if (p === 'frame') continue;

                var mc = ctls[p];
                var skin_groups = mac.skin[p].groups;
                var gl = skin_groups.length - 1;

                for (var k = 0; k <= gl; k++) {
                    var skin = skin_groups[k].elements;
                    var l = skin.length - 1;

                    for (var i = 0; i <= l; i++) {
                        var s = skin[i];
                        var elem = this.get_ctl_(s.type, c, mac, s);

                        if (mac.is_eval && map[s.type]) elem.hidden = true;
                        mc.push(elem);

                        for (var a in mac.positions) {
                            if (s.type != a) continue;

                            mac.positions[s.type] = {
                                pos: p,
                                group: k,
                                ind: i
                            };
                        }
                    }
                }
            }
        },

        apply_skin_to_ctl_: function(mac, ctl, skin) {
            // slide control params
            var style = ['font_family', 'font_size', 'text_color', 'background_color', 'repeat_x', 'repeat_y', 'padding', 'border', 'align', 'w', 'h'];
            for (var i = 0, s = null; s = style[i++];) {
                if (typeof skin[s] != 'undefined') ctl[s] = skin[s];
            }

            // specials
            if (skin.font_weight == 'bold') ctl.bold = 1;
            if (skin.font_style == 'italic') ctl.italic = 1;
            if (skin.text_decoration == 'underline') ctl.underline = 1;
        },

        apply_skin_image_to_ctl_: function(mac, ctl, skin) {
            var img = skin.image;
            if (img && typeof img.id != 'undefined') {
                if (img.id == '') {
                    ctl.image = undefined;
                } else {
                    ctl.image = {id: mac.skin_addr + ':' + img.id};
                }
            }

            if (skin.background_color) {
                ctl.background_color = skin.background_color;
            }
        },

            get_ctl_: function(type, c, mac, skin) {
            var p = mac.params;
            var ctl = {};

            switch (type) {
                case 'title':
                    ctl = {
                        type: 'text',
                        id: p.uid + '_quiz_title',
                        border: 0,
                        padding: 0,
                        hidden: 0,
                        tabindex: 1,
                        hide_scrollbars: 1,
                        text: WCT.CleanupHTMLString(p.title),
                        z: c.internal.quiz_zindex++
                    };
                    break;
                case 'logo':
                    ctl = {
                        type: 'sprite',
                        id: p.uid + '_logo',
                        z: c.internal.quiz_zindex++,
                        tabindex: -1,
                        offset_left: skin.image.x,
                        offset_top: skin.image.y
                    };
                    break;
                case 'question':
                    ctl = {
                        type: 'text',
                        id: p.uid + '_quiz_question',
                        border: 0,
                        hide_scrollbars: (skin.overflow && skin.overflow == 'hidden'),
                        padding: 0,
                        tabindex: 2,
                        hidden: mac.has_media_as_question,
                        text: p.question,
                        z: c.internal.quiz_zindex++
                    };
                    break;
                case 'points':
                    ctl = {
                        type: 'text',
                        id: p.uid + '_points',
                        text: '${quiz_cur_score} / ${quiz_max_score}',
                        valign: 'middle',
                        tabindex: 40,
                        hide_scrollbars: 1,
                        padding: 0,
                        z: c.internal.quiz_zindex++
                    };
                    break;
                case 'g_countdown':
                    ctl = {
                        type: 'text',
                        id: p.uid + '_g_countdown',
                        text: '',
                        valign: 'middle',
                        tabindex: 3,
                        hide_scrollbars: 1,
                        padding: 0,
                        z: c.internal.quiz_zindex++
                    };
                    break;
                case 'g_timeout':
                    ctl = {
                        type: 'sprite',
                        id: p.uid + '_g_hourglass',
                        hidden: !mac.has_g_timeout,
                        tabindex: -1,
                        z: c.internal.quiz_zindex++,
                        offset_left: skin.image.x,
                        offset_top: skin.image.y
                    };
                    break;
                case 'countdown':
                    ctl = {
                        type: 'text',
                        id: p.uid + '_countdown',
                        text: '',
                        valign: 'middle',
                        tabindex: 3,
                        hide_scrollbars: 1,
                        padding: 0,
                        z: c.internal.quiz_zindex++
                    };
                    break;
                case 'timeout':
                    ctl = {
                        type: 'sprite',
                        id: p.uid + '_hourglass',
                        hidden: !mac.has_timeout,
                        tabindex: -1,
                        z: c.internal.quiz_zindex++,
                        offset_left: skin.image.x,
                        offset_top: skin.image.y
                    };
                    break;
                case 'feedback':
                    ctl = {
                        type: 'text',
                        name: 'feedback',
                        hidden: 1,
                        bordercolor: skin.border_color,
                        border: skin.border_width,
                        padding: skin.padding || 0,
                        z: c.internal.quiz_zindex++
                    };
                    if (skin.align) ctl.align = skin.align;
                    if (skin.valign) ctl.valign = skin.valign;
                    break;
                case 'feedback_popup':
                    ctl = {
                        type: 'link_textBoxIcon',
                        name: 'feedback_correct',
                        hidden: 1,
                        fadeing: 1,
                        bordercolor: skin.border_color,
                        border: skin.border_width,
                        padding: skin.padding || 0,
                        z: c.internal.quiz_zindex++
                    };
                    if (skin.align) ctl.align = skin.align;
                    if (skin.valign) ctl.valign = skin.valign;
                    break;
                case 'feedback_passed_icon':
                    ctl = {
                        type: 'sprite',
                        id: p.uid + '_feedback_passed_icon',
                        hidden: 1,
                        tabindex: -1,
                        z: c.internal.quiz_zindex++,
                        offset_left: skin.image.x,
                        offset_top: skin.image.y,
                        w: skin.w,
                        h: skin.h
                    };
                    break;
                case 'feedback_failed_icon':
                    ctl = {
                        type: 'sprite',
                        id: p.uid + '_feedback_failed_icon',
                        hidden: 1,
                        tabindex: -1,
                        z: c.internal.quiz_zindex++,
                        offset_left: skin.image.x,
                        offset_top: skin.image.y,
                        w: skin.w,
                        h: skin.h
                    };
                    break;
                case 'quiznumber':
                    ctl = {
                        type: 'text',
                        id: p.uid + '_number',
                        text: '<p>' + (c.internal.quiz_number[mac.ctl.id]) + '</p>', // xxx
                        valign: 'middle',
                        tabindex: -1,
                        hide_scrollbars: 1,
                        padding: 0,
                        align:  skin.align,
                        z: c.internal.quiz_zindex++
                    };
                    if (!mac.is_eval) c.internal.quiz_counter++;
                    break;
                case 'hourglass':
                    ctl = {
                        type: 'sprite',
                        id: p.uid + '_hourglass',
                        hidden: false,
                        tabindex: -1,
                        z: c.internal.quiz_zindex++,
                        offset_left: skin.image.x,
                        offset_top: skin.image.y
                    };
                    break;
                case 'g_hourglass':
                    ctl = {
                        type: 'sprite',
                        id: p.uid + '_g_hourglass',
                        hidden: false,
                        tabindex: -1,
                        z: c.internal.quiz_zindex++,
                        offset_left: skin.image.x,
                        offset_top: skin.image.y
                    };
                    break;
                case 'print':
                    ctl = {
                        type: 'sprite',
                        id: p.uid + '_print',
                        hidden: !mac.is_eval,
                        tabindex: 40,
                        z: c.internal.quiz_zindex++,
                        onclick: p.uid + '.print',
                        offset_left: skin.image.x,
                        offset_top: skin.image.y
                    };
                    break;
                case 'next':
                    ctl = {
                        type: 'sprite',
                        z: c.internal.quiz_zindex++
                    };
                    break;
                case 'quiz_impl':
                    ctl = mac.ctl;
                    // store quiz.txt skin data in quiz control to be able to use it in slide engine
                    ctl.skin_data = skin.form_styles;
                    break;
                case 'mediaobject':
                    ctl = {
                        type: 'wmp',
                        id: p.uid + '_wma',
                        z: c.internal.quiz_zindex++,
                        tabindex: 5
                    };
                    break;
                case 'audio':
                    ctl = {
                        type: 'wmp',
                        id: p.uid + '_wma',
                        name: 'quiz media',
                        showControls: 1,
                        showStatusBar: 0,
                        playonstart: p.qm_as_question || 0,
                        loop: 0,
                        hidden: false,
                        tabindex: 5,
                        z: c.internal.quiz_zindex++
                    };
                    break;
                case 'audio_tag':
                    ctl = {
                        type: 'audio',
                        id: p.uid + '_audio',
                        name: 'quiz media',
                        showControls: 1,
                        showStatusBar: 0,
                        playonstart: p.qm_as_question || 0,
                        loop: 0,
                        hidden: false,
                        tabindex: 5,
                        z: c.internal.quiz_zindex++
                    };
                    break;
                case 'video_tag':
                    ctl = {
                        type: 'video',
                        id: p.uid + '_video',
                        name: 'quiz media',
                        showControls: 1,
                        showStatusBar: 0,
                        playonstart: p.qm_as_question || 0,
                        loop: 0,
                        hidden: false,
                        tabindex: 5,
                        z: c.internal.quiz_zindex++
                    };
                    break;
                case 'image':
                    ctl = {
                        type: 'image',
                        id: p.uid + '_qm',
                        name: 'quiz media',
                        image: {id: p.qm_file},
                        tabindex: 5,
                        keep_aspect: 1,
                        zoomable: 1,
                        z: c.internal.quiz_zindex++
                    };
                    break;
                case 'flash':
                    ctl = {
                        type: 'flash',
                        id: p.uid + '_swf',
                        name: 'quiz media',
                        src: p.qm_file,
                        wmode: 'transparent',
                        playonstart: 1,
                        loop: 1,
                        hidden: !p.qm_as_question,
                        tabindex: 5,
                        z: c.internal.quiz_zindex++
                    };
                    break;
                case 'wmp':
                    ctl = {
                        type: 'wmp',
                        id: p.uid + '_wmv',
                        name: 'quiz media',
                        src: p.qm_file,
                        showControls: 1,
                        showStatusBar: 0,
                        playonstart: 1,
                        loop: 0,
                        hidden: !p.qm_as_question,
                        tabindex: 5,
                        z: c.internal.quiz_zindex++
                    };
                    break;
                case 'quicktime':
                    ctl = {
                        type: 'quicktime',
                        id: p.uid + '_mov',
                        name: 'quiz media',
                        src: p.qm_file,
                        scale: 'Aspect',
                        controls: 1,
                        playonstart: 1,
                        loop: 0,
                        hidden: !p.qm_as_question,
                        tabindex: 5,
                        z: c.internal.quiz_zindex++
                    };
                    break;
                case 'media_close_stop':
                    ctl = {
                        type: 'sprite',
                        id: p.uid + '_media_close_stop',
                        name: 'quiz media',
                        hidden: true,
                        tabindex: 6,
                        z: c.internal.quiz_zindex++,
                        offset_left: skin.logo_stop.image.x,
                        offset_top: skin.logo_stop.image.y,
                        w: skin.logo_stop.w,
                        h: skin.logo_stop.h
                    };
                    break;
                case 'media_open_play':
                    ctl = {
                        type: 'sprite',
                        id: p.uid + '_media_open_play',
                        name: 'quiz media',
                        hidden: false,
                        tabindex: 4,
                        z: c.internal.quiz_zindex++,
                        offset_left: skin.logo_play.image.x,
                        offset_top: skin.logo_play.image.y,
                        w: skin.logo_play.w,
                        h: skin.logo_play.h
                    };
                    break;
                default:
                    alert('not implemented: ' + type);
                    break;
            }

            ctl.name = ctl.name || type;
            this.apply_skin_to_ctl_(mac, ctl, skin);

            if (ctl.type == 'sprite') {
                var sparam = (skin.logo_play ? skin.logo_play : (skin.logo_stop ? skin.logo_stop : skin));
                this.apply_skin_image_to_ctl_(mac, ctl, sparam);
                ctl.w = sparam.w;
                ctl.h = sparam.h;
            }
            return ctl;
        }
    },

    // Quizzes
    MultipleChoice: function (c, params) {
        // DPS-58977 - removed cleanup as trainer is taking care of that
        // this.cleanup_html_fields_(params, {'answer': 8});
        MacroDefaultsHandler.PrepareMacro(c, 'mchoice', params);
        var ctl = {
            type: 'mchoice',
            id: params.uid,
            answer_1: params.answer_1,
            answer_1_correct: params.answer_1_correct,
            answer_2: params.answer_2,
            answer_2_correct: params.answer_2_correct,
            answer_3: params.answer_3,
            answer_3_correct: params.answer_3_correct,
            answer_4: params.answer_4,
            answer_4_correct: params.answer_4_correct,
            answer_5: params.answer_5,
            answer_5_correct: params.answer_5_correct,
            answer_6: params.answer_6,
            answer_6_correct: params.answer_6_correct,
            answer_7: params.answer_7,
            answer_7_correct: params.answer_7_correct,
            answer_8: params.answer_8,
            answer_8_correct: params.answer_8_correct,
            points: params.points,
            shuffle_solutions: params.shuffle_solutions,
            force_multiple_choice: params.force_multiple_choice,
            opacity: 100,
            tabindex: 10
        };
        var mac = {ctl: ctl, params: params};
        this.prepare_macro_(c, 'mchoice', mac);
        this.finalize_macro_(c, mac, params);
    },
    Puzzle: function (c, params) {
        MacroDefaultsHandler.PrepareMacro(c, 'puzzlequiz', params);
        var ctl = {
            type: 'puzzlequiz',
            id: params.uid,
            background: 'transparent',
            hidden: false,
            font_family: 'Arial',
            font_size: '12',
            text_color: '#000000',
            background_color: 'transparent',
            border: 0,
            border_color: '#666666',
            padding: 0,
            quiz_type: params.quiz_type,
            image: { id: params.qm_file },
            qp_pieces_x: params.qp_pieces_x,
            qp_pieces_y: params.qp_pieces_y,
            points: params.points,
            opacity: 100,
            tabindex: 10
        };
        var mac = {ctl: ctl, params: params};
        this.prepare_macro_(c, 'puzzlequiz', mac);
        this.finalize_macro_(c, mac, params);
    },
    FillInTheBlanks: function(c, params) {
        this.cleanup_html_fields_(params, {'answer': 8});

        MacroDefaultsHandler.PrepareMacro(c, 'fibquiz', params);
        var ctl = {
            type: 'fibquiz',
            id: params.uid,
            text: params.fibtext,
            answer_1: params.answer_1,
            answer_2: params.answer_2,
            answer_3: params.answer_3,
            answer_4: params.answer_4,
            answer_5: params.answer_5,
            answer_6: params.answer_6,
            answer_7: params.answer_7,
            answer_8: params.answer_8,
            quiz_type: params.quiz_type,
            one_for_all: params.one_for_all,
            points: params.points,
            shuffle_solutions: params.shuffle_solutions,
            opacity: 100,
            tabindex: 10
        };
        var mac = {ctl: ctl, params: params};
        this.prepare_macro_(c, 'fibquiz', mac);
        this.finalize_macro_(c, mac, params);
    },
    SingleQuestionMultipleAnswers: function (c, params) {
        this.cleanup_html_fields_(params, {'answer': 8});

        MacroDefaultsHandler.PrepareMacro(c, 'sqmaquiz', params);
        var ctl = {
            type: 'sqmaquiz',
            id: params.uid,
            question: params.question,
            answer_1: params.answer_1,
            answer_1_correct: params.answer_1_correct,
            answer_2: params.answer_2,
            answer_2_correct: params.answer_2_correct,
            answer_3: params.answer_3,
            answer_3_correct: params.answer_3_correct,
            answer_4: params.answer_4,
            answer_4_correct: params.answer_4_correct,
            answer_5: params.answer_5,
            answer_5_correct: params.answer_5_correct,
            answer_6: params.answer_6,
            answer_6_correct: params.answer_6_correct,
            answer_7: params.answer_7,
            answer_7_correct: params.answer_7_correct,
            answer_8: params.answer_8,
            answer_8_correct: params.answer_8_correct,
            answer_type: params.answer_type,
            points: params.points,
            shuffle_solutions: params.shuffle_solutions,
            opacity: 100,
            tabindex: 10
        };
        var mac = {ctl: ctl, params: params};
        this.prepare_macro_(c, 'sqmaquiz', mac);
        this.finalize_macro_(c, mac, params);
    },
    Grid: function (c, params) {
        // DPS-58977 - removed cleanup as trainer is taking care of that
        // this.cleanup_html_fields_(params, {'question': 8, 'grid_list': 0});

        MacroDefaultsHandler.PrepareMacro(c, 'gridquiz', params);
        var ctl = {
            type: 'gridquiz',
            id: params.uid,
            grid_list: params.grid_list,
            question_1: params.question_1,
            answer_1: params.answer_1,
            question_2: params.question_2,
            answer_2: params.answer_2,
            question_3: params.question_3,
            answer_3: params.answer_3,
            question_4: params.question_4,
            answer_4: params.answer_4,
            question_5: params.question_5,
            answer_5: params.answer_5,
            question_6: params.question_6,
            answer_6: params.answer_6,
            question_7: params.question_7,
            answer_7: params.answer_7,
            question_8: params.question_8,
            answer_8: params.answer_8,
            points: params.points,
            shuffle_solutions: params.shuffle_solutions,
            opacity: 100,
            tabindex: 10
        };
        var mac = {ctl: ctl, params: params};
        this.prepare_macro_(c, 'gridquiz', mac);
        this.finalize_macro_(c, mac, params);
    },
    Match: function (c, params) {
        MacroDefaultsHandler.PrepareMacro(c, 'matchquiz', params);
        params.question = params.matchquestion;
        var ctl = {
            type: 'matchquiz',
            id: params.uid,
            question: params.matchquestion,
            question_1: params.question_1,
            answer_1: params.answer_1,
            question_2: params.question_2,
            answer_2: params.answer_2,
            question_3: params.question_3,
            answer_3: params.answer_3,
            question_4: params.question_4,
            answer_4: params.answer_4,
            question_5: params.question_5,
            answer_5: params.answer_5,
            question_6: params.question_6,
            answer_6: params.answer_6,
            question_7: params.question_7,
            answer_7: params.answer_7,
            question_8: params.question_8,
            answer_8: params.answer_8,
            quiz_type: params.quiz_type,
            points: params.points,
            shuffle_solutions: params.shuffle_solutions,
            opacity: 100,
            tabindex: 10
        };
        var mac = {ctl: ctl, params: params};
        this.prepare_macro_(c, 'matchquiz', mac);
        this.finalize_macro_(c, mac, params);
    },
    Connection: function (c, params) {
        MacroDefaultsHandler.PrepareMacro(c, 'connquiz', params);
        params.question = params.connquestion;
        var ctl = {
            type: 'connquiz',
            id: params.uid,
            question_1: params.question_1,
            answer_1: params.answer_1,
            question_2: params.question_2,
            answer_2: params.answer_2,
            question_3: params.question_3,
            answer_3: params.answer_3,
            question_4: params.question_4,
            answer_4: params.answer_4,
            question_5: params.question_5,
            answer_5: params.answer_5,
            question_6: params.question_6,
            answer_6: params.answer_6,
            question_7: params.question_7,
            answer_7: params.answer_7,
            question_8: params.question_8,
            answer_8: params.answer_8,
            points: params.points,
            shuffle_solutions: params.shuffle_solutions,
            opacity: 100,
            tabindex: 10
        };
        var mac = {ctl: ctl, params: params};
        this.prepare_macro_(c, 'connquiz', mac);
        this.finalize_macro_(c, mac, params);
    },
    Sort: function (c, params) {
        // DPS-58977 - removed cleanup as trainer is taking care of that
        // this.cleanup_html_fields_(params, {'answer': 8});

        MacroDefaultsHandler.PrepareMacro(c, 'mixquiz', params);
        var ctl = {
            type: 'mixquiz',
            id: params.uid,
            answer_1: params.answer_1,
            answer_2: params.answer_2,
            answer_3: params.answer_3,
            answer_4: params.answer_4,
            answer_5: params.answer_5,
            answer_6: params.answer_6,
            answer_7: params.answer_7,
            answer_8: params.answer_8,
            quiz_type : params.quiz_type,
            quiz_alignment : params.quiz_alignment,
            points: params.points,
            opacity: 100,
            tabindex: 10
        };
        var mac = {ctl: ctl, params: params};
        this.prepare_macro_(c, 'mixquiz', mac);
        this.finalize_macro_(c, mac, params);
    },
    Scale: function (c, params) {
        MacroDefaultsHandler.PrepareMacro(c, 'scalequiz', params);
        var ctl = {
            type: 'scalequiz',
            id: params.uid,
            range: params.range,
            answer: params.answer,
            points: params.points,
            opacity: 100,
            tabindex: 10
        };
        var mac = {ctl: ctl, params: params};
        this.prepare_macro_(c, 'scalequiz', mac);
        this.finalize_macro_(c, mac, params);
    },
    HotSpot: function (c, params) {
        MacroDefaultsHandler.PrepareMacro(c, 'hotspotquiz', params);
        var ctl = {
            type: 'hotspotquiz',
            id: params.uid,
            background: 'transparent',
            hidden: false,
            background_color: 'transparent',
            border: 0,
            border_color: '#666666',
            image: { id: params.hs_image },
            hotspot_x: params.selection_rect.left,
            hotspot_y: params.selection_rect.top,
            hotspot_w: params.selection_rect.width,
            hotspot_h: params.selection_rect.height,
            points: params.points,
            opacity: 100,
            tabindex: 10
        };
        var mac = {ctl: ctl, params: params};
        this.prepare_macro_(c, 'hotspotquiz', mac);
        this.finalize_macro_(c, mac, params);
    },
    Evaluation: function(c, params) {
        MacroDefaultsHandler.PrepareMacro(c, 'quiz_eval', params);
        params.title = params.proj_title;
        params.question = '';
        params.feedback = '';
        var feedback = {
            enable: params.feedback_enable,
            fail: params.feedback_fail,
            pass: params.feedback_pass
        };
        var req_percent = params.quiz_threshold;
        if (req_percent != null) {
            req_percent = parseInt(req_percent);
            req_percent = isNaN(req_percent) ? null : Math.max(0, Math.min(req_percent, 100));
        }
        params.quiz_threshold = req_percent;
        var ctl = {
            type: 'quiz_eval',
            id: params.uid,
            req_percent: params.quiz_threshold,
            eval_type: params.eval_type,
            track_completion: params.track_completion,  // DPS-39907
            border: 0,
            padding: 0,
            opacity: 100,
            feedback: feedback
        };
        var mac = {ctl: ctl, params: params};
        this.prepare_macro_(c, 'quiz_eval', mac);
        var t = params.uid + '_next_disabled.hide;' + params.uid + '_next_enabled.show';
        c.TaskSetAddStartEvent(mac.task_set, t);
        this.finalize_macro_(c, mac, params);
    }
};

MacroRenderer.mchoice = function (c, p) {MacroRenderer.Quiz.MultipleChoice(c, p)};
MacroRenderer.puzzlequiz = function (c, p) {MacroRenderer.Quiz.Puzzle(c, p)};
MacroRenderer.fibquiz = function (c, p) {MacroRenderer.Quiz.FillInTheBlanks(c, p)};
MacroRenderer.sqmaquiz = function (c, p) {MacroRenderer.Quiz.SingleQuestionMultipleAnswers(c, p)};
MacroRenderer.gridquiz = function (c, p) {MacroRenderer.Quiz.Grid(c, p)};
MacroRenderer.matchquiz = function (c, p) {MacroRenderer.Quiz.Match(c, p)};
MacroRenderer.connquiz = function (c, p) {MacroRenderer.Quiz.Connection(c, p)};
MacroRenderer.mixquiz = function (c, p) {MacroRenderer.Quiz.Sort(c, p)};
MacroRenderer.scalequiz = function (c, p) {MacroRenderer.Quiz.Scale(c, p)};
MacroRenderer.hotspotquiz = function (c, p) {MacroRenderer.Quiz.HotSpot(c, p)};
MacroRenderer.quiz_eval = function (c, p) {MacroRenderer.Quiz.Evaluation(c, p)};