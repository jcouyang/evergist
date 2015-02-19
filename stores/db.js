var Dexie = require('dexie');
var db = new Dexie('IgistDB');
var tokenizer = require('./tokenizer');
var _ = require('mori');
db.version(2).stores({
  gist: 'id, description,*keywords'
}).upgrade(function(trans){
  trans.table('gist').toCollection().modify(function(gist){
    gist.keywords = []
      .concat(tokenizer(gist.description))
      .concat(
      _.toJs(_.map(tokenizer,_.keys(_.toClj(gist.files)))));
  });
});

db.version(1).stores({
		gist: 'id, description'
});

db.open()
	.catch(function(error){
		console.error('Uh oh : ' + error);
	});
module.exports = db;
