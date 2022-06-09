import db from '../util/db.js'
import Cart from './Cart.js'

class Product{
    constructor(_id, _title, _imageUrl, _description, _price){
        this.id = _id;
        this.title = _title;
        this.imageUrl = _imageUrl;
        this.description = _description;
        this.price = _price
    }

    save() {
        return db.execute(
            'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?) ',
            [this.title, this.price, this.imageUrl, this.description]
        );
    }

    static deleteById(id){
    
    }

    static fetchAll(){
        return db.execute('SELECT * FROM products')    
    }

    static findById(id){
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
    }

}

export default Product;