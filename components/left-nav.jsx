var React = require('react'),
mui = require('material-ui'),
{Menu, MenuItem, LeftNav, Icon} = mui,
menuItems = [
  { payload: '#/settings', text: 'SETTINGS', icon: 'action-settings' },
  { payload: '#/logout', text: 'LOGOUT', icon: 'action-exit-to-app' }
];

var NavMenu = React.createClass({

  render: function() {
    var header = <img className="logo" src="assets/igist.png" width="80px"/>;
    return (
      <div className="left-nav hide-for-small-only medium-1 large-2 columns">
        <LeftNav 
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        header={header}
        menuItems={menuItems}/>
      </div>
    );
  },
  toggle: function(){
    this.refs.leftNav.toggle()
  }

});

module.exports = NavMenu;
