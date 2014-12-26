var rest = require('rest'),
    pathPrefix = require('rest/interceptor/pathPrefix'),
    errorCode = require('rest/interceptor/errorCode'),
    mime = require('rest/interceptor/mime'),
    defaultRequest = require('rest/interceptor/defaultRequest')
var api_remote = 'http://private-4d99c-igist.apiary-mock.com';
if (process.env.NODE_ENV === "prod") api_remote = 'https://api.github.com';
client =
  rest.wrap(mime)
  .wrap(errorCode, { code: 500 })
  .wrap(pathPrefix, { prefix: api_remote })
  .wrap(defaultRequest, { headers: { 'Authorization': 'token '+ sessionStorage.access_token } });
module.exports = client










