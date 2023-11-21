import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, setDoc, doc, updateDoc  } from "firebase/firestore";

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



export async function agregarEstadoNoPublicado(docId) {
    const reporteRef = doc(db, 'reportes', docId);
    await setDoc(reporteRef, { estado: 'no publicado' }, { merge: true });
}

export async function actualizarEstadoPublicado(docId) {
    const reporteRef = doc(db, 'reportes', docId);
    await updateDoc(reporteRef, { estado: 'publicado' });
}




const onGetReportes = (callback) => {
    const query = collection(db, 'reportes');

    const unsubscribe = onSnapshot(query, (querySnapshot) => {
        callback(querySnapshot);
    });

    // Devolvemos la función para desuscribirse cuando sea necesario
    return unsubscribe;
}


export const datosPost = {
    imgURL: [],
    ubi: [],
    desc: [],
    docIds: []
}

const documentosProcesados = new Set();
const publicacionesRealizadas = new Set(); // Nuevo conjunto para hacer un seguimiento de las publicaciones

const cargarReportes = () => new Promise((resolve, reject) => {
    const unsubscribe = onGetReportes((querySnapshot) => {
        try {
            if (querySnapshot.size > 0) {
                datosPost.imgURL = [];
                datosPost.ubi = [];
                datosPost.desc = [];
                datosPost.docIds = [];

            }

            querySnapshot.forEach((doc) => {
                const reporte = doc.data();
                if (!documentosProcesados.has(doc.id)) {
                    datosPost.imgURL.push(reporte.imagenURL);
                    datosPost.ubi.push(reporte.ubicacion);
                    datosPost.desc.push(reporte.descripcion);
                    datosPost.docIds.push(doc.id);
                


                    documentosProcesados.add(doc.id);
                }
            });

            console.log(datosPost);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
});

export { cargarReportes, publicacionesRealizadas, documentosProcesados };