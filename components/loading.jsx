var React = require('react');
var Hidable = require('./hidable');
module.exports = React.createClass({
  render: function(){
    return (
    <Hidable display={this.props.loading} className="loading">
      <img width="100%" src="assets/loading.svg"/>
    </Hidable>
    )
  }
})
