import express from 'express';
import path from 'path';
import {dirname} from '../util/path.js'


const router = express.Router();

router.get('/', (req, res, next) =>{
    res.sendFile(path.join(dirname(), 'views', 'shop.html')); //send response
})

export default router;