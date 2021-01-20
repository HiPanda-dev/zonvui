var BaseVO = require("BaseVO");
var FacebookVO = require('FacebookVO');
var GameConfig = require('GameConfig');
var ScreenLog = require('ScreenLog');

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: FacebookVO,
        constructor: function () {

        }
    },

    // INSTANCE MEMBERS
    {
        initialize: function () {
            if (!this.check_plugin()) {
                return
            }
            var self = this;
            sdkbox.PluginFacebook.init();
            sdkbox.PluginFacebook.setListener({
                onLogin: function (isLogin, msg) {
                    if (isLogin) {
                        cc.log("login scucess");
                        self.userID = sdkbox.PluginFacebook.getUserID();
                        self.accessToken = sdkbox.PluginFacebook.getAccessToken();

                        if (self.onLoginFBComplete) {
                            self.onLoginFBComplete(self.accessToken);
                        }
                    } else {
                        cc.log("login failed");
                    }
                }

            });

        },

        check_plugin: function () {
            if ('undefined' == typeof(sdkbox)) {
                cc.log('sdkbox is undefined');
                return false;
            }
            if ('undefined' == typeof(sdkbox.PluginFacebook)) {
                cc.log('sdkbox.PluginFacebook is undefined');
                return false;
            }

            return true;
        },


        login: function (onLoginFBComplete) {
            this.onLoginFBComplete = onLoginFBComplete;
            if (!this.check_plugin()) {
                return
            }

            if (sdkbox.PluginFacebook.isLoggedIn() && this.accessToken) {
                this.onLoginFBComplete(this.accessToken);
                return
            }
            sdkbox.PluginFacebook.login();
        },

        logout: function () {
            if (!this.check_plugin()) {
                return
            }

            if (!sdkbox.PluginFacebook.isLoggedIn()) {
                cc.log("you has already logout");
                return
            }

            sdkbox.PluginFacebook.logout();
        }

    },
    // STATIC MEMBERS
    {}
);