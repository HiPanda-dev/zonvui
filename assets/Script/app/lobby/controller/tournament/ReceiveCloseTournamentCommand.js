var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var i18n = require('i18n');

export default class ReceiveCloseTournamentCommand extends BaseCommand {
    execute(notification) {
        BaseCommand.prototype.execute.call(this, notification);
        this.sendNotification(LobbyMessage.SHOW_ALERT,{content:i18n.t("T0058")});
        this.sendNotification(LobbyMessage.SHOW_ALERT,{content:i18n.t("T0058")});
    }
}
