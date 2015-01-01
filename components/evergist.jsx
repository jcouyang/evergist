var React = require('react'),
LoginDialog = require('./login');
$E = require('./event')
var auth = require('../stores/authenticate')

var EverGist = React.createClass({

  render: function() {
    return (
        <div>
          <div id="stage"></div>
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
