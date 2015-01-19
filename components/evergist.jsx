var React = require('react'),
$E = require('./event');
var {Router} = require('director'),
Settings = require('./settings'),
Stage = require('./stage'),
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
  .then((token)=>userStore(token.access_token))
           .then(()=>React.render(<Stage/>, igist))
           .catch(()=>{
    console.error('auth error');
    router.setRoute('/login')
           })  
}
router.configure().init('/');
