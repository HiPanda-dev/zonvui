var BaseProxy = require("BaseProxy");
var EventDailyVO = require("EventDailyVO");
var EventBannerItemVo  = require("EventBannerItemVO");
var EventVO  = require("EventVO");

export default class EventProxy extends BaseProxy {
    static get NAME() {
      return 'EventProxy';
    }

    onRegister() {
      this.eventList = [];
      this.eventDailyList = [];
      this.eventBannerList = [];
    }

    updateEventDaily(data){
        this.dataList = [];
        for( var i=0 ; i<data.dataList.length ; i++){
            var vo = new EventDailyVO();
            vo.update(data.dataList[i]);
            this.eventDailyList.push(vo);
        }
    }

    updateEvent(data){
        this.dataList = [];
        for( var i=0 ; i<data.dataList.length ; i++){
            var vo = new EventVO();
            vo.update(data.dataList[i]);
            this.eventList.push(vo);
        }
    }

    updateBannerList(dataList){
        this.eventBannerList = [];

        for( var i=0 ; i< dataList.length ; i++){
            var vo = new EventBannerItemVo();
            vo.update(dataList[i]);
            this.eventBannerList.push(vo);
        }
    }
}
