var db= require('./db');
var store = function(){
};

store.get = function(key, callback){
  db.settings.get(1).then((settigns)=>{
    if(settings.remember_me)
      db.tokidoki.get(key).then((tokidoki)=>{
        callback({access_token:tokidoki.token});    
      });
    else
      callback({access_token:localStorage.getItem(key)});
  });
};

store.set = function(key, val, callback){
  var keyval = {};
  keyval[key]=val;
  db.settings.get(1).then(()=>{
    if(settings.remember_me)
      db.tokidoki.put(keyval).then((tokidoki)=>{
        callback({access_token:tokidoki.token});    
      });
    else
      callback(sessionStorage.setItem(key,val));
  });

};

module.exports = store;
