const input = document.getElementById('camera-stream');
const canvas = document.getElementById('overlay')
const canvasContext = canvas.getContext("2d");
let displaySize = {
	width: input.offsetWidth,
	height: input.offsetHeight
};
initialize();

function initialize() {
  setUpCamera();
  createBlocks();
}

function setUpCamera() {
  var video = document.querySelector("#videoPlayer");
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
      var myobj = document.getElementById("camera-denied");
      myobj.remove();
    })
    .catch(function (err) {
      console.log("Something went wrong!");
    });
  }
}

function createBlocks() {
  if (input.offsetWidth !== displaySize.width || input.offsetHeight !== displaySize.height) {
		displaySize = {
			width: input.offsetWidth,
			height: input.offsetHeight
		};
	}
  console.log(displaySize);
}
