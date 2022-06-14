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
    req.user
        .createProduct({
            title,
            price,
            imageUrl,
            description
        })
        .then(result => {
            console.log('Inserted into table Products:', result)
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })
}

const getProducts = (req, res) =>{
    req.user
        .getProducts()
        .then(products => {
            res.render('admin/products', {
                pagetitle:'Admin products',
                path: '/admin/products',
                products
            }) //send response
        })
        .catch(err =>{
            console.log(err)
        })
}

const getEditProduct = (req, res) =>{
    const editing = req.query.edit === 'true' ? true : false;
    if(!editing){
        return res.redirect('/')
    }
    const prodId = req.params.productId;
    req.user
        .getProducts({where:{id:prodId}})
        .then(products =>{
            const product = products[0]
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
        .catch(err => console.log(err))
}

const postEditProduct = (req, res) =>{
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    Product.findByPk(prodId)
        .then(product =>{
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDescription
            return product.save()
        })
        .then(result =>{
            console.log(`Product ${prodId} updated.`)
        })
        .catch(err => console.log(err))
    res.redirect('/admin/products')
}

const postDeleteProduct = (req, res) =>{
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy()
        })
        .then(result => {
            console.log(`Product ${prodId} deleted.`)
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

export {getAddProduct, postAddProduct, getEditProduct, postEditProduct, getProducts, postDeleteProduct}