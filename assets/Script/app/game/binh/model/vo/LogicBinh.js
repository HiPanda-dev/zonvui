var BaseVO = require("BaseVO");
var Logic = require("Logic");
var CardVO = require("CardVO");
var Utility = require("Utility");

var puremvc = BaseVO.puremvc;

var LogicBinh = puremvc.define
(
    // CLASS INFO
    {
        parent: Logic,
        constructor: function (type, cards) {
            Logic.prototype.constructor.call(this);
            this.type = type;
            this.cards = cards;
            this.cardVO = [];
            for (var i = 0; i < this.cards.length; i++) {
                var vo = new CardVO(this.cards[i]);
                this.cardVO.push(vo);
            }
        }
    },

    // INSTANCE MEMBERS
    {},

    // STATIC MEMBERS
    {
        CARD_2: 0,
        CARD_A: 12,

        INDEX_CHI1: 0,
        INDEX_CHI2: 1,
        INDEX_CHI3: 2,
        INDEX_CHI_AT: 3,

        IDX_BINH_LUNG: -1,
        IDX_MAU_THAU: 0,
        IDX_DOI: 1,
        IDX_THU: 2,
        IDX_XAM_CO: 3,
        IDX_SANH: 4,
        IDX_THUNG: 5,
        IDX_CU_LU: 6,
        IDX_TU_QUY: 7,
        IDX_THUNG_PHA_SANH: 8,

        IDX_XAM_CO_CHI_3: 9,
        IDX_CU_LU_CHI_2: 10,
        IDX_2_TU_QUY: 11,

        IDX_BA_CHI_SANH: 30,//12,
        IDX_BA_CHI_THUNG: 31,//13,
        IDX_LUC_PHE_BON: 32,//14,
        IDX_SANH_RONG: 38,//15,
        IDX_5_DOI_1_XAM: 33,//16,
        IDX_RONG_CUON: 39,//17,
        IDX_13_CAY_DEN: 36,
        IDX_13_CAY_DO: 37,
        IDX_12_CAY_DEN: 35,
        IDX_12_CAY_DO: 34,

        //idx score
        IDX_TU_QUY_CHI_1: 19,
        IDX_TU_QUY_CHI_2: 20,
        IDX_THUNG_PHA_SANH_CHI_1: 21,
        IDX_THUNG_PHA_SANH_CHI_2: 22,
        IDX_XAP_3_CHI: 23,
        IDX_THANG_XAP_HAM: 24,

        CHI_SCORE: null,

        initScoreChi: function () {
            this.CHI_SCORE = [];
            this.CHI_SCORE[this.IDX_RONG_CUON] = 26;
            this.CHI_SCORE[this.IDX_SANH_RONG] = 13;
            this.CHI_SCORE[this.IDX_5_DOI_1_XAM] = 6;
            this.CHI_SCORE[this.IDX_LUC_PHE_BON] = 3;
            this.CHI_SCORE[this.IDX_BA_CHI_THUNG] = 3;
            this.CHI_SCORE[this.IDX_BA_CHI_SANH] = 3;

            this.CHI_SCORE[this.IDX_TU_QUY_CHI_1] = 4;
            this.CHI_SCORE[this.IDX_TU_QUY_CHI_2] = 8;
            this.CHI_SCORE[this.IDX_CU_LU_CHI_2] = 2;
            this.CHI_SCORE[this.IDX_XAM_CO_CHI_3] = 3;
            this.CHI_SCORE[this.IDX_THUNG_PHA_SANH_CHI_1] = 5;
            this.CHI_SCORE[this.IDX_THUNG_PHA_SANH_CHI_2] = 10;

            this.CHI_SCORE[this.IDX_XAP_3_CHI] = 2;
            this.CHI_SCORE[this.IDX_THANG_XAP_HAM] = 2;
        },

        /**
         * kiểm tra xem đang là loại gì
         * @param    cards
         * @return
         */
        getTypeTheCards: function (cards) {
            var theCards = this.check_ThungPhaSanh(cards);
            if (theCards != null) return new LogicBinh(this.IDX_THUNG_PHA_SANH, theCards);

            theCards = this.check_TuQuy(cards);
            if (theCards != null) return new LogicBinh(this.IDX_TU_QUY, theCards);

            theCards = this.check_CuLu(cards);
            if (theCards != null) return new LogicBinh(this.IDX_CU_LU, theCards);

            theCards = this.check_Thung(cards);
            if (theCards != null) return new LogicBinh(this.IDX_THUNG, theCards);

            theCards = this.check_Sanh(cards);
            if (theCards != null) return new LogicBinh(this.IDX_SANH, theCards);

            theCards = this.check_XamCo(cards);
            if (theCards != null) return new LogicBinh(this.IDX_XAM_CO, theCards);

            theCards = this.check_Thu(cards);
            if (theCards != null) return new LogicBinh(this.IDX_THU, theCards);

            theCards = this.check_Doi(cards);
            if (theCards != null) return new LogicBinh(this.IDX_DOI, theCards);

            return new LogicBinh(this.IDX_MAU_THAU, cards);
        },

        check_ThungPhaSanh: function (cards) {
            var theCards = this.check_Thung(cards);
            theCards = this.check_Sanh(theCards);
            if (theCards === null) return null;
            return theCards;
        },

        check_TuQuy: function (cards) {
            if (cards.length < 4) return null;
            var theCards = cards.concat();
            Utility.sortArray(theCards, "NUMERIC");
            for (var i = 0; i < theCards.length - 3; i++) {
                if (this.isSameNumber([theCards[i], theCards[i + 1], theCards[i + 2], theCards[i + 3]])) {
                    return [theCards[i], theCards[i + 1], theCards[i + 2], theCards[i + 3]];
                }
            }
            return null;
        },


        check_CuLu: function (cards) {
            if (cards.length < 4) return null;
            var theCards = cards.concat();
            var cardBala = this.check_XamCo(cards);
            if (!cardBala) return null;

            for (var i = 0; i < cardBala.length; i++) {
                theCards.splice(theCards.indexOf(cardBala[i]), 1);
            }
            var cardDoi = this.check_Doi(theCards);
            if (cardDoi) {
                return cardBala.concat(cardDoi);
            }

            return null;
        },

        check_Tung_3: function (cards) {
            if (cards === null) return null;
            var arrCount = [0, 0, 0, 0];
            var theCards = cards.concat();
            for (var i = 0; i < theCards.length; i++) {
                var cardObj = new CardVO(theCards[i]);
                arrCount[cardObj.type] += 1;
            }
            for (var j = 0; j < arrCount.length; j++) {
                if (arrCount[j] >= cards.length) {
                    return this.getAllCardByTypeCard(theCards, j);
                }
            }
            return null;
        },

        check_Thung: function (cards) {
            if (cards === null) return null;
            if (cards.length < 5) return null;
            var arrCount = [0, 0, 0, 0];
            var theCards = cards.concat();
            for (var i = 0; i < theCards.length; i++) {
                var cardObj = new CardVO(theCards[i]);
                arrCount[cardObj.type] += 1;
            }
            for (var j = 0; j < arrCount.length; j++) {
                if (arrCount[j] >= cards.length) {
                    return this.getAllCardByTypeCard(theCards, j);
                }
            }
            return null;
        },

        getAllCardByTypeCard: function (cards/*Array*/, type) {
            var theCards = cards.concat();
            var result = [];
            for (var i = 0; i < theCards.length; i++) {
                var cardObj = new CardVO(theCards[i]);
                if (cardObj.type === type) {
                    result.push(theCards[i]);
                }
            }
            return result;
        },

        check_Sanh_3: function (cards) {
            if (cards === null) return null;
            var theCards = cards.concat();
            var result = [];
            Utility.sortArray(theCards, "DESCENDING");
            this.moveCard2ToEnd(theCards);
            var card1, card2;

            result.push(theCards[0]);

            for (var i = 0; i < theCards.length - 1; i++) {
                card1 = new CardVO(theCards[i]);
                card2 = new CardVO(theCards[i + 1]);
                if (card1.numBinh === card2.numBinh) continue;
                else if (card1.numBinh - 1 !== card2.numBinh) {
                    result.splice(0, result.length);
                    result.push(card2.id);
                } else {
                    result.push(card2.id);
                    if (result.length === cards.length && result.length) {
                        return result;
                    }

                    if (result.length == 2) {
                        var cardAtId = this.getAtCard(cards);
                        card1 = new CardVO(result[result.length - 1]);
                        if (card1.num === CardVO.CARD_2 && cardAtId !== -1) {
                            result.push(cardAtId);
                            return result;
                        }
                    }
                }

            }
            return null;
        },

        check_Sanh: function (cards) {
            if (cards === null) return null;
            if (cards.length < 5) return null;
            var theCards = cards.concat();
            var result = [];
            Utility.sortArray(theCards, "DESCENDING");
            this.moveCard2ToEnd(theCards);
            var card1, card2;

            result.push(theCards[0]);

            for (var i = 0; i < theCards.length - 1; i++) {
                card1 = new CardVO(theCards[i]);
                card2 = new CardVO(theCards[i + 1]);
                if (card1.numBinh === card2.numBinh) continue;
                else if (card1.numBinh - 1 !== card2.numBinh) {
                    result.splice(0, result.length);
                    result.push(card2.id);
                } else {
                    result.push(card2.id);
                    if (result.length === cards.length && result.length) {
                        return result;
                    }

                    if (result.length == 4) {
                        var cardAtId = this.getAtCard(cards);
                        card1 = new CardVO(result[result.length - 1]);
                        if (card1.num === CardVO.CARD_2 && cardAtId !== -1) {
                            result.push(cardAtId);
                            return result;
                        }
                    }
                }

            }
            return null;
        },

        getAtCard: function (cards) {
            for (var i = 0; i < cards.length; i++) {
                var card = new CardVO(cards[i]);
                if (card.num === CardVO.CARD_1) return card.id;
            }
            return -1;
        },

        checkSanhAt2345: function (vo/*LogicBinh*/) {
            Utility.sortArray(vo.cards, "DESCENDING");
            this.moveCard2ToEnd(vo.cards);
            var cards1 = new CardVO(vo.cards[0]);
            var cards2 = new CardVO(vo.cards[vo.cards.length - 1]);
            if (cards1.num === CardVO.CARD_1 && cards2.num === CardVO.CARD_2) {
                return true;
            }
            return false;
        },


        check_XamCo: function (cards) {
            if (cards.length < 3) return null;
            var theCards = cards.concat();
            Utility.sortArray(theCards, "DESCENDING");
            for (var i = 0; i <= theCards.length - 3; i++) {
                if (this.isSameNumber([theCards[i], theCards[i + 1], theCards[i + 2]])) {
                    return [theCards[i], theCards[i + 1], theCards[i + 2]];
                }
            }
            return null;
        },

        /**
         * kiểm tra bài có thú hay không
         * @param    cards
         * @return trả ra đôi
         */
        check_Thu: function (cards) {
            if (cards.length < 4) return null;
            var result = [];
            var theCards = cards.concat();
            Utility.sortArray(theCards, "NUMERIC");
            for (var i = 0; i < theCards.length - 1; i++) {
                if (this.isSameNumber([theCards[i], theCards[i + 1]])) {
                    result.push(theCards[i], theCards[i + 1]);
                    i++;
                }
            }
            if (result.length >= 4) return result;
            return null;
        },


        /**
         * kiểm tra bài có đôi hay không
         * @param    cards
         * @return trả ra đôi
         */
        check_Doi: function (cards) {
            var theCards = cards.concat();
            Utility.sortArray(theCards, "NUMERIC");
            for (var i = 0; i < theCards.length - 1; i++) {
                if (this.isSameNumber([theCards[i], theCards[i + 1]])) {
                    return [theCards[i], theCards[i + 1]];
                }
            }
            return null;
        },

        /**
         * trả ra kiểu bài xếp được
         * @param cardsChi
         * @returns {(LogicBinh)} -> null: binh lủng
         */
        check_chi: function (cardsChi/*Array*/) {
            var results = [];
            var cards1, cards2, win, i;
            results [0] = this.getTypeTheCards(cardsChi[0]);
            results [1] = this.getTypeTheCards(cardsChi[1]);
            results [2] = this.getTypeTheCards(cardsChi[2]);

            //kiem tra binh lung
            if (results[0].type < results[1].type || results[1].type < results[2].type) return null;

            //check chi 1 vs chi 2
            if (results[0].type === results[1].type) {
                if (results[0].type === this.IDX_CU_LU) {
                    results[0].cards = this.check_CuLu(results[0].cards);
                    results[1].cards = this.check_CuLu(results[1].cards);
                } else {
                    Utility.sortArray(results[0].cards, "DESCENDING");
                    Utility.sortArray(results[1].cards, "DESCENDING");
                    this.moveCard2ToEnd(results[0].cards);
                    this.moveCard2ToEnd(results[1].cards);
                }

                for (i = 0; i < results[1].cards.length; i++) {
                    cards1 = new CardVO(results[0].cards[i]);
                    cards2 = new CardVO(results[1].cards[i]);

                    if (cards1.numBinh === cards2.numBinh) continue;
                    else if (cards1.numBinh < cards2.numBinh) return null;
                    else break;
                }

            }
            //check chi 2 vs chi 3
            if (results[1].type === results[2].type) {
                Utility.sortArray(results[1].cards, "DESCENDING");
                Utility.sortArray(results[2].cards, "DESCENDING");
                this.moveCard2ToEnd(results[1].cards);
                this.moveCard2ToEnd(results[2].cards);

                for (i = 0; i < results[2].cards.length; i++) {
                    cards1 = new CardVO(results[1].cards[i]);
                    cards2 = new CardVO(results[2].cards[i]);

                    if (cards1.numBinh === cards2.numBinh) continue;
                    else if (cards1.numBinh < cards2.numBinh) return null;
                    else break;
                }
            }
            return results;
        },

        namePerChi: function (cardsChi) {
            var results = [];
            var resultCardsName = [];
            results [0] = this.getTypeTheCards(cardsChi[0]);
            results [1] = this.getTypeTheCards(cardsChi[1]);
            results [2] = this.getTypeTheCards(cardsChi[2]);
            for(var i=0 ; i<3 ; i++){
                resultCardsName[i] = this.getTypeCardsName(results[i].type);
            }
            return resultCardsName;
        },

        getWin: function (vo1, vo2) {
            var len = (vo1.cards.length <= vo2.cards.length) ? vo1.cards.length : vo2.cards.length;

            for (var i = 0; i < len; i++) {
                var cards1 = new CardVO(vo1.cards[i]);
                var cards2 = new CardVO(vo2.cards[i]);
                if (cards1.numBinh === cards2.numBinh) continue;
                else if (cards1.numBinh < cards2.numBinh) return vo2;
                else return vo1;
            }

            return null;
        },


        moveCard2ToEnd: function (arrCards) {
            var idx = 0;
            for (var i = 0; i < arrCards.length; i++) {
                var card = new CardVO(arrCards[idx]);
                if (card.num === CardVO.CARD_2) {
                    arrCards.splice(idx, 1);
                    arrCards.push(card.id);
                } else {
                    idx++;
                }
            }
        },

        moveCard2ToTop: function (arrCards) {
            for (var i = 0; i < arrCards.length; i++) {
                var card = new CardVO(arrCards[i]);
                if (card.num === CardVO.CARD_2) {
                    arrCards.splice(i, 1);
                    arrCards.unshift(card.id);
                }
            }
        },

        moveCardAtToEnd: function (arrCards) {
            var idx = 0;
            for (var i = 0; i < arrCards.length; i++) {
                var card = new CardVO(arrCards[idx]);
                if (card.num === CardVO.CARD_1) {
                    arrCards.splice(idx, 1);
                    arrCards.push(card.id);
                } else {
                    idx++;
                }
            }
        },

        moveCardAtToTop: function (arrCards) {
            for (var i = 0; i < arrCards.length; i++) {
                var card = new CardVO(arrCards[i]);
                if (card.num === CardVO.CARD_1) {
                    arrCards.splice(i, 1);
                    arrCards.unshift(card.id);
                }
            }
        },

        /**
         * kiem tra thang trang
         * @param cardsChi
         * @returns {number}
         */
        check_MauBinh: function (cardsChi/*Array*/) {
            if (this.check_RongCuon(cardsChi)) return this.IDX_RONG_CUON;
            if (this.check_SanhRong(cardsChi)) return this.IDX_SANH_RONG;
            if (this.check_13CayDen(cardsChi)) return this.IDX_13_CAY_DEN;
            if (this.check_13CayDo(cardsChi)) return this.IDX_13_CAY_DO;
            if (this.check_12CayDen(cardsChi)) return this.IDX_12_CAY_DEN;
            if (this.check_12CayDo(cardsChi)) return this.IDX_12_CAY_DO;
            if (this.check_5Doi1Xam(cardsChi)) return this.IDX_5_DOI_1_XAM;
            if (this.check_LucPheBon(cardsChi)) return this.IDX_LUC_PHE_BON;
            if (this.check_3ChiThung(cardsChi)) return this.IDX_BA_CHI_THUNG;
            if (this.check_3ChiSanh(cardsChi)) return this.IDX_BA_CHI_SANH;

            return -1;
        },

        check_13CayDen: function (cardsChi) {
            var theCards = cardsChi[0].concat(cardsChi[1]).concat(cardsChi[2]);
            for (var i = 0; i < theCards.length; i++) {
                var card = new CardVO(theCards[i]);
                if (card.type === CardVO.TYPE_DIAMOND || card.type === CardVO.TYPE_HEART) {
                    return null;
                }
            }

            return theCards;
        },

        check_13CayDo: function (cardsChi) {
            var theCards = cardsChi[0].concat(cardsChi[1]).concat(cardsChi[2]);
            for (var i = 0; i < theCards.length; i++) {
                var card = new CardVO(theCards[i]);
                if (card.type === CardVO.TYPE_SPADE || card.type === CardVO.TYPE_CLUB) {
                    return null;
                }
            }

            return theCards;
        },

        check_12CayDen: function (cardsChi) {
            var num = 0;
            var theCards = cardsChi[0].concat(cardsChi[1]).concat(cardsChi[2]);
            for (var i = 0; i < theCards.length; i++) {
                var card = new CardVO(theCards[i]);
                if (card.type === CardVO.TYPE_DIAMOND || card.type === CardVO.TYPE_HEART) {
                    if (num >= 1) return null;
                    num++;
                }
            }

            return theCards;
        },

        check_12CayDo: function (cardsChi) {
            var num = 0;
            var theCards = cardsChi[0].concat(cardsChi[1]).concat(cardsChi[2]);
            for (var i = 0; i < theCards.length; i++) {
                var card = new CardVO(theCards[i]);
                if (card.type === CardVO.TYPE_SPADE || card.type === CardVO.TYPE_CLUB) {
                    if (num >= 1) return null;
                    num++;
                }
            }

            return theCards;
        },

        check_RongCuon: function (cardsChi) {
            var theCards = cardsChi[0].concat(cardsChi[1]).concat(cardsChi[2]);
            var sanhrong = this.check_Sanh(theCards.concat());
            var thung = this.check_Thung(theCards.concat());
            if (!sanhrong || sanhrong.length !== theCards.length) return false;
            if (!thung) return false;

            return true;
        },

        check_SanhRong: function (cardsChi) {
            var theCards = cardsChi[0].concat(cardsChi[1]).concat(cardsChi[2]);
            var sanhrong = this.check_Sanh(theCards.concat());

            if (!sanhrong || sanhrong.length !== theCards.length) return false;
            return true;
        },

        check_5Doi1Xam: function (cardsChi) {
            var theCards = cardsChi[0].concat(cardsChi[1]).concat(cardsChi[2]);
            var result = [];
            var arrLucPheBon = this.check_LucPheBon(cardsChi);
            if (arrLucPheBon === null) return;
            for (var i = 0; i < arrLucPheBon.length; i++) {
                var cardId1 = arrLucPheBon[i][0];
                var cardId2 = arrLucPheBon[i][1];
                result.push(cardId1);
                result.push(cardId2);
                this.removeItemInArray(theCards, cardId1);
                this.removeItemInArray(theCards, cardId2);
            }

            for (var i = 0; i < theCards.length; i++) {
                var cardObj1 = new CardVO(theCards[i]);
                for (var j = 0; j < result.length; j++) {
                    var cardObj2 = new CardVO(result[j]);
                    if (cardObj1.num === cardObj2.num) {
                        return true;
                    }
                }

            }

            return false;
        },

        check_LucPheBon: function (cardsChi, listCardsId) {
            var theCards = (listCardsId === undefined) ? cardsChi[0].concat(cardsChi[1]).concat(cardsChi[2]) : listCardsId;
            var result = [];
            for (var i = 0; i < theCards.length; i++) {
                var cardsDoi = this.check_Doi(theCards);
                if (!cardsDoi) break;

                result.push(cardsDoi);
                this.removeItemInArray(theCards, cardsDoi[0]);
                this.removeItemInArray(theCards, cardsDoi[1]);
                i = 0;
            }

            if (result.length >= 6) return result;
            else return null;
        },

        check_3ChiThung: function (cardsChi) {
            var chi1 = this.check_Thung(cardsChi[0]);
            var chi2 = this.check_Thung(cardsChi[1]);
            var chi3 = this.check_Tung_3(cardsChi[2]);

            if (!chi1 || !chi2 || !chi3) return false;
            if (this.check_chi(cardsChi) === null) return false;
            return true;
        },

        /**
         *
         * @param cardsChi [[chi1], [chi2], [chi3]]
         */
        check_3ChiSanh: function (cardsChi) {
            var chi1 = this.check_Sanh(cardsChi[0]);
            var chi2 = this.check_Sanh(cardsChi[1]);
            var chi3 = this.check_Sanh_3(cardsChi[2]);

            if (!chi1 || !chi2 || !chi3) return false;
            if (this.check_chi(cardsChi) === null) return false;
            return true;
        },


        removeItemInArray: function (array, item) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === item) {
                    array.splice(i, 1);
                    i--;
                }
            }
        },

        removeListItemInArray: function (array, items) {
            for (var i = 0; i < items.length; i++) {
                this.removeItemInArray(array, items[i]);
            }
        },


        /**
         * xét xem các quân bài có cùng số hay không
         * @param    array
         * @return
         */
        isSameNumber: function (array) {
            var cardPlayers = array.concat();
            Utility.sortArray(cardPlayers, "NUMERIC");
            for (var i = 0; i < cardPlayers.length - 1; i++) {
                var card1 = new CardVO(cardPlayers[i]);
                var card2 = new CardVO(cardPlayers[i + 1]);
                if (card1.numBinh !== card2.numBinh)
                    return false;
            }
            return true;
        },

        getTypeCardsName: function (idx) {
            switch (idx) {
                case LogicBinh.IDX_BINH_LUNG:
                    return "Binh lủng";
                case LogicBinh.IDX_MAU_THAU:
                    return "Mậu thầu";
                case LogicBinh.IDX_DOI:
                    return "Đôi";
                case LogicBinh.IDX_THU:
                    return "Thú";
                case LogicBinh.IDX_XAM_CO:
                    return "Xám cô";
                case LogicBinh.IDX_SANH:
                    return "Sảnh";
                case LogicBinh.IDX_THUNG:
                    return "Thùng";
                case LogicBinh.IDX_CU_LU:
                    return "Cù lũ";
                case LogicBinh.IDX_TU_QUY:
                    return "Tứ quý";
                case LogicBinh.IDX_THUNG_PHA_SANH:
                    return "Thùng phá sảnh";
                case LogicBinh.IDX_XAM_CO_CHI_3:
                    return "Xám cô chi 3";
                case LogicBinh.IDX_CU_LU_CHI_2:
                    return "Cù lũ chi 2";
                case LogicBinh.IDX_2_TU_QUY:
                    return "Hai Tứ quý";
                case LogicBinh.IDX_BA_CHI_SANH:
                    return "Ba chi sảnh";
                case LogicBinh.IDX_BA_CHI_THUNG:
                    return "Ba chi thùng";
                case LogicBinh.IDX_LUC_PHE_BON:
                    return "Lục phế bồn";
                case LogicBinh.IDX_SANH_RONG:
                    return "Sảnh rồng";
                case LogicBinh.IDX_5_DOI_1_XAM:
                    return "Năm đôi một xám";
                case LogicBinh.IDX_RONG_CUON:
                    return "Rồng cuốn";
            }
            return "";
        },


        getListCardMauBinhAutoSort: function (listCardsId, typeMauBinh) {
            var cards = null;
            var idx = 0;
            var isNewSort = false;
            switch (typeMauBinh) {
                case LogicBinh.IDX_RONG_CUON:
                case LogicBinh.IDX_SANH_RONG:
                case LogicBinh.IDX_13_CAY_DEN:
                case LogicBinh.IDX_13_CAY_DO:
                    listCardsId = LogicBinh.getSortNumberic(listCardsId);
                    isNewSort = true;
                    break;
                case LogicBinh.IDX_12_CAY_DEN:
                case LogicBinh.IDX_12_CAY_DO:
                    listCardsId = LogicBinh.getSortNumberic12CayCungMau(listCardsId);
                    isNewSort = true;
                    break;
                case LogicBinh.IDX_5_DOI_1_XAM:
                    listCardsId = LogicBinh.getSortNumberic5Doi1Xam(listCardsId);
                    isNewSort = true;
                    break;
                case LogicBinh.IDX_LUC_PHE_BON:
                    listCardsId = LogicBinh.getSortNumbericLucPheBon(listCardsId);
                    isNewSort = true;
                    break;
            }

            if (isNewSort) {
                cards = [];
                for (var i = 0; i < listCardsId.length; i++) {
                    if (i < 3) idx = 2;
                    if (i >= 3 && i < 8) idx = 1;
                    if (i >= 8 && i < 13) idx = 0;
                    if (!cards[idx]) cards[idx] = [];
                    cards[idx].push(listCardsId[i]);
                }
            }


            return cards;
        },

        // sap xep quan bai tu be den lon
        getSortNumberic: function (listCardsId) {
            var result = listCardsId.concat();
            Utility.sortArray(result, "NUMERIC");
            this.moveCard2ToTop(result);
            this.moveCardAtToTop(result);

            return result;
        },

        getSortNumberic12CayCungMau: function (listCardsId) {
            var result1 = [];
            var result2 = [];

            for (var i = 0; i < listCardsId.length; i++) {
                var card = new CardVO(listCardsId[i]);
                if (card.type === CardVO.TYPE_SPADE || card.type === CardVO.TYPE_CLUB) {
                    result1.push(listCardsId[i]);
                } else {
                    result2.push(listCardsId[i]);
                }
            }

            Utility.sortArray(result1, "NUMERIC");
            Utility.sortArray(result2, "NUMERIC");

            return (result1.length > result2.length) ? result1.concat(result2) : result2.concat(result1);

        },

        getSortNumberic5Doi1Xam: function (listCardsId) {
            var result = [];
            var result1 = [];
            var result2 = [];
            var theCards = listCardsId.concat();
            var arrLucPheBon = this.check_LucPheBon(null, listCardsId);
            if (arrLucPheBon === null) return;
            for (var i = 0; i < arrLucPheBon.length; i++) {
                var cardId1 = arrLucPheBon[i][0];
                var cardId2 = arrLucPheBon[i][1];
                result.push(cardId1);
                result.push(cardId2);
                this.removeItemInArray(theCards, cardId1);
                this.removeItemInArray(theCards, cardId2);
            }

            for (var i = 0; i < theCards.length; i++) {
                var cardObj1 = new CardVO(theCards[i]);
                result1.push(cardObj1.id);
                for (var j = 0; j < result.length; j++) {
                    var cardObj2 = new CardVO(result[j]);
                    if (cardObj1.num === cardObj2.num) result1.push(cardObj2.id);
                    else result2.push(cardObj2.id);
                }

            }

            Utility.sortArray(result1, "NUMERIC");
            Utility.sortArray(result2, "NUMERIC");
            return result1.concat(result2);
        },

        getSortNumbericLucPheBon: function (listCardsId) {
            var lucphebon = this.check_LucPheBon(null, listCardsId);
            var result1 = [];
            var result2 = [];
            var hasCard;
            for (var i = 0; i < lucphebon.length; i++) {
                result1 = result1.concat(lucphebon[i]);
            }

            for (i = 0; i < listCardsId.length; i++) {
                hasCard = false;
                for (var j = 0; j < result1.length; j++) {
                    if (listCardsId[i] === result1[j]) {
                        hasCard = true;
                        break;
                    }
                }
                if (!hasCard) result2.push(listCardsId[i])
            }

            Utility.sortArray(result1, "NUMERIC");
            Utility.sortArray(result2, "NUMERIC");

            return result1.concat(result2);
        },

        getBiggestCards: function (cards) {
            var theCards = null;
            if(cards.length > 4) {
                theCards = this.check_ThungPhaSanh(cards);
                if (theCards != null) {
                    return theCards;
                }

                theCards = this.check_TuQuy(cards);
                if (theCards != null){
                    return theCards;
                }

                theCards = this.check_CuLu(cards);
                if (theCards != null){
                    return theCards;
                }

                theCards = this.check_Thung(cards);
                if (theCards != null){
                    return theCards;
                }

                theCards = this.check_Sanh(cards);
                if (theCards != null){
                    return theCards;
                }
            }

            theCards = this.check_XamCo(cards);
            if (theCards != null){
                return theCards;
            }

            theCards = this.check_Thu(cards);
            if (theCards != null){
                return theCards;
            }

            theCards = this.check_Doi(cards);
            if (theCards != null){
                return theCards;
            }

            for(var i=0; i<cards.length; i++){
                if(cards[i] >= 48){
                    var index = cards.indexOf(cards[i]);
                    cards.splice(index,1);
                }
            }
            return Math.max.apply(Math, cards);
        },
    }
);

module.exports = LogicBinh;