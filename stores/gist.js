var im = require('immutable');
var api = require('./api');
var endpoint = api('jcouyang', 'token')('gists');

gist = function(id){
  return endpoint(id)('end').then((data)=>{
    console.log(data)
    return im.Map(data.entity);
  });
};

module.exports = gist
