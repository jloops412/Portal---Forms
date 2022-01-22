function TextBuffer() {
    this.sp_ = -1;
    this.stack_ = [];
     this.uknown_ = "°";
     this.app_value_ = "";
}

TextBuffer.prototype.sp_ = -1;
TextBuffer.prototype.stack_ = [];
TextBuffer.prototype.uknown_ = "°";
TextBuffer.prototype.app_value_ = "";
TextBuffer.prototype.key_stack_ = [];

TextBuffer.prototype.clean = function() {
    this.sp_ = -1;
    this.stack_ = [];
    this.key_stack_ = [];
     this.uknown_ = "°";
     this.app_value_ = "";
}

TextBuffer.prototype.insert_ch_ = function(ch) {
    sa_logger.Write(3, "TextBuffer::insert_ch_ : " + ch, "", "");

    if (this.stack_.length == 0) {
        if (ch == "left" || ch == "right") {
            ch = this.uknown_;
        }

        if (ch != "back" && ch != "del") {
            this.stack_.splice(0, 0, ch);
            this.sp_ = 0;
        }
    } else {
        if (ch == "back") {

            if (this.sp_ == 0) {
                if (this.is_char_(this.stack_[0])) {
                    this.stack_.splice(0, 1);
                }
            } else if (this.is_char_(this.stack_[this.sp_])) {
                this.stack_.splice(this.sp_, 1);
                this.sp_ -= 1;
            }

        } else if (ch == "right") {

            if (this.sp_ + 1 < this.stack_.length) {
                this.sp_ += 1;
            } else {
                this.sp_ += 1;
                this.stack_.splice(this.sp_, 0, this.uknown_);
            }

        } else if (ch == "left") {

            if (this.sp_ - 1 >= 0) {
                this.sp_ -= 1;
            } else {
                this.sp_ = 0;
                this.stack_.splice(0, 0, this.uknown_);
            }

        } else if (ch == "del") {

            if (this.sp_ + 1 < this.stack_.length && this.is_char_(this.stack_[this.sp_])) {
                this.stack_.splice(this.sp_ + 1, 1);
            }

        } else if (this.is_char_(ch)) {
            this.sp_ += 1;
            this.stack_.splice(this.sp_, 0, ch);
        }
    }
    sa_logger.DeWrite(3);
}

TextBuffer.prototype.insert = function(key_code, shift, ctrl, alt) {
    sa_logger.Write(3, "TextBuffer::insert" + key_code, "", "");
    this.key_stack_.push({code: key_code, shift: shift, ctrl: ctrl, alt: alt});
    sa_logger.DeWrite(3);
}


TextBuffer.prototype.is_char_ = function(ch) {
    return (ch != "back" && ch != "right" && ch != "left" && ch != "del");
}

TextBuffer.prototype.toString = function(){
    var ret = "";

    for (var i = 0; i < this.stack_.length; i++) {
        ret += this.stack_[i] + "\n";
    }

    return ret;
}

TextBuffer.prototype.convert_key_to_ch_ = function() {
    var converted = false;
    for (var i = 0; i < this.key_stack_.length; i++) {
        var key = this.key_stack_[i];
        
        var key_name = KeyUtils.KeyName(key.code);
        var key_char = KeyUtils.KeyCharacter(key.code, key.shift, key.ctrl, key.alt);
        var ch = '';

        if (key_name == "back"  || key_name == "right" || key_name == "left"  ||  key_name == "del") {
            ch = key_name;
        } else if (key_char != "") {
            ch = key_char;
        }
        if (ch != '') {
            this.insert_ch_(ch);
        }
        converted = true;
    }
    if (converted) {
        this.key_stack_ = [];
    }
}

