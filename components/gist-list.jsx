var React = require('react'),
GistCard = require('./gist-card')

var GistList = React.createClass({
  render: function(){
    return (
      <div className="gist-list">
        <GistCard/>
        <GistCard/>
      </div>
    )
  },

});

module.exports = GistList;
