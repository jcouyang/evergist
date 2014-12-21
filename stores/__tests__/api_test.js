jest.dontMock('../api')
  .dontMock('immutable');

describe('dispather', function(){
  var api = require('../api');
  var client = require('../client');
  it('return', function(){
    var gist = api('gists')('gistid')();
    expect(client).toBeCalledWith({url:'/gists/gistid',method:'GET'});
    gist = api('users')('jcouyang')('gists')();
    expect(client).toBeCalledWith({url:'/users/jcouyang/gists',method:'GET'});
  });
});
















