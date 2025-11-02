import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { api } from '../api/client.js'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [p, setP] = useState(null)
  const [size, setSize] = useState('M')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { add } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    api.get(`/products/${id}`).then((r) => setP(r.data))
  }, [id])

  const handleAddToCart = async () => {
    if (!user) {
      setShowLoginModal(true)
      return
    }
    try {
      await add(p._id, 1, size)
      alert('Added to cart successfully!')
    } catch (error) {
      alert('Failed to add to cart. Please try again.')
    }
  }

  const handleBuyNow = async () => {
    if (!user) {
      setShowLoginModal(true)
      return
    }
    try {
      await add(p._id, 1, size)
      navigate('/checkout')
    } catch (error) {
      alert('Failed to add to cart. Please try again.')
    }
  }

  if (!p) return <div className="container-px mx-auto py-8">Loading...</div>
  
  return (
    <>
      <div className="container-px mx-auto py-8 grid md:grid-cols-2 gap-8">
        <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden">
          <img src={p.images?.[0] || 'https://via.placeholder.com/600x750'} alt={p.name} className="w-full h-full object-cover"/>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{p.name}</h1>
          <p className="text-gray-500 mt-1">{p.category} · SKU {p.sku || 'N/A'}</p>
          <div className="text-2xl font-extrabold mt-4">₹{p.price}</div>
          <div className="mt-4">
            <label className="block text-sm mb-1">Size</label>
            <select className="border rounded px-3 py-2" value={size} onChange={(e)=>setSize(e.target.value)}>
              {['S','M','L','XL'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="btn" onClick={handleAddToCart}>Add to Cart</button>
            <button className="btn-outline" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowLoginModal(false)}>
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please login or create an account to add items to your cart.
            </p>
            <div className="flex gap-3">
              <Link to="/account" className="btn flex-1 text-center">
                Go to Login
              </Link>
              <button onClick={() => setShowLoginModal(false)} className="btn-outline flex-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}