import {Router, Request, Response} from 'express';
import Server from '../classes/server';
import { Socket } from 'dgram';
import { connectedUsersList } from '../sockets/socket';

export const router = Router();

router.get('/mensajes', (req: Request, res: Response)=>{
    res.json({
        ok : true,
        message: 'Todo esta bien'
    });
});

router.post('/mensajes', (req: Request, res: Response)=>{
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    const payload = {
        de,
        cuerpo
    };
    const server = Server.instance;
    // con .in se emite un mensaje solo a la sala del receptor se le pasa el id del usuario
    server.io.emit('mensaje-nuevo',payload);

    res.json({
        ok : true,
        message: 'Todo esta bien POST',
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, res: Response)=>{
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    };

    const server = Server.instance;
    // con .in se emite un mensaje solo a la sala del receptor se le pasa el id del usuario
    server.io.in( id ).emit('mensaje-privado',payload);
    res.json({
        ok : true,
        message: 'Todo esta bien POST',
        cuerpo,
        de,
        id
    });
});

// servicio para obtener los ids de los usuarios
router.get('/users', (req: Request, res: Response)=>{    

    const server = Server.instance;

    // con .clients se obtienen los ids de los clientes conectados al socket
    server.io.clients((err:any, clients: string[])=>{
        if(err){
           return res.json({
                ok : false,
                message: 'Error al obtener los clientes conectados.. /users route',
                error: err               
            });
        }

        res.json({
            ok : true,
            clients               
        });

    });
    // res.json({
    //     ok : true,
    //     message: 'Todo esta bien POST',
    //     cuerpo,
    //     de,
    //     id
    // });
});

router.get('/users/detail', (req: Request, res: Response)=>{    
    
        res.json({
            ok : true,
            clients: connectedUsersList.getList()
        });

});


