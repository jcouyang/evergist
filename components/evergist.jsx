var React = require('react'),
NavMenu = require('./left-nav');

var EverGist = React.createClass({

  render: function() {
    return (
        <NavMenu/>
    );
  }

});
React.renderComponent(
	<EverGist/>, document.querySelector('#evergist')
)
