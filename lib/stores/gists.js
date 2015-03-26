var im = require('immutable');
var api = require('./api');
var user = require('./user');
var endpoint = api('gists');
var jsonp = require('rest/client/jsonp');
var _ = require('mori');
var db =require('./db');
var gists = function(){
  return endpoint().then((data)=>{
    return db.transaction('rw', db.gist, ()=>{
      data.entity.forEach((entity)=>{
        console.debug('puting object' + entity.id);
        entity = _.updateIn(_.toClj(entity), ['files'], _.vals);
        db.gist.put(_.toJs(entity));
      });
    });
  },(error)=>console.log);
};

gists.all = gists;

gists.starred = function(){
  return user()
    .then((user)=>jsonp({method:'GET',path:'http://gist.github.com.ru/jcouyang/f8e99c5c12f3f4d19107?username='+ user.login})
          .then((data)=>{
            return db.gist.put(data.entity.result);
          }))
;
};

module.exports = gists
