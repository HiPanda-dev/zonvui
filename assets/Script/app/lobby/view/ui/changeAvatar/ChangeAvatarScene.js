var BasePopup = require('BasePopup');
var AvatarListControl = require('AvatarListControl');
var ChangeAvatarSceneMediator = require('ChangeAvatarSceneMediator');
var LobbyEvent = require('LobbyEvent');

cc.Class({
    extends: BasePopup,

    properties: {
        avatarListControl: AvatarListControl,
    },

    // use this for initialization
    onLoad: function () {
        ChangeAvatarSceneMediator.getInstance().init(this);
        this.addEventListeners();
        this.hide();
    },

    addEventListeners: function () {
        this.avatarListControl.node.on(LobbyEvent.CHANGE_AVATAR, this.onHandlerChangeAvatar, this);
    },

    removeEventListeners: function () {
        this.avatarListControl.node.off(LobbyEvent.CHANGE_AVATAR, this.onHandlerChangeAvatar, this);
    },

    onHandlerChangeAvatar: function (params) {
        this.activeChangeAvatar(params.detail);
    },

    show:function () {
        BasePopup.prototype.show.call(this);
        this.activeGetAvatarList();
    },

    onUpdateChangeAvatar:function (data) {

    },

    onUpdateAvatarList:function (data) {
        this.avatarListControl.updatePageView(data);
    },
});