var SeatVO = require('SeatVO');
var PlayerTableTLMN = require('PlayerTableTLMN');
var PlayerTableSam = cc.Class({
    extends: PlayerTableTLMN,

    initComponent: function (componentId, container) {
        PlayerTableTLMN.prototype.initComponent.call(this, componentId, container);
    },

    applyLayout: function () {
        PlayerTableTLMN.prototype.applyLayout.call(this);

        var mcStatus = this.container.getChildByName("mcStatus");
        this.mcBaoSam = mcStatus.getChildByName("mcBaoSam");
        this.mcHuyBaoSam = mcStatus.getChildByName("mcHuyBaoSam");
    },

    initialize: function () {
        PlayerTableTLMN.prototype.initialize.call(this);
        this.hideAllMovie(false);
        this.isFirstTurn = true;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////override////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    startGame: function () {
        PlayerTableTLMN.prototype.startGame.call(this);
        this.sam = 0;
        this.isFirstTurn = true;
        this.mcBaoSam.active = false;
        this.mcHuyBaoSam.active = false;
    },

    dealCards: function () {
        if (!this.tableVO.isWhiteWin) {
            this.onStartTimer(this.tableVO.TIME_BAO_SAM);
        }
    },

    baoSam: function (seatId, sam) {
        if (this.seatId === seatId) {
            this.sam = sam;
            this.mcBaoSam.active = (sam === 1) ? true : false;
            this.mcHuyBaoSam.active = (sam === -1) ? true : false;
        }
    },

    updateCurrentTurn: function () {
        PlayerTableTLMN.prototype.updateCurrentTurn.call(this);
        this.mcHuyBaoSam.active = false;
        if (this.tableVO.seatIdBaoSam !== -1) {
            if (this.tableVO.seatIdBaoSam === this.seatId) this.mcBaoSam.active = true;
            else this.mcBaoSam.active = false;
            this.isFirstTurn = false;
        } else if (this.isFirstTurn || this.tableVO.gameState === SeatVO.SAM) {
            this.isFirstTurn = false;
            var curSeat = this.tableVO.getSeatByUserId(this.tableVO.curTurn);
            if (curSeat && this.seatId === curSeat.id) {
                if( this.sam === 1) this.mcBaoSam.active = true;
            }
            else this.mcBaoSam.active = false;
        }
    },
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //override
    hideAllMovie: function () {
        PlayerTableTLMN.prototype.hideAllMovie.call(this);
        this.mcBaoSam.active = false;
        this.mcHuyBaoSam.active = false;
    }
});

PlayerTableSam.create = function (componentId, container) {
    var component = new PlayerTableSam();
    component.initComponent(componentId, container);
    return component;
};

module.exports = PlayerTableSam;