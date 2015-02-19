var React = require('react');
var Stage = React.createClass({
  render: function(){
    console.log(this.props.children,'----------------')
    return (
      <div className="stage">
        {this.props.children}
      </div>
    )
  }
});

module.exports = Stage;
