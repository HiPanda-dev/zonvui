var BaseCommand = require('BaseCommand');
var BaseGameCommand = require('BaseGameCommand');
var MiniGameMessage = require('MiniGameMessage');
var VongQuayProxy = require('VongQuayProxy');
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
            this.gameProxy = new VongQuayProxy();

            this.registerCommand(MiniGameMessage.INIT_VONG_QUAY, require('InitVongQuayCommand'));
            this.registerCommand(MiniGameMessage.SEND_GET_INFO_VONG_QUAY, require('SendGetInfoVongQuayCommand'));
            this.registerCommand(MiniGameMessage.SEND_SPIN_VONG_QUAY, require('SendSpinVongQuayCommand'));
            this.registerCommand(MiniGameMessage.RECEIVE_RESULT_SPIN_VONG_QUAY, require('ReceiveResultSpinVongQuayCommand'));

            //register proxy
            this.registerProxy(this.gameProxy);

            //register mediator
            this.registerMediator(require('VongQuaySceneMediator').getInstance());

        }
    },

    // STATIC MEMBERS
    {
        NAME: "SetupVongQuayCommand"
    }
);
