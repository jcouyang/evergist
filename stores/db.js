var Dexie = require('dexie');
var db = new Dexie('IgistDB');
var tokenizer = require('./tokenizer');
var _ = require('mori');
var getKeywords = function(gist){
  return [gist.description, gist.files.map(file=>tokenizer(file.filename)).join(' ')].join(' ');

};
db.version(2).stores({
  gist: 'id, description, content'
}).upgrade(function(trans){
  trans.gist.toCollection().modify(function(gist){
    gist.content = getKeywords(gist);
  });
});

db.version(1).stores({
		gist: 'id, description'
});


db.gist.hook("creating", function (primKey, obj, trans) {
  console.log('-----creating----')
  obj.content = getKeywords(obj);
});
db.gist.hook("updating", function (mods, primKey, obj, trans) {
  console.log(obj,mods,'-------updating----------')
  if (mods.hasOwnProperty("description")) {
    // "message" property is being updated
    if (mods.description && typeof mods.description == 'string'){
      console.log('---------updating-------',mods.description)
      return { content: getKeywords(mods) };
    }
    // "message" property was updated to another valid value. Re-index messageWords:

  }
  return { content: getKeywords(obj) };

});

db.open()
	.catch(function(error){
		console.error('Uh oh : ' + error);
	});
module.exports = db;
