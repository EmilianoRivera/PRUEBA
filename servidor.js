import { cargarReportes, datosPost } from './firebase.js';
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();


app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 3000, () => {
    console.log("Inicio el servidor")
})
const pageId = "121835611022693"
const access_token = "EAAMTmmZCNPYkBOZB7Qc9kdndWCh7PYQMFF5CxMPYLnt4yVeqlIXghcdyYpc027ZCATeR54YgIvdMuhoAZBnaepuvyuXOM1GZAMjnPzRvT48a5xBulzLQFrzpIfH4PCIjUnXZC0mvmKbbZAz2ilncoqPKDlQSRY4xNBMPTIGZBXyS59HPRfI6BOQdGnaZBX6dF1B8ZD"
async function realizarPublicacion(text, img) {
    try {
        const imageUrl = encodeURIComponent(img);
        const response = await axios.post(`https://graph.facebook.com/v18.0/${pageId}/feed?message=${text} ${imageUrl}&access_token=${access_token}`, null);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al publicar:', error.response ? error.response.data : error.message);
        throw error;  // Relanza el error para que pueda ser capturado por la promesa
    }
}

cargarReportes()
    .then(() => {
        // Ahora puedes obtener datosPost con la información actualizada
        const mensajes = datosPost.ubi.map((ubi, index) => {
            const mensaje = `Bache reportado en: ${ubi} Descripción: ${datosPost.desc[index]}`;
            const Img = `Evidencia: ${datosPost.imgURL[index]}`;
            realizarPublicacion(mensaje, Img);
        });
    })
    .catch((error) => {
        console.error('Error al cargar los reportes:', error);
    });

