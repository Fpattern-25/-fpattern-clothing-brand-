export default function Filters({ filters, setFilters }) {
  const set = (k, v) => setFilters((s) => ({ ...s, [k]: v }))
  return (
    <div className="card p-4 flex flex-wrap gap-3 items-center">
      <input className="border rounded px-3 py-2 w-48" placeholder="Search" value={filters.q || ''} onChange={(e) => set('q', e.target.value)} />
      <select className="border rounded px-3 py-2" value={filters.category || ''} onChange={(e) => set('category', e.target.value)}>
        <option value="">All Categories</option>
        <option value="tshirt">T-Shirts</option>
        <option value="kurti">Kurtis</option>
        <option value="jacket">Jackets</option>
      </select>
      <select className="border rounded px-3 py-2" value={filters.gender || ''} onChange={(e) => set('gender', e.target.value)}>
        <option value="">All</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="unisex">Unisex</option>
      </select>
      <input className="border rounded px-3 py-2 w-24" type="number" placeholder="Min" value={filters.min || ''} onChange={(e) => set('min', e.target.value)} />
      <input className="border rounded px-3 py-2 w-24" type="number" placeholder="Max" value={filters.max || ''} onChange={(e) => set('max', e.target.value)} />
    </div>
  )
}
