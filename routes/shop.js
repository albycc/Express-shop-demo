import express from 'express';
import {getIndex, getProducts, getCart, postAddToCart, postCartDeleteProduct, postOrder, getOrders, getProduct} from '../controllers/shop.js'

const router = express.Router();

router.get('/', getIndex)

router.get('/products', getProducts)

router.get('/products/:productId', getProduct);

router.get('/cart', getCart);

router.post('/cart', postAddToCart)

router.post('/cart-delete-item', postCartDeleteProduct);

router.post('/create-order', postOrder)

router.get('/orders', getOrders)

// router.get('/checkout', getCheckout)

export default router;