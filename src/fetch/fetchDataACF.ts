/* eslint-disable @typescript-eslint/no-explicit-any */

export type RequestPostGuest = {
  api: string
  headers?: any
  option?: any
  method?: string
}

export default async function fetchDataACF(request: RequestPostGuest) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ACF!}${request.api}`,
      {
        method: request.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
        ...request.option,
      },
    )

    // Check if response is JSON
    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON response but got ${contentType}`)
    }

    if (!res.ok) {
      // Return error response as JSON if possible
      try {
        return res.json()
      } catch {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }
    }

    return res.json()
  } catch (error: unknown) {
    // Convert the error to a string or handle based on its type
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(
      `${process.env.NEXT_PUBLIC_API_ACF!}${request.api}: ${errorMessage}`,
    )
  }
}
