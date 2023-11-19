const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}));
app.listen(process.env.PORT || 3000, () => {
    console.log("Inicio el servidor")
})

