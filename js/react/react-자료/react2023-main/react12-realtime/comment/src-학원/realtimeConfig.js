import { initializeApp } from "firebase/app";
//realtime database 임포트
import { getDatabase } from "firebase/database";

//.env파일 생성 후 
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  databaseURL: "https://reactapp01-41e5a-default-rtdb.asia-southeast1.firebasedatabase.app",
};
 
const app = initializeApp(firebaseConfig);
const realtime = getDatabase(app);

export { realtime };

