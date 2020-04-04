const User = require("../models/userModel.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const user = new User({
        name: req.body.name,
        size: req.body.size,
    });

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while creating the User."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while getting Users"
            });
        } else {
            res.send(data);
        }
    })
};

exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User ID: ${req.params.id} was not found`
                })
            } else {
                res.status(500).send({
                    message: "An error occurred while getting User: " +
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

    User.updateById(
        req.params.id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `User ID: ${req.params.id} was not found`
                    })
                } else {
                    res.status(500).send({
                        message: "An error occurred while updating User: " +
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
    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User ID: ${req.params.id} was not found`
                })
            } else {
                res.status(500).send({
                    message: "An error occurred while deleting User: " +
                        req.params.id
                });
            }
        } else {
            res.send({message: "Deleted User"});
        }
    });
};

exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "An error occurred while removing all users."
            });
        } else {
            res.send({ message: "Deleted all users"});
        }
    });
};
