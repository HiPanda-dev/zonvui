var GameConfig = require('GameConfig');
var Utility = {
    /**
     * Lấy 1 số ngẫu nhiên trong khoảng [low,high]
     * @param low giá trị min nhất có thể được trả về
     * @param high giá trị max nhất có thể được trả về
     */
    randomNumber: function (low, high) {
        return Math.floor(Math.random() * (1 + high - low)) + low;
    },

    deg2rad: function (deg) {
        return deg / 180.0 * Math.PI;
    },

    rad2deg: function (rad) {
        return rad / Math.PI * 180.0;
    },

    formatCurrency: function (num) {
        if (isNaN(num)) return "0";

        var str = "";
        var tmp = Math.abs(num).toString();

        for (var i = 0; i < tmp.length; i++) {
            if (((i % 3) === 0) && (i > 0)) {
                str = "." + str;
            }
            str = tmp.charAt(tmp.length - i - 1) + str;
        }

        if (num < 0) {
            return ("-" + str);
        }
        return str;
    },

    formatCurrency2: function (num) {
        cc.log("numBet: " + num);
        var ext = ["K", "M", "B"];
        var range = [1000, 1000000, 1000000000];

        var str = "";
        var tmp = Math.abs(num);

        for (var i = range.length - 1; i >= 0; i--) {
            if (tmp >= range[i]) {
                str = ((this.roundNumber(tmp / range[i], 2, 1)) + ext[i]).toString();
                break;
            }
        }

        // in case value of 'tmp' is less than the minimum value in the range-list
        if (str == "") {
            str = tmp.toString();
        }

        if (num < 0) {
            return ("-" + str);
        }

        cc.log(str);
        return str;
    },

    formatStringEditBox: function (string) {
        if ('0123456789'.indexOf(string.substr(string.length - 1)) === -1) {
            string = string.slice(0, -1);
        }
        string = string.split('.').join("");

        var str = "";
        for (var i = 0; i < string.length; i++) {
            if (((i % 3) === 0) && (i > 0)) {
                str = "." + str;
            }
            str = string.charAt(string.length - i - 1) + str;
        }
        if(str === "0")
            str = "";

        return str;
    },
    /**
     *
     * @param    num số cần làm tròn
     * @param    precision số chữ số sau dấu phẩy
     * @param    type 0 là làm tròn, 1 là làm tròn xuống
     * @return
     */
    roundNumber: function (num, precision, type) {
        if (precision < 0) precision = 0;
        var tmp = Math.pow(10, precision);
        if (type === 1)
            return parseInt(num * tmp) / tmp;
        return Math.round(num * tmp) / tmp;
    },

    sortArray: function (array, type) {
        if (!array || array.length === 0) return;
        switch (type) {
            case "NUMERIC":
                array.sort(function (a, b) {
                    return a - b;
                });
                break;
            case "DESCENDING":
                array.sort(function (a, b) {
                    return b - a;
                });
                break;
        }
    },

    sortDownCardPhom: function (array) {
        var arrangeFinish;
        while (!arrangeFinish)
        {
            arrangeFinish = true;
            for (var i = 0; i < array.length - 1; i++)
            {
                if (this.convertClientToServerCardsBinh(array[i])[0] + 1 > this.convertClientToServerCardsBinh(array[i + 1])[0] + 1)
                {
                    var tempCard = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = tempCard;
                    arrangeFinish = false;
                }
            }
        }
    },

    removeDuplicateArray: function (array) {
        for (var i = 0; i < array.length - 1; i++) {
            for (var j = i + 1; j < array.length; j++) {
                if (array[i] === array[j]) {
                    array.splice(j, 1);
                }
            }
        }
    },

    joinArray: function (args) {
        for (var i = 1; i < args.length; i++) {
            for (var j = 0; j < args[i].length; j++) {
                args[0].push(args[i][j]);
            }
        }
    },

    /**
     * random object index in array
     * @param arr
     */
    shuffle: function (arr) {
        for (var i = 0; i < 100; i++) {
            var rd1 = Utility.randomNumber(0, arr.length - 1);
            var rd2 = Utility.randomNumber(0, arr.length - 1);
            var temp = arr[rd1];
            arr[rd1] = arr[rd2];
            arr[rd2] = temp;
        }

    },


    convertClientToServerCardsBinh: function (arrCards) {
        var server = [44, 48, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40,
            45, 49, 1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41,
            46, 50, 2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42,
            47, 51, 3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43];
        var results = [];
        for (var i = 0; i < arrCards.length; i++) {
            var id = arrCards[i];
            results.push(server.indexOf(id));
        }
        return results;
    },

    convertServerToClientCardsMiniPoker: function (arrCards) {
        var results = [];
        for (var i = 0; i < arrCards.length; i++) {
            var id = arrCards[i];
            results.push(this.convertToMiniPokerClientCard(id));
        }
        return results;
    },

    convertToMiniPokerClientCard: function(cardId){
        return (parseInt(cardId) + 48)%52;
    },
    convertServerToClientCardsBinh: function (arrCards) {
        var server = [44, 48, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40,
            45, 49, 1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41,
            46, 50, 2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42,
            47, 51, 3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43];
        var results = [];
        for (var i = 0; i < arrCards.length; i++) {
            var id = arrCards[i];
            results.push(server[id]);
        }
        return results;
    },


    convertToRtf:function(html) {
        html = this.htmldecode(html);
        html = html.replace(/<pre(.*?)>(.*?)<\/pre>/gmi, "<code>$2</code>");
        html = html.replace(/<h[1-7](.*?)>(.*?)<\/h[1-7]>/, "\n<h>$2</h>\n");
        html = html.replace(/<br(.*?)>/gi, "\n");
        html = html.replace(/<br (.*?)>/gi, "\n");
        html = html.replace(/<br \/>/gi, "\n");
        html = html.replace(/<textarea(.*?)>(.*?)<\/textarea>/gmi, "\<code>$2\<\/code>");
        html = html.replace(/<b>/gi, "<b>");
        html = html.replace(/<i>/gi, "<i>");
        html = html.replace(/<u>/gi, "<u>");
        html = html.replace(/<\/b>/gi, "</b>");
        html = html.replace(/<\/i>/gi, "</i>");
        html = html.replace(/<\/u>/gi, "</u>");
        html = html.replace(/<em>/gi, "<b>");
        html = html.replace(/<\/em>/gi, "</b>");
        html = html.replace(/<strong>/gi, "<b>");
        html = html.replace(/<\/strong>/gi, "</b>");
        html = html.replace(/<cite>/gi, "<i>");
        html = html.replace(/<\/cite>/gi, "</i>");
        html = html.replace(/<span style='color:(.*?); font-size: (.*?)pt;'>(.*?)<\/span>/gi, "<color=$1><size=$2>$3</size></color>");
        html = html.replace(/<span style="color:(.*?); font-size: (.*?)pt;">(.*?)<\/span>/gi, "<color=$1><size=$2>$3</size></color>");
        html = html.replace(/<span style='font-size: (.*?)pt; color:(.*?);'>(.*?)<\/span>/gi, "<color=$2><size=$1>$3</size></color>");
        html = html.replace(/<span style="font-size: (.*?)pt; color:(.*?);">(.*?)<\/span>/gi, "<color=$2><size=$1>$3</size></color>");
        html = html.replace(/<span style='font-size: (.*?)pt;'>(.*?)<\/span>/gi, "<size=$1>$2</size>");
        html = html.replace(/<span style="font-size: (.*?)pt;">(.*?)<\/span>/gi, "<size=$1>$2</size>");
        html = html.replace(/<span style='color:(.*?);'>(.*?)<\/span>/gi, "<color=$1>$2</color>");
        html = html.replace(/<span style="color:(.*?);">(.*?)<\/span>/gi, "<color=$1>$2</color>");
        html = html.replace(/<font color="(.*?)">(.*?)<\/font>/gmi, "<color=$1>$2</color>");
        html = html.replace(/<font color=(.*?)>(.*?)<\/font>/gmi, "<color=$1>$2</color>");
        html = html.replace(/<link(.*?)>/gi, "");
        html = html.replace(/<li(.*?)>(.*?)<\/li>/gi, "<*>$2");
        html = html.replace(/<ul(.*?)>/gi, "<list>");
        html = html.replace(/<\/ul>/gi, "</list>");
        html = html.replace(/<div>/gi, "\n");
        html = html.replace(/<\/div>/gi, "\n");
        html = html.replace(/<td(.*?)>/gi, " ");
        html = html.replace(/<tr(.*?)>/gi, "\n");
        html = html.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, "");
        html = html.replace(/<a(.*?)href="(.*?)"(.*?)>(.*?)<\/a>/gi, "<url=$2>$4</url>");
        html = html.replace(/<head>(.*?)<\/head>/gmi, "");
        html = html.replace(/<object>(.*?)<\/object>/gmi, "");
        html = html.replace(/<script(.*?)>(.*?)<\/script>/gmi, "");
        html = html.replace(/<style(.*?)>(.*?)<\/style>/gmi, "");
        html = html.replace(/<title>(.*?)<\/title>/gmi, "");
        html = html.replace(/<!--(.*?)-->/gmi, "\n");
        html = html.replace(/\/\//gi, "/");
        html = html.replace(/http:\//gi, "http://");

        return html;
    },

    htmldecode:function(s){
        window.HTML_ESC_MAP = {
            "nbsp":" ","iexcl":"¡","cent":"¢","pound":"£","curren":"¤","yen":"¥","brvbar":"¦","sect":"§","uml":"¨","copy":"©","ordf":"ª","laquo":"«","not":"¬","reg":"®","macr":"¯","deg":"°","plusmn":"±","sup2":"²","sup3":"³","acute":"´","micro":"µ","para":"¶","middot":"·","cedil":"¸","sup1":"¹","ordm":"º","raquo":"»","frac14":"¼","frac12":"½","frac34":"¾","iquest":"¿","Agrave":"À","Aacute":"Á","Acirc":"Â","Atilde":"Ã","Auml":"Ä","Aring":"Å","AElig":"Æ","Ccedil":"Ç","Egrave":"È","Eacute":"É","Ecirc":"Ê","Euml":"Ë","Igrave":"Ì","Iacute":"Í","Icirc":"Î","Iuml":"Ï","ETH":"Ð","Ntilde":"Ñ","Ograve":"Ò","Oacute":"Ó","Ocirc":"Ô","Otilde":"Õ","Ouml":"Ö","times":"×","Oslash":"Ø","Ugrave":"Ù","Uacute":"Ú","Ucirc":"Û","Uuml":"Ü","Yacute":"Ý","THORN":"Þ","szlig":"ß","agrave":"à","aacute":"á","acirc":"â","atilde":"ã","auml":"ä","aring":"å","aelig":"æ","ccedil":"ç","egrave":"è","eacute":"é","ecirc":"ê","euml":"ë","igrave":"ì","iacute":"í","icirc":"î","iuml":"ï","eth":"ð","ntilde":"ñ","ograve":"ò","oacute":"ó","ocirc":"ô","otilde":"õ","ouml":"ö","divide":"÷","oslash":"ø","ugrave":"ù","uacute":"ú","ucirc":"û","uuml":"ü","yacute":"ý","thorn":"þ","yuml":"ÿ","fnof":"ƒ","Alpha":"Α","Beta":"Β","Gamma":"Γ","Delta":"Δ","Epsilon":"Ε","Zeta":"Ζ","Eta":"Η","Theta":"Θ","Iota":"Ι","Kappa":"Κ","Lambda":"Λ","Mu":"Μ","Nu":"Ν","Xi":"Ξ","Omicron":"Ο","Pi":"Π","Rho":"Ρ","Sigma":"Σ","Tau":"Τ","Upsilon":"Υ","Phi":"Φ","Chi":"Χ","Psi":"Ψ","Omega":"Ω","alpha":"α","beta":"β","gamma":"γ","delta":"δ","epsilon":"ε","zeta":"ζ","eta":"η","theta":"θ","iota":"ι","kappa":"κ","lambda":"λ","mu":"μ","nu":"ν","xi":"ξ","omicron":"ο","pi":"π","rho":"ρ","sigmaf":"ς","sigma":"σ","tau":"τ","upsilon":"υ","phi":"φ","chi":"χ","psi":"ψ","omega":"ω","thetasym":"ϑ","upsih":"ϒ","piv":"ϖ","bull":"•","hellip":"…","prime":"′","Prime":"″","oline":"‾","frasl":"⁄","weierp":"℘","image":"ℑ","real":"ℜ","trade":"™","alefsym":"ℵ","larr":"←","uarr":"↑","rarr":"→","darr":"↓","harr":"↔","crarr":"↵","lArr":"⇐","uArr":"⇑","rArr":"⇒","dArr":"⇓","hArr":"⇔","forall":"∀","part":"∂","exist":"∃","empty":"∅","nabla":"∇","isin":"∈","notin":"∉","ni":"∋","prod":"∏","sum":"∑","minus":"−","lowast":"∗","radic":"√","prop":"∝","infin":"∞","ang":"∠","and":"∧","or":"∨","cap":"∩","cup":"∪","int":"∫","there4":"∴","sim":"∼","cong":"≅","asymp":"≈","ne":"≠","equiv":"≡","le":"≤","ge":"≥","sub":"⊂","sup":"⊃","nsub":"⊄","sube":"⊆","supe":"⊇","oplus":"⊕","otimes":"⊗","perp":"⊥","sdot":"⋅","lceil":"⌈","rceil":"⌉","lfloor":"⌊","rfloor":"⌋","lang":"〈","rang":"〉","loz":"◊","spades":"♠","clubs":"♣","hearts":"♥","diams":"♦","\"":"quot","amp":"&","lt":"<","gt":">","OElig":"Œ","oelig":"œ","Scaron":"Š","scaron":"š","Yuml":"Ÿ","circ":"ˆ","tilde":"˜","ndash":"–","mdash":"—","lsquo":"‘","rsquo":"’","sbquo":"‚","ldquo":"“","rdquo":"”","bdquo":"„","dagger":"†","Dagger":"‡","permil":"‰","lsaquo":"‹","rsaquo":"›","euro":"€"};
        if(!window.HTML_ESC_MAP_EXP)
            window.HTML_ESC_MAP_EXP = new RegExp("&("+Object.keys(HTML_ESC_MAP).join("|")+");","g");
        return s?s.replace(window.HTML_ESC_MAP_EXP,function(x){
            return HTML_ESC_MAP[x.substring(1,x.length-1)]||x;
        }):s;
    },

    convertToRtfOLD: function (plain) {
        var res = plain.replace(/<\/font>/g, "</c>");
        res = res.replace(/<font color/g, "<color");
        res = res.replace(/'/g, "");
        return res;
    },

    convertToPlain: function (rtf) {
        rtf = rtf.replace(/\\par[d]?/g, "");
        rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "").trim();
        return rtf.replace(/\n/g, "<br/>");
    },

    convertHtmlToText: function (html) {
        var inputText = html;
        var returnText = "" + inputText;

        //-- remove BR tags and replace them with line break
        returnText = returnText.replace(/<br>/gi, "\n");
        returnText = returnText.replace(/<br\s\/>/gi, "\n");
        returnText = returnText.replace(/<br\/>/gi, "\n");

        //-- remove P and A tags but preserve what's inside of them
        returnText = returnText.replace(/<p.*>/gi, "\n");
        returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

        //-- remove all inside SCRIPT and STYLE tags
        returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
        returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
        //-- remove all else
        returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

        //-- get rid of more than 2 multiple line breaks:
        returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");

        //-- get rid of more than 2 spaces:
        returnText = returnText.replace(/ +(?= )/g, '');

        //-- get rid of html-encoded characters:
        returnText = returnText.replace(/&nbsp;/gi, " ");
        returnText = returnText.replace(/&amp;/gi, "&");
        returnText = returnText.replace(/&quot;/gi, '"');
        returnText = returnText.replace(/&lt;/gi, '<');
        returnText = returnText.replace(/&gt;/gi, '>');

        //-- return
        return returnText;
    },

    entityToHtml: function (contentText) {
        var regExp = null;
        //dau sac
        regExp = /&aacute;/g;
        contentText = contentText.replace(regExp, "á");

        regExp = /&iacute;/g;
        contentText = contentText.replace(regExp, "í");
        regExp = /&oacute;/g;
        contentText = contentText.replace(regExp, "ó");

        regExp = /&eacute;/g;
        contentText = contentText.replace(regExp, "é");
        regExp = /&uacute;/g;
        contentText = contentText.replace(regExp, "ú");
        regExp = /&yacute;/g;
        contentText = contentText.replace(regExp, "ý");
        //dau sac
        regExp = /&Aacute;/g;
        contentText = contentText.replace(regExp, "Á");

        regExp = /&Iacute;/g;
        contentText = contentText.replace(regExp, "Í");
        regExp = /&Oacute;/g;
        contentText = contentText.replace(regExp, "Ó");

        regExp = /&Eacute;/g;
        contentText = contentText.replace(regExp, "É");
        regExp = /&Uacute;/g;
        contentText = contentText.replace(regExp, "Ú");
        regExp = /&Yacute;/g;
        contentText = contentText.replace(regExp, "Ý");

        //dau huyen
        regExp = /&agrave;/g;
        contentText = contentText.replace(regExp, "à");

        regExp = /&igrave;/g;
        contentText = contentText.replace(regExp, "ì");
        regExp = /&ograve;/g;
        contentText = contentText.replace(regExp, "ò");

        regExp = /&egrave;/g;
        contentText = contentText.replace(regExp, "è");
        regExp = /&ugrave;/g;
        contentText = contentText.replace(regExp, "ù");
        //dau huyen
        regExp = /&Agrave;/g;
        contentText = contentText.replace(regExp, "À");

        regExp = /&Igrave;/g;
        contentText = contentText.replace(regExp, "Ì");
        regExp = /&Ograve;/g;
        contentText = contentText.replace(regExp, "Ò");

        regExp = /&Egrave;/g;
        contentText = contentText.replace(regExp, "È");
        regExp = /&Ugrave;/g;
        contentText = contentText.replace(regExp, "Ù");

        //dau nga
        regExp = /&atilde;/g;
        contentText = contentText.replace(regExp, "ã");

        regExp = /&itilde;/g;
        contentText = contentText.replace(regExp, "ĩ");
        regExp = /&otilde;/g;
        contentText = contentText.replace(regExp, "õ");

        regExp = /&etilde;/g;
        contentText = contentText.replace(regExp, "ẽ");
        regExp = /&utilde;/g;
        contentText = contentText.replace(regExp, "ũ");
        //dau nga
        regExp = /&Atilde;/g;
        contentText = contentText.replace(regExp, "Á");

        regExp = /&Itilde;/g;
        contentText = contentText.replace(regExp, "Ĩ");
        regExp = /&Otilde;/g;
        contentText = contentText.replace(regExp, "Õ");

        regExp = /&Etilde;/g;
        contentText = contentText.replace(regExp, "Ẽ");
        regExp = /&Utilde;/g;
        contentText = contentText.replace(regExp, "Ũ");

        //dau mu
        regExp = /&acirc;/g;
        contentText = contentText.replace(regExp, "â");

        regExp = /&icirc;/g;
        contentText = contentText.replace(regExp, "í");
        regExp = /&ocirc;/g;
        contentText = contentText.replace(regExp, "ô");

        regExp = /&ecirc;/g;
        contentText = contentText.replace(regExp, "ê");
        regExp = /&ucirc;/g;
        contentText = contentText.replace(regExp, "ú");
        //dau mu
        regExp = /&Acirc;/g;
        contentText = contentText.replace(regExp, "Â");

        regExp = /&Ocirc;/g;
        contentText = contentText.replace(regExp, "Ô");

        regExp = /&Ecirc;/g;
        contentText = contentText.replace(regExp, "Ê");

        //dau
        regExp = /&rsquo;/g;
        contentText = contentText.replace(regExp, "'");

        regExp = /&ndash;/g;
        contentText = contentText.replace(regExp, "-");
        regExp = /&permil;/g;
        contentText = contentText.replace(regExp, "%");

        regExp = /&nbsp;/g;
        contentText = contentText.replace(regExp, " ");

        regExp = /&amp;/g;
        contentText = contentText.replace(regExp, "&");

        regExp = /&quot;/g;
        contentText = contentText.replace(regExp, '"');

        regExp = /&lt;/g;
        contentText = contentText.replace(regExp, '<');

        regExp = /&gt;/g;
        contentText = contentText.replace(regExp, '>');


        return contentText;

    },

    loadUrlImage: function (imageUrl, onComplete, onCompleteParams) {
        if(imageUrl.indexOf("http") === -1)
            imageUrl = GameConfig.WEB_RESOURCE + imageUrl;
        var status = this.imageExists(imageUrl);
        if (status) {
            cc.textureCache.addImageAsync(imageUrl, function (onComplete, onCompleteParams, texture) {
                if (texture instanceof cc.Texture2D) {
                    onCompleteParams.push(texture);
                    onComplete.apply(onComplete, onCompleteParams);
                }
                else {
                    cc.log("Fail to load remote texture");
                }
            }.bind(this, onComplete, onCompleteParams), this);
        }
    },

    loadUrlAtlas: function (node , atlasUrl, sample, duration) {

        cc.loader.loadRes(atlasUrl, cc.SpriteAtlas, function(err, atlas) {
            var spriteFrames = atlas.getSpriteFrames();
            var clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, sample);
            clip.name = 'run';
            cc.log(clip.duration);
            clip.speed = spriteFrames.length/(duration*sample);
            clip.wrapMode = cc.WrapMode.Normal;
            node.getComponent(cc.Animation).addClip(clip);
        });

    },

    imageExists: function (image_url) {
        try {
            var http = new XMLHttpRequest();
            http.open('GET', image_url, false);
            http.send();
            return http.status !== 404;
        } catch (ex) {
            return false;
        }
    },

    scaleImage: function (image , maxWidth , maxHeight) {
        image.scale = (maxWidth/image.width < maxHeight/image.height) ? maxWidth/image.width : maxHeight/image.height;
    },

    setText: function (text, arrText) {
        var arr = text.split("%s");
        var newText = "";
        for (var i = 0; i < arr.length; i++) {
            newText += arr[i];
            if (arrText[i]) {
                newText += arrText[i];
            }
        }
        return newText;
    },

    convertSFSObjectToObject: function (sfsObject) {
      return sfsObject;
        // var arrKey = sfsObject.getKeysArray();
        // var o = {};
        // for (var i = 0; i < arrKey.length; i++) {
        //     var key = arrKey[i];
        //     o[key] = sfsObject.get(key);
        // }
        //
        // return o;
    },

    convertSFSObjectToJson: function (sfsObject, level) {
      return "";
        // var res = "";
        // if(!(sfsObject  instanceof  SFS2X.SFSObject) && !(sfsObject  instanceof  SFS2X.SFSArray) ){
        //     for(var k = 0; k < level; k++){
        //         res += "    ";
        //     }
        //     return res + sfsObject;
        // }
        // else if(sfsObject  instanceof  SFS2X.SFSObject){
        //     for(var k = 0; k < level; k++){
        //         res += "    ";
        //     }
        //     res += "{\n" ;
        //     var arrKey = sfsObject.getKeysArray();
        //
        //     for (var i = 0; i < arrKey.length; i++) {
        //         var key = arrKey[i];
        //         var kaka = sfsObject.get(key);
        //
        //         for(var k = 0; k < level; k++){
        //             res += "    ";
        //         }
        //
        //         res +=  "'" + key + "': " + "\n" + this.convertSFSObjectToJson(kaka, level + 1);
        //         res += "\n";
        //     }
        //     for(var k = 0; k < level; k++){
        //         res += "    ";
        //     }
        //     res += "}";
        //     return res;
        // }
        // else if(sfsObject  instanceof  SFS2X.SFSArray){
        //     for(var k = 0; k < level; k++){
        //         res += "    ";
        //     }
        //     res += "[\n" ;
        //     for (var i = 0; i < sfsObject.size(); i++) {
        //         var kaka = sfsObject.get(i);
        //         res +=  this.convertSFSObjectToJson(kaka, level + 1);
        //         res += "\n";
        //     }
        //
        //     for(var k = 0; k < level; k++){
        //         res += "    ";
        //     }
        //     res += "]";
        //     return res;
        // }
    },


    convertSFSArrayToArray: function (sfsArray) {
        return sfsArray;
        // var arr = [];
        // for (var i = 0; i < sfsArray.size(); i++) {
        //     var o = sfsArray.getSFSObject(i);
        //     o = this.convertSFSObjectToObject(o);
        //     arr.push(o);
        // }
        //
        // return arr;
    },


    runToValue: function(node, value, time){
        node.stopAllActions();
        var goalValue = value;
        var nBuoc = 10*time;
        var curValue = this.parseToNumber(node.getComponent(cc.Label).string);
        var breakValue = 0;
        if(curValue > goalValue){
            nBuoc = 10;
        }

        if(Math.abs(goalValue - curValue) === 0){
            breakValue = 0;
        }
        else if(Math.abs(goalValue - curValue) <= nBuoc && Math.abs(goalValue - curValue)>0)
        {
            breakValue = 1;
        }
        else {
            breakValue = parseInt((goalValue - curValue) / nBuoc) + 1;
        }

        this.runValue(node, value, breakValue);
    },

    runValue: function(node, value, breakValue){

        var goalValue = value;

        var curValue = this.parseToNumber(node.getComponent(cc.Label).string);


        if(Math.abs(goalValue - curValue) < Math.abs(breakValue) || breakValue === 0 || (goalValue < curValue) ){
            node.getComponent(cc.Label).string = Utility.formatCurrency(goalValue);
        }
        else{
            curValue = curValue + breakValue;
            node.getComponent(cc.Label).string = "" + Utility.formatCurrency(curValue);
            node.runAction( cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
                this.runValue(node, value, breakValue)
            }.bind(this))));
        }
    },

    tweenRunNumber: function (node, value, time) {
        var str = node.getComponent(cc.Label).string;
        var numStart = parseInt(str.split('.').join(""));

        var gameScore = {score:numStart};
        TweenLite.to(gameScore, time, {score:parseInt(value), roundProps:"score", onUpdate:this.updateHandler.bind(this), onUpdateParams:[node, gameScore], ease:Linear.easeNone});
        TweenLite.ticker.fps(20);
    },

    updateHandler: function(node, gameScore) {
        if(!gameScore) return;
        var num = Math.round(gameScore.score);
        node.getComponent(cc.Label).string = "" + Utility.formatCurrency(num);
    },

    parseToNumber: function(stringNumber){
        var s = "";
        for(var i = 0; i < stringNumber.length; i++){
            if(stringNumber[i] === '0' || stringNumber[i] === '1' ||stringNumber[i] === '2' ||stringNumber[i] === '3' ||stringNumber[i] === '4' ||stringNumber[i] === '5'
                ||stringNumber[i] === '6' ||stringNumber[i] === '7' ||stringNumber[i] === '8' ||stringNumber[i] === '9'){
                s += stringNumber[i];
            }
        }
        return parseInt(s);
    },

    js_yyyy_mm_dd_hh_mm_ss: function(value) {
        var now = new Date(value );
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length === 1) { month = "0" + month; }
        var day = "" + now.getDate(); if (day.length === 1) { day = "0" + day; }
        var hour = "" + now.getHours(); if (hour.length === 1) { hour = "0" + hour; }
        var minute = "" + now.getMinutes(); if (minute.length === 1) { minute = "0" + minute; }
        var second = "" + now.getSeconds(); if (second.length === 1) { second = "0" + second; }
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    },

    js_mm_dd_hh_mm_ss: function(value) {
        var now = new Date(value );
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length === 1) { month = "0" + month; }
        var day = "" + now.getDate(); if (day.length === 1) { day = "0" + day; }
        var hour = "" + now.getHours(); if (hour.length === 1) { hour = "0" + hour; }
        var minute = "" + now.getMinutes(); if (minute.length === 1) { minute = "0" + minute; }
        var second = "" + now.getSeconds(); if (second.length === 1) { second = "0" + second; }
        return month + "-" + day + " " + hour + ":" + minute + ":" + second;
    },

    hh_mm_ss: function(secons) {
      var sec_num = parseInt(secons, 10)
      var hours   = Math.floor(sec_num / 3600) % 24
      var minutes = Math.floor(sec_num / 60) % 60
      var seconds = sec_num % 60
      return [hours,minutes,seconds]
          .map(v => v < 10 ? "0" + v : v)
          .filter((v,i) => v !== "00" || i > 0)
          .join(":")
    },

    gEncrypt: function (data) {
      var key = 'cafeg@me';
      var t = 0;
      var res = "";
      for (var i = 0; i < data.length; i++) {
          if (t >= key.length) t = 0;
          var v = data.charCodeAt(i);
          var k = key.charCodeAt(t++);
          var r = (v + k) % 62345 + 99;
          res += String.fromCharCode(r)
      }
      return res
   },

   gDecrypt: function (data) {
      var key = 'cafeg@me';
      var t = 0;
      var res = "";
      for (var i = 0; i < data.length; i++) {
          if (t >= key.length) t = 0;
          var v = data.charCodeAt(i);
          var k = key.charCodeAt(t++);
          var r = (v - 99 + 62345 - k) % 62345;
          res += String.fromCharCode(r)
      }
      return res
   },

   // gEncrypt: function (data) {
   //    var key = 'gz@club';
   //    var t = 0;
   //    var res = "";
   //    for (var i = 0; i < data.length; i++) {
   //        if (t >= key.length) t = 0;
   //        var v = data.charCodeAt(i);
   //        var k = key.charCodeAt(t++);
   //        var r = (v + k) % 63636 + 10;
   //        res += String.fromCharCode(r)
   //    }
   //    return res
  	// },
   //
  	// gDecrypt: function (data) {
   //    var key = 'gz@club';
   //    var t = 0;
   //    var res = "";
   //    for (var i = 0; i < data.length; i++) {
   //        if (t >= key.length) t = 0;
   //        var v = data.charCodeAt(i);
   //        var k = key.charCodeAt(t++);
   //        var r = (v - 10 + 63636 - k) % 63636;
   //        res += String.fromCharCode(r)
   //    }
   //    return res
  	// },

    getRandomBetween: function(from, to){
        return Math.floor(Math.random()*(to - from) + from);
    },

    getListCardMap: function() {
      var results = [];
      for(var i = 1;i <= 52; i++) {
        var type = (i % 4 === 0) ? 4 : i % 4;
        var id = Math.ceil(i / 4);
        var nameType = "";
        if(type === 1) nameType = 'B';
        if(type === 2) nameType = 'T';
        if(type === 3) nameType = 'R';
        if(type === 4) nameType = 'C';
        var name = "";
        if(id <= 8) name = (id + 2) + nameType;
        if(id === 9) name = "J" + nameType;
        if(id === 10) name = "Q" + nameType;
        if(id === 11) name = "K" + nameType;
        if(id === 12) name = "A" + nameType;
        if(id === 13) name = "2" + nameType;
        results.push(name);
      }

      return results;
    }
};

module.exports = Utility;
