var React = require('react'),
im = require('immutable'),
mui = require('material-ui'),
Paper = mui.Paper
var Map = im.Map;
var gist = require('../stores/gist')
var EditorToolbar = require('./edit-toolbar')
var loadingState = {
  loading: true,
  innerHtml: ''
};
var GistDetail = React.createClass({
  getInitialState: function() {
		return loadingState
	},
  render: function(){
    return (
      <div className={this.props.display?'':'hidden'}>
        <div className={"loading " + (this.state.loading?"":"hidden") }>
          <img width="100%" src="assets/loading.svg"/>
        </div>
        <div dangerouslySetInnerHTML={{
            __html: this.state.innerHtml
          }}>
        </div>
      </div>
    )
  },
  componentWillReceiveProps: function(nextProps){
    if(nextProps.display!==this.props.display&& nextProps.display)
      this._fetchGist(this.props.gistId)
  },
  _fetchGist: function(id){
    this.setState(loadingState)
      return gist.view(id).then((data)=>{
        console.log(data)
        this.setState({
          loading: false,
          innerHtml: data.get('div')
        })
      })
  }
});

module.exports = GistDetail;
