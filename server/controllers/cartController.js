import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const recalc = async (cart) => {
  const populated = await cart.populate('products.product');
  cart.totalAmount = populated.products.reduce((sum, item) => sum + item.qty * (item.product?.price || 0), 0);
  await cart.save();
  return cart;
};

export const getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
  if (!cart) cart = await Cart.create({ user: req.user._id, products: [] });
  res.json(cart);
};

export const addToCart = async (req, res) => {
  const { productId, qty = 1, size } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, products: [] });
  const existing = cart.products.find((p) => p.product.toString() === productId && p.size === size);
  if (existing) existing.qty += qty;
  else cart.products.push({ product: productId, qty, size });
  await recalc(cart);
  res.status(201).json(await Cart.findById(cart._id).populate('products.product'));
};

export const updateCartItem = async (req, res) => {
  const { itemId, qty } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  const item = cart.products.id(itemId);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  item.qty = qty;
  await recalc(cart);
  res.json(await Cart.findById(cart._id).populate('products.product'));
};

export const removeCartItem = async (req, res) => {
  const { itemId } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  const item = cart.products.id(itemId);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  cart.products.pull(itemId);
  await recalc(cart);
  res.json(await Cart.findById(cart._id).populate('products.product'));
};
