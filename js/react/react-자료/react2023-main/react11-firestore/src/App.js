import './App.css';
import { firestore } from './firestoreConfig';
import { collection, getDocs } from "firebase/firestore"; 
import { useState } from 'react';

function App() {
  //데이터를 저장할 State 정의
  const [showData, setShowData] = useState([]);

  const getCollection = async () => {
    let trArray = [];
    //컬렉션 이름으로 지정된 하위 문서를 얻어온다.
    const querySnapshot = await getDocs(collection(firestore, "members"));
    //문서의 갯수만큼 반복해서 <tr>태그를 추가한다.
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());  
      //문서를 하나씩 인출한다. 
      let memberInfo = doc.data();
      //console.log("파싱", doc.id, memberInfo.pass, memberInfo.name, memberInfo.regdate)
      trArray.push (
        <tr key={doc.id}>
          <td className="cen">{doc.id}</td>
          <td className="cen">{memberInfo.pass}</td>
          <td className="cen">{memberInfo.name}</td>
          <td className="cen">{memberInfo.regdate}</td>
        </tr>  
      );
    });
    //파싱된 데이터를 통해 State를 변경하고 재렌더링한다.
    setShowData(trArray);
  }

  return (
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>전체조회하기</h3>
      <button type='button' className="btn btn-warning" onClick={getCollection}>전체조회</button>
      <table className='table table-bordered'>
      <thead>
        <tr className='text-center'>
          <th>아이디</th><th>비밀번호</th><th>이름</th><th>가입일</th>
        </tr>
      </thead>
      <tbody>
        {showData}
      </tbody>
      </table>
    </div>
  );
}

export default App;

