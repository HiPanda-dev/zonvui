var BaseVO = require("BaseVO");
var FacebookVO = require('FacebookVO');
var GameConfig = require('GameConfig');
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
        initialize:function () {
            // FB.init( {
            //     appId: GameConfig.FACEBOOK_APP_ID, // App ID
            //     channelUrl : GameConfig.LINK_WEB, // Channel File
            //     status	: true, // check login status
            //     cookie: true, // enable cookies to allow the server to access the session
            //     oauth: true, // enable OAuth 2.0
            //     xfbml: true	 // parse XFBML
            // } );
            // FB.apiDidInit = true;
        },

        login:function () {
            // var self = this;
            // FB.getLoginStatus(function(response) {
            //     if (response.status === 'connected') {
            //         console.log('Logged in.');
            //     }
            //     else {
            //         FB.login();
            //     }
            // });
        },

        logOut: function () {
            // FB.logout(function(response) {
            //     // user is now logged out
            // });
        }
    },
    // STATIC MEMBERS
    {}
);