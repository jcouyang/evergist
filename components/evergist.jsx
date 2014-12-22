var React = require('react'),
NavMenu = require('./left-nav'),
Stage = require('./stage');
var auth = require('../stores/authenticate')
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

if (process.env.NODE_ENV == "prod")
	auth();

React.render(
	<EverGist/>, document.querySelector('#evergist')
)
