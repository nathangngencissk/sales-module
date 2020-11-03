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
            });

            customer = await newCustomer.save()

        }

        res.json(customer)
    }



    return controller;
}