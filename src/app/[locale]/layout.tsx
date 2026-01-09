import {hasLocale, NextIntlClientProvider} from 'next-intl'
import {getMessages} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {routing} from '@/i18n/routing'
import {Toaster} from 'sonner'
import Header from '@/layout/header'
import Footer from '@/layout/footer'
import fetchData from '@/fetch/fetchData'
import Providers from '@/components/proccessBar'
import ContactButtons from '@/components/contact-buttons'
import Script from 'next/script'
import localFont from 'next/font/local'
import {Inter} from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({subsets: ['latin']})
const optima = localFont({
  src: [
    {
      path: '../fonts/SVN-Optima-Regular.ttf',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '../fonts/SVN-Optima-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/SVN-Optima-DemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-optima',
})

const HTML_LOCALES = {
  zh: 'zh-Hant',
  'zh-cn': 'zh-Hans',
  en: 'en-US',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {locale: string}
}) {
  const {locale} = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound() // Validate locale hợp lệ
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  const requestFooter = {
    api: '/footer-options?acf_format=standard&lang=' + locale,
    option: {
      next: {revalidate: 60},
    },
  }
  const requestHeader = {
    api: '/header-options?acf_format=standard&lang=' + locale,
    option: {
      next: {revalidate: 60},
    },
  }
  const requestPopup = {
    api: '/form-all-page?lang=' + locale,
    option: {
      next: {revalidate: 60},
    },
  }
  const [dataFooter, dataHeader, dataPopup] = await Promise.all([
    fetchData(requestFooter),
    fetchData(requestHeader),
    fetchData(requestPopup),
  ])

  return (
    <html lang={HTML_LOCALES[locale as keyof typeof HTML_LOCALES]}>
      <head>
        {/* Gắn Facebook Pixel bằng thẻ script thuần */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1247066973474967');
            fbq('track', 'PageView');
          `,
          }}
        />
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy='afterInteractive'
        />
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-B54QV5PM5T'
          strategy='afterInteractive'
        />
        <Script
          id='google-analytics'
          strategy='afterInteractive'
        >
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B54QV5PM5T');
        `}
        </Script>
      </head>
      <body className={`${optima.variable} ${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <NextTopLoader
            color='#F5C178'
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing='ease'
            speed={200}
            zIndex={1600}
            showAtBottom={false}
          />
          <Header
            data={dataHeader?.data}
            dataFooter={dataFooter.data}
            dataPopup={dataPopup?.data}
          />

          <Providers>{children}</Providers>

          <Toaster
            theme='light'
            richColors
            position='bottom-right'
            closeButton
            duration={4000}
            expand
          />

          <ContactButtons data={dataFooter?.data?.contact_button} />
          <Footer dataFooter={dataFooter?.data} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
