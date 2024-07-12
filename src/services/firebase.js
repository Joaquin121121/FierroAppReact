import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAxHhoo-XhZRcg99Fg1-tV4fY1IWyu70O8",
    authDomain: "fierroapp-910d5.firebaseapp.com",
    projectId: "fierroapp-910d5",
    storageBucket: "fierroapp-910d5.appspot.com",
    messagingSenderId: "578391914326",
    appId: "1:578391914326:web:2609bd9c621a8851f248f7",
    measurementId: "G-RFHYD09J10"
  }

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db