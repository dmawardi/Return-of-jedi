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
]).then(async function () {
    // Create and append div for image and text
    var container = document.createElement('div');
    // make position relative
    container.style.position = 'relative';
    document.body.append(container);

    document.body.append('Loaded');

    // Load descriptors and assign
    var labeledDescriptors = await loadLabeledImages();
    // Use descriptors to init Facematcher and set threshold for match to 60%
    var faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
    console.log('labeled descriptors', labeledDescriptors);

    // upload image event handler
    imageUpload.addEventListener('change', async function () {
        // Clear area
        if (image) image.remove();
        if (canvas) canvas.remove();


        // Take uploaded file and buferr to image and store
        var image = await faceapi.bufferToImage(imageUpload.files[0]);

        container.append(image);

        // Create canvas
        var canvas = faceapi.createCanvasFromMedia(image);
        container.append(canvas);
        // Get the dimensions of the image and store
        var displaySize = { width: image.width, image: image.height };
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
        // Grab resized detections and map current facematcher with labelled images to find best match
        var results = resizedDetections.map(function(detects){
            console.log(detects);
            console.log(faceMatcher);
            faceMatcher.matchDescriptor(detects.descriptor);
        });

        console.log(resizedDetections);
        // For each facematched detection found
        results.forEach(function(result, i) {
            console.log('face functions');
            // Draw a box using index
            var box = resizedDetections[i].detection.box;
            console.log(box);

            // Init using box information and add label
            var drawBox = new faceapi.draw.DrawBox(box, { label: result })
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
        // Iterate through array
        labels.map(async function(label){

            // Array for descriptors
            descriptions = [];

            // Iterate through learning files
            for (let i = 1; i <= 2; i++){
                // Fetch image using variable path 
                let img = await faceapi.fetchImage('https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/'+label+'/'+i+'.jpg');
                // Detect faces in image
                var detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                // Push descriptors to descriptions array
                descriptions.push(detections.descriptor);
            }
            return new faceapi.LabeledFaceDescriptors(label, descriptions)

        })
    )
}