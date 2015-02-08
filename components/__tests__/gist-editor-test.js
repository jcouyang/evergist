jest.dontMock('../gist-editor')
  .dontMock('../extend')
  .dontMock('../hidable')
  .dontMock('../markdown-preview');
var when = require('when');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var extend = require('../extend');
var gist = require('../../stores/gist');

CodeMirror = jest.genMockFunction();
var CodeMirrorEditor = require('../codemirror');
var Markdown = require('../markdown-preview');
TestUtils.mockComponent(CodeMirrorEditor);

extend(window, require('mori'));

describe('GistEditor', function(){
  var markdown = require('../../stores/markdown');
  markdown.mockReturnValue(when('<h1>markdown</h1>'));
  
  var GistEditor = require('../gist-editor');
  var files =  toClj([
    {
      "filename": "config.json",
      "type": "application/json",
      "language": "JSON",
      "raw_url": "https://hehe",
      "size": 17063
    },
    {
      "filename": "config.md",
      "type": "application/markdown",
      "language": "Markdown",
      "raw_url": "https://hehe2",
      "size": 17063
    }

  ]);
	it('render gist editor', function(){
    var files_expected =  toClj([
      {
        "filename": "config.json",
        "type": "application/json",
        "language": "JSON",
        "raw_url": "https://hehe",
        "size": 17063,
        "content": '*markdown*'
      },
      {
        "filename": "config.md",
        "type": "application/markdown",
        "language": "Markdown",
        "raw_url": "https://hehe2",
        "size": 17063,
        "content": '*markdown*'
      }

    ]);

    gist.raw.mockReturnValue(when('*markdown*'));
    var gistEditor = TestUtils.renderIntoDocument(
        <GistEditor gistId="1234" files={files} display={true}/>
    );
    jest.runAllTicks();
    var codeMirror = TestUtils.scryRenderedComponentsWithType(gistEditor, CodeMirrorEditor);
    expect(codeMirror.length).toEqual(2);
    expect(equals(gistEditor.state.files, files_expected)).toBeTruthy();
	});

  it('click to show markdown preview',function(){
    var gistEditor = TestUtils.renderIntoDocument(
        <GistEditor gistId="1234" files={files} display={true}/>
    );
    jest.runAllTicks();
    var button = TestUtils.scryRenderedDOMComponentsWithTag(gistEditor, 'button');
    TestUtils.Simulate.click(button[0]);
    jest.runAllTicks();
    expect(gistEditor.state.preview).toEqual(true);
    var preview = TestUtils.findRenderedComponentWithType(gistEditor, Markdown);    
    
    expect(preview.getDOMNode().innerHTML).toEqual('<h1>markdown</h1>');
  });
});

















