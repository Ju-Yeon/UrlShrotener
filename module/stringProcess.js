
const words = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
module.exports = {
    encode:(date) => {
        return Buffer.from(date, "utf-8").toString('base64');
    },
    decode:(date) => {
        return Buffer.from(date, 'base64').toString('utf-8');
    },  
    getValueOfIndex: (time) => { 
        //base62 인덱스
        var hh = time.substr(0,2);
        var mm = time.substr(2,2);
        var ss = time.substr(4,2);

        var result = words[Number(hh)]+words[Number(mm)]+words[Number(ss)];
        return result;
    },
    getIndexOfValue: (encodedTime) => {
        var result = words.indexOf(encodedTime[0]) + words.indexOf(encodedTime[1]) + words.indexOf(encodedTime[2])
        return result;
    } 
}