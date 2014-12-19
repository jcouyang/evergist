jest.dontMock('../api')
  .dontMock('immutable');

describe('dispather', function(){
  var api = require('../api');
  var rest = require('rest');
  it('return', function(){
    var gist = api('ouyang','token')('gists')('gistid')('end');
    expect(rest).toBeCalledWith('https://api.github.com/gists/gistid');
  });
});
















