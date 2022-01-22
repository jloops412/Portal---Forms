
var mobile = function(){
    return {
        detect:function(){
            var uagent = navigator.userAgent.toLowerCase();
            var list = this.mobiles;
            var ismobile = false;
            for(var d=0;d<list.length;d+=1){
                if(uagent.indexOf(list[d])!=-1){
                    ismobile = true;
                }
            }
            return ismobile;
        },
        mobiles:[
            "iphone","android","ipad"
        ]
    };
}();

if(mobile.detect()) {
    var fileref=document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", "../css/mobile.css");
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

///////////////////////////////// Print content /////////////////////////////////

function printPage() {
    window.focus();
    window.print();
}

///////////////////////////////// Glossary functions /////////////////////////////////

function setGlossLinks() {
    var spanCount = document.getElementsByTagName("span").length;
    var glossFound = new Array();
    var glossMatch = 0;
    for(var il=0; il < spanCount;il++) {
        var glossId = document.getElementsByTagName("span")[il].getAttribute("gloss_id");
        if(glossId) {
            if(isIE(7) && document.getElementsByTagName('DIV')[0].className == 'boxHead') {
                document.getElementsByTagName("span")[il].className = "";
                continue;
            }
            var glossTxt = document.getElementsByTagName("span")[il].innerHTML;
            glossMatch = 0;
            for (var zd = 0; zd < glossFound.length;zd++) {
                if(glossTxt == glossFound[zd]) {
                    glossMatch = 1;
                }
            }
            if(document.getElementById("glossList")) {
                    document.getElementsByTagName("span")[il].onclick = function() {expandGloss(this, 'this');};
            }
            else {
                if(glossMatch == 0) {
                    glossFound.push(glossTxt);
                    if(document.getElementsByTagName('DIV')[0].className == 'boxHead') {
                        var bbo = parent.document.createElement('iframe');
                    }
                    else {
                        var bbo = document.createElement('iframe');
                    }
                    bbo.style.display = "none";
                    bbo.frameBorder = "no";
                    bbo.border = 0;
                    bbo.className = "glossFrame";
                    bbo.id = glossId + "_box";
                    bbo.name = glossId + "_box";
                    document.getElementsByTagName("span")[il].id = "glosLink" + il;
                    if(document.getElementsByTagName('DIV')[0].className == 'boxHead') {
                        var lastItem = parent.document.getElementById("glosDiv");
                        if(window.name != document.getElementsByTagName("span")[il].getAttribute("gloss_id") + '_box') {
                            document.getElementsByTagName("span")[il].className = "gloss_ref";
                            document.getElementsByTagName("span")[il].onclick = function() {showGloss(this.getAttribute("gloss_id"), this, parent.document.getElementById(window.name));};
                        }
                        else {
                            glossMatch = 1;
                            document.getElementsByTagName("span")[il].className = '';
                        }
                    }
                    else {
                        if(window.name != document.getElementsByTagName("span")[il].getAttribute("gloss_id") + '_box') {
                            document.getElementsByTagName("span")[il].onclick = function() {showGloss(this.getAttribute("gloss_id"), this);};
                        }
                        else {
                            glossMatch = 1;
                            document.getElementsByTagName("span")[il].className = '';
                        }
                        var lastItem = document.getElementById("glosDiv");
                    }
                    lastItem.appendChild(bbo);
                }
                else {
                    document.getElementsByTagName("span")[il].className = "";
                }
            }
        }
    }
}

function expandAll(lnk) {
    if(lnk.innerHTML == hlp_expAll) {
        lnk.innerHTML = hlp_colAll;
        var colAll = "block|gloss_ref_act";
    }
    else {
        lnk.innerHTML = hlp_expAll;
        var colAll = "none|gloss_ref";
    }
    for(i=0;i <document.getElementsByTagName("li").length;i++) {
        if(!hasParents(document.getElementsByTagName("li")[i],'LI')) {
        expandGloss(document.getElementsByTagName("li")[i].childNodes[0], document.getElementsByTagName("li")[i].childNodes[0].getAttribute("gloss_id"), colAll);
        }
    }
}

function hasParents(obj, objType) {
    while(obj.parentNode.tagName != objType && obj.parentNode.tagName != 'BODY') {
            obj = obj.parentNode;
    }
    obj = obj.parentNode;
    if(obj.tagName==objType) {
        return true;
    }
    else {
        return false;
    }
}

function expandGloss(obj, glossId, colAll) {
    var glosFrame = obj.childNodes[1];
    if(colAll) {
        glosFrame.style.display = colAll.split('|')[0];
        obj.className = colAll.split('|')[1]
    }
    else {
        if(glosFrame.style.display == "block") {
            glosFrame.style.display = "none";
            obj.className = "gloss_ref";
        }
        else {
            if(glossId!='this') {
                glosFrame.src = glossId;
            }
            glosFrame.style.display = "block";
            obj.className = "gloss_ref_act";
        }
    }
}

function checkTop() {
    if(parent.document.getElementById("glossList")) {
        document.getElementsByTagName("div")[0].style.display = "none";
        document.getElementsByTagName("h1")[0].style.display = "none";
        document.getElementsByTagName("div")[2].style.display = "none";
        document.getElementsByTagName("div")[1].className = "glosListEntry";
    }
    parent.glosBoxH = document.body.offsetHeight;
}

var glosBoxH;

function showGloss(glossId, stat, prev) {
    glosBoxH = 0;
    parent.glosBoxH = 0;

    if(stat && window.name.search(/_box/)==-1 && window.name != '') {
        var bd = getPosition(document.getElementById(stat.id));
        var myBox = document.getElementById(glossId + "_box");
        myBox.src = glossId;
    }
    else {
        if(stat == "fromBox") {
            var myBox = parent.document.getElementById(glossId + "_box");
        }
        else {
            var bd = getPosition(document.getElementById(stat.id));
            var myBox = parent.document.getElementById(glossId + "_box");
            myBox.src = glossId;
            if(prev) {
                showGloss(prev.id.replace(/_box/,''),'fromBox');
            }
        }
    }
    if(myBox.className = "glossBoxShow") {
        var z = 9;
        var fadeOut = setTimeout(function delayFadeOut() {
            myBox.style.opacity = "0." + z;
            myBox.style.filter = 'alpha(opacity=' + z*10 + ')';
            if(z-->0) {fadInRep = setTimeout(delayFadeOut,15);}
            if(z==0) {myBox.style.display = "none";myBox.className = "";};
        }, 10);
    }
    if(myBox.style.display == "none") {
        myBox.style.display = "block";
        if(prev) {
            myBox.style.top = prev.style.top;
            myBox.style.left = prev.style.left;
        }
        else {
            myBox.style.top = bd.y + "px";
            if(bd.x + myBox.offsetWidth < document.body.clientWidth) {
                myBox.style.left = bd.x + (stat.offsetWidth/2) + "px";
            }
            if(bd.x + myBox.offsetWidth > document.body.clientWidth && bd.x - myBox.offsetWidth < 0)  {
                myBox.style.left = (document.body.clientWidth - myBox.offsetWidth)/2 + "px";
            }
            if (bd.x + myBox.offsetWidth > document.body.clientWidth && bd.x - myBox.offsetWidth > 0)  {
                myBox.style.left = bd.x - (myBox.offsetWidth - stat.offsetWidth/2) + "px";
            }
        }
        myBox.className = "glossBoxShow";
        var z = 0;

        var fadeIn = setTimeout(function delayFadeIn() {
            if(isIE()) {
                myBox.style.filter = 'alpha(opacity=' + (z*10) + ')';
            }
            else {
                myBox.style.opacity = "0." + z;
            }
            if(z++ < 9) {fadInRep = setTimeout(delayFadeIn,15);}
            if(glosBoxH!=0) {myBox.style.height = glosBoxH + 'px';}
            else if(parent.glosBoxH) {
                glosBoxH = parent.glosBoxH;
            }
        }, 10);
    }
}

function sortGlossList(obj, letter) {
    var glossItem = document.getElementById('glossList').getElementsByTagName('LI');
    var glossLen = glossItem.length;
    for(i=0;i<obj.parentNode.getElementsByTagName('A').length;i++) {
        obj.parentNode.getElementsByTagName('A')[i].className = '';
    }
    for(i=0;i<glossLen;i++) {
        if(glossItem[i].getElementsByTagName('SPAN')[0] && glossItem[i].getElementsByTagName('SPAN')[0].className.search(/gloss_ref/)!=-1) {
            if(glossItem[i].style.display == 'none') {
                glossItem[i].style.display = 'block';
            }
            if(letter != 'all' && glossItem[i].getElementsByTagName('SPAN')[0].innerHTML.substr(0,1) != letter) {
                glossItem[i].style.display = 'none';
                obj.className="active";
            }
        }
    }
}

function getPosition(element) {
  var elem=element,tagname="",x=0,y=0;
  while ((typeof(elem)=="object")&&(typeof(elem.tagName)!="undefined"))
  {
    y+=elem.offsetTop; 
    x+=elem.offsetLeft;
    tagname=elem.tagName.toUpperCase(); 

    if (tagname=="BODY")
      elem=0;

    if (typeof(elem)=="object")
      if (typeof(elem.offsetParent)=="object")
        elem=elem.offsetParent;
  }

  position=new Object();
  position.x=x;
  position.y=y;
  return position;
}

function closeBox() {
    var myPos = document.URL;
    if(myPos.indexOf('\\')> -1) {
        var myName = myPos.slice(myPos.lastIndexOf('\\') + 1,myPos.length);
    }
    else {
        var myName = myPos.slice(myPos.lastIndexOf('/') + 1,myPos.length);
    }
    showGloss(myName,"fromBox");
}

function setNumPics() {
    var txt = document.body.innerHTML;
    if(txt.match(/num. [1-9]/)) {
        document.body.innerHTML = txt.replace(/num. ([1-9])/g,'<img src="../img/num$1.png" class="numIcon" border="no">');
    }
}

///////////////////////////////// Adoptions part from older nethelp - maybe have to be redefined /////////////////////////////////

function format_boxes() {
     var y
     var p_value = new Array();
     p_value[0] = 'headNote';
     p_value[1] = 'headTip';
     p_value[2] = 'headAttention';

    // ab hier werden die einzelnen Elemente abgefragt und moduliert
    for (y in p_value) {
    var sumElem = document.getElementsByTagName('p').length;

         for (var m = 0; m < sumElem; m++) {

             if (document.getElementsByTagName('p')[m].className != p_value[y]) {
                 // do nothing 
            }
             else {
                 var miMother = document.getElementsByTagName('p')[m].parentNode;
            // deleting existing styles
                miMother.style.border = '';
                miMother.style.padding = '';
                miMother.style.margin = '';
                // placing class
                    if (y == 0)
                    {miMother.className = 'boxNote';}
                    if (y == 1)
                    {miMother.className = 'boxTip';}
                    if (y == 2)
                    {miMother.className = 'boxAttention';}

            z = 0;
            while (z<1) {
                var miMother = miMother.parentNode;
                if (miMother.tagName == 'TABLE') {
                    z = 1;
                    miMother.style.margin = '';
                     miMother.className = 'boxCont';
                    }
                }
            }
        }
    }
}

function format_tables() {
    var tbl = document.getElementsByTagName('table');
    for(b=0;b<tbl.length;b++) {
        var tblRows = tbl[b].getElementsByTagName('tr');
        var tblCols = tblRows[0].getElementsByTagName('td');
        if(tblCols.length > 1) {
            for(ga=0;ga<tblRows.length;ga++) {
                for(gb=0;gb<tblCols.length;gb++) {
                    if(ga==0) {
                        tblRows[ga].getElementsByTagName('td')[gb].className = 'tHead';
                    }
                    if(ga==tblRows.length - 1) {
                        tblRows[ga].getElementsByTagName('td')[gb].className = 'tBottom';
                    }
                }
            }
        }
    }
}

function specImages()  {
    var v_content = document.body;
    var frmW = document.body.clientWidth;
    var allimages = v_content.getElementsByTagName('img').length;
    for (var i = 0; i < allimages; i++) {
        var imgW = v_content.getElementsByTagName('img')[i].width;
        if (imgW > '39')
        {v_content.getElementsByTagName('img')[i].className = 'imgScreen'}
        else if (imgW < '39'){
         v_content.getElementsByTagName('img')[i].className = 'imgIcon';
         v_content.getElementsByTagName('img')[i].onmouseover = function(){zoomImg(this);};
         v_content.getElementsByTagName('img')[i].onmouseout = function(){zoomImg(this);};
         }
        if(v_content.getElementsByTagName('img')[i].clientWidth > frmW) {
            v_content.getElementsByTagName('img')[i].width = frmW - 40;
        }
    }
}

function zoomImg(obj) {
    if(!document.getElementById('zoomImage')) {
        var obj_w = obj.offsetWidth;
        var obj_h = obj.offsetHeight;
        var obj_y = obj.offsetTop;
        var obj_x = obj.offsetLeft;
        var zoomObj = document.createElement('img');
        zoomObj.src = obj.src;
        zoomObj.id = 'zoomImage';
        zoomObj.style.position = 'absolute';
        zoomObj.style.top = obj_y - 2*obj_h + 'px';
        zoomObj.style.left = obj_x + obj_w + 'px';
        obj.parentNode.appendChild(zoomObj);
    }
    else {
        document.getElementById('zoomImage').parentNode.removeChild(document.getElementById('zoomImage'));
       }
}

function setLinksExternal() {
    var winBase = parent.window.location.pathname;
    winBase = winBase.substr(0,winBase.lastIndexOf("/"));
    var lnk;
    for(i=0;i<document.getElementsByTagName("a").length;i++) {
        lnk = document.getElementsByTagName("a")[i];
        if(lnk.href.indexOf(winBase)==-1 && lnk.href.indexOf('mailto:')==-1) {
            lnk.target = "_blank";
        }
    }
}

///////////////////////////////// show History /////////////////////////////////

function initHist() {
    if(isIE(6)) {
        return;
    }
    var memLnk = parent.frames['header'].bHist['lnk'];
    var memTtl = parent.frames['header'].bHist['pName'];

    if(memLnk.length == 10) {
        memLnk.splice(0,1);
        memTtl.splice(0,1);
    }
    var callHist = document.getElementById('showHistory');
    if(callHist && memLnk.length != 0) {
        callHist.style.display = "block";
        callHist.className = callHist.id;
        callHist.title = hlp_history;
        callHist.onclick = function() {showHist();};
        callHist.onmousedown = function() {dragstart(this);}
    }
    var bHistToStr = memTtl + "";
     var srchStr = new RegExp(document.title,'gi');
    if(bHistToStr.search(srchStr) == -1) {
        memLnk.push(parent.helpContent.location.href);
        memTtl.push(document.title);
    }
}

function showHist() {
    if(!isIE(6)) {
        var callHist = document.getElementById('showHistory');
        callHist.onmousedown = function() {dragstop();};
        if(document.getElementById('frmHistory')) {
            callHist.removeChild(document.getElementById('frmHistory'));
            callHist.className = callHist.id;
            callHist.onmousedown = function() {dragstart(this);}
        }
        else {
            callHist.className = callHist.id + "Active";
            var listItems = '<div class="boxTop"></div><div class="histHd">' + hlp_history + '</div><ul>';
            for(i=0;i<parent.frames['header'].bHist['pName'].length;i++) {
                listItems = listItems + '<li><a href="' + 
                parent.frames['header'].bHist['lnk'][i] + '">' + 
                parent.frames['header'].bHist['pName'][i] + '</a></li>';
            }
            listItems = listItems + '</ul><div class="boxBottom">';
            var histList = document.createElement("div");
            histList.innerHTML = listItems;
            histList.id = "frmHistory";
            histList.className = "frmHistory";
            document.getElementById('showHistory').appendChild(histList);
            histList.style.top=5-histList.clientHeight + "px";

            if(isIE(7)) {
                callHist.style.height = histList.clientHeight + 25 + "px";
                callHist.style.width = "225px";
                histList.style.top = "2px";
                histList.style.left = "2px";
                histList.style.width = "200px";
            }
        }
    }
}

///////////////////////////////// Manipulating iFrames /////////////////////////////////

function showIframe() {
    var myFr = document.getElementById('doc_inline');

    var myFrH = myFr.contentDocument.body.clientHeight;
    myFr.contentDocument.body.style.backgroundColor = "#ffffff";
    if(myFr.offsetHeight < 1) {
        if(myFr.contentDocument.getElementsByTagName("style")[0]) {
            myFr.contentDocument.getElementsByTagName("head")[0].removeChild(myFr.contentDocument.getElementsByTagName("style")[0]);
            myFr.contentDocument.getElementsByTagName("head")[0].removeChild(myFr.contentDocument.getElementsByTagName("style")[0]);
            myFr.contentDocument.getElementById("background").style.padding = "0";
            var myFrStyle = document.createElement("link");
            myFrStyle.href = "../../css/main.css";
            myFrStyle.rel = "stylesheet";
            myFrStyle.type = "text/css";
            myFr.contentDocument.getElementsByTagName("head")[0].appendChild(myFrStyle);
        }
        myFr.style.height = myFrH + "px";
    }
    else {
        myFr.style.height = 0 + "px";
    }
}

function frameTransp() {
    if(isIE(6)) {
        var theframes = document.getElementsByTagName('iframe');
        for(var i = 0; i < theframes.length; i++) {
            theframes[i].setAttribute("allowTransparency","true");
        }
    }
} 

///////////////////////////////// Favorites /////////////////////////////////

function showFavLink() {
    var activeFav = false;
    if(parent.fromFav && parent.fromFav == true) {
        activeFav = true;
        parent.fromFav = false;
    }
    else if(document.cookie) {
        allCookies=document.cookie;
        cookieArr=allCookies.split("; ");
        for(var i=0;i<cookieArr.length;i++) {
            var cookieName=cookieArr[i].substr(0,cookieArr[i].indexOf("="));
            var cookieVal=cookieArr[i].split("=");
            if(cookieName.search(/favEntry_/)!=-1) {
             if(unescape(cookieName.substr(9,cookieName.length)) == document.title){
                activeFav = true;
               }
            }
        }
     }

    for(i=1;i<10;i++) {
        if(document.getElementsByTagName('h'+i).length!=0) {
            var favStat = document.createElement("a");
            favStat.className = "favStat";
            favStat.id = "favStat";
            favStat.href = "javascript:void(0);";
            if(activeFav == true) {
                favStat.className = 'favStat_active';
                // if(mobile.detect()) {
                    // favStat.innerHTML = favStat.innerHTML.replace(/img\//,'img/m_');
                // }
                favStat.onclick = function() {changeFav('del')};
                favStat.title = hlp_FavDel;
            }
            else {
                favStat.className = 'favStat';
                // if(mobile.detect()) {
                    // favStat.innerHTML = favStat.innerHTML.replace(/img\//,'img/m_');
                // }
                favStat.onclick = function() {changeFav('add')};
                favStat.title = hlp_FavAdd;
            }

            // document.getElementsByTagName('h'+i)[0].appendChild(favStat);
            document.getElementById('linksBar').appendChild(favStat);
            if(isIE(6)) {
                allowPNGie6();
            }
            break;
        }
    }
}

function fixLinks() {
    if(isChrome==true || navigator.userAgent.indexOf('Safari')!=-1) {
        var a=document.getElementsByTagName("a");
        for(var i=0;i<a.length;i++) {
            var href = a[i].href;
            if(href.search(location.hostname)!=-1) {
                a[i].onclick=function()
                {
                    window.location=this.getAttribute("href");
                    return false
                }
            }
        }
    }
}

isChrome = function() {
    return Boolean(window.chrome);
}

function changeFav(state) {
    var favLink = document.getElementById('favStat');
    if(state == "del") {
        DeleteCookie('favEntry_' + escape(document.title));
        if(mobile.detect()) {
            favLink.className = 'favStat';
        }
        else {
            favLink.className = 'favStat';
        }
        favLink.onclick = function() {changeFav('add')};
        favLink.title = hlp_FavAdd;
    }
    if(state == "add") {
        addFav();
        if(mobile.detect()) {
            favLink.className = 'favStat_active';
        }
        else {
            favLink.className = 'favStat_active';
        }
        favLink.onclick = function() {changeFav('del')};
        favLink.title = hlp_FavDel;
    }
    if(isIE(6)) {
        allowPNGie6();
    }
}

function addFav() {
    var favTitle = window.parent.frames["helpContent"].document.title;
    var favRef = window.parent.frames["helpContent"].location;
    favRef = String(favRef).replace(/.+?(\/contents\/.+)/, '$1');
    var a = new Date();
    a = new Date(a.getTime() +1000*60*60*24*365);
    document.cookie = "favEntry_" + escape(favTitle) + "=" + favRef + "; expires=" + a.toGMTString();
}

function showFavs() {
    if(navigator.cookieEnabled == false) {
        var msgBox = document.createElement("div");
        msgBox.className = 'topPageMsg';
        msgBox.innerHTML = hlp_cookiesDisallowed;
        document.body.insertBefore(msgBox,document.getElementById("contentContainer"));
    }

    if(document.getElementById("favList")) {
        var favList = document.getElementById("favList");
        favList.innerHTML = "";
    }
    else {
        var favList = document.createElement('ul');
        favList.innerHTML = "";
        favList.id = "favList";
        document.getElementById("contentContainer").appendChild(favList);
    }
    if(document.cookie) {
        allCookies=document.cookie;
        cookieArr=allCookies.split("; ");
        var favItemOdd = 0;
        for(var i=0;i<cookieArr.length;i++) {
            var cookieName=cookieArr[i].substr(0,cookieArr[i].indexOf("="));
            var cookieVal=cookieArr[i].split("=");
            if(cookieName.indexOf("favEntry_") == 0) {
                cookieVal=unescape(cookieVal[1]);
                var favItem = document.createElement('li');
                favItem.id = "fav" + i;
                    if(favItemOdd == 0) {
                        favItem.className = "favEven";
                        favItemOdd = 1;
                    }
                    else {
                        favItem.className = "favOdd";
                        favItemOdd = 0;
                    }
                var favLink = document.createElement('a');
                favLink.innerHTML = unescape(cookieName.slice(9,cookieName.length));
                cookieVal = String(cookieVal).replace(/.+?(\/contents\/.+)/, '$1');
                favLink.href = '..' + cookieVal;
                favLink.onclick = function() {parent.fromFav = true};
                favItem.appendChild(favLink);
                var delFavLink = document.createElement('a');
                delFavLink.className = "delFav";
                delFavLink.onclick = function() {remChild(this.parentNode.id)};
                favItem.appendChild(delFavLink);
                favList.appendChild(favItem);
            }
        }
    }
}

function remChild(what) {
    DeleteCookie("favEntry_" + escape(document.getElementById(what).getElementsByTagName("a")[0].innerHTML));
    showFavs();
}

///////////////////////////////// Remove Value from Cookie /////////////////////////////////

function DeleteCookie (name) {
    var exp = new Date();
    exp.setTime (exp.getTime() - 1);
    var cval = GetCookie (name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

function getCookieVal (offset) {
    var endstr = document.cookie.indexOf (";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
    }

function GetCookie (name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
        return getCookieVal (j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}

///////////////////////////////// DnD /////////////////////////////////

var dragobjekt = null;

var dragx = 0;
var dragy = 0;

var posx = 0;
var posy = 0;

function draginit() {
  document.onmousemove = drag;
  document.onmouseup = dragstop;
}

function dragstart(element) {
  dragobjekt = element;
  dragx = posx - dragobjekt.offsetLeft;
  dragy = posy - dragobjekt.offsetTop;
}

function dragstop() {
  dragobjekt=null;
}

function drag(ereignis) {
  posx = document.all ? window.event.clientX : ereignis.pageX;
  posy = document.all ? window.event.clientY : ereignis.pageY;
  if(dragobjekt != null && dragobjekt.tagName != "select" && dragobjekt.tagName != "option") {
    dragobjekt.style.left = (posx - dragx) + "px";
    dragobjekt.style.top = (posy - dragy) + "px";
  }
}

///////////////////////////////// PNG IE6 /////////////////////////////////

function isIE(version) {
     var tb = window.navigator.userAgent;
     var msie = tb.indexOf ( "MSIE " );
     if(!version && msie > -1) {
        return true;
     }
     else {
        return (tb.substring(msie+5, tb.indexOf (".", msie ))==version);
     }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function allowPNGie6() {
        sleep(500);
        var myElem = new Array("img","div","a","h1","p","span");
        var imgLen;

        for(ai=0;ai<myElem.length;ai++) {
            imgLen = document.getElementsByTagName(myElem[ai]);
            for(r=0;r<imgLen.length;r++) {
                if(imgLen[r].src && imgLen[r].src.indexOf('.png') != -1 || imgLen[r].currentStyle.backgroundImage && imgLen[r].currentStyle.backgroundImage.indexOf('.png') != -1) {
                    var imgH = imgLen[r].offsetHeight;
                    var imgW = imgLen[r].offsetWidth;
                    if(myElem[ai] == "img") {
                        var origSrc = imgLen[r].src;
                    }
                    else {
                        var origSrc = imgLen[r].currentStyle.backgroundImage;
                        origSrc = origSrc.substr(5,origSrc.length-7);
                    }
                    imgLen[r].height = imgH;
                    imgLen[r].width = imgW;

                    if(myElem[ai]=='img') {
                        imgLen[r].src = "../img/alpha.gif";
                        imgLen[r].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + origSrc + "', sizingMethod='scale');";
                    }
                    else {

                        if(imgLen[r].className.indexOf("box")==-1) {
                            imgLen[r].style.backgroundImage = 'url(../img/alpha.gif)';
                            imgLen[r].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + origSrc + "');"; 
                        }

                    }
                }
        }
    }
}

///////////////////////////////// integrating browser check /////////////////////////////////

function chkBcheck()
{
    if (document.body.innerHTML.search(/browser-check.php/)!=-1)
    {

        for(i=0;i<document.getElementsByTagName("a").length;i++) {
            if(document.getElementsByTagName("a")[i].href.search(/browser-check.php/)!=-1) {
                var bLink = document.getElementsByTagName("a")[i];
                break;
            }
        }
        bLink.id = 'bchecklink';
        bLink.name = 'bchecklink';
        bLink.className = 'suppLink';
        bLink.target = '_blank';
        bLink.title = hlp_bcheck;
        bLink.parentNode.id = 'bcheck';
        catchTrainer();
    }
}

function catchTrainer()
{
    try {
        var ctx = parent.parent.ctx || top.opener && top.opener.top.ctx || null;
        if (ctx) {
            var bcheckPath_ = ctx.cfg_resolve('trainer:bcheck/index.html');
        }
        else {
            bcheckPath_ = null;
        }
    }
    catch (exc_) {
            bcheckPath_ = null;
    }
    if (bcheckPath_) {
        document.getElementById('bchecklink').href = bcheckPath_;
    }
    else {
        document.getElementById('bcheck').style.display = 'none';
    }
}

///////////////////////////////// mark search results /////////////////////////////////

function markVals(searchVal) {
    var myTxt = document.body.innerHTML;
    var markupBefore = "<span class='highlight'>";
    var markupAfter = "</span>";
    var contentTxt = "";

    if(searchVal == "") { 
        return;
    }
    if(window.parent.frames['header'].caseSense == true) {
        var re = new RegExp('(' + searchVal + ')',"g");
    }
    if(window.parent.frames['header'].caseSense == false) {
        var re = new RegExp('(' + searchVal + ')',"gi");
    }
    var txtSpl = myTxt.split('<');
    for(i=0;i<txtSpl.length;i++) {
        var txtInt = txtSpl[i];
        if(txtSpl[i].search(/\S/)==-1) {continue;}
        if(txtInt.length != (txtInt.search(/>/)+1)) {
            var txtTag = txtInt.substr(0,txtInt.search(/>/)+1);
            txtInt = txtInt.substr(txtInt.search(/>/)+1,txtInt.length);
            if(txtInt.search(/\S/)==-1) {continue;}
            txtInt = txtInt.replace(re,markupBefore + '$1' + markupAfter);
            txtSpl[i] = txtTag + txtInt;
        }
    }
    for(i=0;i<txtSpl.length;i++) {
        if(i!=0) {txtSpl[i] = '<' + txtSpl[i]};
        contentTxt = contentTxt + txtSpl[i];
    }
    window.parent.frames["helpContent"].document.body.innerHTML = contentTxt;
}

///////////////////////////////// repair framesizes /////////////////////////////////
var resnow = 0;
function repairFrH() {
        var box = document.getElementById('contentContainer');
        var winH;
        var winW;
        if (document.body && document.body.offsetWidth) {
         winH = document.body.offsetHeight;
         winW = document.body.offsetWidth;
        }
        if (document.compatMode=='CSS1Compat' &&
            document.documentElement &&
            document.documentElement.offsetWidth ) {
         winH = document.documentElement.offsetHeight;
         winW = document.documentElement.offsetWidth;
        }
        if (window.innerHeight) {
         winH = window.innerHeight;
         winW = window.innerWidth;
        }
        if((winH - box.offsetTop - 8)>=0) {
            box.style.height = (winH - box.offsetTop - 8) + 'px';
        }
        if((winW-68)>=0) {
            box.style.width = (winW-68) + 'px';
        }
        if((winH-2)>=0) {
            document.body.style.height = (winH -2) + 'px';
        }
        if(mobile.detect()) {
            box.style.height = top.boxH + "px";
            document.body.style.height = top.bodyH + 'px';
        }
}

///////////////////////////////// Check url /////////////////////////////////

function checkUrl(url, obj) {
var req = null;
try {
    // Mozilla, Opera, Safari sowie Internet Explorer (ab v7)
    req = new XMLHttpRequest();
} catch(e) {
    try {
        // MS Internet Explorer (ab v6)
        req  = new ActiveXObject("Microsoft.XMLHTTP");
    } catch(e) {
        try {
            // MS Internet Explorer (ab v5)
            req  = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            req  = null;
        }
    }
}

if(req) { 
    req.open("HEAD", url, true);
    req.onreadystatechange=function() {
        if(req.readyState == 4) {
            stat = req.status;
            if(stat == 200 || stat == 0) {
                // console.log(url + " has been found.");
                req.abort();
            }
            else { 
                // console.log(url + " is invalid.");
                obj.style.display="none";
                req.abort();
            }
        }
    }
    req.send(null);
}
}

function testLinks() {
    var txt = "";
    var parUrl = parent.location.href;
    var splt = "";
    if(parUrl.search("/")!=-1) {
        splt = "/";
    }
    else {
        splt = "\\";
    }
    parUrla = parUrl.split(splt);
    for(i=0;i<document.getElementsByTagName("A").length;i++) {
        var ref = document.getElementsByTagName("A")[i].href;
        refr = ref.split(splt);
        refr = refr[refr.length-1];
        if(ref.search(/#/)==-1) {
            if(parUrla[parUrla.length-1] == refr) {
                document.getElementsByTagName("A")[i].style.display = "none";
            }
            else {
                checkUrl(ref, document.getElementsByTagName("A")[i]);
            }
        }
    }
}

///////////////////////////////// initialize page /////////////////////////////////

function initPage(objType) {
    if(window.parent.frames['header'] && window.parent.frames['header'].searchVal && window.parent.frames['header'].searchVal != '') {
        initActions(objType,true);
        markVals(window.parent.frames['header'].searchVal);
        window.parent.frames['header'].searchVal = '';
        initHist();
        showFavLink();
    }
    else {
        initActions(objType,false);
    }
}

function initActions(objType,split) {
    if (top.frames.length==0) {
        top.document.cookie = "recPage=" + window.location;
        top.location.href="../default.htm";
    }
    else {
        switch(objType) {
            case "standard":
                if(document.getElementById('contentContainer')!=null) {
                    repairFrH();
                    if(!mobile.detect()) {
                        window.onresize = function() {
                            repairFrH();
                        }
                    }
                }
                if(!isIE(7)) {
                    draginit();
                }
                format_boxes();
                format_tables();
                specImages();
                setNumPics();
                setGlossLinks();
                setLinksExternal();
                frameTransp();
                if(split==false) {
                    if(!isIE(7) && parent.header!=null) {
                        parent.header.changeBC();
                    }
                    initHist();
                    showFavLink();
                }
                fixLinks();
            break;
            case "glossary":
                testLinks();
                if(!isIE(6) || !isIE(7)) {
                    setGlossLinks();
                }
            break;
            case "glossaryList":
                if(document.getElementById('contentContainer')!=null) {
                    repairFrH();
                    if(!mobile.detect()) {
                        window.onresize = function() {
                            repairFrH();
                        }
                    }
                }
                setGlossLinks();
            break;
            default:

        }
    }
}

var cntLoaded = true;