const input = document.getElementById('videoPlayer');
const canvas = document.getElementById('overlay')
const canvasContext = canvas.getContext("2d");
var video = document.querySelector("#videoPlayer");
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
  canvasContext.clearRect(0,0,640,480);
  canvasContext.drawImage(video,0,0);
  let colors = canvasContext.getImageData(0, 0, 640, 480);
  for (let i = 0; i < 480; i=i+16) {
    for (let p = 0; p < 640; p=p+16) {
      canvasContext.drawImage(getBlock(p,i, colors),p,i,16,16);
    }
  }
}

function getBlock(x, y, colors) {
  let image = new Image();
  console.log(colors[1])
  image.src = "textures/brick.png"
  return image
}
