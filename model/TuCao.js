var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/yuanditucao');

var TuCaoSchema = new mongoose.Schema({
	longitude: Number, 
	latitude:  Number,
	content: String,
	created:{
 		type:Date,
 		default: Date.now()
	}
})

//更新时间
TuCaoSchema.pre('save',function(argument) {
	this.created = this.meta.updated = Date.now()
})
var TuCao = mongoose.model("TuCao", TuCaoSchema)
var TuCaoDao = function(){}

TuCaoDao.prototype.around = function(req,res,location){
	console.log("TuCaoDao.around: param location:"+location)
    TuCao.find(
    	{
			// "longitude" : {
			// 	"$lt": location.longitude+0.01, 
			// 	"$gt": location.longitude-0.01
			// },
			// "latitude" : {
			// 	"$lt": location.latitude+0.01, 
			// 	"$gt": location.latitude-0.01
			// }
		},function(err,docs){
			console.log("查询结果为："+docs)
			res.send(docs)
		}
	)
}

TuCaoDao.prototype.create = function(tucao){
	TuCao.create(tucao,function(err,docs){
		if(err) { 
			console.log('保存吐槽失败：'+docs)
		}else{
			console.log('保存吐槽成功：'+docs)
		}
	})
}

module.exports = new TuCaoDao()