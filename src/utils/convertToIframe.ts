export function convertToIframe(dataVideo: {url: string; type: string}) {
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