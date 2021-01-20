var BaseProxy = require("BaseProxy");
var ChannelVO = require("ChannelVO");
var Constants = require('Constants');
var RoomExtension = SFS2X.RoomExtension;
var ExtensionConfig = require('ExtensionConfig');
var GameConfig = require('GameConfig');
var LocalStorage = require('LocalStorage');

export default class ChannelProxy extends BaseProxy {
    static get NAME() {
      return 'ChannelProxy';
    }

    static get CHIP_MODE() {
      return 'CHIP';
    }

    static get MONEY_MODE() {
      return 'MONEY';
    }

    onRegister() {
      this.curChannelIndex = 0,
      this.zoneName = "",
      this.mode = null,
      this.channelList = [];
      this.curChannelIndex = 0;
    }

    initData(data) {
        GameConfig.CURRENT_MODE = LocalStorage.getMode();
        this.channelList = [];
        for (var i = 0; i < data.length; i++) {
            var channel = new ChannelVO();
            channel.initData(data[i]);
            channel.currentChildId = data[i].childChannel[0].id;
            this.channelList.push(channel);
        }
    }

    setZoneName(zoneName) {
        this.zoneName = zoneName;
    }

    getGameSceneByZoneName(zoneName) {
        switch (zoneName) {
            case Constants.GAME_TLMN:
            case Constants.GAME_TLMN_SOLO:
                return GameConfig.TLMN_SCENE;
                break;
            case Constants.GAME_PHOM:
                return GameConfig.PHOM_SCENE;
                break;
            case Constants.POKER:
                return GameConfig.POKER_SCENE;
                break;
            case Constants.GAME_BINH:
                return GameConfig.BINH_SCENE;
                break;
            case Constants.GAME_XITO:
                return GameConfig.XITO_SCENE;
                break;
            case Constants.GAME_SAM:
            case Constants.GAME_SAM_SOLO:
                return GameConfig.SAM_SCENE;
                break;
            case Constants.GAME_BACAY:
                return GameConfig.BACAY_SCENE;
                break;
            case Constants.GAME_XOCDIA:
                return GameConfig.XOCDIA_SCENE;
                break;
            case Constants.GAME_LIENG:
                return GameConfig.LIENG_SCENE;
                break;
        }
    }

    getCurrentMaxTablePlayer() {
        switch (this.zoneName) {
            case Constants.GAME_TLMN:
                return 4;
                break;
            case Constants.GAME_TLMN_SOLO:
                return 2;
                break;
            case Constants.GAME_PHOM:
                return 4;
                break;
            case Constants.POKER:
                return 6;
                break;
            case Constants.GAME_BINH:
                return 4;
                break;
            case Constants.GAME_XITO:
                return 6;
                break;
            case Constants.GAME_SAM:
                return 5;
                break;
            case Constants.GAME_SAM_SOLO:
                return 2;
                break;
            case Constants.GAME_BACAY:
                return 10;
                break;
            case Constants.GAME_XOCDIA:
                return 30;
                break;
            case Constants.GAME_LIENG:
                return 4;
                break;
        }

        return 2;
    }

    getChannelName() {
        var curChannel = this.channelList[this.curChannelIndex];
        for (var i = 0; i < curChannel.childChannel.length; i++) {
            var child = curChannel.childChannel[i];
            if (child.id === curChannel.currentChildId) {
                return child.name;
            }
        }
        return "";
    }

    getCurrentNumPlay() {
        switch (this.zoneName) {
            case Constants.GAME_TLMN:
                return [4, 2];
                break;
            case Constants.GAME_TLMN_SOLO:
                return [2];
                break;
            case Constants.GAME_PHOM:
                return [4, 2];
                break;
            case Constants.POKER:
                return [2, 4, 6];
                break;
            case Constants.GAME_BINH:
                return [4, 2];
                break;
            case Constants.GAME_XITO:
                return [2, 4, 6];
                break;
            case Constants.GAME_SAM:
                return [5, 2];
                break;
            case Constants.GAME_SAM_SOLO:
                return [2];
                break;
            case Constants.GAME_BACAY:
                return [2, 10];
                break;
            case Constants.GAME_XOCDIA:
                return [30];
                break;
            case Constants.GAME_LIENG:
                return [2, 4];
                break;
        }
    }

    getCurRoomExtentsion() {
        switch (this.zoneName) {
            case Constants.GAME_TLMN:
                return new RoomExtension(ExtensionConfig.TLMN, ExtensionConfig.TLMN_EXTENSION);
                break;
            case Constants.GAME_TLMN_SOLO:
                return new RoomExtension(ExtensionConfig.TLMN_SOLO, ExtensionConfig.TLMN_EXTENSION);
                break;
            case Constants.GAME_PHOM:
                return new RoomExtension(ExtensionConfig.PHOM, ExtensionConfig.PHOM_EXTENSION);
                break;
            case Constants.POKER:
                return new RoomExtension(ExtensionConfig.POKER, ExtensionConfig.POKER_EXTENSION);
                break;
            case Constants.GAME_BINH:
                return new RoomExtension(ExtensionConfig.BINH, ExtensionConfig.BINH_EXTENSION);
                break;
            case Constants.GAME_XITO:
                return new RoomExtension(ExtensionConfig.XI_TO, ExtensionConfig.XI_TO_EXTENSION);
                break;
            case Constants.GAME_SAM:
                return new RoomExtension(ExtensionConfig.SAM, ExtensionConfig.SAM_EXTENSION);
                break;
            case Constants.GAME_SAM_SOLO:
                return new RoomExtension(ExtensionConfig.SAM_SOLO, ExtensionConfig.SAM_SOLO_EXTENSION);
                break;
            case Constants.GAME_BACAY:
                return new RoomExtension(ExtensionConfig.BA_CAY, ExtensionConfig.BA_CAY_EXTENSION);
                break;
            case Constants.GAME_XOCDIA:
                return new RoomExtension(ExtensionConfig.XOC_DIA, ExtensionConfig.XOC_DIA_EXTENSION);
                break;
            case Constants.GAME_LIENG:
                return new RoomExtension(ExtensionConfig.LIENG, ExtensionConfig.LIENG_EXTENSION);
                break;
        }
    }

