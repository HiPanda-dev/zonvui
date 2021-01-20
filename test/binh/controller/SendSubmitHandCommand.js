var BaseGameCommand = require('BaseGameCommand');

export default class SendSubmitHandCommand extends BaseGameCommand {
    execute(notification) {
        BaseGameCommand.prototype.execute.call(this, notification);
        var params = notification.getBody();
        this.gameProxy.sendSubmitHand(params);
    }
}