import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import axios from 'axios'

export default function Account() {
  const { user, login, register, logout, token } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  // Redirect admin users to admin panel
  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin')
    }
  }, [user, navigate])

  useEffect(() => {
    if (token) {
      loadOrders()
    }
  }, [token])

  const loadOrders = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/my`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setOrders(data)
    } catch (e) {
      console.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="container-px mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Account</h1>
            <p className="text-gray-600">Welcome back, {user.name}</p>
          </div>
          <button className="btn" onClick={logout}>Logout</button>
        </div>

        {/* User Info Card */}
        <div className="card p-6 mb-6">
          <h2 className="font-semibold mb-3">Account Details</h2>
          <div className="space-y-2 text-sm">
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Role:</strong> {user.role}</div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="card p-6">
          <h2 className="font-semibold mb-4">My Orders ({orders.length})</h2>
          
          {loading ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500">No orders yet. Start shopping!</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-medium">Order #{order._id.slice(-8)}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{order.totalPrice}</div>
                      <div className={`text-xs px-2 py-1 rounded mt-1 ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-3 text-sm">
                        <img src={item.image} alt="" className="w-16 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-gray-500">Size: {item.size} × {item.qty}</div>
                          <div className="text-gray-500">₹{item.price} each</div>
                        </div>
                        <div className="font-medium">₹{item.price * item.qty}</div>
                      </div>
                    ))}
                  </div>

                  {/* Order Status Timeline */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-3 h-3 rounded-full ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className={order.status === 'processing' ? 'font-medium' : 'text-gray-500'}>Processing</span>
                      
                      <div className="flex-1 h-0.5 bg-gray-300"></div>
                      
                      <div className={`w-3 h-3 rounded-full ${order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className={order.status === 'shipped' ? 'font-medium' : 'text-gray-500'}>Shipped</span>
                      
                      <div className="flex-1 h-0.5 bg-gray-300"></div>
                      
                      <div className={`w-3 h-3 rounded-full ${order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className={order.status === 'delivered' ? 'font-medium' : 'text-gray-500'}>Delivered</span>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div className="mt-3 text-sm text-gray-600">
                      <strong>Shipping to:</strong> {order.shippingAddress.line1}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await login(form.email, form.password)
    if (!res.ok) {
      setError(res.error)
    }
    // Navigation will happen automatically via useEffect when user state updates
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const res = await register(form.name, form.email, form.password)
    if (!res.ok) setError(res.error)
  }

  return (
    <div className="container-px mx-auto py-8 grid md:grid-cols-2 gap-8">
      <form onSubmit={handleLogin} className="card p-6 space-y-3">
        <h2 className="font-semibold">Login</h2>
        <input className="border rounded px-3 py-2 w-full" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
        <input type="password" className="border rounded px-3 py-2 w-full" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} />
        <button className="btn" type="submit">Login</button>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
      <form onSubmit={handleRegister} className="card p-6 space-y-3">
        <h2 className="font-semibold">Create Account</h2>
        <input className="border rounded px-3 py-2 w-full" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
        <input className="border rounded px-3 py-2 w-full" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
        <input type="password" className="border rounded px-3 py-2 w-full" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} />
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  )
}