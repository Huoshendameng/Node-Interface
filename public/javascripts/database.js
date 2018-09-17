const mongoClient = require('mongodb').MongoClient
const dbAddress = 'mongodb://localhost:8888'
const database = {
	//数据库查询
	async queryData(dbname,collection,condition){
		let db,result;
	  db = await mongoClient.connect(dbAddress, {useNewUrlParser:true});
		result =   db.db(dbname).collection(collection).find(condition).toArray()
		return result;
	},
	//数据库插入
	async insertData(dbname,collection,condition){
		let db,result;
		db = await mongoClient.connect(dbAddress, {useNewUrlParser:true});
		result =   db.db(dbname).collection(collection).insert(condition)
		return result;
	},
	//数据库更新
	async updateData(dbname,collection,condition,operation,args){
		let db,result;
		db = await mongoClient.connect(dbAddress, {useNewUrlParser:true});
		result =   db.db(dbname).collection(collection).update(condition,operation,args)
		return result;
	}
}
module.exports = database;