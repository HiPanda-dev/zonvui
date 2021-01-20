var Component = require('Component');
var TableXocDiaVO = require('TableXocDiaVO');
var McBatXocDia = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
    },

    buildUI: function () {
        Component.prototype.buildUI.call(this);
    },

    applyLayout: function () {
        Component.prototype.applyLayout.call(this);
        this.mcDia = this.container.getChildByName("mcDia");
        this.mcAnim = this.container.getChildByName("mcAnim");
        this.armatureDisplay = this.mcAnim.getComponent(dragonBones.ArmatureDisplay);
        this.armature = this.armatureDisplay.armature();
        this.mcDice1 = this.mcDia.getChildByName("mcDice1");
        this.mcDice2 = this.mcDia.getChildByName("mcDice2");
        this.mcDice3 = this.mcDia.getChildByName("mcDice3");
        this.mcDice4 = this.mcDia.getChildByName("mcDice4");
        this.mcBat = this.mcDia.getChildByName("mcBat");

        this.red_dice = cc.instantiate(this.mcDice1).getComponent(cc.Sprite);
        this.white_dice = cc.instantiate(this.mcDice2).getComponent(cc.Sprite);
    },

    initialize: function () {
        Component.prototype.initialize.call(this);
        this.mcAnim.active = false;
        this.mcDia.active = true;
        this.mcBat.active = true;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    startGame: function () {
        this.startAnim();
        this.mcBat.active = true;
    },

    countDownDestroyGame:function (time) {
        this.stopAnim();
        this.mcBat.active = true;
    },

    finishCoundownTime: function () {
        if (this.tableVO.gameState === TableXocDiaVO.STATE_START) {
            this.stopAnim();
        }
    },

    startBettingGame: function () {
        this.stopAnim();
    },

    diceResult: function (arrDice, arrPos) {
        this.mcBat.active = false;
        var arr = [this.mcDice1, this.mcDice2, this.mcDice3, this.mcDice4];
        for (var i = 0; i < arrDice.length; i++) {
            var spriteDice = (arrDice[i] % 2 === 0) ? this.white_dice : this.red_dice;
            var dice = arr[i].getComponent(cc.Sprite);
            dice.spriteFrame = spriteDice.spriteFrame;
        }
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    startAnim: function () {
        this.mcAnim.active = true;
        this.mcDia.active = false;
    },

    stopAnim: function () {
        this.mcAnim.active = false;
        this.mcDia.active = true;
    }
});

McBatXocDia.create = function (componentId, container) {
    var component = new McBatXocDia();
    component.initComponent(componentId, container);
    return component;
};

module.exports = McBatXocDia;