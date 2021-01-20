var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');

class FacebookValidateSceneMediator extends BaseMediator {
    static get NAME() {
        return 'FacebookValidateSceneMediator';
    }

    static get getInstance() {
        if(this.instance === undefined){
            this.instance = new FacebookValidateSceneMediator();
        }
        return this.instance;
    }

    onRegister() {
        puremvc.Mediator.call(this, this.constructor.NAME);
    }
    /** @override */
    listNotificationInterests() {
        return [
            LobbyMessage.SHOW_FACEBOOK_VALIDATE_SCENE,
            LobbyMessage.HIDE_FACEBOOK_VALIDATE_SCENE,
            LobbyMessage.ON_UPDATE_SET_NICK_NAME
        ];
    }

    /** @override */
    handleNotification(notification) {
        BaseMediator.prototype.handleNotification.call(this);
        switch (notification.getName()) {
            case LobbyMessage.SHOW_FACEBOOK_VALIDATE_SCENE:
                this.view.show();
                break;
            case LobbyMessage.HIDE_FACEBOOK_VALIDATE_SCENE:
                this.view.hide();
                break;
            case LobbyMessage.ON_UPDATE_SET_NICK_NAME:
                this.view.onUpdateSetNickName();
                break;
            default:
                break;
        }
    }

    addHanlers () {
        this.view.activeSetNickName = this.activeSetNickName.bind(this);
    }

    activeSetNickName (params) {
        this.sendNotification(LobbyMessage.SEND_SET_NICK_NAME, params);
    }
}

module.exports = FacebookValidateSceneMediator;
