var GistList = require('./gist-list'),
React = require('react'),
GistDetail = require('./gist-detail')

var Stage = React.createClass({
  render: function(){
    return (
      <div className="stage">
        <GistList/>
        <GistDetail/>
      </div>      
    )
  }
})

module.exports = Stage;
