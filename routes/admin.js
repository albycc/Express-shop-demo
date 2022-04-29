import express from 'express';
import path from 'path';
import {dirname} from '../util/path.js'

const router = express.Router();


router.get('/add-product', (req, res) =>{
    res.sendFile(path.join(dirname(), 'views', 'add-product.html'))
})

router.post('/add-product', (req, res) =>{
    console.log(req.body)
    res.redirect('/product')
})

export default router;