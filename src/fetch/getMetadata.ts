export default async function getMetadata(request: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ACF}${request}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 600,
        },
      },
    )

    // Check if response is JSON
    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.error(`Expected JSON response but got ${contentType}`)
      return null
    }

    // Check if the response is not okay
    if (!res.ok) {
      return null
    }
    // console.log(`${process.env.NEXT_PUBLIC_API_ACF}${request}&fields=yoast_head_json&acf_format=standard`)
    // Parse and return the JSON response
    return await res.json()
  } catch (error: unknown) {
    // Convert the error to a string or handle based on its type
    // const errorMessage = error instanceof Error ? error.message : String(error)
    // throw new Error(`${env.API}${request.api}: ${errorMessage}`)
    console.error('Error fetching metadata:', error)
    return null
  }
}
