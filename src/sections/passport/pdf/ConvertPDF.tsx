'use client'

import React, {useState} from 'react'
import {getDocument, GlobalWorkerOptions} from 'pdfjs-dist'
import 'pdfjs-dist/build/pdf.worker.mjs'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Card, CardContent} from '@/components/ui/card'
import {Search} from 'lucide-react'

// Set up the worker
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${getDocument.version}/pdf.worker.min.js`

interface PassportData {
  rank: string
  passport: string
  visaFreeScore: string
}

interface SearchResult {
  found: boolean
  data?: PassportData
}

export default function PassportSearch() {
  const [passportData, setPassportData] = useState<PassportData[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAndProcessPDF = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const pdfUrl =
        'https://cdn.henleyglobal.com/storage/app/media/HPI/Henley%20Passport%20Index%202025%20January%20Global%20Ranking.pdf'
      const response = await fetch(pdfUrl)
      if (!response.ok) throw new Error('Failed to fetch PDF')

      const pdfData = await response.arrayBuffer()
      const pdfDoc = await getDocument(pdfData).promise

      let extractedText = ''
      // Only process pages 2 and 3
      for (let i = 2; i <= 3; i++) {
        const page = await pdfDoc.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ')
        extractedText += pageText + '\n'
      }

      const parsedData = parseTableToJson(extractedText)
      setPassportData(parsedData)
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to load passport data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const parseTableToJson = (rawText: string): PassportData[] => {
    const lines = rawText.split('\n')
    const data: PassportData[] = []

    lines.forEach((line) => {
      // Match lines that start with a number followed by text and ending with a number
      const match = line.match(/^(\d+)\s+(.+?)\s+(\d+)$/)
      if (match) {
        data.push({
          rank: match[1],
          passport: match[2].trim(),
          visaFreeScore: match[3],
        })
      }
    })

    return data
  }

  const searchPassport = (term: string) => {
    if (!term.trim()) {
      setSearchResult(null)
      return
    }

    const result = passportData.find(
      (item) => item.passport.toLowerCase() === term.toLowerCase(),
    )

    setSearchResult({
      found: !!result,
      data: result,
    })
  }

  // Initialize by loading the PDF data
  React.useEffect(() => {
    fetchAndProcessPDF()
  }, [])

  return (
    <div className='container mx-auto max-w-2xl p-4'>
      <h1 className='mb-6 text-2xl font-bold'>Passport Rank Search</h1>

      <div className='mb-6 flex gap-2'>
        <Input
          type='text'
          placeholder='Enter passport name...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='flex-1'
        />
        <Button
          onClick={() => searchPassport(searchTerm)}
          // disabled={isLoading || !passportData.length}
        >
          <Search className='mr-2 h-4 w-4' />
          Search
        </Button>
      </div>

      {error && <p className='mb-4 text-red-500'>{error}</p>}

      {isLoading && (
        <p className='text-muted-foreground'>Loading passport data...</p>
      )}

      {searchResult && (
        <Card>
          <CardContent className='pt-6'>
            {searchResult.found ? (
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>Passport:</span>
                  <span>{searchResult.data?.passport}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>Rank:</span>
                  <span>{searchResult.data?.rank}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>Visa-free Score:</span>
                  <span>{searchResult.data?.visaFreeScore}</span>
                </div>
              </div>
            ) : (
              <p className='text-muted-foreground text-center'>
                No passport found with that name. Please check the spelling and
                try again.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
