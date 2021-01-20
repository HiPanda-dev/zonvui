var GameConfig = require('GameConfig');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');
var puremvc = window.puremvc;

export default class BaseProxy extends puremvc.Proxy {
    onRegister() {
        this.isLoadDone = false;
        this.queueMsg = [];

        this.commandList = [];
        this.proxyList = [];
        this.mediatorList = [];
    }
    
    JSONstringify(json) {
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
}

// module.exports = puremvc.define
// (
//     // CLASS INFO
//     {
//         parent: puremvc.Proxy,
//         constructor: function (name) {
//             puremvc.Proxy.call(this, name);
//
//             this.isLoadDone = false;
//             this.queueMsg = [];
//
//             this.commandList = [];
//             this.proxyList = [];
//             this.mediatorList = [];
//         }
//     },
//
//     // INSTANCE MEMBERS
//     {
//         isOnMessageError: function(event, moduleId) {
//           var data = JSON.parse(event.data);
//           if(data.i !== moduleId) return;
//           console.log("%c[RECEIVE][" + data.c + "]: " + new Date().toLocaleString(), "color:orange");
//           console.log(this.JSONstringify(data));
//           if(data.m !== "") {
//             this.sendNotification(LobbyMessage.SHOW_FLY_ALERT,{content:data.m});
//             return true;
//           }
//
//           return false;
//         },
//
//         send: function(message) {
//           if (!this.socket) { return; }
//           if (this.socket.readyState == WebSocket.OPEN) {
//             console.log('%c[SEND REQUEST]: ' + message.c, 'background: #222; color: #04FFEB');
//             console.log(this.JSONstringify(message));
//             message = JSON.stringify(message);
//             if(GameConfig.STATUS_EN_DE === 1) {
//               message = Utility.gEncrypt(message);
//             }
//             this.socket.send(message);
//           } else {
//             console.log("The socket is not open.")
//           }
//         },
//
//         JSONstringify: function (json) {
//             if (typeof json != 'string') {
//                 json = JSON.stringify(json, undefined, '\t');
//             }
//
//             var
//                 arr = [],
//                 _string = 'color:green',
//                 _number = 'color:darkorange',
//                 _boolean = 'color:blue',
//                 _null = 'color:magenta',
//                 _key = 'color:black';
//
//             json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
//                 var style = _number;
//                 if (/^"/.test(match)) {
//                     if (/:$/.test(match)) {
//                         style = _key;
//                     } else {
//                         style = _string;
//                     }
//                 } else if (/true|false/.test(match)) {
//                     style = _boolean;
//                 } else if (/null/.test(match)) {
//                     style = _null;
//                 }
//                 arr.push(style);
//                 arr.push('');
//                 return '%c' + match + '%c';
//             });
//
//             arr.unshift(json);
//
//             console.log.apply(console, arr);
//         },
//
//         logSFSObject: function (sfsObject, space) {
//             var arrKey = sfsObject.getKeysArray();
//             console.log(space + "{");
//             for (var i = 0; i < arrKey.length; i++) {
//                 var key = arrKey[i];
//                 var data = sfsObject.get(key);
//                 if (data instanceof SFS2X.SFSObject) {
//                     space += "   ";
//                     this.logObject(data, space);
//                 } else {
//                     console.log(space + "   " + key + ": " + data);
//                 }
//             }
//             console.log(space + "}");
//         },
//
//         logObject: function (object) {
//             console.log("{");
//             for (var key in object) {
//                 console.log("   " + key + ": " + object[key]);
//             }
//             console.log("}");
//         }
//     },
//     // STATIC MEMBERS
//     {
//         puremvc: puremvc,
//         NAME: 'BaseProxy'
//     }
// );
