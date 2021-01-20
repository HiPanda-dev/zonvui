var BaseCommand = require('BaseCommand');
var MiniGameMessage = require('MiniGameMessage');
var Utility = require('Utility');
var i18n = require('i18n');

var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: BaseCommand
    },

    // INSTANCE MEMBERS
    {
        execute: function (notification) {
            BaseCommand.prototype.execute.call(this, notification);

            var params = notification.getBody();

            if(!params.success){
                this.onShowErrorSpin();
                return;
            }


            var vong1 = Utility.convertSFSObjectToObject(params.vong1);
            var vong2 = Utility.convertSFSObjectToObject(params.vong2);

            var mySelf =  this.facade.retrieveProxy('UserProxy').mySelf;
            var value1 = parseInt(vong1.value);
            var value2 = parseInt(vong2.value);
            if(value1 >= 10 && value1 <= 5000){
                mySelf.money += value1;
            }
            if(value1 >= 50000 && value1 <= 500000){
                mySelf.chip += value1;
            }
            if(value2 === 500000 || value2 === 1000000){
                mySelf.chip += value2;
            }
            this.sendNotification(MiniGameMessage.ON_SPIN_VONG_QUAY, {vong1: vong1.index, vong2: vong2.index});

        },

        onShowErrorSpin: function () {
            this.sendNotification(MiniGameMessage.SHOW_MESSAGE_VONG_QUAY, i18n.t("T0007"));
        }

    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveResultSpinVongQuayCommand"
    }
);
