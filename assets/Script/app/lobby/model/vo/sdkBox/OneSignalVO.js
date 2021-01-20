var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.userID = undefined;
            this.partnerId = undefined;
            this.userName = undefined;
            this.vip = undefined;
        }
    },

    // INSTANCE MEMBERS
    {
        initialize: function () {
            if (!this.check_plugin()) {
                return
            }
            console.log("initialize OneSignal");

            if (cc.sys.os !== cc.sys.OS_IOS  && cc.sys.os !== cc.sys.OS_ANDROID)
                return;

            sdkbox.PluginOneSignal.init();
            sdkbox.PluginOneSignal.setListener
            ({
                onSendTag: function (success, key, message) { },
                onGetTags: function (jsonString) { },
                onIdsAvailable: function (userId,  pushToken) { },
                onPostNotification: function (success,  message) { },
                onNotification: function (isActive,  message, additionalData) { }
            });

        },

        check_plugin: function () {
            if ('undefined' == typeof(sdkbox)) {
                cc.log('sdkbox is undefined');
                return false;
            }

            return true;
        },

        setUserInfo:function (userName, email, platform) {
            cc.log("cc.sys.os: " + cc.sys.os);
            if (cc.sys.os !== cc.sys.OS_IOS  && cc.sys.os !== cc.sys.OS_ANDROID)
                return;

            if (email)
                sdkbox.PluginOneSignal.setEmail(email);
            sdkbox.PluginOneSignal.sendTag("userName", userName);
            sdkbox.PluginOneSignal.sendTag("platform", platform);
        }

    },
    // STATIC MEMBERS
    {}
);