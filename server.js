import express from 'express';
import routerAdmin from './routes/admin.js';
import routerShop from './routes/shop.js'
import path from 'path';
import {dirname} from './util/path.js'

const app = express()
const port = 3000;

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

app.listen(port, ()=>{
    console.log('Server running on', port);
})