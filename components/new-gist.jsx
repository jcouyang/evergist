var React = require('react'),
CodeMirrorEditor = require('./codemirror'),
im = require('immutable'),
{DropDownMenu,Toolbar,Input,IconButton,Paper,ToolbarGroup} = require('material-ui'),
languages = im.fromJS(CodeMirror.modeInfo).map((language)=>language.set('payload',language.get('mode')).set('text',language.get('name')))

var NewGist = React.createClass({
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
            <DropDownMenu menuItems={languages.toJS()}
                          autoWidth={false}
                          className="language-dropdown"
                          ref="dropdown"
                          onChange={this._handleDropDownChange}/>
          </ToolbarGroup>
            <IconButton icon='content-save' onClick={this._handleSave}/>
        </Toolbar>
        <CodeMirrorEditor mode={this.state.mode} filename={this.state.filename} onChange={this._handleEditorChange}></CodeMirrorEditor>
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
  _handleSave: function(){
    console.debug(this.filename,this.value)
  }
})
module.exports = NewGist
