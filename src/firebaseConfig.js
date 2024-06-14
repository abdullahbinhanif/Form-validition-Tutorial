import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAdssCHsvRTZlcepn9Ign6Cpq44FHiaLTk",
  authDomain: "form-validition.firebaseapp.com",
  projectId: "form-validition",
  storageBucket: "form-validition.appspot.com",
  messagingSenderId: "1083709703993",
  appId: "1:1083709703993:web:ea665b86a2c3c529a58ae8",
};

const app = initializeApp(firebaseConfig);
export default firebaseConfig;
