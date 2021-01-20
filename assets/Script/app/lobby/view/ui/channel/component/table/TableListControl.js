var GameConfig = require('GameConfig');
var Utility = require('Utility');
cc.Class({
    extends: cc.Component,

    properties: {
        numItemInPage:9,
        pageView:cc.Node,
        mcTable: cc.Node,
        pageViewControl: cc.PageView,
    },

    // use this for initialization
    onLoad: function () {
        this.pageViewControl.removeAllPages();
        this.pageCount = 0;
        this.channelNode = null;
        this.isDrag = false;
        this.sortBet = 0;
    },

    sortPlayerData: function (data) {
        var list1 = [];
        var list2 = [];
        for (var i = 0; i < data.length; i++) {
            if (this.sortBet !== 0 && this.sortBet !== data[i].roomBet) continue;
            if (data[i].userCount < data[i].maxUsers) {
                list1.push(data[i]);
            } else {
                list2.push(data[i]);
            }
        }

        list1.sort(function (a, b) {
            return a.userCount - b.userCount;
        });

        list2.sort(function (a, b) {
            return a.userCount - b.userCount;
        });

        return list1.concat(list2);

    },

    sortListTableByBet: function (bet) {
        this.sortBet = parseInt(bet);
        this.updatePageView();
    },

    setupTableData: function (data, channelNode) {
        if (this.pageViewControl._touchMoved) return;
        this.data = data;
        this.channelNode = channelNode;
        this.updatePageView();
    },

    updatePageView: function () {
        if (!this.data) return;
        var curPageIndex = this.pageViewControl.getCurrentPageIndex();
        var data = this.sortPlayerData(this.data);
        this.pageViewControl.removeAllPages();
        this.pageCount = 0;
        if (!data || data.length === 0) return;

        for (var i = 0; i < data.length; i += this.numItemInPage) {
            var dataInPage = [];
            for (var j = 0; j < this.numItemInPage; j++) {
                if (j + i >= data.length) break;
                dataInPage.push(data[j + i]);
            }
            var page = this.createPage(dataInPage);
            this.pageViewControl.addPage(page);
            this.pageCount++;
        }

        curPageIndex = (curPageIndex < this.pageViewControl.getPages().length) ? curPageIndex : this.pageViewControl.getPages().length - 1;
        this.pageViewControl.scrollToPage(curPageIndex, 0);
    },

    createPage: function (pageData) {
        var page =cc.instantiate(this.pageView);
        page.removeAllChildren();
        for (var i = 0; i < pageData.length; i++) {
            var tableNode = cc.instantiate(this.mcTable);
            var tableControl = tableNode.getComponent("TableControl");
            if (tableControl) {
                tableControl.txtNum.string = pageData[i].userCount + "/" + pageData[i].maxUsers;
                tableControl.txtBet.string = Utility.formatCurrency(parseInt(pageData[i].roomBet));
                tableControl.data = pageData[i];
                tableControl.id = pageData[i].id;
            }
            page.addChild(tableNode);
            this.checkState(tableNode, pageData[i].userCount, pageData[i].maxUsers);
            this.addHanlerEventTableNode(tableNode);
        }
        return page;
    },

    checkState: function (tableNode, userCount, maxUsers) {
        var tableChip = tableNode.getChildByName('state').getChildByName('bg_table_chip');
        var tableChipFull = tableNode.getChildByName('state').getChildByName('bg_table_chip_full');
        var tableMoney = tableNode.getChildByName('state').getChildByName('bg_table_money');
        var tableMoneyFull = tableNode.getChildByName('state').getChildByName('bg_table_money_full');

        tableChip.active = false;
        tableChipFull.active = false;
        tableMoney.active = false;
        tableMoneyFull.active = false;

        if (GameConfig.CURRENT_MODE === "MONEY") {
            if (userCount === maxUsers) tableMoneyFull.active = true;
            else tableMoney.active = true;
        } else {
            if (userCount === maxUsers) tableChipFull.active = true;
            else tableChip.active = true;
        }
    },

    addHanlerEventTableNode: function (tableNode) {
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = this.channelNode;
        eventHandler.component = "ChannelScene";
        eventHandler.handler = "onHanlerJoinGame";

        var button = tableNode.getComponent(cc.Button);
        button.clickEvents.push(eventHandler);
    },

    createFakeData: function () {
        var a = [];
        for (var i = 0; i < 100; i++) {
            var o = {
                name: "123"
            };
            a.push(o)
        }
        return a;
    },

    onHanlerNextPage: function () {
        var curIndex = this.pageViewControl.getCurrentPageIndex();
        if (curIndex < this.pageCount) {
            this.pageViewControl.scrollToPage(curIndex + 1);
        }
    },

    onHanlerPrevPage: function () {
        var curIndex = this.pageViewControl.getCurrentPageIndex();
        if (curIndex > 0) {
            this.pageViewControl.scrollToPage(curIndex - 1);
        }
    }
});
