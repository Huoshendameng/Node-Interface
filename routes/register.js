var  url  =  require('url');    //需要引入url
var database = require('../public/javascripts/database')
var express = require('express');
var router = express.Router();
/*获取优惠券列表*/
router.get('/',async function(req, response, next) {
	var args = url.parse(req.url,true).query;
	response.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
	var user = await database.queryData('admin','user',{})
	let isCorrect = true
	for (var x in  user[0]){
		if(x!='_id'&&args[x]==undefined) {isCorrect = false }
	}
	var res = isCorrect ?  await database.updateData('admin','user',{account:args.username},args,{upsert:true}) : ''
	var data = {
		'msg': "get data success。",
		'amount': 1,
		'code': 200,
		'success': true,
		content:isCorrect ? res : isCorrect
	}
	response.end(JSON.stringify(data))
});

module.exports = router;
