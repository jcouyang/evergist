var db = {}
db.gist = {}
db.gist.orderBy = function(){
  return {
    desc:function(){
      return {
        toArray: function(){
          return []
        }
      }
    }
  }
}
module.exports = db;
