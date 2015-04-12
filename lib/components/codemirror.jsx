var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Types = React.PropTypes;
var im = require('immutable');
CodeMirror.modeURL = "javascripts/vendor/codemirror/mode/%N/%N.js";
var CodeMirrorEditor = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    mode: Types.string,
    readOnly: Types.bool,
    onChange: Types.func
  },
  componentDidMount: function(){
    this._renderCoderMirror();
  },
  componentDidUpdate: function(newProps) {
    if(this.props.forceUpdate===true){
      this._removeOldCodemirror()
    }
    this._renderCoderMirror();
  },
  getEditor: function(){
    return this.codemirror;
  },
  render: function() {
    return (
      <div ref='editorWrapper'>
        <textarea ref='editor'>
          {this.props.value}
        </textarea>
      </div>
    )
  },
  _removeOldCodemirror: function(){
    im.List(this.refs.editorWrapper.getDOMNode().querySelectorAll('.CodeMirror')).forEach(cd=>{
      cd.remove();
    })
  },
  _renderCoderMirror: function(){
    let codemirror = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), this.props);
    let mode = this.props.mode;
    if(mode){
      codemirror.setOption('mode', mode.mode);
      CodeMirror.autoLoadMode(codemirror, mode);
    }
    codemirror.on('change',codemirror=>{
      this.props.onChange(this.props.filename,codemirror.getValue())
    })
    return codemirror;
  }
});
module.exports = CodeMirrorEditor;
