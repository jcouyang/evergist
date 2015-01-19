var store = function(){
};

store.get = function(key, callback){
	console.log('store get')
	callback({access_token:localStorage.getItem(key)});
};

store.set = function(keyval, callback){
	console.log('set to ls')
	callback(localStorage.setItem("access_token",keyval.access_token));
}

module.exports = store
