import { useState } from 'react'

export default function Admin(){
  const [pw, setPw] = useState('')
  const [authorized, setAuthorized] = useState(false)
  const [form, setForm] = useState({title:'',price:'',category:'',image:'',description:''})
  const [status, setStatus] = useState('')

  function login(e){
    e.preventDefault()
    if(!pw) return setStatus('Enter password')
    // test by setting authorized; server will validate on submit
    setAuthorized(true)
    setStatus('')
  }

  async function uploadImage(file){
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    if(!cloud || !preset) return null
    const fd = new FormData()
    fd.append('file', file)
    fd.append('upload_preset', preset)
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`,{method:'POST', body:fd})
    const data = await res.json()
    return data.secure_url
  }

  async function submit(e){
    e.preventDefault()
    setStatus('Submitting...')
    const payload = { password: pw, product: { title: form.title, price: parseFloat(form.price), category: form.category, image: form.image, description: form.description } }
    const r = await fetch('/api/admin/add-product',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    const j = await r.json()
    if(j.ok) setStatus('Product added: ' + j.product.id)
    else setStatus('Error: ' + (j.error || 'unknown'))
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl mb-4">Admin — Hareem garments</h1>
      {!authorized ? (
        <form onSubmit={login} className="mb-4">
          <input type="password" placeholder="Admin password" value={pw} onChange={e=>setPw(e.target.value)} className="border p-2 mr-2" />
          <button className="px-3 py-2 bg-gray-900 text-white rounded">Login</button>
        </form>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="w-full border p-2" />
          <input placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="w-full border p-2" />
          <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full border p-2" />
          <input placeholder="Image URL (or upload below)" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} className="w-full border p-2" />
          <div>
            <label className="block mb-1">Upload image (Cloudinary unsigned if configured)</label>
            <input type="file" onChange={async e=>{ const file = e.target.files[0]; if(file){ const url = await uploadImage(file); if(url) setForm(f=>({...f,image:url})); } }} />
          </div>
          <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="w-full border p-2" />
          <div>
            <button className="px-4 py-2 bg-green-600 text-white rounded">Add product</button>
          </div>
        </form>
      )}
      <div className="mt-4 text-sm text-gray-600">{status}</div>
    </main>
  )
}
