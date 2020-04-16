import React from 'react'
import ImageGallery from 'react-image-gallery';

interface ImageCarouselProps { images: any[]}

function ImageCarousel(props: ImageCarouselProps): JSX.Element {
  return (
  <ImageGallery 
    items={props.images} 
    autoPlay={true} 
    showPlayButton={props.images.length > 1} 
    showIndex={props.images.length > 1} 
    showBullets={props.images.length > 1}
    showThumbnails={false}
    useBrowserFullscreen={false}
  />
  )
}

export default ImageCarousel