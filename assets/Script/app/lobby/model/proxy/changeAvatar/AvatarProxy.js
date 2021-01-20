var BaseProxy = require("BaseProxy");
var AvatarVO = require('AvatarVO');

export default class AvatarProxy extends BaseProxy {
    static get NAME() {
      return 'AvatarProxy';
    }

    onRegister() {
      this.avatarVO = new AvatarVO();
      this.isGetAvatarList = false;
    }

    updateAvatarList(data) {
        this.avatarVO.updateAvatarList(data);
    }
}