    getSortListBet() {
        var sortListBet = [];
        sortListBet.push({
            name:"Tất cả",
            value:0
        });

        var listbet = this.channelList[0].bet.split(',');
        for (var i = 0; i < listbet.length; i++) {
            var bet = listbet[i];
            var o = {
                name:bet,
                value:bet
            };
            sortListBet.push(o);
        }

        return sortListBet;
    }

    updateCurrentChildId(childId) {
        var curChannel = this.channelList[this.curChannelIndex];
        curChannel.currentChildId = childId;
    }

    getCurZone() {
        var curChannel = this.channelList[this.curChannelIndex];
        return this.zoneName + "_" + curChannel.currentChildId;
    }

    getMinBetRateCreateRoom(bet) {
        var limitCreate = this.getCurrentLimitCreate();
        var curBet = this.getCurrentBet();

        for (var i = 0; i < curBet.length; i++) {
            if (bet === parseInt(curBet[i])) {
                return limitCreate[i];
            }
        }
        return 0;
    }

    getAutoBetInRoom(myMoney) {
        var limitIn = this.getCurrentLimitIn();
        var curBet = this.getCurrentBet();
        for (var i = limitIn.length - 1; i >= 0; i--) {
            if (myMoney >= parseInt(limitIn[i])) {
                return parseInt(curBet[i]);
            }
        }
        return parseInt(curBet[curBet.length - 1]);
    }

    getAutoBetCreateRoom(myMoney) {
        var limitCreate = this.getCurrentLimitCreate();
        var curBet = this.getCurrentBet();
        for (var i = limitCreate.length - 1; i >= 0; i--) {
            if (myMoney >= parseInt(limitCreate[i])) {
                return parseInt(curBet[i]);
            }
        }
        return parseInt(curBet[curBet.length - 1]);
    }

    getMinBetRateInRoom(bet) {
        var limitIn = this.getCurrentLimitIn();
        var curBet = this.getCurrentBet();

        for (var i = 0; i < curBet.length; i++) {
            if (bet === parseInt(curBet[i])) {
                return limitIn[i];
            }
        }
        return 0;
    }

    getCurrentBet() {
        var curChannel = this.channelList[this.curChannelIndex];
        return curChannel.bet.split(",");
    }

    getCurrentLimitIn() {
        var curChannel = this.channelList[this.curChannelIndex];
        return curChannel.limitIn.split(',');
    }

    getCurrentLimitOut() {
        var curChannel = this.channelList[this.curChannelIndex];
        return curChannel.limitOut.split(',');
    }

    getMinBetLimitOut(bet) {
        var arrBet = this.getCurrentBet();
        var arrLimitOut = this.getCurrentLimitOut();

        for(var i=0;i<arrBet.length;i++){
            if(arrBet[i] === bet){
                return arrLimitOut[i];
            }
        }

        return 0;
    }

    /**
     * trả ra mảng các mức cược user có thể tạo bàn theo tiền của user
     * @param money
     * @returns {Array}
     */
    getListBetCreateTable(money){
        var result = [];
        var limitCreate = this.getCurrentLimitCreate();
        var curBet = this.getCurrentBet();
        for (var i = limitCreate.length - 1; i >= 0; i--) {
            if(money >= parseInt(limitCreate[i])){
                result.push(curBet[i]);
            }
        }
        return result;
    }

    /**
     * tra ra số tiền tối đa để vào theo mức cược
     * @param bet
     * @returns {Array}
     */
    getLimitInWithBet(bet) {
        var curBet = this.getCurrentBet();
        var limitIn = this.getCurrentLimitIn();
        for (var i = curBet.length - 1; i >= 0; i--) {
            if(bet === parseInt(curBet[i])){
               return parseInt(limitIn[i]);
            }
        }
        return -1;
    }

    getCurrentLimitCreate() {
        var curChannel = this.channelList[this.curChannelIndex];
        return curChannel.limitCreate.split(',');
    }

    getCurChannel() {
       return this.channelList[this.curChannelIndex];
    }

    getMode() {
        this.mode = (this.mode === undefined)?LocalStorage.getMode():this.mode;
        return this.mode;
    }

    setMode(mode) {
        LocalStorage.setMode(mode);
        GameConfig.CURRENT_MODE = mode;
        this.mode = mode;
    }

}
