const { Model, DataTypes, DECIMAL } = require('sequelize');
const sequelize = require('../config/connection');
const Category = require('./Category');

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,

            validate: {
                min: 0.01,
                isDecimal: true,
                customValidator(value){
                    const valueParsed = parseFloat(value).toFixed(2);
                    const value_string = value.toString();
                    if (valueParsed !== value_string){
                        throw new Error('Decimal value error.');
                    }
                }
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
            validate: {
                isInt: true,
                min: 0,
                customNumeric(value){
                    if(!Number.isInteger(value)){
                        throw new Error('Integer value error.');
                    }
                }
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Category,
                key: 'id'
            }
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Product'
    }
)

module.exports = Product;
