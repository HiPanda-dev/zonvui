var BaseProxy = require("BaseProxy");
var ConfigVO = require("ConfigVO");
var ConfigInGameVO = require('ConfigInGameVO');
var LobbyMessage = require('LobbyMessage');
var CustomAction = require('CustomAction');
var Constants = require('Constants');
var MiniGameMessage = require('MiniGameMessage');

export default class ConfigProxy extends BaseProxy {
    static get NAME() {
      return 'ConfigProxy';
    }

    onRegister() {
      this.config = new ConfigVO();
    }

    updatePartnerId(partnerName) {
        // this.config.updatePartnerId(partnerName);
    }

    updateIngameConfig(data) {
        // this.configIngame.update(data);
    }

    updateConfigDataList(dataList) {
        // for(var code in dataList){
        //     this.configIngame.configData[code] = {
        //         name:dataList[code].name,
        //         act:dataList[code].act
        //     }
        // }
    }

    getSelectType() {
        return this.configIngame.sysConfig.selectTableType;
    }

    checkButtonState(code) {
        // var node = ConfigInGameVO.LIST_CUSTUM_BUTTON[code].node;
        // var hideContents = ConfigInGameVO.LIST_CUSTUM_BUTTON[code].hideContents;
        // var labelButton = ConfigInGameVO.LIST_CUSTUM_BUTTON[code].labelButton;
        // var tabMain = ConfigInGameVO.LIST_CUSTUM_BUTTON[code].tabMain;
        // if (this.configIngame === null) return;
        // if (this.configIngame.configData === null) return;
        // if (this.configIngame.configData[code] === undefined) return;
        // if (this.configIngame.configData[code].isVisible === "0") {
        //     node.active = false;
        //     this.hideAllContent(hideContents);
        //     this.updateTabMain(tabMain);
        //     return;
        // }
        //
        // node.active = true;
        // this.checkActionButton(node, this.configIngame.configData[code].act);
        // this.checkMessageButton(node, this.configIngame.configData[code].msg);
        // this.checkLabelButton(labelButton, this.configIngame.configData[code].name);
    }

    checkAllButtonState() {
        // for (var code in  ConfigInGameVO.LIST_CUSTUM_BUTTON) {
        //     this.checkButtonState(code);
        // }
    }

    checkActionButton(node, act) {
        // var button = node.getComponent(cc.Button);
        //
        // if (act === undefined || act === "") return;
        // if (button === undefined || button === null) return;
        // button.clickEventsTemp = button.clickEvents.concat();
        // button.clickEvents = [];
        // if (act.indexOf("webview") !== -1) {
        //     button.node.on('click', function (event) {
        //         var customAction = node.getComponent(CustomAction);
        //         var webview = customAction.webview;
        //         act = act.replace('webview','http');
        //         if(webview){
        //             webview.url = act;
        //             var showContents = customAction.showContents;
        //             this.showAllContent(showContents);
        //         }else{
        //             this.sendNotification(LobbyMessage.SHOW_WEB_VIEW_POPUP, {url: act});
        //         }
        //     }.bind(this));
        // }
        // else if (act.indexOf("http") !== -1) {
        //     button.node.on('click', function (event) {
        //         window.open(act, '_blank');
        //     }.bind(this));
        // } else {
        //     button.node.on('click', function (event) {
        //         this.openForm(act)
        //     }.bind(this));
        // }
    }

    checkMessageButton(node, msg) {
        // var button = node.getComponent(cc.Button);
        // if (msg === undefined || msg === "") return;
        // if (button === undefined || button === null) return;
        // button.clickEvents = [];
        // button.node.on('click', function (event) {
        //     this.sendNotification(LobbyMessage.SHOW_ALERT, {content: msg});
        // }.bind(this));
    }

    checkLabelButton(labelButton, name) {
        // if (name === undefined || name === "") return;
        // if (labelButton === undefined || labelButton === null) return;
        //
        // labelButton.string = name;

    }

    showAllContent(contents) {
        // if (contents === undefined || contents === null) return;
        // for (var i = 0; i < contents.length; i++) {
        //     contents[i].active = true;
        // }
    }

    hideAllContent(contents) {
        // if (contents === undefined || contents === null) return;
        // for (var i = 0; i < contents.length; i++) {
        //     contents[i].active = false;
        // }
    }


    updateTabMain(tabMain) {
        // if (tabMain === undefined || tabMain === null) return;
        // tabMain.initTabbarButton();
    }

