jest.dontMock('../new-gist')
  .dontMock('codemirror')
  .dontMock('../codemirror');
CodeMirror = require('codemirror');
CodeMirror.modeInfo = [
    {name: "APL", mime: "text/apl", mode: "apl", ext: ["dyalog", "apl"]},
    {name: "Asterisk", mime: "text/x-asterisk", mode: "asterisk"},
    {name: "C", mime: "text/x-csrc", mode: "clike", ext: ["c", "h"]},
    {name: "C++", mime: "text/x-c++src", mode: "clike", ext: ["cpp", "c++", "hpp", "h++"], alias: ["cpp"]},
    {name: "Cobol", mime: "text/x-cobol", mode: "cobol", ext: ["cob", "cpy"]}
]

describe('new gist', function(){
  var React = require('react/addons');
	var im = require('immutable');
  var {DropDownMenu} = require('material-ui');
  var NewGist = require('../new-gist');
  var CodeMirrorEditor = require('../codemirror');
  var TestUtils = React.addons.TestUtils;
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
  })
});










