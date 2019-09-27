// 
// Load all faceapinets required for face recognition
var imageUpload = document.getElementById('imageUpload');
var net = new faceapi.SsdMobilenetv1()

// var faceapi = require('face-api.js');

Promise.all([

    // landmarks module
    faceapi.nets.faceLandmark68Net.loadFromUri("/js/faceapi-models"),
    // Recognition and expression
    faceapi.nets.faceRecognitionNet.loadFromUri("/js/faceapi-models"),
    // Detection algorithm
    // net.loadFromUri('/models')
    // faceapi.nets.ssdMobilenetv1.loadFromUri("/js/faceapi-models")


// Then start capturing with webcam
]).then(function(){
    console.log('loaded');
    document.body.append('Loaded');
    
    // upload image event handler
    imageUpload.addEventListener('change', async function(){
        // Take uploaded file and buferr to image and store
        var image = await faceapi.bufferToImage(imageUpload.files[0])
        document.body.append(image);
        // Detect faces in image that was uploaded using face landmarks and face descriptors for boxes
        var detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
        document.body.append(detections.length);
    });

    var container = document.createElement('div');
    container.style.position = 'relative';
    document.body.append(container);

    



}).catch(function(err){
    console.log(err);
});