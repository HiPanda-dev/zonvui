var BaseCommand = require('BaseCommand');
var Constants = require('Constants');

export default class SendGetHistoryCashOutCommand extends BaseCommand {
    execute(notification) {
        BaseCommand.prototype.execute.call(this, notification);

        var params = notification.getBody();
        if (params === undefined) {
            params = {};
            params.io = 0;
            params.p = 1;
        }
        this.staticProxy = this.facade.retrieveProxy("StaticsicProxy");
        this.staticProxy.sendGetHistoryCashOut(params);
    }
}
