var React = require('react'),
AppLeftNav = require('./left-nav'),

{Input,Checkbox,RaisedButton,AppBar, AppCanvas, Paper} = require('material-ui');

var Settings = React.createClass({
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
  _saveSettings: function(e, payload){
  }
})

module.exports = Settings
