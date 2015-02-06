var React = require('react');
module.exports = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired
  },

  render: function() {
    return (
      <div className={this.props.display?'':'hidden'}>
        {this.props.children}
      </div>
    );
  }
});


















