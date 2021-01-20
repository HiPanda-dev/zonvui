var BaseCommand = require('BaseCommand');
var SlotMessage = require('SlotMessage');
var LobbyMessage = require('LobbyMessage');
var SoundGameMessage = require('SoundGameMessage');

export default class InitSlotLCCommand extends BaseCommand {
  execute(notification) {
    BaseCommand.prototype.execute.call(this, notification);
    this.sendNotification(SlotMessage.ON_INIT_GAME_LUCKY_CAFE);
    this.sendNotification(SlotMessage.SHOW_MINIGAME_LUCKY_CAFE);
    this.sendNotification(LobbyMessage.STOP_BACKGROUND_MUSIC);
  }
}
