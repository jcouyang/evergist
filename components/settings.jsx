var React = require('react'),
AppLeftNav = require('./left-nav'),
Stage = require('./stage'),
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
      <Stage onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}
             icon="hardware-keyboard-backspace">
        <Paper className="settings">
          <div  className="setting-form">
            <form>
              <h2>Settings</h2>
              <Input defaultValue="https://api.github.com" description="your api path if you'r using enterprice github" onChange={this._saveSettings.bind(this, 'apiUrl')}/>
              <Checkbox name="keep-me-login" checked={true} label="Keep Me Login" onClick={this._saveSettings.bind(this,'rememberMe')}/> <span>remember me</span>
            </form>
          </div>
        </Paper>
      </Stage>
    )
  },
  _saveSettings: function(key, e, payload){
    var settings = localStorage.settings || '{}'
    settings = JSON.parse(settings)
    settings[key] = payload
    localStorage.settings = JSON.stringify(settings);
  },
  _onMenuIconButtonTouchTap: function(){
    window.location.hash = '/'
  }
})

module.exports = Settings
