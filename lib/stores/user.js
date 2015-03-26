var api = require('./api');
var endpoint = api('user');
var when = require('when');
var user = function(token){
  if(localStorage.currentuser) 
    return JSON.parse(localStorage.currentuser);
  return api('user?token='+token)().then((data)=>{
    var user = data.entity;
    user.token = token;
    var localUser = JSON.parse(localStorage.users || '{}');
    localUser[user.email] = user;
    localStorage.users = JSON.stringify(localUser);
    localStorage.currentuser = JSON.stringify(user);
    window.location.href = '/';
    return user;
  });
};
module.exports=user;
