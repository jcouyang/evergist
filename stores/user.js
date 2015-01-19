var api = require('./api');
var endpoint = api('user');
var when = require('when');
var user = function(token){
  if(localStorage.user) return when(JSON.parse(localStorage.user));
  return api('user?token='+token)().then((data)=>{
    localStorage.user = data.entity;
    return data.entity;
  });
};
module.exports=user;
