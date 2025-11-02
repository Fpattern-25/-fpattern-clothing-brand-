import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const salesSummary = async (req, res) => {
  const [orders, products] = await Promise.all([
    Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, total: { $sum: '$totalPrice' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
    Product.countDocuments(),
  ]);
  res.json({ orders, products });
};

// Get all orders with user details
export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
  res.json(orders);
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  
  order.status = status;
  await order.save();
  
  res.json(order);
};

// Get all products for inventory management
export const getAllProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

// Update product stock
export const updateProductStock = async (req, res) => {
  const { productId } = req.params;
  const { stock } = req.body;
  
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  
  product.stock = stock;
  await product.save();
  
  res.json(product);
};

// Create new product
export const createProduct = async (req, res) => {
  const { name, category, price, images, stock, description, sku, gender, active } = req.body;
  
  try {
    const product = await Product.create({
      name,
      category,
      price,
      images: images || [],
      stock: stock || 0,
      description,
      sku,
      gender: gender || 'unisex',
      active: active !== undefined ? active : true
    });
    
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update product details
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updates = req.body;
  
  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  
  const product = await Product.findByIdAndDelete(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  
  res.json({ message: 'Product deleted successfully' });
};