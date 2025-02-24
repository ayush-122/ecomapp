const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.params.userId })
      .populate('productId');
    
    const total = cartItems.reduce((sum, item) => 
      sum + (item.productId.price * item.quantity), 0);

    res.status(200).json({
      success: true,
      data: {
        items: cartItems,
        total: parseFloat(total.toFixed(2))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, userId, quantity = 1 } = req.body;

    // Check if product exists and has enough stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        error: 'Not enough stock available'
      });
    }

    // Check if item already exists in cart
    let cartItem = await CartItem.findOne({ userId, productId });

    if (cartItem) {
      // Update quantity if item exists
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Create new cart item if it doesn't exist
      cartItem = await CartItem.create({
        userId,
        productId,
        quantity
      });
    }

    await cartItem.populate('productId');

    res.status(200).json({
      success: true,
      data: cartItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await CartItem.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        error: 'Cart item not found'
      });
    }

    if (quantity < 1) {
      await CartItem.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        data: null,
        message: 'Item removed from cart'
      });
    }

    // Check if enough stock is available
    const product = await Product.findById(cartItem.productId);
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        error: 'Not enough stock available'
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();
    await cartItem.populate('productId');

    res.status(200).json({
      success: true,
      data: cartItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        error: 'Cart item not found'
      });
    }

    await CartItem.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: null,
      message: 'Item removed from cart'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
