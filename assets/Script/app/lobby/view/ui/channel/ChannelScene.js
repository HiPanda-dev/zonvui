var BaseScene = require('BaseScene');
var ChannelSceneMediator = require('ChannelSceneMediator');
var TopMasterByGameControl = require('TopMasterByGameControl');
var TableListControl = require('TableListControl');
var TableListBetControl = require('TableListBetControl');
var DropListMainTemplate = require('DropListMainTemplate');
var LocalStorage = require('LocalStorage');
var LobbyEvent = require('LobbyEvent');
var GameConfig = require('GameConfig');
var Constants = require('Constants');

var ChannelScene = cc.Class({
    extends: BaseScene,

    properties: {
        vtTabChannel: {
            default: [],
            type: [cc.Toggle],
            tooltip: 'mảng các tab channel'
        },
        sortListBet: DropListMainTemplate,
        tableListControl: TableListControl,
        tableListBetControl: TableListBetControl,
        topMasterByGameControl: TopMasterByGameControl,
        toggleModeMoney: cc.Toggle,
        toggleModeChip: cc.Toggle,
        toggleStyle:cc.Toggle,
        btnQuickJoin:cc.Button,
        btnCreateRoom:cc.Button,
        gameName: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.roomProxy = null;
        ChannelSceneMediator.getInstance().init(this);
        if (LocalStorage.getMode() === "MONEY") this.toggleModeMoney.isChecked = true;
        else this.toggleModeChip.isChecked = true;
        this.topMasterByGameControl.node.active = false;
        this.updateStyleGame();
        this.addEventListeners();
        this.hide();
    },

    show: function(zoneName){
        BaseScene.prototype.show.call(this);
        var s = "";
        switch (zoneName){
            case Constants.GAME_TLMN:
            case Constants.GAME_TLMN_SOLO:
                s = "Tiến Lên";
                break;
            case Constants.GAME_SAM:
            case Constants.GAME_SAM_SOLO:
                s = "Sâm";
                break;
            case Constants.GAME_BINH:
                s = "Mậu Binh";
                break;
            case Constants.GAME_XOCDIA:
                s = "Xóc Đĩa";
                break;
            case Constants.GAME_PHOM:
                s = "Phỏm";
                break;
            case Constants.GAME_LIENG:
                s = "Liêng";
                break;
            case Constants.GAME_XITO:
                s = "Xì Tố";
                break;
            case Constants.GAME_POKER:
                s = "Poker";
                break;
        }

        this.gameName.getComponent(cc.Label).string = s;
    },

    updateStyleGame:function () {
        this.toggleStyle.isChecked = (LocalStorage.getTableStyle() === "NONE")?true:false;
        this.tableListControl.node.active = (LocalStorage.getTableStyle() === "NONE")?true:false;
        this.tableListBetControl.node.active = (LocalStorage.getTableStyle() === "NONE")?false:true;
        this.btnQuickJoin.node.active = (LocalStorage.getTableStyle() === "NONE")?true:false;
        this.btnCreateRoom.node.active = (LocalStorage.getTableStyle() === "NONE")?true:false;
        this.sortListBet.node.active = (LocalStorage.getTableStyle() === "NONE")?true:false;
    },

    setupData: function (channelVO) {
        this.channelVO = channelVO;
        this.setupTabChannel(this.channelVO);

    },

    addEventListeners: function () {
        this.tableListBetControl.node.on(LobbyEvent.QUICK_JOIN_GAME_WITH_BET, this.onHandlerQuickJoinGameWithBet, this);
    },

    onHandlerQuickJoinGameWithBet:function (params) {
        this.activeQuickJoinGameWithBet(parseInt(params.bet));
    },

    setupTabChannel: function (channelVO) {
        for (var i = 0; i < this.vtTabChannel.length; i++) {
            var tabCpn = this.vtTabChannel[i];
            var txtNameCpn = tabCpn.node.getChildByName("txtName").getComponent(cc.Label);
            var txtOnlineCpn = tabCpn.node.getChildByName("txtOnline").getComponent(cc.Label);
            if (channelVO[i]) {
                txtNameCpn.string = channelVO[i].name;
                txtOnlineCpn.string = channelVO[i].countUserOnline;
                tabCpn.node.active = true;
                tabCpn.tabId = channelVO[i].id;
            } else {
                tabCpn.node.active = false;
            }

            this.updateColorTextTabChannel(tabCpn);
        }
    },


    updateColorTextTabChannel: function (tabCpn) {
        var txtNameCpn = tabCpn.node.getChildByName("txtName").getComponent(cc.Label);
        var txtOnlineCpn = tabCpn.node.getChildByName("txtOnline").getComponent(cc.Label);
        if (tabCpn.isChecked == true) {
            txtNameCpn.node.color = new cc.Color(64, 1, 130, 255);
            txtOnlineCpn.node.color = new cc.Color(0, 0, 0, 255);
        } else {
            txtNameCpn.node.color = new cc.Color(29, 190, 246, 255);
            txtOnlineCpn.node.color = new cc.Color(255, 255, 255, 255);
        }
    },

    onUpdateLimitIn:function (limitIn) {
        this.tableListBetControl.updateLimitIn(limitIn);
    },

    onUpdateSortListBet: function (vtListBet) {
        this.sortListBet.setupData(vtListBet);
        this.tableListBetControl.setupData(vtListBet);
    },

    onUpdateMySelf:function (mySelf) {
        this.mySelf = mySelf;
        this.tableListBetControl.updateMySelf(mySelf);
    },

    onUpdateSelectTableType:function (type) {
        switch (type){
            case 0:
                LocalStorage.setTableStyle("NONE");
                this.updateStyleGame();
                break;
            case 1:
                LocalStorage.setTableStyle("BET");
                this.updateStyleGame();
                break;
            case 2:
                break;
        }
    },

    onHandlerSortListTableByBet: function () {
        if (!this.tableListControl) return;
        var bet = this.sortListBet.getItemSelect().value;
        this.tableListControl.sortListTableByBet(bet);
    },

    onUpdateRoomList: function (roomProxy) {
        this.roomProxy = roomProxy;
        this.updateRoomList();
    },

    onUpdateRanking: function (rankingVO) {
        this.topMasterByGameControl.setupRank(rankingVO);
    },

    updateRoomList: function () {
        if (!this.roomProxy) return;
        if (!this.tableListControl) return;
        var vtRooms = this.roomProxy.getRoomAllList();
        this.tableListControl.setupTableData(vtRooms, this.node);
    },

    onHanlerChangeTabChannel: function (evt) {
        var selectTabCpn = evt;
        for (var i = 0; i < this.vtTabChannel.length; i++) {/**/
            var tabCpn = this.vtTabChannel[i];
            var txtNameCpn = tabCpn.node.getChildByName("txtName").getComponent(cc.Label);
            var txtOnlineCpn = tabCpn.node.getChildByName("txtOnline").getComponent(cc.Label);
            if (tabCpn !== selectTabCpn) {
                txtNameCpn.node.color = new cc.Color(29, 190, 246, 255);
                txtOnlineCpn.node.color = new cc.Color(255, 255, 255, 255);
            } else {
                txtNameCpn.node.color = new cc.Color(64, 1, 130, 255);
                txtOnlineCpn.node.color = new cc.Color(0, 0, 0, 255);
            }
        }

        this.activeGotoChannel(selectTabCpn.tabId);
    },

    onHanlerEventShowCreateRoomPoup: function () {
        this.activeShowCreateRoomPopup();
    },

    onHanlerShowAllRoomList: function () {

    },

    onHanlerChangeShowFullEvent: function () {
        this.updateRoomList();
    },

    onHanlerQuickJoinGame: function () {
        this.activeQuickJoinGame();
    },

    onHanlerJoinGame: function (evt) {
        var node = evt.currentTarget;
        var tableControl = node.getComponent('TableControl');

        this.activeJoinGame(tableControl.data.id, "", tableControl.data.roomBet);
    },

    onHandlerChooseMoneyMode: function () {
        this.activeChooseMoneyMode();
    },

    onHandlerChooseChipMode: function () {
        this.activeChooseChipMode();
    },

    onHandlerChangeTableMode:function () {
        this.tableListControl.node.active = !this.tableListControl.node.active;
        this.tableListBetControl.node.active = !this.tableListBetControl.node.active;

        if( this.tableListControl.node.active === true){
            LocalStorage.setTableStyle("NONE");
            this.updateStyleGame();
        }else{
            LocalStorage.setTableStyle("BET");
            this.updateStyleGame();
        }

    },

    onHandlerShowChat: function () {
        this.activeShowChat();
        this.topMasterByGameControl.node.active = false;
    },

    onHandlerShowTopPlayer: function () {
        this.topMasterByGameControl.node.active = true;
        this.activeHideChat();
    },


    activeJackpot: function(){
        cc.log("activeJackpot");
        this.activeListJackpot();
    },

  
    //////////////////QuickJoinControl//////////////////////////
    onHanlerSelectBet: function (evt) {
        var btnBetNode = evt.currentTarget;

        cc.log(betBetNode.bet);

        this.activeQuickJoinGameWithBet(btnBetNode.bet);
    }
    /////////////////////////////////////////////////////////////


});

module.exports = ChannelScene;
