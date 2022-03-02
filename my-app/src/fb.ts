import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "APIKEY",
  authDomain: "DOMAIN",
  projectId: "PROJECTID",
  storageBucket: "STORAGEBUCKET",
  messagingSenderId: "SENDERID",
  appId: "APPID",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
