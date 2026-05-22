import { useRouter } from 'next/router'
import products from '../../data/products.json'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'

export default function ProductPage(){
  const router = useRouter()
  const { id } = router.query
  const p = products.find(x => x.id === id)
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  if(!p) return <div className="p-8">Loading...</div>

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold">{p.title}</h1>
      <p className="text-gray-500">{p.category}</p>
      <img src={p.image} className="w-full h-96 object-cover mt-4 rounded" />
      <p className="mt-4">{p.description}</p>
      <div className="mt-6 flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">${p.price}</div>
          <div className="mt-2">
            <label className="mr-2">Qty</label>
            <input type="number" min="1" value={qty} onChange={e=>setQty(parseInt(e.target.value||1))} className="w-16 border p-1" />
          </div>
        </div>
        <div className="space-x-2">
          <button onClick={()=> add({id: p.id, price: p.price, title: p.title, image: p.image, quantity: qty})} className="bg-gray-900 text-white px-4 py-2 rounded">Add to cart</button>
        </div>
      </div>
    </main>
  )
}
