var LocalStorage = require('LocalStorage');
var SoundGameMessage = require('SoundGameMessage');
var SoundGameMediator = require('SoundGameMediator');
var GameConfig = require('GameConfig');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        SoundGameMediator.getInstance().init(this);
    },

    setStateMusic: function(){

    },

    setStateEffect: function(){

    },

    playSound: function(soundName, repeat, volume) {
        if(!volume) volume = 1;

        if(this.soundExist(soundName)) {
          var sound = LocalStorage.getItemSound(soundName);
          cc.audioEngine.play(sound, repeat, volume);
        }else{
          cc.loader.loadRes('sounds/' + soundName, cc.AudioClip, this.loadAudio.bind(null, soundName, repeat, volume))
        }
    },

    playSoundEffect: function (soundName) {
        if(this.soundExist(soundName)) {
            var sound = LocalStorage.getItemSound(soundName);
            cc.audioEngine.playEffect(sound);
        }else{
            cc.loader.loadRes('sounds/' + soundName, cc.AudioClip, this.loadSoundEffect.bind(null, soundName))
        }
    },

    loadSoundEffect: function(soundName, error, audio){
        if(error) return;
        var sound = {};
        sound.name = soundName;
        sound.value = audio;
        LocalStorage.setItemSound(sound);
        cc.audioEngine.playEffect(audio);
    },

    loadAudio: function(soundName, repeat, volume, error, audio){
      if(error) return;
      var sound = {};
      sound.name = soundName;
      sound.value = audio;
      LocalStorage.setItemSound(sound);
      cc.audioEngine.play(audio, repeat, volume);
    },

    soundExist: function (soundName) {
        if(LocalStorage.getItemSound(soundName) !== null)
            return true;

        return false;
    }
});
