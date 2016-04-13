'use strict';

// We're using HAPIjs
const Hapi = require('hapi');

// Create your server
const server = new Hapi.Server();
server.connection({ port: 80 });


server.route({
    method: 'GET',
    path: '/{path}',
    vhost: 'localhost',
    handler: function (request, reply) {
        return reply.redirect('http://yahoo.com'  + request.params.path);
    }
});

server.route({
    method: 'GET',
    path: '/{path}',
    vhost: '127.0.0.1',
    handler: function (request, reply) {
        return reply.redirect('http://google.com/' + request.params.path);
    }
});

server.route({
    method: 'GET',
    path: '/{path}',
    handler: function (request, reply) {
        return reply.redirect('http://reddit.com/' + request.params.path);
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
