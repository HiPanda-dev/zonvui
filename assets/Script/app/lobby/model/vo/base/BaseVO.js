var puremvc = window.puremvc;//require('../../../../../lib/puremvc-1.0.1.js').puremvc;
var BaseVO = puremvc.define
(
    // CLASS INFO
    {
        constructor: function () {
   
        }
    },

    // INSTANCE MEMBERS
    {
        update:function (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
    },
    // STATIC MEMBERS
    {
        puremvc:puremvc,
    }
);

module.exports = BaseVO;