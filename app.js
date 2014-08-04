var restify = require('restify');
var socketio = require('socket.io')
var server = restify.createServer();
var tucao = require('./model/TuCao');
var fs = require('fs')

//七牛的配置
qiniu.conf.ACCESS_KEY = '0kt3W6JnvYK3rzPHmlFnW4xRfknkAnIdaoE_gByO'
qiniu.conf.SECRET_KEY = 'FCc9471b3g4cHl18KFGmRj8xK3QzKOQ-2tLHyYaA'

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

io.sockets.on('close',function(){
  console.log('close');
});

io.sockets.on('connection', function (socket) {
  console.log('IO Socket connected!')
  //socket.emit('news', { hello: 'world' });
  socket.on('message', function (data) {
    console.log(data);
  });

 socket.on('request', function (data) {
    console.log("request:"+data);
  }); 


 socket.on('connect', function (data) {
    console.log("connect:"+data);
  }); 


 socket.on('close', function () {
    console.log("close:");
  });   
});