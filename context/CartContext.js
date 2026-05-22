import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }){
  const [cart, setCart] = useState([])

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('hg_cart')
      if(raw) setCart(JSON.parse(raw))
    }catch(e){}
  },[])

  useEffect(()=>{
    try{ localStorage.setItem('hg_cart', JSON.stringify(cart)) }catch(e){}
  },[cart])

  function add(item){
    setCart(prev => {
      const found = prev.find(p=>p.id === item.id)
      if(found){
        return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + (item.quantity || 1) } : p)
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }]
    })
  }

  function remove(id){ setCart(prev => prev.filter(p=>p.id !== id)) }
  function updateQty(id, qty){ setCart(prev => prev.map(p => p.id === id ? { ...p, quantity: qty } : p)) }
  function clear(){ setCart([]) }

  return <CartContext.Provider value={{ cart, add, remove, updateQty, clear }}>{children}</CartContext.Provider>
}

export function useCart(){ return useContext(CartContext) }
