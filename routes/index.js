
var express = require('express');
var router = express.Router();
var urls = require("../model/url");
var getTime = require('../module/getTime');
var stringProcess = require('../module/stringProcess');
var save;

router.get('/', function(req,res,next){
    res.render('index.html')
});

router.post('/', async function (req, res, next) {

    var inputUrl = await req.body.inputUrl;
    var encodedUrl;
    
    if(inputUrl.includes('localhost:3000/')){
        var index = inputUrl.indexOf('localhost:3000/');
        inputUrl=inputUrl.substr(index+15);
    }

    //Percent Encoding
    if(inputUrl.includes('%')){
        inputUrl = decodeURI (inputUrl);
        encodedUrl = inputUrl;
    }else{
        encodedUrl = encodeURI(inputUrl);
    }

    //기존 디비 존재 유무
    var db_url = await urls.findOne({ originUrl: encodedUrl });
    var db_short_url = await urls.findOne({ shortenUrl: inputUr });

    //존재하는 long url일 때
    if (db_url) {
        console.log("기존 url 정보조회 성공")
        res.status(200).redirect(`${db_url.shortenUrl}`)
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
            res.status(200).redirect(`${newUrl.shortenUrl}`)
            return;
        })
        .catch((err) => {
            res.status(200).json({
                message: err
            })
            return;
        })

});

router.get('/:result',function(req, res, next){
    var result = req.params.result;
    res.render('result.html',{result});
});


module.exports = router;

//shortenUrl = day인코딩 + time인코딩
//데이터베이스 갱신 기준 yearDate

