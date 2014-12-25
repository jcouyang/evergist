var QUERY_TOKEN_URL = "https://query.yahooapis.com/v1/public/yql?q=env%20%22store%3A%2F%2FzqDII3XIICqWCefaOiQutN%22%20%3B%20select%20*%20from%20github%20where%20CODE%3D'OAUTH_CODE'&format=json&diagnostics=true&callback=";
var HAS_CODE = /\?code=([^\/]+)\/?/;
var rest = require('rest');
var store = require('./store');

var auth = function(){
  if (window.location.search && HAS_CODE.test(window.location.search)) {
    var m = HAS_CODE.exec(location.search);
    return rest(QUERY_TOKEN_URL.replace('OAUTH_CODE',m.pop()))
      .then((data) => {
        var token = data.entity.query.results.token.OAuth.access_token;
        store.set({"access_token": token}, ()=>window.location.reload());
      }, (error) => {
        console.log("invalid code", error);
      });
  }else{
    var token_got = false;
    store.get('access_token', (data)=>{
      token_got = typeof(data) != 'undefined' && data.access_token
      if(token_got){
        this.access_token = data.access_token;
        this.token_got.resolve("yay");       
      }
    });
    return token_got;  
  }
};

module.exports = auth;





