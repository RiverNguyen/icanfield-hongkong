import {IDataMedia} from '@/sections/homepage/banner'
export function convertToIframe(dataVideo: IDataMedia) {
  if (dataVideo.type !== 'youtube' && dataVideo.type !== 'tiktok') {
    return undefined
  }

  const media = {
    youtube: (url: string) => {
      const youtubeMatch = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
      )
      if (youtubeMatch && youtubeMatch[1]) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}`
      }
    },
    tiktok: (url: string) => {
      const tiktokMatch = url.match(
        /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/.*\/video\/([0-9]+)/,
      )

      if (tiktokMatch && tiktokMatch[1]) {
        return `https://www.tiktok.com/embed/${tiktokMatch[1]}?autoplay=1&loop=1&playsinline=1&muted=1`
      }
    },
  }

  if (dataVideo.type in media) {
    return media[dataVideo.type as keyof typeof media](
      dataVideo[dataVideo.type],
    )
  }
}
