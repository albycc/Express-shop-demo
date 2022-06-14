import express from 'express';

const router = express.Router();

import {getAddProduct, getEditProduct, postEditProduct, getProducts, postAddProduct, postDeleteProduct} from '../controllers/admin.js'

router.get('/add-product', getAddProduct)

router.get('/edit-product/:productId', getEditProduct)

router.post('/edit-product', postEditProduct)

router.get('/products', getProducts)

router.post('/add-product', postAddProduct)

router.post('/delete-product', postDeleteProduct)

export default router;
