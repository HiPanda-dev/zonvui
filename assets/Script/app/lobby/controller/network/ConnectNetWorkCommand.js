var BaseGameCommand = require('BaseGameCommand');
var LobbyMessage = require('LobbyMessage');
var LocalStorage = require('LocalStorage');
var i18n = require('i18n');

export default class ConnectNetWorkCommand extends BaseGameCommand {
  execute(notification) {
    if(window.webSocket) {
      window.webSocket.close();
      window.webSocket = null;
    }
    this.getSocketConfig();
  }

  getSocketConfig() {
    var xhr = new XMLHttpRequest();
    var url = (window.urlWebConfig === undefined || window.urlWebConfig === null) ? "https://zonvui.com/cf" : window.urlWebConfig;
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && ( xhr.status >= 200 && xhr.status <= 207 )) {
            var jsonData = JSON.parse(xhr.responseText);
            this.connectSocket(jsonData.ws);
        }
        if (xhr.status < 200 || xhr.status > 207) {
            this.showAlertErrorConnection();
        }
    }.bind(this);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();
  }

  connectSocket(ws) {
    this.socket =  new WebSocket(ws);
    window.webSocket = this.socket;
    this.socket.onopen = function (event) {
       this.addAllEventSocketProxy();
       this.checkAutoLogin();
       this.sendNotification(LobbyMessage.SEND_GET_INFO_LIST_TOURNAMENT);
    }.bind(this);

    this.socket.onclose = function (event) {
      console.log('Web Socket closed: ',event);
      this.showAlertErrorConnection();
    }.bind(this);
  }

  addAllEventSocketProxy() {
    if(cc.sys.isBrowser){
      this.socket.addEventListener('message', this.onMessage.bind(this));
    }else{
      this.socket.onmessage = function(event) {
        this.onMessage(event);
        if(this.socket.onmessageCaptcha) {
          this.socket.onmessageCaptcha(event);
        }
      }.bind(this);
    }
  }

  checkAutoLogin() {
    var token = LocalStorage.getToken();
    if(token){
       this.sendNotification(LobbyMessage.SEND_TOKEN_LOGIN, {token:token});
    }
  }

  onMessage(event) {
    for(var i = 0; i < window.listNetWorkProxy.length; i++) {
      var proxy = window.listNetWorkProxy[i];
      proxy.onMessage(event);
    }
  }

  showAlertErrorConnection() {
    this.sendNotification(LobbyMessage.SHOW_ALERT, {
        content: i18n.t('C0043'),
        acceptLabel: i18n.t('C0123'),
        callback: this.onRestartGame.bind(this)
    });
  }

  onRestartGame () {
    if(cc.sys.isBrowser){
        window.location.reload(false);
    }else{
      cc.game.restart();
    }
  }

}
