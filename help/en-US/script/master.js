
///////////////////////////////// helpers /////////////////////////////////

function isInArray(val,arr) {
    for(t=0;t<arr.length;t++) {
        if(arr[t]==val) {
            return true;
        }
    }
    return false;
}

///////////////////////////////// variable definitions ///////////////////////////////// 

var recInputs = new Array();
var temp, temp2, cookieArray, cookieCount;

var bcLocation = parent.frames['helpContent'];
var lastPage = '';
var lastMenuItem = "";

var bHist = new Array();
bHist['id'] = new Array();
bHist['lnk'] = new Array();
bHist['pName'] = new Array();

var indexHtmlMem = '';

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
    if(parent.name == 'header') {
        if(top.document.getElementById('frSetMain')!=null) {
            top.document.getElementById('frSetMain').rows='44px,*';
        }
    }
}


///////////////////////////////// handling contents tree ///////////////////////////////// 

function initiate() {
    cookieCount=0;
    if(document.cookie){
        var cookieArray=document.cookie.split(";");
        for(i in cookieArray){
            if(cookieArray[i].indexOf("state=")!=-1) {
                var cookieState = cookieArray[i].split("=");
                cookieState = cookieState[1];
            }
        }
    }
    if(!cookieState) {
        var cookieState = "true, false";
    }

    cookieArray = new Array();
    cookieArray = cookieState.split(",");
    temp=document.getElementById("containerul");
    approveCt();
    for(var o=0;o<temp.getElementsByTagName("li").length;o++){
        var li_cur = temp.getElementsByTagName("li")[o];
        if(li_cur.getElementsByTagName("ul").length>0){
            temp2 = li_cur.getElementsByTagName('a')[0].getElementsByTagName('span')[0];
            if(mobile.detect()) {
                temp2.className = (cookieArray.length>0)?((cookieArray[cookieCount]=="true")?"nav_collapse":"nav_expand"):"nav_expand";
            }
            else {
                temp2.className = (cookieArray.length>0)?((cookieArray[cookieCount]=="true")?"nav_collapse":"nav_expand"):"nav_expand";
            }
            li_cur.getElementsByTagName("ul")[0].style.display = "none";
            li_cur.getElementsByTagName("a")[0].onmousedown=function(){showhide(this.parentNode)};

            if(cookieArray[cookieCount]=="true" || li_cur.innerHTML.search(/tocActive/)!=-1) {
            showhide(li_cur);
            }
            cookieCount++;
        }
        else{ 
            temp2 = li_cur.getElementsByTagName('a')[0].getElementsByTagName('SPAN')[0];
            if(mobile.detect()) {
                temp2.className = "nav_no_children";
            }
            else {
                temp2.className = "nav_no_children";
            }
        }
    }
    for(var o=0;o<temp.getElementsByTagName("A").length;o++){
        temp.getElementsByTagName("A")[o].onclick = function() {
            if(document.getElementById("tocActive")) {
                document.getElementById("tocActive").className="";
                document.getElementById("tocActive").parentNode.className="";
                document.getElementById("tocActive").id="";
            }
            if(this.className!="tocActive") {
                this.parentNode.className="tocActive";
                this.className="tocActive";
                this.id="tocActive";
            }
        };
    }
}

function showhide(el) {
    el.getElementsByTagName("ul")[0].style.display=(el.getElementsByTagName("ul")[0].style.display=="block")?"none":"block";
    if(mobile.detect()) {
        el.getElementsByTagName("span")[0].className=(el.getElementsByTagName("ul")[0].style.display=="block")?"nav_collapse":"nav_expand";
    }
    else {
        el.getElementsByTagName("span")[0].className=(el.getElementsByTagName("ul")[0].style.display=="block")?"nav_collapse":"nav_expand";
    }
    writeCookie();
}

function writeCookie() {
    cookieArray=new Array();
    for(var q=0;q<temp.getElementsByTagName("li").length;q++){
        if(temp.getElementsByTagName("li")[q].childNodes.length>0) {
        if(temp.getElementsByTagName("li")[q].childNodes[0].nodeName=="A" && temp.getElementsByTagName("li")[q].getElementsByTagName("ul").length>0){
            cookieArray[cookieArray.length]=(temp.getElementsByTagName("li")[q].getElementsByTagName("ul")[0].style.display=="block");
      }
    }
  }
  document.cookie="state="+cookieArray.join(",")+";expires="+new Date(new Date().getTime() + 365*24*60*60*1000).toGMTString();
}

