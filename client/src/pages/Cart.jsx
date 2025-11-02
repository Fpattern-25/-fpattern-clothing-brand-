import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { cart, update, remove } = useCart()
  const items = cart?.products || []
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div className="card p-6">Cart is empty. <Link to="/catalog" className="ml-2 underline">Shop products</Link></div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item._id} className="card p-4 flex gap-4 items-center">
                <img src={item.product?.images?.[0]} alt="" className="w-20 h-24 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{item.product?.name}</div>
                  <div className="text-sm text-gray-500">Size {item.size}</div>
                </div>
                <input type="number" min="1" value={item.qty} onChange={(e)=>update(item._id, Number(e.target.value))} className="border rounded w-16 px-2 py-1"/>
                <div className="w-24 text-right">₹{item.product?.price}</div>
                <button className="text-red-500 text-sm" onClick={()=>remove(item._id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="card p-4">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{cart.totalAmount}</span></div>
            <div className="flex justify-between text-sm text-gray-500"><span>Tax (approx)</span><span>₹{(cart.totalAmount*0.18).toFixed(0)}</span></div>
            <div className="flex justify-between font-semibold mt-2"><span>Total</span><span>₹{(cart.totalAmount*1.18).toFixed(0)}</span></div>
            <Link to="/checkout" className="btn w-full mt-4">Checkout</Link>
          </div>
        </div>
      )}
    </div>
  )
}
