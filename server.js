'use strict';

// We're using HAPIjs
const Hapi = require('hapi');

// Create your server
const server = new Hapi.Server();
server.connection({ port: 80 });

var redirectConfig = [
  {host : 'localhost', redirect : 'http://0.0.0.0/#/localhost/'},
  {host : '127.0.0.1', redirect : 'http://0.0.0.0/#/127.0.0.1/'}
];

function findHostMatch (hostname) {
  for (var i = 0; i < redirectConfig.length; i++ ) {
    if (redirectConfig[i].host == hostname) {
      return redirectConfig[i].redirect;
    }
  }
}

server.route({
    method: 'GET',
    path: '/{path}',
    handler: function (request, reply) {
      var redirectUrl = findHostMatch(request.info.hostname);
      return reply.redirect(redirectUrl + request.params.path);
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      var redirectUrl = findHostMatch(request.info.hostname);
      return reply.redirect(redirectUrl);
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
