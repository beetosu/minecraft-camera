const input = document.getElementById('videoPlayer');
const canvas = document.getElementById('overlay');
const canvasContext = canvas.getContext("2d");
const canvasWidth = 640;
const canvasHeight = 480;
const gridSize = 16;
canvasContext.crossOrigin="anonymous";
var video = document.querySelector("#videoPlayer");
let imageGrid = []

function initialize() {
  setUpCamera();
  createGrid();
}

function createGrid() {
  for (let y = 0; y > canvasHeight/gridSize; y++) {
    imageGrid[y] = [];
    for (let x = 0; x > canvasWidth/gridSize; x++) {
      const img = new Image();
      imageGrid[y].push(img);
    }
  }
}

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

function colorDistance(one, two){
	return Math.sqrt(Math.pow(one.r - two.r, 2) + Math.pow(one.g - two.g, 2) + Math.pow(one.b - two.b, 2))
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
	const img = imageGrid[y/gridSize][x/gridSize];
	let nearestBlock = blocks[0];
	for (let block of blocks) {
		if (colorDistance(avg, block.color) < colorDistance(avg, nearestBlock.color)) {
			nearestBlock = block;
		}
	}
	img.src = "textures/" + nearestBlock.path;
	// if (isNaN(avg.r)) {
	// 	img.src = "textures/cobblestone.png"
	// }
	// else if (avg.g > 80) {
	// 	img.src = "textures/diamond_ore.png";
	// }
	// else {
	// 	img.src = "textures/bookshelf.png"
	// }
  canvasContext.drawImage(img, x*gridSize, y*gridSize)
}

