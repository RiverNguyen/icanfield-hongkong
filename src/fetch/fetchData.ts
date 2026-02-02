/* eslint-disable @typescript-eslint/no-explicit-any */

export type RequestPostGuest = {
  api: string
  headers?: any
  option?: any
  method?: string
  fallback?: any
}

export default async function fetchData(request: RequestPostGuest) {
  const fallback = request.fallback ?? {data: null}
  const fallbackWithError = (message: string, status?: number) => {
    if (fallback && typeof fallback === 'object' && !Array.isArray(fallback)) {
      return {...fallback, error: {message, status}}
    }
    return fallback
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API!}${process.env.NEXT_PUBLIC_API_VERSION!}${
        request.api
      }`,
      {
        method: request.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
        next: {
          revalidate: 60,
        },
        ...request.option,
      },
    )

    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      console.error(`Expected JSON response but got ${contentType || 'unknown'}`)
      return fallbackWithError('Non-JSON response', res.status)
    }

    const json = await res.json().catch(() => null)
    if (!res.ok) {
      return json ?? fallbackWithError(res.statusText, res.status)
    }

    return json ?? fallback
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(
      `${process.env.NEXT_PUBLIC_API!}${process.env.NEXT_PUBLIC_API_VERSION!}${
        request.api
      }: ${errorMessage}`,
    )
    return fallbackWithError(errorMessage)
  }
}
