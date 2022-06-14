import express from 'express';
import routerAdmin from './routes/admin.js';
import routerShop from './routes/shop.js'
import {dirname} from './util/path.js'
import notFoundPage from './controllers/error.js'
import sequelize from './util/db.js'
import Product from './models/product.js'
import User from './models/user.js'
import Cart from './models/cart.js'
import CartItem from './models/cart-item.js'
import Order from "./models/order.js"
import OrderItem from "./models/order-item.js"

const app = express()
const PORT = 3000;

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

app.use((req, res, next) =>{
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err))
})

//create a folder named routes and add route paths there
//create filter path in routerAdmin
app.use('/admin', routerAdmin);
app.use(routerShop);

app.use(notFoundPage)

Product.belongsTo(User, { constraints:true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem});
Product.belongsToMany(Cart, { through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem })

sequelize
    // .sync({force:true})
    .sync()
    .then(result => {
        return User.findByPk(1)
    })
    .then(user =>{
        //if no user, then create one
        if(!user){
            return User.create({name:'Admin', email:'admin@test.com'})
        }
        return user;
    })
    .then(user =>{
        return user.createCart()
    })
    .then(cart => {
        app.listen(PORT, ()=>{
            console.log('Server running on', PORT);
        })
    })
    .catch(err => {
        console.log(err)
    })