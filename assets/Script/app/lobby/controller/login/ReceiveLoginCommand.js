var UserVO = require('UserVO');
var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var SoundGameMessage = require('SoundGameMessage');
var LocalStorage = require('LocalStorage');
var Constants = require('Constants');
var MiniGameMessage = require('MiniGameMessage');

export default class ReceiveLoginCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    if (this.isError(notification.getBody().data)) return;
    this.resetSetAllData();
    var params = notification.getBody().data;
    var userProxy = this.facade.retrieveProxy('UserProxy');
    var configProxy = this.facade.retrieveProxy('ConfigProxy');
    var userVO = new UserVO();

    userProxy.reset();
    configProxy.reset();

    userVO.updateData(params);
    userProxy.addMyself(userVO);

    LocalStorage.setToken(userVO.token);
    this.staticProxy = this.facade.retrieveProxy("StaticsicProxy");
    this.staticProxy.joinGame();

    if(userVO.displayName === ''){
        this.sendNotification(LobbyMessage.SHOW_FACEBOOK_VALIDATE_SCENE);
    }
    if (cc.sys.isBrowser)
        ga('send', 'event', 'Đăng nhập', userVO.displayName);

    this.sendNotification(LobbyMessage.HIDE_LOGIN_SCENE);
    this.sendNotification(LobbyMessage.HIDE_REGISTER_SCENE);
    this.sendNotification(LobbyMessage.SHOW_SELECT_GAME_SCENE);
    this.sendNotification(LobbyMessage.SHOW_TOP_MENU);
    this.sendNotification(LobbyMessage.SHOW_BOTTOM_MENU);
    this.sendNotification(LobbyMessage.SHOW_EVENT_BANNER_SCENE);
    this.sendNotification(LobbyMessage.PLAY_BACKGROUND_MUSIC, {soundName: SoundGameMessage.LOBBY_SOUND, volume: 1});
    this.sendNotification(LobbyMessage.ON_UPDATE_AVATAR);
    this.sendNotification(MiniGameMessage.SEND_JOIN_MINIGAME, Constants.MINIGAME_TAI_XIU);
  }

  resetSetAllData(){
      var giftProxy = this.facade.retrieveProxy('GiftProxy');
      var mailProxy = this.facade.retrieveProxy('MailProxy');
      var rechargeProxy = this.facade.retrieveProxy('RechargeProxy');
      var shopProxy = this.facade.retrieveProxy('ShopProxy');
      var userProxy = this.facade.retrieveProxy('UserProxy');


      giftProxy.reset();
      mailProxy.reset();
      rechargeProxy.reset();
      shopProxy.reset();
      userProxy.reset();
  }
}
