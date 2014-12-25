var React = require('react'),
mui = require('material-ui'),
Dialog = mui.Dialog
var dialogActions = [
  { text: 'CANCEL' },
  { text: 'SUBMIT', onClick: this._onDialogSubmit }
];
var LoginDialog = React.createClass({
  render: function(){
    return (
      <Dialog title="Title" actions={dialogActions} dangerouslySetInnerHTML={{__html: '<div>heheda</div><iframe src="http://google.com"></iframe>'}}>
      </Dialog>      
    )
  }
})

module.exports = LoginDialog
