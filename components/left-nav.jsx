var React = require('react'),
mui = require('material-ui'),
{Menu, MenuItem, LeftNav, Icon,DropDownMenu} = mui


var NavMenu = React.createClass({
  getInitialState: function(){
    return {
      avatar: JSON.parse(localStorage.user)[0].avatar_url
    }
  },
  menuItems: [
    { payload: '/settings', text: 'SETTINGS', icon: 'action-settings' },
    { payload: '/logout', text: 'LOGOUT', icon: 'action-exit-to-app' }
  ],
  _getUsers: function(){
    return JSON.parse(localStorage.user).map((user)=>{
      return {payload: user, text: user.login}
    })
  },
  render: function() {
    var header = (
      <div>
        <img className="logo" src={this.state.avatar} width="60px"/>
        <DropDownMenu menuItems={this._getUsers()} onChange={this._handleUserChange}/>
      </div>
    )
    return (
      <div className="left-nav hide-for-small-only medium-1 large-2 columns">

        <LeftNav 
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        header={header}
        menuItems={this.menuItems}
        onChange={this._handleClick}/>
      </div>
    );
  },
  toggle: function(){
    this.refs.leftNav.toggle()
  },
  _handleUserChange: function(e, _, item){
    console.log(item.payload)
    this.setState({avatar:item.payload.avatar_url})
    localStorage.currentUser = item.payload
  },
  _handleClick: function(e, item, value) {
    window.location.hash=value.payload
  }
});

module.exports = NavMenu;
