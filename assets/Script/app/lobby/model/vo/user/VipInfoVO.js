var BaseVO = require("BaseVO");

var puremvc = BaseVO.puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
            this.cpoint = 0;
            this.edate = 0;
            this.isLevelUp = 0;
            this.mpoint = 0;
            this.rdate = 0;
            this.vid = 0;
            this.vname = "";
        }


    },

    // INSTANCE MEMBERS
    {
        updateData: function (data) {
            this.cpoint = (data.cpoint) ? data.cpoint : this.cpoint;
            this.edate = (data.edate) ? data.edate : this.edate;
            this.isLevelUp = (data.isLevelUp) ? data.isLevelUp : this.isLevelUp;
            this.mpoint = (data.mpoint) ? data.mpoint : this.mpoint;
            this.rdate = (data.rdate) ? data.rdate : this.rdate;
            this.vid = (data.vid) ? data.vid : this.vid;
            this.vname = (data.vname) ? data.vname : this.vname;
        }
    },
    // STATIC MEMBERS
    {}
);