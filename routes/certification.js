var  url  =  require('url');    //需要引入url
var database = require('../public/javascripts/database')
var express = require('express');
var router = express.Router();
/*获取优惠券列表*/
router.get('/',async function(req, response, next) {
	var args = url.parse(req.url,true).query;
	var res;
	response.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
	if(args.code == undefined){
		res = await database.updateData('offline','temp_phone',{phone:parseInt(args.phone)},{$set:{code:111111}},{upsert:true})
	}else{
		var result = await database.queryData('offline','temp_phone',{phone:parseInt(args.phone)})
		console.log(args.code == result[0]['code'])
		if(args.code == result[0]['code']){
			res = await database.updateData('offline','phone',{phone:parseInt(args.phone)},{$set:{code:111111}},{upsert:true})
		}else{
			res=false
		}
	}
	var data = {
		'msg': "get data sccess。",
		'code': 200,
		'success': true,
		content:res
	}
	data.success = res!=false
	response.end(JSON.stringify(data))
});

module.exports = router;
