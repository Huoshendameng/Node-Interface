var  url  =  require('url');    //需要引入url
var database = require('../public/javascripts/database')
var express = require('express');
var router = express.Router();
/*获取优惠券列表*/
 router.get('/',async function(req, response, next) {
	var args = url.parse(req.url,true).query;
	response.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
	var res = await database.queryData('offline','coupons',{status:parseInt(args.status)})
	var data = {
		'msg': "get data sccess。",
		'amount': 1,
		'code': 200,
		'success': true,
		'status-flag':parseInt(args.status),
		content:res
	}
	response.end(JSON.stringify(data))
});

module.exports = router;
