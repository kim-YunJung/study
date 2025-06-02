const Product = require("../models/Product");
const bcrypt = require('bcryptjs');

const productController = {};

productController.createProduct = async (req, res) => {
    try {
        const { sku, name, size, image, category, description, price, stock, status } = req.body;
        const product = new Product({sku, name, size, image, category, description, price, stock, status});

        await product.save();

        res.status(200).json({status : "create product success", product});

    } catch (error) {
        res.status(400).json({status : "create product fail", message : error.message});
    }
}

module.exports = productController;