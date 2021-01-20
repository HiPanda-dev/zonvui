var BaseCommand = require('BaseCommand');
var SFSSubMesseage = require('SFSSubMesseage');
var SFSMinigameCommand = require('SFSMinigameCommand');
var SFSEvent = require('SFSEvent');
var puremvc = BaseCommand.puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        parent: SFSMinigameCommand
    },

    // INSTANCE MEMBERS
    {
        SFSData:{
            ROOM_ID:'roomId',
            LINES:'lines',
            PAGE: 'page',
            MONEY_TYPE: 'moneyType'
        },

        execute: function (notification) {
            this.sfsProxy = this.facade.retrieveProxy('SFSPokeGoProxy');
            SFSMinigameCommand.prototype.execute.call(this, notification);

            var params = notification.getBody();
            switch (params.cmd) {
                case SFSSubMesseage.SEND_SPIN:
                    this.sendSpin(params);
                    break;
                case SFSSubMesseage.SEND_CHANGE_ROOM:
                    this.sendChangeRoom(params);
                    break;
            }
        },

        // onJoinGame: function (params) {
        //     this.sfsProxy.joinZone("192.168.0.135", 8080, params.data.userJoin, "", params.data.zoneName, this.dataUser.mySelf.token);
        // },

        sendSpin: function(params){
            params = params.params;
            var roomId = params.roomId;
            var lineSelect = params.lines;
            var sfsob = new SFS2X.SFSObject();
            sfsob.putInt(this.SFSData.ROOM_ID, roomId);
            sfsob.putIntArray(this.SFSData.LINES, lineSelect);

            this.sendExtensionRequest(SFSEvent.SEND_SPIN, sfsob);
        },

        sendChangeRoom: function(params){
            params = params.params;
            var roomId = params.roomId;
            var sfsob = new SFS2X.SFSObject();
            sfsob.putInt(this.SFSData.ROOM_ID, roomId);

            this.sendExtensionRequest(SFSEvent.CHANGE_ROOM, sfsob);
        }
        
    },

    // STATIC MEMBERS
    {
        NAME: "SFSPokeGoCommand"
    }
);
