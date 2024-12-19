import {Metadata} from 'next'
import './globals.css'
import {Inter} from 'next/font/google'
import localFont from 'next/font/local'

const SVNOptima = localFont({
  src: [
    {
      path: './fonts/SVN-Optima-Regular.ttf',
      weight: '400',
    },
    {
      path: './fonts/SVN-Optima-Medium.ttf',
      weight: '500',
    },
    {
      path: './fonts/SVN-Optima-DemiBold.ttf',
      weight: '600',
    },
  ],
  variable: '--SVN-optima',
})
const inter = Inter({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['vietnamese'],
})
export const metadata: Metadata = {
  title: 'ICANFIELD',
  description: '',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning={true}
    >
      <body className={`${inter.className} ${SVNOptima.variable}`}>
        <div className='font-SVNOptima'>hello</div>
      </body>
    </html>
  )
}
