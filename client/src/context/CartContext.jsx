import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext.jsx'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { token } = useAuth()
  const [cart, setCart] = useState({ products: [], totalAmount: 0 })

  const api = useMemo(() => axios.create({ baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`, headers: token ? { Authorization: `Bearer ${token}` } : {} }), [token])

  useEffect(() => {
    if (!token) return setCart({ products: [], totalAmount: 0 })
    api.get('/cart').then((res) => setCart(res.data)).catch(() => {})
  }, [token])

  const add = async (productId, qty = 1, size) => {
    const { data } = await api.post('/cart/add', { productId, qty, size })
    setCart(data)
  }
  const update = async (itemId, qty) => {
    const { data } = await api.put('/cart/item', { itemId, qty })
    setCart(data)
  }
  const remove = async (itemId) => {
    const { data } = await api.delete(`/cart/item/${itemId}`)
    setCart(data)
  }

  return (
    <CartContext.Provider value={{ cart, add, update, remove }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
