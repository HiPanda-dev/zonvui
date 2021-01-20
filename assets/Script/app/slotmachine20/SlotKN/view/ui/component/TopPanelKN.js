var Utility = require('Utility');
cc.Class({
    extends: cc.Component,

    properties: {
      ctnMenu1: cc.Node,
      ctnMenu2: cc.Node
    },

    onLoad () {
      this.txtMyMoney = this.ctnMenu1.getChildByName('txtMyMoney').getComponent(cc.Label);
      this.txtJackpot = this.ctnMenu1.getChildByName('txtJackpot').getComponent(cc.Label);

      this.curPos1 = new cc.Vec2(this.ctnMenu1.x, this.ctnMenu1.y);
      this.curPos2 = new cc.Vec2(this.ctnMenu2.x, this.ctnMenu2.y);
    },

    buildUI(root, gameVO) {
      this.gameVO = gameVO;
      this.onUpdateMyMoney(this.gameVO.money);
    },

    onUpdateMyAvatar(avatar) {
      // this.mcAvatarInfo.getComponent('Avatar').updateAvatarId(avatar);
    },

    onUpdateJackpot(roomJackPot) {
      Utility.tweenRunNumber(this.txtJackpot.node, roomJackPot, 1.5);
    },

    onUpdateMyMoney(money) {
      Utility.tweenRunNumber(this.txtMyMoney.node, money, 1.5);
    },

    onHandlerChangeMenu() {
      this.ctnMenu2.active = !this.ctnMenu2.active;
      if(this.ctnMenu2.active === true) {
        this.ctnMenu2.x = this.curPos2.x;
        TweenLite.from(this.ctnMenu2, 0.3, {x: -750});
      }else{
        TweenLite.to(this.ctnMenu2, 0.3, {x: -750, onComplete: function(){
          this.ctnMenu2.active = false;
        }.bind(this)});
      }
    },

    onHandlerToggleChoiThu() {
      this.gameVO.isChoiThu = !this.gameVO.isChoiThu;
    },

    onHandlerShowBangThuong() {
      this.node.emit('ACTIVE_SHOW_HELP_PANEL');
    },

    onHandlerShowRank() {
      this.node.emit('ACTIVE_RANK_PANEL');
    },

    onHandlerShowCashInForm() {
      this.node.emit('ACTIVE_SHOW_CASH_IN_FORM');
    },

    onHandlerBack() {
      this.node.emit('ACTIVE_LEAVE_GAME');
    }

});
