var qiniu = require('qiniu');
var token = function() {
  //我们自己的七牛的配置(https://portal.qiniu.com/setting/key)
  qiniu.conf.ACCESS_KEY = '0kt3W6JnvYK3rzPHmlFnW4xRfknkAnIdaoE_gByO'
  qiniu.conf.SECRET_KEY = 'FCc9471b3g4cHl18KFGmRj8xK3QzKOQ-2tLHyYaA'
  var policy = new qiniu.rs.PutPolicy()
  var token = policy.token()
  console.log("QiNiu token:"+token);
  return token;
  //TODO: 
}

exports.token = token