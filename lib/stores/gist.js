var im = require('immutable');
var api = require('./api');
var endpoint = api('gists');
var jsonp = require('rest/client/jsonp');
var rest = require('rest');
var db = require('./db');
var gist = function(id){
  return endpoint(id)('GET').then((data)=>{
    return db.gist.put(data.entity);
  });
};

gist.save = function(id, entity){
  return endpoint(id)('PATCH')(entity);
};

gist.delete = function(id){
  return endpoint(id)('DELETE');
};

gist.star =function(id){
  return endpoint(id)('star')('PUT')('');
};

gist.unstar =function(id){
  return endpoint(id)('star')('DELETE');
};

gist.create = function(entity){
  return endpoint('POST')(entity);
}

gist.view = function(id){
  return jsonp({method:'GET',path:'https://gist.github.com/'+id+'.json'})
    .then((data)=>{
      return toClj(data.entity);
    });
};

gist.raw = function(url){
  return rest(url)
    .then((data)=>{
      return data.entity;
    });
}
module.exports = gist;
