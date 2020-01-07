import firebase from "firebase";
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  MESSAGE_SENDER_ID,
  APP_ID
} from "react-native-dotenv";

// ... after other imports
import "firebase/firestore";

// ... before export default statemen

// const firebaseConfig = {
//   apiKey: "AIzaSyB-G4cVijM1PN87sr40EbbtD9ULi-nw_oU",
//   authDomain: "teamtruthy.firebaseapp.com",
//   databaseURL: "https://teamtruthy.firebaseio.com",
//   projectId: "teamtruthy",
//   storageBucket: "teamtruthy.appspot.com",
//   messagingSenderId: "940140064100",
//   appId: "1:940140064100:web:04dbad49071b982e3a9e71"
// };
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: "",
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export default Firebase;
