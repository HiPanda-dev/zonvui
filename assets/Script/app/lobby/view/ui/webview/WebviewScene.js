var BasePopup = require('BasePopup');
var WebviewSceneMediator = require('WebviewSceneMediator');

cc.Class({
    extends: BasePopup,

    properties: {
        webView:cc.WebView,
        txtTitle:cc.Label
    },

    // use this for initialization
    onLoad: function () {
        WebviewSceneMediator.getInstance().init(this);
        this.hide();
    },

    show:function (url, title) {
        BasePopup.prototype.show.call(this);
        this.webView.url = url;
        this.txtTitle.string = (title)?title:"";
        window.document.addEventListener("testWebview", this.callback.bind(this));
    },

    callback:function () {
    }
});
