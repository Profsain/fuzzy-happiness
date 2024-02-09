
// import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyAgSJ7UMiprch3nz_dvs22zTRmOrmWYBOc",
//   authDomain: "splinx-auth.firebaseapp.com",
//   projectId: "splinx-auth",
//   storageBucket: "splinx-auth.appspot.com",
//   messagingSenderId: "1086758963869",
//   appId: "1:1086758963869:web:dd1d1801813fd7698c2274",
//   measurementId: "G-RXMSVJHVT3",
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export default firebase;

import * as firebase from 'firebase';
import '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAgSJ7UMiprch3nz_dvs22zTRmOrmWYBOc",
  authDomain: "splinx-auth.firebaseapp.com",
  projectId: "splinx-auth",
  storageBucket: "splinx-auth.appspot.com",
  messagingSenderId: "1086758963869",
  appId: "1:1086758963869:web:dd1d1801813fd7698c2274",
  measurementId: "G-RXMSVJHVT3",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
