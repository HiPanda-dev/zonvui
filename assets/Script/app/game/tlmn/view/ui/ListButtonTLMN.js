var Component = require("Component");
var LogicTLMN = require("LogicTLMN");
var ListButtonTLMN = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
    },

    buildUI: function () {
        this.tableVO = null;

        this.btnXepBai = null;
        this.btnBoLuot = null;
        this.btnDanhBai = null;
        this.isFirstRound = false;
    },

    applyLayout: function () {
        this.btnXepBai = this.container.getChildByName("btnXepBai").getComponent(cc.Button);
        this.btnBoLuot = this.container.getChildByName("btnBoLuot").getComponent(cc.Button);
        this.btnDanhBai = this.container.getChildByName("btnDanhBai").getComponent(cc.Button);
        this.icon_hint_danh = this.container.getChildByName("icon_hint_danh");
        this.icon_hint_bo = this.container.getChildByName("icon_hint_bo");
    },

    initialize: function () {
        this.setActiveButton(this.btnBoLuot, false);
        this.setActiveButton(this.btnXepBai, false);
        this.setActiveButton(this.btnDanhBai, false);
        this.setHintObject(this.icon_hint_danh, false);
        this.setHintObject(this.icon_hint_bo, false);
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override//////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    dealCards: function () {
        this.setActiveButton(this.btnXepBai, true);
        this.setHintObject(this.icon_hint_danh, false);
        this.setHintObject(this.icon_hint_bo, false);
        this.isFirstRound = true;
    },

    updateCurrentTurn: function () {
        if (this.tableVO.curTurn === this.tableVO.myId) {
            var seat = this.tableVO.getSeatByUserId(this.tableVO.myId);
            var isCanShot = LogicTLMN.isCanShotCard(seat.cards, this.tableVO.playCards);
            this.setActiveButton(this.btnBoLuot, true);
            this.setActiveButton(this.btnDanhBai, true);
            this.setHintObject(this.icon_hint_danh, false);
            this.setHintObject(this.icon_hint_bo, false);
            if (this.isFirstRound) {
                this.setEnableButton(this.btnBoLuot, false);
                this.setEnableButton(this.btnDanhBai, true);
            } else {
                this.setEnableButton(this.btnBoLuot, true);
                if (isCanShot) {
                    this.setEnableButton(this.btnDanhBai, true);
                } else {
                    this.setEnableButton(this.btnDanhBai, false);
                    this.setHintObject(this.icon_hint_bo, true);
                }

            }

        } else {
            this.setActiveButton(this.btnBoLuot, false);
            this.setActiveButton(this.btnDanhBai, false);
            this.setHintObject(this.icon_hint_danh, false);
            this.setHintObject(this.icon_hint_bo, false);
        }
        this.isFirstRound = false;
    },

    showCards: function (seatId, cards) {
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (!mySeat || mySeat.id !== seatId) return;

        this.setActiveButton(this.btnXepBai, true);
    },

    finishCoundownTime: function () {
        this.setActiveButton(this.btnDanhBai, false);
        this.setActiveButton(this.btnBoLuot, false);
    },

    endRound: function () {
        this.setActiveButton(this.btnBoLuot, false);
        this.isFirstRound = true;
    },

    finishGame: function (listResult) {
        this.setActiveButton(this.btnBoLuot, false);
        this.setActiveButton(this.btnXepBai, false);
        this.setActiveButton(this.btnDanhBai, false);
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    checkActiveDanhBai: function () {
        if (this.tableVO.curTurn === this.tableVO.myId) {
            var seat = this.tableVO.getSeatByUserId(this.tableVO.myId);
            var isCanShot = LogicTLMN.isCanShotCard(seat.cards, this.tableVO.playCards);
            this.setActiveButton(this.btnDanhBai, true);
            this.setHintObject(this.icon_hint_danh, false);
            if (isCanShot) {
                this.setEnableButton(this.btnDanhBai, true);
            } else {
                this.setEnableButton(this.btnDanhBai, false);
            }
        }
    },

    setActiveButton: function (button, isActive) {
        if (!button) return;
        button.node.active = isActive;
    },

    setEnableButton: function (button, isEnable) {
        if (!button) return;
        button.node.opacity = (isEnable) ? 255 : 100;
    },

    checkEnablePlayCards: function (cardShot) {
        if (this.tableVO.curTurn !== this.tableVO.myId) {
            this.setActiveButton(this.btnDanhBai, false);
            return;
        }
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (!mySeat) return;

        var cardType = -1;
        var playCards = this.tableVO.playCards.concat();

        if (mySeat.isCancel) {
            if (LogicTLMN.is4doiThong(cardShot)) cardType = LogicTLMN.OTHER_CODE_PAIR_SEQUENCES;
        } else {
            if (cardShot.length === 1) cardType = LogicTLMN.OTHER_CODE_SINGLE;
            if (cardShot.length === 2 && LogicTLMN.isSameNumber(cardShot)) cardType = LogicTLMN.OTHER_CODE_PAIR;
            if (cardShot.length === 3 && LogicTLMN.isSameNumber(cardShot)) cardType = LogicTLMN.OTHER_CODE_TRIPLE;
            if (LogicTLMN.isTuQuy(cardShot)) cardType = LogicTLMN.OTHER_CODE_FOUR_OF_AKIND;
            else if (LogicTLMN.isBoSanh(cardShot)) cardType = LogicTLMN.OTHER_CODE_STRAIGHT;
            else if (LogicTLMN.isDoiThong(cardShot)) cardType = LogicTLMN.OTHER_CODE_PAIR_SEQUENCES;
        }

        if (!LogicTLMN.isCardValid(cardShot, cardType, playCards)) {
            this.setHintObject(this.icon_hint_danh, false);
            this.setHintObject(this.icon_hint_bo, false);
        } else if (cardType === -1) {
            this.setHintObject(this.icon_hint_danh, false);
            this.setHintObject(this.icon_hint_bo, false);
        } else {
            this.setHintObject(this.icon_hint_danh, true);
        }
    },

    setHintObject: function (iconHint, isShow) {
        iconHint.active = isShow;
    }
});


ListButtonTLMN.create = function (componentId, container) {
    var component = new ListButtonTLMN();
    component.initComponent(componentId, container);
    return component;
};

module.exports = ListButtonTLMN;
