var api = require('./api');
var endpoint = api('markdown');
var markdown = function(entity){
  return endpoint('POST')(entity).then((data)=>{
    return data.entity; 
  });
};

module.exports = markdown;
