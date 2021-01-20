var BaseVO = require("BaseVO");
var Logic = require("Logic");
var CardVO = require("CardVO");
var Utility = require("Utility");

var puremvc = BaseVO.puremvc;

var LogicSam = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {

        }
    },

    // INSTANCE MEMBERS
    {},
    // STATIC MEMBERS
    {
        //Nhiệm vụ luật - Nhất ăn tất GameQuest
        OTHER_CODE_NO_QUEST: 0,				//NoQuest Không có nhiệm vụ
        OTHER_CODE_MOT_LA: 1,					//MotLa Đánh 1 lá bất kỳ
        OTHER_CODE_MOT_DOI: 2,					//MotDoi Đánh 1 đôi bất kỳ
        OTHER_CODE_MOT_SANH_3LA: 3,			//MotSanh3La Đánh 1 sảnh 3 lá bất kỳ
        OTHER_CODE_MOT_BO_3LA: 4,				//MotBo3La Đánh 1 bộ 3 lá bất kỳ
        OTHER_CODE_MOT_SANH_4LA: 5,			//MotSanh4La Đánh 1 sảnh 4 lá bất kỳ
        OTHER_CODE_MOT_SANH_5LA: 6,			//MotSanh5La Đánh một sảnh 5 lá bất kỳ

        //Luật game GameRule
        OTHER_CODE_LAW_NONE: 0,				//Không có luật
        OTHER_CODE_DEM_LA: 1,					//DemLa Luật Đếm Lá
        OTHER_CODE_NHAT_AN_TAT: 2,				//NhatAnTat Luật Nhất Ăn Tất

        //Loại bài đánh ra PlayCardType
        OTHER_CODE_SINGLE: 0,					//Single Đánh 1 lá
        OTHER_CODE_PAIR: 1,					//Pair Đánh 1 đôi
        OTHER_CODE_TRIPLE: 2,					//Triple Đánh bộ 3 lá
        OTHER_CODE_FOUR_OF_AKIND: 3,			//FourOfAKind Đánh 1 tứ quý
        OTHER_CODE_STRAIGHT: 4,				//Straight Đánh 1 sảnh
        OTHER_CODE_PAIR_SEQUENCES: 5,			//PairSequences Đánh các đôi thông

        //Các kiểu thắng trắng InstanceWinType
        OTHER_CODE_FIVE_PAIR_SEQUENCES: 1,		//FivePairSequences 5 đôi thông
        OTHER_CODE_THREE_PAIR_SEQUENCES: 2,	//ThreePairSequencesFromThreeSpade 3 đôi thông có 3 bích
        OTHER_CODE_FOUR_OF_AKIND_TWO: 3,		//FourOfAKindTwo Tứ quý 2
        OTHER_CODE_FOUR_OF_AKIND_THREE: 4,		//FourOfAKindThree Tứ quý 3
        OTHER_CODE_SIX_PAIRS: 5,				//SixPairs 6 đôi bất kỳ
        OTHER_CODE_THE_SAME_RED_COLOR: 6,		//TheSameRedColor Đồng màu đỏ
        OTHER_CODE_THE_SAME_BLACK_COLOR: 7,	//TheSameBlackColor Đồng màu đen
        OTHER_CODE_DRAGON_STRAIGHT: 8,			//DragonStraight Sảnh rồng

        /**
         * xét xem các quân bài có cùng số hay không
         * @param    array
         * @return
         */
        isSameNumber:function (array) {
            var cardPlayers = array.slice();
            Utility.sortArray(cardPlayers,"NUMERIC");
            for (var i = 0; i < cardPlayers.length - 1; i++) {
                var card1 = new CardVO(cardPlayers[i]);
                var card2 = new CardVO(cardPlayers[i + 1]);
                if (card1.num !== card2.num)
                    return false;
            }
            return true;

        },

        /**
         * xét xem các quân bài có phải tứ quý hay không
         * @param    array
         * @return
         */
        isTuQuy:function (array) {
            var cardPlayers = array.slice();
            if (cardPlayers.length !== 4)
                return false;

            if (!this.isSameNumber([cardPlayers[0], cardPlayers[1], cardPlayers[2], cardPlayers[3]]))
                return false;

            return true;
        },

        isDoiTuQuy:function (array) {
            var cardPlayers = array.concat();
            Utility.sortArray(cardPlayers,"NUMERIC");
            if (cardPlayers.length !== 8) return false;

            if (!this.isSameNumber([cardPlayers[0], cardPlayers[1], cardPlayers[2], cardPlayers[3]])) return false;
            if (!this.isSameNumber([cardPlayers[4], cardPlayers[5], cardPlayers[6], cardPlayers[7]])) return false;

            return true;
        },

        /**
         * xét xem các quân bài có phải 4 đôi thông hay không
         * @param    array
         * @return
         */
        is4doiThong:function (array) {
            var arrTemp = array.slice();
            var arrAccept = [];
            var arrSplice = [];
            for (var i = 0; i < array.length - 1; i++) {
                var cardId1 = array[i];
                var cardId2 = array[i + 1];
                var card = new CardVO(array[i]);

                if (this.isSameNumber([cardId1, cardId2]) && card.num !== CardVO.CARD_2) {
                    arrAccept.push(cardId1, cardId2);
                    array.splice(i, 2);
                    i--;
                    if (arrAccept.length === 8) {
                        if (this.isDoiThong(arrAccept)) {
                            Utility.joinArray([array, arrSplice, arrAccept]);
                            return true;
                        } else {
                            arrSplice = arrSplice.concat(arrAccept.splice(0, 2));

                        }
                    }
                }
            }
            array.splice(0, array.length);
            Utility.joinArray([array, arrTemp]);
            return false;
        },

        /**
         * xét xem các quân bài có phải đôi thông hay không
         * @param    array
         * @return
         */
        isDoiThong:function (array) {
            var cardPlayers = array.concat();
            if (cardPlayers.length < 6) return false;

            Utility.sortArray(cardPlayers,"NUMERIC");
            for (var i = 0; i < cardPlayers.length; i += 2) {
                var card1 = new CardVO(cardPlayers[i]);
                var card2 = new CardVO(cardPlayers[i - 2]);
                if (i > 0) {
                    if (card1.num !== (card2.num + 1))
                        return false;
                }
                if (!this.isSameNumber([cardPlayers[i], cardPlayers[i + 1]]))
                    return false;
                if (card1.num === CardVO.CARD_2)
                    return false;
            }
            return true;
        },

        /**
         * xét xem các quân bài có phải sảnh hay không (chỉ dùng cho Sam)
         * @param    array
         * @return
         */
        isBoSanh: function (array) {
            if (array.length < 3) return false;
            var cardsAt = [];
            var cardsHai = [];
            var cards = [];
            var cardsPlayer = array.concat();
            Utility.sortArray(cardsPlayer, "NUMERIC");
            // xem sanh co at hay 2 không
            for (var i = 0; i < cardsPlayer.length; i++) {
                var card = new CardVO(cardsPlayer[i]);
                if (card.num === CardVO.CARD_2) {
                    cards = cardsPlayer.splice(i, 1);
                    cardsHai.push(cards[0]);
                    i--;
                } else if (card.num === CardVO.CARD_1) {
                    cards = cardsPlayer.splice(i, 1);
                    cardsAt.push(cards[0]);
                    i--;
                }
            }
            var cardFirst = new CardVO(cardsPlayer[0]);
            var cardEnd = new CardVO(cardsPlayer[cardsPlayer.length - 1]);

            if (cardsHai.length > 1 || cardsAt.length > 1) return false;
            if (cardsPlayer.length === 1) {
                if (cardFirst.num === 0) return true;
                else return false;
            }
            if (!this.isConsecutiveNoType(cardsPlayer)) return false;
            if (cardsAt.length === 0 && cardsHai.length === 0) return true;
            if (cardsHai.length !== 0) {
                if (cardFirst.num === 0) return true;
                else return false;
            }
            if (cardsAt.length !== 0) {
                if (cardEnd.num === 10) return true;
                else return false;
            }
            return false;
        },

        sortStraightCards:function (cards) {
            if(cards.length < 2) return;
            var cardEnd1 = new CardVO(cards[cards.length-1]);
            var cardEnd2 = new CardVO(cards[cards.length-2]);
            var card = null;
            if(cardEnd1.num === CardVO.CARD_1 || cardEnd1.num === CardVO.CARD_2){
                card = cards.pop();
                cards.unshift(card);
            }

            if(cardEnd2.num === CardVO.CARD_1 || cardEnd2.num === CardVO.CARD_2){
                card = cards.pop();
                cards.unshift(card);
            }
        },

        /**
         * check xem các quân bài có liền nhau hay không (sảnh)
         * @param    array mảng chứa ID các quân bài
         * @return
         */
        isConsecutiveNoType:function (array) {
            var cardPlayers = array.concat();
            Utility.sortArray(cardPlayers,"NUMERIC");
            for (var i = 0; i < cardPlayers.length - 1; i++) {
                var card1 = new CardVO(cardPlayers[i]);
                var card2 = new CardVO(cardPlayers[i + 1]);
                if (card1.num !== card2.num - 1)
                    return false;
            }
            return true;
        },

        isCardValid: function (cardShot, cardType, playCards, type) {
            type = type || 0;
            if (!playCards || playCards.length === 0) return true;

            var cardExistInvalid;
            var arrCardExist = playCards.slice();
            Utility.sortArray(arrCardExist, "NUMERIC");
            Utility.sortArray(cardShot, "NUMERIC");

            if (this.compareCardSpecial(cardShot, arrCardExist)) return true;
            if (cardType === this.OTHER_CODE_SINGLE) cardExistInvalid = true;
            else if (cardType === this.OTHER_CODE_PAIR || cardType === this.OTHER_CODE_TRIPLE || cardType === this.OTHER_CODE_FOUR_OF_AKIND) {
                if (this.isSameNumber(arrCardExist))
                    cardExistInvalid = true;
            }
            else if (cardType === this.OTHER_CODE_STRAIGHT && this.isBoSanh(arrCardExist)) {
                cardExistInvalid = true;
            }
            //else if (cardType === this.OTHER_CODE_PAIR_SEQUENCES && this.isDoiThong(arrCardExist)) {
            //    cardExistInvalid = true;
           // }
            if (!cardExistInvalid) return false;

            if (cardType === this.OTHER_CODE_STRAIGHT && this.compareCardSanh(cardShot, arrCardExist)) return true;
            if (cardType !== this.OTHER_CODE_STRAIGHT && this.compareCard(cardShot, arrCardExist, type)) return true;
            return false;
        },

        compareCardSanh: function (arr1, arr2) {
            if (arr1.length !== arr2.length) return false;
            var maxArr1 = this.getMaxIdCardSanh(arr1);
            var maxArr2 = this.getMaxIdCardSanh(arr2);

            var card1 = new CardVO(maxArr1);
            var card2 = new CardVO(maxArr2);

            if (card1.num > card2.num) return true;
            return false;
        },

        getMaxIdCardSanh: function (arrCards) {
            var card = new CardVO(arrCards[0]);
            if (card.num === 0) {
                for (var i = arrCards.length - 1; i >= 0; i--) {
                    card = new CardVO(arrCards[i]);
                    if (card.num !== CardVO.CARD_1 && card.num !== CardVO.CARD_2) return arrCards[i];
                }
            }
            return arrCards[arrCards.length - 1];
        },

        compareCard: function (arr1, arr2, type) {
            if (type === undefined) type = 0;

            if (arr1.length !== arr2.length)
                return false;

            var card1 = new CardVO(arr1[arr1.length - 1]);
            var card2 = new CardVO(arr2[arr2.length - 1]);

            //if (type === 0) {
            //    if (card1.id > card2.id)
            //        return true;
            //} else {
                if (card1.num > card2.num)
                    return true;
           // }
            return false;
        },

        compareCardSpecial: function (arr1, arr2) {
            var card = new CardVO(arr2[0]);

           // if (this.isDoiTuQuy(arr1) && this.isDoiTuQuy(arr2) && arr2[arr2.length - 1] < arr1[arr1.length - 1]) // đôi tứ quý to chặt đôi tứ quý nhỏ
           //     return true;

            if (this.isTuQuy(arr1) && this.isTuQuy(arr2) && arr2[arr2.length - 1] < arr1[arr1.length - 1]) // tứ quý to chặt tứ quý nhỏ
                return true;

            //if (this.isDoiTuQuy(arr1) && (arr2.length === 2) && this.isSameNumber(arr2) && card.num === CardVO.CARD_2) // đôi tứ quý chặt đôi 2
            //    return true;

            if (this.isTuQuy(arr1) && (arr2.length <= 1) && card.num === CardVO.CARD_2) // tu quy chat 2 hoac doi 2
                return true;

            return false;

        },

        getSmallestCard: function (cards) {
            var arrCard = cards.concat();
            var arrResult = [];
            Utility.sortArray(arrCard, "NUMERIC");

            this.checkContainTuQuy(arrCard, arrResult);
            this.checkContain2(arrCard, arrResult);
            this.checkContainSanh(arrCard, arrResult);
            this.checkContainBoBa(arrCard, arrResult);
            this.checkContainBoDoi(arrCard, arrResult);

            if (arrCard.length > 0) {
                Utility.sortArray(arrCard, "NUMERIC");
                return {card: [arrCard[0]], type: this.OTHER_CODE_SINGLE};
            } else {
                return arrResult.pop();
            }
        },

        checkContainTuQuy: function (arrCard, arrResult) {
            Utility.sortArray(arrCard, "NUMERIC");
            if (arrCard.length < 4) return;

            for (var i = arrCard.length - 1; i >= 0; i--) {
                if (i < 3)
                    break;
                var arrCheck = [arrCard[i], arrCard[i - 1], arrCard[i - 2], arrCard[i - 3]];
                if (this.isSameNumber(arrCheck)) {
                    arrResult.push({card: arrCheck, type: this.OTHER_CODE_FOUR_OF_AKIND});
                    arrCard.splice(i - 3, 4);
                    i -= 3;
                }
            }
        },

        checkContain2: function (arrCard, arrResult) {
            Utility.sortArray(arrCard, "NUMERIC");
            for (var i = arrCard.length - 1; i >= 0; i--) {
                var card = new CardVO(arrCard[i]);
                if (card.num === CardVO.CARD_2) {
                    arrResult.push({card: [arrCard[i]], type: this.OTHER_CODE_SINGLE});
                    arrCard.splice(i, 1);
                }
            }
        },

        checkContainSanh: function (arrCard, arrResult) {
            Utility.sortArray(arrCard, "NUMERIC");
            if (arrCard.length < 3) return;

            var arrAccept = [];
            var findConsecutive;

            for (var i = arrCard.length - 1; i >= 0; i--) {
                var card1 = new CardVO(arrCard[i - 1]);
                var card2 = new CardVO(arrCard[i]);
                if (i < 1) {
                    if (arrAccept.length >= 3)
                        arrResult.push({card: arrAccept.concat(), type: this.OTHER_CODE_STRAIGHT});
                    findConsecutive = false;
                    arrAccept.splice(0, arrAccept.length);
                    break;
                }
                if (card2.num === card1.num + 1 && card2.num !== CardVO.CARD_2 && card1.num !== CardVO.CARD_2) {
                    findConsecutive = true;
                    if (arrAccept.indexOf(arrCard[i]) !== -1)
                        arrAccept.push(arrCard[i - 1]);
                    else
                        arrAccept.push(arrCard[i], arrCard[i - 1]);
                } else if (card2.num === card1.num && card2.num !== CardVO.CARD_2 && card1.num !== CardVO.CARD_2) {
                    if (arrAccept.length > 0)
                        arrAccept[arrAccept.length - 1] = arrCard[i - 1];
                } else {
                    if (findConsecutive) {
                        if (arrAccept.length >= 3)
                            arrResult.push({card: arrAccept.concat(), type: this.OTHER_CODE_STRAIGHT});
                        findConsecutive = false;
                        if (arrAccept.length > 0)
                            arrAccept.splice(0, arrAccept.length);
                    }
                }
            }
            for (i = 0; i < arrResult.length; i++) {
                loop:   for (var j = 0; j < arrResult[i].card.length; j++) {
                    for (var k = 0; k < arrCard.length; k++) {
                        if (arrCard[k] === arrResult[i].card[j]) {
                            arrCard.splice(k, 1);
                            continue loop;
                        }
                    }
                }
            }
        },

        checkContainBoBa: function (arrCard, arrResult) {
            Utility.sortArray(arrCard, "NUMERIC");
            if (arrCard.length < 3) return;

            for (var i = arrCard.length - 1; i >= 0; i--) {
                if (i < 2) break;
                var arrCheck = [arrCard[i], arrCard[i - 1], arrCard[i - 2]];
                if (this.isSameNumber(arrCheck)) {
                    arrResult.push({card: arrCheck, type: this.OTHER_CODE_TRIPLE});
                    arrCard.splice(i - 2, 3);
                    i -= 2;
                }
            }
        },

        checkContainBoDoi: function (arrCard, arrResult) {
            Utility.sortArray(arrCard, "NUMERIC");
            if (arrCard.length < 2) return;

            for (var i = arrCard.length - 1; i >= 0; i--) {
                if (i < 1) break;

                var arrCheck = [arrCard[i], arrCard[i - 1]];
                if (this.isSameNumber(arrCheck)) {
                    arrResult.push({card: arrCheck, type: this.OTHER_CODE_PAIR});
                    arrCard.splice(i - 1, 2);
                    i--;
                }
            }
        },

        isArr5DoiThong: function (array) {
            var arrTemp = array.concat();
            var arrAccept = [];
            var arrSplice = [];
            for (var i = 0; i < array.length - 1; i++) {
                if (this.isSameNumber([array[i], array[i + 1]])) {
                    arrAccept.push(array[i], array[i + 1]);
                    array.splice(i, 2);
                    i--;
                    if (arrAccept.length === 10) {
                        if (this.isDoiThong(arrAccept)) {
                            Utility.joinArray([array, arrSplice, arrAccept]);
                            return true;
                        } else {
                            arrSplice = arrSplice.concat(arrAccept.splice(0, 2));
                        }
                    }
                }
            }
            array.splice(0, array.length);
            Utility.joinArray([array, arrTemp]);
            return false;
        },

        isArr3DoiThong3Bich: function (array) {
            var arrTemp = array.concat();
            var arrAccept = [];
            var arrSplice = [];
            for (var i = 0; i < array.length - 1; i++) {
                if (this.isSameNumber([array[i], array[i + 1]])) {
                    arrAccept.push(array[i], array[i + 1]);
                    array.splice(i, 2);
                    i--;
                    if (arrAccept.length === 6) {
                        if (this.isDoiThong(arrAccept) && arrAccept.indexOf(0) > -1) {
                            Utility.joinArray([array, arrSplice, arrAccept]);
                            return true;
                        } else {
                            arrSplice = arrSplice.concat(arrAccept.splice(0, 2));
                        }
                    }
                }
            }
            array.splice(0, array.length);
            Utility.joinArray([array, arrTemp]);
            return false;
        },

        isArrTuQuy2: function (array) {
            var arrTemp = array.concat();
            var arrAccept = [];
            for (var i = 0; i < array.length; i++) {
                var card = new CardVO(array[i]);
                if (card.num === CardVO.CARD_2) {
                    arrAccept.push(array[i]);
                    array.splice(i, 1);
                    i--;
                }
            }
            if (this.isTuQuy(arrAccept)) {
                Utility.joinArray([array, arrAccept]);
                return true;
            }
            array.splice(0, array.length);
            Utility.joinArray([array, arrTemp]);
            return false;
        },

        isArrTuQuy3: function (array) {
            var arrTemp = array.concat();
            var arrAccept = [];
            for (var i = 0; i < array.length; i++) {
                var card = new CardVO(array[i]);
                if (card.num === 0) {
                    arrAccept.push(array[i]);
                    array.splice(i, 1);
                    i--;
                }
            }
            if (this.isTuQuy(arrAccept)) {
                Utility.joinArray([array, arrAccept]);
                return true;
            }
            array.splice(0, array.length);
            Utility.joinArray([array, arrTemp]);
            return false;
        },

        is5Doi: function (array) {
            var arrTemp = array.concat();
            var arrAccept = [];
            for (var i = 0; i < array.length - 1; i++) {
                if (this.isSameNumber([array[i], array[i + 1]])) {
                    arrAccept.push(array[i], array[i + 1]);
                    array.splice(i, 2);
                    i--;
                }
            }
            if (arrAccept.length === 10) {
                Utility.joinArray([array, arrAccept]);
                return true;
            }
            array.splice(0, array.length);
            Utility.joinArray([array, arrTemp]);
            return false;
        },

        is6Doi: function (array) {
            var arrTemp = array.concat();
            var arrAccept = [];
            for (var i = 0; i < array.length - 1; i++) {
                if (this.isSameNumber([array[i], array[i + 1]])) {
                    arrAccept.push(array[i], array[i + 1]);
                    array.splice(i, 2);
                    i--;
                }
            }
            if (arrAccept.length === CardVO.CARD_2) {
                Utility.joinArray([array, arrAccept]);
                return true;
            }
            array.splice(0, array.length);
            Utility.joinArray([array, arrTemp]);
            return false;
        },

        isDongDo: function (array) {
            for (var i = 0; i < array.length; i++) {
                var card = new CardVO(array[i]);
                if (card.type === CardVO.TYPE_SPADE || card.type === CardVO.TYPE_CLUB)
                    return false;
            }
            return true;
        },

        isDongDen: function (array) {
            for (var i = 0; i < array.length; i++) {
                var card = new CardVO(array[i]);
                if (card.type === CardVO.TYPE_HEART || card.type === CardVO.TYPE_DIAMOND)
                    return false;
            }
            return true;
        },

        isSanhRong: function (array) {
            var cardsPlayer = array.concat();
            cardsPlayer.splice(0, 1);
            if (this.isBoSanhTLMN(cardsPlayer)) {
                cardsPlayer.unshift(array[0]);
                array.splice(0, array.length);
                Utility.joinArray([array, cardsPlayer]);
                return true;
            }

            cardsPlayer = array.slice();
            cardsPlayer.pop();
            if (this.isBoSanhTLMN(cardsPlayer)) {
                cardsPlayer.unshift(array[array.length - 1]);
                array.splice(0, array.length);
                Utility.joinArray([array, cardsPlayer]);
                return true;
            }
            return false;
        },

        /**
         * xét xem các quân bài có phải sảnh hay không (chỉ dùng cho TLMN)
         * @param    array
         * @return
         */
        isBoSanhTLMN: function (array) {
            if (array.length < 3) return false;
            var cardsPlayer = array.concat();
            Utility.sortArray(cardsPlayer, "NUMERIC");
            for (var i = 0; i < cardsPlayer.length; i++) {
                var card = new CardVO(cardsPlayer[i]);
                if (card.num === CardVO.CARD_2) // xem sanh co chua 2 hay khong
                    return false;
            }
            if (this.isConsecutiveNoType(array))
                return true;
            return false;
        },

        getAutoSelectCard: function (cards, cardSelected, cardAcceptArr) {
            if (cardAcceptArr.length === 0) return null;
            var i, card;
            var arrResult = [];
            var arrCard = cardAcceptArr.concat();
            arrCard.push(cardSelected);
            Utility.sortArray(arrCard, "NUMERIC");
            Utility.sortArray(cards, "NUMERIC");

            var minCard = new CardVO(arrCard[0]);
            var maxCard = new CardVO(arrCard[1]);
            var curCard = null;

            // bộ chạy ngang
            if(minCard.num === maxCard.num){
                for (i = 0; i < cards.length; i++) {
                    card = new CardVO(cards[i]);
                    if(card.num === minCard.num){
                        arrResult.push(card.id);
                    }
                }
                var code = 0;
                if(arrResult.length === 2) code =  this.OTHER_CODE_PAIR;
                if(arrResult.length === 3) code =  this.OTHER_CODE_TRIPLE;
                if(arrResult.length === 4) code =  this.OTHER_CODE_FOUR_OF_AKIND;

                return {card: arrResult.concat(), type: code};
            }else{// bô chạy dọc
                for (i = 0; i < cards.length; i++) {
                    card = new CardVO(cards[i]);
                    if (card.id < minCard.id) continue;
                    if (card.id === minCard.id) {
                        curCard = minCard;
                        arrResult.push(minCard.id);
                    } else if (card.num === maxCard.num) {
                        arrResult.push(maxCard.id);
                        break;
                    } else if (curCard && card.num === curCard.num + 1) {
                        curCard = card;
                        arrResult.push(card.id);
                    }
                }

                if(this.isConsecutiveNoType(arrResult)){
                    return {card: arrResult.concat(), type: this.OTHER_CODE_STRAIGHT};
                }
            }

            return null;
        },

        getAutoSelectCard2:function (cards, cardSelected) {
            var arrResult = [];
            var arrCard = cards.slice();
            Utility.sortArray(arrCard,"NUMERIC");

            this.checkContainTuQuy(arrCard, arrResult);
            arrCard = cards.slice();
            Utility.sortArray(arrCard,"NUMERIC");

            this.checkContainBoDoiWithDuplicateCard(arrCard, arrResult);
            this.checkContainBoBaWithDuplicateCard(arrCard, arrResult);
            this.checkContainSanhWithMultiMaxCard(cards, arrCard, arrResult, 10);

            for (var i = arrResult.length - 1; i >= 0; i--) {
                var cardsAccept = arrResult[i].card;
                if (cardsAccept.indexOf(cardSelected) > -1) {
                    return arrResult[i];
                }
            }
            return null;
        },


        getCardSuit:function (cards, cardSelected, cardsNeedBeat, type) {
            var cardVO = new CardVO(cardsNeedBeat);
            if (cardsNeedBeat.length < 2 && cardVO.num !== CardVO.CARD_2) return null;

            var arrResult = [];
            var arrCard = cards.slice();
            Utility.sortArray(arrCard,"NUMERIC");

            this.checkContainTuQuy(arrCard, arrResult);
            arrCard = cards.slice();
            Utility.sortArray(arrCard,"NUMERIC");

            this.checkContainSanhWithMultiMaxCard(cards, arrCard, arrResult, CardVO.CARD_2);
            this.checkContainBoBaWithDuplicateCard(arrCard, arrResult);
            this.checkContainBoDoiWithDuplicateCard(arrCard, arrResult);

            // arrResult giờ gồm toàn những bộ xếp từ lớn đến bé (bộ cao -> bộ thấp)
            for (var i = arrResult.length - 1; i >= 0; i--) {
                var cardsAccept = arrResult[i].card;
                if (cardsAccept.indexOf(cardSelected) > -1) {
                    var isValid = this.isCardValid(cardsAccept, arrResult[i].type, cardsNeedBeat, type);
                    if (isValid)
                        return arrResult[i];
                }
            }
            return null;
        },

        checkContainBoDoiWithDuplicateCard:function (arrCard, arrResult) {
            Utility.sortArray(arrCard,"NUMERIC");
            if (arrCard.length < 2) return;

            for (var i = arrCard.length - 1; i >= 0; i--) {
                if (i < 1) break;

                var arrCheck = [arrCard[i], arrCard[i - 1]];
                if (this.isSameNumber(arrCheck)) {
                    arrResult.push( { card: arrCheck, type: this.OTHER_CODE_PAIR } );
                }
            }
        },

        checkContainBoBaWithDuplicateCard:function (arrCard, arrResult) {
            Utility.sortArray(arrCard,"NUMERIC");
            if (arrCard.length < 3) return;

            for (var i = arrCard.length - 1; i >= 0; i--) {
                if (i < 2) break;

                var arrCheck = [arrCard[i], arrCard[i - 1], arrCard[i - 2]];
                if (this.isSameNumber(arrCheck)) {
                    arrResult.push( { card: arrCheck, type: this.OTHER_CODE_TRIPLE } );
                    i -= 1;
                }
            }
        },

        checkContainSanhWithMultiMaxCard:function (cards, arrCard, arrResult, maxCard) {
            for (var i = maxCard; i >= 3; i--){
                this.checkContainSanhWithMaxCard(arrCard, arrResult, i);
            }
        },

        checkContainSanhWithMaxCard:function (arrCard, arrResult, maxCard) {
            Utility.sortArray(arrCard,"NUMERIC");
            if (arrCard.length < 3) return;

            var arrAccept = [];
            var findConsecutive;
            for (var i = arrCard.length - 1; i >= 0; i--) {
                var card1 = new CardVO(arrCard[i - 1]);
                var card2 = new CardVO(arrCard[i]);
                if (i < 1) {
                    if (arrAccept.length === maxCard)
                        arrResult.push( { card: arrAccept.concat(), type: this.OTHER_CODE_STRAIGHT } );
                    break;
                }
                if (card2.num === card1.num + 1 && card2.num !== CardVO.CARD_2 && card1.num !== CardVO.CARD_2) {
                    findConsecutive = true;
                    if (arrAccept.indexOf(arrCard[i]) !== -1) {
                        arrAccept.push(arrCard[i - 1]);
                        if (arrAccept.length === maxCard) {
                            arrResult.push( { card: arrAccept.concat(), type: this.OTHER_CODE_STRAIGHT } );
                            i = i + arrAccept.length - 2;
                            findConsecutive = false;
                            arrAccept.splice(0, arrAccept.length);
                        }
                    } else {
                        arrAccept.push(arrCard[i], arrCard[i - 1]);
                    }
                } else if (card2.num === card1.num && card2.num !== CardVO.CARD_2 && card1.num !== CardVO.CARD_2) {
                    if (arrAccept.length > 0)
                        arrAccept[arrAccept.length - 1] = arrCard[i - 1];
                } else {
                    if (findConsecutive) {
                        findConsecutive = false;
                        if (arrAccept.length > 0)
                            arrAccept.splice(0, arrAccept.length);
                    }
                }
            }
        },
    }
);

module.exports = LogicSam;