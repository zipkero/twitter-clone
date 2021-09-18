import { initializeApp, FirebaseOptions } from "firebase/app";

const firebaseOptions: FirebaseOptions = {
  apiKey: process.env.TWITTER_APIKEY,
  authDomain: process.env.TWITTER_AUTHDOMAIN,
  projectId: process.env.TWITTER_PROJECTID,
  storageBucket: process.env.TWITTER_STORAGEBUCKET,
  messagingSenderId: process.env.TWITTER_MESSAGINGSENDERID,
  appId: process.env.TWITTER_APPID,
};

const firebaseApp = initializeApp(firebaseOptions);

export default firebaseApp;
