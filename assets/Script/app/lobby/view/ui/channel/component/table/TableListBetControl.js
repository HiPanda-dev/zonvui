var GameConfig = require('GameConfig');
var LobbyEvent = require('LobbyEvent');
var Utility = require('Utility');

cc.Class({
    extends: cc.Component,

    properties: {
        mcTable: cc.Node,
        page: cc.Node
    },

    // use this for initialization
    onLoad: function () {

    },

    setupData: function (vtListBet) {
        this.vtListBet = vtListBet;
        this.page.removeAllChildren();
        var tableNode, txtBet, mcTableRoy, mcTableCen;
        for (var i = 1; i < vtListBet.length; i++) {
            tableNode = cc.instantiate(this.mcTable);
            txtBet = tableNode.getChildByName('txtBet').getComponent(cc.Label);
            mcTableRoy = tableNode.getChildByName('state').getChildByName('bg_table_bet_roy');
            mcTableCen = tableNode.getChildByName('state').getChildByName('bg_table_bet_cen');

            txtBet.string = Utility.formatCurrency(vtListBet[i].name);
            mcTableRoy.active = (GameConfig.CURRENT_MODE === "MONEY") ? true : false;
            mcTableCen.active = (GameConfig.CURRENT_MODE === "MONEY") ? false : true;

            tableNode.bet = parseInt(vtListBet[i].value);
            tableNode.on(cc.Node.EventType.TOUCH_START, this.onHandlerQuickJoinGameWithBet, this);
            this.page.addChild(tableNode);
        }
        this.checkHightLightBetting();
    },

    updateLimitIn: function (limitIn) {
        this.limitIn = limitIn;
        this.checkHightLightBetting();
    },

    updateMySelf: function (mySelf) {
        this.mySelf = mySelf;
        this.checkHightLightBetting();
    },

    checkHightLightBetting: function () {
        if (this.mySelf === undefined || this.vtListBet === undefined || this.limitIn === undefined) return;
        var tableNode;
        for (var i = this.limitIn.length - 1; i >= 0; i--) {
            tableNode = this.page.children[i];
            tableNode.opacity = (this.mySelf.gold() >= this.limitIn[i]) ? 255 : 100;
        }
    },

    onHandlerQuickJoinGameWithBet:function (evt) {
        var tableNode = evt.currentTarget;
        if(tableNode.opacity !== 255) return;

        var data = {
            bet:tableNode.bet
        };
        this.node.emit(LobbyEvent.QUICK_JOIN_GAME_WITH_BET, data);
    }



});
