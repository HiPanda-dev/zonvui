var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');

class HistoryTranferSceneMediator extends BaseMediator {
    static get NAME() {
        return 'HistoryTranferSceneMediator';
    }

    static get getInstance() {
        if(this.instance === undefined){
            this.instance = new HistoryTranferSceneMediator();
        }
        return this.instance;
    }

    onRegister() {
        puremvc.Mediator.call(this, this.constructor.NAME);
        // this.userProxy = this.facade.retrieveProxy('UserProxy');
    }
    /** @override */
    listNotificationInterests() {
        return [
            LobbyMessage.SHOW_HISTORY_TRANFER_SCENE,
            LobbyMessage.HIDE_HISTORY_TRANFER_SCENE,
            LobbyMessage.ON_UPDATE_HISTORY_CASH_IN,
            LobbyMessage.ON_UPDATE_HISTORY_CASH_OUT,
            LobbyMessage.ON_UPDATE_HISTORY_TRANFER,

        ]
    }

    /** @override */
    handleNotification(notification) {
        BaseMediator.prototype.handleNotification.call(this);
        var data = notification.getBody();
        // this.mySelf = this.facade.retrieveProxy('UserProxy').mySelf;
        switch (notification.getName()) {
            case LobbyMessage.SHOW_HISTORY_TRANFER_SCENE:
                this.view.show();
                this.sendNotification(LobbyMessage.SEND_GET_HISTORY_CASH_IN);
                this.sendNotification(LobbyMessage.SEND_GET_HISTORY_CASH_OUT);
                this.sendNotification(LobbyMessage.SEND_GET_HISTORY_TRANFER);
                break;
            case LobbyMessage.HIDE_HISTORY_TRANFER_SCENE:
                this.view.hide();
                break;
            case LobbyMessage.ON_UPDATE_HISTORY_CASH_IN:
                this.view.onUpdateHistoryCashIn(data);
                break;

            case LobbyMessage.ON_UPDATE_HISTORY_CASH_OUT:
                this.view.onUpdateHistoryCashOut(data);
                break;
            case LobbyMessage.ON_UPDATE_HISTORY_TRANFER:
                this.view.onUpdateHistoryTranfer(data);
                break;

            default:
                break;
        }
    }

    addHanlers() {
        BaseMediator.prototype.addHanlers.call(this);
        this.view.activeSendGetHisCashIn = this.activeSendGetHisCashIn.bind(this);
        this.view.activeSendGetHisCashOut = this.activeSendGetHisCashOut.bind(this);
        this.view.activeSendGetHisTranfer = this.activeSendGetHisTranfer.bind(this);
        this.view.activeCashInCard = this.activeCashInCard.bind(this);
    }


    activeSendGetHisCashIn(params) {
        this.sendNotification(LobbyMessage.SEND_GET_HISTORY_CASH_IN, params);
    }

    activeSendGetHisCashOut(params) {
        this.sendNotification(LobbyMessage.SEND_GET_HISTORY_CASH_OUT, params);
    }

    activeSendGetHisTranfer(params) {
        this.sendNotification(LobbyMessage.SEND_GET_HISTORY_TRANFER, params);
    }

    activeCashInCard(params) {
        this.sendNotification(LobbyMessage.SEND_MOBILE_CARD_RECHARGE, params);
    }
}

module.exports = HistoryTranferSceneMediator;
