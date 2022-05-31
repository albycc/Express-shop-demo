import express from 'express';

const router = express.Router();

import {getAddProduct, getEditProduct, getProductsList, postAddProduct} from '../controllers/admin.js'

router.get('/add-product', getAddProduct)

router.get('/edit-product', getEditProduct)

router.get('/products', getProductsList)

router.post('/products', postAddProduct)

export default router;
