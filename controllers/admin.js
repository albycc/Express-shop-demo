import Product from '../models/Product.js'

const getAddProduct = (req, res) =>{
    res.render('admin/add-product', {
        pagetitle:'Add Product',
        path: '/admin/add-product',
    }) //send response
}

const postAddProduct = (req, res) =>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(title, imageUrl, description, price)
    product.save()
    res.redirect('/')
}

const getProductsList = (req, res) =>{
    Product.fetchAll(products => {
        res.render('admin/products', {
            pagetitle:'Admin products',
            path: '/admin/products',
            products
        }) //send response
    })
}



const getEditProduct = (req, res) =>{
    res.render('admin/edit-product', {
        pagetitle:'Admin edit product',
        path: '/admin/edit-product',
    })
}

export {getAddProduct, postAddProduct, getEditProduct, getProductsList}