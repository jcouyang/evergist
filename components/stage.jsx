var GistList = require('./gist-list'),
React = require('react')


var Stage = React.createClass({
  render: function(){
    return (
      <div className="stage">
        <GistList/>
      </div>      
    )
  }
})

module.exports = Stage;
