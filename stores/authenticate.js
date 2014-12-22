var QUERY_TOKEN_URL = "https://query.yahooapis.com/v1/public/yql?q=env%20%22store%3A%2F%2FzqDII3XIICqWCefaOiQutN%22%20%3B%20select%20*%20from%20github%20where%20CODE%3D'meow'&format=json&diagnostics=true&callback=";
var HAS_CODE = /\?code=([^\/]+)\/?/;
var rest = require('rest');
var store;
if (process.env.NODE_ENV == "chrome")
  store = require('./chrome_storage');
else
  store = require('./store');

var auth = function(){
  store.get('access_token', (data)=>{
    if(typeof(data) != 'undefined' && data.access_token){
      this.access_token = data.access_token;
      this.token_got.resolve("yay");       
    }else{
      window.location.href="https://github.com/login/oauth/authorize?client_id=005a3ed2cec4cb179828&scope=public_repo,gist";
    }
  });
};

if (window.location.search && HAS_CODE.test(window.location.search)) {
  var m = HAS_CODE.exec(location.search);
  rest(QUERY_TOKEN_URL)
		.then((data) => {
			var token = data.query.results.token.OAuth.access_token;
			store.set({"access_token": token}, ()=>window.location.reload());
    }, (error) => {
      console.log("invalid code", error);
    });
}




