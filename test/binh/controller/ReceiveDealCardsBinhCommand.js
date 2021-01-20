var BaseCommand = require('BaseCommand');
var GameMessage = require('GameMessage');
var BaseGameCommand = require('BaseGameCommand');

export default class ReceiveDealCardsBinhCommand extends BaseGameCommand {
    execute(notification) {
        BaseGameCommand.prototype.execute.call(this, notification);
        var params = notification.getBody();

        var arrCard = params.arrCard;
        var playerList = params.playerList;
        var mySelf = this.dataUser.mySelf;
        var tableVO = this.gameProxy.getTable();
        var mySeat = tableVO.getSeatByUserId(mySelf.id);

        if (!tableVO && tableVO.id < 1) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
        if (!arrCard) return this.showWarning(BaseGameCommand.WARNING.THE_CARDS_DOES_NOT_EXIST);
        if (!mySeat) return this.showWarning(BaseGameCommand.WARNING.THE_SEAT_DOES_NOT_EXIST);


        tableVO.playCards = [];
        mySeat.cards = [];

        for (var i = 0; i < playerList.length; i++) {
            var seat = tableVO.getSeatByUserId(playerList[i]);
            if (!seat) continue;
            if (seat.id === mySeat.id) {
                for (var j = 0; j < arrCard.length; j++) {
                    var idx = Math.floor(j / 5);
                    if (!seat.cards[idx]) seat.cards[idx] = [];
                    seat.cards[idx].push(arrCard[j]);
                }
            } else {
                for (var j = 0; j < 13; j++) {
                    var idx = Math.floor(j / 5);
                    if (!seat.cards[idx]) seat.cards[idx] = [];
                    seat.cards[idx].push(0);
                }
            }
            seat.cardNrReminder = seat.cards.length;
            seat.isSort = false;
        }
        this.sendNotification(GameMessage.ON_DEAL_CARDS);
    }
}