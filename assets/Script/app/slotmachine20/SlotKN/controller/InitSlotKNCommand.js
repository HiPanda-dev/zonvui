var BaseCommand = require('BaseCommand');
var SlotMessage = require('SlotMessage');
var LobbyMessage = require('LobbyMessage');
var SoundGameMessage = require('SoundGameMessage');

export default class InitSlotKNCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    this.sendNotification(SlotMessage.ON_INIT_GAME_KEO_NGOT);
    this.sendNotification(SlotMessage.SHOW_MINIGAME_KEO_NGOT);
    this.sendNotification(LobbyMessage.STOP_BACKGROUND_MUSIC);
    this.sendNotification(LobbyMessage.PLAY_BACKGROUND_MUSIC, {soundName: SoundGameMessage.BG_LUCKY_CAFE_SOUND, volume: 0.2});

  }
}
