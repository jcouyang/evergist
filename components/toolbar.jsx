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
    orderOptions = [
      { payload: '1', text: 'Recently updated' },
      { payload: '2', text: 'Least recently updated' },
      { payload: '3', text: 'Recently created' },
      { payload: '4', text: 'least recently created' },
    ];
    
    return (
      <div>
        <Toolbar className="toolbar">
          <ToolbarGroup key="0" float="left">
            <DropDownMenu menuItems={filterOptions}>
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup key="1" float="right">
            <DropDownMenu menuItems={orderOptions}>
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }

});

module.exports = ToolbarMenu;
