import type { Metadata } from 'next'
import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import Provider from '@/components/Provider'

export const metadata: Metadata = {
  title: 'Iprompt',
  description: 'Discover & share AI generated prompts',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
          <div className='app'>
            <Navbar />
            <div className='app_children'>
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  )
}
