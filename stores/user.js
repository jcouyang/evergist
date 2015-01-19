var api = require('./api');
var endpoint = api('user');
var when = require('when');
var user = function(token){
  if(localStorage.user) return when(JSON.parse(localStorage.user));
  return api('user?token='+token)().then((data)=>{
    data.entity.token = token;
    var localUser = localStorage.user || "[]";
    var user = JSON.parse(localUser).concat(data.entity);
    localStorage.user = JSON.stringify(user);
    localStorage.currentuser = JSON.stringify(user);
    return localStorage.user;
  });
};
module.exports=user;
