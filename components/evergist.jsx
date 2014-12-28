var React = require('react'),
LoginDialog = require('./login'),
Stage = require('./stage');
var auth = require('../stores/authenticate')

var EverGist = React.createClass({

  render: function() {
    return (
        <div>
            <Stage />
            <LoginDialog/>
        </div>
    );
  }
});

var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

React.render(
	<EverGist/>, document.querySelector('#evergist')
)
