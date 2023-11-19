const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 3000, () => {
    console.log("Inicio el servidor")
})
const pageId = "121835611022693"
const access_token = "EAAMTmmZCNPYkBOZB7Qc9kdndWCh7PYQMFF5CxMPYLnt4yVeqlIXghcdyYpc027ZCATeR54YgIvdMuhoAZBnaepuvyuXOM1GZAMjnPzRvT48a5xBulzLQFrzpIfH4PCIjUnXZC0mvmKbbZAz2ilncoqPKDlQSRY4xNBMPTIGZBXyS59HPRfI6BOQdGnaZBX6dF1B8ZD"
app.post("/posttopage",async (req, res) => {
    const text = req.body.text;
    const img = req.body.img;
    //const mensaje = "UBICACIÓN: " + /*enviarDatosPost.ubicacionUsuario*/ + " DESCRIPCIÓN: "  /*enviarDatosPost.descripcionBache*/
    const imageUrl = encodeURIComponent(img);
    axios.post(`https://graph.facebook.com/v18.0/${pageId}/feed?message=${text}/photos?url=${imageUrl}&access_token=${access_token}`, null) 
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        })
})


