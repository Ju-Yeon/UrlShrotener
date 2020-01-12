var moment = require('moment');
module.exports ={
    getYearMonth: () => {
    var yearMonth = moment().format('YYYYMM');
    return yearMonth;
    },
    getDate: () => {
    var date = moment().format('DD');
    return date;
    },
    getTime: () =>{
        var time = moment().format('hhmmss');
        return time;
    }
}