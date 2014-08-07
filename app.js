var restify = require('restify');
var socketio = require('socket.io')
var server = restify.createServer();
var tucao = require('./model/TuCao');
var fs = require('fs')


function around (req,rep,next) {
	//console.log(req)
	console.log("req.body:%s",req.body)
	// parses the request url
	tucao.around(req,rep,req.body)
}

function post (req,rep,next) {	
	console.log() 
}

// process.on('uncaughtException', function(err) {	
//   console.log('发生错误:'+err);
//   console.trace()
// });
var domain = require('domain');
var d = domain.create();
d.on('error', function(er) {
  console.log('发生错误 : '+err);
  console.trace()
})

server.use(restify.pre.userAgentConnection());          // work around for curl  
server.use(restify.acceptParser(server.acceptable));  
server.use(restify.queryParser());  
server.use(restify.bodyParser()); 

var io = socketio.listen(server);

//启动服务器
server.listen(3900, function() {
  console.log('%s listening at %s', server.name, server.url);
});

//路由表
server.post('/around', around);
server.post('/post',post);
server.get('/', function(req, res, next) {
    //console.log("fs:"+fs);
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            next(err);
            return;
        }

        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
        next();
    });
});

var qiniu = require('./qiniu.js')
io.sockets.on('connection', function (socket) {
  console.log('IO Socket connected!')
  socket.emit('data', {
            longitude: 116.30815, 
            latitude:  40.056885,
            content: '百度就是一个垃圾！'
  });
  socket.on('message', function (data) {
    console.log('receive:'+data);
  });

  socket.on('qiniu.token',function(data){
    console.log('qiniu toaken request')
    //向客户端返回七牛的上传token
    socket.emit('qiniu.token',qiniu.token());
  })

  socket.on('close', function () {
    console.log("close!");
  });   
});
