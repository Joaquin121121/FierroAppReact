import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDFhZxCT21s5aJXfZlSuV0cEJrM9xGQ72A",
    authDomain: "fierro-app.firebaseapp.com",
    projectId: "fierro-app",
    storageBucket: "fierro-app.appspot.com",
    messagingSenderId: "805835831252",
    appId: "1:805835831252:web:959f12a510a79d5412c841",
    measurementId: "G-RBVQ4W3Q5D"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db