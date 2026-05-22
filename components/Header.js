import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function Header(){
  const { cart } = useCart()
  const count = cart.reduce((s,i)=>s + (i.quantity||0), 0)
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/"><a className="text-2xl font-serif">Hareem garments</a></Link>
        <nav>
          <Link href="/cart"><a className="px-3 py-2">Cart ({count})</a></Link>
        </nav>
      </div>
    </header>
  )
}
