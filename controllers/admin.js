import Product from '../models/product.js'

const getAddProduct = (req, res) =>{
    res.render('admin/edit-product', {
        pagetitle:'Add Product',
        path: '/admin/add-product',
        editing:false
    }) //send response
}

const postAddProduct = (req, res) =>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(null, title, imageUrl, description, price)
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
    const editing = req.query.edit === 'true' ? true : false;
    if(!editing){
        return res.redirect('/')
    }
    const prodId = req.params.productId;
    console.log(typeof editing)
    Product.findById(prodId, product =>{
        if(!product){
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pagetitle:'Edit product',
            path: '/admin/edit-product',
            editing,
            product
        })
    })
}

const postEditProduct = (req, res) =>{
    const prodId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const updatedProduct = new Product(prodId, title, imageUrl, description, price)
    updatedProduct.save();
    res.redirect('/admin/products')
}

const postDeleteProduct = (req, res) =>{
    const prodId = req.body.productId;
    Product.deleteById(prodId)
    res.redirect('/admin/products')
}

export {getAddProduct, postAddProduct, getEditProduct, postEditProduct, getProductsList, postDeleteProduct}