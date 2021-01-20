var Component = require("Component");
var SFSData = require("SFSData");
var ListButtonPhom = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
    },

    buildUI: function () {
        this.tableVO = null;

        this.btnXepBai = null;
        this.btnChonLai = null;
        this.btnDanhBai = null;
        this.btnBaoU = null;
        this.btnGuiBai = null;
        this.btnHaPhom = null;
        this.btnBocBai = null;
        this.btnAnBai = null;
    },

    applyLayout: function () {
        this.btnXepBai = this.container.getChildByName("btnXepBai").getComponent(cc.Button);
        this.btnChonLai = this.container.getChildByName("btnChonLai").getComponent(cc.Button);
        this.btnDanhBai = this.container.getChildByName("btnDanhBai").getComponent(cc.Button);
        this.btnBaoU = this.container.getChildByName("btnBaoU").getComponent(cc.Button);
        this.btnGuiBai = this.container.getChildByName("btnGuiBai").getComponent(cc.Button);
        this.btnHaPhom = this.container.getChildByName("btnHaPhom").getComponent(cc.Button);
        this.btnBocBai = this.container.getChildByName("btnBocBai").getComponent(cc.Button);
        this.btnAnBai = this.container.getChildByName("btnAnBai").getComponent(cc.Button);
        this.btnStartY = this.btnXepBai.node.y;
    },

    initialize: function () {
        this.disableAllButton();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override//////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    updateCurrentTurn: function (status) {
        if(this.tableVO.curTurn === this.tableVO.myId)
        {
            this.setEnableButton(this.btnBaoU,  true);
            this.setEnableButton(this.btnAnBai,  true);
            this.showBtnXepBai();

            var seat = this.tableVO.getSeatByUserId(this.tableVO.myId);
            if(seat.cardNrReminder === 10 || status === SFSData.DISCARD)
            {
                this.showBtnDanhBai();
                this.setEnableButton(this.btnGuiBai, false);
            }
            else
            {
                this.showBtnAnBai();
                this.showBtnBocBai();
                this.setEnableButton(this.btnBocBai, true);
            }

            switch (status)
            {
                case SFSData.DOWN_CARD:
                    this.showBtnHaPhom();
                    this.setEnableButton(this.btnHaPhom,  true);
                    break;
                case SFSData.SEND_CARD:
                    this.showBtnGuiBai();
                    this.setEnableButton(this.btnGuiBai,  true);
                    this.setEnableButton(this.btnXepBai,  true);
                    this.showBtnDanhBai();
                    this.showBtnXepBai();
                    break;
            }
        }
        else
        {
            this.disableAllButton();
        }
        this.setEnableButton(this.btnXepBai,  true);
    },

    disableAllButton: function () {
        this.setEnableButton(this.btnXepBai, false);
        this.setEnableButton(this.btnChonLai, false);
        this.setEnableButton(this.btnDanhBai, false);
        this.setEnableButton(this.btnBaoU, false);
        this.setEnableButton(this.btnGuiBai, false);
        this.setEnableButton(this.btnHaPhom, false);
        this.setEnableButton(this.btnBocBai, false);
        this.setEnableButton(this.btnAnBai, false);
    },

    dealCards: function () {
        this.setEnableButton(this.btnXepBai,  true);
        this.setEnableButton(this.btnBaoU,  true);
        this.setEnableButton(this.btnAnBai,  true);
        this.showBtnDanhBai();
        this.showBtnXepBai();
    },

    discard: function (card,userId,nextTurn) {
        if (this.tableVO.myId === nextTurn) {
            this.setEnableButton(this.btnBocBai,  true);
            this.showBtnAnBai();
            this.showBtnBocBai();
        }
    },

    stealCard: function (card,userId, moneyAR, moneyBR) {
        if (userId === this.tableVO.myId)
        {
            this.setEnableButton(this.btnBocBai,  false);
            this.showBtnDanhBai();
        }
    },

    downCardFinish: function (userId) {
        if (userId === this.tableVO.myId){
            this.showBtnGuiBai();
            this.setEnableButton(this.btnGuiBai,  true);
            this.setEnableButton(this.btnXepBai,  true);
            this.showBtnDanhBai();
            this.showBtnXepBai();
        }
    },

    meDrawCard: function (cardId) {
        this.showBtnDanhBai();
        this.setEnableButton(this.btnBocBai,  false);
    },

    showBtnBocBai:function () {
        this.showInStage(this.btnBocBai.node,this.btnStartY);
        this.hideFromStage(this.btnHaPhom.node);
        this.hideFromStage(this.btnGuiBai.node);
    },

    showBtnHaPhom:function () {
        this.showInStage(this.btnHaPhom.node,this.btnStartY);
        this.hideFromStage(this.btnBocBai.node);
        this.hideFromStage(this.btnGuiBai.node);
    },

    showBtnGuiBai:function () {
        this.showInStage(this.btnGuiBai.node,this.btnStartY);
        this.hideFromStage(this.btnHaPhom.node);
        this.hideFromStage(this.btnBocBai.node);
    },

    showBtnAnBai:function () {
        this.showInStage(this.btnAnBai.node,this.btnStartY);
        this.hideFromStage(this.btnDanhBai.node);
    },

    showBtnDanhBai:function () {
        this.showInStage(this.btnDanhBai.node,this.btnStartY);
        this.hideFromStage(this.btnAnBai.node);
    },

    showBtnChonLai:function () {
        this.showInStage(this.btnChonLai.node,this.btnStartY);
        this.hideFromStage(this.btnXepBai.node);
    },

    showBtnXepBai:function () {
        this.showInStage(this.btnXepBai.node,this.btnStartY);
        this.hideFromStage(this.btnChonLai.node);
    },

    showCards:function (seatId, cards) {
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (!mySeat || mySeat.id !== seatId) return;

        this.setEnableButton(this.btnXepBai,  true);
        this.setEnableButton(this.btnBaoU,  true);
        this.setEnableButton(this.btnAnBai,  true);
        this.showBtnDanhBai();
        this.showBtnXepBai();

        switch (this.tableVO.playingStatus)
        {
            case SFSData.DISCARD:
                this.showBtnDanhBai();
                break;
            case SFSData.DOWN_CARD:
                this.showBtnHaPhom();
                this.setEnableButton(this.btnHaPhom,  true);
                this.showBtnDanhBai();
                break;
            case SFSData.DRAW_CARD:
                this.showBtnBocBai();
                this.setEnableButton(this.btnBocBai,  true);
                break;
            case SFSData.SEND_CARD:
                this.showBtnGuiBai();
                this.setEnableButton(this.btnGuiBai,  true);
                break;
        }
    },

    finishCoundownTime:function () {
        this.setEnableButton(this.btnDanhBai, false);
        this.setEnableButton(this.btnBaoU, false);
        this.setEnableButton(this.btnGuiBai, false);
        this.setEnableButton(this.btnHaPhom, false);
        this.setEnableButton(this.btnBocBai, false);
        this.setEnableButton(this.btnAnBai, false);
    },

    finishGame:function () {
        this.disableAllButton();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    
    setEnableButton:function (button, isEnable) {
        //button.enabled = isEnable;
        //button.interactable = isEnable;
       // button.disabled = !isEnable;
        button.node.active = isEnable;
    },


    checkEnablePlayCards:function (cardShot) {
        this.setEnableButton(this.btnDanhBai, true);
    },

    setEnabledPlayCards:function (isEnable) {
        this.setEnableButton(this.btnDanhBai, isEnable);
    }
});


ListButtonPhom.create = function (componentId, container) {
    var component = new ListButtonPhom();
    component.initComponent(componentId, container);
    return component;
};

module.exports = ListButtonPhom;
