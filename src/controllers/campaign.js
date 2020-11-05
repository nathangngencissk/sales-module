const axios = require('axios')
const Campaign = require('../models/Campaign')

module.exports = () => {

    controller.getAll = (req, res) => {
        Campaign.find()
            .then(campaigns => {
                res.status(200).json(campaigns);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newCampaign = new Campaign({
                 name: req.body.name,
                 active: req.body.active,
                 cpf: req.body.cpf,
                 products: req.body.products
        });

        newCampaign
            .save()
            .then(campaign => {
                res.json(campaign);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newCampaign = new Campaign({
                 _id: req.params.id,
                 active: req.body.active,
                 name: req.body.name,
                 cpf: req.body.cpf,
                 products: req.body.products
        });

        Campaign.findOneAndUpdate({ _id: req.params.id }, newCampaign, { new: true })
            .then(campaign => {
                res.json(campaign);
            })
            .catch(error => res.status(500).json(error));
    }

    
    controller.delete = (req, res) => {
        Campaign.findOneAndDelete({ _id: req.params.id })
            .then(campaign => {
                res.json(campaign);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}