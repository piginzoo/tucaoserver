tucao = {
	 longitude: 116.30815, 
	 latitude:  40.056885,
	 tucao : {
	 	content: '百度就是一个垃圾！'
	 }
}

for (var i=0;i<10;i++){
	db.tucao.insert(tucao);	
}


db.tucao.find(
	{
		"longitude" : {"$lt": 116.30815+0.01, "$gt":116.30815-0.01},
		"latitude" : {"$lt": 40.056885+0.01, "$gt":40.056885-0.01}
	}
)