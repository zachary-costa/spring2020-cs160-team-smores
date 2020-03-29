module.exports = app => {
    const storage = require("../controllers/storageController.js");

    var router = require("express").Router();

    router.post("/", storage.create);
    router.get("/", storage.findAll);
    router.get("/:id", storage.findOne);
    router.put("/:id", storage.update);
    router.delete("/:id", storage.delete);
    router.delete("/", storage.deleteAll);

    app.use('/storage', router);
};