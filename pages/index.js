import Head from 'next/head'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

export default function Home(){
  return (
    <>
      <Head>
        <title>Hareem garments</title>
      </Head>
      <main>
        <section className="bg-[url('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1600&q=80')] bg-cover bg-center">
          <div className="bg-white/60 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 py-20 flex items-center justify-between">
              <div>
                <img src="/logo.svg" alt="Hareem garments" className="h-16 mb-4" />
                <h2 className="text-4xl font-serif mb-2">Curated Luxury Apparel</h2>
                <p className="text-gray-700 mb-4">Thoughtfully crafted pieces for timeless style.</p>
                <a href="#products" className="btn-accent px-5 py-3 rounded text-sm inline-block">Shop New Arrivals</a>
              </div>
              <div className="hidden md:block w-1/3">
                <img src="https://images.unsplash.com/photo-1520975923037-7f6c2a7230b0?w=800&q=80" className="rounded shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Featured</h3>
            <a href="/admin" className="text-sm px-3 py-2">Admin</a>
          </div>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(p => <ProductCard key={p.id} p={p} />)}
          </section>
        </section>
      </main>
    </>
  )
}
