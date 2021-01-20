var BaseProxy = require("BaseProxy");
var GameConfig = require('GameConfig');
var LobbyMessage = require('LobbyMessage');
var Base64 = require('Base64');

export default class HttpRequestProxy extends BaseProxy {
    static get NAME() {
      return 'HttpRequestProxy';
    }

    onRegister() {

    }

    getUserOnlineInfo(receiveCommand, params, method) {
        this.onPosData("api/getuseronlineinfo", receiveCommand, params, method, true);
    }

    getPackageSMSCharge(receiveCommand, params, method) {
        this.onPosData("mb/getpackagesmscharge", receiveCommand, params, method, true);
    }

    getAgentInfo(receiveCommand, params, method) {
        this.onPosData("api/getagentinfo", receiveCommand, params, method, true);
    }


    getAllCurrentEvent(receiveCommand, params, method) {
        this.onPosData("spapi/eventnotify", receiveCommand, params, method, true);
    }

    getDetailEvent(receiveCommand, params, method) {
        this.onPosData("mb/getdetailevent", receiveCommand, params, method, true);
    }

    checkIp(receiveCommand, params, method) {
        this.onPosData("mb/checkip", receiveCommand, params, method, true);
    }

    getGiftList(receiveCommand, params, method) {
        this.onPosData("/mb/offerlist", receiveCommand, params, method, true);
    }

    //=================================================================================
    fbLogin(receiveCommand, params, method) {
        this.onPosData("userapi/fblogin", receiveCommand, params, method, true);
    }

    sendSaveChatData(receiveCommand, params, method) {
        this.onPosData("cmapi/savechatdata", receiveCommand, params, method);
    }

    sendGetChatData(receiveCommand, params, method) {
        this.onPosData("cmapi/getchatdata", receiveCommand, params, method, true);
    }

    getUserInfo(receiveCommand, params, method) {
        this.onPosData("userapi/getuserinfo", receiveCommand, params, method, true);
    }

    login(receiveCommand, params, method) {
        this.onPosData("userapi/login", receiveCommand, params, method, true);
    }

    register(receiveCommand, params, method) {
        this.onPosData("userapi/register", receiveCommand, params, method, true);
    }

    getChannelInfo(receiveCommand, params, method) {
        this.onPosData("cfapi/getchannel", receiveCommand, params, method, true);
    }

    buyItemShop(receiveCommand, params, method) {
        this.onPosData("mkapi/dt", receiveCommand, params, method, true);
    }

    checkAccountTransferdes(receiveCommand, params, method) {
        this.onPosData("userapi/checkacc", receiveCommand, params, method, true);
    }

    getInfoOutMoney(receiveCommand, params, method) {
        this.onPosData("shop/getinfooutmoney", receiveCommand, params, method, true);
    }

    sendTransferdes(receiveCommand, params, method) {
        this.onPosData("userapi/transfer", receiveCommand, params, method, true);
    }

    getRechargeInfo(receiveCommand, params, method) {
        this.onPosData("cmapi/ninfo", receiveCommand, params, method, true);
    }

    getUrlBank(receiveCommand, params, method) {
        this.onPosData("ntapi/sendrequestnh", receiveCommand, params, method, true);
    }

    getChargemoney(receiveCommand, params, method) {
        this.onPosData("ntapi/nt", receiveCommand, params, method, true);
    }

    getListCardPayBack(receiveCommand, params, method) {
        this.onPosData("mkapi/uc", receiveCommand, params, method, true);
    }

    sendRequestOtp(receiveCommand, params, method) {
        this.onPosData("ntapi/sendrequestonetp", receiveCommand, params, method, true);
    }

    sendConfirmOtp(receiveCommand, params, method) {
        this.onPosData("ntapi/confirmoonetp", receiveCommand, params, method, true);
    }

    getInfoPayBackCard(receiveCommand, params, method) {
        this.onPosData("mkapi/dc", receiveCommand, params, method, true);
    }

    sendGetNotifies(receiveCommand, params, method) {
        this.onPosData("spapi/sysnotifyrun", receiveCommand, params, method, false);
    }

    getAgentInfoList(receiveCommand, params, method) {
        this.onPosData("mkapi/agentlist", receiveCommand, params, method, true);
    }

    getTopPlayer(receiveCommand, params, method) {
        this.onPosData("logapi/gettop", receiveCommand, params, method, true);
    }

    getAvatarList(receiveCommand, params, method) {
        this.onPosData("cmapi/getlistavatar", receiveCommand, params, method, true);
    }

    changeAvatar(receiveCommand, params, method) {
        this.onPosData("userapi/changeavatar", receiveCommand, params, method, true);
    }

    setNickName(receiveCommand, params, method) {
        this.onPosData("userapi/setnickname", receiveCommand, params, method, true);
    }

