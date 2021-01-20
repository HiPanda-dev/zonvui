var BaseMediator = require('BaseMediator');
var LobbyMessage = require('LobbyMessage');
var GameConfig = require('GameConfig');
var Constants = require('Constants');

class ListTournamentSceneMediator extends BaseMediator {
    static get NAME() {
        return 'ListTournamentSceneMediator';
    }

    static get getInstance() {
        if(this.instance === undefined){
            this.instance = new ListTournamentSceneMediator();
        }
        return this.instance;
    }

    onRegister() {
        puremvc.Mediator.call(this, this.constructor.NAME);
    }
    /** @override */
    listNotificationInterests() {
        return [
            LobbyMessage.SHOW_LIST_TOURNAMENT_SCENE,
            LobbyMessage.HIDE_LIST_TOURNAMENT_SCENE,
            // LobbyMessage.ON_UPDATE_INFO_TOURNAMENT,
            // LobbyMessage.ON_UPDATE_TOP_TOURNAMENT,
        ]
    }

    /** @override */
    handleNotification(notification) {
        BaseMediator.prototype.handleNotification.call(this);

        var params = notification.getBody();
        switch (notification.getName()) {
            case LobbyMessage.SHOW_LIST_TOURNAMENT_SCENE:
                this.tour = this.facade.retrieveProxy('TournamentProxy').vo.getListTournament();
                this.view.show();
                this.view.showDataTour(params, this.tour);
                break;
            case LobbyMessage.HIDE_LIST_TOURNAMENT_SCENE:
                this.view.hide();
                break;
            // case LobbyMessage.ON_UPDATE_INFO_TOURNAMENT:
            //     this.view.setData(params);
            //     break;
            // case LobbyMessage.ON_UPDATE_TOP_TOURNAMENT:
            //     this.view.updateTopPlayer(params);
            //     break;
            default:
                break;
        }
    }

    addHanlers() {
        BaseMediator.prototype.addHanlers.call(this);
        this.view.showJoinTournamentScene = this.showJoinTournamentScene.bind(this);
        this.view.activeJoinGame = this.activeJoinGame.bind(this);
    }

    showJoinTournamentScene(tourId) {
        this.sendNotification(LobbyMessage.SEND_GET_INFO_TOURNAMENT, {tourId:tourId})
    }

    activeJoinGame(moduleId, tourId) {

    }
}

module.exports = ListTournamentSceneMediator;
