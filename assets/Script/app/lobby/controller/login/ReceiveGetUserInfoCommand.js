var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
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
            if (this.isError(notification.getBody().data)) return;

            var params = notification.getBody();
            var data = params.data;
            var dataUser = this.facade.retrieveProxy('UserProxy');
            var mySelf = dataUser.mySelf;

            if(mySelf.id === params.sendData.userId){
                mySelf.updateData(data);
                this.sendRefreshMoney();
                this.sendNotification(LobbyMessage.ON_UPDATE_MY_INFO);
            }else{
                var user = dataUser.getUserById(params.sendData.userId);
                if(!user){
                    user = new UserVO();
                    dataUser.addUser(user);
                }
                user.updateData(data);
            }
        },

        isError: function (params) {
            if (!params.isError) return false;
            this.sendNotification(LobbyMessage.SHOW_ALERT,{content:params.userInfo.errorMessage});
            return true;
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveGetUserInfoCommand"
    }
);
