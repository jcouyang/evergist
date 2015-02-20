var React = require('react');
var Hidable = require('./hidable');
var Loading = React.createClass({
  render: function(){
    return (
    <Hidable display={this.props.loading} className="loading">
      <img width="100%" height="8px" src="assets/loading.svg"/>
    </Hidable>
    )
  }
})
module.exports = Loading;
