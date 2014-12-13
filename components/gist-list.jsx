var React = require('react'),
GistCard = require('./gist-card'),
ToolbarMenu = require('./toolbar')

var GistList = React.createClass({
  render: function(){
    return (
      <div className="gist-list">
        <ToolbarMenu/>
        <a onClick={this._showDetail}> <GistCard/></a>
        <GistCard/>
      </div>
    )
  },
  _showDetail: function(){
    this.props.showDetail(true)
  }
});

module.exports = GistList;
