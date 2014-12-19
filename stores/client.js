var rest = require('rest'),
    pathPrefix = require('rest/interceptor/pathPrefix'),
    errorCode = require('rest/interceptor/errorCode'),
    mime = require('rest/interceptor/mime');

client =
  rest.wrap(mime)
  .wrap(errorCode, { code: 500 })
  .wrap(pathPrefix, { prefix: 'https://api.github.com' })
//TODO token header
// .wrap(defaultRequest, { headers: { 'token': 'rest.js' } });
module.exports = client










