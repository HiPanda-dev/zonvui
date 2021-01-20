var BaseProxy = require("BaseProxy");
var FacebookMobileVO = require('FacebookMobileVO');
var FacebookSdk = require('FacebookSdk');

export default class FacebookProxy extends BaseProxy {
    static get NAME() {
      return 'FacebookProxy';
    }

    onRegister() {
      if (cc.sys.os !== cc.sys.OS_IOS  && cc.sys.os !== cc.sys.OS_ANDROID)
          return;
      this.fb = new FacebookMobileVO();
      this.fb.initialize();
    }

    getFb(){
        return this.fb;
    }

    login(onLoginFBComplete) {
        if(!cc.sys.isNative){
          let Appid = '308567869849125';
          let scope = 'email,user_birthday,user_friends,user_gender,user_hometown,user_link,user_location';
          let sdk = new FacebookSdk(Appid, scope, (response) => {
             console.log(response);
             if (response.status === 200) {
               onLoginFBComplete(response.response.authResponse.accessToken);
             }
          });
        }else{
            this.fb.loginFBComplete = onLoginFBComplete;
            this.fb.login(onLoginFBComplete);
        }

    }

    logout() {
        if(!cc.sys.isNative){
            //window.logOut();
        }else{
            this.fb.logout();
        }

    }

    reset() {
        this.onRegister();
    }
}
