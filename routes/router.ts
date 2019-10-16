import {Router, Request, Response} from 'express';

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
    res.json({
        ok : true,
        message: 'Todo esta bien POST',
        cuerpo,
        de,
        id
    });
});