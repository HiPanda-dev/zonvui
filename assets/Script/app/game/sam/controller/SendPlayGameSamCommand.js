var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var LogicSam = require('LogicSam');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSMessage = require('SFSMessage');
var CardVO = require('CardVO');
var Utility = require('Utility');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseGameCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            BaseGameCommand.prototype.execute.call(this, notification);

            var params = notification.getBody();

            var cardShot = [];
            var cardType = -1;
            var tableVO = this.gameProxy.getTable();
            var mySelf = this.dataUser.mySelf;
            var mySeat = tableVO.getSeatByUserId(mySelf.id);
            var playCards = tableVO.playCards.concat();

            if (!tableVO) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
            if (!tableVO.isPlaying) return this.showWarning(BaseGameCommand.WARNING.TABLE_DOES_NOT_PLAYING);
            if (!mySeat) return this.showWarning(BaseGameCommand.WARNING.PLAYER_NOT_SITTING);
            if (tableVO.curTurn !== mySelf.id) return this.showWarning(BaseGameCommand.WARNING.PLAYER_NOT_TURN);
            if (tableVO.isShot) return this.showWarning(BaseGameCommand.WARNING.PLAYER_SEND_PLACE_CARDS_IS_TRUE);

            if (params && params.cards) {
                //kiểm tra bài đánh đúng chưa?
                cardShot = params.cards;
                if (cardShot.length === 1) cardType = LogicSam.OTHER_CODE_SINGLE;
                if (cardShot.length === 2 && LogicSam.isSameNumber(cardShot)) cardType = LogicSam.OTHER_CODE_PAIR;
                if (cardShot.length === 3 && LogicSam.isSameNumber(cardShot)) cardType = LogicSam.OTHER_CODE_TRIPLE;
                if (LogicSam.isTuQuy(cardShot)) cardType = LogicSam.OTHER_CODE_FOUR_OF_AKIND;
                else if (LogicSam.isBoSanh(cardShot)) cardType = LogicSam.OTHER_CODE_STRAIGHT;
                if (!LogicSam.isCardValid(cardShot, cardType, playCards)) return;
                if (cardType == -1) return;
            } else {
                //hàm tự động đánh bài
                return;
                // cardShot = LogicSam.getSmallestCard(mySeat.cards).card;
                // if (cardShot.length == 1) cardType = LogicSam.OTHER_CODE_SINGLE;
                // if (cardShot.length == 2 && LogicSam.isSameNumber(cardShot)) cardType = LogicSam.OTHER_CODE_PAIR;
                // if (cardShot.length == 3 && LogicSam.isSameNumber(cardShot)) cardType = LogicSam.OTHER_CODE_TRIPLE;
                // if (LogicSam.isTuQuy(cardShot)) cardType = LogicSam.OTHER_CODE_FOUR_OF_AKIND;
                // else if (LogicSam.isBoSanh(cardShot)) cardType = LogicSam.OTHER_CODE_STRAIGHT;
                // if (!LogicSam.isCardValid(cardShot, cardType, playCards)) return;
                // if (cardType == -1) return;
            }

            tableVO.isShot = true;
            Utility.sortArray(params.cards, "NUMERIC");
            if(cardType === LogicSam.OTHER_CODE_STRAIGHT){
                LogicSam.sortStraightCards(params.cards);
            }
            var data = {
                cmd: SFSSubMesseage.SEND_PLAY_GAME,
                params: {
                    cards: cardShot,
                    playCardType: cardType
                }
            };

            this.sendNotification(SFSMessage.SEND_TO_SERVER, data);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "SendPlayGameSamCommand"
    }
);
