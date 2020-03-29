const Storage = require("../models/storageModel.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const storage = new Storage({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published
    });

    Storage.create(storage, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while creating the Storage." 
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    Storage.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while getting storages"
            });
        } else {
            res.send(data);
        }
    })
};

exports.findOne = (req, res) => {
    Storage.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Storage ID: ${req.params.id} was not found`
                })
            } else {
                res.status(500).send({
                    message: "An error occurred while getting Storage: " +
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

    Storage.updateById(
        req.params.id,
        new Storage(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Storage ID: ${req.params.id} was not found`
                    })
                } else {
                    res.status(500).send({
                        message: "An error occurred while updating Storage: " +
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
    Storage.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Storage ID: ${req.params.id} was not found`
                })
            } else {
                res.status(500).send({
                    message: "An error occurred while deleting Storage: " +
                        req.params.id
                });
            }
        } else {
            res.send({message: "Deleted Storage"});
        }
    });
};

exports.deleteAll = (req, res) => {
    Storage.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while removing all storages."
            });
        } else {
            res.send({ message: "Deleted all storages"});
        }
    });
};