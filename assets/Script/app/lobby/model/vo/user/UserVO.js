var BaseVO = require("BaseVO");
var Constants = require('Constants');
var LevelInfoVO = require('LevelInfoVO');
var GameConfig = require('GameConfig');

export default class UserVO extends BaseVO{

    onRegister() {
      this.id = "";
      this.money = 0;
      this.exp = 0;
      this.point = 0;
      this.vip = 0;
      this.Name = "";
      this.alias = "";
      this.displayName = "";
      this.token = "";
      this.avatar = "";
      this.status = 0;
      this.security = 0;
      this.level = 0;
      this.phoneNumber = "";

      //
      //vip1        1         19
      //vip2        20        99
      //vip3        100       719
      //vip4        720       2499
      //vip5        2500      8199
      //vip6        8200      23999
      //vip7        24000     67999
      //vip8        68000     179999
      //vip9        180000    499999
      //vip10       500000
      //POINT = exp
      //POINT Doi dc, exp ko doi dc
      //su dung exp tinh vip

      this.listAchievements = [
        {
          name: ' Tai Xiu',
          level: 0,
          win: 0,
          lose: 0
        },
        {
          name: ' Bau Cua',
          level: 0,
          win: 0,
          lose: 0
        },
        {
          name: ' Thien Ha',
          level: 0,
          win: 0,
          lose: 0
        },
        {
          name: ' Minipoker',
          level: 0,
          win: 0,
          lose: 0
        }
      ]
    }

    getPercentVip() {
      this.listVipExp = [19,99,719,2499,8199,23999,67999,179999,499999];
      var maxExp = this.listVipExp[this.vip];
      var minExp = (this.vip === 0) ? 0 : this.listVipExp[this.vip - 1];

      return (this.exp - minExp) * 100 / (maxExp - minExp);
    }

    updateData(data) {

      this.id = data.Id;
      this.money = data.Coin;
      this.exp = data.Exp;
      this.point = data.Point;
      this.vip = data.Vip;
      this.Name = data.Name;
      this.alias = data.Alias;
      this.displayName = data.Alias;
      this.token = data.Token;
      this.avatar = data.Avatar;
      this.status = data.Status;
      this.security = data.Security;
      this.phoneNumber = (data.phoneNumber) ? data.phoneNumber : '';




        // this.uid = (data.userName !== null && data.userName !== undefined && data.userName.toString().split("_").length > 1) ? data.userName.toString().split("_")[1] : this.uid;
        // this.uid = (data.uid !== null && data.uid !== undefined) ? data.uid.toString() : this.uid;
        // this.fbId = (data.fbId !== null && data.fbId !== undefined) ? data.fbId.toString() : this.fbId;
        // this.userName = (data.userName !== null && data.userName !== undefined) ? data.userName.toString() : this.userName.toString();
        // this.loginName = (data.loginName !== null && data.loginName !== undefined) ? data.loginName.toString() : this.loginName.toString();
        // this.id = this.uid;
        // this.displayName = (data.displayName !== null && data.displayName !== undefined) ? data.displayName : this.displayName;
        // this.avatar = (data.avatar !== null && data.avatar !== undefined) ? data.avatar : this.avatar;
        // this.money = (data.money !== null && data.money !== undefined) ? parseInt(data.money) : parseInt(this.money);
        // this.chip = (data.chip !== null && data.chip !== undefined) ? parseInt(data.chip) : parseInt(this.chip);
        // this.token = (data.token !== null && data.token !== undefined) ? data.token : this.token;
        // this.isSocial = (data.isSocial !== null && data.isSocial !== undefined) ? data.isSocial : this.isSocial;
        // this.isActivePhone = (data.isActivePhone !== null && data.isActivePhone !== undefined) ? data.isActivePhone : this.isActivePhone;
        // this.phone = (data.phone !== null && data.phone !== undefined) ? data.phone : this.phone;
        // this.joinDate = (data.joinDate !== null && data.joinDate !== undefined) ? data.joinDate : this.joinDate;
        // this.birthday = (data.birthday !== null && data.birthday !== undefined) ? data.birthday : this.birthday;
        // this.levelInfo = (data.levelInfo !== null && data.levelInfo !== undefined) ? data.levelInfo : this.levelInfo;
        // this.regQuit = (data.regQuit !== null && data.regQuit !== undefined) ? data.regQuit : this.regQuit;
        //
        //
        // this.isViewer = (data.isViewer !== null && data.isViewer !== undefined) ? data.isViewer : this.isViewer;
        // this.isCurrentWinner = (data.isCurrentWinner !== null && data.isCurrentWinner !== undefined) ? data.isCurrentWinner : this.isCurrentWinner;
        // this.numCard = (data.numCard !== null && data.numCard !== undefined) ? data.numCard : this.numCard;
        // this.cardNrReminder = (data.numCard !== null && data.numCard !== undefined) ? data.numCard : this.cardNrReminder;
        // this.seatId = (data.seatId !== null && data.seatId !== undefined) ? data.seatId : this.seatId;
        // this.position = (data.position !== null && data.position !== undefined) ? data.position : this.position;
        // this.ready = (data.ready !== null && data.ready !== undefined) ? data.ready : this.ready;
        // this.cards = (data.cards !== null && data.cards !== undefined)?data.cards:this.cards;
        // this.sam = data.sam;
        // this.isSort = (data.isSort)?true:false;
        // this.stoleCards = data.stoleCards;
        // this.discardedCards = data.discardedCards;
        // this.layingCards = data.layingCards;
    }

    /**
     * đồng tiền dùng chung trong game
     * ứng với mỗi mode sẽ trả ra đồng tiền tương ứng money hoặc chip
     * @returns {*}
     */
    gold() {
        if(GameConfig.CURRENT_MODE === "MONEY") return this.money;
        else return this.chip;
    }

}
