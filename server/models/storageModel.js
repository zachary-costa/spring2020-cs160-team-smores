const sql = require("./db.js");

const Storage = function(storage) {
    let t = storage.title;
    let d = storage.description;
    let ps = storage.products;
    if (t >= 255) {
        t = t.substring(0,255);
    }
    if (d >= 255) {
        d = d.substring(0,255);
    }
    
    ps = ps.filter(function(v, i, self) {
        return i == self.indexOf(v); 
    }); 

    this.title = t;
    this.description = d;
    this.products = ps;
    this.published = storage.published;
};

Storage.create = (newStorage, result) => {
    sql.query(`INSERT INTO storages(title, description, published) VALUES(?,?,?)`, 
        [newStorage.title, newStorage.description, newStorage.published], 
        (err, res) => {

        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        console.log("Created Storage: ", {
            id: res.insertId,
            ...newStorage
        });

        newStorage.products.forEach(element => {
            sql.query(`INSERT INTO storage_product(storage_id, product_id) VALUES(?,?)`, 
            [res.insertId, element], 
            (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
        });
        })

        result(null, {
            id: res.insertId,
            ...newStorage
        });
    });
};

Storage.findById = (storageId, result) => {
    sql.query(`SELECT * FROM storages WHERE id = ${storageId}`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found Storage: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Storage.findProductIdsInStorageId = (storageId, result) => {
    sql.query(`SELECT storage_id, p.*
                FROM storages s
                INNER JOIN storage_product sp 
                ON sp.storage_id = s.id
                INNER JOIN products p
                ON p.id = sp.product_id
                WHERE s.id = ${storageId}`
                , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            
            console.log("Found products: ", res, 
                    " where storageid: ", storageId);
            result(null, res);
            return;
        });
}

Storage.getAll = result => {
    sql.query("SELECT * FROM storages", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log("Storages: ", res);
        result(null, res);
    });
};

Storage.getAllStoragesProducts = result => {
    sql.query(`SELECT storage_id, p.*
                FROM storages s
                INNER JOIN storage_product sp 
                ON sp.storage_id = s.id
                INNER JOIN products p
                ON p.id = sp.product_id`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log("Storage_Products: ", res);
        result(null, res);
    })
}

Storage.updateById = (id, storage, result) => {
    sql.query(
        "UPDATE storages SET title = ?, description = ?, published = ? WHERE id = ?",
        [storage.title, storage.description, storage.published, id],
        (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            sql.query("DELETE FROM storage_product WHERE storage_id = ?", 
                id, (err, res) => {
                if (err) {
                    console.log("Error: ", err);
                    result(null, err);
                    return;
                }
                if(storage.products){
                    console.log(storage.products);
                    storage.products.forEach(element => {
                        let productid = element.id;
                        if(!productid) {
                            productid = element;
                        }
                        sql.query(`INSERT INTO storage_product(storage_id, product_id) 
                            VALUES(?,?)`, 
                        [id, productid], 
                        (err, res) => {
                            if (err) {
                                console.log("Error: ", err);
                                result(err, null);
                                return;
                            }
                    });
                })
            }
            });

            console.log("Update storage: ", { id: id, ...storage});
            result(null, { id: id, ...storage});
        }
    );
};

Storage.remove = (id, result) => {
    sql.query("DELETE FROM storages WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        sql.query("DELETE FROM storage_product WHERE storage_id = ?", id, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
    
            console.log("Cleared storage_product storage with id: ", id);
        });

        console.log("Deleted storage with id: ", id);
        result(null, res);
    });
};

Storage.removeAll = result => {
    sql.query("DELETE FROM storages", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        
        sql.query("DELETE FROM storage_product", (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
            
            console.log(`Deleted ${res.affectedRows} storages`);
        });

        console.log(`Deleted ${res.affectedRows} storages`);
        result(null, res);
    });
};

module.exports = Storage;