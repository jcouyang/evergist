var React = require('react'),
im = require('immutable'),
mui = require('material-ui'),
Paper = mui.Paper
var Map = im.Map;
var gist = require('../stores/gist')
var EditorToolbar = require('./edit-toolbar')
var loadingState = {
	gist: im.fromJS({
    description: 'untitled',
    files: [{
      filename: "",
      content: "Loading"
    }]
  })
};
var GistDetail = React.createClass({
  getInitialState: function() {
		return loadingState
	},
  componentDidMount: function(){
    this._fetchGist(this.props.gistId)
  },
  render: function(){
    var detail = this.state.gist.get('div')
    return (
      <div className={this.props.layout + "gist-detail columns"}>
        <EditorToolbar title={this.state.gist.get('description')}/>
        <div id="gist">
        </div>
      </div>
    )
  },
  componentDidUpdate: function(prevProps, prevState){
    this.getDOMNode().querySelector('#gist').innerHTML = this.state.gist.get('div');
  },
  componentWillReceiveProps: function(nextProps){
    this.setState(loadingState)
   
    this._fetchGist(nextProps.gistId)
  },
  _fetchGist: function(id){
    return gist.view(id).then((data)=>{
      this.setState({
        gist: data
      })
    })
  }
  
});

module.exports = GistDetail;