///////////////////////////////// Context /////////////////////////////////

initPage = "";

function approveCt() {
    if(top.contextIDs && top.contextIDs.length>0) {
        var winLoc = String(top.window.location);
        var ctPos = -1;
        if(winLoc.search(/\?ckey=/)!=-1) {
            var ctVal = winLoc.substr(winLoc.indexOf('?ckey=')+6,winLoc.length);
        }
        else if(winLoc.search(/\?\d+/)!=-1) {
            var ctVal = winLoc.substr(winLoc.indexOf('?')+1,winLoc.length);
        }
        var contextIDs = top.contextIDs;
        for(i=0;i<contextIDs.length;i++) {
            if(contextIDs[i]==ctVal) {
                ctPos = i;
                break;
            }
        }
        if(ctPos!=-1) {
            parent.helpContent.location=contextIDs[ctPos+1];
            var tocObj = parent.helpNavigation.document.getElementById('containerul');
            for(i=0;i<tocObj.getElementsByTagName('A').length;i++) {
                if(tocObj.getElementsByTagName('A')[i].href.indexOf(contextIDs[ctPos+1])!=-1) {
                    tocObj.getElementsByTagName('A')[i].className='tocActive';
                    tocObj.getElementsByTagName('A')[i].id='tocActive';
                    break;
                }
            }
        } 
    }
}

///////////////////////////////// Breadcrumbs /////////////////////////////////

function changeBC(indiVal) {
    if(parent.helpContent.bcCurrent) {
        var bcCur = parent.helpContent.bcCurrent;
        var myBreadLinks = new Array();
        var myBreads = new Array();
        var myBreadList = parent.helpContent.document.getElementById("linksBar");

        if(!indiVal && myBreadList) {
            for(i=0;i<bcCur.length;i++) {
                myBreads.push(bcCur[i].split('|')[1]);
                myBreadLinks.push(bcCur[i].split('|')[0] + '.htm');
            }
            myBreadList.innerHTML = "";
            var BCindex = 500;
            for(var p=0;p<myBreads.length;p++) {
                var myBC = "";
                if(myBreads[p].length > 25) {
                    myBC = myBreads[p].substr(0, 14) + "...";
                }
                else {
                    myBC = myBreads[p];
                }
                var objBC = document.createElement("a");
                objBC.href = myBreadLinks[p];
                objBC.target = "helpContent";
                if(p==0) {
                    objBC.className = "firstBC";
                }
                objBC.setAttribute("layer",p);
                if(p < (myBreads.length - 1)) {
                    objBC.setAttribute("strcache", myBreads[p]);
                    objBC.title = myBreads[p];
                    objBC.onclick = function() {cutBC(this);};
                    objBC.innerHTML = '<span class="peakL"></span><span class="text">' + myBC + '</span><span class="peakR"></span>';
                }
                else {
                    objBC.className = ((p==0)?"firstBC":"recentBC");
                    objBC.innerHTML = '<span class="peakL"></span><span class="text">' + myBreads[p] + '</span><span class="peakR"></span>';
                }
                objBC.style.zIndex = BCindex;
                if(isIE(6)==true) {
                    //ie6 doesnt't support appendchild here - so nothing
                }
                else {
                    myBreadList.appendChild(objBC);
                    for(l=0;l<objBC.getElementsByTagName('SPAN').length;l++) {
                        objBC.getElementsByTagName('SPAN')[l].style.zIndex = BCindex;
                    }
                }
                BCindex--;
            }
        }
        else {
            if(indiVal!='lastPage' && !isIE(6)) {
                lastPage = myBreadList.getElementsByTagName('a')[myBreadList.getElementsByTagName('a').length-1].href;
                myBreadList.innerHTML = '<a href="javascript:void(0);" class="recentBC">' + indiVal + '</a>';
            }
            else if(lastPage && !isIE(6)) {
                parent.helpContent.location = lastPage;
            }
        }
    }
}

