import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socketController from '../sockets/socket'

export default class Server {
    private static _instance:Server;

    public app: express.Application;
    public port: number;
    public io:socketIO.Server;

    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }
  
    start (callback: any){
        this.httpServer.listen(this.port, callback);
    }

    private escucharSockets(){
        this.io.on('connection', (cliente:any)=>{
            console.log('NUEVO CLIENTE CONECTADO');

            // Desconectar
            socketController.desconectar(cliente);

            //subscripcion a mensajes
            socketController.mensaje(cliente, this.io);
        });
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }
}