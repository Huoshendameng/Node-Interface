var  url  =  require('url');    //需要引入url
var express = require('express');
var router = express.Router();
var request = require('request')
var fs = require('fs')
var getListData = require('../reptile/reptile')
/*获取列表数据*/
router.get('/',async function(req, response, next) {
	var args = url.parse(req.url,true).query;
	response.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
	const data = await getListData(args.catelogry)
	response.end(JSON.stringify(data))
});

module.exports = router;
