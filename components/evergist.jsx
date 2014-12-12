var React = require('react'),
NavMenu = require('./left-nav'),
GistCard = require('./gist-card')

var EverGist = React.createClass({

  render: function() {
    return (
      <div>
        <NavMenu />
        
        <GistCard />
        <GistCard />
      </div>
    );
  }

});
React.render(
	<EverGist/>, document.querySelector('#evergist')
)