TextBuffer.prototype.postprocess = function() {
    sa_logger.Write(3, "TextBuffer::postprocess", "", "");
    this.convert_key_to_ch_();

    this.app_value_ = "";
    var i = 0;
    var j = this.stack_.length - 1;

    while (i < this.stack_.length && this.stack_[i] == this.uknown_) i++;

    while (j >= 0 && this.stack_[j] == this.uknown_) j--;

    var plain = true;

    for (var x = i; x <= j; x++) {
        if (this.stack_[x] == this.uknown_) {
            plain = false;
            break;
        }
        this.app_value_ += this.stack_[x];
    }

    if (plain) {
        return true;
    }

    this.app_value_ = "";

    for (var x = i; x <= j; x++) {
        if (this.stack_[x] == this.uknown_) {
            this.app_value_ += ".";
        }    else if (this.stack_[x] == "\\") {
            this.app_value_ += "\\\\";
        } else if (this.stack_[x] == ".") {
            this.app_value_ += "µ";
        } else if (this.stack_[x] == "/") {
            this.app_value_ += "\\/";
        } else if (this.stack_[x] == "*") {
            this.app_value_ += "\\*";
        } else if (this.stack_[x] == "+") {
            this.app_value_ += "\\+";
        } else if (this.stack_[x] == "?") {
            this.app_value_ += "\\?";
        } else if (this.stack_[x] == "|") {
            this.app_value_ += "\\|";
        } else if (this.stack_[x] == "(") {
            this.app_value_ += "\\(";
        } else if (this.stack_[x] == ")") {
            this.app_value_ += "\\)";
        } else if (this.stack_[x] == "[") {
            this.app_value_ += "\\[";
        } else if (this.stack_[x] == "]") {
            this.app_value_ += "\\]";
        } else if (this.stack_[x] == "{") {
            this.app_value_ += "\\{";
        } else if (this.stack_[x] == "}") {
            this.app_value_ += "\\}";
        } else if (this.stack_[x] == "*") {
            this.app_value_ += "\\*";
        } else {
            this.app_value_ += this.stack_[x];
        }
    }

    sa_logger.DeWrite(3);
    return false;
}

TextBuffer.prototype.has_text = function() {
    return (this.is_plain() && this.app_value_ != "");
}

TextBuffer.prototype.is_plain = function() {

    this.app_value_ = "";
    var i = 0;
    var j = this.stack_.length - 1;

    while (i < this.stack_.length && this.stack_[i] == this.uknown_) i++;

    while (j >= 0 && this.stack_[j] == this.uknown_) j--;

    var plain = true;

    for (var x = i; x <= j; x++) {
        if (this.stack_[x] == this.uknown_) {
            plain = false;
            break;
        }
        this.app_value_ += this.stack_[x];
    }

    return plain;
}

TextBuffer.prototype.get_init_value = function(end_value) {
    sa_logger.Write(3, "TextBuffer::get_init_value", "", "");
    var init_value = "";

    var plain = this.postprocess();
    sa_logger.Log(3, "------------>END VALUE:" + end_value, "", "");
    sa_logger.Log(3, "------------>APPLICATION VALUE:" + this.app_value_, "", "");

    if (this.app_value_ == "") {
        sa_logger.DeWrite(3);
        return "";
        //return end_value;
    }

    if (plain) {
        var pos = end_value.indexOf(this.app_value_);
        if (pos != -1 && end_value.lastIndexOf(this.app_value_) == pos && this.app_value_ != end_value) {
            if (pos == 0) {
                init_value = end_value.substring(this.app_value_.length);
            } else if (pos + this.app_value_.length == end_value.length) {
                init_value = end_value.substring(0, pos);
            } else {
                init_value = end_value.substring(0, pos) + end_value.substring(pos + this.app_value_.length);
            }
        }
    } else {
        end_value = end_value.replace(".", "µ");
        var res = end_value.match(this.app_value_);

        if (res && res.length == 1) {

            var match = res[0];

            init_value = end_value.substring(0, res.index);

            for (var i = 0; i < this.app_value_.length; i++) {
                if (this.app_value_[i] == ".") {
                    init_value += match[i];
                }
            }

            init_value += end_value.substring(res.index + match.length);
        }
    }
    sa_logger.DeWrite(3);
    return init_value;
}
