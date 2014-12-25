var React = require('react'),
NavMenu = require('./left-nav'),
LoginDialog = require('./login'),
Stage = require('./stage');
var auth = require('../stores/authenticate')

var EverGist = React.createClass({

  render: function() {
    return (
        <div>
            <NavMenu />
            <Stage />
            <LoginDialog/>
        </div>
    );
  },

  componentDidMount: function(){
    if (process.env.NODE_ENV == "prod")
	auth();
  }
});



React.render(
	<EverGist/>, document.querySelector('#evergist')
)
