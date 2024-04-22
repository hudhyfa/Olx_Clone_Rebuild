import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDuUrNYZEG8WNbBb2K2nmpYK5sqLRSWKmc",
    authDomain: "olx-clone-35999.firebaseapp.com",
    projectId: "olx-clone-35999",
    storageBucket: "olx-clone-35999.appspot.com",
    messagingSenderId: "367370872280",
    appId: "1:367370872280:web:22ce12c5d3d708ffbabead",
    measurementId: "G-NBKHPQCW07"
};

export default firebase.initializeApp(firebaseConfig);