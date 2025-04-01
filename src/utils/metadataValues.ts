/* eslint-disable @typescript-eslint/no-explicit-any */
export default function metadataValues(res: any) {
  if (!res || !res?.yoast_head_json) {
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN!),
      title: res?.title || 'iCanfield',
      description: res?.description || 'iCanfield',
      alternates: {
        canonical: './',
      },
      author: 'iCanfield',
    }
  }

  const result = res?.yoast_head_json
  const meta = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN!),
    title: result?.title,
    description: result?.description,
    alternates: {
      canonical: './',
    },
    author: 'iCanfield',
    openGraph: {
      title: result?.title,
      description: result?.description,
      url: './',
      siteName: result?.og_site_name,
      images: Array.isArray(result?.og_image)
        ? result?.og_image.map((img: { url: string }) => img.url)
        : result?.og_image?.url
          ? [result?.og_image?.url]
          : [],
      locale: result?.og_locale,
      type: result?.og_type,
    },
    twitter: {
      card: result?.twitter_card || 'summary_large_image',
      title: result?.title,
      description: result?.description,
      creator: 'jenho',
      images: Array.isArray(result?.og_image)
        ? result?.og_image.map((img: { url: string }) => img.url)
        : result?.og_image?.url
          ? [result?.og_image?.url]
          : [],
      misc: result?.twitter_misc,
    },
  }

  if (!meta.openGraph.images.length) {
    meta.openGraph.images = [
      {
        url: '/images/home/stories/background-left-story-mb.jpg',
        width: 1200,
        height: 630,
      },
    ]
  }

  if (!meta.twitter.images.length) {
    meta.twitter.images = [
      {
        url: '/images/home/stories/background-left-story-mb.jpg',
      },
    ]
  }

  return meta
}
