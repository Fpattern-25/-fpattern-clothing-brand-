import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Checkout() {
  const { token } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'IN'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      setMessage('Please login to place order')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/place`,
        { shippingAddress: address },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      setMessage(`✅ Order placed successfully! Order ID: ${data._id}`)
      setTimeout(() => navigate('/account'), 2000)
    } catch (e) {
      setMessage(`❌ ${e.response?.data?.message || 'Order failed'}`)
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="container-px mx-auto py-8 max-w-2xl">
        <div className="card p-6">
          <p>Please login to checkout</p>
          <button onClick={() => navigate('/account')} className="btn mt-4">Go to Login</button>
        </div>
      </div>
    )
  }

  const items = cart?.products || []
  const total = cart?.totalAmount || 0

  return (
    <div className="container-px mx-auto py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Checkout - Demo Mode</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className="card p-6">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          {items.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item._id} className="flex gap-3 text-sm">
                  <img src={item.product?.images?.[0]} alt="" className="w-16 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{item.product?.name}</div>
                    <div className="text-gray-500">Size: {item.size} × {item.qty}</div>
                  </div>
                  <div className="font-medium">₹{item.product?.price * item.qty}</div>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Shipping Form */}
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <h2 className="font-semibold">Shipping Address</h2>
          
          <input
            type="text"
            placeholder="Address Line 1"
            className="w-full border rounded px-3 py-2"
            value={address.line1}
            onChange={(e) => setAddress({...address, line1: e.target.value})}
            required
          />
          
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="City"
              className="border rounded px-3 py-2"
              value={address.city}
              onChange={(e) => setAddress({...address, city: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="State"
              className="border rounded px-3 py-2"
              value={address.state}
              onChange={(e) => setAddress({...address, state: e.target.value})}
              required
            />
          </div>
          
          <input
            type="text"
            placeholder="Postal Code"
            className="w-full border rounded px-3 py-2"
            value={address.postalCode}
            onChange={(e) => setAddress({...address, postalCode: e.target.value})}
            required
          />

          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
            <strong>Demo Mode:</strong> This is a test checkout. No real payment will be processed.
          </div>

          <button 
            type="submit" 
            className="btn w-full" 
            disabled={loading || items.length === 0}
          >
            {loading ? 'Processing...' : `Place Order (₹${total})`}
          </button>

          {message && (
            <div className={`text-sm p-3 rounded ${message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}