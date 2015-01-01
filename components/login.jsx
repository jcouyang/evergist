var React = require('react'),
mui = require('material-ui'),
Dialog = mui.Dialog,
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
    	<Dialog ref="dialog" actions={this.state.actions} title={this.state.title}>
		  </Dialog>
	  )
  },
  componentDidMount: function(){
	  auth()
      .then(()=>React.render(<Stage/>, document.querySelector('#stage')))
      .catch((data)=>{
      console.error(data);
      this.setState({title: data, actions:this.actions().login})
      this.refs.dialog.show();
      })
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
