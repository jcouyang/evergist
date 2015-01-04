var when = require('when');
jest.dontMock('../gist-card');
jest.setMock('../gist-detail', jest.genMockFunction());
jest.setMock('../../stores/gist', when('hehe'));
describe('gist card', function(){
  var React = require('react/addons');
	var im = require('immutable');
  var Paper = require('material-ui').Paper;
  var GistCard = require('../gist-card');
  var TestUtils = React.addons.TestUtils;

	it('render to dom with title from gist description', function(){
  	var gist = im.fromJS({
  		description: "iam a title"
  	});
  	var gistCard = TestUtils.renderIntoDocument(
      <GistCard scrollTop={20} gist={gist} selected={false} setSelect={function(){}}/>
  	);
  	var title = TestUtils.findRenderedDOMComponentWithTag(gistCard, 'h3');
    expect(title.getDOMNode().textContent).toEqual('iam a title');
	});

  describe('when i hover on',function(){
    it('zdepth should be 2', function(){
  	  var gist = im.fromJS({
  		  description: "iam a title"
  	  });
  	  var gistCard = TestUtils.renderIntoDocument(
          <GistCard scrollTop={20} gist={gist} selected={false} setSelect={function(){}}/>
  	  );
  	  var paper = TestUtils.findRenderedDOMComponentWithClass(gistCard, 'gist-card');
      TestUtils.Simulate.mouseOver(paper.getDOMNode());
      expect(paper.getDOMNode().className).toContain('mui-z-depth-2');
	  });
  });
});
