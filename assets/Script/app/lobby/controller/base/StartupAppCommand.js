var BaseCommand = require('BaseCommand');
var LocalStorage = require('LocalStorage');
var ConfigProxy = require('ConfigProxy');
var UserProxy = require('UserProxy');
var ChannelProxy = require('ChannelProxy');
var RoomProxy = require('RoomProxy');
var RechargeProxy = require('RechargeProxy');
var FacebookProxy = require('FacebookProxy');
var ShopProxy = require('ShopProxy');
var EventProxy = require('EventProxy');
var GiftProxy = require('GiftProxy');
var AgentProxy = require('AgentProxy');
var NotifiesProxy = require('NotifiesProxy');
var OneSignalProxy = require('OneSignalProxy');
var HttpRequestProxy = require('HttpRequestProxy');
var LobbyMessage = require('LobbyMessage');
var MiniGameMessage = require('MiniGameMessage');
var SFSMessage = require('SFSMessage');
var MailProxy = require('MailProxy');
var StaticsicProxy = require('StaticsicProxy');
var SCLobbyProxy = require('SCLobbyProxy');
var TournamentProxy = require('TournamentProxy');
var SlotLCProxy = require('SlotLCProxy');
var SlotKNProxy = require('SlotKNProxy');
var MiniPokerProxy = require('MiniPokerProxy');
var Slot3x3Proxy = require('Slot3x3Proxy');
var VongQuayProxy = require('VongQuayProxy');
var TaiXiuProxy = require('TaiXiuProxy');
var AvatarProxy = require('AvatarProxy');
var AccountKitProxy = require('AccountKitProxy');
var Constants = require('Constants');

var i18n = require('i18n');

