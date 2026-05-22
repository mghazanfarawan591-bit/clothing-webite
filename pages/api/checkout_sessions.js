import fs from 'fs'
import path from 'path'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const stripeSecret = process.env.STRIPE_SECRET_KEY
  if(!stripeSecret) return res.status(500).json({error:'Stripe secret not configured'})
  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(stripeSecret)

  const { items } = req.body
  if(!items || !Array.isArray(items)) return res.status(400).json({error:'Invalid items'})

  // load products
  const dataPath = path.join(process.cwd(), 'data', 'products.json')
  const raw = fs.readFileSync(dataPath,'utf8')
  const products = JSON.parse(raw)

  const line_items = items.map(i => {
    const p = products.find(x => x.id === i.id)
    return {
      price_data: {
        currency: 'usd',
        product_data: { name: p.title },
        unit_amount: Math.round(p.price * 100)
      },
      quantity: i.quantity || 1
    }
  })

  const host = process.env.NEXT_PUBLIC_HOST || `http://localhost:3000`

  try{
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${host}/?success=1`,
      cancel_url: `${host}/?canceled=1`
    })
    res.json({url: session.url})
  }catch(err){
    console.error(err)
    res.status(500).json({error: err.message})
  }
}
