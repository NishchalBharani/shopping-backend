
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, phone, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    
    res.status(201).json({
      token,
      username: user.username,
      phone: user.phone,
      userId: user._id,
      message: 'User registered successfully',
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        message: `The ${duplicateField} "${error.keyValue[duplicateField]}" is already taken. Please choose a different one.`,
      });
    }

    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};


export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    
    res.json({
      token,
      username: user.username,
      phone: user.phone,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
