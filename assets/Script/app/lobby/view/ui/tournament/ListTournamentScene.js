var BasePopup = require('BasePopup');
var ListTournamentSceneMediator = require('ListTournamentSceneMediator');
var RichTextLocalized = require('RichTextLocalized');
var Utility = require('Utility');
var Constants = require('Constants');
var i18n = require('i18n');

cc.Class({
    extends: BasePopup,

    properties: {
        // txtNumPlayer:cc.Label,
        // txtLePhi:cc.Label,
        // txtStatus:cc.Label,
        // mcTopPlayer:[cc.Node],
        // topPlayerContent: cc.Node,
        listTournamentContent: cc.Node,
        // iconTop: [cc.SpriteFrame]
    },

    ctor: function() {
        ListTournamentSceneMediator.getInstance.init(this);
        this.data = null;
    },

    // use this for initialization
    onLoad: function () {
        this.itemTemp = this.listTournamentContent.getChildByName("item");
    },

    showDataTour: function(moduleId, data) {
        this.data = data[moduleId];
        this.listTournamentContent.x = 0;
        // data.prizes = [5000,3000,2000,1000];
        // this.txtNumPlayer.string = data.numPlayer + '/' + data.maxPlayer;
        // this.txtLePhi.string = Utility.setText(i18n.t("C0234"), [data.tax]);
        // this.txtLevelMin.string = 'Level min : ' + data.myPos;

        this.listTournamentContent.removeAllChildren();
        var item;
        for(var i=0 ; i<10; i++){
            if(this.data[i] === undefined) return;
            item = cc.instantiate(this.itemTemp);
            switch (moduleId) {
                case Constants.SLOT20_LUCKY_CAFE:
                    item.getChildByName("txtName").getComponent(cc.Label).string = 'Lucky Cafe';
                    break;
                case Constants.SLOT20_KEO_NGOT:
                    item.getChildByName("txtName").getComponent(cc.Label).string = 'Kẹo ngọt';
                    break;
            }
            if(this.data[i].countDown === 0) {
                item.getChildByName("txtStatus").getComponent(cc.Label).string = 'Đang diễn ra';
                item.getChildByName("btnThamGia").getComponent(cc.Button).interactable  = true;
            }
            else if(this.data[i].countDown < 0) {
                item.getChildByName("txtStatus").getComponent(cc.Label).string = 'Đã kết thúc';
                item.getChildByName("txtStatus").color = new cc.Color(255, 184, 0);
                item.getChildByName("btnThamGia").getComponent(cc.Button).interactable  = false;
            }
            else {
                item.getChildByName("txtStatus").getComponent(cc.Label).string = 'Chưa diễn ra';
                item.getChildByName("txtStatus").color = new cc.Color(255, 184, 0);
                item.getChildByName("btnThamGia").getComponent(cc.Button).interactable  = false;
            }

            item.tourID = this.data[i]
            item.getChildByName("txtTime").getComponent(cc.Label).string = this.data[i].fromTime + ' - ' + this.data[i].toTime;
            this.listTournamentContent.addChild(item);
        }
    },

    // updateTopPlayer: function (data) {
    //
    // },

    onHandlerJoinTournament: function() {
        this.showJoinTournamentScene(this.data[0].tourId);
        this.hide();
    },

    onHandlerCloseTounament: function() {
        this.activeJoinGame(this.data.moduleId, this.data.tourId);
    }

});
