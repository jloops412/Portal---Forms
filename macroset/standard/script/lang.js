#use(macroset!standard:script/config.js)


var lang_map = {};

var lang_tbl = null;
var lang_tbl_cur = '';


function fix_lang_item(it) {
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

function fix_lang_tbl() {
    var it;
    for (it in lang_tbl) {
        lang_tbl[it] = fix_lang_item(lang_tbl[it]);
    }
}

var def_lang = "en-US";


function select_project_language(prj_arg) {
    var prj = prj_arg ? prj_arg : Project;
    var prj_lang = prj.Language;
    if (!prj_lang) {
        log("Use default language:" + def_lang);
        prj_lang = def_lang;
    } else {
        log("Project language:" + prj_lang);
        def_lang = prj_lang;
    }
    load_language(prj_lang);

    return true;
}

function load_language(lang_id) {
    log("load_language");
    if (lang_tbl_cur != lang_id) {
        lang_tbl = LoadDictAsObjectMap(lang_id, "standard");
        if (lang_tbl == null) {
            log("Language Table not loaded");
        }

        lang_tbl_cur = lang_id;
        fix_lang_tbl();
    }
}

function load_project_language(prj_arg) {
	var prj = prj_arg ? prj_arg : Project;
    if (!prj) return false;

    if (lang_tbl_cur != prj.Language) {
        lang_tbl = ObjectMapFromCSV(prj.GetWAProject());
        if (lang_tbl == null) {
            log("Language Table not loaded");
        }

        lang_tbl_cur = prj.Language;
        fix_lang_tbl();
    }
    return true;
}

function load_project_dictionary(prj_arg) {
	var prj = prj_arg ? prj_arg : Project;
    if (!prj) prj = Project;
    if (!prj) return false;

    var ok = true;
    lang_tbl = prj.LoadDictionary();
    if (lang_tbl == null) {
        log("Language Table not loaded");
        return false;
    }

    lang_tbl_cur = prj.Language;
    fix_lang_tbl();

    return ok;
}

function set_project_language() {
    var cfgdlg = CreateDialog();
    cfgdlg.SetCaption(Translate('capRecordSettings'));

    cfgdlg.AddParam("rec_lang", ParamType_LANGUAGE, Translate('paramReRecordLanguage'));
    cfgdlg.SetParam("rec_lang", Project.Language);

    if (cfgdlg.Show()) {
        Project.Language = cfgdlg.GetParam("rec_lang");
        WriteStringSetting("record_language", Project.Language);
        return true;
    }

    return false;
}

function prj_trans(name, prj_arg) {
	var prj = prj_arg ? prj_arg : Project;
    select_project_language(prj);

    if (typeof(lang_tbl[name]) == 'string') {
        return lang_tbl[name];
    } else {
        return "[" + name + "]";
    }
}

function general_trans(word_to_trans, lang_arg) {
	var lang_id = lang_arg ? lang_arg : def_lang;

	load_language(lang_id);

	if (typeof(lang_tbl[word_to_trans]) == 'string') {
        return lang_tbl[word_to_trans];
    } else {
        return "[" + word_to_trans + "]";
    }
}

function load_dictionary_sim_to_navi() {
    if (!Project) return;
    lang_tbl = ObjectMapFromCSV(Project.GetWAProject());
    if (lang_tbl == null) {
        log("Language Table not loaded");
    }

    lang_tbl_cur = Project.Language;
    fix_lang_tbl();
}