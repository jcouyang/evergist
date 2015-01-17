var React = require('react'),
mui = require('material-ui'),
{Menu, MenuItem, LeftNav, Icon} = mui

var NavMenu = React.createClass({
  menuItems: [
    { payload: '/settings', text: 'SETTINGS', icon: 'action-settings' },
    { payload: '/logout', text: 'LOGOUT', icon: 'action-exit-to-app' }
  ],

  render: function() {
    var header = <img className="logo" src="assets/igist.png" width="80px"/>
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
  _handleClick: function(e, item, value) {
    window.location.hash=value.payload
  }
});

module.exports = NavMenu;
