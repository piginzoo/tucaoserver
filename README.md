tucaoserver
===========

nodejs websocket server for LBS application

Qi Niu Server API:(This for upload authentication)   
http://developer.qiniu.com/docs/v6/sdk/nodejs-sdk.html


Developement Logs:
---------

## 20140804  
七牛吧，需要android客户端先去服务器端(咱们自己的NodeJS服务器)去请求token,android收到这个token后，会把他发往七牛的文件服务器，这个连接是生成token的原理：  
(http://developer.qiniu.com/docs/v6/api/reference/security/upload-token.html)    
而我们要做的就是在nodejs中调用他生成token，作为接口暴露给客户端。  
```Javascript

```

终于放弃了，终于放弃了WebSocket，参见我的帖子：  
http://cnodejs.org/topic/53d5c442895ba3062be77f81	
最后就用Socket.io吧，尽管服务器端还是用WebSocket的实现，但是，用的客户端是socket.io，不知道到底w3c的API到底怎么了，anyway，我还是放弃了。
对于Android客户端当然也是用Socket.io了，但是犹豫koush（adnroidAsync）的作者自己都说了不支持最新版的Socket.io 1.0,只好回滚到0.9来用了，重整了package.json，因此。

