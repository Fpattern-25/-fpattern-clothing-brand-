import { useEffect, useState } from 'react'
import { api } from '../api/client.js'
import ProductCard from '../components/ProductCard.jsx'
import Filters from '../components/Filters.jsx'

export default function Catalog() {
  const [filters, setFilters] = useState({ q: '', page: 1 })
  const [res, setRes] = useState({ items: [], page: 1, pages: 1 })

  useEffect(() => {
    const params = new URLSearchParams(Object.fromEntries(Object.entries(filters).filter(([,v]) => v)))
    api.get(`/products?${params}`).then((r) => setRes(r.data))
  }, [filters])

  return (
    <div className="container-px mx-auto py-6">
      <Filters filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {res.items.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        <button className="btn-outline" disabled={res.page<=1} onClick={()=>setFilters((s)=>({...s, page: s.page-1}))}>Prev</button>
        <span className="text-sm self-center">Page {res.page} of {res.pages}</span>
        <button className="btn-outline" disabled={res.page>=res.pages} onClick={()=>setFilters((s)=>({...s, page: s.page+1}))}>Next</button>
      </div>
    </div>
  )
}
