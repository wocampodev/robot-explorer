const { Router } = require('express');

const ListaUsuarios = require('../modules/user-list');

const router = Router();

// Obtener mensajes
router.get('/mensajes', ( req, res ) => {

    res.json({
        ok: true,
        mensaje: 'GET !! Listo'
    });

});

// Mensajes generales
router.post('/mensajes/', ( req, res ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    const payload = { de, cuerpo };
    // Mensaje general
    const Socket = require('../config/server').instance.io;
    Socket.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        mensaje: 'Mensaje general enviado a todos',
        cuerpo,
        de
    });

});

// Mensajes privados
router.post('/mensajes/:id', ( req, res ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const payload = { de, cuerpo };
    const Socket = require('../config/server').instance.io;
    // Mensaje privado
    Socket.in( id ).emit( 'mensaje-privado', payload );

    res.json({
        ok: true,
        mensaje: 'Mensaje privado enviado',
        cuerpo,
        de,
        id
    });

});

// Obtener todos los ID's de los usuarios
router.get('/usuarios', async ( req, res ) => {
    
    let clientes = [];
    
    const Socket = require('../config/server').instance.io;

    const sockets = await Socket.allSockets();
    sockets.forEach( cliente => {
        clientes.push( cliente );
    });

    if ( !clientes ) {
        return res.json({
            ok: false,
            mensaje: 'No hay clientes conectados'
        });
    }

    res.json({
        ok: true,
        mensaje: 'Listado de clientes',
        clientes
    });

});

// Obtener todos los ID's y nombres de los usuarios
router.get('/usuarios/detalle', ( req, res ) => {
    
    const usuariosConectados = ListaUsuarios.instance;

    res.json({
        ok: true,
        mensaje: 'Listado de clientes con nombre',
        clientes: usuariosConectados.getListado()
    });

});

module.exports = router;