function cutBC(myItem) {
    myItem.onmouseover = function() {};
    myItem.onmouseout = function() {};
    myItem.className = "recentBC";
    var myItemIndex = parseInt(myItem.getAttribute("layer"));
    var allLinks = document.getElementById("linksBar").getElementsByTagName("a");
    for(var gu = allLinks.length - 1; gu > myItemIndex; gu--) {
        document.getElementById("linksBar").removeChild(allLinks[gu]);
    }
}

function showHideStr(myItem) {
    var str1 = myItem.innerHTML;
    var str2 = myItem.getAttribute("strcache");
    myItem.setAttribute("strcache", str1);
    myItem.innerHTML = str2;
}

///////////////////////////////// menu handling  /////////////////////////////////

function menAct(item, secondary) {
    if(secondary == 0) {
        if(lastMenuItem != "") {
           document.getElementById(lastMenuItem).className = "";
        }
        lastMenuItem = item;
        document.getElementById(item).className = "recent";
        if(isIE(6)) {
            allowPNGie6();
        }
    }
    if(secondary == 1) {
        if(document.getElementById(item).className == "activated") {
            document.getElementById(item).className = ""
        }
        else {
            document.getElementById(item).className = "activated"
        }
    }
}

///////////////////////////////// check mail /////////////////////////////////

function showHideMail() {
    if(document.URL.search(/^http:/)!=-1 && document.getElementById("wannaMail")) {
        document.getElementById("wannaMail").style.display="block";
    }
    else {
        document.getElementById("wannaMail").style.display="none";
    }
}

///////////////////////////////// set Active and Fill History /////////////////////////////////

function setActive(obj) {
    if(lastPage != "") {
       document.getElementById(lastPage).className = "";
    }
    lastPage = obj.id;
    document.getElementById(obj.id).className = "tocActive";
}

///////////////////////////////// load as frameset from everywhere /////////////////////////////////

function loadFrm() {
    if (top.frames.length==0) {
        top.location.href="default.htm";
    }
    else if(window.name == "header") {
        loadExt = setInterval(function() {loadExtCall()},20);
    }
}

