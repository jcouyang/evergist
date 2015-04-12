var React = require('react'),
Hidable = require('./hidable'),
Loading = require('./loading'),
Markdown = require('./markdown-preview'),
gist = require('../stores/gist'),
{Snackbar, Paper, Toolbar, IconButton, ToolbarGroup} = require('material-ui'),
NewGist = require('./new-gist'),
when = require('when');
var markdown = require('../stores/markdown');

var isMarkdown = fnil((x)=>RegExp('markdown','ig').test(x), '');
var GistEditor = React.createClass({
  files: {},
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    gistId: React.PropTypes.string.isRequired,
    files: React.PropTypes.object.isRequired,
    display: React.PropTypes.bool
  },
  getInitialState: function() {
		return {
      loading: true,
	    preview: false,
      files: vector()
    };
	},
  fetchRawContent: function() {
    when.all(intoArray(map(file=>gist.raw(get(file,'raw_url')), this.props.files)))
        .then(partial(map,content=>hashMap('content', content)))
        .then(partial(map, merge, this.props.files))
        .then(data=>this.setState({files:data,
                                   loading: false}));
  },
  render: function(){
    var editors = map((file)=>{
      var content;
      if(this.state.preview && isMarkdown(get(file,'language'))){
        content = <Markdown markdown={file.content}/>;
      } else {
        content = <NewGist file={file}
                           forceUpdate={true}
                           lineWrapping={true}
                           handleEditorChange={this._handleEditorChange}
                           ref={"codemirror"+get(file,'filename')}/>;
      }
      return (
        <div id={'editor-'+this.props.gistId}>
          {content}
        </div>
      );
    }, this.state.files);
    return (
      <Hidable display={this.props.display}>
        <Loading loading={this.state.loading}/>
        <Toolbar>
            <IconButton iconClassName={this.state.preview?'fa fa-pencil':'fa fa-eye'}
                        onClick={this._togglePreview}
                        className={isEmpty(filter(file=>isMarkdown(get(file, 'language')),this.props.files))?'hidden':''}/>
            <IconButton iconClassName='fa fa-floppy-o' onClick={this._saveGist}/>
        </Toolbar>
        {intoArray(editors)}
        <Snackbar ref="snackbar" message="saved!"/>
      </Hidable>
    )
  },
  _togglePreview: function(){
    this.setState({preview:!this.state.preview});
  },
  _saveGist: function(){
    gist.save(this.props.gistId, JSON.stringify({files:this.files}))
      .then(this.refs.snackbar.show);
  },
  _handleEditorChange: function(filename, value) {
    this.files[filename] = {
      filename: filename,
      content: value
    }
  }
});

module.exports = GistEditor;
