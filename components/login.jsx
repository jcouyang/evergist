var React = require('react'),
mui = require('material-ui'),
Dialog = mui.Dialog,
auth = require('../stores/authenticate')
var LoginDialog = React.createClass({
  render: function(){
    var dialogActions = [
      { text: 'LOGIN WITH GITHUB', onClick: this._onRedirectToAuth },
      { text: 'ABOUT', onClick: this._onRedirectToAbout}
    ];

    return (
    	<Dialog ref="dialog" actions={dialogActions}>
    	  igist is designed for managing Github gists.
		  </Dialog>
	  )
  },
  componentDidMount: function(){
	  auth().then(()=>console.log('token got')).catch((data)=>this.refs.dialog.show())
  },
  _onRedirectToAbout: function(){
    window.location.href = "/about";
  },
  _onRedirectToAuth: function(){
    if (process.env.NODE_ENV == "production")
      window.location.href = "https://github.com/login/oauth/authorize?client_id=005a3ed2cec4cb179828&scope=gist"
    else
      window.location.href = "/?code=AUTH_DONE_DA"
  }
})

module.exports = LoginDialog
