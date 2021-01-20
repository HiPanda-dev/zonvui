var BaseVO = require("BaseVO");

export default class TournamentVO extends BaseVO{
    onRegister() {
      this.listTournament = [];
      this.curTourId = null;
      this.tempId = null;
    }

    setListTournament(data) {
      this.listTournament = [];
      for(var i = 0; i< data.length; i++) {
        var o = data[i];
        if(this.listTournament[o.i] === undefined) this.listTournament[o.i] = [];
        if(o.cd >= 0) {
            this.listTournament[o.i].push({
                moduleId: o.i,
                tourId: o.id,
                countDown: o.cd,
                fromTime: o.f,
                toTime: o.t,
                status: o.s
            });
        }
      }
    }

    getCurTournament() {
      var curList = [];
      for (var key in this.listTournament){
        var list = this.listTournament[key];
        var o = null;
        for(var i = 0; i<list.length; i++) {
          if(o === null) o = list[i];
          else if(o.countDown >= 0 && o.countDown > list[i].countDown) o = list[i];
        }
        if(o !== null)
            curList[key] = o;
      }

      return curList;
    }

    getListTournament() {
      return this.listTournament;
    }
}
