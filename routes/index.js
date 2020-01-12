
var express = require('express');
var router = express.Router();
var urls = require("../model/url");
var getTime = require('../module/getTime');
var stringProcess = require('../module/stringProcess');
var save;

//router.use('/getUrl', require('./getUrl'));

router.post('/', async function (req, res, next) {

    const inputUrl = await req.body.inputUrl;
    var encodedUrl;
    console.log(inputUrl)
    //Percent Encoding
    if(inputUrl.includes('%')){
        inputUrl = decodeURI (inputUrl);
        encodedUrl = inputUrl;
    }else{
        encodedUrl = encodeURI(inputUrl);
    }

    var db_url = await urls.findOne({
        originUrl: encodedUrl
    });
    var db_short_url = await urls.findOne({
        shortenUrl: inputUrl
    });

    //존재하는 long url일 때
    if (db_url) {
        save = `localhost:3000/${db_url.shortenUrl}`
        console.log("기존 url 정보조회 성공")
        res.status(200).json({url:`localhost:3000/${db_url.shortenUrl}`})
        return;

    //존재하고 있는 shortUrl일때 
    }else if(db_short_url){
        if(db_short_url.originUrl.includes("http")){
            res.redirect(db_short_url.originUrl)
        }else{
            res.redirect(`https://${db_short_url.originUrl}`)
        }
        return;
    }

    //존재하지 않는 long url일 때
    
    //shortenUrl = day인코딩 + time인코딩
    //데이터베이스 갱신 기준 yearDate
    var yearMonth = getTime.getYearMonth();
    var date = getTime.getDate();
    var time = getTime.getTime();

    var encodedTime = stringProcess.getValueOfIndex(time);
    var encodedDate = stringProcess.encode(date).substr(0,3);

    var urlModel = new urls();
    urlModel.yearMonth = yearMonth;
    urlModel.shortenUrl = encodedDate+encodedTime;
    urlModel.originUrl = encodedUrl;

    urlModel.save()
        .then((newUrl) => {
            console.log("새로운 url 저장 완료")
            save = `localhost:3000/${newUrl.shortenUrl}`;
            res.status(200).send({
                    url: `localhost:3000/${newUrl.shortenUrl}`
                })
            return;
        })
        .catch((err) => {
            res.status(500).json({
                message: err
            })
            return;
        })

});

router.get('/', async function (req, res, next) {
    res.status(200).send({
        save: save
    })
});

module.exports = router;



