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
  componentDidMount: function(){
    this._fetchGist(this.props.gistId)
  },
  render: function(){
    return (
      <div>
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
    this.setState(loadingState)
    this._fetchGist(nextProps.gistId)
  },
  _fetchGist: function(id){
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
