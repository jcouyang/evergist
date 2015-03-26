var React = require('react'),
$E = require('../event'),
mui = require('material-ui'),
{Input, Dialog, RaisedButton} = mui,
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
      actions: [],
      enterprise: false
    }
  },

  render: function(){
    return (
    	  <div className="home-page-hero full-width-section">
          <div className="tagline">
            <h1 className="brand-name">!gist</h1>
            <h2 className="brand-name">is for anything you wanna keep</h2>

            <div className="form-group">
              <div className={"enterprise" + (this.state.enterprise?'':' hidden')}>
                <Input type="input" name="username" className={this.enterprise} placeholder="username"/>
                <Input type="password" name="password" className={this.enterprise} placeholder="password"/>
                <Input type="url" name="url" className={this.enterprise} placeholder="https://your.github.com/api/v3"/>
              </div>
            <RaisedButton label="Login GitHub" onTouchTap={this._onRedirectToAuth} />
            <RaisedButton label="Login GitHub Enterpise" onTouchTap={this._handleEnterpriseLogin}/>
            </div>
          </div>

        </div>
	  )
  },
  componentDidMount: function(){
    $E.on('dialog.showConfirm', this._onShowConfirm)
  },
  _onConfirm: function(){
    $E.trigger('dialog.confirm', true)
  },
  _onRedirectToAuth: function(){
    if (process.env.NODE_ENV == "production")
      window.location.href = "https://github.com/login/oauth/authorize?client_id=f595ed9c6c53f4cb4257&scope=gist"
    else
      window.location.href = "/?code=AUTH_DONE_DA"
  },
  _handleEnterpriseLogin: function(){
    this.setState({
      enterprise: true
    })
  }
})

module.exports = LoginDialog
