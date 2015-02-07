var React = require('react'),
Hidable = require('./hidable'),
Loading = require('./loading'),
Markdown = require('./markdown-preview'),
{Snackbar, Paper, Toolbar, IconButton, ToolbarGroup} = require('material-ui'),
CodeMirrorEditor = require('./codemirror'),
when = require('when');
var markdown = require('../stores/markdown');
var loadingState = {
  loading: true,
	gists: [],
  editedGist: Map(),
  preview: false,
  markdowns: []
};

var GistEditor = React.createClass({
  propTypes: {
    gistId: React.PropTypes.string.isRequired,
    files: React.PropTypes.object.isRequired,
    display: React.PropTypes.bool    
  },
  getInitialState: function() {
		return loadingState;
	},
  render: function(){
    var editors = map((file, index)=>{
      var content;
      if(this.state.preview && file.language.match(/markdown/ig)){
        content = <Markdown markdown={file.content}/>;
      } else {
        content = <CodeMirrorEditor value={file.content}
                                    mode={get(file, 'language')}
                                    onChange={this._handleChange}
                                    filename={get(file, 'filename')}
                                    forceUpdate={true}
                                    lineWrapping={true}/>;

      }
      return (
          <div id={'editor-'+this.props.gistId}>
            <Toolbar>
              <ToolbarGroup float="right" key={1}>
                <IconButton icon={this.state.preview?'image-edit':'image-remove-red-eye'}
                            onClick={this._togglePreview}
                            className={(file.language&&file.language.toLowerCase()==='markdown')?'':'hidden'}/>
                <IconButton icon='content-save' onClick={this._saveGist}/>
              </ToolbarGroup>
            </Toolbar>
            {content}
          </div>
        );
    }, vals(this.props.files));
    return (
      <Hidable display={this.props.display}>
        <Loading loading={this.state.loading}/>
        {intoArray(editors)}
      </Hidable>
    )
  }
});

module.exports = GistEditor;
