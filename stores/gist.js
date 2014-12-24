var im = require('immutable');
var api = require('./api');
var endpoint = api('gists');
var jsonp = require('rest/client/jsonp');
var rest = require('rest');
gist = function(id){
  return endpoint(id)('GET').then((data)=>{
    return im.fromJS(data.entity);
  });
};
gist.view = function(id){
  return jsonp({method:'GET',path:'https://gist.github.com/jcouyang/'+id+'.json'})
    .then((data)=>{
      return im.fromJS(data.entity);
    });
}
module.exports = gist;
