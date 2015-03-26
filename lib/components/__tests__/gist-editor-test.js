jest.dontMock('../gist-editor')
  .dontMock('../../extend')
  .dontMock('../hidable')
  .dontMock('../markdown-preview');
var when = require('when');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var extend = require('../../extend');
var gist = require('../../stores/gist');

CodeMirror = jest.genMockFunction();
var Markdown = require('../markdown-preview');
extend(window, require('mori'));
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
var CodeMirrorEditor;
var markdown;
var GistEditor;

CodeMirrorEditor = require('../codemirror');
GistEditor = require('../gist-editor');
markdown = require('../../stores/markdown');


describe('GistEditor', function(){

  beforeEach(function(){
    TestUtils.mockComponent(CodeMirrorEditor);
    markdown.mockReturnValue(when('<h1>markdown</h1>'));
  });

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
    gistEditor.fetchRawContent();
    jest.runAllTicks();
    var codeMirror = TestUtils.scryRenderedComponentsWithType(gistEditor, CodeMirrorEditor);
    expect(codeMirror.length).toEqual(2);
    expect(equals(gistEditor.state.files, files_expected)).toBeTruthy();
	});

  it('click to show markdown preview',function(){
    var gistEditor = TestUtils.renderIntoDocument(
        <GistEditor gistId="1234" files={files} display={true}/>
    );
    gistEditor.fetchRawContent();
    jest.runAllTicks();
    var button = TestUtils.scryRenderedDOMComponentsWithTag(gistEditor, 'button');
    TestUtils.Simulate.click(button[0]);
    jest.runAllTicks();
    expect(gistEditor.state.preview).toEqual(true);
    var preview = TestUtils.findRenderedComponentWithType(gistEditor, Markdown);

    expect(preview.getDOMNode().innerHTML).toEqual('<h1>markdown</h1>');
  });

  it('save gist when click save', function(){
    var gistEditor = TestUtils.renderIntoDocument(
        <GistEditor gistId="1234" files={files} display={true}/>
    );
    gistEditor.fetchRawContent();
    var editor = {
      getEditor:function(){
        return {
          getValue: function(){
            return 'the very content';
          }
        };
      }
    };
    jest.runAllTicks();
    gistEditor.refs={
      'codemirrorconfig.json': editor,
      'codemirrorconfig.md': editor
    };
    jest.runAllTicks();
    var button = TestUtils.scryRenderedDOMComponentsWithTag(gistEditor, 'button');
    TestUtils.Simulate.click(button[1]);
    jest.runAllTicks();
    expect(gist.save)
      .toBeCalledWith('1234',
                      JSON.stringify({
                        files: [
                          {
                            "filename": "config.json",
                            "type": "application/json",
                            "language": "JSON",
                            "raw_url": "https://hehe",
                            "size": 17063,
                            "content": 'the very content'
                          },
                          {
                            "filename": "config.md",
                            "type": "application/markdown",
                            "language": "Markdown",
                            "raw_url": "https://hehe2",
                            "size": 17063,
                            "content": 'the very content'
                          }
                        ]}));
  })
});
