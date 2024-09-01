import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  // apiKey: "AIzaSyAgSJ7UMiprch3nz_dvs22zTRmOrmWYBOc",
  // authDomain: "splinx-auth.firebaseapp.com",
  // databaseURL: 'https://splinx-auth.firebaseio.com',
  // projectId: "splinx-auth",
  // storageBucket: "splinx-auth.appspot.com",
  // messagingSenderId: "1086758963869",
  // appId: "1:1086758963869:web:dd1d1801813fd7698c2274",
  // measurementId: "G-RXMSVJHVT3",
  apiKey: "AIzaSyDyBx7keaAPfVOBXkIclNOyUeV10VUJHHI",
  authDomain: "splinx-app-2a5a9.firebaseapp.com",
  projectId: "splinx-app-2a5a9",
  storageBucket: "splinx-app-2a5a9.appspot.com",
  messagingSenderId: "792263487097",
  appId: "1:792263487097:web:e48983656a498c8372eea8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}