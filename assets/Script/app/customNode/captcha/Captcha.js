var GameConfig = require("GameConfig");
var Base64 = require("Base64");
var Utility = require("Utility");
cc.Class({
    extends: cc.Component,

    properties: {
        mcImage:cc.Sprite
    },

    // use this for initialization
    onLoad: function () {

    },

    onMessage(event){
      var data = JSON.parse(Utility.gDecrypt(event.data));
      switch (data.c) {
        case 20:
          cc.loader.load({url: "data:image/png;base64," + data.d, type: 'png'}, (err, texture) => {
            if (err) {
                cc.error("load capcha error", err);
                return;
            }
            this.mcImage.spriteFrame = new cc.SpriteFrame(texture);
          });
        default:

      }
    },

    refeshCaptcha:function () {
      if (!this.socket) {
        this.socket = window.webSocket;
        if(cc.sys.isBrowser){
          this.socket.addEventListener("message", this.onMessage.bind(this));
        }else{
          this.socket.onmessageCaptcha = this.onMessage.bind(this);
        }
      }
      if (this.socket.readyState == WebSocket.OPEN) {
        var message = JSON.stringify({i:1, c:20, d:0});
        // if(GameConfig.STATUS_EN_DE === 1) {
          message = Utility.gEncrypt(message);
        // }
        this.socket.send(message);
      } else {
        console.log("The socket is not open.")
      }
    },

    // updateCaptcha:function (path) {
    //     Utility.loadUrlImage(path, function (mcImage, texture) {
    //         mcImage.spriteFrame = new cc.SpriteFrame(texture);
    //     },[this.mcImage]);
    // },

    JSONstringify: function (json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, '\t');
        }

        var
            arr = [],
            _string = 'color:green',
            _number = 'color:darkorange',
            _boolean = 'color:blue',
            _null = 'color:magenta',
            _key = 'color:black';

        json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var style = _number;
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    style = _key;
                } else {
                    style = _string;
                }
            } else if (/true|false/.test(match)) {
                style = _boolean;
            } else if (/null/.test(match)) {
                style = _null;
            }
            arr.push(style);
            arr.push('');
            return '%c' + match + '%c';
        });

        arr.unshift(json);

        console.log.apply(console, arr);
    }
});
