var ExtensionConfig = cc.Class({
    extends: cc.Component,

    properties: {
        tlmn:"tlmn",
        tlmnExtension:"com.dtime.tlmn.game.TLMNExtension",
        tlmnSolo:"tlmn",
        tlmnSoloExtension:"com.dtime.tlmnsolo.game.TLMNExtension",
        sam:"sam",
        samExtension:"com.dtime.sam.game.SamExtension",
        samSolo:"sam",
        samSoloExtension:"com.dtime.samsolo.game.SamExtension",
        phom:"phom",
        phomExtension:"com.dtime.phom.game.PhomExtension",
        binh:"maubinh",
        binhExtension:"com.dtime.maubinh.game.MauBinhExtension",
        baCay:"bacay",
        baCayExtension:"com.dtime.bacay.game.BaCayExtension",
        xocDia:"xocdia",
        xocDiaExtension:"com.dtime.xocdia.game.SocDiaExtension",
        poker:"poker",
        pokerExtension:"com.dtime.poker.game.PokerExtension",
        xito:"xito",
        xitoExtension:"com.dtime.xito.game.XiToExtension",
        lieng:"lieng",
        liengExtension:"com.dtime.lieng.game.LiengExtension"

    },

    statics: {
        TLMN:"",
        TLMN_EXTENSION:"",
        TLMN_SOLO:"",
        TLMN_SOLO_EXTENSION:"",
        SAM:"",
        SAM_EXTENSION:"",
        SAM_SOLO:"",
        SAM_SOLO_EXTENSION:"",
        PHOM:"",
        PHOM_EXTENSION:"",
        BINH:"",
        BINH_EXTENSION:"",
        BA_CAY:"",
        BA_CAY_EXTENSION:"",
        XOC_DIA:"",
        XOC_DIA_EXTENSION:"",
        POKER:"",
        POKER_EXTENSION:"",
        XI_TO:"",
        XI_TO_EXTENSION:"",
        LIENG:"",
        LIENG_EXTENSION:""
    },

    // use this for initialization
    onLoad: function () {
        ExtensionConfig.TLMN = this.tlmn;
        ExtensionConfig.TLMN_EXTENSION = this.tlmnExtension;
        ExtensionConfig.TLMN_SOLO = this.tlmnSolo;
        ExtensionConfig.TLMN_SOLO_EXTENSION = this.tlmnSoloExtension;
        ExtensionConfig.SAM = this.sam;
        ExtensionConfig.SAM_EXTENSION = this.samExtension;
        ExtensionConfig.SAM_SOLO = this.samSolo;
        ExtensionConfig.SAM_SOLO_EXTENSION = this.samSoloExtension;
        ExtensionConfig.PHOM = this.phom;
        ExtensionConfig.PHOM_EXTENSION = this.phomExtension;
        ExtensionConfig.BINH = this.binh;
        ExtensionConfig.BINH_EXTENSION = this.binhExtension;
        ExtensionConfig.BA_CAY = this.baCay;
        ExtensionConfig.BA_CAY_EXTENSION = this.baCayExtension;
        ExtensionConfig.XOC_DIA = this.xocDia;
        ExtensionConfig.XOC_DIA_EXTENSION = this.xocDiaExtension;
        ExtensionConfig.XI_TO = this.xito;
        ExtensionConfig.XI_TO_EXTENSION = this.xitoExtension;
        ExtensionConfig.POKER = this.poker;
        ExtensionConfig.POKER_EXTENSION = this.pokerExtension;
        ExtensionConfig.LIENG = this.lieng;
        ExtensionConfig.LIENG_EXTENSION = this.liengExtension;
    }
});

module.extends = ExtensionConfig;