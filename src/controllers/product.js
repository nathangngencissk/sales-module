const axios = require('axios')
const Product = require('../models/Product')
const Campaign = require('../models/Campaign')

module.exports = () => {
    const urlStockSystem = 'http://stock-server:9000'

    const controller = {};

    controller.getProducts = async (req, res) => {
        let allProductsInStock = await axios.get(`${urlStockSystem}/api/stock_product`)

        let allProducts = []

        for (productInStock of allProductsInStock.data) {
            let product = await Product.findOne({ serial: productInStock._id })

            if (product) {
                allProducts.push(product)
            }
        }

        let productsByRecommendation = allProducts.filter(x => x.recommendation > 0).sort((a, b) => (a.recommendation > b.recommendation) ? 1 : -1)

        let productsIdsInActiveCampaign = []

        let productsInActiveCampaign = []

        let campaigns = await Campaign.find()

        for (campaign of campaigns) {
            productsIdsInActiveCampaign.concat(campaign.products)
        }

        productsIdsInActiveCampaign = [...new Set(productsIdsInActiveCampaign)];

        for (productId of productsIdsInActiveCampaign) {

            let productInCampaign = await Product.findOne({ _id: productId })

            productsInActiveCampaign.push(productInCampaign)
        }

        products = {
            campaignProducts: productsInActiveCampaign,
            recommendedProducts: productsByRecommendation,
            otherProducts: allProducts.filter(prod => productsInActiveCampaign.indexOf(prod) < 0 && productsByRecommendation.indexOf(prod) < 0)
        }

        res.json(products)
    }

    controller.getAll = (req, res) => {
        Product.find()
            .then(products => {
                res.status(200).json(products);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newProduct = new Product({
            name: req.body.name,
            serial: req.body.serial,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            recommendation: req.body.recommendation,
            shop: req.body.shop
        });

        newProduct
            .save()
            .then(product => {
                res.json(product);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newProduct = new Product({
            _id: req.params.id,
            name: req.body.name,
            serial: req.body.serial,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            recommendation: req.body.recommendation,
            shop: req.body.shop
        });

        Product.findOneAndUpdate({ _id: req.params.id }, newProduct, { new: true })
            .then(product => {
                res.json(product);
            })
            .catch(error => res.status(500).json(error));
    }


    controller.delete = (req, res) => {
        Product.findOneAndDelete({ _id: req.params.id })
            .then(product => {
                res.json(product);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.addToCart = async (req, res) => {

        let product = req.body;

        const newProduct = new Product({
            _id: product._id,
            name: product.name,
            serial: product.serial,
            price: product.price,
            quantity: product.quantity - 1,
            category: product.category,
            recommendation: product.recommendation,
            shop: product.shop
        });

        let updatedProduct = await Product.findOneAndUpdate({ _id: product._id }, newProduct, { new: true })

        res.json({
            msg: 'success',
            product: updatedProduct
        })
    }

    controller.removeFromCart = async (req, res) => {

        let product = req.body;

        const newProduct = new Product({
            _id: product._id,
            name: product.name,
            serial: product.serial,
            price: product.price,
            quantity: product.quantity + 1,
            category: product.category,
            recommendation: product.recommendation,
            shop: product.shop
        });

        let updatedProduct = await Product.findOneAndUpdate({ _id: product._id }, newProduct, { new: true })

        res.json({
            msg: 'success',
            product: updatedProduct
        })
    }

    return controller;
}