// import { image } from "@tensorflow/tfjs-core";

var video = document.querySelector('video');
var storeFace;

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
$('#video').on('play', function () {
    // Create canvas from the video
    var canvas = faceapi.createCanvasFromMedia(video);
    // append canvas to the document body
    $('#capture').append(canvas);

    // Create a display size variable with the current video's image and height
    var displaySize = {
        width: video.width,
        height: video.height
    };

    faceapi.matchDimensions(canvas, displaySize);

    // Set the found face variable to false
    var setFoundFace = false

    // Set an interval for detecting faces
    setInterval(async function () {

        var detections = await faceapi.detectAllFaces(video,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

        console.log(detections);

        if (detections.length = 1 && !setFoundFace) {
            console.log("storing face");
            storeFace = detections[0];
            // if storeface is not undefined
            if (storeFace) {
                setFoundFace = true;

            }
        }

        const json = await faceapi.fetchJson('/files/example.json');
        console.log(json);



        // Make boxes properly sized for video
        var resizedDetections = await faceapi.resizeResults(detections, displaySize);
        // Sync up canvas with context and clear detection rectangles
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        // draw boxes around faces
        faceapi.draw.drawDetections(canvas, resizedDetections);
        // Draw landmarks on face
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);


        // Build facematch library from already held data
        // function buildFaceMatchLibrary(data) {

        // }

        // var faceMatcher = new faceapi.FaceMatcher(detections)

        // detections.forEach(fd => {
        //     const bestMatch = faceMatcher.findBestMatch(fd.descriptor)
        //     console.log(bestMatch.toString())
        //   })

        // Every 1 millisecond
    }, 3000);
});

$('#checkInButton').on('click', function () {
    var faceToStore = storeFace;
    console.log(storeFace);
    console.log(faceToStore);


    // Split data into separate points if required and able to be read back in
    const jawOutline = faceToStore.landmarks.getJawOutline()
    const nose = faceToStore.landmarks.getNose()
    const mouth = faceToStore.landmarks.getMouth()
    const leftEye = faceToStore.landmarks.getLeftEye()
    const rightEye = faceToStore.landmarks.getRightEye()
    const leftEyeBbrow = faceToStore.landmarks.getLeftEyeBrow()
    const rightEyeBrow = faceToStore.landmarks.getRightEyeBrow()

    console.log('jaw', jawOutline);

    // Print face detection
    console.log(faceToStore);
    var faceObject = {
        name: 'Bill',
        jawOutline: jawOutline,
        nose: nose,
        mouth: mouth,
        leftEye: leftEye,
        rightEye: rightEye,
        leftEyeBbrow: leftEyeBbrow,
        rightEyeBrow: rightEyeBrow
    }
    console.log(faceObject);



    $.post("api/addNewFace", faceObject, function (data) {
        console.log(data);
    });

});


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


    // Then start capturing with webcam
]).then(function () {
    startCapture();

});