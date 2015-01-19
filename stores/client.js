var rest = require('rest'),
    pathPrefix = require('rest/interceptor/pathPrefix'),
    errorCode = require('rest/interceptor/errorCode'),
    mime = require('rest/interceptor/mime'),
    defaultRequest = require('rest/interceptor/defaultRequest')
var api_remote = 'http://private-4d99c-igist.apiary-mock.com';
if (process.env.NODE_ENV === "production") api_remote = 'https://api.github.com';
var client =
      rest.wrap(mime)
      .wrap(errorCode, { code: 500 })
      .wrap(pathPrefix, { prefix: api_remote })
if(localStorage.currentUser)

  client = client.wrap(defaultRequest, { headers: { 'Authorization': 'token '+ localStorage.currentUser.token } });
module.exports = client;














