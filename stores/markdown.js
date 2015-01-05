var api = require('./api');
var endpoint = api('markdown');
var markdown = function(entity){
  return endpoint('POST')(entity).then((data)=>{
    return JSON.parse(data.entity); 
  });
};

module.exports = markdown;
