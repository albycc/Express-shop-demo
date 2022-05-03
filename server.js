import express from 'express';
import routerAdmin from './routes/admin.js';
import routerShop from './routes/shop.js'
import path from 'path';
import {dirname} from './util/path.js'
import { products } from './routes/admin.js';

const app = express()
const PORT = 3000;

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

console.log('dirname', dirname())

//create a folder named routes and add route paths there
//create filter path in routerAdmin
app.use('/admin', routerAdmin)
app.use(routerShop)

app.use((req, res, next) =>{
    res.status(404).sendFile(path.join(dirname(), 'views', '404.html'))
})

app.listen(PORT, ()=>{
    console.log('Server running on', PORT);
})