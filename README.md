# Node-Interface
## Project Description

* 写了个爬虫，爬取头条数据
* 为了熟悉MongoDB，用node写了个接口
* 写了获取小程序码的接口

## Project build
* 先安装puppeteer，是因为如果不忽略scripts则会报chrome安装失败的错误
```bash
   npm install puppeteer --ignore-scripts
   npm install
```
* 把项目中的chrome-win放到D盘根目录。
* PS: 或者你自己放到自己的指定目录，但是在项目里的reptile.js里面 puppeteer.launch的时候需要指定绝对定位的地址
```bash
   npm run start
```

