import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UserList } from "../classes/user-list";
import { User } from "../classes/user";

export const connectedUsersList = new UserList();

export const connectUser = (cliente: Socket, io: socketIO.Server)=>{
    const user = new User(cliente.id);
    connectedUsersList.addUser(user);     
}

export const desconectar = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado'), connectedUsersList.getList();
        connectedUsersList.deleteUser(cliente.id);
        // cuando se desconecta un usuario y se elimina de la lista de connected users se emite la lista actualizada
        io.emit('connected-users', connectedUsersList.getList());
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
        // cuando se conecta un usuario y se añade a la lista de connected users se emite la lista actualizada
        io.emit('connected-users', connectedUsersList.getList());     
        if(callback)
            callback({ok:true, message: `Usuario ${payload.nombre} configurado`});
        // io.emit('mensaje-nuevo', payload);
    });
}

export const getusers = (cliente: Socket, io: socketIO.Server)=>{
    cliente.on('connect-user', (payload: {de:string, cuerpo:string} )=>{
        io.to(cliente.id).emit('connected-users', connectedUsersList.getList());
    });
}