const Category = require('../models/Category');
const Product = require('../models/Product');

exports.create = async (req, res) => {
    let productName = req.body.productName;
    let productDesc = req.body.productDesc;
    let productCategory = req.body.productCategory;
    let productImage = req.file.path;
    let productPrice = req.body.productPrice;
    let productQty = req.body.productQty;

    try {
        const productExist = await Product.findOne({ productName });
        if (productExist) {
            return res.status(400).json({
                errorMessage: `${productName} already exists`,
            });
        }

        let category = await Category.findOne({ _id: productCategory })

        let newProduct = new Product({
            productName: productName,
            productDesc: productDesc,
            productCategory: category.category,
            productImage: productImage,
            productPrice: productPrice,
            productQty: productQty,
        });

        newProduct = await newProduct.save();

        return res.status(200).json({
            successMessage: `${productName} created successfully`
        })

    } catch (err) {
        return res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}

exports.update = async (req, res) => {
    let productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (product) {
            product.productName = req.body.productName;
            product.productDesc = req.body.productDesc;
            product.productCategory = req.body.productCategory;
            product.productImage = req.file.path;
            product.productPrice = req.body.productPrice;
            product.productQty = req.body.productQty;

        }

        await product.save();

        return res.status(200).json({
            successMessage: `${product.productName} updated successfully`
        })

    } catch (err) {
        return res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}

exports.readAll = async (req, res) => {

    try {
        await Product.find({}, (err, products) => {
            return res.status(200).json({
                products
            });
        })

    } catch (err) {
        return res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }

}

exports.readOne = async (req, res) => {

    const productId = req.params.id;

    try {
        await Product.findById(productId, (req, product) => {
            return res.status(200).json({
                product
            });
        });
    } catch (err) {
        return res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }

}


exports.delete = async (req, res) => {
    try {
        const deleteProduct = await Product.findById(req.params.id);
        if (deleteProduct) {
            await deleteProduct.remove();
            res.json({
                successMessage: 'Product Deleted'
            })
        }
    } catch (err) {
        return res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }

}