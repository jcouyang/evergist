var GistList = require('./gist-list'),
React = require('react'),
GistDetail = require('./gist-detail')

var Stage = React.createClass({
  render: function(){
    return (
      <div className="stage">
        <GistList showDetail={this._displayGistDetail}/>
        <GistDetail/>
      </div>      
    )
  },
  
  _displayGistDetail: function(show){
    var stage = document.querySelector('.stage')
    if(!stage) return
    show?(stage.className+=' detail'):stage.className.replace('detail','')
  }
})

module.exports = Stage;
