const sql = require("./db.js");

const Product = function(product) {
    this.name = product.name;
    this.size = product.size;
};

Product.create = (newProduct, result) => {
    sql.query(`INSERT INTO products(name, size) VALUES(?,?)`, 
        [newProduct.name, newProduct.size], 
        (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        console.log("Created Product: ", {
            id: res.insertId,
            ...newProduct
        });
        result(null, {
            id: res.insertId,
            ...newProduct
        });
    });
};

Product.findById = (productId, result) => {
    sql.query(`SELECT * FROM products WHERE id = ${productId}`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found Product: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Product.getAll = result => {
    sql.query("SELECT * FROM products", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log("Storages: ", res);
        result(null, res);
    });
};

Product.updateById = (id, product, result) => {
    sql.query(
        "UPDATE products SET name = ?, size = ? WHERE id = ?",
        [product.name, product.size, id],
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

            console.log("Update product: ", { id: id, ...product});
            result(null, { id: id, ...product});
        }
    );
};

Product.remove = (id, result) => {
    sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        sql.query("DELETE FROM storage_product WHERE product_id = ?", id, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
    
            console.log("Cleared storage_product product with id: ", id);
        });

        console.log("Deleted product with id: ", id);
        result(null, res);
    });
};

Product.removeAll = result => {
    sql.query("DELETE FROM products", (err, res) => {
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

        console.log(`Deleted ${res.affectedRows} products`);
        result(null, res);
    });
};

module.exports = Product;