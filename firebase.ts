import { initializeApp, FirebaseOptions, FirebaseApp  } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCG_UJeiEYlK8iaLUCE1eLcpuz-vNT-I0E",
  authDomain: "meuif-15823.firebaseapp.com",
  projectId: "meuif-15823",
  storageBucket: "meuif-15823.appspot.com",
  messagingSenderId: "686398009761",
  appId: "1:686398009761:web:3dcd68e2414c6400e15be0",
  measurementId: "G-T5FK1MCC4B"
};

let app: FirebaseApp;

export default function initialize(): FirebaseApp {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
}