function loadExtCall() {
    if(parent.helpContent.cntLoaded!=null) {
        if(parent.helpContent.GetCookie("recPage")!=null) {
            parent.helpContent.location = parent.helpContent.GetCookie("recPage");
            parent.helpContent.DeleteCookie('recPage');
            window.clearInterval(loadExt);
        }
        else {
            window.clearInterval(loadExt);
        }
    }
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

///////////////////////////////// Index /////////////////////////////////

function createIndex() {
    var indexItems = new Array();
    var indexTitles = new Array();
    if(indexHtmlMem=='') {
        indexHtmlMem = document.getElementById("indexList").innerHTML;
    }
    else {
        document.getElementById("indexList").innerHTML = indexHtmlMem;
    }
    for (var i = 0; i <  document.getElementById("indexList").getElementsByTagName("li").length; i++) {
        var chk = 0;
        var myItem =  document.getElementById("indexList").getElementsByTagName("li")[i];
        if(myItem.innerHTML.indexOf(",") != -1) {
            valueList = myItem.innerHTML.replace(/,\s/g,',');
            myItemArr = valueList.split(",");
            for(var fo = 0; fo < myItemArr.length; fo++) {
                indexItems.push(myItemArr[fo]+"|"+myItem.getAttribute('link'));
            }
        }
        else {
            indexItems.push(myItem.innerHTML+"|"+myItem.getAttribute('link'));
        }
    }
    indexItems.sort();
    for(i = 0;i<indexItems.length; i++) {
        indexTitles[i] = new Array();
        var myVal = indexItems[i].split("|");
           indexTitles[i]['title'] = myVal[0];
           indexTitles[i]['keywords'] = myVal;
           indexTitles[i]['keywords'].splice(0, 1);
           indexTitles[i]['links']= new Array;
           indexTitles[i]['links'].push(myVal[1]);
        indexTitles[i]['keywords'].splice(1, 1);
    }
    var lbo = indexTitles.length;
    for (i = 0; i < lbo; i++) {
        myTitle = indexTitles[i]['title'];
        for (bo = i + 1; bo < lbo; bo++) {
            if(indexTitles[bo]['title'] == myTitle) {
                indexTitles[i]['keywords'].push(indexTitles[bo]['keywords']);
                indexTitles[i]['links'].push(indexTitles[bo]['links']);
                indexTitles.splice(bo,1);
                bo = bo - 1;
                lbo = lbo - 1;
            }
        }
    }
    document.getElementById("indexList").innerHTML = "";
    for (i = 0; i < indexTitles.length; i++) {
        var ulLi = document.createElement("li");
        var ulTerm = document.createElement("a");
        ulTerm.href='javascript:void(0);';
        ulLi.appendChild(ulTerm);
        if(parent.header.indexNum && parent.header.indexNum == true) {
            ulTerm.innerHTML = indexTitles[i]['title'] + '<span class="indexCounter">(' + indexTitles[i]['keywords'].length + ')</span>';
            if(parent.header.indexClps==true) {
                ulTerm.parentNode.className='itemCollapsed';
            }
        }
        else {
            ulTerm.innerHTML = indexTitles[i]['title'];
            if(parent.header.indexClps==true) {
                ulTerm.parentNode.className='itemCollapsed';
            }
        }
        ulTerm.onclick = function() {
            if(this.parentNode.className=='itemCollapsed') {
                this.parentNode.className='';
            }
            else {
                this.parentNode.className='itemCollapsed';
            }
        }
        var ulKeys = document.createElement("ul");
        for (bo = 0; bo < indexTitles[i]['keywords'].length; bo++) {
            var liKey = document.createElement("li");
            var liLnk = document.createElement("a");
            liLnk.innerHTML = indexTitles[i]['keywords'][bo];
            liLnk.href = indexTitles[i]['links'][bo];
            liLnk.target = "helpContent";
            liKey.appendChild(liLnk);
            ulKeys.appendChild(liKey);
        }
        ulLi.appendChild(ulKeys);
        document.getElementById("indexList").appendChild(ulLi);
    }
    if(document.getElementById("optionsLeft")) {
        document.getElementById("topBoxTxt").removeChild(document.getElementById("optionsLeft"));
        showOptionsMenu();
    }
}

function showOptionsMenu() {
var optionsLeft = document.createElement('div');
optionsLeft.className = 'optionsLeft';
optionsLeft.id = 'optionsLeft';
var optionsArr = new Array('indexClps','indexNum');
var optionsLeftMenu = document.createElement('ul');
    for(i=0;i<optionsArr.length;i++) {
        var optionVars = optionsArr[i].split('|');
        oLM1 = document.createElement('li');
            oLM1a = document.createElement('a');
            oLM1a.href='javascript:void(0);';
            switch(i) {
            case 0:
                if(parent.header.indexClps && parent.header.indexClps==true) {
                    oLM1a.innerHTML = hlp_expAll;
                }
                else {
                    oLM1a.innerHTML = hlp_colAll;
                }
                oLM1a.onclick = function() {
                    if(parent.header.indexClps && parent.header.indexClps==true) {
                        parent.header.indexClps = false;
                    }
                    else {
                        parent.header.indexClps=true;
                    }
                    createIndex();
                }
            break;
            case 1:
                if(parent.header.indexNum && parent.header.indexNum==true) {
                    oLM1a.innerHTML = hlp_hideNum;
                }
                else {
                    oLM1a.innerHTML = hlp_showNum;
                }
                oLM1a.onclick = function() {
                    if(parent.header.indexNum && parent.header.indexNum==true) {
                        parent.header.indexNum = false;
                    }
                    else {
                        parent.header.indexNum=true;
                    }
                    createIndex();
                }
            break;
            default:
            }
        oLM1.appendChild(oLM1a);
        optionsLeftMenu.appendChild(oLM1);
    }
    optionsLeft.appendChild(optionsLeftMenu);
    document.getElementById("topBoxTxt").appendChild(optionsLeft);
}

///////////////////////////////// Check IE /////////////////////////////////

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

///////////////////////////////// PNG IE6 /////////////////////////////////

function allowPNGie6() {
        sleep(500);
        var myElem = new Array("img","div","a","p","span");
        var imgLen;

        for(ai=0;ai<myElem.length;ai++) {
            imgLen = document.getElementsByTagName(myElem[ai]);
            for(r=0;r<imgLen.length;r++) {
                if(imgLen[r].src && imgLen[r].src.indexOf('.png') != -1 || imgLen[r].currentStyle.backgroundImage && imgLen[r].currentStyle.    backgroundImage.indexOf('.png') != -1) {
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
                        imgLen[r].src = "img/alpha.gif";
                        imgLen[r].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + origSrc + "', sizingMethod='scale')";
                    }
                    else {
                        imgLen[r].style.backgroundImage = 'none';
                        imgLen[r].style.position = "relative";
                        imgLen[r].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + origSrc + "')"; 
                    }
                }
        }
    }
}

