const ListaUsuarios = require('../modules/user-list');
const getTemperature = require('../modules/temperature');

const usuariosConectados = ListaUsuarios.instance;

const emitTemperature = Socket => {

    setInterval( () => {
        Socket.emit( 'temperature', getTemperature() );
    }, 2000);

};

// Configurar usuario
const configurarUsuario = ( cliente, io ) => {

    cliente.on('configurar-usuario', ( payload, callback ) => {
        
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
        io.emit( 'usuarios-activos', usuariosConectados.getListado() );

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre } configurado.`,
            id: cliente.id
        })

    });

};

// Recibir mensaje
const mensaje = ( cliente, io ) => {

    cliente.on('mensaje', ( payload ) => {

        console.log( 'Mensaje recibido', payload );
        io.emit( 'mensaje-nuevo', payload );

    });

};

// Obtener usuarios para un cliente
const obtenerUsuarios = ( cliente, io ) => {

    cliente.on('obtener-usuarios', () => {
        
        io.to( cliente.id ).emit( 'usuarios-activos', usuariosConectados.getListado() );

    });

};

// Desconectar cliente
const desconectar = ( cliente, io ) => {

    cliente.on('disconnect', () => {

        usuariosConectados.borrar( cliente.id );

        io.emit( 'usuarios-activos', usuariosConectados.getListado() );
    
    });

};

module.exports = {
    emitTemperature,
    configurarUsuario,
    mensaje,
    obtenerUsuarios,
    desconectar
}