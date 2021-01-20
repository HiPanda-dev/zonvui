var BaseCommand = require('BaseCommand');
var LobbyMessage = require('LobbyMessage');
var RoomVO = require('RoomVO');

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

            var roomList = notification.getBody().roomList;
            var roomProxy = this.facade.retrieveProxy('RoomProxy');

            roomProxy.vtRooms = [];
            for (var i = 0; i < roomList.length; i++) {
                var room = new RoomVO();
                room.initData(roomList[i]);
                roomProxy.vtRooms.push(room);
            }

            this.sendNotification(LobbyMessage.ON_UPDATE_ROOM_LIST);
        }
    },

    // STATIC MEMBERS
    {
        NAME: "ReceiveUpdateRoomListCommand"
    }
);
