var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var GameMessage = require('GameMessage');

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
            this.sendNotification(GameMessage.ON_DESTROY_GAME);

            this.removeAllCommand();
            this.removeAllMediator();
            this.removeAllProxy();
            this.facade.removeCommand(GameMessage.DESTROY_GAME);

            //cc.director.loadScene("LVCScene");
        }
    },

    // STATIC MEMBERS
    {
        NAME: "DestroyGameCommand"
    }
);
