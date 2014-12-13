var React = require('react'),
GistCard = require('./gist-card'),
ToolbarMenu = require('./toolbar')

var GistList = React.createClass({
  render: function(){
    return (
      <div className="gist-list">
        <ToolbarMenu/>
        <GistCard/>
        <GistCard/>
      </div>
    )
  },

});

module.exports = GistList;
