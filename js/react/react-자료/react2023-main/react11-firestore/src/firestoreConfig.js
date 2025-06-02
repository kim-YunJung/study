import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//.env 파일 생성 전
const firebaseConfig = {
  apiKey: "AIzaSyDPeUp7sEtFV2-fO4NzE_V0Uv_5JlXY1dk",
  authDomain: "reactapp01-41e5a.firebaseapp.com",
  projectId: "reactapp01-41e5a",
  storageBucket: "reactapp01-41e5a.appspot.com",
  messagingSenderId: "620095185173",
  appId: "1:620095185173:web:a36d9f5f7caea126b4091c"
};

//.env 파일 생성 후
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId
// };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };
