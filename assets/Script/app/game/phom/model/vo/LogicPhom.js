var BaseVO = require("BaseVO");
var SFSData = require("SFSData");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
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
        checkIsStealCard: function (card, tableVO) {
            var mySeat = tableVO.getSeatBySeatId(tableVO.mySeatId);
            for (var i = 0; i < mySeat.stealCards.length; i++) {
                if (card === mySeat.stealCards[i])
                    return true;
            }
            return false;
        },

        checkPlayCard: function (card, cardArray, tableVO) {
            if (this.checkIsStealCard(card, tableVO))
                return false;
            var i, j, k, l;

            var newCardArray = cardArray.concat();
            for (i = 0; i < newCardArray.length; i++) {
                if (card === newCardArray[i]) {
                    newCardArray.splice(i, 1);
                    i = newCardArray.length + 1;
                }
            }

            var stealCard;
            var stealCardNumber = 0;

            for (i = 0; i < newCardArray.length; i++) {// Đếm số con bài đã ăn
                if (this.checkIsStealCard(newCardArray[i], tableVO)) {
                    stealCard = newCardArray[i];
                    stealCardNumber++;
                }
            }

            if (stealCardNumber === 0) { // Nếu chưa ăn con bài nào thì lá nào cũng đánh được
                return true;
            }
            else {
                var deckArray = this.countDeck(newCardArray, tableVO);
                switch (stealCardNumber) {
                    case 1: // Nếu ăn một con bài thì chỉ cần check con bài đó có cạ với các quân bài chưa đánh
                        return this.checkStealCardChild(stealCard, newCardArray, tableVO);
                    case 2: // Nếu ăn 2 con bài thì phải tìm ra 2 phỏm riêng rẽ, mỗi phỏm chứa 1 con bài ăn
                        for (i = 0; i < deckArray.length - 1; i++) {
                            for (j = i + 1; j < deckArray.length; j++) {
                                if (!this.compareTwoDeck(deckArray[i], deckArray[j])) {
                                    var countStealCard = 0;
                                    for (k = 0; k < deckArray[i].length; k++) {
                                        if (this.checkIsStealCard(deckArray[i][k], tableVO))
                                            countStealCard++;
                                        if (this.checkIsStealCard(deckArray[j][k], tableVO))
                                            countStealCard++;
                                    }
                                    if (countStealCard === 2)
                                        return true;
                                }
                            }
                        }
                        return false;
                    case 3: // Nếu ăn 3 con bài thì phải tìm ra 3 phỏm riêng rẽ, mỗi phỏm chứa 1 con bài ăn
                        for (i = 0; i < deckArray.length - 2; i++) {
                            for (j = i + 1; j < deckArray.length - 1; j++) {
                                for (k = j + 1; k < deckArray.length; k++) {
                                    if (!this.compareTwoDeck(deckArray[i], deckArray[j]) && !this.compareTwoDeck(deckArray[j], deckArray[k]) && !this.compareTwoDeck(deckArray[i], deckArray[k])) {
                                        countStealCard = 0;
                                        for (l = 0; l < deckArray[i].length; l++) {
                                            if (this.checkIsStealCard(deckArray[i][l], tableVO))
                                                countStealCard++;
                                            if (this.checkIsStealCard(deckArray[j][l], tableVO))
                                                countStealCard++;
                                            if (this.checkIsStealCard(deckArray[k][l], tableVO))
                                                countStealCard++;
                                        }
                                        if (countStealCard === 3)
                                            return true;
                                    }
                                }
                            }
                        }
                        return false;
                }
            }
            return true;
        },

        compareTwoDeck: function (deck1, deck2) {
            var isRelationship;
            for (var i = 0; i < deck1.length; i++) {
                for (var j = 0; j < deck2.length; j++) {
                    if (deck1[i].yunId === deck2[j].yunId) {
                        isRelationship = true;
                        return isRelationship;
                    }
                }
            }
            return isRelationship;
        },

        checkStealCardChild: function (stealCard, cardArray, tableVo) {
            var deck;
            var newCardArray = cardArray.concat();
            var i;
            var j;

            for (i = 0; i < newCardArray.length - 1; i++) {
                for (j = i + 1; j < newCardArray.length; j++) {
                    if (!this.checkIsStealCard(newCardArray[i], tableVo) && !this.checkIsStealCard(newCardArray[j], tableVo)) {
                        deck = [];
                        deck.push(stealCard);
                        deck.push(newCardArray[i]);
                        deck.push(newCardArray[j]);
                        if (this.checkCardDeck(deck, tableVo)) {
                            return true;
                        }
                    }
                }
            }
            return false
        },

        findFullDeck: function (deck, cardArray, tableVO) {
            var isFindFinish;
            while (!isFindFinish) {
                isFindFinish = true;
                for (var i = 0; i < cardArray.length; i++) {
                    var newDeck = deck.concat();
                    newDeck.push(cardArray[i]);
                    if (this.checkCardDeck(newDeck, tableVO)) {
                        deck.push(cardArray[i]);
                        cardArray.splice(i, 1);
                        isFindFinish = false;
                    }
                }
            }
        },

        arrangeCardNoDeck: function (cardArray) {
            var arrangeFinish;
            while (!arrangeFinish) {
                arrangeFinish = true;
                for (var i = 0; i < cardArray.length - 1; i++) {
                    if (this.convertIdToRank(cardArray[i].yunId) > this.convertIdToRank(cardArray[i + 1].yunId)) {
                        var tempCard = cardArray[i];
                        cardArray[i] = cardArray[i + 1];
                        cardArray[i + 1] = tempCard;
                        arrangeFinish = false;
                    }
                }
            }

            arrangeFinish = false;
            var cardNumber = cardArray.length;
            var lengthCheck = cardArray.length;

            for (var j = 0; j < cardNumber; j++) {
                for (i = 0; i < lengthCheck; i++) {
                    if (i > 0)
                        var rankPrevious = this.convertIdToRank(cardArray[i - 1].yunId);
                    else
                        rankPrevious = -10;
                    var rankCurrent = this.convertIdToRank(cardArray[i].yunId);

                    if (i < lengthCheck - 1)
                        var rankNext = this.convertIdToRank(cardArray[i + 1].yunId);
                    else
                        rankNext = -10;

                    if (i > 0)
                        var suitPrevious = this.convertIdToSuit(cardArray[i - 1].yunId);
                    else
                        suitPrevious = -10;
                    var suitCurrent = this.convertIdToSuit(cardArray[i].yunId);

                    if (i < lengthCheck - 1)
                        var suitNext = this.convertIdToSuit(cardArray[i + 1].yunId);
                    else
                        suitNext = -10;

                    if (rankPrevious !== rankCurrent && rankNext !== rankCurrent) {
                        if (suitPrevious === suitCurrent && Math.abs(rankPrevious - rankCurrent) <= 2) {

                        }
                        else if (suitNext === suitCurrent && Math.abs(rankNext - rankCurrent) <= 2) {

                        }
                        else {
                            tempCard = cardArray.splice(i, 1)[0];
                            cardArray.push(tempCard);
                            lengthCheck--;
                            break;
                        }
                    }
                }
            }
        },

        arrangeUnleaveCard: function (cardArray, tableVO) {
            var deckArray = this.countDeck(cardArray, tableVO);
            var i, j, k;
            var selectedDeckArray = [];
            var stealCardNumber = 0;
            var countStealCard;

            // Đếm số lá bài ăn
            for (i = 0; i < cardArray.length; i++) {
                if (this.checkIsStealCard(cardArray[i].id, tableVO))
                    stealCardNumber++;
            }

            if (deckArray.length > 0) // trường hợp chỉ có 1 phỏm
            {
                if (stealCardNumber > 0) // Nếu có con bài ăn thì ưu tiên phỏm có con bài ăn
                {
                    for (i = 0; i < deckArray.length; i++) {
                        countStealCard = 0;
                        for (k = 0; k < deckArray[i].length; k++) {
                            if (this.checkIsStealCard(deckArray[i][k].id, tableVO))
                                countStealCard++;
                        }
                        if (countStealCard > 0) {
                            selectedDeckArray.push(deckArray[i]);
                            i = deckArray.length + 1;
                        }
                    }
                }
                else // Nếu không có con bài ăn
                {
                    selectedDeckArray.push(deckArray[0]);
                }
            }

            for (i = 0; i < deckArray.length - 1; i++) // trường hợp có 2 phỏm
            {
                for (j = i + 1; j < deckArray.length; j++) {
                    if (!this.compareTwoDeck(deckArray[i], deckArray[j])) // Tìm ra 2 phỏm khác nhau
                    {
                        var twoDeckIsTrue;
                        switch (stealCardNumber) {
                            case 0: // Nếu có một lá bài ăn thì kiểm tra xem 2 phỏm đó có một phỏm phải chứa lá bài ăn
                                twoDeckIsTrue = true;
                                break;
                            case 1: // Nếu có một lá bài ăn thì kiểm tra xem 2 phỏm đó có một phỏm phải chứa lá bài ăn
                                countStealCard = 0;
                                for (k = 0; k < deckArray[i].length; k++) {
                                    if (this.checkIsStealCard(deckArray[i][k].id, tableVO))
                                        countStealCard++;
                                    if (this.checkIsStealCard(deckArray[j][k].id, tableVO))
                                        countStealCard++;
                                }
                                if (countStealCard > 0)
                                    twoDeckIsTrue = true;
                                break;
                            case 2: // Nếu có hai lá bài ăn thì cả 2 phỏm đều phải có chứa lá bài ăn
                                countStealCard = 0;
                                for (k = 0; k < deckArray[i].length; k++) {
                                    if (this.checkIsStealCard(deckArray[i][k].id, tableVO))
                                        countStealCard++;
                                    if (this.checkIsStealCard(deckArray[j][k].id, tableVO))
                                        countStealCard++;
                                }
                                if (countStealCard === 2)
                                    twoDeckIsTrue = true;
                                break;
                        }
                        if (twoDeckIsTrue) {
                            selectedDeckArray = [];
                            selectedDeckArray.push(deckArray[i]);
                            selectedDeckArray.push(deckArray[j]);
                            i = deckArray.length + 1;
                            j = deckArray.length + 1
                        }
                    }
                }
            }

            var newCardArray = [];

            for (i = 0; i < selectedDeckArray.length; i++) {
                for (j = 0; j < selectedDeckArray[i].length; j++) {
                    for (k = 0; k < cardArray.length; k++) {
                        if (cardArray[k].yunId === selectedDeckArray[i][j].yunId) {
                            newCardArray.push(cardArray[k]);
                            cardArray.splice(k, 1);
                            k = cardArray.length + 1;
                        }
                    }
                }
            }

            var object;
            for (i = 0; i < selectedDeckArray.length; i++) {
                this.findFullDeck(selectedDeckArray[i], cardArray, tableVO);
                this.arrangeDeck(selectedDeckArray[i]);
            }

            newCardArray = [];
            for (i = 0; i < selectedDeckArray.length; i++) {
                for (j = 0; j < selectedDeckArray[i].length; j++) {
                    newCardArray.push(selectedDeckArray[i][j]);
                }
            }

            this.arrangeCardNoDeck(cardArray);
            newCardArray = newCardArray.concat(cardArray);
            return newCardArray;
        },

        countDeck: function (cardArray, tableVO) {
            var deckArray = [];
            for (var i = 0; i < cardArray.length - 2; i++) {
                for (var j = i + 1; j < cardArray.length - 1; j++) {
                    for (var k = j + 1; k < cardArray.length; k++) {
                        var deck = [];
                        deck.push(cardArray[i]);
                        deck.push(cardArray[j]);
                        deck.push(cardArray[k]);
                        if (this.checkCardDeck(deck, tableVO)) {
                            this.arrangeDeck(deck);
                            deckArray.push(deck);
                        }
                    }
                }
            }
            return deckArray;
        },

        checkDownCard: function (cardArray, tableVO) {
            var deckArray = this.countDeck(cardArray, tableVO);
            var i, j, k, l, m;

            // truong hop co 1 phom
            if (deckArray.length > 0 && cardArray.length < 6) {
                var newArray = cardArray.concat();
                for (k = 0; k < deckArray[0].length; k++) {
                    for (l = 0; l < newArray.length; l++) {
                        if (newArray[l] === deckArray[0][k]) {
                            newArray.splice(l, 1);
                            l = newArray.length + 1;
                        }
                    }
                }
                this.findFullDeck(deckArray[0], newArray, tableVO);

                if (deckArray[0].length === cardArray.length)
                    return [cardArray];
            }

            var downCardArray = [];
            // truong hop co 2 phom
            for (i = 0; i < deckArray.length - 1; i++) {
                for (j = i + 1; j < deckArray.length; j++) {
                    if (!this.compareTwoDeck(deckArray[i], deckArray[j])) {
                        newArray = cardArray.concat();
                        for (k = 0; k < deckArray[i].length; k++) {
                            for (l = 0; l < newArray.length; l++) {
                                if (newArray[l] === deckArray[i][k]) {
                                    newArray.splice(l, 1);
                                    l = newArray.length + 1;
                                }
                            }
                        }
                        for (k = 0; k < deckArray[j].length; k++) {
                            for (l = 0; l < newArray.length; l++) {
                                if (newArray[l] === deckArray[j][k]) {
                                    newArray.splice(l, 1);
                                    l = newArray.length + 1;
                                }
                            }
                        }
                        this.findFullDeck(deckArray[i], newArray, tableVO);
                        this.findFullDeck(deckArray[j], newArray, tableVO);

                        if (deckArray[i].length + deckArray[j].length >= cardArray.length) {
                            downCardArray = [];
                            downCardArray.push(deckArray[i]);
                            downCardArray.push(deckArray[j]);
                            if (this.convertIdToRank(deckArray[i][0].yunId) === this.convertIdToRank(deckArray[i][1].yunId) && deckArray[i].length === 4) // Uu tien phom tu quy
                                return downCardArray;
                            if (this.convertIdToRank(deckArray[j][0].yunId) === this.convertIdToRank(deckArray[j][1].yunId) && deckArray[j].length === 4) // Uu tien phom tu quy
                                return downCardArray;
                        }
                    }
                }
            }

            if (downCardArray.length >= 2)
                return downCardArray;

            // truong hop co 3 phom
            for (i = 0; i < deckArray.length - 2; i++) // Tìm 3 phỏm khác nhau
            {
                for (j = i + 1; j < deckArray.length - 1; j++) {
                    for (k = j + 1; k < deckArray.length; k++) {
                        if (!this.compareTwoDeck(deckArray[i], deckArray[j]) && !this.compareTwoDeck(deckArray[j], deckArray[k]) && !this.compareTwoDeck(deckArray[i], deckArray[k])) {
                            if (cardArray.length === 10) {
                                if (deckArray[i].length + deckArray[j].length + deckArray[k].length === cardArray.length) {
                                    downCardArray.push(deckArray[i]);
                                    downCardArray.push(deckArray[j]);
                                    downCardArray.push(deckArray[k]);
                                    return downCardArray;
                                }
                            }

                            for (m = 0; m < cardArray.length; m++) {
                                var isDifferentCard = true;
                                for (l = 0; l < deckArray[i].length; l++) {
                                    if (deckArray[i][l] === cardArray[m])
                                        isDifferentCard = false;
                                    if (deckArray[j][l] === cardArray[m])
                                        isDifferentCard = false;
                                    if (deckArray[k][l] === cardArray[m])
                                        isDifferentCard = false;
                                }
                                // Tránh trường hợp con thứ 10 không thuộc 3 phỏm là con bài ăn
                                if (isDifferentCard && !this.checkIsStealCard(cardArray[m].yunId, tableVO)) {
                                    var tempArray = deckArray[i].concat();
                                    tempArray.push(cardArray[m]);
                                    if (this.checkCardDeck(tempArray, tableVO)) {
                                        downCardArray = [];
                                        downCardArray.push(tempArray);
                                        downCardArray.push(deckArray[j]);
                                        downCardArray.push(deckArray[k]);
                                        return downCardArray;
                                    }
                                    tempArray = deckArray[j].concat();
                                    tempArray.push(cardArray[m]);
                                    if (this.checkCardDeck(tempArray, tableVO)) {
                                        downCardArray = [];
                                        downCardArray.push(tempArray);
                                        downCardArray.push(deckArray[i]);
                                        downCardArray.push(deckArray[k]);
                                        return downCardArray;
                                    }
                                    tempArray = deckArray[k].concat();
                                    tempArray.push(cardArray[m]);
                                    if (this.checkCardDeck(tempArray, tableVO)) {
                                        downCardArray = [];
                                        downCardArray.push(tempArray);
                                        downCardArray.push(deckArray[i]);
                                        downCardArray.push(deckArray[j]);
                                        return downCardArray;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return [];
        },

        checkCardDeck: function (cardArray, tableVO) {
            if (cardArray.length < 3)
                return false;

            var isWireDeck;
            var i;

            // Đếm số lá là stealCard
            var stealCardNumber = 0;
            for (i = 0; i < cardArray.length; i++) {
                for (i = 0; i < cardArray.length; i++)
                    if (this.checkIsStealCard(cardArray[i].yunId, tableVO))
                        stealCardNumber++;
            }
            if (stealCardNumber > 1)
                return false;

            if ((cardArray[0].yunId - cardArray[1].yunId) % 13 !== 0) // check xem có phải phỏm sáp không, nếu không thì là phỏm dây
                isWireDeck = true;

            if (isWireDeck) {
                var minValue = 52;
                for (i = 0; i < cardArray.length; i++) {
                    if (minValue > cardArray[i].yunId)
                        minValue = cardArray[i].yunId;
                }

                for (i = 0; i < cardArray.length; i++) {
                    if (Math.ceil((cardArray[i].yunId) / 13) !== Math.ceil(minValue / 13)) // Nếu là khác chất thì return false
                        return false;
                    if ((cardArray[i].yunId) - minValue > cardArray.length - 1)
                        return false;
                }
            }
            else {
                for (i = 0; i < cardArray.length; i++) {
                    if ((cardArray[0].yunId - cardArray[i].yunId) % 13 !== 0)
                        return false;
                }
            }
            return true;
        },

        arrangeDeck: function (deck) {
            var arrangeFinish;
            while (!arrangeFinish) {
                arrangeFinish = true;
                for (var i = 0; i < deck.length - 1; i++) {
                    if (deck[i].yunId > deck[i + 1].yunId) {
                        var tempCard = deck[i];
                        deck[i] = deck[i + 1];
                        deck[i + 1] = tempCard;
                        arrangeFinish = false;
                    }
                }
            }
        },

        convertIdToSuit: function (id) {
            return Math.ceil(((id) / 13));
        },

        convertIdToRank: function (id) {
            if ((id) % 13 === 0)
                return 13;
            return (id) % 13;
        },

        checkFullDeck: function (cardArray, tableVO) {
            var deckArray = this.countDeck(cardArray, tableVO);
            var i, j, k, l, m;

            var niceFullDeckArray = []; // Ù 9 lá
            var tenFullDeckArray; // Ù 10 lá
            for (i = 0; i < deckArray.length - 2; i++) // Tìm 3 phỏm khác nhau
            {
                for (j = i + 1; j < deckArray.length - 1; j++) {
                    for (k = j + 1; k < deckArray.length; k++) {
                        if (!this.compareTwoDeck(deckArray[i], deckArray[j]) && !this.compareTwoDeck(deckArray[j], deckArray[k]) && !this.compareTwoDeck(deckArray[i], deckArray[k])) {
                            for (m = 0; m < cardArray.length; m++) {
                                var isDifferentCard = true;
                                for (l = 0; l < deckArray[i].length; l++) {
                                    if (deckArray[i][l] === cardArray[m])
                                        isDifferentCard = false;
                                    if (deckArray[j][l] === cardArray[m])
                                        isDifferentCard = false;
                                    if (deckArray[k][l] === cardArray[m])
                                        isDifferentCard = false;
                                }
                                // Tránh trường hợp con thứ 10 không thuộc 3 phỏm là con bài ăn
                                if (isDifferentCard && !this.checkIsStealCard(cardArray[m], tableVO)) {
                                    var tempArray = deckArray[i].concat();
                                    tempArray.push(cardArray[m])
                                    if (this.checkCardDeck(tempArray, tableVO)) {
                                        tenFullDeckArray = [];
                                        tenFullDeckArray.push(tempArray);
                                        tenFullDeckArray.push(deckArray[j]);
                                        tenFullDeckArray.push(deckArray[k]);
                                        return tenFullDeckArray;
                                    }
                                    tempArray = deckArray[j].concat();
                                    tempArray.push(cardArray[m]);
                                    if (this.checkCardDeck(tempArray, tableVO)) {
                                        tenFullDeckArray = [];
                                        tenFullDeckArray.push(tempArray);
                                        tenFullDeckArray.push(deckArray[i]);
                                        tenFullDeckArray.push(deckArray[k]);
                                        return tenFullDeckArray;
                                    }
                                    tempArray = deckArray[k].concat();
                                    tempArray.push(cardArray[m]);
                                    if (this.checkCardDeck(tempArray), tableVO) {
                                        tenFullDeckArray = [];
                                        tenFullDeckArray.push(tempArray);
                                        tenFullDeckArray.push(deckArray[i]);
                                        tenFullDeckArray.push(deckArray[j]);
                                        return tenFullDeckArray;
                                    }
                                    if (deckArray[i].length + deckArray[j].length + deckArray[k].length === 9) {
                                        niceFullDeckArray = [];
                                        niceFullDeckArray.push(deckArray[i].concat());
                                        niceFullDeckArray.push(deckArray[j].concat());
                                        niceFullDeckArray.push(deckArray[k].concat());
                                    }
                                }
                            }
                        }
                    }
                }
            }

            for (i = 0; i < deckArray.length - 1; i++) // Tìm 2 phỏm khác nhau có độ dài tổng là 9
            {
                for (j = i + 1; j < deckArray.length; j++) {
                    if (!this.compareTwoDeck(deckArray[i], deckArray[j])) {
                        var newArray = cardArray.concat();
                        for (k = 0; k < deckArray[i].length; k++) {
                            for (l = 0; l < newArray.length; l++) {
                                if (newArray[l] === deckArray[i][k]) {
                                    newArray.splice(l, 1);
                                    l = newArray.length + 1;
                                }
                            }
                        }
                        for (k = 0; k < deckArray[j].length; k++) {
                            for (l = 0; l < newArray.length; l++) {
                                if (newArray[l] === deckArray[j][k]) {
                                    newArray.splice(l, 1);
                                    l = newArray.length + 1;
                                }
                            }
                        }
                        this.findFullDeck(deckArray[i], newArray, tableVO);
                        this.findFullDeck(deckArray[j], newArray, tableVO);
                        if (deckArray[i].length + deckArray[j].length >= 9) {
                            if (newArray.length === 0) {
                                tenFullDeckArray = [];
                                tenFullDeckArray.push(deckArray[i]);
                                tenFullDeckArray.push(deckArray[j]);
                                return tenFullDeckArray;
                            }
                            else if (!this.checkIsStealCard(newArray[0], tableVO)) // Tránh trường hợp con bài còn lại không thuộc 2 phỏm là con bài ăn
                            {
                                niceFullDeckArray = [];
                                niceFullDeckArray.push(deckArray[i]);
                                niceFullDeckArray.push(deckArray[j]);
                                this.findFullDeck(deckArray[i], newArray, tableVO);
                                this.findFullDeck(deckArray[j], newArray, tableVO);
                                return niceFullDeckArray;
                            }
                        }
                    }
                }
            }

            return niceFullDeckArray;
        },

        // Tìm phỏm để tự động hạ
        getDeckToAutoDownCard: function (cardArray, tableVO) {
            var fullDeckArray = this.checkFullDeck(cardArray, tableVO);
            if (fullDeckArray.length !== 0)
                return fullDeckArray;

            var tempCardArray = cardArray.concat();
            var deckArray = this.countDeck(tempCardArray, tableVO);

            var i, j, k;
            var selectedDeckArray = [];
            var stealCardNumber = 0;
            var countStealCard;

            // Đếm số lá bài ăn
            for (i = 0; i < tempCardArray.length; i++) {
                if (this.checkIsStealCard(tempCardArray[i], tableVO))
                    stealCardNumber++;
            }

            if (deckArray.length > 0) // trường hợp chỉ có 1 phỏm
            {
                if (stealCardNumber > 0) // Nếu có con bài ăn thì ưu tiên phỏm có con bài ăn
                {
                    for (i = 0; i < deckArray.length; i++) {
                        countStealCard = 0;
                        for (k = 0; k < deckArray[i].length; k++) {
                            if (this.checkIsStealCard(deckArray[i][k], tableVO))
                                countStealCard++;
                        }
                        if (countStealCard > 0) {
                            selectedDeckArray.push(deckArray[i]);
                            i = deckArray.length + 1;
                        }
                    }
                }
                else // Nếu không có con bài ăn
                {
                    selectedDeckArray.push(deckArray[0]);
                }
            }

            for (i = 0; i < deckArray.length - 1; i++) // trường hợp có 2 phỏm
            {
                for (j = i + 1; j < deckArray.length; j++) {
                    if (!this.compareTwoDeck(deckArray[i], deckArray[j])) // Tìm ra 2 phỏm khác nhau
                    {
                        var twoDeckIsTrue;
                        switch (stealCardNumber) {
                            case 0: // Nếu có một lá bài ăn thì kiểm tra xem 2 phỏm đó có một phỏm phải chứa lá bài ăn
                                twoDeckIsTrue = true;
                                break;
                            case 1: // Nếu có một lá bài ăn thì kiểm tra xem 2 phỏm đó có một phỏm phải chứa lá bài ăn
                                countStealCard = 0;
                                for (k = 0; k < deckArray[i].length; k++) {
                                    if (this.checkIsStealCard(deckArray[i][k], tableVO))
                                        countStealCard++;
                                    if (this.checkIsStealCard(deckArray[j][k], tableVO))
                                        countStealCard++;
                                }
                                if (countStealCard > 0)
                                    twoDeckIsTrue = true;
                                break;
                            case 2: // Nếu có hai lá bài ăn thì cả 2 phỏm đều phải có chứa lá bài ăn
                                countStealCard = 0;
                                for (k = 0; k < deckArray[i].length; k++) {
                                    if (this.checkIsStealCard(deckArray[i][k], tableVO))
                                        countStealCard++;
                                    if (this.checkIsStealCard(deckArray[j][k], tableVO))
                                        countStealCard++;
                                }
                                if (countStealCard === 2)
                                    twoDeckIsTrue = true;
                                break;
                        }
                        if (twoDeckIsTrue) {
                            selectedDeckArray = [];
                            selectedDeckArray.push(deckArray[i]);
                            selectedDeckArray.push(deckArray[j]);
                            i = deckArray.length + 1;
                            j = deckArray.length + 1
                        }
                    }
                }
            }

            var newCardArray = [];

            for (i = 0; i < selectedDeckArray.length; i++) {
                for (j = 0; j < selectedDeckArray[i].length; j++) {
                    for (k = 0; k < tempCardArray.length; k++) {
                        if (tempCardArray[k] === selectedDeckArray[i][j]) {
                            newCardArray.push(tempCardArray[k]);
                            tempCardArray.splice(k, 1);
                            k = tempCardArray.length + 1;
                        }
                    }
                }
            }

            for (i = 0; i < selectedDeckArray.length; i++) {
                this.findFullDeck(selectedDeckArray[i], tempCardArray, tableVO);
            }

            return selectedDeckArray;
        },

        checkFullSendCard: function (cardArray, friendDeckArray, tableVO) {
            if (friendDeckArray.length === 0)
                return false;
            var tempArray = friendDeckArray.concat();
            for (var i = 0; i < cardArray.length; i++) {
                tempArray.push(cardArray[i]);
            }
            if (this.checkCardDeck(tempArray, tableVO))
                return true;
            return false;
        },

        checkCardDeckNoStealCard: function (cardArray) {
            if (cardArray.length < 3)
                return false;

            var isWireDeck;
            var i;

            if ((cardArray[0] - cardArray[1]) % 13 !== 0) // check xem có phải phỏm sáp không, nếu không thì là phỏm dây
                isWireDeck = true;

            if (isWireDeck) {
                var minValue = 52;
                for (i = 0; i < cardArray.length; i++) {
                    if (minValue > cardArray[i] + 1)
                        minValue = cardArray[i] + 1;
                }

                for (i = 0; i < cardArray.length; i++) {
                    if (Math.ceil((cardArray[i] + 1) / 13) !== Math.ceil(minValue / 13)) // Nếu là khác chất thì return false
                        return false;
                    if (cardArray[i] + 1 - minValue > cardArray.length - 1)
                        return false;
                }
            }
            else {
                for (i = 0; i < cardArray.length; i++) {
                    if ((cardArray[0] - cardArray[i]) % 13 !== 0)
                        return false;
                }
            }
            return true;
        },

        checkSendCard: function (checkArray, playingPlayerArray, tableVO) {
            checkArray = checkArray.concat();
            var deckArray = [];
            var sendArray = [];

            // Tập hợp lại các bộ đã hạ của tất cả user
            var object;
            var i;
            var j;
            for (i = 0; i < playingPlayerArray.length; i++) {
                if (playingPlayerArray[i].downCardList[0]) {
                    object = {};
                    object[SFSData.USER_NAME] = playingPlayerArray[i].seatId;
                    object[SFSData.CARDS] = playingPlayerArray[i].downCardList[0];
                    object[SFSData.INDEX] = 0;
                    deckArray.push(object);
                }
                if (playingPlayerArray[i].downCardList[1]) {
                    object = {};
                    object[SFSData.USER_NAME] = playingPlayerArray[i].seatId;
                    object[SFSData.CARDS] = playingPlayerArray[i].downCardList[1];
                    object[SFSData.INDEX] = 1;
                    deckArray.push(object);
                }
                if (playingPlayerArray[i].downCardList[2]) {
                    object = {};
                    object[SFSData.USER_NAME] = playingPlayerArray[i].seatId;
                    object[SFSData.CARDS] = playingPlayerArray[i].downCardList[2];
                    object[SFSData.INDEX] = 2;
                    deckArray.push(object);
                }
            }

            for (i = checkArray.length - 1; i >= 0; i--) {
                for (j = 0; j < deckArray.length; j++) {
                    if (checkArray[i]) {
                        if (this.checkFullSendCard([checkArray[i]], deckArray[j][SFSData.CARDS], tableVO)) {
                            checkArray[i].sendObject = deckArray[j];
                            sendArray.push(checkArray[i]);
                            // Nếu là phỏm dây thì tìm xem còn lá bài nào trong checkArray có thể ghép dây tiếp ko
                            if (this.convertIdToSuit(checkArray[i].yunId) === this.convertIdToSuit(deckArray[j][SFSData.CARDS][0].yunId)) {
                                var tempArray = deckArray[j][SFSData.CARDS].concat();
                                tempArray.push(checkArray[i]);
                                checkArray.splice(i, 1);
                                var isEmptyCard = false;
                                while (!isEmptyCard) {
                                    isEmptyCard = true;
                                    for (var k = 0; k < checkArray.length; k++) {
                                        var tempArray2 = tempArray.concat();
                                        tempArray2.push(checkArray[k]);
                                        if (this.checkCardDeck(tempArray2, tableVO)) {
                                            checkArray[k].sendObject = deckArray[j];
                                            sendArray.push(checkArray[k]);
                                            checkArray.splice(k, 1);
                                            isEmptyCard = false;
                                            tempArray = tempArray2;
                                            break;
                                        }
                                    }
                                }
                            }
                            else {
                                checkArray.splice(i, 1);
                            }
                        }
                    }

                    if (checkArray.length === 0) {
                        if (sendArray.length === 0)
                            return null;
                        else
                            return sendArray;
                    }
                }
            }

            if (sendArray.length === 0)
                return null;
            else
                return sendArray;
        }
    }
);