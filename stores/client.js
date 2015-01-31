var rest = require('rest'),
    pathPrefix = require('rest/interceptor/pathPrefix'),
    errorCode = require('rest/interceptor/errorCode'),
    mime = require('rest/interceptor/mime'),
    defaultRequest = require('rest/interceptor/defaultRequest');
var api_remote = 'http://private-4d99c-igist.apiary-mock.com';
var endpoint = 'https://api.github.com';
if(localStorage.currentuser)
  endpoint = new URL(JSON.parse(localStorage.currentuser).url).hostname || endpoint;

if (process.env.NODE_ENV === "production") api_remote = endpoint;
var client =
      rest.wrap(mime)
      .wrap(errorCode, { code: 500 })
      .wrap(pathPrefix, { prefix: api_remote })
if(localStorage.currentuser)
  client = client.wrap(defaultRequest, { headers: { 'Authorization': 'token '+ JSON.parse(localStorage.currentuser).token } });
module.exports = client;