function fixMenue(pObj) {
    var subDiv = document.getElementById(pObj).getElementsByTagName('div');
    for(i=0;i<subDiv.length;i++) {
        var cmdLnk = subDiv[i].getElementsByTagName('a')[0].onclick;
        var goToLnk = subDiv[i].getElementsByTagName('a')[0].href;
        var goToLoc = subDiv[i].getElementsByTagName('a')[0].target;
        if(cmdLnk != null) {
            cmdLnk = String(cmdLnk);
            cmdLnk = cmdLnk.substr(cmdLnk.indexOf('{')+1,cmdLnk.length);
            cmdLnk = cmdLnk.substr(0,cmdLnk.length-1);
            cmdLnk = cmdLnk.replace(new RegExp('this','i'),'this.getElementsByTagName("A")[0]');
            cmdLnk = cmdLnk.replace(new RegExp('this.parentNode.id','i'),'this.id');

            if(goToLnk.indexOf('.htm')>-1) {
                cmdLnk = cmdLnk + 'parent.' + goToLoc + '.location="' + goToLnk + '";';
            }
            cmdLnk = cmdLnk.replace(/\s/gi,'');
            var fcLnk = 'function() {' + String(cmdLnk) + '}';
            eval('subDiv[i].onclick = ' + fcLnk);
        }
        else {
            subDiv[i].style.display = 'none';
        }
    }
}

///////////////////////////////// Close button /////////////////////////////////

function setExit() {
    if (window.parent == window.top) {
        document.getElementById('wannaExit').style.display = '';
    }
    else {
        document.getElementById('wannaExit').style.display = 'none';
    }
}

function closeWindow() {
    self.top.opener = self.top;
    self.top.open('', '_self','');
    self.top.close();
}

///////////////////////////////// repair framesizes /////////////////////////////////

function repairFrH() {
    resizeFrH();
    if(!mobile.detect()) {
        window.onresize = function() {
            resizeFrH();
        }
    }
}
function resizeFrH() {
    if(document.getElementById('contentContainer')) {
        var box = document.getElementById('contentContainer');
    }
    else {
        var box = document.getElementById('listFound');
    }
    var winH;
    if (document.body && document.body.offsetWidth) {
     winH = document.body.offsetHeight;
    }
    if (document.compatMode=='CSS1Compat' &&
        document.documentElement &&
        document.documentElement.offsetWidth ) {
     winH = document.documentElement.offsetHeight;
    }
    if (window.innerWidth && window.innerHeight) {
     winH = window.innerHeight;
    }
    if(!mobile.detect()) {
     if((winH - box.offsetTop - 2)>=0) {
        box.style.height = (winH - box.offsetTop - 2) + 'px';
        }
     if((winH-2)>=0) {
            document.body.style.height = (winH - 2) + 'px';
     }
    }
    else {
        var offS = 25;
        if(!top.boxH) {
            top.boxH = winH - box.offsetTop - offS;
            box.style.height = (winH - box.offsetTop- offS) + 'px';
        }
        if(!top.bodyH) {
            document.body.style.height = (winH - offS) + 'px';
            top.bodyH = winH - offS;
        }
        if(document.getElementById('listFound')) {
            offS += document.getElementById('searchForm').offsetHeight;
            offS -= 10;
            box.style.height = (top.boxH - offS) + "px";
            document.body.style.height = top.bodyH + 'px';
        }
        else {
            box.style.height = top.boxH + "px";
            document.body.style.height = top.bodyH + 'px';
        }
    }
}