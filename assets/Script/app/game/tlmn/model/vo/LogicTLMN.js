var BaseVO = require("BaseVO");
var Logic = require("Logic");
var CardVO = require("CardVO");
var Utility = require("Utility");

var puremvc = BaseVO.puremvc;

var LogicTLMN = puremvc.define
(
    // CLASS INFO
    {
        parent: Logic,
        constructor: function () {
            Logic.prototype.constructor.call(this);
        }
    },

    // INSTANCE MEMBERS
    {},

    // STATIC MEMBERS
    {
        //Loại bài đánh ra PlayCardType
        OTHER_CODE_SINGLE: 0,					//Single Đánh 1 lá
        OTHER_CODE_PAIR: 1,					    //Pair Đánh 1 đôi
        OTHER_CODE_TRIPLE: 2,					//Triple Đánh bộ 3 lá
        OTHER_CODE_FOUR_OF_AKIND: 3,			    //FourOfAKind Đánh 1 tứ quý
        OTHER_CODE_STRAIGHT: 4,				    //Straight Đánh 1 sảnh
        OTHER_CODE_PAIR_SEQUENCES: 5,			//PairSequences Đánh các đôi thông

        //Các kiểu thắng trắng InstanceWinType
        OTHER_CODE_FIVE_PAIR_SEQUENCES: 1,		//FivePairSequences 5 đôi thông
        OTHER_CODE_THREE_PAIR_SEQUENCES: 2,	    //ThreePairSequencesFromThreeSpade 3 đôi thông có 3 bích
        OTHER_CODE_FOUR_OF_AKIND_TWO: 3,		    //FourOfAKindTwo Tứ quý 2
        OTHER_CODE_FOUR_OF_AKIND_THREE: 4,		//FourOfAKindThree Tứ quý 3
        OTHER_CODE_SIX_PAIRS: 5,				    //SixPairs 6 đôi bất kỳ
        OTHER_CODE_THE_SAME_RED_COLOR: 6,		//TheSameRedColor Đồng màu đỏ
        OTHER_CODE_THE_SAME_BLACK_COLOR: 7,	    //TheSameBlackColor Đồng màu đen
        OTHER_CODE_DRAGON_STRAIGHT: 8,			//DragonStraight Sảnh rồng

        /**
         * xét xem các quân bài có cùng số hay không
         * @param    array
         * @return
         */
        isSameNumber: function (array) {
            var cardPlayers = array.slice();
            Utility.sortArray(cardPlayers, "NUMERIC");
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
        isTuQuy: function (array) {
            var cardPlayers = array.slice();
            if (cardPlayers.length !== 4)
                return false;

            if (!this.isSameNumber([cardPlayers[0], cardPlayers[1], cardPlayers[2], cardPlayers[3]]))
                return false;

            return true;
        },

        isDoiTuQuy: function (array) {
            var cardPlayers = array.concat();
            Utility.sortArray(cardPlayers, "NUMERIC");
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
        is4doiThong: function (array) {
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
        isDoiThong: function (array) {
            var cardPlayers = array.concat();
            if (cardPlayers.length < 6) return false;

            Utility.sortArray(cardPlayers, "NUMERIC");
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
         * xét xem các quân bài có phải sảnh hay không (chỉ dùng cho TLMN)
         * @param    arr
         * @return
         */
        isBoSanh: function (array) {
            if (array.length < 3) return false;
            var cardPlayers = array.concat();
            Utility.sortArray(cardPlayers, "NUMERIC");
            for (var i = 0; i < cardPlayers.length; i++) {
                var card = new CardVO(cardPlayers[i]);
                if (card.num === CardVO.CARD_2) // xem sanh co chua 2 hay khong
                    return false;
            }
            if (this.isConsecutiveNoType(array))
                return true;
            return false;
        },

        /**
         * check xem các quân bài có liền nhau hay không (sảnh)
         * @param    array mảng chứa ID các quân bài
         * @return
         */
        isConsecutiveNoType: function (array) {
            var cardPlayers = array.concat();
            Utility.sortArray(cardPlayers, "NUMERIC");
            for (var i = 0; i < cardPlayers.length - 1; i++) {
                var card1 = new CardVO(cardPlayers[i]);
                var card2 = new CardVO(cardPlayers[i + 1]);
                if (card1.num !== card2.num - 1)
                    return false;
            }
            return true;
        },

        isCardValid: function (cardShot, cardType, playCards, type) {
            if (type === undefined) type = 0;
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
            else if (cardType === this.OTHER_CODE_PAIR_SEQUENCES && this.isDoiThong(arrCardExist)) {
                cardExistInvalid = true;
            }
            if (!cardExistInvalid) return false;
            if (this.compareCard(cardShot, arrCardExist, type)) return true;

            return false;
        },

        compareCard: function (arr1, arr2, type) {
            if (type === undefined) type = 0;

            if (arr1.length !== arr2.length)
                return false;

            var card1 = new CardVO(arr1[arr1.length - 1]);
            var card2 = new CardVO(arr2[arr2.length - 1]);

            if (type === 0) {
                if (card1.id > card2.id)
                    return true;
            } else {
                if (card1.num > card2.num)
                    return true;
            }
            return false;
        },

        compareCardSpecial: function (arr1, arr2) {
            var card = new CardVO(arr2[0]);

            if (this.isDoiThong(arr1) && (arr1.length === 6) && (arr2.length === 1) && card.num === CardVO.CARD_2) // ba doi thong chat 2
                return true;

            if (this.isTuQuy(arr1) && (arr2.length <= 2) && this.isSameNumber(arr2) && card.num === CardVO.CARD_2) // tu quy chat 2 hoac doi 2
                return true;

            if (this.isTuQuy(arr1) && this.isDoiThong(arr2) && (arr2.length === 6)) // tu quy chat 3 doi thong
                return true;

            if (this.isDoiThong(arr1) && (arr1.length === 8) && (arr2.length <= 2) && this.isSameNumber(arr2) && card.num === CardVO.CARD_2) // bon doi thong chat 2 hoac doi 2
                return true;

            if (this.isDoiThong(arr1) && (arr1.length === 8) && this.isDoiThong(arr2) && (arr2.length === 6)) // bon doi thong chat 3 doi thong
                return true;

            if (this.isDoiThong(arr1) && (arr1.length === 8) && this.isTuQuy(arr2)) // bon doi thong chat tu quy
                return true;

            return false;
        },

        getSmallestCard: function (cards) {
            var arrCard = cards.concat();
            var arrResult = [];
            Utility.sortArray(arrCard, "NUMERIC");

            this.checkContain4doiThong(arrCard, arrResult);
            this.checkContainTuQuy(arrCard, arrResult);
            this.checkContain3doiThong(arrCard, arrResult);
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
            if (minCard.num === maxCard.num) {
                for (i = 0; i < cards.length; i++) {
                    card = new CardVO(cards[i]);
                    if (card.num === minCard.num) {
                        arrResult.push(card.id);
                    }
                }
                var code = 0;
                if (arrResult.length === 2) code = this.OTHER_CODE_PAIR;
                if (arrResult.length === 3) code = this.OTHER_CODE_TRIPLE;
                if (arrResult.length === 4) code = this.OTHER_CODE_FOUR_OF_AKIND;

                return {card: arrResult.concat(), type: code};
            } else {// bô chạy dọc
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

                if (this.isConsecutiveNoType(arrResult)) {
                    return {card: arrResult.concat(), type: this.OTHER_CODE_STRAIGHT};
                }
            }

            return null;
        },

        isCanShotCard: function (cards, cardsNeedBeat) {
            if (cardsNeedBeat.length === 0) return true;
            for (var i = 0; i < cards.length; i++) {
                var cardId = cards[i];
                var objCard = null;
                if (cardsNeedBeat.length > 1) {
                    objCard = LogicTLMN.getCardSuit(cards, cardId, cardsNeedBeat);
                }
                if (cardsNeedBeat.length === 1) {
                    if (LogicTLMN.isCardValid([cardId], LogicTLMN.OTHER_CODE_SINGLE, cardsNeedBeat)) {
                        return true;
                    }
                }

                if (objCard) {
                    return true;
                }
            }
            return false;
        },

        getCardSuit: function (cards, cardSelected, cardsNeedBeat, type) {
            var cardVO = new CardVO(cardsNeedBeat);
            if (cardsNeedBeat.length < 2 && cardVO.num !== CardVO.CARD_2) return null;

            var arrResult = [];
            var arrCard = cards.slice();
            Utility.sortArray(arrCard, "NUMERIC");

            this.checkContain4doiThong(arrCard, arrResult);
            arrCard = cards.slice();
            Utility.sortArray(arrCard, "NUMERIC");

            this.checkContainTuQuy(arrCard, arrResult);
            arrCard = cards.slice();
            Utility.sortArray(arrCard, "NUMERIC");

            this.checkContain3doiThong(arrCard, arrResult);
            arrCard = cards.slice();
            Utility.sortArray(arrCard, "NUMERIC");


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

        checkContain4doiThong: function (arrCard, arrResult) {
            Utility.sortArray(arrCard, "NUMERIC");
            var arrTemp = arrCard.slice();
            var arrAccept = [];
            var arrSplice = [];
            if (arrCard.length < 8) return;

            for (var i = 0; i < arrCard.length - 1; i++) {
                if (this.isSameNumber([arrCard[i], arrCard[i + 1]])) {
                    var tuQuy = false;
                    if (arrAccept.length >= 2) {
                        if (this.isTuQuy([arrAccept[arrAccept.length - 2], arrAccept[arrAccept.length - 1], arrCard[i], arrCard[i + 1]]))
                            tuQuy = true;
                    }
                    if (!tuQuy) {
                        arrAccept.push(arrCard[i], arrCard[i + 1]);
                        arrCard.splice(i, 2);
                        i--;

                        if (arrAccept.length === 8) {
                            if (this.isDoiThong(arrAccept)) {
                                Utility.joinArray([arrCard, arrSplice]);
                                Utility.sortArray(arrCard, "NUMERIC");
                                arrResult.push({card: arrAccept, type: this.OTHER_CODE_PAIR_SEQUENCES});
                                return;
                            } else {
                                arrSplice = arrSplice.concat(arrAccept.splice(0, 2));
                            }
                        }
                    }
                }
            }
            arrCard.splice(0, arrCard.length);
            Utility.joinArray([arrCard, arrTemp]);
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

        checkContain3doiThong: function (arrCard, arrResult) {
            Utility.sortArray(arrCard, "NUMERIC");
            var arrTemp = arrCard.slice();
            var arrAccept = [];
            var arrSplice = [];
            if (arrCard.length < 6)
                return;
            for (var i = arrCard.length - 1; i > 0; i--) {
                if (this.isSameNumber([arrCard[i], arrCard[i - 1]])) {
                    var tuQuy = false;
                    if (arrAccept.length >= 2) {
                        if (this.isTuQuy([arrAccept[arrAccept.length - 2], arrAccept[arrAccept.length - 1], arrCard[i - 1], arrCard[i]]))
                            tuQuy = true;
                    }
                    if (!tuQuy) {
                        arrAccept.push(arrCard[i], arrCard[i - 1]);
                        arrCard.splice(i - 1, 2);
                        i--;
                        if (arrAccept.length === 6) {
                            if (this.isDoiThong(arrAccept)) {
                                Utility.joinArray([arrCard, arrSplice])
                                Utility.sortArray(arrCard, "NUMERIC");
                                arrResult.push({card: arrAccept, type: this.OTHER_CODE_PAIR_SEQUENCES});
                                this.checkContain3doiThong(arrCard, arrResult);
                                return;
                            } else {
                                arrSplice = arrSplice.concat(arrAccept.splice(0, 2));
                            }
                        }
                    }
                }
            }
            arrCard.splice(0, arrCard.length);
            Utility.joinArray([arrCard, arrTemp])
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

        checkContainSanhWithMultiMaxCard: function (cards, arrCard, arrResult, maxCard) {
            for (var i = maxCard; i >= 3; i--) {
                this.checkContainSanhWithMaxCard(arrCard, arrResult, i);
            }
        },

        checkContainSanhWithMaxCard: function (arrCard, arrResult, maxCard) {
            Utility.sortArray(arrCard, "NUMERIC");
            if (arrCard.length < 3) return;

            var arrAccept = [];
            var findConsecutive;
            for (var i = arrCard.length - 1; i >= 0; i--) {
                var card1 = new CardVO(arrCard[i - 1]);
                var card2 = new CardVO(arrCard[i]);
                if (i < 1) {
                    if (arrAccept.length === maxCard)
                        arrResult.push({card: arrAccept.concat(), type: this.OTHER_CODE_STRAIGHT});
                    break;
                }
                if (card2.num === card1.num + 1 && card2.num !== CardVO.CARD_2 && card1.num !== CardVO.CARD_2) {
                    findConsecutive = true;
                    if (arrAccept.indexOf(arrCard[i]) !== -1) {
                        arrAccept.push(arrCard[i - 1]);
                        if (arrAccept.length === maxCard) {
                            arrResult.push({card: arrAccept.concat(), type: this.OTHER_CODE_STRAIGHT});
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

        checkContainBoBaWithDuplicateCard: function (arrCard, arrResult) {
            Utility.sortArray(arrCard, "NUMERIC");
            if (arrCard.length < 3) return;

            for (var i = arrCard.length - 1; i >= 0; i--) {
                if (i < 2) break;

                var arrCheck = [arrCard[i], arrCard[i - 1], arrCard[i - 2]];
                if (this.isSameNumber(arrCheck)) {
                    arrResult.push({card: arrCheck, type: this.OTHER_CODE_TRIPLE});
                    i -= 1;
                }
            }
        },

        checkContainBoDoiWithDuplicateCard: function (arrCard, arrResult) {
            Utility.sortArray(arrCard, "NUMERIC");
            if (arrCard.length < 2) return;

            for (var i = arrCard.length - 1; i >= 0; i--) {
                if (i < 1) break;

                var arrCheck = [arrCard[i], arrCard[i - 1]];
                if (this.isSameNumber(arrCheck)) {
                    arrResult.push({card: arrCheck, type: this.OTHER_CODE_PAIR});
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

        getTypeFromVtCards: function (arrCard) {
            var cardType = LogicTLMN.OTHER_CODE_SINGLE;
            if (arrCard.length === 1) return cardType;
            if (arrCard.length === 2 && LogicTLMN.isSameNumber(arrCard)) cardType = LogicTLMN.OTHER_CODE_PAIR;
            if (arrCard.length === 3 && LogicTLMN.isSameNumber(arrCard)) cardType = LogicTLMN.OTHER_CODE_TRIPLE;
            if (LogicTLMN.isTuQuy(arrCard)) cardType = LogicTLMN.OTHER_CODE_FOUR_OF_AKIND;
            else if (LogicTLMN.isBoSanh(arrCard)) cardType = LogicTLMN.OTHER_CODE_STRAIGHT;
            else if (LogicTLMN.isDoiThong(arrCard)) cardType = LogicTLMN.OTHER_CODE_PAIR_SEQUENCES;

            return cardType;
        },

        showValueCard: function (arrCard) {
            if (!arrCard) return "card error";

            var arrType = ["♠", "♣", "♦", "♥"];
            var strCard = "\n";
            for (var i = 0; i < arrCard.length; i++) {
                strCard += arrCard[i] + "\t";
            }
            strCard += "\n";

            for (i = 0; i < arrCard.length; i++) {
                var index = arrCard[i] + 8;
                if (index >= 52)
                    index -= 52;

                var valueStrCard;
                var card = new CardVO(index);

                var valueCard = card.num + 1;
                if (valueCard === 11)
                    valueStrCard = "J";
                else if (valueCard === 12)
                    valueStrCard = "Q";
                else if (valueCard === 13)
                    valueStrCard = "K";
                else
                    valueStrCard = valueCard.toString();

                strCard += valueStrCard + arrType[card.type] + "\t";
            }
            return strCard;
        }
    }
);

module.exports = LogicTLMN;