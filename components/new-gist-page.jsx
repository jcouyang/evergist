var React = require('react'),
NewGist = require('./new-gist'),
Stage = require('./stage');
var NewGistPage = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  render: function(){
    return (
      <Stage displaySearch={true} onSearch={this._handleSearch} displayLeftNav={true}>
        <div className="gist-list">
          <div className="list-container">
            <NewGist className="create-gist" description={this.search}/>
          </div>
        </div>
      </Stage>
    )
  }
})
module.exports = NewGistPage;
