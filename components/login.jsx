var React = require('react'),
mui = require('material-ui'),
Dialog = mui.Dialog
var dialogActions = [
  { text: 'LOGIN WITH GITHUB', payload: "https://github.com/login/oauth/authorize?client_id=005a3ed2cec4"},
  { text: 'ABOUT', payload: 'https://github.com/callemall/material-ui'}
];
var LoginDialog = React.createClass({
  render: function(){
    return (
    	<Dialog ref="dialog" actions={dialogActions}>
    	 igist is designed for managing Github gists.
		</Dialog>
	)
  },
  componentDidMount: function(){
    if (process.env.NODE_ENV === "prod" && !auth())
	  this.refs.dialog.show();
  }
})

module.exports = LoginDialog
