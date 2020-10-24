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
  canvasContext.clearRect(0,0,displaySize.width,displaySize.height);
  canvasContext.drawImage(video,0,0,displaySize.width,displaySize.height);
  for (let i = 0; i < displaySize.height; i=i+16) {
    for (let p = 0; p < displaySize.width; p=p+16) {
      //canvasContext.drawImage(getBlock(p,i),p,i,16,16);
    }
  }
}

function getBlock(x, y) {
  let image = new Image();
  image.src = "textures/brick.png"
  return image
}
