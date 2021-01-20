var Constants = require('Constants');
var LocalStorage = {
    setUserName: function (userName) {
        var ls = cc.sys.localStorage;
        ls.setItem("userName", userName);
    },

    getUserName: function () {
        var ls = cc.sys.localStorage;
        return ls.getItem("userName");
    },

    setSound: function (isOn) {
        var ls = cc.sys.localStorage;
        ls.setItem("sound", isOn);
    },

    getSound: function () {
        var ls = cc.sys.localStorage;
        if (ls.getItem("sound") === undefined || ls.getItem("music") === null)
            ls.setItem("sound", true);
        return ls.getItem("sound");
    },

    setMusic: function (isOn) {
        var ls = cc.sys.localStorage;
        ls.setItem("music", isOn);
    },

    getMusic: function () {
        var ls = cc.sys.localStorage;
        if (ls.getItem("music") === undefined || ls.getItem("music") === null)
            ls.setItem("music", true);
        return ls.getItem("music");
    },

    setPassword: function (password) {
        var ls = cc.sys.localStorage;
        ls.setItem("password", password);
    },

    getPassword: function () {
        var ls = cc.sys.localStorage;
        return ls.getItem("password");
    },

    setIsSocial: function (isSocial) {
        var ls = cc.sys.localStorage;
        ls.setItem("isSocial", isSocial);
    },

    getIsSocial: function () {
        var ls = cc.sys.localStorage;
        return ls.getItem("isSocial");
    },

    setMode: function (channelMoney) {
        var ls = cc.sys.localStorage;
        ls.setItem("mode", channelMoney);
    },

    getMode: function () {
        //var ls = cc.sys.localStorage;
        //var mode = (ls.getItem("mode") === null) ? "MONEY" : ls.getItem("mode");
        //return mode;

        return "MONEY";
    },

    setTableStyle: function (style) {
        var ls = cc.sys.localStorage;
        ls.setItem("style", style);
    },

    getTableStyle: function () {
        var ls = cc.sys.localStorage;
        var mode = (ls.getItem("style") === null) ? "NONE" : ls.getItem("style");
        return mode;
    },


    //lưu lại thời gian reconnect trong TH bắt đầu chơi
    setIsReconnect: function (isReconnect) {
        var ls = cc.sys.localStorage;
        if(!isReconnect){
            cc.sys.localStorage.removeItem('reconnect');
        }else{
            ls.setItem("reconnect", JSON.stringify({channelId:Constants.CURRENT_GAME}));
        }

    },

    getIsReconnect: function () {
        var ls = cc.sys.localStorage;
        return ls.getItem("reconnect");
    },

    setItemSound: function (sound) {
        var ls = cc.sys.localStorage;
        ls.setItem(sound.name , sound.value);
    },

    getItemSound: function (soundName) {
        var ls = cc.sys.localStorage;
        return ls.getItem(soundName);
    },

    setToken: function (token) {
        var ls = cc.sys.localStorage;
        ls.setItem('token' , token);
    },

    getToken: function (token) {
        var ls = cc.sys.localStorage;
        return ls.getItem('token');
    },

    setLanguage: function (language) {
      var ls = cc.sys.localStorage;
      ls.setItem('language' , language);
    },

    getLanguage: function (token) {
        var ls = cc.sys.localStorage;
        var language = ls.getItem('language');
        if(language === undefined || language === null) {
          language = 'vi'
          this.setLanguage('vi')
        }
        return language;
    }

};

module.exports = LocalStorage;
