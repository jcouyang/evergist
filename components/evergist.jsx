var React = require('react'),
LoginDialog = require('./login');
$E = require('./event');
var {Router} = require('director'),
Settings = require('./settings'),
GistList = require('./gist-list'),
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
var igist = document.querySelector('#evergist')
var router = Router({
  '/': function(){
    console.log('home page')
    React.render(
       <GistList/>, igist
    )
  },
  '/login': function(){
    React.render(
      <LoginDialog/>, igist
    )
  },
  '/settings': function(){
    React.render(
      <Settings/>, igist
    )
  }
});

router.configure().init('/');
