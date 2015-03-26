var React = require('react'),
CodeMirrorEditor = require('./codemirror'),
{DropDownMenu,
 Toolbar,
 Input,
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
}, toClj(CodeMirror.modeInfo))
var NewGist = React.createClass({
  public: false,
  getInitialState: function(){
    return {
      value: '',
      filaname: '',
      mode:''
    }
  },
  render: function(){
    return (
      <Paper className={this.props.className}>
        <Toolbar>
          <ToolbarGroup float="left" key={0}>
            <Input type="text" name="file-name" className="gist-file-name" onChange={this._handleInputChange} style={{height:'100%'}} placeholder="filename"/>
          </ToolbarGroup>
          <ToolbarGroup float="left" key={1}>
            <DropDownMenu menuItems={toJs(languages)}
                          autoWidth={false}
                          className="language-dropdown"
                          ref="dropdown"
                          onChange={this._handleDropDownChange}/>

          </ToolbarGroup>
          <ToolbarGroup float="right" key={2}>
            <Toggle onToggle={this._handleToggle}/> public
          </ToolbarGroup>
            <IconButton icon='content-save' onClick={this._handleSave}/>
        </Toolbar>
        <CodeMirrorEditor mode={this.state.mode} filename={this.state.filename} onChange={this._handleEditorChange}></CodeMirrorEditor>
        <Snackbar ref="snackbar" message="saved!"/>
      </Paper>
    )
  },
  _handleInputChange: function(e,value){
    console.debug(value,e)
    this.filename = value
    var ext = value.split('.').pop()
    console.debug(ext,CodeMirror.findModeByExtension(ext))
    if(ext && CodeMirror.findModeByExtension(ext)){
      var mode = CodeMirror.findModeByExtension(ext)
      var index = CodeMirror.modeInfo.indexOf(mode)
      console.debug(index)
      if(mode.mode){
        this.setState({mode:mode.mode})
        this.refs.dropdown.setState({selectedIndex:index})
        console.debug(this.refs.dropdown.state)
      }
    }

  },
  _handleDropDownChange: function(e,_,payload){
    if(payload){
      this.setState({mode:payload.mode})
    }
  },
  _handleEditorChange: function(filename, value){
    this.value=value;
  },
  _handleToggle: function(e, value){
    this.public=value
  },
  _handleSave: function(){
    console.debug(this.filename,this.value)
    if(!this.value)return
    var files = {}
    files[this.filename] = {
      content: this.value
    }
    gist.create(JSON.stringify({
      description: this.props.description,
      public: this.public,
      files: files
    })).then(()=>{
      setTimeout(this.refs.snackbar.dismiss,2000)
      this.refs.snackbar.show()})
  }
})
module.exports = NewGist