var Dexie = require('dexie');
var db = new Dexie('IgistDB');

db.version(1).stores({
		gist: 'id, description, public',
    tokidoki: 'user'
	});


	// Open the database
db.open()
	.catch(function(error){
		console.error('Uh oh : ' + error);
	});
module.exports = db;
