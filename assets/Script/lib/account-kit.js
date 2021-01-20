!function a(b, c, d, e, f) {
    d = 24 * 60 * 60;
    e = 7 * d;
    var g = "https://developers.facebook.com/docs/accountkit/integratingweb#configureloginhtml";
    g = "Please ensure the AccountKit SDK is hotlinked directly. See " + g;
    c = Math.floor(new Date().getTime() / 1e3) - c;
    // if (c > e) throw new Error("The SDK is more than 7 days old. " + g); 
    // else if (c > d) {
    //     e = window.console;
    //     e && e.warn("The SDK is more than 1 day old. " + g);
    // }
    window.AccountKit || (window.AccountKit = {
        doNotLinkToSDKDirectly: "doNotLinkToSDKDirectly"
    });
    c = document.createElement("script");
    c.src = b;
    c.async = !0;
    f && (c.crossOrigin = "anonymous");
    d = document.getElementsByTagName("script")[0];
    d.parentNode && d.parentNode.insertBefore(c, d);
}("https://sdk.accountkit.com/en_US/sdk.js?hash=95b29be7af4f3f4baba9624b513414eb", 1551829289, "AccountKit", [], true);