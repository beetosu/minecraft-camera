const input = document.getElementById('videoPlayer');
const canvas = document.getElementById('overlay');
const canvasContext = canvas.getContext("2d");
canvasContext.crossOrigin="anonymous";
var video = document.querySelector("#videoPlayer");

const blocks = [
	"brick.png"
].map(function(src) {
	const i = new Image();
	i.src = "textures/" + src;
	return i;
})

setUpCamera();

setInterval(() => {
	createBlocks();
}, 100);

function setUpCamera() {
	console.log(blocks)
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
  const colors = canvasContext.getImageData(0,0,640,480).data;
  console.log(colors)
  for (let i = 0; i < 480; i=i+16) {
    for (let p = 0; p < 640; p=p+16) {
      getBlock(p,i,colors);
    }
  }
}


function getBlock(x, y, data) {
	const avg = {r: 0, g: 0, b: 0};
	for (let i = y; i < y+16; i++) {
		for (let p = x*4; p < (x+16)*4; p+=4) {
			avg.r += data[p+(i*640*4)];
		    avg.g += data[p+1+(i*640*4)];
		    avg.b += data[p+2+(i*640*4)];
		}
	}
  	avg.r = Math.floor( avg.r / 256 );
	avg.g = Math.floor( avg.g / 256 );
	avg.b = Math.floor( avg.b / 256 );
	const img = new Image();
	if (isNaN(avg.r)) {
		img.src = "textures/cobblestone.png"
	}
	else if (avg.g > 80) {
		img.src = "textures/bookshelf.png";
	}
	else {
		img.src = "textures/diamond_ore.png"
	}
	canvasContext.drawImage(img, x, y)
}
