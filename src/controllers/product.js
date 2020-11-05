const axios = require('axios')
const Product = require('../models/Product')
const Campaign = require('../models/Campaign')
const Document = require('../models/Document')

module.exports = () => {
    const urlAuthSystem = 'http://localhost:3333'

    const controller = {};

    controller.getProducts = async (req, res) => {
        let allProducts = await Product.find()

        let productsByRecommendation = products.filter(x => x.recommendation > 0).sort((a, b) => (a.recommendation > b.recommendation) ? 1 : -1)

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
            otherProducts: allProducts.filter(prod => campaignProducts.indexOf(prod) < 0 && recommendedProducts.indexOf(prod) < 0)
        }

        res.json(products)
    }

    controller.getCustomer = async (req, res) => {
        let customer = await Customer.findOne({ cpf: req.body.cpf })

        if (!customer) {
            const newCustomer = new Customer({
                name: req.body.name,
                cpf: req.body.cpf,
            });

            customer = await newCustomer.save()

        }

        res.json(customer)
    }

    controller.getAll = (req, res) => {
        Document.find()
            .then(documents => {
                res.status(200).json(documents);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newDocument = new Document({
            type: req.body.type,
            description: req.body.cpf,
            value: req.body.value,
            quantity: req.body.quantity,
            date: req.body.date,
            paymentType: req.body.paymentType
        });

        newDocument
            .save()
            .then(document => {
                res.json(document);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newDocument = new Document({
            _id: req.params.id,
            type: req.body.type,
            description: req.body.cpf,
            value: req.body.value,
            quantity: req.body.quantity,
            date: req.body.date,
            paymentType: req.body.paymentType
        });

        Document.findOneAndUpdate({ _id: req.params.id }, newDocument, { new: true })
            .then(document => {
                res.json(document);
            })
            .catch(error => res.status(500).json(error));
    }


    controller.delete = (req, res) => {
        Document.findOneAndDelete({ _id: req.params.id })
            .then(document => {
                res.json(document);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}