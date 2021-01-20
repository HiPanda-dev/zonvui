var i18n = require('i18n');
cc.Class({
    extends: cc.EditBox,

    properties: {
      textKey:'',
      verticalAlign: {
        "default": cc.macro.VerticalTextAlignment.CENTER,
        type: cc.macro.VerticalTextAlignment
      }
    },

    onLoad() {
      this.placeholder = i18n.t(this.textKey);
      this.node.getChildByName('PLACEHOLDER_LABEL').getComponent(cc.Label).verticalAlign = this.verticalAlign;
      this.node.getChildByName('TEXT_LABEL').getComponent(cc.Label).verticalAlign = this.verticalAlign;
    }
});
