const sql = require("./db.js");

const List = function(list) {
    this.title = list.title;
    this.description = list.description;
    this.products = list.products;
    this.published = list.published;
};

List.create = (newList, result) => {
    sql.query(`INSERT INTO lists(title, description, published) VALUES(?,?,?)`, 
        [newList.title, newList.description, newList.published], 
        (err, res) => {

        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        console.log("Created List: ", {
            id: res.insertId,
            ...newList
        });

        newList.products.forEach(element => {
            sql.query(`INSERT INTO list_product(list_id, product_id) VALUES(?,?)`, 
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
            ...newList
        });
    });
};

List.findById = (listId, result) => {
    sql.query(`SELECT * FROM lists WHERE id = ${listId}`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found List: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

List.findProductIdsInStorageId = (listId, result) => {
    sql.query(`SELECT list_id, p.*
                FROM lists l
                INNER JOIN list_product lp 
                ON lp.list_id = l.id
                INNER JOIN products p
                ON p.id = lp.product_id
                WHERE l.id = ${listId}`
                , (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            
            console.log("Found products: ", res, 
                    " where listid: ", listId);
            result(null, res);
            return;
        });
}

List.getAll = result => {
    sql.query("SELECT * FROM lists", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log("Storages: ", res);
        result(null, res);
    });
};

List.getAllListProducts = result => {
    sql.query(`SELECT list_id, p.*
                FROM lists l
                INNER JOIN list_product lp 
                ON lp.list_id = l.id
                INNER JOIN products p
                ON p.id = lp.product_id`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log("List_Products: ", res);
        result(null, res);
    })
}

List.updateById = (id, list, result) => {
    sql.query(
        "UPDATE lists SET title = ?, description = ?, published = ? WHERE id = ?",
        [list.title, list.description, list.published, id],
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

            sql.query("DELETE FROM list_product WHERE list_id = ?", 
                id, (err, res) => {
                if (err) {
                    console.log("Error: ", err);
                    result(null, err);
                    return;
                }
                if(list.products){
                    console.log(list.products);
                    list.products.forEach(element => {
                        let productid = element.id;
                        if(!productid) {
                            productid = element;
                        }
                        sql.query(`INSERT INTO list_product(list_id, product_id) 
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

            console.log("Update list: ", { id: id, ...list});
            result(null, { id: id, ...list});
        }
    );
};

List.remove = (id, result) => {
    sql.query("DELETE FROM lists WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        sql.query("DELETE FROM list_product WHERE list_id = ?", id, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
    
            console.log("Cleared list_product list with id: ", id);
        });

        console.log("Deleted list with id: ", id);
        result(null, res);
    });
};

List.removeAll = result => {
    sql.query("DELETE FROM lists", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        
        sql.query("DELETE FROM list_product", (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
            
            console.log(`Deleted ${res.affectedRows} lists`);
        });

        console.log(`Deleted ${res.affectedRows} lists`);
        result(null, res);
    });
};

module.exports = List;