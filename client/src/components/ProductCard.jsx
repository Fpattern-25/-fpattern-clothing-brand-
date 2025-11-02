import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="card overflow-hidden group">
      <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
        <img src={product.images?.[0] || 'https://via.placeholder.com/400x500'} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-3">
        <h3 className="font-medium line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{product.category}</p>
        <div className="mt-1 font-semibold">₹{product.price}</div>
      </div>
    </Link>
  )
}
