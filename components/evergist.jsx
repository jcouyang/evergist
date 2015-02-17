var React = require('react'),
$E = require('./event');
var {Router} = require('director'),
Settings = require('./settings'),
GistList = require('./gist-list'),
LoginDialog =require('./login'),
getUserInfo = require('../stores/user'),
auth = require('../stores/authenticate'),
mori = require('mori'),
extend = require('./extend');

var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

var igist = document.querySelector('#evergist')

extend(window, mori)

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
  },
  '/logout': function(){
    localStorage.removeItem('currentuser')
    window.location.ref='/'
  }
});

function homepage(){
  auth()
  .then(getUserInfo)
  .then(()=>{
    React.render(<GistList/>, igist)
  })
  .catch((error)=>{
    console.error('auth error',error.message, error.stack);
    router.setRoute('/login')
  })  
}
router.configure().init('/');
