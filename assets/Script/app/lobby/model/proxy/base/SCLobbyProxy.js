var SCProxy = require("SCProxy");
var LobbyMessage = require("LobbyMessage");
var GameConfig = require("GameConfig");
var UserProxy = require('UserProxy');
var Utility = require("Utility");
var i18n = require('i18n');

export default class SCLobbyProxy extends SCProxy {
  static get NAME() {
    return 'SCLobbyProxy';
  }

  static get Cmd() {
    return {
      LOGIN: 50,
      LOG_OUT: 51,
      LOGIN_BY_TOKEN: 53,
      LOGIN_BY_FACEBOOK: 91,
      CHANGE_PASS: 54,
      REGISTER: 52,
      CHANGE_AVATAR: 55,
      LIST_JACK_POT: 44,
      GET_OTP_SECURITY_PHONE: 66,
      CONFIRM_OTP_PHONE: 67,
      GAME_ERROR: 12,
      GET_OTP: 68,
      SEND_TRANSFERDES: 81,
      CHECK_ACCOUNT_TRANSFERDES: 80,
      SEND_ACTIVE_PHONE: 71,
      GET_TRANSFERDES_MONEY: 49, // CHUYEN TIEN DEN USER
      NOTIFIES_MESSAGE1: 45,
      NOTIFIES_MESSAGE2: 46,
      COUNT_DOWN_TAIXIU: 43,
      INFO_LIST_TOURNAMENT: 110, //DANH SACH GIAI DAU
      INFO_TOURNAMENT: 111, // CHI TIET GIAI DAU
      TOP_TOURNAMENT: 112, // DANH SACH TOP TRONG GIAI DAU
      JOIN_TOURNAMENT: 113, // JOI VAO GIAI DAU
      TOURNAMENT_CLOSE: 114,
      UPDATE_ALIAS: 56 // JOI VAO GIAI DAU
    }
  }

  onRegister() {
    SCProxy.prototype.onRegister.call(this);
    this.moduleId = GameConfig.MODULE_ID_LOBBY;
  }

  onMessage(event) {
    var exception = [];
    exception[SCLobbyProxy.Cmd.CHECK_ACCOUNT_TRANSFERDES] = true;
    exception[SCLobbyProxy.Cmd.LIST_JACK_POT] = true;
    var data = JSON.parse(Utility.gDecrypt(event.data));

    if (this.isOnMessageError(event, this.moduleId)) {

      return;
    }
    switch (data.c) {
      case SCLobbyProxy.Cmd.LOGIN:
      case SCLobbyProxy.Cmd.LOGIN_BY_TOKEN:
      case SCLobbyProxy.Cmd.LOGIN_BY_FACEBOOK:
        this.sendNotification(LobbyMessage.RECEIVE_LOGIN, {
          data: data.d
        });
        break;
      case SCLobbyProxy.Cmd.REGISTER:
        this.sendNotification(LobbyMessage.RECEIVE_REGISTER, {
          data: data.d
        });
        break;
      case SCLobbyProxy.Cmd.CHANGE_PASS:
        this.sendNotification(LobbyMessage.RECEIVE_CHANGE_PASS, {
          data: data.d
        });
        break;
      case SCLobbyProxy.Cmd.CHANGE_AVATAR:
        this.sendNotification(LobbyMessage.RECEIVE_CHANGE_AVATAR, {
          data: data.d
        });
        break;
      case SCLobbyProxy.Cmd.LIST_JACK_POT:
        this.sendNotification(LobbyMessage.ON_UPDATE_LIST_JACKPOT, {
          data: data.d
        });
        break;
      case SCLobbyProxy.Cmd.GET_OTP_SECURITY_PHONE:
        this.sendNotification(LobbyMessage.RECEIVE_SECURITY_PHONE, {
          data: data.d
        });
        break;
      case SCLobbyProxy.Cmd.CONFIRM_OTP_PHONE:
        this.sendNotification(LobbyMessage.RECEIVE_COMFIRM_OTP_PHONE, {
          data: data.d
        });
        break;
      case SCLobbyProxy.Cmd.SEND_TRANSFERDES:
        this.sendNotification(LobbyMessage.RECEIVE_TRANSFERDES, {
          data: data.d
        });
        break;
      case SCLobbyProxy.Cmd.CHECK_ACCOUNT_TRANSFERDES:
        this.sendNotification(LobbyMessage.RECEIVE_CHECK_ACCOUNT_TRANSFERDES, {
          data: data
        });
        break;
      case SCLobbyProxy.Cmd.SEND_ACTIVE_PHONE:
        this.sendNotification(LobbyMessage.RECEIVE_ACTIVE_ACCOUNT_KIT, {
          data: data.d
        });
        break;
      case SCLobbyProxy.Cmd.GET_TRANSFERDES_MONEY:
        this.getTransferdesMoney(data.d);
        break;
      case SCLobbyProxy.Cmd.NOTIFIES_MESSAGE1:
        this.sendNotification(LobbyMessage.RECEIVE_GET_NOTIFIES, {
          data: data.d,
          type: 1
        });
        break;
      case SCLobbyProxy.Cmd.NOTIFIES_MESSAGE2:
        this.sendNotification(LobbyMessage.RECEIVE_GET_NOTIFIES, {
          data: data.d,
          type: 2
        });
        break;
      case SCLobbyProxy.Cmd.COUNT_DOWN_TAIXIU:
        this.sendNotification(LobbyMessage.ON_UPDATE_COUNDOWN_TAIXIU, {
          data: data.d
        });
        break;
      case SCLobbyProxy.Cmd.INFO_LIST_TOURNAMENT:
        this.receiveInfoListTournament(data.d);
        break;
      case SCLobbyProxy.Cmd.INFO_TOURNAMENT:
        this.receiveInfoTournament(data.d);
        break;
      case SCLobbyProxy.Cmd.TOP_TOURNAMENT:
        this.receiveGetTopTournament(data.d);
        break;
      case SCLobbyProxy.Cmd.JOIN_TOURNAMENT:
        this.receiveJoinTournament(data.d);
        break;
      case SCLobbyProxy.Cmd.TOURNAMENT_CLOSE:
        this.receiveCloseTournament();
        break;
      case SCLobbyProxy.Cmd.UPDATE_ALIAS:
        this.sendNotification(LobbyMessage.RECEIVE_SET_NICK_NAME, {
          data: data.d
        });
        break;
      case SCLobbyProxy.Cmd.LOG_OUT:
        this.receiveLogOut(data.d);
        break;
      default:

    }
  }

