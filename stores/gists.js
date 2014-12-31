var im = require('immutable');
var api = require('./api');
var user = require('./user');
var endpoint = api('gists');
var jsonp = require('rest/client/jsonp');
gists = function(){
  return endpoint().then((data)=>{
    return im.fromJS(data.entity);
  },(error)=>console.log);
};

gists.all = gists;

gists.starred = function(){
  return user()
    .then((user)=>jsonp({method:'GET',path:'http://gist.github.com.ru/jcouyang/f8e99c5c12f3f4d19107?username='+ user.login})
          .then((data)=>{
            console.log(data);
            return im.fromJS(data.entity.result);
          }))
;
};

module.exports = gists










