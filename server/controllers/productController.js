const Product = require("../models/productModel.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const product = new Product({
        name: req.body.name,
        size: req.body.size,
    });

    Product.create(product, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while creating the Product." 
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while getting products"
            });
        } else {
            res.send(data);
        }
    })
};

exports.findOne = (req, res) => {
    Product.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Product ID: ${req.params.id} was not found`
                })
            } else {
                res.status(500).send({
                    message: "An error occurred while getting Product: " +
                        req.params.id
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    Product.updateById(
        req.params.id,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Product ID: ${req.params.id} was not found`
                    })
                } else {
                    res.status(500).send({
                        message: "An error occurred while updating Product: " +
                            req.params.id
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};

exports.delete = (req, res) => {
    Product.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Product ID: ${req.params.id} was not found`
                })
            } else {
                res.status(500).send({
                    message: "An error occurred while deleting Product: " +
                        req.params.id
                });
            }
        } else {
            res.send({message: "Deleted Product"});
        }
    });
};

exports.deleteAll = (req, res) => {
    Product.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while removing all products."
            });
        } else {
            res.send({ message: "Deleted all products"});
        }
    });
};