  receiveLogOut(params) {
  }

  receiveGetTopTournament(params) {
    this.sendNotification(LobbyMessage.RECEIVE_GET_TOP_TOURNAMENT, params);

  }

  receiveJoinTournament(params) {
    this.sendNotification(LobbyMessage.RECEIVE_JOIN_TOURNAMENT, params);
  }

  receiveInfoListTournament(params) {
    var tournament = this.facade.retrieveProxy('TournamentProxy');
    tournament.setListTournament(params);
    this.sendNotification(LobbyMessage.RECEIVE_GET_INFO_LIST_TOURNAMENT);
  }

  receiveInfoTournament(params) {
    /*
      f: 3000  //phe
      id: 0   //id tour
      m: 100  // total player
      n: 0    // numplayer
      o: 0    // dang trong giai hay ko
      rId: 2
      v: (3) [500000, 200000, 100000]  //giai dau
    */

    var data = {
      moduleId: params.mId,
      tax: params.f, // phế
      tourId: params.id,
      maxPlayer: params.m,
      numPlayer: params.n,
      myPos: params.o, // dang trong giai hay ko
      roomId: params.rId,
      prizes: params.v, //list giai
    }

    this.sendNotification(LobbyMessage.RECEIVE_GET_INFO_TOURNAMENT, data);
  }

  receiveCloseTournament() {
    this.sendNotification(LobbyMessage.RECEIVE_CLOSE_TOURNAMENT);
  }

  getTransferdesMoney(params) {
    var dataUser = this.facade.retrieveProxy(UserProxy.NAME);
    this.dataUser.mySelf.money = params.b;
    this.dataUser.mySelf.point = params.p;
    this.dataUser.mySelf.vip = params.v;
    this.dataUser.mySelf.exp = params.e;
    this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
  }

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  login(params) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.LOGIN,
      d: params
    }
    this.send(data);
  }

  logout() {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.LOG_OUT,
      d: ''
    }
    this.send(data);

    setTimeout(function() {
      this.sendNotification(LobbyMessage.CONNECT_NETWORK);
    }.bind(this), 1000);
  }


  changeAvatar(params) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.CHANGE_AVATAR,
      d: params
    }

    this.send(data);
  }

  register(params) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.REGISTER,
      d: params
    }

    this.send(data);
  }

  changePassword(params) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.CHANGE_PASS,
      d: params
    }

    this.send(data);
  }

  loginByToken(params) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.LOGIN_BY_TOKEN,
      d: params
    }

    this.send(data);
  }

  loginViaFaceBook(params) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.LOGIN_BY_FACEBOOK,
      d: params
    }

    this.send(data);
  }

  sendGetOTPSecurityPhone(phone) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.GET_OTP_SECURITY_PHONE,
      d: phone
    }

    this.send(data);
  }

  sendConfirmOtpPhonePhone(params) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.CONFIRM_OTP_PHONE,
      d: params
    }

    this.send(data);
  }

  sendGetOTP() {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.GET_OTP,
      d: ''
    }

    this.send(data);
  }

  sendCheckAccountTransferdes(displayName) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.CHECK_ACCOUNT_TRANSFERDES,
      d: displayName
    }

    this.send(data);
  }

  sendTransferdes(params) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.SEND_TRANSFERDES,
      d: params
    }

    this.send(data);
  }

  sendActivePhone(params) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.SEND_ACTIVE_PHONE,
      d: params
    }

    this.send(data);
  }

  sendGetInfoListTournament() {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.INFO_LIST_TOURNAMENT,
      d: ''
    }

    this.send(data);
  }

  sendGetInfoTournament(params) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.INFO_TOURNAMENT,
      d: params
    }

    this.send(data);
  }

  sendGetTopTournament(params) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.TOP_TOURNAMENT,
      d: params
    }

    this.send(data);
  }

  sendJoinTournament(params) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.JOIN_TOURNAMENT,
      d: params
    }

    this.send(data);
  }

  sendUpdateAlias(params) {
    var data = {
      i: this.moduleId,
      c: SCLobbyProxy.Cmd.UPDATE_ALIAS,
      d: params
    }

    this.send(data);
  }
}
