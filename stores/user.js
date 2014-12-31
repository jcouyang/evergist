var api = require('./api');
var endpoint = api('user');
var when = require('when');
var user = function(){
  if(localStorage.user) return when(JSON.parse(localStorage.user));
  return endpoint('GET').then((data)=>{
    localStorage.user = data.entity;
    return data.entity;
  });
};
module.exports=user;
