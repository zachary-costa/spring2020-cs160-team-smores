const sql = require("./db.js");

const Storage = function(storage) {
    this.title = storage.title;
    this.description = storage.description;
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

        console.log(`Deleted ${res.affectedRows} storages`);
        result(null, res);
    });
};

module.exports = Storage;