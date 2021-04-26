const getTemperature = require('../modules/temperature');

const emitTemperature = Socket => {
    setInterval( () => {
        Socket.emit( 'temperature', getTemperature() );
    }, 3000);
};

const emitVideo = ( client, Socket ) => {
    client.on('camera-laptop', payload => {
        Socket.emit( 'streaming', payload.video );
        // Socket.broadcast.emit( 'streaming', payload.video );
    });
};

const desconectar = ( cliente, io ) => {

    cliente.on('disconnect', () => {

        io.emit( 'close', 'Desconectados' );
    
    });

};

module.exports = {
    emitTemperature,
    emitVideo,
    desconectar
}