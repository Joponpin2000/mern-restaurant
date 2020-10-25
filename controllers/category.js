const Category = require('../models/Category');

exports.create = async (req, res) => {
    const { category } = req.body;

    try {
        const categoryExist = await Category.findOne({ category });
        if (categoryExist) {
            return res.status(400).json({
                errorMessage: `${category} already exists`,
            });
        }

        let newCategory = new Category();
        newCategory.category = category;

        newCategory = await newCategory.save();

        return res.status(200).json({
            successMessage: `${newCategory.category} was created!`,
        })
    } catch (err) {
        return res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }
}

exports.readAll = async (req, res) => {
    try {
        const categories = await Category.find({});

        res.status(200).json({
            categories,
        });
    } catch (err) {
        res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }
}