const axios = require('axios')
const Order = require('../models/Order')
const Document = require('../models/Document')
const Customer = require('../models/Customer')

module.exports = () => {

    const urlStockSystem = 'http://stock-server:9000'

    const controller = {}

    controller.getAll = (req, res) => {
        Order.find()
            .then(orders => {
                res.status(200).json(orders);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newOrder = new Order({
            product: req.body.type,
            shop: req.body.cpf,
            customer: req.body.value,
            date: req.body.quantity,
            document: req.body.date
        });

        newOrder
            .save()
            .then(order => {
                res.json(order);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newOrder = new Order({
            _id: req.params.id,
            product: req.body.type,
            shop: req.body.cpf,
            customer: req.body.value,
            date: req.body.quantity,
            document: req.body.date
        });

        Order.findOneAndUpdate({ _id: req.params.id }, newOrder, { new: true })
            .then(order => {
                res.json(order);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.delete = (req, res) => {
        Order.findOneAndDelete({ _id: req.params.id })
            .then(order => {
                res.json(order);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.buy = async (req, res) => {
        let products = req.body.products;

        let customer = await Customer.findById(req.body.customer._id);

        let totalValueProducts = 0;

        for (product of products) {
            totalValueProducts += product.price;
        }

        if (customer.balance < totalValueProducts) {
            res.json({
                msg: "error, insufficient funds"
            })

            return
        }

        for (product of products) {
            let stockProduct = await axios.get(`${urlStockSystem}/api/stock_product/get/${product.serial}`)

            let payload = {
                type: "NOTA_FISCAL_SAIDA",
                shop: stockProduct.data.shop,
                warehouse: stockProduct.data.warehouse,
                product: stockProduct.data.product,
                value: product.price,
                quantity: 1
            }

            console.log(payload)

            let createdMovement = await axios.post(`${urlStockSystem}/api/warehouse/create_movement`, payload);

        }

        const newCustomer = new Customer({
            _id: req.body.customer._id,
            name: req.body.customer.name,
            cpf: req.body.customer.cpf,
            balance: req.body.customer.balance - totalValueProducts
        });

        await Customer.findOneAndUpdate({ _id: customer._id }, newCustomer, { new: true })

        res.json({
            msg: "success"
        })
    }

    return controller;
}