var React = require('react'),
$E = require('./event'),
mori = require('mori'),
extend = require('./extend');
extend(window, mori);

var {Router} = require('director'),
Settings = require('./settings'),
GistList = require('./gist-list'),
// LoginDialog =require('./login'),
getUserInfo = require('../stores/user'),
auth = require('../stores/authenticate');

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
