import { initializeApp } from "firebase/app";
//realtime database 임포트
import { getStorage } from "firebase/storage";

//.env 파일 생성 후
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};
 
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://reactapp01-41e5a.appspot.com");

export { storage };