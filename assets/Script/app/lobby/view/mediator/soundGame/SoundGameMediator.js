var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var LocalStorage = require('LocalStorage');
var puremvc = BaseMediator.puremvc;
var SoundGameMediator = puremvc.define
(
    // CLASS INFO
    {
        name: 'SoundGameMediator',
        parent: BaseMediator,
        constructor: function () {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        initialize: function () {

        },

        /** @override */
        listNotificationInterests: function () {
            return [
                LobbyMessage.PLAY_BACKGROUND_MUSIC,
                LobbyMessage.STOP_BACKGROUND_MUSIC,
                LobbyMessage.PLAY_BACKGROUND_MUSIC_GAME,
                LobbyMessage.PLAY_SOUND_EFFECT
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            BaseMediator.prototype.handleNotification.call(this);
            var sound = notification.getBody();

            switch (notification.getName()) {

                case LobbyMessage.PLAY_BACKGROUND_MUSIC:
                    if(LocalStorage.getMusic() !== "true") break;
                    cc.audioEngine.stopAll();
                    this.view.playSound(sound.soundName , true, sound.volume);
                    break;
                case LobbyMessage.STOP_BACKGROUND_MUSIC:
                    cc.audioEngine.stopAll();
                    break;
                case LobbyMessage.PLAY_BACKGROUND_MUSIC_GAME:
                    if(LocalStorage.getMusic() !== "true") break;
                    this.view.playSound(soundName , false);
                    break;
                case LobbyMessage.PLAY_SOUND_EFFECT:
                    if(LocalStorage.getSound() !== "true") break;
                    this.view.playSoundEffect(sound);
                    break;
                default:
                    break;
            }
        },

        addHanlers: function () {
            BaseMediator.prototype.addHanlers.call(this);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function () {
            if (this.instance === null) {
                this.instance = new SoundGameMediator();
            }
            return this.instance;
        },
        instance: null,
        NAME: 'SoundGameMediator'
    }
);

module.exports = SoundGameMediator;
