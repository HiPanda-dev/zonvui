
var Utility = require('Utility');

module.exports = cc.Class({
    extends: cc.Label,

    properties: {
        preValue: 0,
        goalValue: 0,
        curValue: 0,
        isFirst: true
    },

    // use this for initialization
    setValue: function (curValue) {
        this.string = "" + curValue;
        this.preValue = curValue;
        this.curValue = curValue;
        this.goalValue = curValue;
        this.isFirst = false;
    },

    runToValue: function(value, time){
        this.goalValue = value;
        this.breakValue = 0;

        var nBuoc = 2*time;

        if(this.isFirst){
            this.setValue(value);
        }
        else{
            //this.setValue(this.preValue);

            this.breakValue = parseInt((value - this.curValue) / nBuoc) + 1;

            var breakValue = 0;

            if(Math.abs(this.goalValue - this.curValue) == 0){
                breakValue = 0;
            }
            else if(Math.abs(this.goalValue - this.curValue) <= nBuoc && Math.abs(this.goalValue - this.curValue)>0)
            {
                breakValue = 1;
            }
            else {
                breakValue = parseInt((this.goalValue - this.curValue) / nBuoc) + 1;
            }

            this.runValue();
        }
    },

    runValue: function(){
        if(Math.abs(this.goalValue - this.curValue) < Math.abs(this.breakValue) || this.breakValue == 0){
            this.curValue = this.goalValue;
            this.preValue = this.curValue;
            this.setValue(this.goalValue);
        }
        else{
            this.curValue = this.curValue + this.breakValue;
            this.string = "" + Utility.formatCurrency(this.curValue);


            this.scheduleOne(cc.callFunc(function(){
                this.runValue()
            }.bind(this), 0.1));
        }
    }

});
