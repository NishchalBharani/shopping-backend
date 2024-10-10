
import User from '../models/userModel.js';


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateAddress = async (req, res) => {
  const userId = req.user._id; 
  const { address, selectedAddressIndex } = req.body; 

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (selectedAddressIndex !== null && selectedAddressIndex >= 0) {
      
      if (user.addresses[selectedAddressIndex]) {
        user.addresses[selectedAddressIndex] = address; 
      } else {
        return res.status(400).json({ message: 'Invalid address index' });
      }
    } else {
      
      user.addresses.push(address); 
    }

    await user.save(); 
    res.status(200).json({ message: 'Address updated successfully', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



export const addAddress = async (req, res) => {
  const { id } = req.params; 
  const { street, city, state, postalCode, country } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.addresses.push({ street, city, state, postalCode, country }); 
    await user.save();

    res.status(200).json({ message: 'Address added successfully', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};