    openForm(code) {
        // switch (code){
        //     case CustomAction.ACTION_RECHARGE:
        //         this.sendNotification(LobbyMessage.SHOW_RECHARGE_SCENE);
        //         break;
        //     case CustomAction.ACTION_RECHARGE_ROY:
        //     case CustomAction.ACTION_RECHARGE_CEN:
        //     case CustomAction.ACTION_RECHARGE_MPAY:
        //     case CustomAction.ACTION_RECHARGE_BANK:
        //     case CustomAction.ACTION_RECHARGE_INAPP:
        //         this.sendNotification(LobbyMessage.SHOW_TAB_IN_RECHARGE_SCENE, {tabId:code});
        //         break;
        //     case CustomAction.ACTION_SHOP:
        //         this.sendNotification(LobbyMessage.SHOW_SHOP_SCENE);
        //         break;
        //     case CustomAction.ACTION_SHOP_ROY:
        //     case CustomAction.ACTION_SHOP_PAY_BACK:
        //     case CustomAction.ACTION_SHOP_TRANSFEDERS:
        //         this.sendNotification(LobbyMessage.SHOW_TAB_IN_SHOP_SCENE, {tabId:code});
        //         break;
        //     case CustomAction.ACTION_MAIL:
        //         this.sendNotification(LobbyMessage.SHOW_MAIL_SCENE);
        //         break;
        //     case CustomAction.ACTION_MAIL_NOTI:
        //     case CustomAction.ACTION_MAIL_SUPPORT:
        //     case CustomAction.ACTION_MAIL_SUPPORT_LIST:
        //         this.sendNotification(LobbyMessage.SHOW_TAB_IN_MAIL_SCENE, {tabId:code});
        //         break;
        //     case CustomAction.ACTION_AGENT:
        //         this.sendNotification(LobbyMessage.SHOW_AGENT_SCENE);
        //         break;
        //     case CustomAction.ACTION_GIFT_CODE:
        //         this.sendNotification(LobbyMessage.SHOW_GIFT_CODE_SCENE);
        //         break;
        //
        //     case CustomAction.ACTION_TLMN:
        //         Constants.CURRENT_GAME = Constants.GAME_TLMN;
        //         this.sendNotification(LobbyMessage.SEND_GET_CHANNEL_INFO, {channelId:Constants.GAME_TLMN});
        //         break;
        //     case CustomAction.ACTION_SAM:
        //         Constants.CURRENT_GAME = Constants.GAME_SAM;
        //         this.sendNotification(LobbyMessage.SEND_GET_CHANNEL_INFO, {channelId:Constants.GAME_SAM});
        //         break;
        //     case CustomAction.ACTION_BINH:
        //         Constants.CURRENT_GAME = Constants.GAME_BINH;
        //         this.sendNotification(LobbyMessage.SEND_GET_CHANNEL_INFO, {channelId:Constants.GAME_BINH});
        //         break;
        //     case CustomAction.ACTION_PHOM:
        //         Constants.CURRENT_GAME = Constants.GAME_PHOM;
        //         this.sendNotification(LobbyMessage.SEND_GET_CHANNEL_INFO, {channelId:Constants.GAME_PHOM});
        //         break;
        //     case CustomAction.ACTION_XITO:
        //         Constants.CURRENT_GAME = Constants.GAME_XITO;
        //         this.sendNotification(LobbyMessage.SEND_GET_CHANNEL_INFO, {channelId:Constants.GAME_XITO});
        //         break;
        //     case CustomAction.ACTION_XOC_DIA:
        //         Constants.CURRENT_GAME = Constants.GAME_XOCDIA;
        //         this.sendNotification(LobbyMessage.SEND_GET_CHANNEL_INFO, {channelId:Constants.GAME_XOCDIA});
        //         break;
        //     case CustomAction.ACTION_LIENG:
        //         Constants.CURRENT_GAME = Constants.GAME_LIENG;
        //         this.sendNotification(LobbyMessage.SEND_GET_CHANNEL_INFO, {channelId:Constants.GAME_LIENG});
        //         break;
        //     case CustomAction.ACTION_NHAT_AN_TAT:
        //         Constants.CURRENT_GAME = Constants.GAME_NHAT_AN_TAT;
        //         this.sendNotification(LobbyMessage.SEND_GET_CHANNEL_INFO, {channelId:Constants.GAME_NHAT_AN_TAT});
        //         break;
        //
        //     case CustomAction.ACTION_MINI_POKER:
        //         this.sendNotification(MiniGameMessage.SEND_JOIN_MINIGAME, Constants.MINIGAME_MINI_POKER);
        //         break;
        //     case CustomAction.ACTION_TO_NHO:
        //         this.sendNotification(MiniGameMessage.SEND_JOIN_MINIGAME, Constants.MINIGAME_TO_NHO);
        //         break;
        //     case CustomAction.ACTION_TAI_XIU:
        //         this.sendNotification(MiniGameMessage.SEND_JOIN_MINIGAME, Constants.MINIGAME_TAI_XIU);
        //         break;
        //     case CustomAction.ACTION_BAU_CUA_CA:
        //         this.sendNotification(MiniGameMessage.SEND_JOIN_MINIGAME, Constants.MINIGAME_BAU_CUA);
        //         break;
        //     case CustomAction.ACTION_VONG_QUAY:
        //         this.sendNotification(MiniGameMessage.SEND_JOIN_MINIGAME, Constants.MINIGAME_VONG_QUAY);
        //         break;
        //     case CustomAction.ACTION_POKEGO:
        //         this.sendNotification(MiniGameMessage.SEND_JOIN_MINIGAME, Constants.MINIGAME_SLOT3X3);
        //         break;
        // }
    }

    reset() {
      // if(!ConfigInGameVO.LIST_CUSTUM_BUTTON) return;
      // for(var code in ConfigInGameVO.LIST_CUSTUM_BUTTON){
      //     var node = ConfigInGameVO.LIST_CUSTUM_BUTTON[code].node;
      //     node.clickEvents = (node.clickEventsTemp)?node.clickEventsTemp.concat():node.clickEvents;
      //     node.targetOff(node);
      // }
      //
      // if(this.configIngame){
      //     this.configIngame.configData = [];
      // }
      // this.onRegister();
    }
}
