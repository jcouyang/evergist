var React = require('react'),
NavMenu = require('./left-nav'),
GistList = require('./gist-list')

var EverGist = React.createClass({

  render: function() {
    return (
      <div>
        <NavMenu />
        <GistList />
      </div>
    );
  }

});

React.render(
	<EverGist/>, document.querySelector('#evergist')
)
