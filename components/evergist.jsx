var React = require('react'),
NavMenu = require('./left-nav'),
GistList = require('./gist-list')
ToolbarMenu = require('./toolbar')
var EverGist = React.createClass({

  render: function() {
    return (
      <div>
        <NavMenu />
        <GistList />
      <ToolbarMenu/>
      </div>
    );
  }

});
React.render(
	<EverGist/>, document.querySelector('#evergist')
)
