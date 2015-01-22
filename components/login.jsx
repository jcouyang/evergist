var React = require('react'),
$E = require('./event'),
mui = require('material-ui'),
{Dialog, RaisedButton} = mui,
auth = require('../stores/authenticate'),
Stage = require('./stage');
var LoginDialog = React.createClass({
  actions: function(){
    console.log(this)
    return {
      login:[
        { text: 'LOGIN WITH GITHUB', onClick: this._onRedirectToAuth },
        { text: 'ABOUT', onClick: this._onRedirectToAbout}
      ],
      confirm: [
        { text: 'CONFIRM', onClick: ()=>{
          $E.trigger('dialog.confirm', this.state.id)
          this.refs.dialog.dismiss();
        }},
        { text: 'CANCEL'}
      ]
    }
  },
  getInitialState: function(){
    return {
      id: '',
      title: "!gist",
      actions: []
    }
  },
  render: function(){
    return (
    	<div className="home-page-hero full-width-section">
        <img src="assets/igist.png" />
        <div className="tagline">
          <h1 className="brand-name">!gist</h1>
          <RaisedButton className="demo-button" label="Login GitHub" onTouchTap={this._onRedirectToAuth} />
          <RaisedButton className="github-button" label="Login GitHub Enterpise" linkButton={true} href="https://github.com/callemall/material-ui" />
        </div>
      </div>
	  )
  },
  componentDidMount: function(){
    $E.on('dialog.showConfirm', this._onShowConfirm)
  },
  _onRedirectToAbout: function(){
    window.location.href = "/about";
  },
  _onConfirm: function(){
    $E.trigger('dialog.confirm', true)
  },
  _onShowConfirm: function(data){
    this.setState({actions:this.actions().confirm, title: data.title, id:data.id});
    this.refs.dialog.show();
  },
  _onRedirectToAuth: function(){
    if (process.env.NODE_ENV == "production")
      window.location.href = "https://github.com/login/oauth/authorize?client_id=f595ed9c6c53f4cb4257&scope=gist"
    else
      window.location.href = "/?code=AUTH_DONE_DA"
  }
})

module.exports = LoginDialog
