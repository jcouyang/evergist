var React = require('react'),
im = require('immutable'),
mui = require('material-ui'),
Paper = mui.Paper
var Map = im.Map;
var gist = require('../stores/gist')
var EditorToolbar = require('./edit-toolbar')
var GistDetail = React.createClass({
  getInitialState: function() {
		return {
			gist: Map()
		}
	},
  componentDidMount: function(){
    gist('6365feec88bf86a4ae59').then((data)=>{
      this.setState({
        gist: data
      })
    })
  },
  render: function(){
    return (
      <div className={this.props.layout + "gist-detail columns"}>
        <EditorToolbar/>
        <div id="gist">
          {this.state.gist.get('files')}
        </div>
      </div>
    )
  }
});

module.exports = GistDetail;
