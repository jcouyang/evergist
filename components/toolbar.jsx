var mui = require('material-ui');
var PaperButton = mui.PaperButton;
var React = require('react');
var {Toolbar, ToolbarGroup, DropDownMenu} = mui;
var ToolbarMenu = React.createClass({
  render: function() {

    var filterOptions = [
      { payload: '1', text: 'All Gists' },
      { payload: '2', text: 'All Stared' },
      { payload: '3', text: 'All Forks' },
    ],
    iconMenuItems = [
      { payload: '1', text: 'Last Modified' },
      { payload: '2', text: 'More Info' }
    ];
    
    return (
      <div>
        <h3>400 gists</h3>
        <Toolbar>
          <ToolbarGroup key="0" float="left">
            <DropDownMenu menuItems={filterOptions}>
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }

});

module.exports = ToolbarMenu;
