var ReceiveStartGameCommand = require('ReceiveStartGameCommand');
var CoreGameProxy = require('CoreGameProxy');
var UserProxy = require('UserProxy');

export default class ReceiveStartGameBinhCommand extends ReceiveStartGameCommand {
    execute(notification) {
        this.gameProxy = this.facade.retrieveProxy(CoreGameProxy.NAME);
        this.dataUser = this.facade.retrieveProxy(UserProxy.NAME);

        var tableVO = this.gameProxy.getTable();
        if (!tableVO && tableVO.id < 1) return this.showWarning(this.WARNING.THE_TABLE_DOES_NOT_EXIST);
        // TweenMax.killAll(false, false, true);
        var seat = tableVO.getSeatByUserId(this.dataUser.mySelf.uid);
        if (seat) seat.isSort = false;
        ReceiveStartGameCommand.prototype.execute.call(this, notification);
    }
}