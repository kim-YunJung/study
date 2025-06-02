import './App.css';
import { realtime } from './realtimeConfig';
import { ref, set, onValue } from "firebase/database";
import { getDatabase, child, get,  push, update } from "firebase/database";

function App() {
  //database 연결 확인
  //const db = getDatabase(app);
  console.log("realtime", realtime);

  //데이터쓰기
  function writeUserData(userId, name, email, imageUrl) {
    //const db = getDatabase();
    set(ref(realtime, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl
    });
    console.log('입력성공');
  }

  //리스너
  let postId = 'a1';
  const starCountRef = ref(realtime, 'users/' + postId);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log('data', data);
  });

  //데이터 읽기
  function readUserData(userId) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } 
      else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }


  function writeNewPost(userId, userName, contentBody) {
    
    const postData = {
      name: userName,
      contents: contentBody
    };
  
    // 등록을 위한 새로운 키가 생성된다. (-NuiwLXkkGa3forFDQwZ 요딴식으로..)
    const newPostKey = push(child(ref(realtime), 'users')).key;
  
    //2개 이상을 한꺼번에 수정할 수 있다. 
    const updates = {};
    updates['/users/' + userId] = postData;
    updates['/users/' + userId +"1"] = postData;
    
  
    return update(ref(realtime), updates);
  }


  return (
    <div className="App">
      <h2>Firebase - Realtime Database 연동 App</h2>      
      <h3>Firebase 연결</h3>
      <input type='button' value='입력' onClick={()=>{
        writeUserData('a1','b1-1','c1-1','d1-1');
      }} />
      <input type='button' value='읽기' onClick={()=>{
        readUserData('a1');
      }} />
      <input type='button' value='수정' onClick={()=>{
        writeNewPost('a', '성낙현', '하이룽~~');
      }} />
    </div>
  );
}

export default App;