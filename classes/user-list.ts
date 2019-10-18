import { User } from "./user";
import { timingSafeEqual } from "crypto";

export class UserList{
    private lista: User[] = [];
   
    // Añadir un usuario
    public addUser(user:User){
        this.lista.push(user);
        console.log(this.lista);
        return user;
    }

    // actualizar nombre
    public updateName(userId: string, newName: string){
        var user: any = this.lista.find((user)=>{
            return user.id == userId;
        });
        user.nombre = newName;

        console.log('Actualizado usuario', this.lista);
    }

    // obtiene lista de usuarios
    public getList(){
        return this.lista;
    }

    // Obtener un usuario
    public getUser(userId:string){
        return this.lista.find((user)=>{return user.id == userId;});
    }

    // obtener usuarios de una sala
    public getUsersByRoom(sala:string){
        return this.lista.filter((user)=>{return user.sala == sala;});
    }

    //Eliminar usuario
    public deleteUser(userId: string){
        const tempUser = this.getUser(userId);
        this.lista = this.lista.filter((user)=>{
            return user.id != userId;
        });
        console.log('deleteUser on user list', this.lista);
        return tempUser;
    }
}