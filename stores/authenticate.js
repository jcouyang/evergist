var QUERY_TOKEN_URL = '';
if(process.env.NODE_ENV == "production")
  QUERY_TOKEN_URL="https://query.yahooapis.com/v1/public/yql?q=env%20%22store%3A%2F%2FzqDII3XIICqWCefaOiQutN%22%20%3B%20select%20*%20from%20github%20where%20CODE%3D'OAUTH_CODE'&format=json&diagnostics=true&callback=";
else
  QUERY_TOKEN_URL="/authorization";
var HAS_CODE = /\?code=([^\/]+)\/?/;
var rest = require('./client');
var store = require('./store');
var when = require('when');
var auth = function(){
  if (window.location.search && HAS_CODE.test(window.location.search)) {
    var m = HAS_CODE.exec(location.search);
    return rest(QUERY_TOKEN_URL.replace('OAUTH_CODE',m.pop()))
      .then((data) => {
        var token = data.entity.query.results.token.OAuth.access_token;
        store.set({"access_token": token},function(){});
        return token;
      });
  }else{
    var token_got = when.defer();
    store.get('access_token', function(data){
      if(typeof(data) != 'undefined' && data.access_token){
        console.log(data);
        token_got.resolve(data);
      }else{
        token_got.reject('no token found');
      }
    });
    return token_got.promise;  
  }
};

module.exports = auth;





