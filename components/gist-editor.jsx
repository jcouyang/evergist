var React = require('react'),
im = require('immutable'),
Map= im.Map,
{Snackbar, Paper, Toolbar, IconButton, ToolbarGroup} = require('material-ui'),
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
  markdowns: im.List()
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
    if(!this.props.display)
      return <div></div>
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
                            forceUpdate={true}
                            lineWrapping={true}/>)
      }).toArray();
    }
    return (
      <div className={this.props.display?'':'hidden'}>
        <div className={"loading " + (this.state.loading?"":"hidden") }>
          <img width="100%" src="assets/loading.svg"/>
        </div>
        <Toolbar>
          <ToolbarGroup float="right" key={1}>
            <IconButton icon={this.state.preview?'image-edit':'image-remove-red-eye'}
                        onClick={this._togglePreview}
                        className={this.state.languages.contains('markdown')?'':'hidden'}/>
          <IconButton icon='content-save' onClick={this._saveGist} className={this.state.preview?'hidden':''}/>
          </ToolbarGroup>
        </Toolbar>
        <div id={'editor-'+this.props.gistId}>
          {editors}
        </div>
        <Snackbar ref="snackbar" message="saved!"/>
        <Snackbar ref="save_fail" message="problem when saving! try again"/>
      </div>
    )
  },
  componentWillReceiveProps: function(nextProps){
    if(nextProps.display!==this.props.display&& nextProps.display){
      this.setState(loadingState)
      this._fetchGist(this.props.gistId)
    }
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
          .then(()=>{
      setTimeout(this.refs.snackbar.dismiss,2000)
      this.refs.snackbar.show()
          })
          .catch(()=>{
      setTimeout(this.refs.snackbar.dismiss,2000)
      this.refs.save_fail.show()
          })
  },
  _togglePreview: function(){
    this.setState({preview:!this.state.preview},()=>{
      if(this.state.preview){
        when.all(markdown(JSON.stringify({text:this.editedGist})))
            .then((data)=>{
          this.setState({markdowns:im.List(data)})
        })
      }
    })
  }
});

module.exports = GistEditor;
