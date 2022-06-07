import Product from '../models/product.js'
import Cart from '../models/cart.js'

// export const products = [];

const getIndex = (req, res) =>{
    res.render('shop/index', {
        pagetitle:'Homepage',
        path: '/',
    })
}

const getProducts = (req, res, next) =>{
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            pagetitle:'Products',
            path: '/products',
            products
        }) //send response
    })
}

const getProduct = (req, res, next) =>{
    const prodId = req.params.productId;
    Product.findById(prodId, product =>{
        res.render(`shop/product-detail`, {
            product,
            pagetitle:product.title,
            path: '/products'
        })
    })
}

const postAddToCart = (req, res, next) =>{
    const prodId = req.body.productId;
    Product.findById(prodId, (product) =>{
        Cart.addProduct(prodId, product.price)
    })
    res.redirect('/cart')
}

const getCart = (req, res) =>{
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for(let product of products){
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if(cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty})
                }
            }
            res.render('shop/cart', {
                pagetitle:'Your Cart',
                path: '/cart',
                products: cartProducts
            })
        })
    })
}

const postCartDeleteProduct = (req, res) =>{
    const prodId = req.body.productId;
    console.log('prodId:', prodId)
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price)
        res.redirect('/cart')
    })
}

const getOrders = (req, res) =>{
    res.render('shop/orders', {
        pagetitle:'Orders',
        path: '/orders',
    })
}

const getCheckout = (req, res) =>{
    res.render('shop/checkout', {
        pagetitle:'Checkout',
        path: '/checkout',
    })
}

//admin




export {getIndex, getProducts, getProduct, getCart, postAddToCart, postCartDeleteProduct, getOrders, getCheckout};