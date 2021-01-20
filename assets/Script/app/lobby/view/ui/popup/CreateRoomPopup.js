var BasePopup = require('BasePopup');
var DropListMainTemplate = require('DropListMainTemplate');
var CreateRoomPopupMediator = require('CreateRoomPopupMediator');
var Utility = require('Utility');
cc.Class({
    extends: BasePopup,

    properties: {
        betCombobox:DropListMainTemplate,
        numPlayCombobox:DropListMainTemplate
    },

    // use this for initialization
    onLoad: function () {
        CreateRoomPopupMediator.getInstance().init(this);
        this.betCombobox.oldIndex = this.betCombobox.node.zIndex;
        this.numPlayCombobox.oldIndex = this.betCombobox.node.zIndex;
        this.hide();
    },

    initBetCombobox:function (arrData) {
        var array = [];
        for(var i=0;i<arrData.length;i++){
            var data = {
                "name": Utility.formatCurrency(arrData[i]),
                "value": arrData[i]
            };
            array.push(data);
        }
        this.betCombobox.setupData(array);
    },

    initNumPlayCombobox:function (arrData) {
        var array = [];
        for(var i=0;i<arrData.length;i++){
            var data = {
                "name": arrData[i] + " người",
                "value": arrData[i]
            };
            array.push(data);
        }
        this.numPlayCombobox.setupData(array);
    },

    handlerEventCreateRoom: function () {
        var params = {};
        params.roomName = "";
        params.roomBet = parseInt(this.betCombobox.getItemSelect().value);
        params.maxPlayer = parseInt(this.numPlayCombobox.getItemSelect().value);
        params.password = "";
        this.activeCreateRoom(params)
    },

    handlerSetdropListBetToTop:function () {
        this.betCombobox.node.setSiblingIndex(this.node.children.length-1);
        this.betCombobox.node.zIndex = this.node.children.length - 1;

        this.numPlayCombobox.node.setSiblingIndex(this.numPlayCombobox.oldIndex);
        this.numPlayCombobox.node.zIndex = this.numPlayCombobox.oldIndex;

    },

    handlerSetdropListPlayerToTop:function () {
        this.numPlayCombobox.node.setSiblingIndex(this.node.children.length-1);
        this.numPlayCombobox.node.zIndex = this.node.children.length - 1;

        this.betCombobox.node.setSiblingIndex(this.betCombobox.oldIndex);
        this.betCombobox.node.zIndex = this.betCombobox.oldIndex;

    },

    hanlerEventClose:function () {
        this.hide();
    }
});

