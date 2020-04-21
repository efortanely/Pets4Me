import React from 'react'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import Youtube from 'react-youtube';

interface ImageCarouselProps { items: any[] }

export const getVideo = (video_item : ReactImageGalleryItem) : JSX.Element => {
  let video_url = video_item.original
  let videoId = video_url?.split('watch?v=')[1];

  return <Youtube videoId={videoId} onReady={_onReady} />;
}

export function _onReady(event: { target: { pauseVideo: () => void; }; }) {
  event.target.pauseVideo();
}

const ImageCarousel: React.FunctionComponent<ImageCarouselProps> = (props: ImageCarouselProps) => {
  const items: ReactImageGalleryItem[] = props.items.map(item => {
    console.log(Object.keys(item))
    if("photo" in item){
      return {original: item["photo"]} as ReactImageGalleryItem
    }else if("video" in item){
      return {original: item["video"], renderItem: (item: ReactImageGalleryItem) => getVideo(item)} as ReactImageGalleryItem
    }
    return {} as ReactImageGalleryItem;
  });

  return (
  <div>
  <ImageGallery 
    items={items} 
    autoPlay={false} 
    showPlayButton={props.items.length > 1} 
    showIndex={props.items.length > 1} 
    showBullets={props.items.length > 1}
    showThumbnails={false}
    useBrowserFullscreen={false}
  />
  </div>
  )
}

export default ImageCarousel