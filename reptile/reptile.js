const fs = require('fs')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
let getListData = async function(Category) {
	const browser = await puppeteer.launch({
		executablePath: 'D:\\chrome-win\\chrome.exe',
		headless: false
	})
	const page = await browser.newPage()
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
	await page.goto(url)
	var content , $
	async function scrollPage(i) {
		content = await page.content();
		$ = cheerio.load(content);
		await page.evaluate(function () {
			for(var y = 0; y <= 1000*i;y += 100){
				window.scrollTo(0,y)
			}
		})
		const li =	$($('.feedBox').find('ul')[0]).find('li')
		return li
	}
	let i = 0
	let li = await scrollPage(++i)
	while (li.length < 30) {
		li = await scrollPage(++i)
	}
	let data = {
  	list: []
	}
	console.log(li.length)
	li.map(function (index,item) {
		$(item).find('img').attr('src') != undefined ?
			data.list.push({
				src: $(item).find('img').attr('src'),
				title: $($(item).find('.title')).text(),
				source:$($(item).find('.source')).text(),
				href:$($(item).find('.title')).attr('href')
			}):''
	})
	fs.writeFileSync('tt.JSON',JSON.stringify(data))
	fs.writeFileSync('tt.html',content)
	await browser.close()
  return data
}
module.exports = getListData