import { initializeApp} from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgSJ7UMiprch3nz_dvs22zTRmOrmWYBOc",
  authDomain: "splinx-auth.firebaseapp.com",
  databaseURL: 'https://splinx-auth.firebaseio.com',
  projectId: "splinx-auth",
  storageBucket: "splinx-auth.appspot.com",
  messagingSenderId: "1086758963869",
  appId: "1:1086758963869:web:dd1d1801813fd7698c2274",
  measurementId: "G-RXMSVJHVT3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default app;