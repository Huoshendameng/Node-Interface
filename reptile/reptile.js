/* 引入相关 工具 */
const fs = require('fs')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

/* 定义函数 */
let getListData = async function(Category) {
	/* 初始化 puppeteer*/
	const browser = await puppeteer.launch({
		executablePath: 'D:\\chrome-win\\chrome.exe',//把项目中的这个chrome-win文件夹放到D盘根目录
		headless: false //这个是 是否打开chrome可视化窗口 true是不打开 false是打开
	})
	//获取page实例
	const page = await browser.newPage()
	//我这里是通过 入参传过来的 分类来判断抓取相应页面的数据
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
	//打开页面
	await page.goto(url)
	//定义页面内容及Jquery
	var content , $
	/* 页面滚动方法 */
	async function scrollPage(i) {
		content = await page.content();
		$ = cheerio.load(content);
		/*执行js代码（滚动页面）*/
		await page.evaluate(function () {
			/* 这里做的是渐进滚动，如果一次性滚动则不会触发获取新数据的监听 */
			for (var y = 0; y <= 1000*i; y += 100) {
				window.scrollTo(0,y)
			}
		})
		// 获取数据列表
		const li =	$($('.feedBox').find('ul')[0]).find('li')
		return li
	}
	let i = 0
	let li = await scrollPage(++i)
	//如果数据列表 不够30 则一直获取
	while (li.length < 30) {
		li = await scrollPage(++i)
	}
	let data = {
  	list: []
	}
	/* 封装返回的数据*/
	li.map(function (index,item) {
		$(item).find('img').attr('src') != undefined ?
			data.list.push({
				src: $(item).find('img').attr('src'),
				title: $($(item).find('.title')).text(),
				source:$($(item).find('.source')).text(),
				href:$($(item).find('.title')).attr('href')
			}):''
	})
	//顺手存入本地文件
	fs.writeFileSync('tt.JSON',JSON.stringify(data))
	fs.writeFileSync('tt.html',content)
	/* 关闭 puppeteer*/
	await browser.close()
  return data
}
module.exports = getListData