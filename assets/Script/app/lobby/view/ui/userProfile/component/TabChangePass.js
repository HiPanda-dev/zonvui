var Captcha = require('Captcha');
var EditboxLocalized = require('EditboxLocalized');
cc.Class({
    extends: cc.Component,

    properties: {
        mcOldPass: cc.Node,
        mcNewPass: cc.Node,
        mcReNewPass: cc.Node,
        mcCaptcha: Captcha,
        txtError: cc.Label,
        txtCaptcha:EditboxLocalized,
    },

    // use this for initialization
    onLoad: function () {
      this.txtOldPass = this.mcOldPass.getChildByName("txtInput").getComponent(cc.EditBox);
      this.txtNewPass = this.mcNewPass.getChildByName("txtInput").getComponent(cc.EditBox);
      this.txtReNewPass = this.mcReNewPass.getChildByName("txtInput").getComponent(cc.EditBox);
      this.txtError.node.active = false;
      this.mcCaptcha.refeshCaptcha();
    },

    dataURLtoFile: function(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    },


    onHandlerChangePass: function() {
      var data = {
        oldPass: this.txtOldPass.string,
        newPass: this.txtNewPass.string,
        reNewPass: this.txtReNewPass.string,
        captcha: this.txtCaptcha.string,
      }
      this.node.emit('ACTIVE_CHANGE_PASS', data);
      setTimeout(function(){
        this.mcCaptcha.refeshCaptcha();
      }.bind(this), 1000);

    }
});
