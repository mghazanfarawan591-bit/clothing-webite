import { useCart } from '../context/CartContext'
import products from '../data/products.json'
import { useState } from 'react'

export default function CartPage(){
  const { cart, updateQty, remove, clear } = useCart()
  const [loading, setLoading] = useState(false)

  const items = cart.map(ci => ({ ...products.find(p=>p.id === ci.id), quantity: ci.quantity }))
  const total = items.reduce((s,i)=> s + (i?.price || 0) * i.quantity, 0)

  async function checkout(){
    setLoading(true)
    const res = await fetch('/api/checkout_sessions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: cart }) })
    const j = await res.json()
    if(j.url) window.location = j.url
    else { alert('Checkout error'); setLoading(false) }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl mb-4">Your Cart</h1>
      {items.length === 0 && <p className="text-gray-600">Cart is empty.</p>}
      <div className="space-y-4">
        {items.map(it => (
          <div key={it.id} className="flex items-center justify-between border p-3 rounded">
            <div className="flex items-center">
              <img src={it.image} className="w-20 h-20 object-cover rounded mr-4" />
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-sm text-gray-500">${it.price}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <input type="number" min="1" value={it.quantity} onChange={e=> updateQty(it.id, parseInt(e.target.value||1))} className="w-16 border p-1" />
              <div className="font-semibold">${(it.price * it.quantity).toFixed(2)}</div>
              <button onClick={()=> remove(it.id)} className="text-red-600">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-lg font-bold">Total: ${total.toFixed(2)}</div>
        <div>
          <button onClick={checkout} disabled={loading || items.length===0} className="bg-gray-900 text-white px-4 py-2 rounded">{loading ? 'Redirecting...' : 'Checkout with Stripe'}</button>
        </div>
      </div>
    </main>
  )
}
