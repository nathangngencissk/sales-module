const axios = require('axios')
const Document = require('../models/Document')

module.exports = () => {

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