var when = require('when');
jest.dontMock('../gist-card')
  .dontMock('../../extend')
  .dontMock('../gist-digest');
var extend = require('../../extend');
extend(window, require('mori'));
jest.setMock('../../stores/gist', {view: function(){return when(toClj({div:'hehe'}))}});
CodeMirror = require('codemirror');
describe('gist card', function(){
  var React = require('react/addons');
	var im = require('immutable');
  var Paper = require('material-ui').Paper;
  var GistCard = require('../gist-card');
  var GistDigest = require('../gist-digest');
  var GistDetail = require('../gist-detail');
  var TestUtils = React.addons.TestUtils;
  var gistCard;
  var gist = toClj({
    id: 1234,
    files: [],
  	description: "iam a title"
  });
  beforeEach(function(){
    TestUtils.mockComponent(GistDetail);
    gistCard = TestUtils.renderIntoDocument(
        <GistCard gist={gist} selected={false}/>
  	);
  });

	it('render to dom with title from gist description', function(){
  	var gistDigest = TestUtils.findRenderedComponentWithType(gistCard, GistDigest);
    expect(gistDigest).toBeDefined();
	});

  describe('when i hover on',function(){
    it('zdepth should be 1', function(){
  	  var paper = TestUtils.findRenderedDOMComponentWithClass(gistCard, 'gist-card');
      expect(paper.getDOMNode().className).toContain('mui-z-depth-0');
      TestUtils.Simulate.mouseOver(paper.getDOMNode());
      expect(paper.getDOMNode().className).toContain('mui-z-depth-1');
	  });
  });

  describe('when click cardlected', function(){
    it('click title show gist detail',function(){
      var checkItem = jest.genMockFunction();
      gistCard = TestUtils.renderIntoDocument(
          <GistCard gist={gist} selected={false} checkItem={checkItem}/>
  	  );
      // FIXME why not work when simulate click on child element?
  	  // var gistDigest = TestUtils.findRenderedDOMComponentWithClass(gistCard, 'gist-item');
      // TestUtils.Simulate.click(gistDigest.getDOMNode());
      gistCard._onTitleClick({stopPropagation:jest.genMockFn()});
      var gistDetail = TestUtils.findRenderedComponentWithType(gistCard, GistDetail);
      jest.runAllTicks();
      expect(checkItem).toBeCalled();
      expect(gistDetail.props.gistHtml).toEqual('hehe');
    })
  });
});
