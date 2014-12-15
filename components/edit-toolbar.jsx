var mui = require('material-ui');
var PaperButton = mui.PaperButton;
var React = require('react');
var {PaperButton, Toolbar, ToolbarGroup, DropDownMenu, Icon} = mui;
var EditorToolbar = React.createClass({
  render: function() {
    var filterOptions = [
      { payload: '1', text: 'All Gists' },
      { payload: '2', text: 'All Stared' },
      { payload: '3', text: 'All Forks' },
    ]

    return (
      <div>
        <Toolbar className="toolbar">
          <h2>Title</h2>
          <ToolbarGroup float="right">
            <PaperButton label="EDIT"/>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }

});

module.exports = EditorToolbar;
