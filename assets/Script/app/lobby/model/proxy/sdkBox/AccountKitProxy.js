var BaseProxy = require("BaseProxy");
var GameConfig = require("GameConfig");
export default class AccountKitProxy extends BaseProxy {
    static get NAME() {
      return 'AccountKitProxy';
    }

    onRegister() {
      if(cc.sys.isBrowser){
        AccountKit.init({
            appId: GameConfig.FACEBOOK_APP_ID,
            state: GameConfig.ACCOUNTKIT_STATE,
            version: 'v1.1',
            fbAppEventsEnabled: true,
            debug: true
        });
      }
    }

    sendSMS(callback, code, phone) {
      if(cc.sys.isBrowser){
        var countryCode = "";
        var phoneNumber = "";
        AccountKit.login(
          'PHONE',
          {countryCode: countryCode, phoneNumber: phoneNumber},
          callback
        );
      }else{
        window.callbacSMSkAccoutKit = callback;
        jsb.reflection.callStaticMethod('org/cocos2dx/javascript/AppActivity', 'sendSMS', "(Ljava/lang/String;Ljava/lang/String;)V", "countryCode", "phoneNumber");
      }
    }

    // email form submission handler
    emailLogin(callback) {
      if(cc.sys.isBrowser){
        var emailAddress = document.getElementById("email").value;
        AccountKit.login(
          'EMAIL',
          {emailAddress: emailAddress},
          callback
        );
      }
    }
}
