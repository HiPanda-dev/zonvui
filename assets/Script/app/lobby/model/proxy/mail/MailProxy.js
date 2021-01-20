var BaseProxy = require("BaseProxy");
var MailVO = require('MailVO');

export default class MailProxy extends BaseProxy {
    static get NAME() {
      return 'MailProxy';
    }

    onRegister() {
      this.isGetSupport = false;
      this.isGetSupportInfo = false;
      this.mailVo = new MailVO();
    }

    updateMailList(data) {
        this.mailVo.updateMailList(data);
    }

    updateMailDetail(data) {
        this.mailVo.updateMailDetail(data);
    }

    updateSupportList(data) {
        this.mailVo.updateSupportList(data);
    }

    updateSupportInfo(data) {
        this.mailVo.updateSupportInfo(data);
    }

    updateSupportAnswer(data) {
        this.mailVo.updateSupportAnswer(data);
    }

    updateSendSupport(data) {
        this.mailVo.updateSendSupport(data);
    }

    updateSupportDetail(data) {
        this.mailVo.updateSupportDetail(data);
    }

    reset() {
        this.isGetSupport = false;
        this.isGetSupportInfo = false;
        this.mailVo = new MailVO();
    }
}
