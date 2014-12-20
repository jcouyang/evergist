var client = require('./client');

var urlcat = function(paths, path){
  if( path=="end") return client(paths);
  return (newpath)=>{return urlcat(paths+"/"+path, newpath);};
};

var API = function(user, token){
  this.user = user;
  this.token = token;
  return (path)=>urlcat("",path);
};

module.exports = API();



















