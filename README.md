tucaoserver
===========

nodejs websocket server for LBS application

Qi Niu Server API:(This for upload authentication)   
http://developer.qiniu.com/docs/v6/sdk/nodejs-sdk.html


Developement Logs:
---------

# 20140804  
七牛吧，需要android客户端先去服务器端(咱们自己的NodeJS服务器)去请求token,android收到这个token后，会把他发往七牛的文件服务器，这个连接是生成token的原理：  
(http://developer.qiniu.com/docs/v6/api/reference/security/upload-token.html)    
而我们要做的就是在nodejs中调用他生成token，作为接口暴露给客户端。  


