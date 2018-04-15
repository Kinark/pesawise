var PHPServer = require('php-built-in-server');
// var server = new PHPServer('path/to/phpExecutable', '/path/to/php.ini');

var server = new PHPServer();

server.on('listening', function (event) {
   console.log('[LISTENING]', event.host.address + ':' + event.host.port);
});

server.on('error', function (event) {
   console.log('[ERROR]', event.error.toString());
});

server.listen('./src/api', 8070, '0.0.0.0');