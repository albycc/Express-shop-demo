import fs from 'fs';
import path from 'path';
import {dirname} from '../util/path.js'

const p = path.join(dirname(), 'data', 'products.json');

class Product{
    constructor(_title, _imageUrl, _description, _price){
        this.title = _title;
        this.imageUrl = _imageUrl;
        this.description = _description;
        this.price = _price
    }

    save() {
        getProductsFromFile(products =>{
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err)=>{
                console.log(err)
            })
        })
    }

    static fetchAll(callback){
        getProductsFromFile(callback)
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