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
            });

            customer = await newCustomer.save()

        }

        res.json(customer)
    }

    return controller;
}