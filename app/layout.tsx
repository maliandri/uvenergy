import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://uvenergy.com.ar'),
  title: {
    default: 'UV Energy | Energía Solar en Patagonia Argentina',
    template: '%s | UV Energy',
  },
  description:
    'Instalación de paneles solares, kits solares, sistemas on grid, refrigeración solar y servicios de piscinas con energía solar en Patagonia. Neuquén, Río Negro y Chubut.',
  keywords: [
    'energía solar',
    'paneles solares',
    'Patagonia',
    'Neuquén',
    'kit solar',
    'on grid',
    'instalación solar',
    'refrigeración solar',
    'piscinas solares',
    'UV Energy',
  ],
  authors: [{ name: 'UV Energy', url: 'https://uvenergy.com.ar' }],
  creator: 'UV Energy',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://uvenergy.com.ar',
    siteName: 'UV Energy',
    title: 'UV Energy | Energía Solar en Patagonia Argentina',
    description:
      'Instalación de paneles solares, kits solares y servicios de energía solar en Patagonia. +500 instalaciones en Neuquén, Río Negro y Chubut.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'UV Energy - Energía Solar en Patagonia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UV Energy | Energía Solar en Patagonia',
    description: 'Instalación de paneles solares en Patagonia. +500 instalaciones.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://uvenergy.com.ar',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  )
}
