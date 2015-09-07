#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import shutil
from PIL import Image

orig_folder = "main.buildv82a/html5"
dest_folder = "main.buildv82a/html5b"

orig = [[57, 57, 41, 255], 
        [123, 115, 99, 255], 
        [181, 165, 107, 255], 
        [231, 214, 156, 255]]

other = [[4,8,23, 255],
         [57,57,57, 255],
         [128,128,128, 255],
         [232,232,232, 255]]


def getOrigIndex(rgb):

    index = 0
    for x in orig:
        if rgb[0] == x[0] and rgb[1] == x[1] and rgb[2] == x[2]:
            return index
        index += 1

    return -1


def getNewColor(rgb):
    index = getOrigIndex(rgb)

    if index != -1:
        return other[getOrigIndex(rgb)]

    return [0,0,0,0]


def readImage(image_name):
    im = Image.open(image_name).convert('RGBA')
    px = im.load()
    nim = Image.new("RGBA", im.size)

    width, height = im.size

    for x in range(0,width):
        for y in range(0,height):
            nim.putpixel((x, y), tuple(getNewColor(px[x, y])))

    im.close()
    nim.save(image_name)


def executeFullTree():
    # create a copy
    try:
        shutil.rmtree(dest_folder)
    except ex:
        print str(ex)

    shutil.copytree(orig_folder, dest_folder)

    # convert all images
    for root, dirs, files in os.walk(os.path.join(os.path.dirname(__file__), dest_folder)):
        for f in files:
            fullpath = os.path.join(root, f)
            if os.path.splitext(fullpath)[1] == '.png':
                print fullpath
                readImage(fullpath)


if __name__ == "__main__":
    executeFullTree()
