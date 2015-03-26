var React = require('react'),
NewGist = require('./new-gist'),
Stage = require('./stage');
var NewGistPage = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  render: function(){
    return (
      <Stage displaySearch={true} onSearch={this._handleSearch} displayLeftNav={true}
             leftIcon={<i className="fa fa-arrow-left" onClick={this._back}></i>}>
        <div className="gist-list">
          <div className="list-container">
            <NewGist className="create-gist" description={this.search}/>
          </div>
        </div>
      </Stage>
    )
  },
  _back: function(){
    history.back();
  }
})
module.exports = NewGistPage;