const blocks = [{"path": "bedrock.png", "color": {"r": 74, "g": 74, "b": 74}}, {"path": "blue_ice.png", "color": {"r": 101, "g": 147, "b": 222}}, {"path": "bone_block_side.png", "color": {"r": 197, "g": 194, "b": 176}}, {"path": "bookshelf.png", "color": {"r": 91, "g": 74, "b": 49}}, {"path": "brain_coral_block.png", "color": {"r": 182, "g": 80, "b": 140}}, {"path": "brick.png", "color": {"r": 127, "g": 83, "b": 71}}, {"path": "bubble_coral_block.png", "color": {"r": 146, "g": 23, "b": 143}}, {"path": "chorus_flower.png", "color": {"r": 121, "g": 95, "b": 121}}, {"path": "chorus_plant.png", "color": {"r": 82, "g": 50, "b": 82}}, {"path": "clay.png", "color": {"r": 139, "g": 144, "b": 155}}, {"path": "coal_block.png", "color": {"r": 16, "g": 16, "b": 16}}, {"path": "coal_ore.png", "color": {"r": 100, "g": 100, "b": 100}}, {"path": "cobblestone.png", "color": {"r": 108, "g": 108, "b": 108}}, {"path": "cobblestone_mossy.png", "color": {"r": 92, "g": 108, "b": 92}}, {"path": "concrete_black.png", "color": {"r": 7, "g": 9, "b": 13}}, {"path": "concrete_blue.png", "color": {"r": 39, "g": 40, "b": 126}}, {"path": "concrete_brown.png", "color": {"r": 84, "g": 52, "b": 27}}, {"path": "concrete_cyan.png", "color": {"r": 18, "g": 104, "b": 119}}, {"path": "concrete_gray.png", "color": {"r": 47, "g": 50, "b": 54}}, {"path": "concrete_green.png", "color": {"r": 64, "g": 80, "b": 32}}, {"path": "concrete_light_blue.png", "color": {"r": 31, "g": 120, "b": 174}}, {"path": "concrete_lime.png", "color": {"r": 82, "g": 148, "b": 21}}, {"path": "concrete_magenta.png", "color": {"r": 148, "g": 42, "b": 139}}, {"path": "concrete_orange.png", "color": {"r": 197, "g": 85, "b": 0}}, {"path": "concrete_pink.png", "color": {"r": 187, "g": 88, "b": 125}}, {"path": "concrete_powder_black.png", "color": {"r": 22, "g": 23, "b": 28}}, {"path": "concrete_powder_blue.png", "color": {"r": 61, "g": 64, "b": 146}}, {"path": "concrete_powder_brown.png", "color": {"r": 110, "g": 74, "b": 47}}, {"path": "concrete_powder_cyan.png", "color": {"r": 32, "g": 129, "b": 137}}, {"path": "concrete_powder_gray.png", "color": {"r": 67, "g": 71, "b": 74}}, {"path": "concrete_powder_green.png", "color": {"r": 85, "g": 104, "b": 39}}, {"path": "concrete_powder_light_blue.png", "color": {"r": 65, "g": 159, "b": 187}}, {"path": "concrete_powder_lime.png", "color": {"r": 110, "g": 166, "b": 36}}, {"path": "concrete_powder_magenta.png", "color": {"r": 169, "g": 73, "b": 161}}, {"path": "concrete_powder_orange.png", "color": {"r": 199, "g": 115, "b": 27}}, {"path": "concrete_powder_pink.png", "color": {"r": 201, "g": 134, "b": 159}}, {"path": "concrete_powder_purple.png", "color": {"r": 115, "g": 48, "b": 156}}, {"path": "concrete_powder_red.png", "color": {"r": 148, "g": 47, "b": 44}}, {"path": "concrete_powder_silver.png", "color": {"r": 136, "g": 136, "b": 130}}, {"path": "concrete_powder_white.png", "color": {"r": 198, "g": 200, "b": 200}}, {"path": "concrete_powder_yellow.png", "color": {"r": 204, "g": 175, "b": 48}}, {"path": "concrete_purple.png", "color": {"r": 88, "g": 27, "b": 137}}, {"path": "concrete_red.png", "color": {"r": 125, "g": 28, "b": 28}}, {"path": "concrete_silver.png", "color": {"r": 109, "g": 109, "b": 101}}, {"path": "concrete_white.png", "color": {"r": 182, "g": 187, "b": 188}}, {"path": "concrete_yellow.png", "color": {"r": 211, "g": 154, "b": 18}}, {"path": "crafting_table_side.png", "color": {"r": 111, "g": 90, "b": 56}}, {"path": "dead_brain_coral_block.png", "color": {"r": 109, "g": 103, "b": 100}}, {"path": "dead_bubble_coral_block.png", "color": {"r": 116, "g": 109, "b": 105}}, {"path": "dead_fire_coral_block.png", "color": {"r": 115, "g": 108, "b": 104}}, {"path": "dead_horn_coral_block.png", "color": {"r": 118, "g": 111, "b": 108}}, {"path": "dead_tube_coral_block.png", "color": {"r": 115, "g": 109, "b": 105}}, {"path": "diamond_block.png", "color": {"r": 97, "g": 196, "b": 191}}, {"path": "diamond_ore.png", "color": {"r": 114, "g": 125, "b": 128}}, {"path": "dirt.png", "color": {"r": 117, "g": 84, "b": 58}}, {"path": "dried_kelp_side.png", "color": {"r": 34, "g": 43, "b": 26}}, {"path": "emerald_block.png", "color": {"r": 74, "g": 194, "b": 106}}, {"path": "emerald_ore.png", "color": {"r": 95, "g": 114, "b": 101}}, {"path": "end_bricks.png", "color": {"r": 200, "g": 205, "b": 152}}, {"path": "end_stone.png", "color": {"r": 194, "g": 196, "b": 144}}, {"path": "fire_coral_block.png", "color": {"r": 143, "g": 30, "b": 41}}, {"path": "glass_black.png", "color": {"r": 21, "g": 21, "b": 21}}, {"path": "glass_blue.png", "color": {"r": 44, "g": 66, "b": 156}}, {"path": "glass_brown.png", "color": {"r": 89, "g": 66, "b": 44}}, {"path": "glass_cyan.png", "color": {"r": 66, "g": 111, "b": 134}}, {"path": "glass_gray.png", "color": {"r": 66, "g": 66, "b": 66}}, {"path": "glass_green.png", "color": {"r": 89, "g": 111, "b": 44}}, {"path": "glass_light_blue.png", "color": {"r": 89, "g": 134, "b": 189}}, {"path": "glass_lime.png", "color": {"r": 111, "g": 179, "b": 21}}, {"path": "glass_magenta.png", "color": {"r": 156, "g": 66, "b": 189}}, {"path": "glass_orange.png", "color": {"r": 189, "g": 111, "b": 44}}, {"path": "glass_pink.png", "color": {"r": 212, "g": 111, "b": 145}}, {"path": "glass_purple.png", "color": {"r": 111, "g": 55, "b": 156}}, {"path": "glass_red.png", "color": {"r": 134, "g": 44, "b": 44}}, {"path": "glass_silver.png", "color": {"r": 134, "g": 134, "b": 134}}, {"path": "glass_white.png", "color": {"r": 224, "g": 224, "b": 224}}, {"path": "glass_yellow.png", "color": {"r": 201, "g": 201, "b": 44}}, {"path": "glazed_terracotta_black.png", "color": {"r": 62, "g": 25, "b": 27}}, {"path": "glazed_terracotta_blue.png", "color": {"r": 42, "g": 58, "b": 125}}, {"path": "glazed_terracotta_brown.png", "color": {"r": 112, "g": 93, "b": 73}}, {"path": "glazed_terracotta_cyan.png", "color": {"r": 43, "g": 102, "b": 108}}, {"path": "glazed_terracotta_gray.png", "color": {"r": 73, "g": 80, "b": 82}}, {"path": "glazed_terracotta_green.png", "color": {"r": 99, "g": 122, "b": 54}}, {"path": "glazed_terracotta_light_blue.png", "color": {"r": 83, "g": 143, "b": 183}}, {"path": "glazed_terracotta_lime.png", "color": {"r": 141, "g": 173, "b": 48}}, {"path": "glazed_terracotta_magenta.png", "color": {"r": 182, "g": 87, "b": 166}}, {"path": "glazed_terracotta_orange.png", "color": {"r": 148, "g": 127, "b": 73}}, {"path": "glazed_terracotta_pink.png", "color": {"r": 208, "g": 137, "b": 160}}, {"path": "glazed_terracotta_purple.png", "color": {"r": 95, "g": 43, "b": 131}}, {"path": "glazed_terracotta_red.png", "color": {"r": 158, "g": 50, "b": 44}}, {"path": "glazed_terracotta_silver.png", "color": {"r": 128, "g": 147, "b": 148}}, {"path": "glazed_terracotta_white.png", "color": {"r": 170, "g": 187, "b": 177}}, {"path": "glazed_terracotta_yellow.png", "color": {"r": 209, "g": 173, "b": 81}}, {"path": "glowstone.png", "color": {"r": 128, "g": 105, "b": 63}}, {"path": "gold_block.png", "color": {"r": 220, "g": 211, "b": 72}}, {"path": "gold_ore.png", "color": {"r": 128, "g": 124, "b": 110}}, {"path": "grass_side.png", "color": {"r": 110, "g": 94, "b": 57}}, {"path": "gravel.png", "color": {"r": 111, "g": 108, "b": 107}}, {"path": "hardened_clay.png", "color": {"r": 132, "g": 81, "b": 58}}, {"path": "hardened_clay_stained_black.png", "color": {"r": 32, "g": 20, "b": 14}}, {"path": "hardened_clay_stained_blue.png", "color": {"r": 65, "g": 52, "b": 80}}, {"path": "hardened_clay_stained_brown.png", "color": {"r": 67, "g": 44, "b": 31}}, {"path": "hardened_clay_stained_cyan.png", "color": {"r": 76, "g": 79, "b": 79}}, {"path": "hardened_clay_stained_gray.png", "color": {"r": 50, "g": 37, "b": 31}}, {"path": "hardened_clay_stained_green.png", "color": {"r": 66, "g": 73, "b": 37}}, {"path": "hardened_clay_stained_light_blue.png", "color": {"r": 99, "g": 95, "b": 121}}, {"path": "hardened_clay_stained_lime.png", "color": {"r": 90, "g": 103, "b": 46}}, {"path": "hardened_clay_stained_magenta.png", "color": {"r": 131, "g": 77, "b": 95}}, {"path": "hardened_clay_stained_orange.png", "color": {"r": 142, "g": 73, "b": 33}}, {"path": "hardened_clay_stained_pink.png", "color": {"r": 142, "g": 68, "b": 69}}, {"path": "hardened_clay_stained_purple.png", "color": {"r": 104, "g": 61, "b": 75}}, {"path": "hardened_clay_stained_red.png", "color": {"r": 125, "g": 53, "b": 41}}, {"path": "hardened_clay_stained_silver.png", "color": {"r": 118, "g": 93, "b": 85}}, {"path": "hardened_clay_stained_white.png", "color": {"r": 184, "g": 156, "b": 141}}, {"path": "hardened_clay_stained_yellow.png", "color": {"r": 163, "g": 116, "b": 31}}, {"path": "hay_block_side.png", "color": {"r": 138, "g": 101, "b": 15}}, {"path": "horn_coral_block.png", "color": {"r": 190, "g": 175, "b": 58}}, {"path": "ice.png", "color": {"r": 111, "g": 153, "b": 224}}, {"path": "iron_block.png", "color": {"r": 196, "g": 196, "b": 196}}, {"path": "iron_ore.png", "color": {"r": 120, "g": 115, "b": 111}}, {"path": "lapis_block.png", "color": {"r": 35, "g": 60, "b": 122}}, {"path": "lapis_ore.png", "color": {"r": 87, "g": 97, "b": 119}}, {"path": "leaves.png", "color": {"r": 46, "g": 72, "b": 16}}, {"path": "log_acacia.png", "color": {"r": 91, "g": 86, "b": 77}}, {"path": "log_acacia_top.png", "color": {"r": 142, "g": 80, "b": 54}}, {"path": "log_big_oak.png", "color": {"r": 45, "g": 35, "b": 20}}, {"path": "log_big_oak_top.png", "color": {"r": 72, "g": 58, "b": 38}}, {"path": "log_birch.png", "color": {"r": 182, "g": 182, "b": 177}}, {"path": "log_birch_top.png", "color": {"r": 164, "g": 146, "b": 101}}, {"path": "log_jungle.png", "color": {"r": 76, "g": 60, "b": 23}}, {"path": "log_jungle_top.png", "color": {"r": 143, "g": 110, "b": 69}}, {"path": "log_oak.png", "color": {"r": 88, "g": 70, "b": 43}}, {"path": "log_oak_top.png", "color": {"r": 143, "g": 116, "b": 71}}, {"path": "log_spruce.png", "color": {"r": 39, "g": 24, "b": 10}}, {"path": "log_spruce_top.png", "color": {"r": 96, "g": 74, "b": 44}}, {"path": "magma.png", "color": {"r": 118, "g": 57, "b": 22}}, {"path": "melon_side.png", "color": {"r": 120, "g": 125, "b": 31}}, {"path": "mushroom_block_skin_brown.png", "color": {"r": 124, "g": 93, "b": 72}}, {"path": "mushroom_block_skin_red.png", "color": {"r": 160, "g": 34, "b": 32}}, {"path": "mycelium_side.png", "color": {"r": 97, "g": 76, "b": 65}}, {"path": "netherrack.png", "color": {"r": 98, "g": 47, "b": 46}}, {"path": "nether_brick.png", "color": {"r": 39, "g": 19, "b": 23}}, {"path": "nether_wart_block.png", "color": {"r": 102, "g": 5, "b": 6}}, {"path": "noteblock.png", "color": {"r": 94, "g": 62, "b": 45}}, {"path": "obsidian.png", "color": {"r": 18, "g": 16, "b": 26}}, {"path": "packed_ice.png", "color": {"r": 144, "g": 170, "b": 214}}, {"path": "planks_acacia.png", "color": {"r": 150, "g": 81, "b": 45}}, {"path": "planks_big_oak.png", "color": {"r": 54, "g": 35, "b": 16}}, {"path": "planks_birch.png", "color": {"r": 174, "g": 160, "b": 109}}, {"path": "planks_jungle.png", "color": {"r": 138, "g": 99, "b": 69}}, {"path": "planks_oak.png", "color": {"r": 140, "g": 114, "b": 70}}, {"path": "planks_spruce.png", "color": {"r": 93, "g": 69, "b": 41}}, {"path": "prismarine.png", "color": {"r": 94, "g": 149, "b": 132}}, {"path": "prismarine_bricks.png", "color": {"r": 91, "g": 145, "b": 129}}, {"path": "prismarine_dark.png", "color": {"r": 54, "g": 79, "b": 68}}, {"path": "purpur_block.png", "color": {"r": 148, "g": 109, "b": 148}}, {"path": "purpur_pillar.png", "color": {"r": 151, "g": 113, "b": 151}}, {"path": "quartz_block_chiseled.png", "color": {"r": 204, "g": 201, "b": 193}}, {"path": "quartz_block_lines.png", "color": {"r": 203, "g": 200, "b": 193}}, {"path": "quartz_block_side.png", "color": {"r": 208, "g": 206, "b": 200}}, {"path": "quartz_ore.png", "color": {"r": 113, "g": 77, "b": 73}}, {"path": "redstone_block.png", "color": {"r": 143, "g": 23, "b": 7}}, {"path": "redstone_lamp_off.png", "color": {"r": 67, "g": 41, "b": 25}}, {"path": "redstone_lamp_on.png", "color": {"r": 115, "g": 85, "b": 52}}, {"path": "redstone_ore.png", "color": {"r": 117, "g": 92, "b": 92}}, {"path": "red_nether_brick.png", "color": {"r": 60, "g": 4, "b": 6}}, {"path": "red_sand.png", "color": {"r": 149, "g": 77, "b": 29}}, {"path": "red_sandstone_carved.png", "color": {"r": 143, "g": 73, "b": 25}}, {"path": "red_sandstone_normal.png", "color": {"r": 145, "g": 74, "b": 26}}, {"path": "red_sandstone_smooth.png", "color": {"r": 149, "g": 76, "b": 27}}, {"path": "sand.png", "color": {"r": 192, "g": 185, "b": 141}}, {"path": "sandstone_carved.png", "color": {"r": 191, "g": 184, "b": 139}}, {"path": "sandstone_normal.png", "color": {"r": 190, "g": 184, "b": 138}}, {"path": "sandstone_smooth.png", "color": {"r": 195, "g": 188, "b": 146}}, {"path": "sea_lantern.png", "color": {"r": 162, "g": 184, "b": 176}}, {"path": "slime.png", "color": {"r": 106, "g": 175, "b": 88}}, {"path": "snow.png", "color": {"r": 211, "g": 221, "b": 221}}, {"path": "soul_sand.png", "color": {"r": 73, "g": 55, "b": 44}}, {"path": "sponge.png", "color": {"r": 170, "g": 171, "b": 74}}, {"path": "stone.png", "color": {"r": 110, "g": 110, "b": 110}}, {"path": "stonebrick.png", "color": {"r": 109, "g": 109, "b": 109}}, {"path": "stonebrick_carved.png", "color": {"r": 107, "g": 107, "b": 107}}, {"path": "stonebrick_cracked.png", "color": {"r": 106, "g": 106, "b": 106}}, {"path": "stonebrick_mossy.png", "color": {"r": 102, "g": 106, "b": 94}}, {"path": "stone_andesite.png", "color": {"r": 114, "g": 114, "b": 115}}, {"path": "stone_andesite_smooth.png", "color": {"r": 120, "g": 121, "b": 122}}, {"path": "stone_diorite.png", "color": {"r": 158, "g": 158, "b": 160}}, {"path": "stone_diorite_smooth.png", "color": {"r": 168, "g": 168, "b": 170}}, {"path": "stone_granite.png", "color": {"r": 133, "g": 99, "b": 86}}, {"path": "stone_granite_smooth.png", "color": {"r": 145, "g": 105, "b": 90}}, {"path": "stripped_acacia_log.png", "color": {"r": 154, "g": 81, "b": 52}}, {"path": "stripped_acacia_log_top.png", "color": {"r": 148, "g": 80, "b": 51}}, {"path": "stripped_birch_log.png", "color": {"r": 174, "g": 155, "b": 104}}, {"path": "stripped_birch_log_top.png", "color": {"r": 163, "g": 143, "b": 92}}, {"path": "stripped_dark_oak_log.png", "color": {"r": 85, "g": 67, "b": 43}}, {"path": "stripped_dark_oak_log_top.png", "color": {"r": 77, "g": 61, "b": 40}}, {"path": "stripped_jungle_log.png", "color": {"r": 151, "g": 117, "b": 75}}, {"path": "stripped_jungle_log_top.png", "color": {"r": 151, "g": 118, "b": 75}}, {"path": "stripped_oak_log.png", "color": {"r": 156, "g": 127, "b": 76}}, {"path": "stripped_oak_log_top.png", "color": {"r": 148, "g": 120, "b": 73}}, {"path": "stripped_spruce_log.png", "color": {"r": 102, "g": 79, "b": 46}}, {"path": "stripped_spruce_log_top.png", "color": {"r": 101, "g": 78, "b": 46}}, {"path": "tnt_side.png", "color": {"r": 149, "g": 83, "b": 64}}, {"path": "tube_coral_block.png", "color": {"r": 43, "g": 77, "b": 182}}, {"path": "wool_colored_black.png", "color": {"r": 18, "g": 18, "b": 22}}, {"path": "wool_colored_blue.png", "color": {"r": 46, "g": 50, "b": 138}}, {"path": "wool_colored_brown.png", "color": {"r": 100, "g": 62, "b": 35}}, {"path": "wool_colored_cyan.png", "color": {"r": 18, "g": 121, "b": 127}}, {"path": "wool_colored_gray.png", "color": {"r": 55, "g": 60, "b": 62}}, {"path": "wool_colored_green.png", "color": {"r": 74, "g": 96, "b": 24}}, {"path": "wool_colored_light_blue.png", "color": {"r": 51, "g": 154, "b": 191}}, {"path": "wool_colored_lime.png", "color": {"r": 98, "g": 162, "b": 22}}, {"path": "wool_colored_magenta.png", "color": {"r": 166, "g": 60, "b": 158}}, {"path": "wool_colored_orange.png", "color": {"r": 211, "g": 103, "b": 17}}, {"path": "wool_colored_pink.png", "color": {"r": 209, "g": 124, "b": 151}}, {"path": "wool_colored_purple.png", "color": {"r": 107, "g": 37, "b": 151}}, {"path": "wool_colored_red.png", "color": {"r": 141, "g": 34, "b": 30}}, {"path": "wool_colored_silver.png", "color": {"r": 124, "g": 125, "b": 118}}, {"path": "wool_colored_white.png", "color": {"r": 205, "g": 207, "b": 208}}, {"path": "wool_colored_yellow.png", "color": {"r": 218, "g": 174, "b": 34}}]

initialize();

setInterval(() => {
	createBlocks();
}, 100);
