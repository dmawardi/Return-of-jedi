// 
// Load all faceapinets required for face recognition
var imageUpload = document.getElementById('imageUpload');

// var faceapi = require('face-api.js');

Promise.all([

    // landmarks module
    faceapi.nets.faceLandmark68Net.loadFromUri("/js/faceapi-models"),
    // Recognition and expression
    faceapi.nets.faceRecognitionNet.loadFromUri("/js/faceapi-models"),
    // Detection algorithm
    // net.loadFromUri('/models')
    faceapi.nets.ssdMobilenetv1.loadFromUri("/js/faceapi-models")


    // Then start capturing with webcam
]).then(function () {
    // Create and append div
    var container = document.createElement('div');
    container.style.position = 'relative';
    document.body.append(container);

    document.body.append('Loaded');

    // upload image event handler
    imageUpload.addEventListener('change', async function () {
        // Take uploaded file and buferr to image and store
        var image = await faceapi.bufferToImage(imageUpload.files[0])
        container.append(image);

        // Create canvas
        var canvas = faceapi.createCanvasFromMedia(image);
        container.append(canvas);
        // Get the dimensions of the image and store
        var displaySize = { width: parseInt(image.width), image: parseInt(image.height) };
        console.log(image.height);
        console.log(image.width);
        // Match the canvas to the image's display size
        faceapi.matchDimensions(canvas, displaySize);


        // Detect faces in image that was uploaded using face landmarks and face descriptors for boxes
        var detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
        document.body.append(": "+detections.length);

        console.log("detections length: ", detections.length);
        console.log("display: ", displaySize);

        // To make detections scaled to image
        var resizedDetections = await faceapi.resizeResults(detections, { width: image.width, height: image.height });

        console.log(resizedDetections);
        // For each detection found
        resizedDetections.forEach(function(detection) {
            console.log('face functions');
            // Draw a box
            var box = detection.detection.box;
            console.log(box);

            // Init using box information and add label
            var drawBox = new faceapi.draw.DrawBox(box, { label: 'Face' })
            // Draw the box on the canvas
            console.log(canvas);
            drawBox.draw(canvas);
        })

    });



}).catch(function (err) {
    console.log(err);
});

function loadLabeledImages() {
    var labels = ["Black Widow", "Captain America", "Captain Marvel", "Hawkeye", "Jim Rhodes", "Thor", "Tony Stark"];

    return Promise.all(
        labels.map(async function(label){
            for (let i = 0; i <= 2; i++){
                let img = await faceapi.fetchImage('public/js/appmodels/labeled_images')
            }
        })
    )
}