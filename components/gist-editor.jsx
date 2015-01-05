var React = require('react'),
im = require('immutable'),
Map= im.Map,
{Paper, Toolbar, IconButton} = require('material-ui'),
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
var GistEditor = React.createClass({
  getInitialState: function() {
		return loadingState
	},
  componentDidMount: function(){
    var languages = this.props.files.map((file,name)=>{
      var language = file.get('language')
      if(language){
        language = language.toLowerCase()
        yepnope('javascripts/vendor/codemirror/mode/'+ language+ '/'+ language +'.js')
        return language
      }
    })
    this.setState({languages:languages})
    this._fetchGist(this.props.gistId)
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
          <textarea className="gist-textarea" value={content} data-language={file.get('language')||''} data-filename={file.get('filename')}>
          </textarea>)
      }).toArray();
      console.log(editors)
    }
    return (
      <div>
        <div className={"loading " + (this.state.loading?"":"hidden") }>
          <img width="100%" src="http://jxnblk.com/loading/loading-cylon-red.svg"/>
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
    this.setState(loadingState)
    // this._fetchGist(nextProps.gistId)
  },
  componentDidUpdate: function(){
    im.List(document.querySelectorAll('.CodeMirror')).forEach((cd)=>{
      cd.remove();
    })
    if(this.state.preview){
    }else{
      this.codemirrors = im.List(document.querySelectorAll('#editor-'+this.props.gistId+' .gist-textarea')).map((textarea)=>{
        var language = textarea.dataset.language||''
        var codemirror = CodeMirror.fromTextArea(textarea, {lineWrapping: true, mode: language.toLowerCase()});
        codemirror.on('change',this._handleChange.bind(this,textarea.dataset.filename))
        return codemirror
      })
      console.log(this.codemirrors.toArray(),'codemirrors')
    }
  },
  _handleChange: function(filename,codemirror){
    this.setState({editedGist: this.props.setIn([filename,'content'], codemirror.getValue())})
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
    gist.save(this.props.gistId, this.state.editedGist.toJS()).then(this.props.onSave)
  },
  _togglePreview: function(){
    this.setState({preview:!this.state.preview},()=>{
      if(this.state.preview){
        when.all(this.codemirrors.map((codemirror)=>{
          return markdown(JSON.stringify({text:codemirror.getValue()}))
        }).toArray()).then((data)=>{
          console.log(data)
          this.setState({markdowns:im.List(data)})
        })
      }
    })
  }
});

module.exports = GistEditor;
