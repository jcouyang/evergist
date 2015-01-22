var React = require('react'),
$E = require('./event');
var {Router} = require('director'),
Settings = require('./settings'),
GistList = require('./gist-list'),
LoginDialog =require('./login'),
userStore = require('../stores/user'),
auth = require('../stores/authenticate')

var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

var igist = document.querySelector('#evergist')

var router = Router({
  '/': function(){
    console.log('home page')
    homepage();
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
  .then(userStore)
  .then(()=>{
    React.render(<GistList/>, igist)
  })
  .catch((msg)=>{
    console.error('auth error',msg);
    router.setRoute('/login')
  })  
}
router.configure().init('/');
