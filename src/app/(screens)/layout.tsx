import type { Metadata } from 'next'
import { Poppins } from "next/font/google"
import '../globals.css'
import NavBar from '@/components/common/NavBar'
import FooterSection from '@/components/sections/FooterSection'
import { Toaster } from '@/components/ui/toaster'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import { SearchProvider } from '@/context/searchContext'
import { AuthWrapper } from '@/components/ui/AuthWrapper'
import Chatbot from '@/components/chatbot-ai/chatbot'

export const metadata: Metadata = {
  title: 'Furniro Ecommerce',
  description: 'Get any furniture items on the fly',
}

const poppin = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "700"] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://widget.kommunicate.io/v2/kommunicate.app"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.kommunicate = window.kommunicate || {};
              window.kommunicate._globals = {
                appId: "${process.env.NEXT_PUBLIC_KOMMUNICATE_APP_ID}",
                popupWidget: true,
                automaticChatOpenOnNavigation: true
              };
            `,
          }}
        />
      </head>
      <body className={poppin.className} >
        <main className="bg-white">
          <Chatbot />
          <AuthWrapper>
            <SearchProvider>
              <LoadingIndicator />
              <NavBar />
              {children}
              <Toaster />
              <div className="mt-[56px]">
                <FooterSection />
              </div>
            </SearchProvider>
          </AuthWrapper>
        </main>
      </body>
    </html>
  )
}