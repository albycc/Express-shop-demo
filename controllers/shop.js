import Product from '../models/product.js'
import Order from '../models/order.js'

// export const products = [];

const getIndex = (req, res) =>{
    res.render('shop/index', {
        pagetitle:'Homepage',
        path: '/',
    })
}

const getProducts = (req, res, next) =>{
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                pagetitle:'Products',
                path: '/products',
                products
            }) //send response
        })
        .catch(err =>{
            console.log(err)
        })
}


const getProduct = (req, res, next) =>{
    const prodId = req.params.productId;
    // Product.findAll({where:{id:prodId}})
    //     .then(products => {
    //          res.render(`shop/product-detail`, {
    //             product:products[0],
    //             pagetitle:products[0].title,
    //             path: '/products'
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    Product.findByPk(prodId)
        .then((product) =>{
            console.log(product)
            res.render(`shop/product-detail`, {
                product:product,
                pagetitle:product.title,
                path: '/products'
            })
        })
        .catch(err => console.log(err));
}

const postAddToCart = (req, res, next) =>{
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } })
        })
        .then(products => {
            let product;
            if(products.length > 0) {
                product = products[0];
            }
            if(product){
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId);
        })
        .then(product =>{
            return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
        })
        .then(() =>{
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
    // const prodId = req.body.productId;
    // Product.findById(prodId, (product) =>{
    //     Cart.addProduct(prodId, product.price)
    // })
    // res.redirect('/cart')
}

const getCart = (req, res) =>{
    req.user
        .getCart()
        .then(cart =>{
            return cart
                .getProducts()
                .then(products =>{
                    res.render('shop/cart', {
                        pagetitle:'Your Cart',
                        path: '/cart',
                        products
                    })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

const postCartDeleteProduct = (req, res) =>{
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: prodId } })
        })
        .then(products =>{
            const product = products[0]
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

const postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user
                .createOrder()
                .then(order => {
                    return order.addProducts(products.map(product => {
                        product.orderItem = { quantity: product.cartItem.quantity }
                        return product;
                    }))
                })
                .catch(err => console.log(err));
        })
        .then(result => {
            return fetchedCart.setProducts(null)
        })
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err))
}

const getOrders = (req, res) =>{
    req.user
        .getOrders({include: ['products']})
        .then(orders => {
            console.log(orders)
            res.render('shop/orders', {
                pagetitle:'Orders',
                path: '/orders',
                orders
            })
        })
        .catch(err => console.log(err))
}

// const getCheckout = (req, res) =>{
//     res.render('shop/checkout', {
//         pagetitle:'Checkout',
//         path: '/checkout',
//     })
// }

//admin

export {getIndex, getProducts, getProduct, getCart, postAddToCart, postCartDeleteProduct, postOrder, getOrders};