var Component = require('Component');
var McHistoryXocDia = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
    },

    buildUI: function () {

    },

    applyLayout: function () {
        var mcDice1 = this.container.getChildByName("mcDice1");
        var mcDice2 = this.container.getChildByName("mcDice2");
        var mcDice3 = this.container.getChildByName("mcDice3");

        this.txtNumChan = this.container.getChildByName("txtNumChan").getComponent(cc.Label);
        this.txtNumLe = this.container.getChildByName("txtNumLe").getComponent(cc.Label);

        this.posRoot = new cc.Vec2(mcDice1.x, mcDice1.y);
        this.spaceW = mcDice2.x - mcDice1.x;
        this.spaceH = mcDice3.y - mcDice1.y;

        this.red_temp = cc.instantiate(mcDice1);
        this.white_temp = cc.instantiate(mcDice2);

        this.container.removeChild(mcDice1);
        this.container.removeChild(mcDice2);
        this.container.removeChild(mcDice3);

        this.ctnIcon = new cc.Node();
        this.container.addChild(this.ctnIcon);

        this.countChan = 0;
        this.countLe = 0;
        this.vtDice = [];
    },

    initialize: function () {

    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    diceResult:function (arrDice, arrPos) {
        var count =  this.ctnIcon.childrenCount;
        var dice = (this.isChan(arrDice))?cc.instantiate(this.white_temp):cc.instantiate(this.red_temp);

        this.vtDice.unshift(dice);
        this.ctnIcon.removeAllChildren();

        if(this.vtDice.length > 32) this.vtDice.pop();
        for(var i=0;i<this.vtDice.length;i++){
            dice = this.vtDice[i];
            dice.x = this.posRoot.x + (i % 8) * this.spaceW;
            dice.y = this.posRoot.y + Math.floor(i / 8) * this.spaceH;
            this.ctnIcon.addChild(dice);
        }

        if(this.isChan(arrDice)) {
            this.countChan++;
            this.txtNumChan.string = this.countChan;
        }
        else {
            this.countLe++;
            this.txtNumLe.string = this.countLe;
        }
    },

    leaveGame:function () {
        this.ctnIcon.removeAllChildren();
        this.countChan = 0;
        this.countLe = 0;
        this.vtDice = [];
        this.txtNumChan.string = this.countChan;
        this.txtNumLe.string = this.countChan;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    

    isChan: function (array) {
        var count = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === 0) {
                count++;
            }
        }

        if (count % 2 === 0) return true;
        return false;
    }


});

McHistoryXocDia.create = function (componentId, container) {
    var component = new McHistoryXocDia();
    component.initComponent(componentId, container);
    return component;
};

module.exports = McHistoryXocDia;