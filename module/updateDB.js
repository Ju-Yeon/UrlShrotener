const cron = require('node-cron');
const moment = require('moment');
var urls = require("../model/url");

module.exports = {
    update: () => {
        cron.schedule('0 12 * * * ', () => {
            var toErase = moment().subtract(1, 'months').format('YYYYMM');
            urls.deleteMany({
                yearMonth: toErase
            });
        }).start()
    }
}