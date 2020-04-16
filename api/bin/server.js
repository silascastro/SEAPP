const http = require('http');
const debug = require('debug')('app:server');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const port = normalizePort(process.env.PORT || '3000');

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta: ' + port);


//system functions 

function onListening() {
    const addr = server.address();
    const bind = typeof addr == 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);

}


function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }

    return false;
}


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port == 'string' ?
        'Pipe ' + port :
        'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevate privileges')
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in uses')
            process.exit(1);
            break;
        default:
            throw error;

    }
}

