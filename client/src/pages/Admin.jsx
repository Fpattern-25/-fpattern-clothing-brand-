import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'


export default function Admin() {
  console.log('🚀 Admin component mounted!')
  const { token, user } = useAuth()
  const [stats, setStats] = useState(null)
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [activeTab, setActiveTab] = useState('stats')
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'tshirt',
    price: '',
    stock: '',
    description: '',
    sku: '',
    gender: 'unisex',
    images: [''],
    active: true
  })

   // Debug state after it's available
   useEffect(() => {
    console.log('📊 State updated:', { activeTab, orders: orders.length, products: products.length, stats })
  }, [activeTab, orders, products, stats])

  const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`,
    headers: { Authorization: `Bearer ${token}` }
  })
  

  useEffect(() => {
    if (!token) return
    loadStats()
    loadOrders()
    loadProducts()
  }, [token])

  const loadStats = () => {
    console.log('Loading stats...')
    api.get('/admin/stats')
      .then((r) => {
        console.log('Stats loaded:', r.data)
        setStats(r.data)
      })
      .catch((e) => {
        console.error('Failed to load stats:', e.response?.data || e.message)
      })
  }
  
  const loadOrders = () => {
    console.log('Loading orders...')
    api.get('/admin/orders')
      .then((r) => {
        console.log('Orders loaded:', r.data.length, 'orders')
        setOrders(r.data)
      })
      .catch((e) => {
        console.error('Failed to load orders:', e.response?.data || e.message)
      })
  }
  
  const loadProducts = () => {
    console.log('Loading products...')
    api.get('/admin/products')
      .then((r) => {
        console.log('Products loaded:', r.data)
        setProducts(r.data)
      })
      .catch((e) => {
        console.error('Failed to load products:', e.response?.data || e.message)
      })
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status })
      loadOrders()
    } catch (e) {
      alert('Failed to update order status')
    }
  }

  const updateStock = async (productId, stock) => {
    try {
      await api.put(`/admin/products/${productId}/stock`, { stock })
      loadProducts()
    } catch (e) {
      alert('Failed to update stock')
    }
  }

  
  const createProduct = async (e) => {
    e.preventDefault()
    try {
      await api.post('/admin/products', newProduct)
      setShowAddProduct(false)
      setNewProduct({
        name: '',
        category: 'tshirt',
        price: '',
        stock: '',
        description: '',
        sku: '',
        gender: 'unisex',
        images: [''],
        active: true
      })
      loadProducts()
      alert('Product created successfully!')
    } catch (e) {
      alert('Failed to create product: ' + (e.response?.data?.message || e.message))
    }
  }
  
  const deleteProductHandler = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      await api.delete(`/admin/products/${productId}`)
      loadProducts()
    } catch (e) {
      alert('Failed to delete product')
    }
  }
  
  if (!token || user?.role !== 'admin') {
    return (
      <div className="container-px mx-auto py-8">
        <div className="card p-6">Admin access only. Please login as admin.</div>
      </div>
    )
  }
  
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('stats')}
          className={`pb-2 px-4 ${activeTab === 'stats' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
        >
          Statistics
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-2 px-4 ${activeTab === 'orders' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
        >
          Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-2 px-4 ${activeTab === 'inventory' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
        >
          Inventory ({products.length})
        </button>
      </div>

      {/* Stats Tab */}
      {activeTab === 'stats' && stats && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="font-semibold mb-4">Sales Summary</h3>
            <div className="space-y-2">
              {stats.orders.map((o) => (
                <div key={o._id} className="flex justify-between text-sm">
                  <span>{o._id}</span>
                  <span className="font-medium">₹{o.total} ({o.count} orders)</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold mb-2">Catalog</h3>
            <p className="text-sm text-gray-600">Total products: {stats.products}</p>
            <p className="text-sm text-gray-600 mt-2">Total orders: {orders.length}</p>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="card p-6">No orders yet</div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-semibold">Order #{order._id.slice(-8)}</div>
                    <div className="text-sm text-gray-600">
                      Customer: {order.user?.name} ({order.user?.email})
                    </div>
                    <div className="text-sm text-gray-600">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{order.totalPrice}</div>
                    <div className="text-sm text-gray-600">{order.paymentStatus}</div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4 space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 text-sm bg-gray-50 p-2 rounded">
                      <img src={item.image} alt="" className="w-12 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <div>{item.name}</div>
                        <div className="text-gray-500">Size: {item.size} × {item.qty}</div>
                      </div>
                      <div>₹{item.price * item.qty}</div>
                    </div>
                  ))}
                </div>

                {/* Status Update */}
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-medium">Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <span className={`text-xs px-2 py-1 rounded ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                    }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>

                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div className="mt-3 text-sm text-gray-600">
                    <strong>Ship to:</strong> {order.shippingAddress.line1}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Product Inventory</h2>
            <button
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="btn"
            >
              {showAddProduct ? 'Cancel' : '+ Add New Product'}
            </button>
          </div>

          {/* Add Product Form */}
          {showAddProduct && (
            <form onSubmit={createProduct} className="card p-6 mb-6 space-y-4">
              <h3 className="font-semibold text-lg">Add New Product</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="border rounded px-3 py-2"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />

                <input
                  type="text"
                  placeholder="SKU"
                  className="border rounded px-3 py-2"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  required
                />

                <select
                  className="border rounded px-3 py-2"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  required
                >
                  <option value="tshirt">T-Shirt</option>
                  <option value="kurti">Kurti</option>
                  <option value="jacket">Jacket</option>
                  <option value="shirt">Shirt</option>
                  <option value="pants">Pants</option>
                </select>

                <select
                  className="border rounded px-3 py-2"
                  value={newProduct.gender}
                  onChange={(e) => setNewProduct({ ...newProduct, gender: e.target.value })}
                  required
                >
                  <option value="unisex">Unisex</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>

                <input
                  type="number"
                  placeholder="Price (₹)"
                  className="border rounded px-3 py-2"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                  min="0"
                />

                <input
                  type="number"
                  placeholder="Stock Quantity"
                  className="border rounded px-3 py-2"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  required
                  min="0"
                />
              </div>

              <textarea
                placeholder="Product Description"
                className="border rounded px-3 py-2 w-full"
                rows="3"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />

              <input
                type="url"
                placeholder="Image URL"
                className="border rounded px-3 py-2 w-full"
                value={newProduct.images[0]}
                onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
                required
              />

              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={newProduct.active}
                  onChange={(e) => setNewProduct({ ...newProduct, active: e.target.checked })}
                />
                <label htmlFor="active" className="text-sm">Active (visible to customers)</label>
              </div>

              <button type="submit" className="btn">Create Product</button>
            </form>
          )}

                   {/* Product Grid */}
          {products.length === 0 ? (
            <div className="card p-6 text-center text-gray-500">
              <p>No products in inventory yet.</p>
              <p className="text-sm mt-2">Click "+ Add New Product" to get started.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product._id} className="card p-4">
                  <img src={product.images[0]} alt="" className="w-full h-48 object-cover rounded mb-3" />
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-600">SKU: {product.sku}</div>
                  <div className="text-sm text-gray-600">Category: {product.category}</div>
                  <div className="text-sm text-gray-600">Price: ₹{product.price}</div>
                  <div className="text-sm text-gray-600">Gender: {product.gender}</div>

                  <div className="mt-3 flex gap-2 items-center">
                    <span className="text-sm font-medium">Stock:</span>
                    <input
                      type="number"
                      value={product.stock}
                      onChange={(e) => updateStock(product._id, Number(e.target.value))}
                      className="border rounded px-2 py-1 w-20 text-sm"
                      min="0"
                    />
                    <span className={`text-xs px-2 py-1 rounded ${product.stock === 0 ? 'bg-red-100 text-red-700' :
                        product.stock < 10 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                      }`}>
                      {product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? 'Low Stock' : 'In Stock'}
                    </span>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${product.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                      {product.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteProductHandler(product._id)}
                    className="mt-3 w-full text-sm text-red-600 border border-red-600 rounded px-3 py-1 hover:bg-red-50"
                  >
                    Delete Product
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}