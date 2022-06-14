import {Sequelize, DataTypes} from "sequelize"
import sequelize from "../util/db.js"

const CartItem = sequelize.define('cartItem', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: DataTypes.INTEGER
})

export default CartItem;