const express = require("express");
const bodyParser = require("body-parser");
const router = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send('Something went wrong!');
});

app.use(router);

app.listen(3000);
