const fs = require('fs')
const path = require('path')
const { resolve } = require('path')

const Canvas = require('canvas')

const canvas = Canvas.createCanvas(320, 320)
const ctx = canvas.getContext('2d')

// Create gradients
const Image = Canvas.Image


const img = new Image()
img.onload = () => {
  ctx.drawImage(img, 0, 0)
  canvas.createJPEGStream().pipe(fs.createWriteStream(path.join(__dirname, 'passedThroughGrayscale.jpg')))
}
img.onerror = err => {
  throw err
}

img.src = path.join(__dirname, 'images', 'grayscaleImage.jpg')
