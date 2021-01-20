import SendGetDetailSessionTaiXiuCommand from "./SendGetDetailSessionTaiXiuCommand";

var BaseGameCommand = require('BaseGameCommand');
var MiniGameMessage = require('MiniGameMessage');

export default class SetupTaiXiuCommand extends BaseGameCommand {
  execute(notification) {
    BaseGameCommand.prototype.execute.call(this, notification);
    if(!this.gameProxy){
        this.gameProxy = this.facade.retrieveProxy('TaiXiuProxy')
    }
    //register command
    this.registerCommand(MiniGameMessage.INIT_TAI_XIU, require('InitTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.SEND_BET_TAI_XIU, require('SendBetTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.SEND_CHAT_TAI_XIU, require('SendChatTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.SEND_GET_RANK_TAI_XIU, require('SendGetRankTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.SEND_GET_HISTORY_TAI_XIU, require('SendGetHistoryTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.SEND_GET_DETAIL_SESSION_TAI_XIU, require('SendGetDetailSessionTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.SENT_GET_EVENT_TAI_XIU, require('SendGetEventTaiXiuCommand'));

    this.registerCommand(MiniGameMessage.RECEIVE_UPDATE_HISTORY_TAI_XIU, require('ReceiveUpdateHistoryTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.RECEIVE_RESULT_DICE_TAI_XIU, require('ReceiveResultDicesTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.RECEIVE_UPDATE_BOARD_BET_TAI_XIU, require('ReceiveUpdateBoardBetTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.RECEIVE_UPDATE_GAME_STATE_TAI_XIU, require('ReceiveUpdateGameStateTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.RECEIVE_REPAY_TAI_XIU, require('ReceiveRepayTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.RECEIVE_BET_TAI_XIU, require('ReceiveBetTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.RECEIVE_CHAT_TAI_XIU, require('ReceiveChatTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.RECEIVE_GET_RANK_TAI_XIU, require('ReceiveGetRankTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.RECEIVE_GET_HISTORY_TAI_XIU, require('ReceiveGetHistoryTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.RECEIVE_GET_DETAIL_SESSION_TAI_XIU, require('ReceiveGetDetailSessionTaiXiuCommand'));
    this.registerCommand(MiniGameMessage.RECEIVE_GET_EVENT_TAI_XIU, require('ReceiveGetEventTaiXiuCommand'));
    //register mediator
    this.registerMediator(require('TaiXiuSceneMediator').getInstance);
  }
}
