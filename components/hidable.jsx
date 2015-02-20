var React = require('react');
var cx = React.addons.classSet;
module.exports = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired
  },

  render: function() {
    var classes = cx({
      'hidden':!this.props.display,
    })
    return (
      <div className={this.props.className + ' ' + classes}>
        {this.props.children}
      </div>
    );
  }
});
