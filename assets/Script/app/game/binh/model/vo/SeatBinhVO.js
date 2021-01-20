var BaseVO = require('BaseVO');
var SeatVO = require('SeatVO');
var LogicBinh = require('LogicBinh');
var GameConfig = require('GameConfig');
var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        parent: SeatVO,
        constructor: function () {
            SeatVO.prototype.constructor.call(this);
            this.score = 0;
            this.isBinhLung = false;
            this.isMauBinh = false;
            this.isSort = false;

            this.cardsChi1 = [];
            this.cardsChi2 = [];
            this.cardsChi3 = [];

            this.rankChi1 = 0;
            this.rankChi2 = 0;
            this.rankChi3 = 0;

            this.sapHam = [];
            this.batSapHam = [];
            this.batSapLang = false;
            this.biSapLang = false;
            this.winType = 0;
            this.bonusChi = 0;
            this.scoreBatSapLang = 0;
            this.scoreSapLang = 0;
            this.scoreLung = 0;
            this.scoreMauBinh = 0;
            this.score1 = 0;
            this.score2 = 0;
            this.score3 = 0;
            this.total = 0;
            this.scoreSapHam = 0
        }
    },

    // INSTANCE MEMBERS
    {
        updateData: function (data) {
            this.isBinhLung = data.isBinhLung;
            this.isSort = false;

            this.cardsChi1 = data.cardsChi1;
            this.cardsChi2 = data.cardsChi2;
            this.cardsChi3 = data.cardsChi3;

            this.rankChi1 = data.rankChi1;
            this.rankChi2 = data.rankChi2;
            this.rankChi3 = data.rankChi3;

            this.sapHam = data.sapHam;
            this.batSapHam = data.batSapHam;
            this.batSapLang = data.batSapLang;
            this.biSapLang = data.biSapLang;
            this.winType = data.winType;
            this.bonusChi = data.bonusChi;
            this.scoreBatSapLang = data.scoreBatSapLang;
            this.scoreSapLang = data.scoreSapLang;
            this.scoreLung = data.scoreLung;
            this.score1 = data.score1;
            this.score2 = data.score2;
            this.score3 = data.score3;
            this.total = data.total;
            this.scoreSapHam = data.scoreSapHam;
            this.scoreMauBinh = data.scoreMauBinh;

           //this.earnMoney = (GameConfig.CURRENT_MODE === 'MONEY')?parseInt(data.money):parseInt(data.chip);
            this.earnMoney = parseInt(data.money);

            if(this.cardsChi1 && this.cardsChi1.length > 0){
                this.cards = [];
                this.cards.push(this.cardsChi1);
                this.cards.push(this.cardsChi2);
                this.cards.push(this.cardsChi3);
            }


        },

        getScoreChi:function (chiIndex) {
            switch (chiIndex){
                case LogicBinh.INDEX_CHI1:
                    return this.score1;
                    break;
                case LogicBinh.INDEX_CHI2:
                    return this.score2;
                    break;
                case LogicBinh.INDEX_CHI3:
                    return this.score3;
                case LogicBinh.INDEX_CHI_AT:
                    return this.bonusChi;
                    break;
            }

            return 0;
        },

        getRankChi:function (chiIndex) {
            switch (chiIndex){
                case LogicBinh.INDEX_CHI1:
                    return this.rankChi1;
                    break;
                case LogicBinh.INDEX_CHI2:
                    return this.rankChi2;
                    break;
                case LogicBinh.INDEX_CHI3:
                    return this.rankChi3;
                    break;
            }

            return 0;
        },

        reset: function () {
            SeatVO.prototype.reset.call(this);
            this.score = 0;
            this.isBinhLung = false;

            this.cardsChi1 = [];
            this.cardsChi2 = [];
            this.cardsChi3 = [];

            this.rankChi1 = 0;
            this.rankChi2 = 0;
            this.rankChi3 = 0;

            this.sapHam = [];
            this.batSapHam = [];
            this.batSapLang = false;
            this.biSapLang = false;
            this.isMauBinh = false;
            this.winType = 0;
            this.bonusChi = 0;
            this.scoreBatSapLang = 0;
            this.scoreSapLang = 0;
            this.scoreLung = 0;
            this.score1 = 0;
            this.score2 = 0;
            this.score3 = 0;
            this.total = 0;
            this.scoreSapHam = 0;
            this.scoreMauBinh = 0;
        },

    },
    // STATIC MEMBERS
    {}
);