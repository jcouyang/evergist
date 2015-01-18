var QUERY_TOKEN_URL = '';
var jsonp = require('rest/interceptor/jsonp');
var rest = require('rest');
var mime = require('rest/interceptor/mime');
var use = require('./user');
if(process.env.NODE_ENV == "production"){
  rest = rest.wrap(jsonp).wrap(mime);
  QUERY_TOKEN_URL="https://query.yahooapis.com/v1/public/yql?q=env%20%22store%3A%2F%2FzqDII3XIICqWCefaOiQutN%22%20%3B%20select%20*%20from%20github%20where%20CODE%3D'OAUTH_CODE'&format=json";
}else{
  rest = require('./client');
  QUERY_TOKEN_URL="/authorization";
}
var HAS_CODE = /\?code=([^\/]+)\/?/;
var store = require('./store');
var when = require('when');
var auth = function(){
  if (window.location.search && HAS_CODE.test(window.location.search)) {
    var m = HAS_CODE.exec(location.search);
    return rest(QUERY_TOKEN_URL.replace('OAUTH_CODE',m.pop()))
      .then((data) => {
        var oauth =  data.entity.query.results.token.OAuth;
        if(oauth.error) throw oauth.error_description;
        var token = oauth.access_token;

        return user(token).then((user)=>{
          localStorage.setItem('user',user);
          store.set(user.login, token, ()=>window.location.href='/');
        });

      });
  }else{
    var token_got = when.defer();
    if(!localStorage.user){
      token_got.reject('Please Login');
      return token_got.promise;
    }
    store.get(localStorage.user.login, function(data){
      if(typeof(data) != 'undefined' && data.access_token){
        token_got.resolve(data);
      }else{
        token_got.reject('no token found');
      }
    });
    return token_got.promise;  
  }
};

module.exports = auth;





