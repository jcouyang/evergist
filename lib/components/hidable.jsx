var React = require('react/addons');
var cx = React.addons.classSet;
var Hidable = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired
  },
  render: function() {
    var classes = cx({
      'hidden':!this.props.display,
    });
    return (
      <div className={this.props.className + ' ' + classes}>
          {this.props.children}
      </div>
    );
  }
});
module.exports = Hidable;
