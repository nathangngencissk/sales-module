const axios = require('axios')
const Product = require('../models/Product')
const Campaign = require('../models/Campaign')

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



    return controller;
}