var React = require('react'),
mori = require('mori'),
extend = require('./extend');
extend(window, mori);
window.$E = require('./event');

var {Router} = require('director'),
Settings = require('./components/settings'),
GistList = require('./components/gist-list'),
NewGistPage = require('./components/new-gist-page'),
LoginDialog =require('./components/login'),
user = require('./stores/user'),
auth = require('./stores/authenticate');

var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

var igist = document.querySelector('#evergist')



var router = Router({
  '/': function(){
    console.log('home page')
    homepage();
  },
  '/new': function(){
    React.render(
      <NewGistPage/>, igist
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
  },
  '/logout': function(){
    localStorage.removeItem('currentuser')
    window.location.ref='/'
  }
});

function homepage(){
  auth()
  .then(user)
  .then(()=>{
    React.render(<GistList/>, igist)
  })
  .catch((error)=>{
    console.error('auth error',error.message, error.stack);
    router.setRoute('/login')
  })
}
router.configure().init('/');
