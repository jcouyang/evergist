var React = require('react'),
im = require('immutable'),
Map= im.Map,
{Paper, Toolbar, IconButton} = require('material-ui'),
when = require('when');
var Map = im.Map;
var gist = require('../stores/gist')
var loadingState = {
  loading: true,
	gists: [],
  editedGist: Map(),
  preview: false,
  markdown: '',
  languages: im.Seq()
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
      editors = (
        <div dangerouslySetInnerHTML={{__html: this.state.markdown}}>
        </div>
      )
    }else{
      editors = this.props.files.toIndexedSeq().map((file, index)=>{
        var content = this.state.gists[index]
        return (
          <textarea value={content} data-language={file.get('language')||''} data-filename={file.get('filename')}>
          </textarea>)
      }).toArray()
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
    this._fetchGist(nextProps.gistId)
  },
  componentDidUpdate: function(){
    if(this.state.preview){
      im.Seq(document.querySelectorAll('.CodeMirror')).forEach((cd)=>{
        cd.remove();
      })
    }else{
      im.Seq(document.querySelectorAll('#editor-'+this.props.gistId+' textarea')).forEach((textarea)=>{
        var language = textarea.dataset.language||''
        CodeMirror.fromTextArea(textarea, {lineWrapping: true, mode: language.toLowerCase()})
                  .on('change',this._handleChange.bind(this,textarea.dataset.filename))
      })
    }
  },
  _handleChange: function(filename,codemirror){
    console.log(codemirror.getValue(),filename,this.props.setIn([filename,'content'], codemirror.getValue()))
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
        this.setState({markdown:'hehe'})
      }
    })
  }
});

module.exports = GistEditor;
