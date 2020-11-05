const axios = require('axios')
const Category = require('../models/Category')

module.exports = () => {

    const controller = {};

    controller.getAll = (req, res) => {
        Category.find()
            .then(categories => {
                res.status(200).json(categories);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newCategory = new Category({
            name: req.body.name,
        });

        newCategory
            .save()
            .then(category => {
                res.json(category);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newCategory = new Category({
            _id: req.params.id,
            name: req.body.name,
        });

        Category.findOneAndUpdate({ _id: req.params.id }, newCategory, { new: true })
            .then(category => {
                res.json(category);
            })
            .catch(error => res.status(500).json(error));
    }


    controller.delete = (req, res) => {
        Category.findOneAndDelete({ _id: req.params.id })
            .then(category => {
                res.json(category);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}