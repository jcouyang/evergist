jest.dontMock('../gist-detail')
  .dontMock('../extend');
var when = require('when');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var extend = require('../extend');
extend(window, require('mori'));

describe('GistDetail', function(){
  var GistDetail = require('../gist-detail');
  var gistDetail = TestUtils.renderIntoDocument(
      <GistDetail gistHtml={'<div class="gistdetail">gist html</div>'} display={true}/>
  );
	it('render gist detail', function(){
    expect(gistDetail.getDOMNode().textContent).toEqual('gist html');
	});
});




