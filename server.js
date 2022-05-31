import express from 'express';
import routerAdmin from './routes/admin.js';
import routerShop from './routes/shop.js'
import {dirname} from './util/path.js'
import notFoundPage from './controllers/error.js'

const app = express()
const PORT = 3000;

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

//create a folder named routes and add route paths there
//create filter path in routerAdmin
app.use('/admin', routerAdmin)
app.use(routerShop)
app.use(notFoundPage)


app.listen(PORT, ()=>{
    console.log('Server running on', PORT);
})