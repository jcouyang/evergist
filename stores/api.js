var client = require('./client');

var suffix = '.json';
if (process.env.NODE_ENV === "prod") suffix = ''
var urlcat = function(paths, path){
  if(typeof path == 'undefined' || path =='GET')
    return clientFactory({path:paths+suffix,method:'GET'});
  return (newpath)=>{return urlcat(paths+"/"+path, newpath);};
};

var clientFactory =function(config){
  return client(config);
};
var API = function(user, token){
  this.user = user;
  this.token = token;
  return (path)=>urlcat("",path);
};

module.exports = API();



















