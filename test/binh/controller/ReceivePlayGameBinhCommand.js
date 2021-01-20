var BaseCommand = require('BaseCommand');
var GameMessage = require('GameMessage');
var BaseGameCommand = require('BaseGameCommand');

export default class ReceivePlayGameBinhCommand extends BaseGameCommand {
    execute(notification) {
        BaseGameCommand.prototype.execute.call(this, notification);
        var params = notification.getBody();
        var userId = params.userId;
        var isSort = params.isSort;

        var tableVO = this.gameProxy.getTable();
        if (!tableVO) return this.showWarning(BaseGameCommand.WARNING.THE_TABLE_DOES_NOT_EXIST);
        if (!tableVO.isPlaying) return this.showWarning(BaseGameCommand.WARNING.TABLE_DOES_NOT_PLAYING);

        var seat = tableVO.getSeatByUserId(userId);
        if (seat) {
            seat.isSort = isSort;
            this.sendNotification(GameMessage.ON_SORT_FINISH, { seatId: seat.id, isSort: isSort });
        }
    }
}
