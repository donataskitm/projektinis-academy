
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "xxxx",
  authDomain: "form-firebase-6daa9.firebaseapp.com",
  projectId: "form-firebase-6daa9",
  storageBucket: "form-firebase-6daa9.appspot.com",
  messagingSenderId: "xxx",
  appId: "xxxx"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;