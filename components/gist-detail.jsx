var React = require('react'),
mui = require('material-ui'),
Paper = mui.Paper

var GistDetail = React.createClass({
  render: function(){
    return (
      <div className="gist-detail">
          <time>3 weeks ago</time>
          <h2>Title</h2>
          <p>detail</p>
      </div>
    )
  }

});

module.exports = GistDetail;
