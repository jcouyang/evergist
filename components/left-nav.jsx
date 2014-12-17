var React = require('react'),
mui = require('material-ui'),
{Menu, MenuItem, LeftNav, Icon} = mui,
menuItems = [
  { payload: '1', text: 'NEW GIST',icon:'content-add' },
  { payload: '2', text: 'SEARCH', icon: 'action-search' },
  { payload: '3', text: 'STARS', icon: 'action-grade' },
  { payload: '4', text: 'TAGS', icon: 'image-style' },
];

var NavMenu = React.createClass({

  render: function() {
    return (
      <div className="left-nav hide-for-small-only medium-1 large-2 columns">
        <Menu  menuItems={menuItems} zDepth={0} />
      </div>
    );
  }

});

module.exports = NavMenu;
