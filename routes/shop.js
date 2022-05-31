import express from 'express';
import {getIndex, getProducts, getCart, getOrders, getCheckout, getProductDetail} from '../controllers/products.js'

const router = express.Router();

router.get('/', getIndex)

router.get('/products', getProducts)

router.get('/products/id', getProductDetail);

router.get('/cart', getCart)

router.get('/orders', getOrders)

router.get('/checkout', getCheckout)

export default router;