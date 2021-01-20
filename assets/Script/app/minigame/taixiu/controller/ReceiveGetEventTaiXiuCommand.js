var BaseCommand = require('BaseCommand');
var Constants = require('Constants');
var MiniGameMessage = require('MiniGameMessage');

export default class ReceiveGetEventTaiXiuCommand extends BaseCommand {
    execute(notification) {
        BaseCommand.prototype.execute.call(this, notification);

        var params = notification.getBody();
        this.sendNotification(MiniGameMessage.ON_UPDATE_EVENT_TAI_XIU, params.data);
    }
}
