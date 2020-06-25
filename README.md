# ProcessImage

Create thumbnail, mobile, and tablet versions of an image that are optimized for smaller file sizes. The original image is left unchanged.

# ES6

## Create different versions of the original image

```
import ProcessImage from 'process-image'

const originPath = '/absolute/path/to/your/image.jpg'
cosnt outputPath = '/absolute/path/to/output/directory'

const pi = new ProcessImage(tempOrigPath, outputPath)

async createImages() => {
  await pi.createThumbnail()
  await pi.createMobileImage()
  await pi.createTabletImage()

  console.log('pi.thumbnailPath :>> ', pi.thumbnailPath)
  console.log('pi.mobilePath :>> ', pi.mobilePath)
  console.log('pi.tabletPath :>> ', pi.tabletPath)
}

await createImages()

```




