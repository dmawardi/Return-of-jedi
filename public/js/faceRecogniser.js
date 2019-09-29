var video = document.querySelector('video');
var storeFace;
var webcamStream;
var userFace;

// Build facematch library from api data and init using FaceMatcher
function buildFaceMatchLibrary() {
    // Return new promise
    return new Promise(function (resolve, reject) {
        try {
            // Place call to grab face model data
            $.get('/api/getCompanyFaceData', function (data) {
                console.log('Received Data: '+data);

                console.log('json parsed', JSON.parse(data));
                
                var labeledDescriptors = buildLabeledDescriptors(data);
                // Init facematcher with descriptors
                var faceMatcher = new faceapi.FaceMatcher([labeledDescriptors], 0.6);

                console.log("facematcher from within", faceMatcher);
                // Resolve promise with facematched data
                resolve(faceMatcher);
            });

            // Catch error 
        } catch (err) {
            // Reject promise with error
            reject(err);
        }

    })
}

// Convert array within stringified database back to array
function revertStringifiedArray(arrayDict) {
    // Init array for append
    var newArray = [];
    // Iterate till 127 to grab all items
    for (let i = 0; i < 128; i++){
        // Append item to array
        newArray.push(arrayDict[i])
    }
    // Convert to float 32 array and return
    return new Float32Array(newArray);
}

// Parses JSON data and builds Labeled Descriptors
function buildLabeledDescriptors(data) {
    // Parse data as JSON
    userFace = JSON.parse(data);
    console.log("user face: ", userFace);

    // // Build user descriptor as float 32 array
    var userDescriptors = revertStringifiedArray(userFace._descriptors[0])
    
    console.log("user descriptors: ", userDescriptors);
    console.log("userface descr", userFace._descriptors[0]);

    // Build labeled descriptors from user descriptors
    var labeledDescriptors = 
        new faceapi.LabeledFaceDescriptors(
            userFace._label,
           [userDescriptors]
        )
    return labeledDescriptors;
    // return userFace;

}
// Start capturing with the web cam
function startCapture() {
    // Use the navigator to grab user media: webcam
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
    var setFoundFace = false;

    // Build the face match library then
    buildFaceMatchLibrary().then(function(faceMatcher) {
        console.log("initial Face Matcher", faceMatcher);
        // Assign output data to faceMatcher 


        // Set an interval for detecting faces
        var intervalID = setInterval(async function () {
            // Start detecting faces with face-api
            var detections = await faceapi.detectAllFaces(video,
                // Use the Tiny Face Detectorto initialize using face landmarks and face expressions
                new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptors();


            console.log(detections);

            // Make boxes properly sized for video
            var resizedDetections = await faceapi.resizeResults(detections, displaySize);
            // Sync up canvas with context and clear detection rectangles
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            // draw boxes around faces
            faceapi.draw.drawDetections(canvas, resizedDetections);
            // Draw landmarks on face
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

            // faceMatcher = new faceapi.FaceMatcher(detections)

            console.log("resizedDetections", resizedDetections);
            // console.log("resizedDetections[0].descriptor", resizedDetections[0].descriptor);
            // console.log(faceMatcher.matchDescriptor(resizedDetections[0].descriptor));


            // Store in results the matched detections
            var results = resizedDetections.map(function (detects) {
                console.log("detects", detects);
                console.log("facematcher", faceMatcher)
                // Use facematcher to test current detections
                return faceMatcher.matchDescriptor(detects.descriptor);
            });

            // If Results found
            if (results) {
                // Store in labelFound without euclidean distance
                var labelFound = results.toString().split(" ")[0]
                
                console.log("results", labelFound);

                // If found to match original data to match, grant match
                if (labelFound == faceMatcher.labeledDescriptors[0]._label) {
                    console.log("match found!");
                    // Stop facial scanning (stop interval)
                    clearInterval(intervalID);
                }

            }

            // Every 1 second
        }, 1000);

    })

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