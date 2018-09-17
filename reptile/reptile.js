const fs = require('fs');
var jsdom = require('jsdom');
const $ = require('jquery')
const phantom = require('phantom');
let getListData = async function(Category) {
	const instance = await phantom.create();
	const page = await instance.createPage();
	await page.on('onResourceRequested', function(requestData) {
	});
	let url = ''
	switch (Category) {
		case '0':
			url = 'https://www.toutiao.com/ch/news_game/'
			break;
		case '1':
			url = 'https://www.toutiao.com/ch/news_entertainment/'
			break;
		case '2':
			url = 'https://www.toutiao.com/ch/news_history/'
			break;
		case '3':
			url = 'https://www.toutiao.com/ch/news_finance/'
			break;
	}
	await page.open(url);
	const content = await page.property('content');
  const window = (new jsdom.JSDOM(content)).window
	
	const $ = require('jquery')(window)
	const li =	$($('.feedBox').find('ul')[0]).find('li')
	let data = {
  	list: []
	}
	for  (var item of li) {
		$(item).find('img').attr('src') != undefined ?
		data.list.push({
			src: $(item).find('img').attr('src'),
			title: $($(item).find('.title')).text(),
			source:$($(item).find('.source')).text(),
			href:$($(item).find('.title')).attr('href')
		}):''
	}
	fs.writeFileSync('tt.JSON',JSON.stringify(data))
	await instance.exit();
  return data
};
module.exports = getListData
// ~(async function() {
// 	const instance = await phantom.create();
// 	const page = await instance.createPage();
// 	await page.on('onResourceRequested', function(requestData) {
// 	});
// 	await page.open('https://www.toutiao.com/ch/news_game/');
// 	const content = await page.property('content');
// 	const window = (new jsdom.JSDOM(content)).window
//
// 	const $ = require('jquery')(window)
// 	const li =	$($('.feedBox').find('ul')[0]).find('li')
// 	let data = {
// 		list: []
// 	}
// 	for  (var item of li) {
// 		$(item).find('img').attr('src') != undefined ?
// 			data.list.push({
// 				src: $(item).find('img').attr('src'),
// 				title: $($(item).find('.title')).text(),
// 				source:$($(item).find('.source')).text()
// 			}):''
// 	}
// 	fs.writeFile('tt.txt',JSON.stringify(data),function (err,res) {
// 		console.log(res)
// 		console.log(err)
// 	})
// 	await instance.exit();
// })()