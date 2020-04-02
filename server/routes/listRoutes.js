module.exports = app => {
    const list = require("../controllers/listController.js");

    var router = require("express").Router();

    router.post("/", list.create);
    router.get("/", list.findAll);
    router.get("/:id", list.findOne);
    router.put("/:id", list.update);
    router.delete("/:id", list.delete);
    router.delete("/", list.deleteAll);

    app.use('/list', router);
};