export default class StartupAppCommand extends BaseCommand {
  execute(notification) {
    console.log("StartupAppCommand");
    window.listNetWorkProxy = [];
    //register command
    this.facade.registerCommand(LobbyMessage.SEND_LOGIN, require('SendLoginCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_TOKEN_LOGIN, require('SendTokenLoginCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_FACEBOOK_LOGIN, require('SendFacebookLoginCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_REGISTER, require('SendRegisterCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_CHANNEL_INFO, require('SendGetChannelInfoCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_CREATE_ROOM, require('SendCreateRoomCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_LEAVE_CHANNEL, require('SendLeaveChannelCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_JOIN_CHANNEL, require('SendJoinChannelCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_JOIN_GAME, require('SendJoinGameCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_QUICK_JOIN_GAME, require('SendQuickJoinGameCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_TOP_PLAY, require('SendGetTopPlayCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GAME_ERROR, require('GameErrorCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_USER_INFO, require('SendGetUserInfoCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_AGENT_INFO, require('SendGetAgentInfoCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_MOBILE_CARD_RECHARGE, require('SendMobileCardRechargeCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_BUY_ITEM_SHOP, require('SendBuyItemShopCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_ALL_CURRENT_EVENT, require('SendGetAllCurrentEventCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_LIST_CARD_PAY_BACK, require('SendGetListCardPayBackCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_USE_GIFT_CODE, require('SendUseGiftCodeCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_CHAT, require('SendChatCommand'));
    //this.facade.registerCommand(LobbyMessage.SEND_GET_CHAT_DATA, require('SendGetChatDataCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_NOTIFIES, require('SendGetNotifiesCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_OUT_CARD_INFO, require('SendGetCashOutCardInfoCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_CASH_OUT_CARD, require('SendCashOutCardCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_CHECK_ACCOUNT_TRANSFERDES, require('SendCheckAccountTransferdesCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_TRANSFERDES, require('SendTransferdesCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_INFO_CARD_PAY_BACK, require('SendGetInfoCardPayBackCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_RECHARGE_INFO, require('SendGetRechargeInfoCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_CHANGE_MODE_GAME, require('SendChangeModeGameCommand'));

    this.facade.registerCommand(LobbyMessage.SEND_GET_MAIL_LIST, require('SendGetMailListCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_DELETE_MAIL, require('SendDeleteMailCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_MAIL_DETAIL, require('SendGetMailDetailCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_SUPPORT_DETAIL, require('SendGetSupportDetailCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_SUPPORT_INFO, require('SendGetSupportInfoCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_SEND_SUPPORT, require('SendSendSupportCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_SUPPORT_ANSWER, require('SendSupportAnswerCommand'));

    this.facade.registerCommand(LobbyMessage.SEND_GET_USER_INFO_DETAIL, require('SendGetUserInfoDetailCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_SET_BIRTHDAY, require('SendSetBirthdayCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_CHANGE_PASS, require('SendChangePassCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_SET_PHONE, require('SendSetPhoneCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_SET_OTP, require('SendSetOtpCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_DESCRIPTION, require('SendGetDescriptionCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_INFO_STARTGAME_POPUP, require('SendGetInfoStartGamePopupCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_SECURITY_PHONE, require('SendSecurityPhoneCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_COMFIRM_OTP_PHONE, require('SendComfirmOtpPhoneCommand'));


    this.facade.registerCommand(LobbyMessage.SEND_GET_EVENT_BANNER, require('SendGetEventBannerCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_IN_GAME_CONFIG, require('SendGetInGameConfigCommand'));


    this.facade.registerCommand(LobbyMessage.SEND_GET_AVATAR_LIST, require('SendGetAvatarListCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_CHANGE_AVATAR, require('SendChangeAvatarCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_SET_NICK_NAME, require('SendSetNickNameCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_CHAT_GAME, require('SendChatGameCommand'));

    this.facade.registerCommand(LobbyMessage.SEND_GET_OTP, require('SendGetOTPCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_ACTIVE_ACCOUNT_KIT, require('SendActiveAccountKitCommand'));

    this.facade.registerCommand(LobbyMessage.SEND_GET_HISTORY_CASH_IN, require('SendGetHistoryCashInCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_HISTORY_CASH_OUT, require('SendGetHistoryCashOutCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_HISTORY_TRANFER, require('SendGetHistoryTranferCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_INFO_LIST_TOURNAMENT, require('SendGetInfoListTournamentCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_INFO_TOURNAMENT, require('SendGetInfoTournamentCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_GET_TOP_TOURNAMENT, require('SendGetTopTournamentCommand'));
    this.facade.registerCommand(LobbyMessage.SEND_JOIN_TOURNAMENT, require('SendJoinTournamentComamnd'));

      // this.facade.registerCommand(LobbyMessage.SEND_ACTIVE_ACCOUNT_KIT, require('SendActiveAccountKitCommand'));
      // this.facade.registerCommand(LobbyMessage.SEND_ACTIVE_ACCOUNT_KIT, require('SendActiveAccountKitCommand'));


      //minigame
    this.facade.registerCommand(MiniGameMessage.SEND_JOIN_MINIGAME, require('SendJoinMiniGameCommand'));
    this.facade.registerCommand(MiniGameMessage.SEND_DISCONNECT_MINIGAME, require('SendDisconnectMiniGameCommand'));
    this.facade.registerCommand(MiniGameMessage.SEND_GET_RANK_MINIGAME, require('SendGetRankMiniGameCommand'));
    this.facade.registerCommand(MiniGameMessage.SEND_GET_HISTORY_MINIGAME, require('SendGetHistoryMiniGameCommand'));
    this.facade.registerCommand(MiniGameMessage.SEND_SHOW_GUIDE_MINIGAME, require('SendShowGuideMiniGameCommand'));


    this.facade.registerCommand(LobbyMessage.RECEIVE_LOGIN, require('ReceiveLoginCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_REGISTER, require('ReceiveRegisterCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_CHANNEL_INFO, require('ReceiveGetChannelInfoCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_JOIN_CHANNEL, require('ReceiveJoinChannelCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_JOIN_ROOM, require('ReceiveJoinRoomCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_UPDATE_ROOM_LIST, require('ReceiveUpdateRoomListCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_MY_ONLINE_INFO, require('ReceiveGetMyOnlineInfoCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_TOP_PLAY, require('ReceiveGetTopPlayCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_USER_INFO, require('ReceiveGetUserInfoCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_AGENT_INFO, require('ReceiveGetAgentInfoCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_MOBILE_CARD_RECHARGE, require('ReceiveMobileCardRechargeCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_BUY_ITEM_SHOP, require('ReceiveBuyItemShopCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_ALL_CURRENT_EVENT, require('ReceiveGetAllCurrentEventCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_LIST_CARD_PAY_BACK, require('ReceiveGetListCardPayBackCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_USE_GIFT_CODE, require('ReceiveUseGiftCodeCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_CHAT, require('ReceiveChatCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_CHAT_DATA, require('ReceiveGetChatDataCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_NOTIFIES, require('ReceiveGetNotifiesCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_OUT_CARD_INFO, require('ReceiveGetCashOutCardInfoCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_CASH_OUT_CARD, require('ReceiveCashOutCardCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_CHECK_ACCOUNT_TRANSFERDES, require('ReceiveCheckAccountTransferdesCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_TRANSFERDES, require('ReceiveTransferdesCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_INFO_CARD_PAY_BACK, require('ReceiveGetInfoCardPayBackCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_RECHARGE_INFO, require('ReceiveGetRechargeInfoCommand'));

    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_MAIL_LIST, require('ReceiveGetMailListCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_DELETE_MAIL, require('ReceiveDeleteMailCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_MAIL_DETAIL, require('ReceiveGetMailDetailCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_SUPPORT_DETAIL, require('ReceiveGetSupportDetailCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_SUPPORT_INFO, require('ReceiveGetSupportInfoCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_SEND_SUPPORT, require('ReceiveSendSupportCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_SUPPORT_ANSWER, require('ReceiveSupportAnswerCommand'));

    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_USER_INFO_DETAIL, require('ReceiveGetUserInfoDetailCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_SET_BIRTHDAY, require('ReceiveSetBirthdayCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_CHANGE_PASS, require('ReceiveChangePassCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_SET_PHONE, require('ReceiveSetPhoneCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_SET_OTP, require('ReceiveSetOtpCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_DESCRIPTION, require('ReceiveGetDescriptionCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_INFO_STARTGAME_POPUP, require('ReceiveGetInfoStartGamePopupCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_EVENT_BANNER, require('ReceiveGetEventBannerCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_IN_GAME_CONFIG, require('ReceiveGetInGameConfigCommand'));

    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_AVATAR_LIST, require('ReceiveGetAvatarListCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_CHANGE_AVATAR, require('ReceiveChangeAvatarCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_SET_NICK_NAME, require('ReceiveSetNickNameCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_SECURITY_PHONE, require('ReceiveSecurityPhoneCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_COMFIRM_OTP_PHONE, require('ReceiveComfirmOtpPhoneCommand'));

    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_HISTORY_CASH_IN, require('ReceiveGetHistoryCashInCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_HISTORY_CASH_OUT, require('ReceiveGetHistoryCashOutCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_HISTORY_TRANFER, require('ReceiveGetHistoryTranferCommand'));

    this.facade.registerCommand(LobbyMessage.RECEIVE_ACTIVE_ACCOUNT_KIT, require('ReceiveActiveAccountKitCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_INFO_LIST_TOURNAMENT, require('ReceiveGetInfoListTournamentCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_INFO_TOURNAMENT, require('ReceiveGetInfoTournamentCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_GET_TOP_TOURNAMENT, require('ReceiveGetTopTournamentCommand'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_JOIN_TOURNAMENT, require('ReceiveJoinTournamentComamnd'));

    this.facade.registerCommand(MiniGameMessage.RECEIVE_JOIN_MINIGAME, require('ReceiveJoinMiniGameCommand'));

    //setup game
    this.facade.registerCommand(LobbyMessage.SETUP_GAME_TLMN, require('SetupTLMNCommand'));
    this.facade.registerCommand(LobbyMessage.SETUP_GAME_SAM, require('SetupSamCommand'));
    this.facade.registerCommand(LobbyMessage.SETUP_GAME_BINH, require('SetupBinhCommand'));
    this.facade.registerCommand(LobbyMessage.SETUP_GAME_XOCDIA, require('SetupXocDiaCommand'));
    this.facade.registerCommand(LobbyMessage.SETUP_GAME_PHOM, require('SetupPhomCommand'));

    //setup minigame
    // this.facade.registerCommand(MiniGameMessage.SETUP_MINIGAME_BAU_CUA, require('SetupBauCuaCommand'));
    this.facade.registerCommand(MiniGameMessage.SETUP_MINIGAME_MINIPOKER, require('SetupMiniPokerCommand'));
    this.facade.registerCommand(MiniGameMessage.SETUP_MINIGAME_SLOT3X3, require('SetupSlot3x3Command'));
    this.facade.registerCommand(MiniGameMessage.SETUP_MINIGAME_TAI_XIU, require('SetupTaiXiuCommand'));
    // this.facade.registerCommand(MiniGameMessage.SETUP_MINIGAME_TO_NHO, require('SetupToNhoCommand'));
    // this.facade.registerCommand(MiniGameMessage.SETUP_MINIGAME_VONG_QUAY , require('SetupVongQuayCommand'));

    //setup slotmachine
    this.facade.registerCommand(LobbyMessage.SETUP_SLOT_LUCKY_CAFE , require('SetupSlotLCCommand'));
    this.facade.registerCommand(LobbyMessage.SETUP_SLOT_KEO_NGOT , require('SetupSlotKNCommand'));

    this.facade.registerCommand(LobbyMessage.SEND_JOIN_SLOT20 , require('SendJoinSlot20Command'));
    this.facade.registerCommand(LobbyMessage.RECEIVE_JOIN_SLOT20 , require('ReceiveJoinSlot20Command'));
    this.facade.registerCommand(LobbyMessage.CONNECT_NETWORK, require('ConnectNetWorkCommand'));

    //register proxy
    this.facade.registerProxy(new ConfigProxy());
    this.facade.registerProxy(new UserProxy());
    this.facade.registerProxy(new ChannelProxy());
    this.facade.registerProxy(new RoomProxy());
    this.facade.registerProxy(new HttpRequestProxy());
    this.facade.registerProxy(new RechargeProxy());
    this.facade.registerProxy(new ShopProxy());
    this.facade.registerProxy(new GiftProxy());
    this.facade.registerProxy(new EventProxy());
    this.facade.registerProxy(new AgentProxy());
    this.facade.registerProxy(new NotifiesProxy());
    this.facade.registerProxy(new MailProxy());
    this.facade.registerProxy(new TournamentProxy());
    this.facade.registerProxy(new AvatarProxy());

    //minigame
    this.registerNetworkProxy(new MiniPokerProxy());
    this.registerNetworkProxy(new Slot3x3Proxy());
    this.registerNetworkProxy(new TaiXiuProxy());
    // this.registerNetworkProxy(new VongQuayProxy());

    //SLOTMMACHINE
    this.registerNetworkProxy(new SlotLCProxy());
    this.registerNetworkProxy(new SlotKNProxy());

    //sdk box
    this.facade.registerProxy(new FacebookProxy());
    this.facade.registerProxy(new OneSignalProxy());
    this.facade.registerProxy(new AccountKitProxy());

    //socket network
    this.registerNetworkProxy(new SCLobbyProxy());
    this.registerNetworkProxy(new StaticsicProxy());


    //register mediator
    this.facade.registerMediator(require('PopupSceneMediator').getInstance());
    this.facade.registerMediator(require('LobbySceneMediator').getInstance());
    this.facade.registerMediator(require('LoginSceneMediator').getInstance);
    this.facade.registerMediator(require('RegisterSceneMediator').getInstance);
    // this.facade.registerMediator(require('ForetPasswordScene').getInstance);
    this.facade.registerMediator(require('SelectGameSceneMediator').getInstance);
    this.facade.registerMediator(require('ListJackpotSceneMediator').getInstance);
    this.facade.registerMediator(require('ChannelSceneMediator').getInstance());
    this.facade.registerMediator(require('TopMenuSceneMediator').getInstance);
    this.facade.registerMediator(require('ChatSceneMediator').getInstance());
    this.facade.registerMediator(require('ChatGameSceneMediator').getInstance());
    this.facade.registerMediator(require('LoadingSceneMediator').getInstance());
    this.facade.registerMediator(require('CreateRoomPopupMediator').getInstance());
    this.facade.registerMediator(require('ShopSceneMediator').getInstance);
    this.facade.registerMediator(require('GiftCodeSceneMediator').getInstance);
    this.facade.registerMediator(require('AgentSceneMediator').getInstance());
    this.facade.registerMediator(require('MiniGameSceneMediator').getInstance);
    this.facade.registerMediator(require('AlertMediator').getInstance());
    this.facade.registerMediator(require('FlyAlertMediator').getInstance);
    this.facade.registerMediator(require('MailSceneMediator').getInstance());
    this.facade.registerMediator(require('UserProfileSceneMediator').getInstance);
    this.facade.registerMediator(require('SecuritySceneMediator').getInstance());
    this.facade.registerMediator(require('EventSceneMediator').getInstance());
    this.facade.registerMediator(require('StartGamePopupMediator').getInstance());
    this.facade.registerMediator(require('ChangeAvatarSceneMediator').getInstance());
    this.facade.registerMediator(require('SettingSceneMediator').getInstance);
    this.facade.registerMediator(require('FacebookValidateSceneMediator').getInstance);
    this.facade.registerMediator(require('HistoryMiniGameMediator').getInstance);
    this.facade.registerMediator(require('RankMiniGameMediator').getInstance);
    this.facade.registerMediator(require('EventBannerSceneMediator').getInstance());
    this.facade.registerMediator(require('WebviewSceneMediator').getInstance());
    this.facade.registerMediator(require('SoundGameMediator').getInstance());
    this.facade.registerMediator(require('EventTaiXiuMediator').getInstance());
    this.facade.registerMediator(require('NotifiesSceneMediator').getInstance());
    this.facade.registerMediator(require('HelpAndRulesSceneMediator').getInstance);
    this.facade.registerMediator(require('ForgetPasswordMediator').getInstance);
    this.facade.registerMediator(require('HistoryTranferSceneMediator').getInstance);
    this.facade.registerMediator(require('TournamentSceneMediator').getInstance);
    this.facade.registerMediator(require('ListTournamentSceneMediator').getInstance);

    this.facade.registerMediator(require('SlotSceneLayerMediator').getInstance());

    this.sendNotification(MiniGameMessage.SETUP_MINIGAME_TAI_XIU);
    this.sendNotification(MiniGameMessage.SETUP_MINIGAME_SLOT3X3);
    this.sendNotification(MiniGameMessage.SETUP_MINIGAME_MINIPOKER);

    // register google analytics
    if (cc.sys.isBrowser)
      ga('create', 'UA-144597436-1', 'auto');

    // this.getSocketConfig();
    this.sendNotification(LobbyMessage.CONNECT_NETWORK);

  }

  registerNetworkProxy(proxy) {
    this.facade.registerProxy(proxy);
    window.listNetWorkProxy.push(proxy);
  }
}
