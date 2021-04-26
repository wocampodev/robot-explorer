const { Router } = require('express');

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

module.exports = router;