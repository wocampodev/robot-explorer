const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');

const webRoutes = require('../routes/web.routes');
const Events = require('../sockets/events.socket');

class Server {
    static io = undefined;

    static get instance() {
        return this._instance || (this._instance = new this());
    }

    constructor() {
        this.app = express();
        this.port = 8000;
        this.middlewares();
        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server(this.httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                credentials: false,
            },
            allowEIO3: true,
        });
        this.listen();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(webRoutes);
        this.app.get('*', (_, res) => {
            res.sendFile(path.join(__dirname, '../../public/index.html'));
        });
    }

    listen() {
        this.io.on('connection', client => {
            Events.emitVideo(client, this.io);
            Events.receiveCommandMovement(client, this.io);
            Events.desconectar(client, this.io);
        });
        Events.emitTemperature(this.io);
    }

    start() {
        this.httpServer.listen(this.port);
    }
}

module.exports = Server;
