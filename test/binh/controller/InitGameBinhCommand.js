var GameMessage = require('GameMessage');
var InitGameCommand = require('InitGameCommand');

export default class InitGameBinhCommand extends InitGameCommand {
    execute(notification) {
        InitGameCommand.prototype.execute.call(this, notification);
    }
    updateCustomProperties() {
        var tableVO = this.gameProxy.getTable();
        if (tableVO.isPlaying) {
            this.sendNotification(GameMessage.ON_UPDATE_CURRENT_TURN);
        }
    }
}
