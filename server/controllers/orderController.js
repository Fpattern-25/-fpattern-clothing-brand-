import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { stripe } from '../utils/stripe.js';
import { sendEmail } from '../utils/email.js';

export const createPaymentIntent = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
  if (!cart || cart.products.length === 0) return res.status(400).json({ message: 'Cart is empty' });
  const amount = Math.round(cart.totalAmount * 100); // in paise
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'inr',
    automatic_payment_methods: { enabled: true },
    metadata: { userId: String(req.user._id) },
  });
  res.json({ clientSecret: paymentIntent.client_secret });
};

export const placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
  if (!cart || cart.products.length === 0) return res.status(400).json({ message: 'Cart is empty' });
  const items = cart.products.map((i) => ({
    product: i.product._id,
    name: i.product.name,
    price: i.product.price,
    qty: i.qty,
    size: i.size,
    image: i.product.images?.[0],
  }));
  const order = await Order.create({ user: req.user._id, items, totalPrice: cart.totalAmount, paymentStatus: 'paid', shippingAddress: req.body.shippingAddress });
  cart.products = [];
  cart.totalAmount = 0;
  await cart.save();
  try {
    await sendEmail({
      to: req.user.email,
      subject: 'Order Confirmation - Fpattern',
      html: `<p>Thanks for your order #${order._id} totaling ₹${order.totalPrice}. We'll notify you when it ships.</p>`,
    });
  } catch (e) {
    // continue without failing
  }
  res.status(201).json(order);
};

export const myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'name email');
  res.json(orders);
};
