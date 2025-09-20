import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: 'Oga Landlord – Dashboard & Finance Course for Nigerian Property Owners',
  description:
    'Track rent, manage tenants, and learn property finance with Oga Landlord. Designed for Nigerian landlords in Lagos, Abuja, and across Nigeria.',
  keywords: [
    'landlord dashboard Nigeria',
    'property management software Nigeria',
    'rent collection Lagos',
    'landlord finance course',
    'real estate Nigeria',
    'property portfolio management',
    'tenant management Abuja',
  ],
  authors: [{ name: 'Oga Landlord' }],
  creator: 'Oga Landlord',
  publisher: 'Oga Landlord',
  metadataBase: new URL('https://ogalandlord.com.ng'),
  openGraph: {
    title: 'Oga Landlord – Dashboard & Finance Course',
    description:
      'Discover Oga Landlord: a powerful dashboard and finance training for Nigerian landlords. Manage rentals, reduce tenant default, and grow your portfolio.',
    type: 'website',
    locale: 'en_NG', // Nigeria-specific locale
    url: 'https://ogalandlord.com.ng',
    siteName: 'Oga Landlord',
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
  verification: {
    google: 'your-google-verification-code',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={notoSans.className}>{children}</body>
    </html>
  )
}
