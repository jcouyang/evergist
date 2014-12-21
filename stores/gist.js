var im = require('immutable');
var api = require('./api');
var endpoint = api('gists');

gist = function(id){
  return endpoint(id)('GET').then((data)=>{
    return im.Map(data.entity);
  });
};

module.exports = gist
