var React = require('react');
var Types = React.PropTypes;
var im = require('immutable');
var CodeMirrorEditor = React.createClass({
  propTypes: {
    mode: Types.string,
    value: Types.string,
    readOnly: Types.bool,
    onChange: Types.func
  },
  componentDidMount: function(){
    this._renderCoderMirror()
  },
  componentDidUpdate: function() {
    if(this.props.forceUpdate===true){
      this._removeOldCodemirror()
      this._renderCoderMirror()
    }else{
      var mode =CodeMirror.findModeByName(this.props.mode||'')
      if(mode){
        CodeMirror.autoLoadMode(this.codemirror, mode.mode)
        this.codemirror.setOption('mode', mode.mode)
      }
    }

  },
  render: function() {
    return (
      <div ref='editorWrapper'>
        <textarea ref='editor'
                  value={this.props.value}>
        </textarea>
      </div>
    )
  },
  _removeOldCodemirror: function(){
    im.List(this.refs.editorWrapper.getDOMNode().querySelectorAll('.CodeMirror')).forEach((cd)=>{
      cd.remove();
    })
  },
  _renderCoderMirror: function(){
    var codemirror = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), this.props);
    this.codemirror = codemirror
    var mode =CodeMirror.findModeByName(this.props.mode||'')
    if(mode){
      CodeMirror.autoLoadMode(codemirror, mode.mode)
      codemirror.setOption('mode', mode.mode)
    }
    codemirror.on('change',(codemirror)=>{
      this.props.onChange(this.props.filename,codemirror.getValue())
    })
  }
});
module.exports = CodeMirrorEditor;
