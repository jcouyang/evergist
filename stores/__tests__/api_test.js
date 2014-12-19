jest.dontMock('../api')
  .dontMock('immutable');

describe('dispather', function(){
  var api = require('../api');
  var client = require('../client');
  it('return', function(){
    var gist = api('gists')('gistid')('end');
    expect(client).toBeCalledWith('/gists/gistid');
  });
});
















