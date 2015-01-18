var React = require('react'),
$E = require('./event');
var {Router} = require('director'),
Settings = require('./settings'),
Stage = require('./stage'),
LoginDialog =require('./login'),
auth = require('../stores/authenticate')

var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

var igist = document.querySelector('#evergist')

var router = Router({
  '/': function(){
    console.log('home page')
    homepage()
    
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

function homepage(){
  auth()
           .then(()=>React.render(<Stage/>, igist))
           .catch((data)=>{
    console.error('auth error', data);
    router.setRoute('/login')
           })  
}
router.configure().init('/');
