const getTemperature = require('../modules/temperature');
// const { analizeCamera } = require('../modules/object-detection');

const emitTemperature = Socket => {
    setInterval( () => {
        Socket.emit( 'temperature', getTemperature() );
    }, 3000);
};

const emitVideo = ( client, Socket ) => {
    client.on('camera-laptop', async payload => {
        // const data = await analizeCamera( payload.video );
        // console.log( data );
        console.log(payload.video);
        Socket.emit( 'streaming', payload.video );
    });
};

const receiveCommandMovement = ( client, Socket ) => {
    client.on('command-movement', payload => {
        console.log( payload );
    });
};

const desconectar = ( cliente, io ) => {
    cliente.on('disconnect', () => {
        // io.emit( 'close', 'Desconectados' );
    });
};

module.exports = {
    emitTemperature,
    emitVideo,
    receiveCommandMovement,
    desconectar
};