const axios = require('axios')
const Customer = require('../models/Customer')
const Order = require('../models/Order')
const Document = require('../models/Document')
const Product = require('../models/Product')

module.exports = () => {
    const urlAuthSystem = 'http://localhost:3333'

    const controller = {};

    controller.getHistory = async (req, res) => {
        let orders = await Order.find({ customer: req.body.customerId })

        customerHistory = []

        for (order of orders) {
            let document = await Document.findOne({ order: order._id })
            let product = await Product.findById(order.product)

            customerHistory.push({
                product: product.name,
                totalValue: document.value,
                date: order.date,
                paymentType: document.paymentType
            })
        }

        res.json(customerHistory)
    }

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