import './App.css';
import { firestore } from './firestoreConfig';
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore"; 
import { useState } from 'react';

function App() {
  //검색 데이터 저장 
  const [showData, setShowData] = useState([]);

  //검색을 위한 함수. 검색필드와 검색어를 매개변수로 정의.
  const getCollection = async (sField, sStr) => {
    console.log("선택", sField);
    let getRows = [];

    if(sField==='id'){
      //id를 Document로 사용하고 있으므로 아래와 같이 검색한다. 
      const docRef = doc(firestore, "members", sStr);
      //문서의 참조값을 찾은 후 문서를 얻어온다. 
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        //문서의 데이터를 변수에 저장한다. 
        getRows.push(docSnap.data());
      } 
      else {
        console.log("No such document!");
      }
    }
    else if(sField==='name'){
      //먼저 컬렉션을 얻어온다. 
      const membersRef = collection(firestore, "members");
      // console.log('membersRef', membersRef); 
      //컬렉션명인 members가 출력됨
      // console.log('membersRef._path.segments[0]', membersRef._path.segments[0]); 
      //query함수를 통해 where(조건)에 맞는 데이터를 찾는다.      
      const q = query(membersRef, where("name", "==", sStr));
      //조건에 맞는 문서를 가져온다. 
      const querySnapshot = await getDocs(q);
      // console.log("Document data:", querySnapshot);
      //조건에 일치하는 문서는 2개 이상일 수 있으므로 반복한다. 
      querySnapshot.forEach((doc) => {
        console.log("반복인출", doc.id, doc.data());
        getRows.push(doc.data());
      });
    }

    let trArray = [];
    console.log("getRows", getRows);
    getRows.forEach((row) => {
      trArray.push (
        <tr key={row.id}>
          <td className="cen">{row.id}</td>
          <td className="cen">{row.pass}</td>
          <td className="cen">{row.name}</td>
          <td className="cen">{row.regdate}</td>
        </tr>  
      );
    });
    
    //State를 변경하고 렌더링을 새롭게 한다. 
    setShowData(trArray);
  }

  return (
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>검색하기</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        let sf = e.target.searchField.value;
        let ss = e.target.searchStr.value;
        getCollection(sf, ss);
      }}>
        <div class="input-group" id="myForm">
          <select name="searchField" className="form-control">
            <option value="id">아이디</option>
            <option value="name">이름</option>
          </select>
          <input type="text" name="searchStr" className="form-control" />
          <button type='submit' className="btn btn-secondary">전체조회</button>
        </div>
      </form>
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
