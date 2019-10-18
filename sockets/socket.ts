import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UserList } from "../classes/user-list";
import { User } from "../classes/user";

export const connectedUsersList = new UserList();

export const desconectar = (cliente: Socket)=>{
    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado'), connectedUsersList.getList();
        connectedUsersList.deleteUser(cliente.id);
    });
}

export const mensaje = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('mensaje', (payload: {de:string, cuerpo:string} )=>{
        io.emit('mensaje-nuevo', payload);
    });
}

export const configurar = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('configurar-usuario', (payload: any,  callback?:Function )=>{
        console.log('configurado usuario en server');
        connectedUsersList.updateName(cliente.id, payload.nombre);        
        if(callback)
            callback({ok:true, message: `Usuario ${payload.nombre} configurado`});
        // io.emit('mensaje-nuevo', payload);
    });
}

export const connectUser = (cliente: Socket)=>{
    const user = new User(cliente.id);
    connectedUsersList.addUser(user);
}