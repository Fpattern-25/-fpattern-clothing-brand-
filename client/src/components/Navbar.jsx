import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="container-px mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="font-extrabold text-xl tracking-tight">Fpattern</Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <NavLink to="/catalog" className={({ isActive }) => isActive ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'}>Shop</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <span className="btn-outline px-3 py-1">Cart</span>
            {cart?.products?.length ? (
              <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs rounded-full px-1.5">
                {cart.products.length}
              </span>
            ) : null}
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              {user.role === 'admin' && (
                <Link to="/admin" className="text-sm text-blue-600 font-semibold">Admin</Link>
              )}
              {user.role !== 'admin' && (
                <Link to="/account" className="text-sm">Hi, {user.name.split(' ')[0]}</Link>
              )}
              <button onClick={logout} className="btn-outline text-sm">Logout</button>
            </div>
          ) : (
            <Link to="/account" className="btn-outline text-sm">Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}
