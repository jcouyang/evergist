var client = require('./client');

var urlcat = function(paths, path){
  if(typeof path == 'undefined')
    return clientFactory({path:paths,method:'GET'});
  if(['DELETE'].indexOf(path)>=0)
    return clientFactory({path:paths,method:path});
  if(['PUT','POST'].indexOf(path)>=0)
    return function(entity){
      return clientFactory({path:paths,method:path,entity:entity}); 
    };

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



















