import Product from '../models/productModel.js';

export const getAllProducts = async (req, res) => {
  try {
    
    const { page = 1, limit = 10, search = '', sortBy = 'name', sortOrder = 'asc' } = req.query;

    const skip = (page - 1) * limit;

    if (search === '') {
      const products = await Product.find({})
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .select('-__v');

      const totalProducts = await Product.countDocuments({});

      return res.json({
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        products,
      });
    }

    
    const searchQuery = {
      $or: [
        { name: { $regex: search, $options: 'i' } },  
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    };

    
    const products = await Product.find(searchQuery)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .select('-__v');

    const totalProducts = await Product.countDocuments(searchQuery);

    
    if (totalProducts === 0) {
      const relatableQuery = {
        $or: [
          { name: { $regex: search.split(' ')[0], $options: 'i' } },
          { brand: { $regex: search.split(' ')[0], $options: 'i' } },
          { category: { $regex: search.split(' ')[0], $options: 'i' } },
          { description: { $regex: search.split(' ')[0], $options: 'i' } }
        ]
      };

      
      const relatableProducts = await Product.find(relatableQuery)
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .select('-__v');

      const totalRelatableProducts = await Product.countDocuments(relatableQuery);

      return res.json({
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalRelatableProducts / limit),
        totalProducts: totalRelatableProducts,
        products: relatableProducts,
      });
    }

    return res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      products,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
