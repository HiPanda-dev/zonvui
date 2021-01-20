var Component = require('Component');
var TableXocDiaVO = require('TableXocDiaVO');
var ListButtonXocDia = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
    },

    buildUI: function () {
        Component.prototype.buildUI.call(this);
    },

    applyLayout: function () {
        Component.prototype.applyLayout.call(this);
        this.btnNhaCai = this.container.getChildByName("btnNhaCai").getComponent(cc.Button);
        this.btnMuaCai = this.container.getChildByName("btnMuaCai").getComponent(cc.Button);
        this.btnDatLai = this.container.getChildByName("btnDatLai").getComponent(cc.Button);
        this.btnX2 = this.container.getChildByName("btnX2").getComponent(cc.Button);

        this.btnDuoiChan = this.container.getChildByName("btnDuoiChan").getComponent(cc.Button);
        this.btnDuoiLe = this.container.getChildByName("btnDuoiLe").getComponent(cc.Button);
        this.btnCanHet = this.container.getChildByName("btnCanHet").getComponent(cc.Button);
    },

    initialize: function () {
        Component.prototype.initialize.call(this);
        this.checkShowBuyMasterGame();
        this.checkGameMode();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    updateGameState:function () {
        switch (this.tableVO.gameState){
            case  TableXocDiaVO.STATE_START_BET:
                this.setEnableModeUser(true);
                this.setEnableModeMaster(false);
                break;
            case TableXocDiaVO.STATE_STOP_BET:
                this.setEnableModeUser(false);
                this.setEnableModeMaster(true);
                break;
            default:
                this.setEnableModeUser(false);
                this.setEnableModeMaster(false);
                break;
        }
    },
    
    updateOwner: function () {
        Component.prototype.updateOwner.call(this);
        this.checkShowBuyMasterGame();
        this.checkGameMode();
    },

    sitdown: function (seatId, user) {
        this.checkShowBuyMasterGame();
    },

    showBuyMasterGame: function () {
        if(!this.tableVO.isSystem && this.tableVO.registerOwerId === this.tableVO.myId){
            this.btnMuaCai.node.active = false;
        }
        this.checkGameMode();
    },

    checkShowBuyMasterGame:function () {
        this.btnNhaCai.node.active = false;
        this.btnMuaCai.node.active = false;

        if (this.tableVO.isSystem) this.btnNhaCai.node.active = true;
        else {
            if(this.tableVO.ownerId === -1 || this.tableVO.ownerId === "LVC") this.btnMuaCai.node.active = true;
            else this.btnMuaCai.node.active = false;
        }
    },

    checkGameMode: function () {
        if (this.tableVO.ownerId === this.tableVO.myId) {
            this.btnDuoiChan.node.active = true;
            this.btnDuoiLe.node.active = true;
            this.btnCanHet.node.active = true;

            this.btnDatLai.node.active = false;
            this.btnX2.node.active = false;
        } else {
            this.btnDuoiChan.node.active = false;
            this.btnDuoiLe.node.active = false;
            this.btnCanHet.node.active = false;

            this.btnDatLai.node.active = true;
            this.btnX2.node.active = true;
        }
    },


    startGame: function () {
        this.setEnableModeUser(false);
        this.setEnableModeMaster(false);
    },


    startBettingGame: function () {
        this.setEnableModeUser(true);
        this.setEnableModeMaster(false);
    },

    stopBettingGame: function () {
        this.setEnableModeUser(false);
        this.setEnableModeMaster(true);
    },

    diceResult: function (arrDice, arrPos) {
        this.setEnableModeUser(false);
        this.setEnableModeMaster(false);
    },
    
    setEnableModeUser:function (isEnable) {
        this.setEnableButton(this.btnDatLai, isEnable);
        this.setEnableButton(this.btnX2, isEnable);
    },

    setEnableModeMaster:function (isEnable) {
        this.setEnableButton(this.btnDuoiChan, isEnable);
        this.setEnableButton(this.btnDuoiLe, isEnable);
        this.setEnableButton(this.btnCanHet, isEnable);
    },

    setEnableButton:function (button, isEnable) {
        button.enabled = isEnable;
        button.interactable = isEnable;
        button.disabled = !isEnable;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

});

ListButtonXocDia.create = function (componentId, container) {
    var component = new ListButtonXocDia();
    component.initComponent(componentId, container);
    return component;
};

module.exports = ListButtonXocDia;