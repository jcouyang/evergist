jest.dontMock('../gist-editor')
  .dontMock('../extend')
  .dontMock('../hidable')
  .dontMock('../markdown-preview');
var when = require('when');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var extend = require('../extend');
CodeMirror = jest.genMockFunction();
var CodeMirrorEditor = require('../codemirror');
TestUtils.mockComponent(CodeMirrorEditor);

extend(window, require('mori'));

describe('GistEditor', function(){
  var GistEditor = require('../gist-editor');
  var files =  toClj({
    "config.json": {
      "filename": "config.json",
      "type": "application/json",
      "language": "JSON",
      "raw_url": "https://gist.githubusercontent.com/anonymous/0cd746466cb454e65587/raw/da4b9af7655fcc3cdfc1186d34f336d6bd95d5d6/config.json",
      "size": 17063,
      "content": '{"div":"hehe"}'
    },
    "config.md": {
      "filename": "config.md",
      "type": "application/markdown",
      "language": "Markdown",
      "raw_url": "https://gist.githubusercontent.com/anonymous/0cd746466cb454e65587/raw/da4b9af7655fcc3cdfc1186d34f336d6bd95d5d6/config.md",
      "size": 17063,
      "content": "*gist detail content"
    }

  });
  var gistEditor = TestUtils.renderIntoDocument(
      <GistEditor gistId="1234" files={files} display={true}/>
  );
	it('render gist editor', function(){
    var codeMirror = TestUtils.scryRenderedComponentsWithType(gistEditor, CodeMirrorEditor);
    expect(codeMirror.length).toEqual(2);
	});
});

















