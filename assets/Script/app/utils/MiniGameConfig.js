var MiniGameConfig = cc.Class({
    extends: cc.Component,

    properties: {
        zoneBauCua:"",
        zoneMiniPoker:"",
        zonePokeGo:"",
        zoneTaiXiu:"taixiu_32",
        zoneToNho:"",
        zoneVongQuay:"",
        zoneSlotmachineTamQuoc:"",
    },

    statics: {
        ZONE_BAU_CUA:"",
        ZONE_MINIPOKER:"",
        ZONE_POKEGO:"",
        ZONE_TAIXIU:"",
        ZONE_TO_NHO:"",
        ZONE_VONG_QUAY:"",
        ZONE_SLOTMACHINE_TAMQUOC:""
    },

    // use this for initialization
    onLoad: function () {
        MiniGameConfig.ZONE_BAU_CUA = this.zoneBauCua;
        MiniGameConfig.ZONE_MINIPOKER = this.zoneMiniPoker;
        MiniGameConfig.ZONE_POKEGO = this.zonePokeGo;
        MiniGameConfig.ZONE_TAIXIU = this.zoneTaiXiu;
        MiniGameConfig.ZONE_TO_NHO = this.zoneToNho;
        MiniGameConfig.ZONE_VONG_QUAY = this.zoneVongQuay;
        MiniGameConfig.ZONE_SLOTMACHINE_TAMQUOC = this.zoneSlotmachineTamQuoc;
    }
});
