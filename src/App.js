import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import * as path from 'path';
import routes  from './app/routes'

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(routes);

const server = http.Server(app);

server.listen(PORT,  process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

export const io = socketIO(server);

import { scs } from './app/socket'

scs()

process.on('uncaughtException', (err) => {
    shutdown('Uncaught excecption occurred', err);
});

function shutdown(message, err) {
    console.log(`${message}: gracefully shutting down...`);
    console.error(err);
    process.exit(1);
}
