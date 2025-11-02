import Product from '../models/Product.js';

export const listProducts = async (req, res) => {
  const { q, category, min, max, gender, page = 1, limit = 20 } = req.query;
  const filter = { active: true };
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (category) filter.category = category;
  if (gender) filter.gender = gender;
  if (min || max) filter.price = { ...(min ? { $gte: Number(min) } : {}), ...(max ? { $lte: Number(max) } : {}) };
  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Product.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
    Product.countDocuments(filter),
  ]);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
};

export const getProduct = async (req, res) => {
  const prod = await Product.findById(req.params.id);
  if (!prod) return res.status(404).json({ message: 'Product not found' });
  res.json(prod);
};

export const createProduct = async (req, res) => {
  const body = req.body;
  const prod = await Product.create(body);
  res.status(201).json(prod);
};

export const updateProduct = async (req, res) => {
  const prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!prod) return res.status(404).json({ message: 'Product not found' });
  res.json(prod);
};

export const deleteProduct = async (req, res) => {
  const prod = await Product.findById(req.params.id);
  if (!prod) return res.status(404).json({ message: 'Product not found' });
  await prod.deleteOne();
  res.json({ message: 'Deleted' });
};
