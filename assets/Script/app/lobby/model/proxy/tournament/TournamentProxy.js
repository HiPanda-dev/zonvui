var BaseProxy = require("BaseProxy");
var TournamentVO = require('TournamentVO');
var LobbyMessage = require('LobbyMessage');

export default class TournamentProxy extends BaseProxy {
    static get NAME() {
      return 'TournamentProxy';
    }

    onRegister() {
      this.vo = new TournamentVO();
      this.curTourModuleId = -1;
      this.curTourId = [];
      this.curTournament = null;
      this.inTournament = [];
      setInterval(this.timeTick.bind(this), 1000);
    }

    setListTournament(data) {
      this.vo.setListTournament(data);
      this.curTournament = this.getCurTournament();
    }

    setCurTourModuleId(moduleId) {
      this.curTourModuleId = moduleId;
    }

    setCurTourId(moduleId, tourId) {
      this.curTourId[moduleId] = tourId;
    }

    getCurTournament() {
      return this.vo.getCurTournament();
    }

    getListTournament() {
        return this.vo.getListTournament();
    }

    resetCurTourId() {
        this.vo.curTourId = null;
    }

    timeTick() {
      if(this.curTournament === undefined || this.curTournament === null) return;
      var listTimeTour = [];
      for (var key in this.curTournament){
        var o = this.curTournament[key];
        o.countDown = (o.countDown > 0) ? o.countDown - 1: 0;
        listTimeTour[key] = o.countDown;
      }

      this.sendNotification(LobbyMessage.ON_UPDATE_TIMER_COUNTDOWN_TOURNAMENT, listTimeTour);
    }
}
