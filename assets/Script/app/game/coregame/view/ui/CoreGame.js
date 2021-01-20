var BaseScene = require('BaseScene');
var CompositeNode = require('CompositeNode');
var Composite = require('Composite');
var Invite = require('Invite');
var TopGameMenu = require('TopGameMenu');
var CountDownPanel = require('CountDownPanel');
var GameEvent = require('GameEvent');
var GameConfig = require('GameConfig');
var BubbleChat = require('BubbleChat');

cc.Class({
    extends: BaseScene,

    properties: {
        // bubbleChat: cc.Node
    },

    ctor: function () {
        this.tableVO/*TableVO*/ = null;
        this.rootGame/*Composite*/ = null;
        this.playerMgr = null;
        this.inviteMgr = null;
        this.mcCountDown = null;
        this.gameAtlas = null;

    },

    // use this for initialization
    onLoad: function () {
        if(this.onLoadGameDone){
            this.onLoadGameDone();
        }
    },

    show:function () {
        this.node.x = this.rootX;
        BaseScene.prototype.show.call(this);
    },

    hide:function () {
        this.node.x = this.node.width * 4;
        BaseScene.prototype.hide.call(this);
    },

    buildUI: function () {
        this.rootX = this.node.x;

        this.component = this.node.getChildByName("component");
        this.rootGame = new Composite.create(CompositeNode.ROOT_NODE);
        this.playerMgr = new Composite.create(CompositeNode.PLAYER_MANAGER_NODE);
        this.inviteMgr = new Composite.create(CompositeNode.INVITE_MANAGER_NODE);
        this.mcCountDown = new CountDownPanel.create(CompositeNode.COUNT_DOWN_NODE);
        this.mcTopGameMenu = new TopGameMenu.create(CompositeNode.TOP_GAME_MENU_NODE);
        this.bubbleChatMgr = new Composite.create(CompositeNode.BUBBLE_CHAT_MANAGER_NODE);

        this.rootGame.add(this.playerMgr);
        this.rootGame.add(this.inviteMgr);
        this.rootGame.add(this.mcCountDown);
        this.rootGame.add(this.mcTopGameMenu);
        this.rootGame.add(this.bubbleChatMgr);

    },

    setup: function () {
        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            var seat = this.tableVO.getSeatBySeatId(i);
            if (seat === undefined) continue;

            var invite = new Invite.create(CompositeNode.INVITE_NODE + "_" + i);
            invite.setup(seat.id, this.tableVO);
            this.inviteMgr.add(invite);

            var bubbleChat = new BubbleChat.create(CompositeNode.BUBBLE_CHAT_NODE + "_" + i);
            bubbleChat.setup(seat.id, this.tableVO);
            this.bubbleChatMgr.add(bubbleChat);
        }
    },

    applyLayout: function () {
        var ctnPlayer = this.component.getChildByName("ctnPlayer");
        var ctnInvite = this.component.getChildByName("ctnInvite");
        var ctnBubbleChat = this.component.getChildByName("ctnbubbleChat");
        var btnShowFakeCards = this.component.getChildByName("btnShowFakeCards");
        btnShowFakeCards.active = GameConfig.IS_SEND_CARD

        this.tableVO.listPlayerPos = [];
        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            this.playerMgr.getChild(CompositeNode.PLAYER_NODE + "_" + i).container = ctnPlayer.getChildByName("player" + i);
            this.inviteMgr.getChild(CompositeNode.INVITE_NODE + "_" + i).container = ctnInvite.getChildByName("btnInvite" + i);
            this.bubbleChatMgr.getChild(CompositeNode.BUBBLE_CHAT_NODE + "_" + i).container = ctnBubbleChat.getChildByName("player" + i);

            var containerPlayer = this.playerMgr.getChild(CompositeNode.PLAYER_NODE + "_" + i).container;
            this.tableVO.listPlayerPos[i] = new cc.Vec2(containerPlayer.x, containerPlayer.y);
        }

        this.mcCountDown.container = this.component.getChildByName("mcCountDown");
        this.mcTopGameMenu.container = this.component.getChildByName("ctnTopMenu");

        this.mcCountDown.tableVO = this.tableVO;
        this.mcTopGameMenu.tableVO = this.tableVO;

        this.rootGame.applyLayout();
    },

    initialize: function () {
        this.rootGame.initialize();
    },

    addEventListeners: function () {
        this.rootGame.addEventListeners();

        for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
            var node = this.playerMgr.getChild(CompositeNode.PLAYER_NODE + "_" + i).container;
            node.on(GameEvent.FINISH_TURN, this.onFinishCoundownTime, this);
        }
    },

   removeEventListeners:function () {
       this.rootGame.removeEventListeners();

       for (var i = 1; i <= this.tableVO.TOTAL_PLAYER; i++) {
           var node = this.playerMgr.getChild(CompositeNode.PLAYER_NODE + "_" + i).container;
           node.off(GameEvent.FINISH_TURN, this.onFinishCoundownTime, this);
       }
   },

    onChatBtnClick: function (event) {
        var chatType = 0;
        if(event.target.name === "btnChatEmoticon")
            chatType = 1;
        this.activeShowChat(chatType);
    },

    //==================================================================================================================
    //===========================OVERRIDE===============================================================================
    //==================================================================================================================

    onUpdateOwner: function () {
        this.rootGame.updateOwner();
    },

    onSitdown: function (seatId, user) {
        this.rootGame.sitdown(seatId, user);
    },

    onStandup: function (seatId) {
        this.rootGame.standup(seatId);
    },

    onUpdateUserInfo: function (seatId, user) {
        this.rootGame.updateUserInfo(seatId, user);
    },

    onUpdateMoney:function (seatId, addMoney) {
        this.rootGame.updateMoney(seatId, addMoney);
    },

    onStartGame:function () {
        this.rootGame.startGame();
    },

    onDealCards:function () {
        this.rootGame.dealCards();
    },

    onDealRandomCard:function () {
        this.rootGame.dealRandomCard();
    },

    /**
     * mình rời khỏi bàn
     */
    onLeaveGame: function () {
        this.rootGame.leaveGame();
        this.hide();
    },

    /**
     * thằng khác rời khỏi bàn
     */
    onUserExitGame: function (seatId) {
        this.rootGame.userExitGame(seatId);
    },

    onCountDownStartGame: function (timeLeft) {
        this.rootGame.countDownStartGame(timeLeft);
    },

    onUpdateCurrentTurn:function () {
        this.rootGame.updateCurrentTurn();
    },

    onShowCards:function (seatId, cards) {
        this.rootGame.showCards(seatId, cards);
    },

    onFinishCoundownTime:function () {
        this.rootGame.finishCoundownTime();
    },

    onDestroyGame:function () {
        this.removeEventListeners();
        this.rootGame.removeEventListeners();
        this.rootGame.destroy();
        this.rootGame.clean();
        this.destroy();
    },

    onShowBuyMasterGame:function () {
        this.rootGame.showBuyMasterGame();
    },

    onUpdateGameState: function () {
        this.rootGame.updateGameState();
    },

    onHideReadyGame: function () {
        this.rootGame.hideReadyGame();
    },

    onUpdateUserViewState:function () {
        this.rootGame.updateUserViewState();
    },

    onShowChatGameContent: function (seatId, chatContent, chatType) {
        this.rootGame.showChatContent(seatId, chatContent, chatType);
    },

    onUpdateMyInfo:function (mySelf) {
        var seat = this.tableVO.getSeatByUserId(mySelf.uid);
        if(seat && seat.user){
            this.rootGame.updateUserInfo(seat.id, seat.user);
        }

    },

    onRegisterQuit:function (seatId, isQuit) {
        this.rootGame.registerQuit(seatId, isQuit);
    },

    //==================================================================================================================
    //==================================================================================================================
    //==================================================================================================================

    onHanlerBackGameClick:function (backToggle) {
        if(backToggle.notChange) {
            backToggle.notChange = false;
            return;
        }

        this.tableVO.registerLeave = backToggle.isChecked;
        this.activeBackGame();
    },

    onHanlerShowRecharge:function (backToggle) {
        this.activeShowRecharge();
    },

    onHandlerShowSetting:function(){
        this.activeShowSetting();
    }
});

