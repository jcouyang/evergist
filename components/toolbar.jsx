var mui = require('material-ui');
var PaperButton = mui.PaperButton;
var React = require('react');
var {Toolbar, ToolbarGroup, DropDownMenu} = mui;
var ToolbarMenu = React.createClass({
  render: function() {
    var filterOptions = [
      { payload: 'all', text: 'Gists' },
      { payload: 'starred', text: 'Starred' },
      { payload: 'forked', text: 'Forked' },
    ]
    return (
      <div>
        <Toolbar className="toolbar">
          <ToolbarGroup key="0" float="right">
            <DropDownMenu className="filterOptions" menuItems={filterOptions} autoWidth={false} onChange={this._onFilterChange} ref="filter">
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  },
  _onFilterChange: function(e, key, option){
    this.props.onFilter(option.payload)
  }

});

module.exports = ToolbarMenu;
