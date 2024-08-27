const Category = require('./Category');
const Product = require('./Product');
const ProductTag = require('./ProductTag');
const Tag = require('./Tag');


Category.hasMany(Product, {
    foreignKey: 'id'
});

Product.belongsTo(Category, {
    foreignKey: 'id'
});




Product.belongsToMany(Tag,{
    foreignKey: 'id'

    }
);

Tag.belongsToMany(Product, {
    foreignKey: 'id'
});


module.exports = { Category, Product, ProductTag, Tag };
