var BaseProxy = require('BaseProxy');
var UserVO = require('UserVO');
var GameConfig = require('GameConfig');

export default class UserProxy extends BaseProxy {
    static get NAME() {
      return 'UserProxy';
    }

    onRegister() {
      this.userList = [];
      this.userListPrefix = [];
      this.mySelf = new UserVO();
      this.mySelf.onRegister();
    }

    reset() {
      this.onRegister();
    }

    updateMySelf(data) {
      this.mySelf.updateData(data);
      GameConfig.DISPLAY_NAME = this.mySelf.displayName;
    }

    addMyself(user /*<UserVO>*/ ) {
      this.mySelf = user;
      this.userList[user.uid] = user;
      GameConfig.DISPLAY_NAME = this.mySelf.displayName;
    }

    addUser(user /*<UserVO>*/ ) {
      this.userList[user.uid] = user;
    }

    adPrefixUser(user) {
      if (user.userName !== '') this.userListPrefix[user.userName] = user;
    }

    removeUser(userName) {
      for (var i = 0; i < this.userList.length; i++) {
        if (this.userList[i].userName === userName) {
          this.userList.splice(i, 1);
          return;
        }
      }
    }

    getUserById(uid) {
      if (this.mySelf.uid === uid) return this.mySelf;
      return this.userList[uid];
    }

    getUserByUserName(prefixId) {
      return this.userListPrefix[prefixId];
    }

    resetMyself() {
      this.mySelf = new UserVO();
      GameConfig.DISPLAY_NAME = "";
    }

    reset() {
      this.userList = [];
      this.userListPrefix = [];
      this.mySelf = new UserVO();
    }
}
