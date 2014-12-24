var GistList = require('./gist-list'),
React = require('react'),
GistDetail = require('./gist-detail')

var layout = {
  browseView: {
    list: "small-12 medium-6 medium-offset-1 large-4 large-offset-2 ",
    detail: "medium-2 large-4 hidden "
  },
  editView: {
    list: "smail-12 medium-4 large-4 ",
    detail: "hide-for-small-only medium-7 large-6 "
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
        <div id="gist-detail"></div>
      </div>      
    )
  },
  
  _displayGistDetail: function(show, id){
    this.setState({layout:layout.editView})
    React.render(
      <GistDetail layout={layout.editView.detail} gistId={id}/>,
      document.querySelector('#gist-detail')
    )
  }
})

module.exports = Stage;
