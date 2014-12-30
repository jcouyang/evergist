jest.dontMock('../gist-card');
jest.setMock('../gist-detail', jest.genMockFunction())
describe('gist card', function(){
	it.only('render to dom with title from gist description', function(){
		var React = require('react/addons');
		var im = require('immutable')
    var Paper = require('material-ui').Paper
    var GistCard = require('../gist-card');
  	var TestUtils = React.addons.TestUtils;
  	var gist = im.fromJS({
  		description: "iam title"
  	})
  	var gistCard = TestUtils.renderIntoDocument(
      <GistCard scrollTop={20} gist={gist} selected={false} setSelect={function(){}}/>
  	)
    console.log(gistCard)
  	var paper = TestUtils.findRenderedDOMComponentWithClass(gistCard, 'gist-detail');
    expect(paper.getDOMNode().textContent).toEqual('zdepth');

	})
})