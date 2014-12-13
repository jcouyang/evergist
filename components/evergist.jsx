var React = require('react'),
NavMenu = require('./left-nav'),
Stage = require('./stage')

var EverGist = React.createClass({

  render: function() {
    return (
      <div>
        <NavMenu />
        <Stage />
      </div>
    );
  }

});

React.render(
	<EverGist/>, document.querySelector('#evergist')
)
