import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";


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
const reportesContainer = document.getElementById("reportes-container");


const onGetReportes = (callback) => {
    const query = collection(db, 'reportes');

    const unsubscribe = onSnapshot(query, (querySnapshot) => {
        callback(querySnapshot);
    });

    // Devolvemos la función para desuscribirse cuando sea necesario
    return unsubscribe;
}


const datosPost = {
    imgURL : "",
    ubi:"",
    desc: "",
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const unsubscribe = onGetReportes((querySnapshot) => {
            reportesContainer.innerHTML = "";  // Limpiamos el contenedor antes de agregar nuevos elementos
            querySnapshot.forEach((doc) => {
                const reporte = doc.data();
                console.log("------------------------------")
                datosPost.imgURL = reporte.imagenURL;
                datosPost.ubi = reporte.ubicacion;
                datosPost.desc = reporte.descripcion;
                console.log(datosPost.imgURL)
                console.log(datosPost.ubi)
                console.log(datosPost.desc)

                reportesContainer.innerHTML += `<div class="car card-body mt-2 border-primary"> 
            <div>
                <img src=" ${reporte.imagenURL}" heigth ="200" width="300">
            </div>
            <p>${reporte.ubicacion}</p>
            <p>${reporte.descripcion}</p>
        </div>`;
            });
        });

        // Puedes usar `unsubscribe` para dejar de escuchar los cambios en algún momento
        // Por ejemplo, si dejas la página o dejas de necesitar las actualizaciones en tiempo real
        // unsubscribe();
    } catch (error) {
        console.error('Error al obtener reportes:', error);
    }
});

const enviarDatosPost = {
    imagen: datosPost.imgURL,
    ubicacionUsuario: datosPost.ubi,
    descripcionBache: datosPost.desc
};


