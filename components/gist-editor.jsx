var React = require('react'),
Hidable = require('./hidable'),
Loading = require('./loading'),
Markdown = require('./markdown-preview'),
gist = require('../stores/gist'),
{Snackbar, Paper, Toolbar, IconButton, ToolbarGroup} = require('material-ui'),
CodeMirrorEditor = require('./codemirror'),
when = require('when');
var markdown = require('../stores/markdown');
var loadingState = {
};

var GistEditor = React.createClass({
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
  componentDidMount: function() {
    when.all(intoArray(map(file=>gist.raw(get(file,'raw_url')), this.props.files)))
        .then(partial(map,content=>hashMap('content', content)))
        .then(partial(map, merge, this.props.files))
        .then(data=>this.setState({files:data}));
  },
  render: function(){
    var editors = map((file)=>{
      var content;
      if(this.state.preview && get(file,'language').match(/markdown/ig)){
        content = <Markdown markdown={file.content}/>;
      } else {
        content = <CodeMirrorEditor value={file.content}
                                    mode={get(file, 'language')}
                                    filename={get(file, 'filename')}
                                    forceUpdate={true}
                                    lineWrapping={true}
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
              <ToolbarGroup float="right" key={1}>
                <IconButton icon={this.state.preview?'image-edit':'image-remove-red-eye'}
                            onClick={this._togglePreview}
                            className={isEmpty(filter(file=>get(file,'language').match(/markdown/ig),this.state.files))?'':'hidden'}/>
                <IconButton icon='content-save' onClick={this._saveGist}/>
              </ToolbarGroup>
            </Toolbar>
        {intoArray(editors)}
      </Hidable>
    )
  },
  _togglePreview: function(){
    this.setState({preview:!this.state.preview});
  },
  _saveGist: function(){
    var updatedGists = map(file=>assoc(file,'content', this.refs['codemirror'+get(file,'filename')].getEditor().getValue()),
                           this.state.files);
    gist.save(this.props.gistId, JSON.stringify({files:toJs(updatedGists)}));
  }
});

module.exports = GistEditor;
