var BaseCommand = require('BaseCommand');
var Constants = require('Constants');

export default class SendGetEventTaiXiuCommand extends BaseCommand {
    execute(notification) {
        BaseCommand.prototype.execute.call(this, notification);

        var params = notification.getBody();
        if (params === undefined) {
            params = {};
            params.isWin = 1;
            var d = new Date();
            params.date = d.toISOString().slice(0,10).replace(/-/g,"");
        }
        this.staticProxy = this.facade.retrieveProxy("StaticsicProxy");
        this.staticProxy.sendGetEvent(params);
    }
}
