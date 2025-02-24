const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart
} = require('../controllers/cartController');

router.route('/:userId')
  .get(getCart);

router.route('/add')
  .post(addToCart);

router.route('/:id')
  .put(updateCartItem)
  .delete(removeFromCart);

module.exports = router;