
const axios = require('axios')
const Shop = require('../models/Shop')

module.exports = () => {

    const controller = {};

    controller.getAll = (req, res) => {
        Shop.find()
            .then(shops => {
                res.status(200).json(shops);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newShop = new Shop({
            name: req.body.name,
        });

        newShop
            .save()
            .then(shop => {
                res.json(shop);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newShop = new Shop({
            _id: req.params.id,
            name: req.body.name,
        });

        Shop.findOneAndUpdate({ _id: req.params.id }, newShop, { new: true })
            .then(shop => {
                res.json(shop);
            })
            .catch(error => res.status(500).json(error));
    }


    controller.delete = (req, res) => {
        Shop.findOneAndDelete({ _id: req.params.id })
            .then(shop => {
                res.json(shop);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}