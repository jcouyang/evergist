var React = require('react');
var Stage = React.createClass({
  render: function(){
    return (
      <div className="stage">
        {this.props.children}
      </div>
    )
  }
});

module.exports = Stage;
