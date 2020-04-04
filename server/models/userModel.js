const sql = require(".db.js");

const User = function(user) {
    this.name = user.name;
    this.password = user.password;
}

User.create = (newUser, result) => {
  sql.query(`INSERT INTO users(name, password) VALUES(?,?)`,
[newUser.name, newUser.password],
(err, res) => {
  if (err) {
    console.log("Error: ", err);
    result(err, null);
    return;
}

console.log("Created User: ", {
  id: res.insertId,
  ...newUser
});
result(null, {
    id: res.insertId,
    ...newUser
});
});
};

User.findById = (userId, result) => {
    sql.query(`SELECT * FROM Users WHERE id = ${userId}`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found User: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

User.getAll = result => {
    sql.query("SELECT * FROM Users", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log("Storages: ", res);
        result(null, res);
    });
};

User.updateById = (id, User, result) => {
    sql.query(
        "UPDATE Users SET name = ?, password = ? WHERE id = ?",
        [user.name, user.password, id],
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

            console.log("Update User: ", { id: id, ...user});
            result(null, { id: id, ...user});
        }
    );
};

User.remove = (id, result) => {
    sql.query("DELETE FROM Users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted User with id: ", id);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM Users", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log(`Deleted ${res.affectedRows} Users`);
        result(null, res);
    });
};

module.exports = User;
