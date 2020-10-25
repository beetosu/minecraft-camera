import os, json
from PIL import Image

def get_blocks():
    directory = []
    for filename in os.listdir("./textures"):
        directory.append({"path": filename})
    with open("blocks.json", "w") as f:
        json.dump(directory, f)
    add_color()

def add_color():
    with open("blocks.json") as f:
        blocks = json.load(f)
    for blk in blocks:
        img = Image.open("textures/" + blk["path"])
        px = img.load()
        color = {"r": 0,"g": 0,"b": 0}
        for x in range(15):
            for y in range(15):
                color["r"] += px[x, y][0]
                color["g"] += px[x, y][1]
                color["b"] += px[x, y][2]
        for k, v in color.items():
            color[k] = int(v / 256)
        blk["color"] = color
    with open("colors.json", "w") as g:
        json.dump(blocks, g)

get_blocks()
