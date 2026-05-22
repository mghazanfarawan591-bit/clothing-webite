import fs from 'fs'
import path from 'path'

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const { password, product } = req.body
  if(!password || password !== process.env.ADMIN_PASSWORD) return res.status(401).json({error:'unauthorized'})
  if(!product || !product.title) return res.status(400).json({error:'invalid product'})

  const dataPath = path.join(process.cwd(),'data','products.json')
  const raw = fs.readFileSync(dataPath,'utf8')
  const products = JSON.parse(raw)

  const id = product.id || `p${Date.now()}`
  const newProduct = { id, ...product }
  products.push(newProduct)

  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2))
  res.json({ok:true, product: newProduct})
}
