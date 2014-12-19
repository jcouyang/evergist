var pun = require('pun').pun;
var im = require('immutable');
var {$,_} = pun;
var rest = require('rest');

var urlcat = function(paths, path){
  if( path=="end") return rest(paths);
  return (newpath)=>{return urlcat(paths+"/"+path, newpath);};
};

var API = function(user, token){
  this.user = user;
  this.token = token;
  return (path)=>urlcat("https://api.github.com",path);
};

module.exports = API;



















