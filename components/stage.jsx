var GistList = require('./gist-list'),
React = require('react')


var layout = {
  browseView: {
    list: "small-12 medium-7 medium-offset-1 large-12",
    detail: "medium-1 large-3 hidden "
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
      <div className="stage" onClick={this._displayGistDetail.bind(this,false)}>
        <GistList showDetail={this._displayGistDetail} layout={this.state.layout.list}/>
      </div>      
    )
  },
  
  _displayGistDetail: function(show, id){
    if(show){
      this.setState({layout:layout.editView})   
    }
    else{
      this.setState({layout:layout.browseView})
    }
  }
})

module.exports = Stage;
