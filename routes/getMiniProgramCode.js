var  url  =  require('url');    //需要引入url
var express = require('express');
var router = express.Router();
var request = require('request')
var fs = require('fs')
/*获取小程序码*/
router.get('/',async function(req, response, next) {
	var args = url.parse(req.url,true).query;
	var data = JSON.stringify({
		page:args.path,
		is_hyaline:true,
		scene:args.scene
	})
	var steam = ''
	request({
		url:`https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${args.token}`,
		method:'POST',
		body:data
	},function (error,result) {
		result.body.indexOf('errcode') > -1 ? response.end(JSON.stringify({msg:JSON.parse(result.body).errmsg})) : steam.on('finish',function () {
			let content = fs.readFileSync('./test.png','binary')
			let base64 = Buffer.from(content, 'binary').toString('base64');
			console.log(this.body)
			response.end(JSON.stringify({data:base64}))
		})
		console.log('result: '+JSON.stringify(result))
	}).pipe(steam = fs.createWriteStream('./test.png'))
});

module.exports = router;
