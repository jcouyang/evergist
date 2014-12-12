var React = require('react'),
mui = require('material-ui'),
LeftNav = mui.LeftNav,
MenuItem = mui.MenuItem,
Icon = mui.Icon;
menuItems = [
  { route: 'new-gist', text: 'NEW GIST',icon:'content-add' },
  { route: 'search', text: 'SEARCH', icon: 'action-search' },
  { route: 'stars', text: 'STARS', icon: 'action-grade' },
  { route: 'tags', text: 'TAGS', icon: 'image-style' },
];

var NavMenu = React.createClass({

  render: function() {
    return (
      <LeftNav menuItems={menuItems} />
      
    );
  }

});

module.exports = NavMenu;
