module.exports = app => {
    const user = require("../controllers/userController.js");

    var router = require("express").Router();

    router.post("/", user.create);
    router.get("/", user.findAll);
    router.get("/:id", user.findOne);
    router.put("/:id", user.update);
    router.delete("/:id", user.delete);
    router.delete("/", user.deleteAll);

    app.use('/user', router);
};
