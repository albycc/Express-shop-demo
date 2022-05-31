import Product from '../models/Product.js'

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

const getProductDetail = (req, res) =>{
    res.render('shop/product-detail', {
        pagetitle:'Product Info',
        path: '/products/id',
    })
}
const getCart = (req, res) =>{
    res.render('shop/cart', {
        pagetitle:'Homepage',
        path: '/cart',
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




export {getIndex, getProducts, getProductDetail, getCart, getOrders, getCheckout};