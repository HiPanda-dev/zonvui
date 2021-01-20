import { SFSData } from "../../../../network/sfs/constans/SFSData";
import { SFSEvent } from "../../../../network/sfs/constans/SFSEvent";

var CoreGameProxy = require("CoreGameProxy");
var TableBinhVO = require("TableBinhVO");
var RulesBinhVO = require("RulesBinhVO");
var SeatBinhVO = require("SeatBinhVO");
var GameMessage = require('GameMessage');
var Utility = require('Utility');

export default class BinhProxy extends CoreGameProxy {
    static get NAME() {
        return 'BinhProxy';
    }

    onRegister() {
        CoreGameProxy.NAME = BinhProxy.NAME;
        CoreGameProxy.prototype.onRegister.call(this);
    }

    initTable() {
        CoreGameProxy.prototype.initTable.call(this);
        this.tableVO = new TableBinhVO();
        this.tableVO.TURN_TIME = 55;
        this.tableVO.TOTAL_PLAYER = 4;
        this.tableVO.RATE_MIN_BET = 4;

        this.tableVO.TIME_SO_CHI = 5;
        this.tableVO.TIME_SHOW_RESULT = 5;
    }

    initRules() {
        CoreGameProxy.prototype.initRules.call(this);
        this.tableVO.rules = new RulesBinhVO();
    }

    initSeats() {
        CoreGameProxy.prototype.initSeats.call(this);
        this.tableVO.seats = [];
        this.tableVO.seats.push(null);
        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            var seat = new SeatBinhVO();
            seat.id = i;
            this.tableVO.seats.push(seat);
        }
    }
    /////////////////////////////////////////////////////////////////
    ////////////////////SEVER REPONSE//////////////////////////////
    ////////////////////////////////////////////////////////////////
    onMessage(event) {
        if (this.checkQueueMesseage(event)) return;
        var params = event.params;
        switch (event.cmd) {
            case SFSEvent.SORT_FINISH:
                this.onSortFinish(params);
                break;
            case SFSEvent.GAME_OVER:
                this.onFinisGame(params);
                break;
        }
        CoreGameProxy.prototype.onMessage.call(this, event);

    }

    convertCardInCurrentGame(cards) {
        return (cards) ? Utility.convertServerToClientCardsBinh(cards) : null;
    }

    //override
    onDealCards(params) {
        var sfo = params;
        var arrCard = sfo.get(SFSData.CARDS);
        var curTurn = sfo.get(SFSData.CURRENT_TURN);
        var playerList = sfo.get(SFSData.PLAYER_LIST);
        var arrUser = [];

        for (var i = 0; i < playerList.length; i++) {
            var uid = this.dataUser.getUserByUserName(playerList[i]).uid;
            arrUser.push(uid)
        }

        arrCard = (arrCard === null) ? [] : Utility.convertServerToClientCardsBinh(arrCard);

        this.sendNotification(GameMessage.RECEIVE_DEAL_CARDS, {
            arrCard: arrCard,
            curTurn: curTurn,
            playerList: arrUser
        });
    }

    onSortFinish(params) {
        var sfo = params;
        var isSort = sfo.get(SFSData.IS_SORT);
        var userName = sfo.get(SFSData.USER_NAME);
        var userId = this.dataUser.getUserByUserName(userName).uid;
        this.sendNotification(GameMessage.RECEIVE_PLAY_GAME, { userId: userId, isSort: isSort });
    }

    onFinisGame(params) {
        var sfo = Utility.convertSFSObjectToObject(params);
        var result = Utility.convertSFSArrayToArray(sfo[SFSData.RESULT]);
        var quiters = Utility.convertSFSArrayToArray(sfo[SFSData.QUITERS]);
        var arrQuiters = [];
        for (var i = 0; i < result.length; i++) {
            var obj = result[i];
            obj.cardsChi1 = Utility.convertServerToClientCardsBinh(obj.cardsChi1);
            obj.cardsChi2 = Utility.convertServerToClientCardsBinh(obj.cardsChi2);
            obj.cardsChi3 = Utility.convertServerToClientCardsBinh(obj.cardsChi3);
            obj.uid = this.dataUser.getUserByUserName(obj.userName).uid;
        }

        for (i = 0; i < quiters.length; i++) {
            arrQuiters.push(this.dataUser.getUserById(quiters[i]).uid)
        }

        sfo.result = result;
        sfo.quiters = arrQuiters;

        this.sendNotification(GameMessage.RECEIVE_FINISH_GAME, { data: sfo });
    }

    onUpdateUserInfo(params) {
        this.updateUserInfo(params, this.tableVO.totalTime)
    }
    /////////////////////////////////////////////////////////////////
    ////////////////////SEND TO SERVER//////////////////////////////
    ////////////////////////////////////////////////////////////////

    sendPlayGame(params) {
        var arrCards = params.arrCards;
        var isSort = (params.isSort === undefined) ? false : params.isSort;
        var type = (params.type === undefined) ? 0 : params.type;
        var sfo = new SFS2X.SFSObject();
        sfo.putUtfString(SFSData.COMMAND, SFSData.SORT_FINISH);
        sfo.putIntArray(SFSData.CARDS, Utility.convertClientToServerCardsBinh(arrCards));
        sfo.putBool(SFSData.IS_SORT, isSort);
        sfo.putInt(SFSData.SPECIAL_GROUP, type);

        this.sendExtensionRequest(SFSEvent.SORT_FINISH, sfo);
    }

    sendSubmitHand(params) {
        var arrCards = params.arrCards;
        var sfo = new SFS2X.SFSObject();
        sfo.putUtfString(SFSData.COMMAND, SFSData.SUBMIT_HAND);
        sfo.putIntArray(SFSData.CARDS, Utility.convertClientToServerCardsBinh(arrCards));

        this.sendExtensionRequest(SFSEvent.SUBMIT_HAND, sfo);
    }

    sendFakeCard(params) {
        var arrCards = params.arrCards;
        var sfo = new SFS2X.SFSObject();
        sfo.putUtfString(SFSData.COMMAND, SFSData.START_GAME_1);
        sfo.putIntArray(SFSData.CARD_ARRAY_1, Utility.convertClientToServerCardsBinh(arrCards[0]));
        sfo.putIntArray(SFSData.CARD_ARRAY_2, Utility.convertClientToServerCardsBinh(arrCards[1]));
        sfo.putIntArray(SFSData.CARD_ARRAY_3, Utility.convertClientToServerCardsBinh(arrCards[2]));
        sfo.putIntArray(SFSData.CARD_ARRAY_4, Utility.convertClientToServerCardsBinh(arrCards[3]));

        this.sendExtensionRequest(SFSEvent.START_GAME_1, sfo);
    }
}
