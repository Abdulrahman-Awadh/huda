import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'هدى - تعلم لغة الإشارة',
  description: 'دليلكم الودود لتعلم لغة الإشارة وبناء جسور التواصل مع هدى',
  keywords: 'لغة الإشارة، تعلم، هدى، تواصل، إعاقة سمعية، تعليم',
  authors: [{ name: 'Huda Sign Language Team' }],
  openGraph: {
    title: 'هدى - تعلم لغة الإشارة',
    description: 'تعلموا لغة الإشارة مع هدى - شخصيتكم الودودة ثلاثية الأبعاد',
    type: 'website',
    locale: 'ar_SA',
  },
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100;200;300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-arabic bg-gradient-primary min-h-screen" suppressHydrationWarning>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}