    getOutCardInfo(receiveCommand, params, method) {
        this.onPosData("cmapi/getoutcardinfo", receiveCommand, params, method, true);
    }

    getMailList(receiveCommand, params, method) {
        this.onPosData("spapi/sysmail", receiveCommand, params, method);
    }

    getMailDetail(receiveCommand, params, method) {
        this.onPosData("spapi/readnotify", receiveCommand, params, method);
    }

    deleteMail(receiveCommand, params, method) {
        this.onPosData("spapi/removeusernotify", receiveCommand, params, method);
    }

    getSendSupportAnswer(receiveCommand, params, method) {
        this.onPosData("spapi/sendtkanswer", receiveCommand, params, method);
    }

    getSupportInfo(receiveCommand, params, method) {
        this.onPosData("cmapi/spinfo", receiveCommand, params, method);
    }

    getSupportDetail(receiveCommand, params, method) {
        this.onPosData("spapi/tkanswer", receiveCommand, params, method);
    }

    getSendSupport(receiveCommand, params, method) {
        this.onPosData("spapi/sendtkquestion", receiveCommand, params, method);
    }

    getUserInfoDetail(receiveCommand, params, method) {
        this.onPosData("userapi/getuserdetailinfo", receiveCommand, params, method);
    }

    setBirthday(receiveCommand, params, method) {
        this.onPosData("userapi/setbirthday", receiveCommand, params, method);
    }

    changePass(receiveCommand, params, method) {
        this.onPosData("userapi/changepassword", receiveCommand, params, method);
    }

    setPhone(receiveCommand, params, method) {
        this.onPosData("userapi/updatephone", receiveCommand, params, method);
    }

    resetPhone(receiveCommand, params, method) {
        this.onPosData("userapi/resetphone", receiveCommand, params, method);
    }

    setOtp(receiveCommand, params, method) {
        this.onPosData("userapi/activephone", receiveCommand, params, method);
    }

    getDescription(receiveCommand, params, method) {
        this.onPosData("cmapi/commondes", receiveCommand, params, method);
    }

    useGiftCode(receiveCommand, params, method) {
        this.onPosData("/userapi/usegc", receiveCommand, params, method, true);
    }

    getInfoStartGamePopup(receiveCommand, params, method) {
        this.onPosData("spapi/sysnotifypopup", receiveCommand, params, method, true);
    }

    getEventBannerInfo(receiveCommand, params, method){
        // this.onPosData("spapi/eventnotifylb", receiveCommand, params, method, false);
    }

    getInGameConfig(receiveCommand, params, method){
        this.onPosData("cfapi/ingameconfig", receiveCommand, params, method, true);
    }

    getListJackpot(receiveCommand, params, method) {
        //this.onPosData("logapi/getpot", receiveCommand, params, method, false);
    }

    onPosData(url, receiveCommand, params, method, isShowLoad) {
        // method = method || "POST";
        //
        // var xhr = new XMLHttpRequest();
        // var api = GameConfig.WEB_SERVICE + url;
        //
        // xhr.open(method, api);
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4 && ( xhr.status >= 200 && xhr.status <= 207 )) {
        //         var jsonData = Base64.decode(xhr.responseText);
        //         jsonData = JSON.parse(jsonData);
        //
        //         if (GameConfig.IS_DEBUG) {
        //             console.log("%c[HTTP RECEIVE][" + api + "]: " + new Date().toLocaleString(), "color:orange");
        //             console.log(this.JSONstringify(jsonData));
        //         }
        //
        //         if (receiveCommand) {
        //             this.sendNotification(receiveCommand, {data: jsonData, sendData: params});
        //         }
        //     }
        //     if (xhr.status < 200 || xhr.status > 207) {
        //         this.sendNotification(LobbyMessage.SHOW_ALERT, {content: "Lỗi kết nối vui lòng thử lại."});
        //     }
        //     if(isShowLoad) this.sendNotification(LobbyMessage.HIDE_LOADING);
        // }.bind(this);
        //
        // if (GameConfig.IS_DEBUG) {
        //     console.log("%c[HTTP SEND][" + api + "]: " + new Date().toLocaleString(), "color:orange");
        //     console.log(this.JSONstringify(params));
        //
        // }
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // xhr.setRequestHeader("Accept", "application/json");
        // if (params) {
        //     var urlParams = Object.keys(params).map(function (key) {
        //         return params[key];
        //     }).join('|');
        //     urlParams = "dt=" + Base64.encode(urlParams);
        //     xhr.send(urlParams);
        //
        // } else {
        //     xhr.send();
        // }
        //
        // if(isShowLoad)this.sendNotification(LobbyMessage.SHOW_LOADING);
    }
}
