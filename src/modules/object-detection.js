require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');

const cocoSsd = require('@tensorflow-models/coco-ssd');

async function analizeCamera( image ) {
    // Load the model.
    const model = await cocoSsd.load();
    // Classify the image.
    const predictions = await model.detect( image );
    return predictions;
}

module.exports = { analizeCamera };