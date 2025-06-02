import React from 'react';
import { realtime } from './realtimeConfig';
import { ref, set } from "firebase/database";
import { getDatabase, child, get,  push, update, remove } from "firebase/database";

function RealtimeCRUD() {
  //database 연결 확인
  //const db = getDatabase(app);
  console.log("realtime", realtime);

  //데이터쓰기
  /** 
  set() : 기본 쓰기 작업에 사용. 지정된 참조에 데이터를 저장하고 해당 경로의 기존 데이터를 모두 변경. 
   */
  function writeUserData(userId, userName, userPass) {
    
    // 등록을 위한 새로운 키가 생성된다. (-NuiwLXkkGa3forFDQwZ 요딴식으로..)
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;

    set(ref(realtime, 'users/' + userId), {
      name: userName,
      pass: userPass,
      fireKey: newPostKey
    });
    console.log('입력성공');
  }



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

  //데이터 수정
  function editUserData(userId, userName, userPass) {    
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    const postData = {
      name: userName,
      pass: userPass,
      fireKey: newPostKey
    };
    
    //2개 이상을 한꺼번에 수정할 수 있다. 
    const updates = {};
    updates['/users/' + userId] = postData;
    //updates['/users/' + userId +"1"] = postData;
      
    return update(ref(realtime), updates);
  }

  //데이터 삭제1
  /**
  set() 또는 update() 등의 다른 쓰기 작업 값으로 null을 지정하여 삭제한다. 
  update()에 이 방법을 사용하면 API 호출 한 번으로 여러 하위 항목을 삭제할 수 있다.
   */
  function deleteUserData1(userId) {  
    const deletes = {};
    deletes['/users/' + userId] = null;
    return update(ref(realtime), deletes);
  }

  function deleteUserData2(userId) {  
    remove(ref(realtime, 'users/' + userId))
    .then(()=>{
      console.log('삭제완료');
    })
    .catch((error)=>{
      console.error('삭제실패', error);
    });
  }

  //입력데이터(수정해서 사용하세요.)
  let adder = "-c";
  const id = 'nakja'+adder;
  const name = "낙자쌤"+adder;
  const pass = "1234"+adder;

  return (
    <div className="App">
      <h2>Firebase - Realtime Database App</h2>      
      <h3>01.CRUD</h3>
      <input type='button' value='입력' onClick={()=>{
        writeUserData(id, name, pass);
      }} />
      <input type='button' value='읽기' onClick={()=>{
        readUserData(id);
      }} />
      <input type='button' value='수정' onClick={()=>{
        editUserData(id, name+'x', pass+'x');
      }} />
      <input type='button' value='삭제1' onClick={()=>{
        deleteUserData1(id);
      }} />
      <input type='button' value='삭제2' onClick={()=>{
        deleteUserData2(id);
      }} />
    </div>
  );
}

export default RealtimeCRUD;