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
  for (let i = 0; i < 480; i=i+16) {
    for (let p = 0; p < 640; p=p+16) {
      canvasContext.drawImage(getBlock(p,i),p,i,16,16);
    }
  }
}

function getBlock(x, y, colors) {
  const image = new Image();
  const colors = canvasContext.getImageData(x, y, 16, 16).data;
  const avg = {r: 0, g: 0, b: 0};
  console.log(data.length / 4);
  for(let i = 0; i < data.length; i += 4) {
     average.r += data[i];
     average.g += data[i+1];
     average.b += data[i+2];
  }
  average.r = Math.floor( average.r / 64 );
  average.g = Math.floor( average.g / 64 );
  average.b = Math.floor( average.b / 64 );
  image.src = "textures/brick.png"
  return image
}
