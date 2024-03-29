import './globals.css'
import { Open_Sans } from 'next/font/google'
import Navbar from "./(shared)/Navbar"


const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog App',
  description: 'Take Home Test in ReactJS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Navbar />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
