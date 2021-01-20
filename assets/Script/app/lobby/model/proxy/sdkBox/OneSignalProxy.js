var BaseProxy = require("BaseProxy");
var OneSignalVO = require("OneSignalVO");

export default class OneSignalProxy extends BaseProxy {
    static get NAME() {
      return 'OneSignalProxy';
    }

    onRegister() {
      if (cc.sys.os !== cc.sys.OS_IOS  && cc.sys.os !== cc.sys.OS_ANDROID)
          return;
      //this.oneSignal = new OneSignalVO();
      //this.oneSignal.initialize();
    }

    getOneSignal(){
        return this.oneSignal;
    }


    // setUserInfo(userName, email, platform) {
    //     cc.log("cc.sys.os: " + cc.sys.os);
    //     if (cc.sys.os !== cc.sys.OS_IOS  && cc.sys.os !== cc.sys.OS_ANDROID)
    //         return;
    //
    //     if (email)
    //         sdkbox.PluginOneSignal.setEmail(email);
    //     sdkbox.PluginOneSignal.sendTag("userName", userName);
    //     sdkbox.PluginOneSignal.sendTag("platform", platform);
    // }

    reset() {
        this.onRegister();
    }
}
