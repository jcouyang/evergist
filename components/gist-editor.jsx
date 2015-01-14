var React = require('react'),
im = require('immutable'),
Map= im.Map,
{Paper, Toolbar, IconButton} = require('material-ui'),
CodeMirrorEditor = require('./codemirror'),
when = require('when');
var Map = im.Map;
var gist = require('../stores/gist');
var markdown = require('../stores/markdown')
var loadingState = {
  loading: true,
	gists: [],
  editedGist: Map(),
  preview: false,
  markdowns: im.List(),
  languages: im.List()
};
CodeMirror.modeURL = "javascripts/vendor/codemirror/mode/%N/%N.js"

var GistEditor = React.createClass({
  getInitialState: function() {
		return loadingState
	},
  componentDidMount: function(){
    var languages = this.props.files.map((file,name)=>{
      var language = file.get('language')
      if(language){
        language = language.toLowerCase()
        return language
      }
    })
    this.setState({languages:languages})
  },
  render: function(){
    var editors;
    if(this.state.preview){
      editors = this.state.markdowns.map((markdown)=>{
        return (
          <div dangerouslySetInnerHTML={{__html: markdown}}>
          </div>)
        }).toArray()
    }else{
      editors = this.props.files.toIndexedSeq().map((file, index)=>{
        var content = this.state.gists[index]
        return (
          <CodeMirrorEditor value={content}
                            mode={file.get('language')}
                            onChange={this._handleChange}
                            filename={file.get('filename')}
                            forceUpdate={true}/>)
      }).toArray();
    }
    return (
      <div className={this.props.display?'':'hidden'}>
        <div className={"loading " + (this.state.loading?"":"hidden") }>
          <img width="100%" src="assets/loading.svg"/>
        </div>
        <Toolbar>
          <IconButton icon={this.state.preview?'image-edit':'image-remove-red-eye'} onClick={this._togglePreview}
                      className={this.state.languages.contains('markdown')?'':'hidden'}/>
          <IconButton icon='content-save' onClick={this._saveGist} className={this.state.preview?'hidden':''}/>
        </Toolbar>
        <div id={'editor-'+this.props.gistId}>
          {editors}
        </div>
      </div>
    )
  },
  componentWillReceiveProps: function(nextProps){
    if(nextProps.display!==this.props.display&& nextProps.display){
      this.setState(loadingState)
      this._fetchGist(this.props.gistId)
    }
  },
  componentDidUpdate: function(){
  },
  _handleChange: function(filename, value){
    this.editedGist = this.props.files.setIn([filename,'content'], value)
  },
  _fetchGist: function(id){
    return when.all(this.props.files.map((file)=>gist.raw(file.get('raw_url'))).toArray())
               .then((data)=>{
      this.setState({
        loading: false,
        gists: data
      })
               })
  },
  _saveGist:function(){
    var updatedGist = this.editedGist
    if(updatedGist)
      gist.save(this.props.gistId, JSON.stringify({files:updatedGist.toJS()}))
  },
  _togglePreview: function(){
    this.setState({preview:!this.state.preview},()=>{
      if(this.state.preview){
        when.all(this.codemirrors.map((codemirror)=>{
          return markdown(JSON.stringify({text:codemirror.getValue()}))
        }).toArray()).then((data)=>{
          this.setState({markdowns:im.List(data)})
        })
      }
    })
  }
});

module.exports = GistEditor;
