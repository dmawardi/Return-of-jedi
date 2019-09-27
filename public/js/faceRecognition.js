import { image } from "@tensorflow/tfjs-core";

var video = document.querySelector('video');

// var faceapi = require('face-api.js');

var webcamStream;

function startCapture() {
    navigator.getUserMedia({
            video: {}
        },

        // successCallback
        function (localMediaStream) {
            video.srcObject = localMediaStream;
        },

        // errorCallback
        function (err) {
            console.log("The following error occured: " + err);
        }
    )
}

// When the video starts playing
$('video').on('play', function(){
    // Create canvas from the video
    var canvas = faceapi.createCanvasFromMedia(video);
    // append canvas to the document body
    $('#capture').append(canvas);
    
    // Create a display size variable with the current video's image and height
    var displaySize = { width: video.width, height: video.height };

    faceapi.matchDimensions(canvas, displaySize);

    // Set an interval for detecting faces
    setInterval(async function() {

        var detections = await faceapi.detectAllFaces(video, 
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            // Print face detection
            console.log(detections);
            // Make boxes properly sized for video
            var resizedDetections = faceapi.resizeResults(detections, displaySize);
            // Sync up canvas with context and clear detection rectangles
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            // draw boxes around faces
            faceapi.draw.drawDetections(canvas, resizedDetections);
            // Draw landmarks on face
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

        // Every 1 millisecond
    }, 100);
});


// 2






// Arguments
// 
// Load all faceapinets required for face recognition
Promise.all([
    // tinyfacedetector module
    faceapi.nets.tinyFaceDetector.loadFromUri("/js/faceapi-models"),
    // landmarks module
    faceapi.nets.faceLandmark68Net.loadFromUri("/js/faceapi-models"),
    // Recognition and expression
    faceapi.nets.faceRecognitionNet.loadFromUri("/js/faceapi-models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/js/faceapi-models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("/js/faceapi-models"),


// Then start capturing with webcam
]).then(function(){
    startCapture();
    
    $('#imageUpload').on('change', function(){
        // Take uploaded file and buferr to image and store
        var image = await faceapi.bufferToImage(imageUpload.files[0])
        // Detect faces in image
        var detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
        document.body.append(detections.length);
    });


});
