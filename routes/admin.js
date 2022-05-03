import express from 'express';
import path from 'path';
import {dirname} from '../util/path.js'

const router = express.Router();

export const products = [];

router.get('/add-product', (req, res) =>{
    res.sendFile(path.join(dirname(), 'views', 'add-product.html'))
})

router.post('/add-product', (req, res) =>{
    products.push({title: req.body.title})
    res.redirect('/')
})

export default router;
