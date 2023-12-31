import { cargarReportes, datosPost, publicacionesRealizadas, documentosProcesados } from './firebase.js';
import { agregarEstadoNoPublicado, actualizarEstadoPublicado } from './firebase.js';
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



async function realizarPublicacion(text, img, docId) {
    try {

       
        const imageUrl = encodeURIComponent(img);
        const response = await 
        axios.post(
        `https://graph.facebook.com/v18.0/${pageId}/photos?url=${imageUrl}&message=${text}&access_token=${access_token}`,
         null);

        console.log(response.data);
   
        if (response.data.id) {
            // Actualiza el estado a "publicado" después de la publicación
            await actualizarEstadoPublicado(docId);
        }


        return response.data;
    } catch (error) {
        console.error('Error al publicar:', error.response ? error.response.data : error.message);
        throw error;  // Relanza el error para que pueda ser capturado por la promesa
    }
}

const procesarReportes = async () => {
    datosPost.imgURL = [];
    datosPost.ubi = [];
    datosPost.desc = [];
    datosPost.docIds = [];

    await cargarReportes();

    // Ahora puedes obtener datosPost con la información actualizada
    const nuevosReportes = datosPost.ubi.map((ubi, index) => {
        const mensaje = `Bache reportado en: ${ubi} Descripción: ${datosPost.desc[index]}.  `;
        const Img = `${datosPost.imgURL[index]}`;
        const docId = datosPost.docIds[index]
        return { mensaje, Img , docId};
    });

    return nuevosReportes;
};

const publicarNuevosReportes = async () => {
    try {
        const nuevosReportes = await procesarReportes();

        // Realizar publicaciones solo para los nuevos reportes que no han sido publicados
        for (const { mensaje, Img, docId } of nuevosReportes) {
            if (!publicacionesRealizadas.has(mensaje)) {

                await agregarEstadoNoPublicado(docId);


                await realizarPublicacion(mensaje, Img, docId);

               
                publicacionesRealizadas.add(mensaje); // Agregar el identificador a las publicaciones realizadas
            }
        }

        // Limpiar documentosProcesados después de realizar las publicaciones
        documentosProcesados.clear();
    } catch (error) {
        console.error('Error al procesar y publicar nuevos reportes:', error);
    }
};

setInterval(publicarNuevosReportes, 15000);