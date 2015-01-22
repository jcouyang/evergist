var store = function(){
};

store.get = function(key, callback){
  if (localStorage.currentuser) {
    callback(JSON.parse(localStorage.currentuser).token);
  }else{
    callback();
  }
};

module.exports = store
