var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var Utility = require('Utility');

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
            if (this.isError(notification.getBody().data)) return;

            var data = notification.body.data;
            var typeWin = notification.body.type;
            var text = 'Chúc mừng  ';
            var game = '';
            // this.updateChatNotifies(data);

            for (var i = 0 ; i < data.length ; i++){
                switch (data[i].i){
                    case 100:
                        game = '(Tài xỉu)';
                        break;
                    case 102:
                        game = '(Minipoker)';
                        break;
                    case 103:
                        game = '(Thiên hà)';
                        break;
                    case 200:
                        game = '(Lucky Cafe)';
                        break;

                }
                if(typeWin === 1)
                    text = text + '     ' + '<color=#ff0000>'+data[i].a+'</color>' + '  Nổ hũ  ' + '<color=#ffff00>'+Utility.formatCurrency(data[i].c)+'</color>' + ' <color=#00ff00>'+game+'</color>' ;
                else
                    text = text + '     ' + '<color=#ff0000>'+data[i].a+'</color>' + '  thắng  ' + '<color=#ffff00>'+Utility.formatCurrency(data[i].v)+'</color>' + ' <color=#00ff00>'+game+'</color>' ;

            }
            this.sendNotification(LobbyMessage.ON_UPDATE_NOTIFIES, {strNotifies: text});
        },

        updateChatNotifies:function(data){
            var notifiesProxy = this.facade.retrieveProxy('NotifiesProxy');
            if (data.textChat.length === 0 || notifiesProxy.data.curTextchat === data.textChat[data.textChat.length-1]) return;
            notifiesProxy.data.curTextchat = data.textChat[data.textChat.length-1];
            for (var i = 0; i < data.textChat.length; i++) {
                this.sendNotification(LobbyMessage.ON_UPDATE_ADMIN_CHAT, {displayName: "Admin", message: data.textChat[i]});
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetNotifiesCommand"
    }
);
