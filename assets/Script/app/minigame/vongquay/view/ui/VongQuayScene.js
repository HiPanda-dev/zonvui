var BasePopup = require('BasePopup');
var Utility = require('Utility');
var VongQuaySceneMediator = require('VongQuaySceneMediator');

cc.Class({
    extends: BasePopup,

    properties: {
        bonusSpinPanel: cc.Node,
        normalSpinPanel: cc.Node,
        btnSpin: cc.Button,
        lightEffect: cc.Node,
        lbSpinTimes: cc.Label,
        messagePanel: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        VongQuaySceneMediator.getInstance().init(this);

        this.lbMessage = this.messagePanel.getChildByName("lbMessage").getComponent(cc.Label);
        this.runEffectLight(this.lightEffect);
        this.spinTimes = 0;
        this.rewardTable = [{pos:1,result:"10 ROY"},{pos:4,result:"20 ROY"},{pos:6,result:"30 ROY"}, {pos:10,result:"100 ROY"},
            {pos:8,result:"500 ROY"},{pos:3,result:"1K ROY"},{pos:5,result:"5K ROY"},{pos:7,result:"50K CEN"},
            {pos:9,result:"100K CEN"},{pos:2,result:"200K CEN"},{pos:11,result:"500K CEN"},{pos:0,result:"IPHONE"}];

        this.rewardBonusTable = [{pos:0,result:"3 Free Minipoker cược 100"},{pos:1,result:"3 Free Pokemon cược 100"},{pos:7,result:"Free VIP 1"},
            {pos:6,result:"Free VIP 3"},{pos:5,result:"500K CEN"},{pos:4,result:"1M CEN"},{pos:3,result:"Thẻ 100K"},{pos:2,result:"Trượt"}];

        this.activeSendGetInfoVongQuay();

        this.result = 0;
        this.resultBonus = 0;
    },

    onHandlerDisconnect:function () {
        this.activeDisconnect();
    },

    onUpdateInfo: function (data) {
        // this.spinTimes = data.ticket;
        this.spinTimes = 1;
        this.lbSpinTimes.string = "" + this.spinTimes;

    },

    touchSpin: function () {
        if(this.spinTimes === 0){
            this.onShowMessage("Bạn không đủ lượt quay");
            return;
        }
        this.activeSendSpinVongQuay();
    },

    touchHistory: function () {
        this.activeBtnHistory();
    },

    touchGuide: function () {
        this.activeBtnGuide();
    },

    touchRank: function () {
        this.activeBtnRank();
    },

    onStartSpin: function (data) {
        if(this.spinTimes > 0)
            this.spinTimes -= 1;
        this.lbSpinTimes.string = "" + this.spinTimes;

        this.result = data.vong1;
        this.resultBonus = data.vong2;
        this.btnSpin.enabled = false;
        this.spin(this.normalSpinPanel, 4, 1, this.rewardTable[this.result].pos*30+15);
        this.spin(this.bonusSpinPanel, 4.5, -1, this.rewardBonusTable[this.resultBonus].pos*45, function () {
            this.onShowResultSpin();
        }.bind(this));
    },

    spin: function(node, time, direction, result, onComplete){
        var callFunc = cc.callFunc(function () {
            node.angle = result;
        });
        var complete = cc.callFunc(onComplete);

        node.runAction(cc.sequence(cc.rotateBy(time,360*8*direction).easing(cc.easeIn(3)),
            callFunc,
            cc.rotateBy(time,360*8*direction).easing(cc.easeOut(time)),
            complete));
    },

    onShowResultSpin: function () {
        this.btnSpin.enabled = true;

        if(this.resultBonus !== 7)
            this.onShowMessage("Chúc mừng bạn nhận được " + this.rewardTable[this.result].result + " và " +
                    this.rewardBonusTable[this.resultBonus].result);
        else
            this.onShowMessage("Chúc mừng bạn nhận được " + this.rewardTable[this.result].result);

        this.activeUpdateMoney();
    },

    runEffectLight: function (node) {
        var fadeIn = cc.fadeIn(0.3);
        var rotate = cc.rotateBy(0,8);
        var fadeOut = cc.fadeOut(0.3);
        node.runAction(cc.sequence(fadeIn, fadeOut, rotate).repeatForever());
    },

    onShowMessage: function (msg) {
        this.messagePanel.active = true;
        this.lbMessage.string = msg;

        var callFunc = cc.callFunc(function () {
            this.messagePanel.active = false;
        }.bind(this));
        this.messagePanel.runAction(cc.sequence(cc.fadeIn(0.3) , cc.delayTime(4) , cc.fadeOut(0.5), callFunc));
    }
});
