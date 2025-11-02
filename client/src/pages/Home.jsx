import { useEffect, useState } from 'react'
import { api } from '../api/client.js'
import Hero from '../components/Hero.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    api.get('/products?limit=8').then((res) => setProducts(res.data.items)).catch(() => {})
  }, [])

  return (
    <div>
      <Hero />
      <section className="container-px mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">Featured</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>

      <section className="container-px mx-auto mt-12">
        <div className="card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold">Join our newsletter</h3>
            <p className="text-sm text-gray-600">Get early access to drops and exclusive offers.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/newsletter/subscribe', { email })
      setMsg('Subscribed!')
      setEmail('')
    } catch (e) {
      setMsg(e.response?.data?.message || 'Error')
    }
  }
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input className="border rounded px-3 py-2 w-64" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <button className="btn" type="submit">Subscribe</button>
      {msg && <span className="text-sm text-gray-600 ml-2">{msg}</span>}
    </form>
  )
}
