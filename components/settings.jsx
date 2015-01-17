var React = require('react'),
AppLeftNav = require('./left-nav'),
db = require('../stores/db'),
{Input,Checkbox,RaisedButton,AppBar, AppCanvas, Paper} = require('material-ui');

var Settings = React.createClass({
  componentDidMount: function(){
    db.settings.hook("updating",function(mods, primKey, obj, trans){
      console.log(mods, primKey, obj, trans)
    })
  },
  render: function(){
    return (
      <div className="stage">
        <AppCanvas predefinedLayout={1}>
          <AppBar className="mui-dark-theme" zDepth={0} title="!gist" onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}>
          </AppBar>
          <AppLeftNav ref="leftNav" />
          <div className="mui-app-content-canvas">
            <Paper className="settings">
              <div  className="setting-form">
              <form>
                <h2>Settings</h2>
                <Input ref="apiUrl" defaultValue="https://api.github.com" description="your api path if you'r using enterprice github" onChange={this._saveSettings}/>
                <Checkbox ref="keepLogin" name="keep-me-login" checked={true} label="Keep Me Login" onClick={this._saveSettings}/>
              </form>
              </div>
            </Paper>
          </div>
        </AppCanvas>
      </div>      
    )
  },
  _saveSettings: function(e, payload){
    console.log(this.refs.keepLogin.state.checked,this.refs.apiUrl.getValue())
    var [checked, url] = [this.refs.keepLogin.state.checked,this.refs.apiUrl.getValue()]
    db.settings.put({
      id:1,
      remember_me: checked,
      api_url: url
    }).then((data)=>{
      console.log('saved',data)
    }).catch((data)=>console.log.bind(window))
  }
})

module.exports = Settings
