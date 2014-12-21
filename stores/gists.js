var im = require('immutable');
var api = require('./api');
var username = 'jcouyang';//TODO authenticator
var endpoint = api('users')(username)('gists');

gists = function(){
  return endpoint().then((data)=>{
    return im.fromJS(data.entity);
  },(error)=>console.log);
};

module.exports = gists










