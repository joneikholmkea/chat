import {initializeApp} from 'firebase/app';
import {getStorage} from "firebase/storage";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDGPsJGvPaJvjHSFKhhg9RTiEhAq-SHv7k",
    authDomain: "firedemo-b1124.firebaseapp.com",
    databaseURL: "https://firedemo-b1124.firebaseio.com",
    projectId: "firedemo-b1124",
    storageBucket: "firedemo-b1124.appspot.com",
    messagingSenderId: "1035991261669",
    appId: "1:1035991261669:web:f6810a8434ecce529b4f0c",
    measurementId: "G-13W6TBRF51"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore();
export const storage = getStorage(app);







// apiKey: Constants.manifest.extra.apiKey,
// authDomain: Constants.manifest.extra.authDomain,
// databaseURL: Constants.manifest.extra.databaseURL,
// projectId: Constants.manifest.extra.projectId,
// storageBucket: Constants.manifest.extra.storageBucket,
// messagingSenderId: Constants.manifest.extra.messagingSenderId,
// appId: Constants.manifest.extra.appId,
// measurementId: Constants.manifest.extra.measurementId