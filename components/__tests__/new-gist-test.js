jest.dontMock('../new-gist')
  .dontMock('../extend');
jest.setMock('../../stores/gist',jest.genMockFunction());
var extend = require('../extend');
extend(window, require('mori'));
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
CodeMirror =  jest.genMockFromModule('codemirror')
CodeMirror.findModeByName = jest.genMockFunction()
CodeMirror.prototype.on = jest.genMockFunction()
CodeMirror.modeInfo = [
    {name: "APL", mime: "text/apl", mode: "apl", ext: ["dyalog", "apl"]},
    {name: "Asterisk", mime: "text/x-asterisk", mode: "asterisk"},
    {name: "C", mime: "text/x-csrc", mode: "clike", ext: ["c", "h"]},
    {name: "C++", mime: "text/x-c++src", mode: "clike", ext: ["cpp", "c++", "hpp", "h++"], alias: ["cpp"]},
    {name: "Cobol", mime: "text/x-cobol", mode: "cobol", ext: ["cob", "cpy"]}
]
var CodeMirrorEditor = require('../codemirror');
TestUtils.mockComponent(CodeMirrorEditor,'div');
var NewGist = require('../new-gist');

describe('new gist', function(){
  var {DropDownMenu} = require('material-ui');
  var newgist = TestUtils.renderIntoDocument(
      <NewGist/>
  );
	it('render a dropdown menu', function(){
	  var title = TestUtils.findRenderedComponentWithType(newgist, DropDownMenu);
    expect(title.getDOMNode().textContent).toEqual('APLAPLAsteriskCC++Cobol');
	});

  it('render codemirror',function(){
    var title = TestUtils.findRenderedComponentWithType(newgist, CodeMirrorEditor);
    expect(title).toBeDefined();
  });
});
