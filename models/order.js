import {Sequelize, DataTypes} from "sequelize"
import sequelize from "../util/db.js"

const Order = sequelize.define('order', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

export default Order;