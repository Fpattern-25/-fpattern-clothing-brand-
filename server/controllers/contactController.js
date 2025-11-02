import { sendEmail } from '../utils/email.js';

export const contact = async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ message: 'All fields are required' });
  await sendEmail({
    to: process.env.SMTP_USER,
    subject: `Fpattern Contact: ${name}`,
    html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p>${message}</p>`,
  });
  res.json({ message: 'Sent' });
};
