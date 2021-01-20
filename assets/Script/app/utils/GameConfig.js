var GameConfig = cc.Class({
    extends: cc.Component,

    properties: {
        socketIp: "wss://app.domainlinhtinh.com:5859/ws",
        socketPort: "8001",
        webService: "http://apidev.royalclub.bet/",
        version: "2.2.0",
        timeShowResult: 2,
        pingTimer: 12,

        facebookAppId: "",
        accountKitState: '',
        linkGooglePlay: "",
        linkAppStore: "",
        linkWeb: "",

        tlmnScene: "",
        samScene: "",
        binhScene: "",
        liengScene: "",
        xitoScene: "",
        phomScene: "",
        xocDiaScene: "",
        pokerScene: "",
        bacayScene: ""


    },

    statics: {
        VERSION: "",

        SOCKET_IP: "wss://app.domainlinhtinh.com:5859/ws",
        SOCKET_PORT: "",

        WEB_SERVICE: "",
        WEB_RESOURCE: "",

        POLICY:"",

        HOT_LINE:"",
        SOCKET:null,

        IS_TEST: true,
        IS_SEND_CARD: true,
        IS_DEBUG: true,
        IS_IPVN: false,

        PING_TIMER: 0,
        REFESH_CHANNEL_TIMMER: 2,

        FACEBOOK_APP_ID: "308567869849125",
        ACCOUNTKIT_STATE: "f1e65274f01d4666c54d6916df1edb7f",
        LINK_GOOGLE_PLAY: "",
        LINK_APP_STORE: "",
        LINK_WEB: '',

        MODULE_ID_LOBBY:1,
        MODULE_ID_STATICSIC:889,
        MODULE_ID_TAI_XIU:100,
        MODULE_ID_THIEN_HA:103,
        MODULE_ID_MINIPOKER:102,
        MODULE_ID_LUCKY_CAFE:200,
        MODULE_ID_KEO_NGOT:201,


        TLMN_SCENE: "",
        SAM_SCENE: "",
        BINH_SCENE: "",
        LIENG_SCENE: "",
        XITO_SCENE: "",
        PHOM_SCENE: "",
        XOCDIA_SCENE: "",
        POKER_SCENE: "",
        BACAY_SCENE: "",

        CURRENT_SCENE: "",
        CURRENT_MODE:"",
        DISPLAY_NAME: "default",
        STATUS_EN_DE: 0,

    },

    // use this for initialization
    onLoad: function () {

        GameConfig.VERSION = this.version;
        GameConfig.PING_TIMER = this.pingTimer;

        // GameConfig.FACEBOOK_APP_ID = this.facebookAppId;
        // GameConfig.ACCOUNTKIT_STATE = this.accountKitState;
        GameConfig.LINK_GOOGLE_PLAY = this.linkGooglePlay;
        GameConfig.LINK_APP_STORE = this.linkAppStore;
        GameConfig.LINK_WEB = this.linkWeb;

        GameConfig.TLMN_SCENE = this.tlmnScene;
        GameConfig.SAM_SCENE = this.samScene;
        GameConfig.BINH_SCENE = this.binhScene;
        GameConfig.LIENG_SCENE = this.liengScene;
        GameConfig.XITO_SCENE = this.xitoScene;
        GameConfig.PHOM_SCENE = this.phomScene;
        GameConfig.XOCDIA_SCENE = this.xocDiaScene;
        GameConfig.POKER_SCENE = this.pokerScene;
        GameConfig.BACAY_SCENE = this.bacayScene;

        if (GameConfig.IS_TEST) {
            GameConfig.SOCKET_IP = this.socketIp;
            GameConfig.SOCKET_PORT = this.socketPort;
            GameConfig.WEB_SERVICE = this.webService;
        }
    }
});
