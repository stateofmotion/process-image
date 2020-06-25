import graphicsMagic from 'gm'
import path from 'path'

const gm = graphicsMagic.subClass({ imageMagick: true })

export default class ProcessImage {
  constructor(imagePath, outputDir) {
    this.imagePath = imagePath
    this.outputDir = outputDir

    const extension = path.extname(this.imagePath);
    this.fileName = path.basename(this.imagePath, extension);
  }

  // Need to create a thumbnail image _this is cropped to be a square, centered,
  async createThumbnail() {
    const outputPath = `${this.outputDir}/thumbnail.jpg`
    const _this = this
    await new Promise((resolve, reject) => {
      gm(this.imagePath)
        .resize('200', '200', '^')
        .gravity('Center')
        .crop('200', '200')
        .quality(".65")
        .write(outputPath, (err, stdout) => {
          _this.thumbnailPath = outputPath
          if (err) {
            console.log('there was a problem creating the thumbnail', err);
            reject(err)
          } else {
            console.log('Thumbnail created!');
            resolve(stdout)
          }
        })
    })
  }

  // Only resize image if width is greater than 500
  async createMobileImage() {
    const outputPath = `${this.outputDir}/mobile.jpg`
    const _this = this
    await new Promise((resolve, reject) => {
      gm(this.imagePath)
        .size(function (err, size) {
          if (err) { console.log('there was a problem creating the mobile image: ', e) }
          if (size.width > 500) {
            this.resize('500')
            this.quality(".65")
            this.write(outputPath, (err, stdout) => {
              _this.mobilePath = outputPath
              if (err) {
                console.log('there was a problem creating the mobile image: ', err);
                reject(err)
              } else {
                console.log('Mobile image created!');
                resolve(stdout)
              }
            })
          } else {
            resolve('image too small for mobile')
          }
        })
    })
  }

  // Only resize image if width is greater than 1050
  async createTabletImage() {
    const outputPath = `${this.outputDir}/tablet.jpg`
    const _this = this
    await new Promise((resolve, reject) => {
      gm(this.imagePath)
        .size(function (err, size) {
          if (err) { console.log('there was a problem creating the tablet image: ', e) }
          if (size.width > 1050) {
            this.resize('1050')
            this.quality(".70")
            this.write(outputPath, (err, stdout) => {
              _this.tabletPath = outputPath
              if (err) {
                console.log('there was a problem creating the tablet image: ', err);
                reject(err)
              } else {
                console.log('Tablet image created!');
                resolve(stdout)
              }
            })
          } else {
            resolve('image too small for tablet')
          }
        })
    })
  }
}