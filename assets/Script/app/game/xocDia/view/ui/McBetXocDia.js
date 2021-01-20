var Component = require('Component');
var Utility = require('Utility');
var TableXocDiaVO = require('TableXocDiaVO');
var GameEvent = require('GameEvent');
var McBetXocDia = cc.Class({
    extends: Component,

    initComponent: function (componentId, container) {
        Component.prototype.initComponent.call(this, componentId, container);
    },

    buildUI: function () {
        Component.prototype.buildUI.call(this);
        this.listChipBet = [];
        this.playerMgr = null;
        this.mcMoney = null;
        this.timeMove = 0.8;
    },

    applyLayout: function () {
        Component.prototype.applyLayout.call(this);

        this.btnChan = this.container.getChildByName("btnChan");
        this.btnLe = this.container.getChildByName("btnLe");
        this.btnSpec1 = this.container.getChildByName("btnSpec1");
        this.btnSpec2 = this.container.getChildByName("btnSpec2");
        this.btnSpec3 = this.container.getChildByName("btnSpec3");
        this.btnSpec4 = this.container.getChildByName("btnSpec4");

        this.mcWinLe = this.btnLe.getChildByName("bgWin");
        this.mcWinChan = this.btnChan.getChildByName("bgWin");
        this.mcWinSpec1 = this.btnSpec1.getChildByName("bgWin");
        this.mcWinSpec2 = this.btnSpec2.getChildByName("bgWin");
        this.mcWinSpec3 = this.btnSpec3.getChildByName("bgWin");
        this.mcWinSpec4 = this.btnSpec4.getChildByName("bgWin");

        this.earnChip = this.container.getChildByName("earnChip");

        this.ctnChip = new cc.Node();
        this.ctnChipLe = new cc.Node();
        this.ctnChipChan = new cc.Node();
        this.ctnChipSpec1 = new cc.Node();
        this.ctnChipSpec2 = new cc.Node();
        this.ctnChipSpec3 = new cc.Node();
        this.ctnChipSpec4 = new cc.Node();

        this.ctnChip.addChild(this.ctnChipLe);
        this.ctnChip.addChild(this.ctnChipChan);
        this.ctnChip.addChild(this.ctnChipSpec1);
        this.ctnChip.addChild(this.ctnChipSpec2);
        this.ctnChip.addChild(this.ctnChipSpec3);
        this.ctnChip.addChild(this.ctnChipSpec4);

        this.container.addChild(this.ctnChip);
        this.container.removeChild(this.earnChip);

        this.listButton = [this.btnLe, this.btnSpec2, this.btnSpec1, this.btnChan, this.btnSpec4, this.btnSpec3];
        this.listMcWinner = [this.mcWinLe, this.mcWinSpec2, this.mcWinSpec1, this.mcWinChan, this.mcWinSpec4, this.mcWinSpec3];
        this.listCtnChip = [this.ctnChipLe, this.ctnChipSpec2, this.ctnChipSpec1, this.ctnChipChan, this.ctnChipSpec4, this.ctnChipSpec3];

        this.winPos = null;
        this.listChipSprite = null;
    },

    initialize: function () {
        Component.prototype.initialize.call(this);
        this.updateBet();
        this.updateChipBet();
        this.initWinBet();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    startGame: function () {
        this.clearBet();
    },

    diceResult: function (arrDice, arrPos) {
        for (var i = 0; i < arrPos.length; i++) {
            var pos = arrPos[i];
            var mcWin = this.listMcWinner[pos];
            this.disPlayWinning(mcWin);
        }

        this.winPos = arrPos;
    },

    finishGame: function () {
        if (!this.winPos) return;
        //don chip
        for (var i = 0; i < this.listCtnChip.length; i++) {
            if (this.checkHasWinPos(i)) continue;
            this.moveChipToMasterPos(this.listCtnChip[i], i);
        }

        //tra chip ve o thang
        TweenLite.delayedCall(this.timeMove + 0.2, function () {
            for (var i = 0; i < this.winPos.length; i++) {
                var listUser = this.tableVO.listUserBet[this.winPos[i]];
                if (listUser && listUser.length > 0) {
                    this.moveChipToWinPos(this.listCtnChip[this.winPos[i]], this.winPos[i]);
                }
            }
        }.bind(this));


        //cong tien cho thang thang
        TweenLite.delayedCall((this.timeMove * 4) + 0.2, function () {
            this.changeUserMoney();
        }.bind(this));
    },

    changeUserMoney: function () {
        var vtPlayer = this.tableVO.resultVO;
        for (var i = 0; i < vtPlayer.length; i++) {
            var user = vtPlayer[i];
            var seat = this.tableVO.getSeatByUserId(user.userName);
            if (user.id === "LVC") continue;
            if (user.money === 0) continue;
            if (!seat) continue;
            this.container.emit(GameEvent.UPDATE_USER_MONEY_EVENT, {seatId: seat.id, money: user.money});
        }
    },

    soldBet: function (postion) {
        var ctn = this.listCtnChip[postion];
        var listUser = this.tableVO.listUserBet[postion];
        var iSend = false;
        if (!ctn) ctn.removeAllChildren();
        if (!listUser || listUser.length === 0) return;
        for (var i = 0; i < listUser.length; i++) {
            var userId = listUser[i];
            var seat = this.tableVO.getSeatByUserId(userId);
            if (iSend) continue;
            if (!seat) iSend = true;
            this.moveChipToPlayerWin(ctn, postion);
        }
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * neu minh la chu phong thi chuyen chip ve minh
     * @param ctn
     */
    moveChipToMasterPos: function (ctn, type) {
        if (this.tableVO.listTotalBet[type] === 0) return;
        ctn.removeAllChildren();
        var chipNode = this.createEarnChip(ctn, type);
        var masterPos = this.getMasterPos();
        TweenLite.to(chipNode, this.timeMove, {
            x: masterPos.x, y: masterPos.y, onComplete: function (ctn) {
                ctn.removeAllChildren();
            }.bind(this), onCompleteParams: [ctn]
        });
    },

    /**
     * di chuyen chip ve o thang cuoc
     * @param ctn
     */
    moveChipToWinPos: function (ctn, type) {
        var chipNode = this.createEarnChip(ctn, type);
        var masterPos = this.getMasterPos();
        TweenLite.from(chipNode, this.timeMove, {
            x: masterPos.x, y: masterPos.y, onComplete: function (ctn) {
                TweenLite.delayedCall(this.timeMove, function (ctn) {
                    ctn.removeAllChildren();
                    this.moveChipToPlayerWin(ctn, type);
                }.bind(this), [ctn]);
            }.bind(this), onCompleteParams: [ctn]
        });
    },

    /**
     * tra chip cho nguoi choi
     */
    moveChipToPlayerWin: function (ctn, type) {
        var winSize = cc.director.getWinSize();
        var listUser = this.tableVO.listUserBet[type];
        var iCount = 0;
        if (!listUser || listUser.length === 0) return;
        for (var i = 0; i < listUser.length; i++) {
            var userId = listUser[i];
            var seat = this.tableVO.getSeatByUserId(userId);
            if (seat && seat.id === 1) continue;
            var seatPos = new cc.Vec2(0, 0);
            var isSeat = true;
            if (seat) seatPos = this.getUserPosBySeatId(seat.id);
            else if (userId === this.tableVO.myId) seatPos = new cc.Vec2(this.mcMoney.x, this.mcMoney.y);
            else {
                seatPos = new cc.Vec2(winSize.width / 2, winSize.height / 4);
                iCount++;
                isSeat = false;
            }

            if (iCount > 1 && !isSeat) continue;

            var chipNode = this.createEarnChip(ctn, type);
            TweenLite.to(chipNode, this.timeMove, {
                x: seatPos.x, y: seatPos.y, onComplete: function () {
                    ctn.removeAllChildren();
                }.bind(this)
            });

        }
    },

    createEarnChip: function (ctn, type) {
        var posEnd = this.getPositionBet(type);
        var chipNode = cc.instantiate(this.earnChip);
        ctn.addChild(chipNode);
        chipNode.x = posEnd.x;
        chipNode.y = posEnd.y;
        return chipNode;
    },

    checkHasWinPos: function (pos) {
        for (var i = 0; i < this.winPos.length; i++) {
            if (pos === this.winPos[i]) {
                return true;
            }
        }
        return false;
    },

    initWinBet: function () {
        this.mcWinChan.opacity = 0;
        this.mcWinLe.opacity = 0;
        this.mcWinSpec1.opacity = 0;
        this.mcWinSpec2.opacity = 0;
        this.mcWinSpec3.opacity = 0;
        this.mcWinSpec4.opacity = 0;
    },

    disPlayWinning: function (mcWin) {
        mcWin.opacity = 0;
        TweenLite.to(mcWin, 0.25, {
            opacity: 255, repeat: 20, yoyo: false, onComplete: function () {
                mcWin.opacity = 0;
            }
        });
    },

    updateChipBet: function () {
        for (var i = 0; i < this.listChipBet.length; i++) {
            var mcChip = this.listChipBet[i];
            var txtBet = mcChip.node.getChildByName("txtBet").getComponent(cc.Label);
            txtBet.string = this.tableVO.getListMoneyChip()[i].toString();
        }
    },

    clearBet: function () {
        for (var i = 0; i < this.listCtnChip.length; i++) {
            this.listCtnChip[i].removeAllChildren();
        }
        this.updateBet();
    },


    playBet: function (pos, typeBet, userName, bet) {
        typeBet = (typeBet === undefined) ? this.tableVO.getTypeBetWithBet(bet) : typeBet;
        var posStart = this.getPostionStartBet(userName, typeBet);
        var chipNode = this.getChipSprite(typeBet);
        var posEnd = this.getPositionBet(pos);
        var rd = this.getRandomPosition(pos);
        var ctn = this.listCtnChip[pos];
        posEnd.x += rd.x;
        posEnd.y += rd.y;
        ctn.addChild(chipNode);
        chipNode.x = posEnd.x;
        chipNode.y = posEnd.y;

        TweenLite.from(chipNode, 0.4, {
            x: posStart.x, y: posStart.y, onComplete: function () {
                if (ctn.childrenCount > 50) {
                    ctn.removeChild(ctn.children[0]);
                }
                this.updateBet();
            }.bind(this)
        });
    },

    updateBet: function () {
        var listBtn = this.listButton;
        for (var i = 0; i < this.tableVO.listTotalBet.length; i++) {
            var totalMoney = this.tableVO.listTotalBet[i];
            var myMoney = this.tableVO.listMyBet[i];
            var txtTotal = listBtn[i].getChildByName("txtTotal").getComponent(cc.Label);
            var txtMoney = listBtn[i].getChildByName("txtMoney").getComponent(cc.Label);

            txtTotal.string = totalMoney;
            txtMoney.string = myMoney;
        }
    },

    getRandomPosition: function (type) {
        var rdX = 0;
        var rdY = 0;
        switch (type) {
            case TableXocDiaVO.POS_CHAN:
            case TableXocDiaVO.POS_LE:
                rdX = Utility.randomNumber(-40, 40);
                rdY = Utility.randomNumber(-20, 20);
                break;
            case TableXocDiaVO.POS_SPECIAL_1:
            case TableXocDiaVO.POS_SPECIAL_2:
            case TableXocDiaVO.POS_SPECIAL_3:
            case TableXocDiaVO.POS_SPECIAL_4:
                rdX = Utility.randomNumber(-10, 25);
                rdY = Utility.randomNumber(-10, 10);
                break;
        }

        return new cc.Vec2(rdX, rdY);
    },

    getPositionBet: function (type) {
        var listBtn = this.listButton;
        var pos = new cc.Vec2(listBtn[type].x, listBtn[type].y);
        return (pos) ? pos : new cc.Vec2(0, 0);
    },

    updateFinishPos: function (masterPos, myPos, winPos) {

    },


    getMasterPos: function () {
        return this.getUserPosBySeatId(1);
    },

    getUserPosBySeatId: function (seatId) {
        for (var i = 0; i < this.playerMgr.vtChildren.length; i++) {
            var player = this.playerMgr.vtChildren[i];
            if (player && player.seatId === seatId) {
                return new cc.Vec2(player.container.x, player.container.y);
            }
        }
        return new cc.Vec2(0, 0);
    },

    /**
     * vi tri cua minh
     */
    getMyPos: function () {
        var seat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (seat) {
            return this.getUserPosBySeatId(seat.id)
        } else {
            return new cc.Vec2(this.txtMyMoney.node.x, this.txtMyMoney.node.y);
        }
    },

    getChipSprite: function (typeBet) {
        var node = new cc.Node();
        if (!this.listChipSprite || !this.listChipSprite[typeBet]) return node;

        var spite = node.addComponent(cc.Sprite);
        spite.spriteFrame = new cc.SpriteFrame(this.listChipSprite[typeBet]);

        return node;
    },

    getPostionStartBet: function (userName, typeBet) {
        var winSize = cc.director.getWinSize();
        if (this.tableVO.myId === userName) {
            if (!this.listChipBet || !this.listChipBet[typeBet]) return new cc.Vec2(0, 0);
            var mcBet = this.listChipBet[typeBet];
            return new cc.Vec2(mcBet.node.x, mcBet.node.y);
        } else {
            var seat = this.tableVO.getSeatByUserId(userName);
            if (seat) return this.getUserPosBySeatId(seat.id);
            else return new cc.Vec2(winSize.width / 2, winSize.height / 4);
        }
        return new cc.Vec2(0, 0);
    }

});

McBetXocDia.create = function (componentId, container) {
    var component = new McBetXocDia();
    component.initComponent(componentId, container);
    return component;
};

module.exports = McBetXocDia;
