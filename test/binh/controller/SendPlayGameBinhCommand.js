var BaseGameCommand = require('BaseGameCommand');

export default class SendPlayGameBinhCommand extends BaseGameCommand {
    execute(notification) {
        BaseGameCommand.prototype.execute.call(this, notification);
        var params = notification.getBody();
        this.gameProxy.sendPlayGame(params);
    }
}