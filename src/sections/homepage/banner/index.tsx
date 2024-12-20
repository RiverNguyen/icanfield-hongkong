'use client'
import ImageV2 from '@/components/image/ImageV2'
import React, {useEffect, useState} from 'react'
import ReactPlayer from 'react-player'

const BannerHomepage = () => {
  const dataVideo = {
    url: '/videos/homepage/banner/banner.mp4',
    type: 'upload',
  }

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // function convert url to iframe
  function convertToIframe(dataVideo: {url: string; type: string}) {
    if (!dataVideo?.url || !dataVideo?.type) {
      return undefined
    }
    const {url, type} = dataVideo
    let iframeUrl = ''
    if (type === 'youtube') {
      const youtubeMatch = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
      )
      if (youtubeMatch && youtubeMatch[1]) {
        iframeUrl = `https://www.youtube.com/embed/${youtubeMatch[1]}`
      }
    } else if (type === 'tiktok') {
      const tiktokMatch = url.match(
        /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/.*\/video\/([0-9]+)/,
      )

      if (tiktokMatch && tiktokMatch[1]) {
        iframeUrl = `https://www.tiktok.com/embed/${tiktokMatch[1]}`
      }
    }

    return iframeUrl || undefined
  }

  return (
    <section className='w-full h-[42.8125rem] bg-red-500'>
      <div className='banner-video'>
        {isClient && dataVideo.type === 'upload' ? (
          <ReactPlayer
            url={dataVideo.url}
            playing
            loop
            muted
            width='100%'
            height='100%'
          />
        ) : (
          isClient && (
            <ReactPlayer
              url={convertToIframe(dataVideo)}
              playing
              loop
              muted
              width='100%'
              height='100%'
            />
          )
        )}
      </div>
      <ImageV2
        src='/imgs/homepage/banner/d-text.png'
        alt='banner'
        layout='fill'
        objectFit='cover'
        objectPosition='center'
        className='absolute top-0 left-0'
        />
    </section>
  )
}

export default BannerHomepage
