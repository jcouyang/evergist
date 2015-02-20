var when = require('when');
jest.dontMock('../gist-list')
  .dontMock('../extend');
var extend = require('../extend');
extend(window, require('mori'));
var React = require('react/addons');
CodeMirror = require('codemirror');
var GistCard;
var GistList;
var db,gists;
var TestUtils = React.addons.TestUtils;
var LeftNav = require('../left-nav');
var Stage = require('../stage');
TestUtils.mockComponent(LeftNav);
describe('gist list', function(){
  var gistList;
  beforeEach(function(){
    db = require('../../stores/db');
    db.gist = {};
    db.gist.toArray = function(){
      return when([
        {
          id: 123,
          description: 'hehe'
        },
        {
          id: 456,
          description: '233333'
        }
      ]);
    };
    gists = require('../../stores/gists');
    gists.mockReturnValue(db.gist.toArray());
    GistCard = require('../gist-card');
    TestUtils.mockComponent(GistCard);
    GistList = require('../gist-list');
    gistList = TestUtils.renderIntoDocument(
        <GistList/>
    );
  });
  it('list 2 gist item', function(){
    jest.runAllTicks();
    var gistCard = TestUtils.scryRenderedComponentsWithType(gistList, GistCard);
    expect(gistCard.length).toBe(2);
  });
});
