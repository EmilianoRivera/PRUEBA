
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyAozZm8FRSn9uMa6plxuL0PXlGYH2b9Sos",

    authDomain: "prueba-e44fc.firebaseapp.com",

    projectId: "prueba-e44fc",

    storageBucket: "prueba-e44fc.appspot.com",

    messagingSenderId: "439748782067",

    appId: "1:439748782067:web:2eb066c3fb5cb3992a5486"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const onGetReportes = (callback) => {
    const query = collection(db, 'reportes');

    const unsubscribe = onSnapshot(query, (querySnapshot) => {
        callback(querySnapshot);
    });

    // Devolvemos la función para desuscribirse cuando sea necesario
    return unsubscribe;
}

// firebase.js
export const datosPost = {
    imgURL: [],
    ubi: [],
    desc: [],
}

const cargarReportes = () => new Promise((resolve, reject) => {
    const unsubscribe = onGetReportes((querySnapshot) => {
        try {
            datosPost.imgURL = [];
            datosPost.ubi = [];
            datosPost.desc = [];

            querySnapshot.forEach((doc) => {
                const reporte = doc.data();
                console.log("------------------------------")
                datosPost.imgURL.push(reporte.imagenURL);
                datosPost.ubi.push(reporte.ubicacion);
                datosPost.desc.push(reporte.descripcion);
            });

            console.log(datosPost); // Puedes usar estos datos o devolverlos en la promesa

            // Puedes usar `unsubscribe` para dejar de escuchar los cambios en algún momento
            // Por ejemplo, si dejas la página o dejas de necesitar las actualizaciones en tiempo real
            // unsubscribe();

            resolve();  // Resuelve la promesa cuando los datos se han cargado correctamente
        } catch (error) {
            reject(error);  // Rechaza la promesa si hay algún error
        }
    });
});

export { cargarReportes };