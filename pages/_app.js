import '../styles/globals.css'
import { CartProvider } from '../context/CartContext'
import Header from '../components/Header'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Hareem garments — premium curated clothing." />
        <link rel="icon" href="/favicon.svg" />
        <meta property="og:title" content="Hareem garments" />
        <meta property="og:description" content="Premium curated clothing — new arrivals, crafted quality." />
        <meta property="og:image" content="/logo.svg" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </CartProvider>
  )
}
