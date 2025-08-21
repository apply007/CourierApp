import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const sign = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already used' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });
    return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = sign(user._id, user.role);
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
