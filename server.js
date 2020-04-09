const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Foodbutler." });
});

require("./server/routes/storageRoutes")(app);
require("./server/routes/productRoutes")(app);
require("./server/routes/userRoutes")(app);
require("./server/routes/listRoutes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}.`);
});
