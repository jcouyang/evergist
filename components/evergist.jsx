var React = require('react'),
LoginDialog = require('./login');
$E = require('./event');
var {Router} = require('director'),
auth = require('../stores/authenticate')

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

var routes = {
  
};

var router = Router({
  '/': function(){
    console.log('home page')
    React.render(
       <EverGist/>, document.querySelector('#evergist')
    )
  },
  '/login': function(){
    React.render(
      <LoginDialog/>, document.querySelector('#evergist')
    )
  },
  '/settings': function(){
    
  }
});

router.configure().init('/');
