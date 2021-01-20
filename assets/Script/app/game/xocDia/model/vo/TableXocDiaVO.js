var BaseVO = require("BaseVO");
var TableVO = require("TableVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: TableVO,
        constructor: function () {
            TableVO.prototype.constructor.call(this);
            this.gameState = "";
            this.isBet = false;
            this.curIdxChip = 0;
            this.maxMoneyBet = 2500;
            this.timeBet = 0;
            this.listTotalBet = [0, 0, 0, 0, 0, 0];
            this.listMyBet = [0, 0, 0, 0, 0, 0];
            this.listUserBet = [];
            this.resultVO = [];
            this.betHistory = [];
        }
    },

    // INSTANCE MEMBERS
    {
        getListMoneyChip: function () {
            return this.rules.listMoneyChip;
        },

        getCurrentMoneyChip: function () {
            return this.rules.listMoneyChip[this.curIdxChip];
        },

        getCurrentMoney: function () {
            if (!this.getCurrentMoneyChip()) return 0;
            return this.getCurrentMoneyChip();
        },

        clearlistMyBet: function () {
            this.listMyBet = [0, 0, 0, 0, 0, 0];
        },

        clearlistTotal: function () {
            this.listTotalBet = [0, 0, 0, 0, 0, 0];
        },

        getTypeBetWithBet: function (bet) {
            for (var i = this.rules.listMoneyChip.length; i >= 0; i--) {
                if (this.rules.listMoneyChip[i] <= bet) {
                    return i;
                }
            }
            return 0;
        },

        updateBetHistory: function () {
            var isUpdate = false;
            for (var i = 0; i < this.listMyBet.length; i++) {
                if (this.listMyBet[i] !== 0) {
                    isUpdate = true;
                    break
                }
            }

            if (isUpdate) this.betHistory = this.listMyBet;
        },

        reset: function () {
            TableVO.prototype.reset.call(this);
            this.isBet = false;
            this.curIdxChip = 0;
            this.registerOwerId = -1;
            this.listTotalBet = [0, 0, 0, 0, 0, 0];
            this.listMyBet = [0, 0, 0, 0, 0, 0];
            this.resultVO = [];
            this.listUserBet = [];
        },

        destroy: function () {
            TableVO.prototype.destroy.call(this);
            this.listMoneyChip = null;
            this.listTotalBet = null;
            this.listMyBet = null;
            this.resultVO = null;
            this.listUserBet = null;
            this.betHistory = null;
        }

    },
    // STATIC MEMBERS
    {
        STATE_WAIT: "w",
        STATE_START: "d",
        STATE_START_BET: "b",
        STATE_STOP_BET:'sb',
        STATE_RESULT: "sr",
        STATE_GAME_OVER: "go",

        POS_LE: 0,
        POS_CHAN: 3,
        POS_SPECIAL_1: 2,
        POS_SPECIAL_2: 1,
        POS_SPECIAL_3: 5,
        POS_SPECIAL_4: 4

    }
);