import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function ProductCard({p}){
  const { add } = useCart()
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <img src={p.image} alt={p.title} className="w-full h-48 md:h-56 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{p.title}</h3>
        <p className="text-sm text-gray-500">{p.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-bold">${p.price}</div>
          <div className="flex items-center gap-2">
            <button onClick={()=> add({ id: p.id, price: p.price, title: p.title, image: p.image })} className="text-sm bg-white border px-3 py-1 rounded">Add</button>
            <Link href={`/products/${p.id}`}>
              <a className="text-sm text-white bg-gray-900 px-3 py-1 rounded">View</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
