import { Sequelize } from "sequelize"

const sequelize = new Sequelize(
    'node_schema', 'root', 
    'MSQ18dtb15dm', 
    {
        dialect: 'mysql',
        host: 'localhost'
    });

export default sequelize;