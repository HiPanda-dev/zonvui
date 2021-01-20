var BaseCommand = require('BaseCommand');
var Constants = require('Constants');

export default class SendGetDetailSessionTaiXiuCommand extends BaseCommand {
    execute(notification) {
        BaseCommand.prototype.execute.call(this, notification);

        var params = notification.getBody();
        if (params.page === undefined)
            params.page = 1;
        this.staticProxy = this.facade.retrieveProxy("StaticsicProxy");
        this.staticProxy.sendGetDetailSession(params);
    }
}
