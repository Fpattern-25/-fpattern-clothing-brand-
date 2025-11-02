import Newsletter from '../models/Newsletter.js';

export const subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });
  const existing = await Newsletter.findOne({ email });
  if (existing) return res.status(200).json({ message: 'Already subscribed' });
  await Newsletter.create({ email });
  res.status(201).json({ message: 'Subscribed' });
};
