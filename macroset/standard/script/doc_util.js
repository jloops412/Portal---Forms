
var num_events = 0;

function check_doc_template(config_string, msgboxCaptionKey) {
    var dot = config_string;
    if (!dot || (!FileExists(dot) && !FileExists(WA.ResolvePath(config_string)))) {
        return MsgBox(dot + ' ' + Translate('msgFNFContinueAnyway'),
                      Translate(msgboxCaptionKey),
                      MB_QUESTION | MB_YESNO) == IDYES;
    }
    return true;
};

function doc_quizzes_check(macro, max_answers, label, shuffle) {
    if (typeof(shuffle) == 'undefined') shuffle = false;
    var a = [];
    var b = [];
    for (var i = 1, j = 0; i <= max_answers; i++) {
        var t = macro.GetParam(label + i);
        if (remove_html(t) != "" || t.search(/<img/) != -1) {
            a[j] = t;
            b[j++] = i;
        }
    }
    if (shuffle && a.length > 1) {
        for (var i = a.length - 1; i > 0; i--) {
            var r = Math.floor(Math.random() * (i + 1));
            var t = a[i];
            a[i] = a[r];
            a[r] = t;
            t = b[i];
            b[i] = b[r];
            b[r] = t;
        }
    }
    return { val: a, idx: b };
}

Array.prototype.mix = function() {
    if (this.length < 2) return;
    for (var j = this.length - 1; j > 0; j--) {
        var r = Math.floor(Math.random() * (j + 1));
        var t = this[j];
        this[j] = this[r];
        this[r] = t;
    }
}

Array.prototype.copy = function() {
    var new_array = new Array();
    for (var i = 0; i < this.length; i++) {
        new_array[i] = this[i];
    }
    return new_array;
}

Array.prototype.equal = function(rhs) {
    if (this.length != rhs.length) return false;
    for (var i = 0; i < this.length; i++) {
        if (this[i] != rhs[i]) return false;
    }
    return true;
}


function remove_html(txt) {
    var res = txt;
    res = res.replace(/\n/g, '');
    res = res.replace(/<[^>]*>/g, '');
    res = res.replace(/&nbsp;/gi, ' ');
    res = res.replace(/&lt;/gi, '<');
    res = res.replace(/&gt;/gi, '>');
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

function count_macros(proj) {
    num_events = 0;
    if (!proj) {
        proj = Project;
    }
    for (var i = 0, n = proj.NumTourstops(); i < n; i++) {
        var ts = proj.GetTourstop(i);

        var macro = ts.NextMacro();
        while (macro != null) {
            var temp_name = macro.Template();

            macro = ts.NextMacro(macro.TourPosition());
            num_events ++;
        }
    }
    log('doc_util::count_macros: num_events = ' + num_events);
    return num_events;
};

