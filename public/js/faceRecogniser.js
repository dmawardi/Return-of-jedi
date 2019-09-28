var video = document.querySelector('video');
var storeFace;
var webcamStream;
var userFace;

// Build facematch library from already held data
function buildFaceMatchLibrary() {
    // Return new promise
    return new Promise(function (resolve, reject) {
        try {
            // Place call to grab face model data
            $.get('/api/getCompanyFaceData', function (data) {
                // Parse data as JSON
                userFace = JSON.parse(data);

                // Build user descriptor as float 32 array
                var userDescriptors = [
                    new Float32Array(userFace.descriptors)
                ]

                // Build labeled descriptors from user descriptors
                var labeledDescriptors = [
                    new faceapi.LabeledFaceDescriptors(
                        userFace.name,
                        userDescriptors
                    )
                ]
                // Init facematcher with descriptors
                var faceMatcher = new faceapi.FaceMatcher(labeledDescriptors)

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
    // Init variable for face data
    var faceMatcher;
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

    // Build the face match library then
    buildFaceMatchLibrary().then(function (faceData) {
        // Assign output data to faceMatcher 
        faceMatcher = faceData;
        console.log(faceData);


        // Set an interval for detecting faces
        setInterval(async function () {
            // Start detecting faces with face-api
            var detections = await faceapi.detectAllFaces(video,
                // Use the Tiny Face Detectorto initialize using face landmarks and face expressions
                new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();


            console.log(detections);

            // If detections length is at 1 and an actual face is found
            if (detections.length = 1 && !setFoundFace) {

                console.log("storing face: ", storeFace);
                // store the only face in detections
                storeFace = detections[0];
                // if storeface is not undefined
                if (storeFace) {
                    console.log("Set found face to true");
                    // Then set found face to true
                    setFoundFace = true;
                }
            }



            // Make boxes properly sized for video
            var resizedDetections = await faceapi.resizeResults(detections, displaySize);
            // Sync up canvas with context and clear detection rectangles
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            // draw boxes around faces
            faceapi.draw.drawDetections(canvas, resizedDetections);
            // Draw landmarks on face
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

            // const boxesWithText = [
            //     new faceapi.BoxWithText(new faceapi.Rect(x, y, width, height), text))
            //     new faceapi.BoxWithText(new faceapi.Rect(0, 0, 50, 50), 'some text'))
            //   ]

            // faceMatcher = new faceapi.FaceMatcher(detections)

            detections.forEach(fd => {
                const bestMatch = faceMatcher.findBestMatch(fd.descriptor)
                console.log(bestMatch.toString())
            })

            // Every 1 millisecond
        }, 1000);

    })

});

// $('#checkInButton').on('click', function () {
//     var faceToStore = storeFace;
//     console.log(JSON.stringify(faceToStore.landmarks._positions));
//     console.log(faceToStore);


//     // Split data into separate points if required and able to be read back in
//     const jawOutline = faceToStore.landmarks.getJawOutline()
//     const nose = faceToStore.landmarks.getNose()
//     const mouth = faceToStore.landmarks.getMouth()
//     const leftEye = faceToStore.landmarks.getLeftEye()
//     const rightEye = faceToStore.landmarks.getRightEye()
//     const leftEyeBbrow = faceToStore.landmarks.getLeftEyeBrow()
//     const rightEyeBrow = faceToStore.landmarks.getRightEyeBrow()

//     console.log('jaw', jawOutline);

//     // Print face detection
//     console.log(faceToStore);
//     var faceObject = {
//         name: 'Bill',
//         jawOutline: JSON.stringify(jawOutline),
//         nose: JSON.stringify(nose),
//         mouth: JSON.stringify(mouth),
//         leftEye: JSON.stringify(leftEye),
//         rightEye: JSON.stringify(rightEye),
//         leftEyeBbrow: JSON.stringify(leftEyeBbrow),
//         rightEyeBrow: JSON.stringify(rightEyeBrow)
//     }
//     console.log(faceObject);

// });


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