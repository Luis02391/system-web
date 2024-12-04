import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2cMKJk0nh0WPDeUJV3TGsl7gohkN8GOM",
  authDomain: "system-web-1c939.firebaseapp.com",
  projectId: "system-web-1c939",
  databaseURL: "https://system-web-1c939-default-rtdb.firebaseio.com/",
  storageBucket: "system-web-1c939.firebasestorage.app",
  messagingSenderId: "970901780082",
  appId: "1:970901780082:web:52bd85dee54cbca9c734eb",
};

const appFirebase = initializeApp(firebaseConfig);
export const db = getDatabase(appFirebase);
export const auth = getAuth(appFirebase);
export default appFirebase;



