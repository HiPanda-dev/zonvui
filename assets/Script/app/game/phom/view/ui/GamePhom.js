var CoreGame = require('CoreGame');
var AddMoneyPhom = require('AddMoneyPhom');
var GamePhomMediator = require('GamePhomMediator');
var PlayerTablePhom = require('PlayerTablePhom');
var PlayerCardsPhom = require('PlayerCardsPhom');
var ListButtonPhom = require('ListButtonPhom');
var CardManagerPhom = require('CardManagerPhom');
var ResultTablePhom = require('ResultTablePhom');
var OtherCardsPhom = require('OtherCardsPhom');
var CompositeNode = require('CompositeNode');
var Composite = require('Composite');
var GameEvent = require('GameEvent');
var SFSData = require('SFSData');
var LogicPhom = require('LogicPhom');
var FakeCardPhom = require('FakeCardPhom');

cc.Class({
    extends: CoreGame,

    properties: {
        isSnapWithPlayer: true
    },

    // use this for initialization
    onLoad: function () {
        GamePhomMediator.getInstance().init(this);
        CoreGame.prototype.onLoad.call(this);
    },

    buildUI: function () {
        CoreGame.prototype.buildUI.call(this);
        this.mcPlayerCards = new PlayerCardsPhom.create(CompositeNode.PLAYER_CARDS_PANEL_TLMN_NODE);
        this.mcListButton = new ListButtonPhom.create(CompositeNode.LIST_BUTTON_TLMN_NODE);
        this.mcCardManager = new CardManagerPhom.create(CompositeNode.CARD_MANAGER_NODE);
        this.resultTableMgr = new Composite.create(CompositeNode.RESULT_TABLE_MANAGER_NODE);
        this.otherCardsMgr = new Composite.create(CompositeNode.OTHER_CARDS_MANAGER_NODE);
        this.mcFakeCard = new FakeCardPhom.create(CompositeNode.FAKE_CARD_TLMN_NODE);
        this.addMoneyMgr = new Composite.create(CompositeNode.ADD_MONEY_MANAGER_NODE);

        this.rootGame.add(this.mcPlayerCards);
        this.rootGame.add(this.mcListButton);
        this.rootGame.add(this.resultTableMgr);
        this.rootGame.add(this.otherCardsMgr);
        this.rootGame.add(this.mcCardManager);
        this.rootGame.add(this.mcFakeCard);
        this.rootGame.add(this.addMoneyMgr);

        this.rootGame.buildUI();
        this.setup();
        this.applyLayout();
        this.initialize();
        this.addEventListeners();
        if (this.isSnapWithPlayer) {
            this.rootGame.snapWithPlayer();
        }
    },

    setup: function () {
        CoreGame.prototype.setup.call(this);

        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            var seat = this.tableVO.getSeatBySeatId(i);
            if (seat === undefined) continue;

            var player = new PlayerTablePhom.create(CompositeNode.PLAYER_NODE + "_" + i);
            player.setup(seat.id, this.tableVO);
            this.playerMgr.add(player);

            var resultTable = new ResultTablePhom.create(CompositeNode.RESULT_TABLE_NODE + "_" + i);
            resultTable.setup(seat.id, this.tableVO);
            this.resultTableMgr.add(resultTable);

            var addMoney = new AddMoneyPhom.create(CompositeNode.ADD_MONEY_NODE + "_" + i);
            addMoney.setup(seat.id, this.tableVO);
            this.addMoneyMgr.add(addMoney);

            var ontherCards = new OtherCardsPhom.create(CompositeNode.OTHER_CARDS_NODE + "_" + i);
            ontherCards.setup(seat.id, this.tableVO);
            this.otherCardsMgr.add(ontherCards);
        }
    },

    applyLayout: function () {
        this.mcPlayerCards.container = this.component.getChildByName("mcPlayerCards");
        this.mcFakeCard.container = this.component.getChildByName("mcFakeCard");
        this.mcListButton.container = this.component.getChildByName("ctnButton");
        this.mcCardManager.container = this.component.getChildByName("ctnCardManager");
        this.resultTableMgr.container = this.component.getChildByName("mcResult");
        this.otherCardsMgr.container = this.component.getChildByName("ctnOtherCards");
        this.addMoneyMgr.container = this.component.getChildByName("ctnAddMoney");

        this.mcPlayerCards.tableVO = this.tableVO;
        this.mcListButton.tableVO = this.tableVO;
        this.mcCardManager.tableVO = this.tableVO;
        this.mcFakeCard.tableVO = this.tableVO;

        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            this.addMoneyMgr.getChild(CompositeNode.ADD_MONEY_NODE + "_" + i).container = this.addMoneyMgr.container.getChildByName("player" + i);
            this.resultTableMgr.getChild(CompositeNode.RESULT_TABLE_NODE + "_" + i).container = this.resultTableMgr.container.getChildByName("mcReultSeat" + i);
            this.otherCardsMgr.getChild(CompositeNode.OTHER_CARDS_NODE + "_" + i).container = this.otherCardsMgr.container.getChildByName("mcPlayerCards" + i);
        }

        CoreGame.prototype.applyLayout.call(this);
    },

    initialize: function () {
        CoreGame.prototype.initialize.call(this);
        this.showResultGame(false);
    },

    addEventListeners: function () {
        CoreGame.prototype.addEventListeners.call(this);
        this.mcPlayerCards.container.on(GameEvent.SELECT_CARDS, this.onCheckReSelectCards.bind(this));
        this.mcPlayerCards.container.on(GameEvent.LAYING_DONE, this.onListenDownCardFinishFromPlayerCards.bind(this));
        this.mcPlayerCards.container.on(GameEvent.SEND_DONE, this.onListenSendCardFinishFromPlayerCards.bind(this));
    },

    removeEventListeners: function () {
        CoreGame.prototype.removeEventListeners.call(this);
        this.mcPlayerCards.container.off(GameEvent.SELECT_CARDS, this.onCheckReSelectCards.bind(this));
        this.mcPlayerCards.container.off(GameEvent.LAYING_DONE, this.onListenDownCardFinishFromPlayerCards.bind(this));
        this.mcPlayerCards.container.off(GameEvent.SEND_DONE, this.onListenSendCardFinishFromPlayerCards.bind(this));
    },

    onListenDownCardFinishFromPlayerCards: function () {
        this.activeDownCardsFinish();
    },

    onListenSendCardFinishFromPlayerCards: function () {
        this.activeSendCardsFinish();
    },

    onUpdateCurrentTurn: function () {
        this.tableVO.TURN_TIME = this.tableVO.DISCARD_TIME;
        this.tableVO.playingStatus = SFSData.DRAW_CARD;
        this.rootGame.updateCurrentTurn();
    },

    onOtherUserDrawCard: function (seatId) {
        this.tableVO.TURN_TIME = this.tableVO.DISCARD_TIME;
        this.rootGame.updateCurrentTurn();
        this.rootGame.drawCard(seatId);
    },

    onMeDrawCard: function (card) {
        var isDownCard = false;

        var mySeat = this.tableVO.getSeatBySeatId(this.tableVO.mySeatId);
        this.tableVO.playingStatus = SFSData.DISCARD;
        this.tableVO.TURN_TIME = this.tableVO.DISCARD_TIME;
        this.rootGame.meDrawCard(card);
        if (LogicPhom.countDeck(this.mcPlayerCards.vtCardList, this.tableVO).length > 0) {
            if (mySeat.discards.length === this.tableVO.cardNumberToDown) {
                this.tableVO.TURN_TIME = this.tableVO.DOWNCARD_TIME;
                this.tableVO.playingStatus = SFSData.DOWN_CARD;
                isDownCard = true;
            }
        }
        else {
            if (mySeat.discards.length === this.tableVO.cardNumberToDown)
                this.activeDownCardsFinish();
        }

        if (isDownCard)
            this.rootGame.updateCurrentTurn(SFSData.DOWN_CARD);
        else
            this.rootGame.updateCurrentTurn(SFSData.DISCARD);
    },

    onDiscard: function (card, userId, nextTurn) {
        if (nextTurn === this.tableVO.myId)
            this.tableVO.playingStatus = SFSData.DRAW_CARD;
        this.rootGame.discard(card, userId, nextTurn);
    },

    onDealCards: function () {
        this.rootGame.dealCards();
    },

    onStealCard: function (card, userId, moneyAR, moneyBR) {
        var stealerSeat = this.tableVO.getSeatByUserId(userId);
        var stealedPlayerSeat = this.tableVO.getPreviousSeat(stealerSeat.id);

        if (stealerSeat === null || stealerSeat === undefined)
            return;

        if (stealedPlayerSeat === null || stealedPlayerSeat === undefined)
            return;

        this.rootGame.stealCard(card, userId, moneyAR, moneyBR);
        this.arrangeDiscardAfterStealCard(stealerSeat, stealedPlayerSeat);

        var isDownCard = false;
        if (this.tableVO.myId === userId) {
            var mySeat = this.tableVO.getSeatBySeatId(this.tableVO.mySeatId);
            this.tableVO.playingStatus = SFSData.DISCARD;
            if (mySeat.discards.length === this.tableVO.cardNumberToDown) {
                this.tableVO.TURN_TIME = this.tableVO.DOWNCARD_TIME;
                this.tableVO.playingStatus = SFSData.DOWN_CARD;
                isDownCard = true;
            }
        }

        if (!isDownCard) {
            this.tableVO.TURN_TIME = this.tableVO.DISCARD_TIME;
            this.rootGame.updateCurrentTurn(SFSData.DISCARD);
        }
        else {
            this.rootGame.updateCurrentTurn(SFSData.DOWN_CARD);
        }
    },

    onFullLayingCards: function (layingCards, userId) {
        for (var i = 0; i < layingCards.length; i++) {
            this.rootGame.downCard(layingCards[i], userId, i);
        }
    },

    onDownCard: function (cards, userId, index) {
        this.rootGame.downCard(cards, userId, index);
    },

    onDownCardFinish: function (userId) {
        this.rootGame.downCardFinish(userId);

        var isSendCard = false;
        if (userId === this.tableVO.myId) {
            this.tableVO.playingStatus = SFSData.SEND_CARD;
            var otherCardsList = [];
            for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
                otherCardsList.push(this.otherCardsMgr.getChild(CompositeNode.OTHER_CARDS_NODE + "_" + i));
            }

            if (!LogicPhom.checkSendCard(this.mcPlayerCards.vtCardList, otherCardsList, this.tableVO)) {
                this.activeSendCardsFinish();
            }
            else {
                isSendCard = true;
            }
        }
        this.tableVO.TURN_TIME = this.tableVO.SENDCARD_TIME;
        this.rootGame.updateCurrentTurn(SFSData.SEND_CARD);
    },

    onSendCard: function (cards, userId, index, playerDes) {
        this.rootGame.sendCard(cards, userId, index, playerDes);
        if (userId === this.tableVO.myId) {
            var otherCardsList = [];
            for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
                otherCardsList.push(this.otherCardsMgr.getChild(CompositeNode.OTHER_CARDS_NODE + "_" + i));
            }

            if (!LogicPhom.checkSendCard(this.mcPlayerCards.vtCardList, otherCardsList, this.tableVO))
                this.activeSendCardsFinish();
        }
    },

    onSendCardFinish: function (userId) {
        if (userId === this.tableVO.myId)
            this.tableVO.playingStatus = SFSData.DISCARD;
        this.tableVO.TURN_TIME = this.tableVO.DISCARD_TIME;
        this.rootGame.updateCurrentTurn(SFSData.DISCARD);
        this.rootGame.sendCardFinish(userId);
    },

    //==================================================================================================================
    //===========================OVERRIDE===============================================================================
    //==================================================================================================================
    onStartGame: function () {
        CoreGame.prototype.onStartGame.call(this);
        this.showResultGame(false);
    },

    onShowCardsPlace: function (cards) {
        this.rootGame.showCardsPlace(cards);
    },

    onFinishCoundownTime: function () {
        CoreGame.prototype.onFinishCoundownTime.call(this);
        // if (this.tableVO.curTurn === this.tableVO.myId) {
        //     switch (this.tableVO.playingStatus) {
        //         case SFSData.DISCARD:
        //             var listCards = this.mcPlayerCards.getAutoPlayCard();
        //             if (listCards.length === 0) return;
        //             this.activePlayCards({cards: listCards});
        //             break;
        //         case SFSData.DOWN_CARD:
        //             this.autoDownCardWhenTimeOut();
        //             break;
        //         case SFSData.DRAW_CARD:
        //             this.tableVO.playingStatus = SFSData.DO_NOTHING;
        //             this.activeDrawCards();
        //             break;
        //         case SFSData.SEND_CARD:
        //             this.activeSendCardsFinish();
        //             break;
        //     }
        // }
    },

    autoDownCardWhenTimeOut: function () {
        var deckArray = LogicPhom.getDeckToAutoDownCard(this.mcPlayerCards.vtCardList, this.tableVO);
        var j, deckIdArray = [];
        for (j = 0; j < deckArray.length; j++) {
            var tempArray = [];
            deckIdArray.push(tempArray);
            for (var k = 0; k < deckArray[j].length; k++) {
                tempArray[k] = deckArray[j][k].id;
            }
        }
        for (j = 0; j < deckIdArray.length; j++) {
            this.activeDownCards({cards: deckIdArray[j]});
        }
        if (deckArray.length === 0)
            this.activeDownCardsFinish();
    },

    onFinishGame: function (listResult) {
        console.log('%c[onFinishGame]: ' + '', 'background: #222; color: #FF9900');
        this.rootGame.finishGame(listResult);
        this.showResultGame(true);
        TweenLite.delayedCall(this.tableVO.TIME_SHOW_RESULT, function () {
            this.showResultGame(false);
            this.clearAllCards();
        }.bind(this));
    },

    // tu dong ha bai neu co user U
    autoDownCardIfHaveUserFullDeck: function (listResult) {
        var deckArray = LogicPhom.getDeckToAutoDownCard(this.mcPlayerCards.vtCardList, this.tableVO);
        var j, deckIdArray = [];
        for (j = 0; j < deckArray.length; j++) {
            var tempArray = [];
            deckIdArray.push(tempArray);
            for (var k = 0; k < deckArray[j].length; k++) {
                tempArray[k] = deckArray[j][k].id;
            }
        }
    },

    //==================================================================================================================
    //==================================================================================================================
    //==================================================================================================================

    onHanlerCardManagerClick: function () {
        this.activeDrawCards();
    },

    onHanlerXepBaiClick: function () {
        this.mcPlayerCards.onSortCards();
    },

    onHanlerBaoUClick: function () {
        this.noticeFullDeck();
    },

    onHanlerGuiBaiClick: function () {
        var sendArray = this.mcPlayerCards.selectedCards;
        var checkArray = this.mcPlayerCards.selectedCards;
        var sendDict = {};
        var otherCardsList = [];

        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            otherCardsList.push(this.otherCardsMgr.getChild(CompositeNode.OTHER_CARDS_NODE + "_" + i));
        }

        if (sendArray.length === 0) // Nếu không chọn lá bài nào thì cho tự động gửi
        {
            sendArray = LogicPhom.checkSendCard(this.mcPlayerCards.vtCardList, otherCardsList, this.tableVO);
            sendDict = {};
            for (i = 0; i < sendArray.length; i++) {
                var tempString = sendArray[i].sendObject[SFSData.USER_NAME] + sendArray[i].sendObject[SFSData.INDEX];
                if (!sendDict[tempString])
                    sendDict[tempString] = [];
                var tempObject = {};
                tempObject[SFSData.CARD] = sendArray[i];
                tempObject[SFSData.USER_NAME] = this.tableVO.getSeatBySeatId(sendArray[i].sendObject[SFSData.USER_NAME]).user.id;
                tempObject[SFSData.INDEX] = sendArray[i].sendObject[SFSData.INDEX];
                sendDict[tempString].push(tempObject);
            }
            for (var obj in sendDict) {
                var idArray = [];
                var index;
                var receiveName;
                for (i = 0; i < sendDict[obj].length; i++) {
                    idArray.push(sendDict[obj][i][SFSData.CARD].id);
                    index = sendDict[obj][i][SFSData.INDEX];
                    receiveName = sendDict[obj][i][SFSData.USER_NAME];
                }
                this.activeSendCards({index: index, receiveName: receiveName, card: idArray});
            }
            this.activeSendCardsFinish();
            return;
        }

        sendArray = LogicPhom.checkSendCard(sendArray, otherCardsList, this.tableVO);

        var isRecheck;
        if (!sendArray)
            isRecheck = true;
        else if (sendArray.length !== checkArray.length)
            isRecheck = true;

        if (isRecheck) {
            var sendArray = this.mcPlayerCards.selectedCards;
            sendArray = this.checkSendManyCardsToOneDeck(sendArray);
        }

        for (i = 0; i < sendArray.length; i++) {
            var tempString = sendArray[i].sendObject[SFSData.USER_NAME] + sendArray[i].sendObject[SFSData.INDEX];
            if (!sendDict[tempString])
                sendDict[tempString] = [];
            var tempObject = {};
            tempObject[SFSData.CARD] = sendArray[i];
            tempObject[SFSData.USER_NAME] = this.tableVO.getSeatBySeatId(sendArray[i].sendObject[SFSData.USER_NAME]).user.id;
            tempObject[SFSData.INDEX] = sendArray[i].sendObject[SFSData.INDEX];
            sendDict[tempString].push(tempObject);
        }
        for (obj in sendDict) {
            var idArray = [];
            var index;
            var receiveName;
            for (i = 0; i < sendDict[obj].length; i++) {
                idArray.push(sendDict[obj][i][SFSData.CARD].id);
                index = sendDict[obj][i][SFSData.INDEX];
                receiveName = sendDict[obj][i][SFSData.USER_NAME];
            }
            this.activeSendCards({index: index, receiveName: receiveName, card: idArray});
        }
    },

    clearAllCards: function () {
        this.mcPlayerCards.clearAllCards();
        var allOtherCardsList = [];
        for (var i = 0; i <= this.tableVO.TOTAL_PLAYER; i++) {
            allOtherCardsList.push(this.otherCardsMgr.getChild(CompositeNode.OTHER_CARDS_NODE + "_" + i));
        }
        for (i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            allOtherCardsList[i].clearAllCards();
        }
    },

    onHanlerFakeClick: function () {
        this.mcFakeCard.show();
    },

    onHanlerSendCardFake: function () {
        var arrCards = this.mcFakeCard.getPlayerCards();
        this.activeFakeCards({arrCards: arrCards});
        this.mcFakeCard.hide();
    },

    onHanlerHaPhomClick: function () {
        var listCards = this.mcPlayerCards.getDownCardArr();
        if (listCards.length === 0) return;
        for (var i = 0; i < listCards.length; i++) {
            var tempArray = [];
            for (var j = 0; j < listCards[i].length; j++) {
                tempArray.push(listCards[i][j].id);
            }
            this.activeDownCards({cards: tempArray});
        }
    },

    onHanlerBocBaiClick: function () {
        this.activeDrawCards();
    },

    onHanlerAnBaiClick: function () {
        this.activeStealCards();
    },

    onHanlerChonLaiClick: function () {
        this.mcPlayerCards.onReSelectCards();
    },

    onHanlerDanhBaiClick: function () {
        if (!this.mcPlayerCards.currentSelectedCard)
            return;
        var mySeat = this.tableVO.getSeatByUserId(this.tableVO.myId);
        if (mySeat.discards.length === this.tableVO.cardNumberToDown) {
            this.activeDownCardsFinish();
            this.activeSendCardsFinish();
        }
        var listCards = [this.mcPlayerCards.currentSelectedCard.id];
        this.activePlayCards({cards: listCards});
    },

    onHanlerBackGameClick: function (backToggle) {
        CoreGame.prototype.onHanlerBackGameClick.call(this, backToggle);
    },

    onCheckReSelectCards: function () {
        if (this.mcPlayerCards.cardAcceptArr.length === 1) {
            this.mcListButton.checkEnablePlayCards(this.mcPlayerCards.cardAcceptArr);
        } else {
            this.mcListButton.setEnabledPlayCards(false);
        }
    },

    showResultGame: function (isShow) {
        this.resultTableMgr.container.active = isShow;
    },

    setDownCardInfo: function (deckArray) {
        var playingPlayerArray = [];
        var object, i;
        for (i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            playingPlayerArray.push(this.otherCardsMgr.getChild(CompositeNode.OTHER_CARDS_NODE + "_" + i));
        }


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
        return object;
    },

    checkSendManyCardsToOneDeck: function (checkArray) {
        checkArray = checkArray.concat();
        var deckArray = [];
        var sendArray = [];
        var j;

        // Tập hợp lại các bộ đã hạ của tất cả user
        this.setDownCardInfo(deckArray);

        for (j = 0; j < deckArray.length; j++) {
            if (LogicPhom.checkFullSendCard(checkArray, deckArray[j][SFSData.CARDS], this.tableVO)) {
                for (i = 0; i < checkArray.length; i++) {
                    checkArray[i].sendObject = deckArray[j];
                    sendArray.push(checkArray[i]);
                }
                return sendArray;
            }
        }

        return sendArray;
    },

    checkOneCardSendMultiDeck: function (checkArray) {
        checkArray = checkArray.concat();
        var deckArray = [];
        var sendArray = [];

        // Tập hợp lại các bộ đã hạ của tất cả user
        var object = this.setDownCardInfo(deckArray);
        var j;

        for (j = 0; j < deckArray.length; j++) {
            if (LogicPhom.checkFullSendCard(checkArray, deckArray[j][SFSData.CARDS], this.tableVO)) {
                deckArray[j + 20] = checkArray[0];
                sendArray.push(deckArray[j]);
            }
        }

        return sendArray;
    },

    // hàm bố trí lại vị trí của các quân bài đánh sau khi ăn
    arrangeDiscardAfterStealCard: function (stealPlayer, stealedPlayer) {
        var i, j, startIndex, card;
        var playerArray = this.tableVO.getPlayingSeatList();
        for (i = 0; i < playerArray.length; i++) {
            if (playerArray[i] === stealPlayer) {
                startIndex = i;
                i = playerArray.length;
            }
        }

        var player, beforePlayer, otherCards, cardId, pos;

        if (startIndex === 0)
            startIndex = playerArray.length;
        for (i = startIndex - 1; i >= 0; i--) {
            player = playerArray[i];
            if (i === 0)
                beforePlayer = playerArray[playerArray.length - 1];
            else
                beforePlayer = playerArray[i - 1];
            if (beforePlayer.discards.length > player.discards.length && player !== stealPlayer) {
                otherCards = this.getOtherCardsFromSeatId(beforePlayer.id);
                cardId = beforePlayer.discards[beforePlayer.discards.length - 1];
                beforePlayer.discards.pop();
                player.discards.push(cardId);
                otherCards.popDiscard();
                player.cards.push(cardId);
                pos = otherCards.getPosFromDiscards(cardId);
                otherCards = this.getOtherCardsFromSeatId(player.id);
                otherCards.addDiscardFromOtherPlayerDiscard(cardId, pos);
            }
        }
        for (i = playerArray.length - 1; i > startIndex; i--) {
            player = playerArray[i];
            beforePlayer = playerArray[i - 1];
            if (beforePlayer.discards.length > player.discards.length && player !== stealPlayer) {
                otherCards = this.getOtherCardsFromSeatId(beforePlayer.id);
                cardId = beforePlayer.discards[beforePlayer.discards.length - 1];
                beforePlayer.discards.pop();
                player.discards.push(cardId);
                otherCards.popDiscard();
                player.cards.push(cardId);
                pos = otherCards.getPosFromDiscards(cardId);
                otherCards = this.getOtherCardsFromSeatId(player.id);
                otherCards.addDiscardFromOtherPlayerDiscard(cardId, pos);
            }
        }
    },

    getOtherCardsFromSeatId: function (seatId) {
        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            if (this.otherCardsMgr.getChild(CompositeNode.OTHER_CARDS_NODE + "_" + i).seatId === seatId)
                return this.otherCardsMgr.getChild(CompositeNode.OTHER_CARDS_NODE + "_" + i);
        }
    }
});

