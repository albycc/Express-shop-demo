import express from 'express';
import {products} from './admin.js'

const router = express.Router();

router.get('/', (req, res, next) =>{
    console.log('shop.js', products)
    res.render('shop', {
        pagetitle:'Homepage',
        products
    }) //send response
})

export default router;