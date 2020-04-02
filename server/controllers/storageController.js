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
        products: req.body.products,
        published: req.body.published,
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
            Storage.getAllStoragesProducts((err, products) => {
                if (err) {
                    res.status(500).send({
                        message:
                            err.message ||
                            "An error occurred while getting storage_products"
                    });
                } else {
                    let productMat = extractSortProducts(products);
                    console.log(productMat);
                    data = insertProductMatrix(data, productMat);
                    res.send(data);
                }
            })
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
            Storage.findProductIdsInStorageId(req.params.id, (err, products) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Storage ID: ${req.params.id} was not found
                                        in storage_product`
                        })
                    } else {
                        res.status(500).send({
                            message: 
                                "An error occurred while getting Products of Storage: " 
                                + req.params.id
                        });
                    }
                } else {
                    let productArr = extractProducts(products);
                    data = insertProductArr(data, productArr);
                    console.log(data);
                    res.send(data);
                }
            });            
        }
    });
};

function insertProductArr(data, products) {
    let j = JSON.parse(JSON.stringify(data));
    let names = Object.keys(j);
    let vals = Object.values(j);
    
    names.push('products');
    vals.push(products);

    console.log(names);
    console.log(vals);
    let obj = {};
    names.forEach(function(k,i){
        obj[k] = vals[i];
    });
    return obj;
}

function extractProducts(res) {
    let arr = [];
    for (let i = 0; i < res.length; i++) {
        let j = JSON.parse(JSON.stringify(res[i]));
        obj = {};
        obj["id"] = j.product_id;
        obj["name"] = j.name;
        obj["size"] = j.size;
        arr.push(obj);
    }
    return arr;
}

function insertProductMatrix(data, products) {
    var arr = [];
    for (let i = 0; i < data.length; i++) {
        var row = JSON.parse(JSON.stringify(data[i]));
        var names = Object.keys(row);
        var vals = Object.values(row);

        names.push('products');
        vals.push(products[vals[0]]);
        console.log(names);
        console.log(vals);
        var rowObj = {};
        names.forEach(function(k,v){
            rowObj[k] = vals[v];
        });

        arr.push(rowObj);

    }
    console.log(arr);
    return arr;
}

function extractSortProducts(res) {
    let storages = {};
    for (let i = 0; i < res.length; i++) {
        let j = JSON.parse(JSON.stringify(res[i]));
        if (!(j.storage_id in storages)) {
            storages[j.storage_id] = [];
        }
        obj = {};
        obj["id"] = j.product_id;
        obj["name"] = j.name;
        obj["size"] = j.size;
        storages[j.storage_id].push(obj);
    }
    return storages;
}

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