var BaseCommand = require('BaseCommand');
var SlotMessage = require('SlotMessage');
var LobbyMessage = require('LobbyMessage');
var Slot20VO = require('Slot20VO');
var SlotKNProxy = require('SlotKNProxy');
var UserProxy = require('UserProxy');
var i18n = require('i18n');

export default class ReceiveSpinKNCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    this.gameVO = notification.getBody().data;
    if (this.gameVO.typeResult === Slot20VO.ERROR) {
      this.gameVO.isSpining = false;
      this.gameVO.autoSpin = false;
      this.sendNotification(SlotMessage.ON_SHOW_MESSAGE_KEO_NGOT, {message: this.gameVO.errorMessage});
      this.sendNotification(SlotMessage.ON_SET_AUTO_SPIN_KEO_NGOT, {
        autoSpin: false
      });
    } else {
      this.dataUser = this.facade.retrieveProxy(UserProxy.NAME);
      if (this.gameVO.isChoiThu === false) {
        this.dataUser.mySelf.money -= this.gameVO.getTotalBet();
        this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
      }
      this.sendNotification(SlotMessage.ON_SPIN_AND_RESULT_KEO_NGOT, {
        items: this.gameVO.items,
        onComplete: this.onComplete.bind(this)
      });
    }
  }

  onComplete() {
    if (this.gameVO.wins.length === 0) {
      this.gameVO.isSpining = false;
      this.checkHasAutoSpin(function() {}.bind(this));
    } else {
      this.winIndex = 0;
      this.playNomalWin(this.gameVO.wins[this.winIndex])
    }
  }

  playNomalWin(win) {
    this.checkHasFreeSpin(win, function() {
      this.checkHasJackpot(win, function() {
        this.checkHasNomalWin(win, function() {
          this.dataUser.mySelf.money = this.gameVO.money;
          this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
          this.checkHasAutoSpin(function() {}.bind(this));
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }

  checkHasAutoSpin(callBack) {
    if (this.gameVO.autoSpin || this.gameVO.isFreeSpin) {
      setTimeout(function() {
        if (this.gameVO.autoSpin) {
          this.gameVO.curNumAutoSpin--;
          this.sendNotification(SlotMessage.ON_SET_NUM_AUTO_SPIN_KEO_NGOT, {num: this.gameVO.curNumAutoSpin});
        }
        this.sendNotification(SlotMessage.ON_HIDE_ALL_LINE_KEO_NGOT);
        this.sendNotification(SlotMessage.ON_HIDE_EFFECT_WIN_KEO_NGOT);
        this.sendNotification(SlotMessage.SEND_SPIN_KEO_NGOT, {data: this.gameVO.prevDataSpin});
      }.bind(this), 1000);
    } else {
      callBack.call();
    }
  }

  checkHasNomalWin(win, callBack) {
    this.sendNotification(SlotMessage.ON_SHOW_LINE_WIN_KEO_NGOT, {ls: win.ls});
    setTimeout(function() {
      setTimeout(function() {
        this.sendNotification(SlotMessage.ON_HIDE_ALL_LINE_KEO_NGOT);
      }.bind(this), 200);
      this.sendNotification(SlotMessage.ON_SHOW_EFFECT_ITEM_WIN_KEO_NGOT, {ls: win.ls});
      this.sendNotification(SlotMessage.ON_UPDATE_LEVEL_KEO_NGOT, {level: this.winIndex});
      if (this.gameVO.wins.length === this.winIndex + 1) {
        setTimeout(function() {
          this.gameVO.isSpining = false;
          callBack.call();
        }.bind(this), 2000);
      } else {
        setTimeout(function() {
          this.winIndex++;
          this.playNomalWin(this.gameVO.wins[this.winIndex]);
        }.bind(this), 2000);
      }
    }.bind(this), 500);
  }

  checkHasFreeSpin(win, callBack) {
    if (win.fs > 0) {
      this.gameVO.isFreeSpin = true;
      this.gameVO.freeSpin += win.fs;

      this.sendNotification(SlotMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_KEO_NGOT);
      this.sendNotification(SlotMessage.ON_PLAY_ANIM_SCATTER_KEO_NGOT);
      setTimeout(function() {
        this.sendNotification(SlotMessage.ON_SHOW_EFFECT_FREE_SPIN_KEO_NGOT, {win: win});
        setTimeout(function() {
          this.sendNotification(SlotMessage.ON_HIDE_EFFECT_WIN_KEO_NGOT, {win: win});
          setTimeout(function() {
            callBack.call();
          }, 1000);
        }.bind(this), 3000);
      }.bind(this), 1500);

    } else {
      callBack.call();
    }
  }

  checkHasJackpot(win, callBack) {
    this.sendNotification(SlotMessage.ON_HIDE_ALL_EFFECT_ITEM_WIN_KEO_NGOT);
    if (win.jp > 0) {
      this.sendNotification(SlotMessage.ON_PLAY_ANIM_JACKPOT_KEO_NGOT);
      setTimeout(function() {
        // this.sendNotification(SlotMessage.ON_SHOW_LINE_WIN_KEO_NGOT, {ls: win.ls});
        this.sendNotification(SlotMessage.ON_SHOW_EFFECT_JACKPOT_KEO_NGOT, {win: win});
        setTimeout(function() {
          this.sendNotification(SlotMessage.ON_HIDE_EFFECT_WIN_KEO_NGOT);
          callBack.call();
        }.bind(this), 2000);
      }.bind(this), 2000);
    } else {
      callBack.call();
    }
  }
}
