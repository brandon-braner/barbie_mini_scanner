import './globals.css';

export const metadata = {
  title: 'BarbieScan',
  description: 'Take the guess work out of what Barbie Mini you are getting.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
