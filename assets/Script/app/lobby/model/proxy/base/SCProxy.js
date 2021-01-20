var BaseProxy = require('BaseProxy');
var GameConfig = require('GameConfig');
var LocalStorage = require('LocalStorage');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');
var i18n = require('i18n');
// var SCLobbyProxy = require('SCLobbyProxy');
// var StaticProxy = require('StaticProxy');
export default class SCProxy extends BaseProxy {
  static get NAME() {
    return 'SCProxy';
  }

  onRegister() {
    BaseProxy.prototype.onRegister.call(this);
  }

  addEventListener(socket) {
    this.socket = socket;
  }

  onMessage(event) {
    console.log('1111');
  }

  onMessageStatic(event) {

  }

  isShowLog(i, c) {
    if(c === 44) return false;
    if(i === 1 && c === 80) return false;
    if(i === 1 && c === 44) return false;

    if(i === 100 && c === 100) return false;

    return true;
  }

  isOnMessageError(event, moduleId, exception, notLog) {
    var data = Utility.gDecrypt(event.data);
    data = JSON.parse(data);


    if (data.i !== moduleId) return true;
    // this.sendNotification(LobbyMessage.HIDE_LOADING);
    //fake
    // if(data.i === 100) {
    //   console.log('%c[RECEIVE][' + data.c + ']: ' + new Date().toLocaleString(), 'color:orange');
    //   console.log(this.JSONstringify(data));
    // }
    ///////////////////////////////
    if (this.isShowLog(data.i, data.c)) {
      console.log('%c[RECEIVE][' + data.c + ']: ' + new Date().toLocaleString(), 'color:orange');
      console.log(this.JSONstringify(data));
    }

    ////////////////////////////
    if (exception && exception[data.c] !== undefined) {
      return false;
    }

    if (data.m !== '') {
      if (data.c === 12) { //tk dang nhap noi khac
        this.sendNotification(LobbyMessage.LOG_OUT);
      }
      this.sendNotification(LobbyMessage.SHOW_FLY_ALERT, {
        content: data.m
      });

      var mySelf = this.facade.retrieveProxy('UserProxy').mySelf;

      switch (data.c) {
        case 52: //SCLobbyProxy.Cmd.REGISTER
          if (cc.sys.isBrowser) {
            ga('send', 'event', 'Đăng ký', 'Đăng ký không thành công', mySelf.displayName);
          }
          break;
        case 212://StaticProxy.Cmd.SEND_CASH_OUT:
          if (cc.sys.isBrowser) {
            ga('send', 'event', 'Đổi thưởng', 'Đổi thưởng không thành công', mySelf.displayName);
          }
      }
      return true;
    }
    return false;
  }

  send(message) {
    if (!this.socket) {
      this.socket = window.webSocket;
    }
    if (this.socket.readyState == WebSocket.OPEN) {
      console.log('%c[SEND REQUEST]: ' + message.c, 'background: #222; color: #04FFEB');
      console.log(this.JSONstringify(message));
      message = JSON.stringify(message);
      // if(GameConfig.STATUS_EN_DE === 1) {
      message = Utility.gEncrypt(message);
      // }
      this.socket.send(message);
      // this.sendNotification(LobbyMessage.SHOW_LOADING);
    } else {
      console.log('The socket is not open.')
    }
  }
}
