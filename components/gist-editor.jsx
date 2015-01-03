var React = require('react'),
im = require('immutable'),
mui = require('material-ui'),
Paper = mui.Paper,
when = require('when');
var Map = im.Map;
var gist = require('../stores/gist')
var loadingState = {
  loading: true,
	gists: []
};
var GistEditor = React.createClass({
  getInitialState: function() {
		return loadingState
	},
  componentDidMount: function(){
    this.props.files.map((file,name)=>{
      var language = file.get('language')
      if(language){
        language = language.toLowerCase()
        yepnope('javascripts/vendor/codemirror/mode/'+ language+ '/'+ language +'.js')        
      }
    })
    this._fetchGist(this.props.gistId)
  },
  render: function(){
    var editors = this.props.files.toIndexedSeq().map((file, index)=>{
      var content = this.state.gists[index]
      return (
        <textarea value={content} data-language={file.get('language')||''}>
        </textarea>)
    })
    return (
      <div>
        <div className={"loading " + (this.state.loading?"":"hidden") }>
          <img width="100%" src="http://jxnblk.com/loading/loading-cylon-red.svg"/>
        </div>
        <div id={'editor-'+this.props.gistId}>
          {editors.toArray()}
        </div>
      </div>
    )
  },
  componentWillReceiveProps: function(nextProps){
    this.setState(loadingState)
    this._fetchGist(nextProps.gistId)
  },
  componentDidUpdate: function(){
    im.Seq(document.querySelectorAll('#editor-'+this.props.gistId+' textarea')).forEach((textarea)=>{
      console.log(textarea.dataset.language)
      CodeMirror.fromTextArea(textarea, {lineWrapping: true, mode: textarea.dataset.language.toLowerCase()})      
    })
  },
  _fetchGist: function(id){
    return when.all(this.props.files.map((file)=>gist.raw(file.get('raw_url'))).toArray())
               .then((data)=>{
      this.setState({
        loading: false,
        gists: data
      })
               })
  }
});

module.exports = GistEditor;
