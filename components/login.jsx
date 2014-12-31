var React = require('react'),
mui = require('material-ui'),
Dialog = mui.Dialog,
auth = require('../stores/authenticate'),
Stage = require('./stage');
var LoginDialog = React.createClass({
  getInitialState: function(){
    return {
      title: "!gist"
    }
  },
  render: function(){
    var dialogActions = [
      { text: 'LOGIN WITH GITHUB', onClick: this._onRedirectToAuth },
      { text: 'ABOUT', onClick: this._onRedirectToAbout}
    ];

    return (
    	<Dialog ref="dialog" actions={dialogActions} title={this.state.title}>
    	  igist is designed for managing Github gists.
		  </Dialog>
	  )
  },
  componentDidMount: function(){
	  auth()
      .then(()=>React.render(<Stage/>, document.querySelector('#stage')))
      .catch((data)=>{
        this.setState({title: data})
        this.refs.dialog.show();
      })
  },
  _onRedirectToAbout: function(){
    window.location.href = "/about";
  },
  _onRedirectToAuth: function(){
    if (process.env.NODE_ENV == "production")
      window.location.href = "https://github.com/login/oauth/authorize?client_id=f595ed9c6c53f4cb4257&scope=gist"
    else
      window.location.href = "/?code=AUTH_DONE_DA"
  }
})

module.exports = LoginDialog
