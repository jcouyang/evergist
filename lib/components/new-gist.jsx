var React = require('react'),
CodeMirrorEditor = require('./codemirror'),
{DropDownMenu,
 Toolbar,
 TextField,
 IconButton,
 Paper,
 ToolbarGroup,
 Toggle,
 Snackbar} = require('material-ui'),
gist = require('../stores/gist');
var languages = map(language=>{
  return pipeline(
    language,
    curry(conj, hashMap('payload', get(language, 'mode'))),
    curry(conj, hashMap('text', get(language,'name')))
  )
}, toClj(CodeMirror.modeInfo));
var NewGist = React.createClass({
  propTypes: {
    file: React.PropTypes.object.isRequired
  },
  public: false,
  getInitialState: function(){
    var filename = get(this.props.file, 'filename');
    return {
      filename: filename,
      mode: this._findModeByFilename(filename)
    }
  },
  componentDidMount: function() {
    this._changeDropDownValueByMode(this.state.mode);
  },
  render: function(){
    return (
      <div className={this.props.className}>
        <Toolbar>
          <ToolbarGroup float="left" key={0}>
            <TextField defaultValue={this.state.filename} name="file-name" className="gist-file-name" onChange={this._handleInputChange} style={{height:'100%'}} placeholder="filename"/>
          </ToolbarGroup>
          <ToolbarGroup float="left" key={1}>
            <DropDownMenu menuItems={toJs(languages)}
                          autoWidth={false}
                          className="language-dropdown"
                          ref="dropdown"
                          onChange={this._handleDropDownChange}/>
          </ToolbarGroup>
        </Toolbar>
        <CodeMirrorEditor mode={this.state.mode}
                          value={get(this.props.file, 'content')||""}
                          filename={this.state.filename}
                          onChange={this.props.handleEditorChange}
                          forceUpdate={true}
                          autofocus={false}>
        </CodeMirrorEditor>
      </div>
    )
  },
  _handleInputChange: function(e){
    let value = e.currentTarget.value
    this.setState({filename:value});
    let ext = value.split('.').pop();
    if(ext){
      this._changeDropDownValueByMode(CodeMirror.findModeByExtension(ext))
    }
  },
  _changeDropDownValueByMode: function(mode) {
    if(mode){
      var index = CodeMirror.modeInfo.indexOf(mode);
      this.setState({mode:mode});
      this.refs.dropdown.setState({selectedIndex:index});
    }
  },
  _handleDropDownChange: function(e,_,payload){
    if(payload){
      this.setState({mode:payload.mode})
    }
  },
  _findModeByFilename: function(filename){
    var ext = filename&&filename.split('.').pop();
    return ext && CodeMirror.findModeByExtension(ext)
  }
})
module.exports = NewGist
