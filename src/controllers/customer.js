const axios = require('axios')
const Customer = require('../models/Customer')

module.exports = () => {
    const urlAuthSystem = 'http://localhost:3333'

    const controller = {};

    controller.getCustomer = async (req, res) => {
        let customer = await Customer.findOne({ cpf: req.body.cpf })

        if (!customer) {
            const newCustomer = new Customer({
                name: req.body.name,
                cpf: req.body.cpf,
                balance: req.body.balance,
            });

            customer = await newCustomer.save()
        }

        res.json(customer)
    }

    controller.add = (req, res) => {
        const newCustumer = new Custumer({
                 name: req.body.name,
                 cpf: req.body.cpf,
                 balance: req.body.balance
        });

        newCustumer
            .save()
            .then(custumer => {
                res.json(custumer);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newCustumer = new Custumer({
                 _id: req.params.id,
                 name: req.body.name,
                 cpf: req.body.cpf,
                 balance: req.body.balance
        });

        Custumer.findOneAndUpdate({ _id: req.params.id }, newCustumer, { new: true })
            .then(custumer => {
                res.json(custumer);
            })
            .catch(error => res.status(500).json(error));
    }

    
    controller.delete = (req, res) => {
        Custumer.findOneAndDelete({ _id: req.params.id })
            .then(custumer => {
                res.json(custumer);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}