const input = document.getElementById('videoPlayer');
const canvas = document.getElementById('overlay')
const canvasContext = canvas.getContext("2d");
var video = document.querySelector("#videoPlayer");
let displaySize = {
	width: input.offsetWidth,
	height: input.offsetHeight
};
setUpCamera();

setInterval(() => {
	createBlocks();
}, 100);

function setUpCamera() {
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
  ctx.clearRect(0,0,displaySize.height,displaySize.width);
  canvasContext.drawImage(video,0,0,displaySize.height,displaySize.width)
}
