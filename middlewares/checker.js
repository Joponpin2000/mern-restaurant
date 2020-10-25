const fs = require('fs');

module.exports = (req, res, next) => {
    if (typeof (req.file) === 'undefined' || typeof (req.body) === 'undefined') {
        return res.status(400).json({
            errorMessage: "Invalid file format"
        })
    }

    let productName = req.body.productName;
    let productDesc = req.body.productDesc;
    let productCategory = req.body.productCategory;
    let productImage = req.file.path;
    let productPrice = req.body.productPrice;
    let productQty = req.body.productQty;

    if (!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('jpg')) {
        fs.unlinkSync(productImage);
        return res.status(400).json({
            errorMessage: "File not supported"
        })
    }

    if (req.file.size > 1024 * 1024 * 5) {
        fs.unlinkSync(productImage);
        return res.status(400).json({
            errorMessage: "File is too large"
        })
    }

    if (!productName || !productDesc || !productCategory || !productPrice || !productQty) {
        return res.status(400).json({
            errorMessage: "All fields are required"
        })
    }


    next();
}