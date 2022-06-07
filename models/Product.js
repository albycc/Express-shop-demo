import fs from 'fs';
import path from 'path';
import {dirname} from '../util/path.js'
import Cart from './Cart.js'

const p = path.join(dirname(), 'data', 'products.json');

class Product{
    constructor(_id, _title, _imageUrl, _description, _price){
        this.id = _id;
        this.title = _title;
        this.imageUrl = _imageUrl;
        this.description = _description;
        this.price = _price
    }

    save() {
        getProductsFromFile(products =>{
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err)=>{
                    console.log(err)
                })
            } else{
                this.id = Math.random().toString().slice(2);
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err)=>{
                    console.log(err)
                })
            }
        })
    }

    static deleteById(id){
        getProductsFromFile(products =>{
            const product = products.find(prod => prod.id === id)
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err =>{
                if(!err){
                    Cart.deleteProduct(id, product.price)
                }
            })
            // cb(productIndex)
        })
    }

    static fetchAll(callback){
        getProductsFromFile(callback)
    }

    static findById(id, cb){
        getProductsFromFile(products =>{
            console.log('cb:', cb)
            const product = products.find(p => p.id === id)
            cb(product)
        })
    }

}

const getProductsFromFile = callback => {
    fs.readFile(p, (error, fileContent) =>{
        if(error){
            return callback([]);
        }
        callback(JSON.parse(fileContent))
    })
}

export default Product;