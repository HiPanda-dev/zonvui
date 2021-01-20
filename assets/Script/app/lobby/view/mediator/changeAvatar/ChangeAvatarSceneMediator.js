var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var puremvc = BaseMediator.puremvc;
var ChangeAvatarSceneMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'ChangeAvatarSceneMediator',
        parent: BaseMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        initialize: function () {
            this.avatarProxy = this.facade.retrieveProxy('AvatarProxy');
        },

        /** @override */
        listNotificationInterests: function () {
            return [
                LobbyMessage.SHOW_CHANGE_AVATAR_SCENE,
                LobbyMessage.HIDE_CHANGE_AVATAR_SCENE,
                LobbyMessage.ON_UPDATE_AVATAR_LIST,
                LobbyMessage.ON_UPDATE_CHANGE_AVATAR,
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            BaseMediator.prototype.handleNotification.call(this);
            switch (notification.getName()) {
                case LobbyMessage.SHOW_CHANGE_AVATAR_SCENE:
                    this.view.show();
                    break;
                case LobbyMessage.HIDE_CHANGE_AVATAR_SCENE:
                    this.view.hide();
                    break;
                case LobbyMessage.ON_UPDATE_AVATAR_LIST:
                    this.view.onUpdateAvatarList(this.avatarProxy.avatarVO.avatarList);
                    break;
                case LobbyMessage.ON_UPDATE_CHANGE_AVATAR:
                    this.view.onUpdateChangeAvatar();
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            this.view.activeGetAvatarList = this.activeGetAvatarList.bind(this);
            this.view.activeChangeAvatar = this.activeChangeAvatar.bind(this);
        },

        activeGetAvatarList: function (params) {
            this.sendNotification(LobbyMessage.SEND_GET_AVATAR_LIST, params);
        },

        activeChangeAvatar: function (params) {
            this.sendNotification(LobbyMessage.SEND_CHANGE_AVATAR, params);
        },
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new ChangeAvatarSceneMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'ChangeAvatarSceneMediator'
    }
);

module.exports = ChangeAvatarSceneMediator;
