var GistList = require('./gist-list'),
React = require('react'),
GistDetail = require('./gist-detail')

var layout = {
  browseView: {
    list: "small-12 medium-6 large-4 large-offset-2 ",
    detail: "medium-2 large-4 hidden "
  },
  editView: {
    list: "smail-12 medium-3 large-4 ",
    detail: "medium-2 large-6 "
  }
}

var Stage = React.createClass({
  getInitialState: function(){
    return {
      layout: layout.browseView
    }
  },
  render: function(){
    return (
      <div className="stage">
        <GistList showDetail={this._displayGistDetail} layout={this.state.layout.list}/>
        <GistDetail layout={this.state.layout.detail}/>
      </div>      
    )
  },
  
  _displayGistDetail: function(show){
    this.setState({layout:layout.editView})
  }
})

module.exports = Stage;
