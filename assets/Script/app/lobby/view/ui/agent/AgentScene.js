var BasePopup = require('BasePopup');
var AgentSceneMediator = require('AgentSceneMediator');

cc.Class({
    extends: BasePopup,

    properties: {
        content: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        AgentSceneMediator.getInstance().init(this);
        this.item = this.content.getChildByName("item");
        this.content.removeAllChildren();
        this.hide();
    },

    onUpdateAgentInfoList: function (agentList) {
        this.content.removeAllChildren();
        var vo, txtSTT, txtPartner, txtAcount, txtPhone1, txtPhone2, txtAddress, btnTransferGold, btnWeb, bgItem;
        if (!agentList) return;
        for (var i = 0; i < agentList.length; i++) {
            vo = cc.instantiate(this.item);
            txtSTT = vo.getChildByName("txtSTT").getComponent(cc.Label);
            txtPartner = vo.getChildByName("txtPartner").getComponent(cc.Label);
            txtAcount = vo.getChildByName("txtAcount").getComponent(cc.Label);
            txtPhone1 = vo.getChildByName("txtPhone1").getComponent(cc.Label);
            txtPhone2 = vo.getChildByName("txtPhone2").getComponent(cc.Label);
            txtAddress = vo.getChildByName("txtAddress").getComponent(cc.Label);
            bgItem = vo.getChildByName("bgItem");
            btnTransferGold = vo.getChildByName("btnTransferGold");
            btnWeb = vo.getChildByName("btnWeb");

            txtSTT.string = agentList[i].rowIndex;
            txtPartner.string = agentList[i].name;
            txtAcount.string = agentList[i].gameAccount;
            txtPhone1.string = agentList[i].phone[0];
            txtPhone2.string = (!agentList[i].phone[1]) ? "" : agentList[i].phone[1];
            txtPhone1.node.y = (!agentList[i].phone[1]) ? txtAddress.node.y : txtPhone1.node.y;
            txtAddress.string = agentList[i].address;
            bgItem.active = (i%2 === 0);

            btnTransferGold.on(cc.Node.EventType.TOUCH_START, this.onTransferGold.bind(this, agentList[i], this));
            btnWeb.on(cc.Node.EventType.TOUCH_START, this.onOpenWeb.bind(this, agentList[i], this));

            this.content.addChild(vo);
        }
    },

    onTransferGold: function (partner) {
        this.activeTransferdesGoldAgent({
            gameAccount: partner.gameAccount
        });
    },

    onOpenWeb: function (partner) {
        if (partner.fbUrl) {
            window.open(partner.fbUrl);
        }
    },

    onHandlereventBack:function () {
        this.activeBack();
    }
});

