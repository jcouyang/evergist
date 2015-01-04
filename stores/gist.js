var im = require('immutable');
var api = require('./api');
var endpoint = api('gists');
var jsonp = require('rest/client/jsonp');
var rest = require('rest');
var gist = function(id){
  return endpoint(id)('GET').then((data)=>{
    return im.fromJS(data.entity);
  });
};

gist.save = function(id, entity){
  return endpoint(id)('PUT')(entity);
};

gist.delete = function(id){
  return endpoint(id)('DELETE');
};

gist.star =function(id){
  return endpoint(id)('star')('PUT');
};

gist.unstar =function(id){
  return endpoint(id)('star')('DELETE');
};


gist.view = function(id){
  return jsonp({method:'GET',path:'https://gist.github.com/'+id+'.json'})
    .then((data)=>{
      return im.fromJS(data.entity);
    });
};

gist.raw = function(url){
  return rest(url)
    .then((data)=>{
      console.log(data)
      return data.entity;
    });
}
module.exports = gist;
