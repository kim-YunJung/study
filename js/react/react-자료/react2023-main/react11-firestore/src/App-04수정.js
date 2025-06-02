import './App.css';
import { firestore } from './firestoreConfig';
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore"; 
import { useState, useEffect } from 'react';

function App() {
  // console.log("firestore", firestore);

  //날짜 생성 
  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
    var day = ("0" + dateObj.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }
  
  //문서 수정을 위한 함수 
  const memberEdit = async (p_collection, p_id, p_pass, p_name) => {
    /**
    doc(db, 컬렉션, 아이디), {수정할 내용} 이와같이 수정한다. 
     */
    await setDoc(doc(firestore, p_collection, p_id), {      
      id: p_id,
      pass: p_pass,
      name: p_name,
      regdate: nowDate(),
    });
    console.log("수정성공");
  }

  //<select>태그의 내용을 추가하기 위한 State
  const [showData, setShowData] = useState([]);

  //화면의 렌더링이 끝난직 후 호출되는 훅
  useEffect(() => {    
    const getCollection = async () => {
      let trArray = [];
      //members 컬렉션의 내용을 가져온다. 
      const querySnapshot = await getDocs(collection(firestore, "members"));
      //가져온 문서의 갯수만큼 반복해서 <option>태그를 추가한다. 
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());  
        let memberInfo = doc.data();
        //console.log("파싱", doc.id, memberInfo.pass, memberInfo.name, memberInfo.regdate)
        //value는 아이디, text는 이름으로 설정 
        trArray.push (
          <option key={doc.id} value={doc.id}>{memberInfo.name}</option>
        );
      });
      return trArray;
    } 
    //함수 호출 후 콜백된 데이터를 then절에서 처리
    getCollection().then((result)=>{
      console.log('result', result);
      //State를 변경하여 <select>의 내용을 추가한다. 
      setShowData(result);
    });
  }, []);

  //<input>에 설정된 값은 State를 통해 변경해야 하므로 갯수만큼 선언
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>개별 조회 및 수정하기</h3>
      <form onSubmit={(event) => {
        event.preventDefault();

        //Submit이벤트 발생시 폼값을 얻어온다. 
        let collection = event.target.collection.value;
        let id = event.target.id.value;
        let pass = event.target.pass.value;
        let name = event.target.name.value;

        //빈값에 검증 
        if(id===''){ alert('사용자를 먼저 선택해주세요'); return;}

        //수정을 위한 함수를 호출한다. 
        memberEdit(collection, id, pass, name);

        //수정이 완료되면 입력폼을 비워준다. 
        event.target.id.value = '';
        event.target.pass.value = '';
        event.target.name.value = '';
      }}>
        <div class="input-group" id="myForm">
          {/* 항목 하나를 선택하면 change이벤트가 발생된다. */}
          <select className="form-control" onChange={async (e)=>{
            //선택 항목의 value 즉 아이디를 얻어온다. 
            let user_id = e.target.value;
            console.log("선택", user_id);
            
            //컬렉션명과 아이디(문서명)을 통해 Doc을 얻어온다. 
            const docRef = doc(firestore, "members", user_id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              //해당 문서가 존재하면 데이터를 인출한 후..
              console.log("Document data:", docSnap.data());
              let callData = docSnap.data();
              //각 State를 변경하여 <input>에 추가한다. 
              setId(user_id);
              setPass(callData.pass);
              setName(callData.name);
            } 
            else {
              console.log("No such document!");
            }
          }}>
            <option value="">선택하세요</option>
            {showData}
          </select>
          <button type="submit" className="btn btn-info">수정</button>
        </div>
        <table className='table table-bordered'>
        <tbody>
          <tr>
            <th>컬렉션(테이블) </th>
            <td><input type="text" name="collection" 
                    value="members" className="form-control" /></td>
          </tr>
          <tr>
            <th>아이디(변경불가)</th>
            <td><input type="text" name="id" value={id} className="form-control" 
              onChange={(event)=>{
                setId(event.target.value);
              }} readOnly /></td>
          </tr>
          <tr>
            <th>비밀번호</th>
            <td><input type="text" name="pass" value={pass} className="form-control" 
              onChange={(event)=>{
                setPass(event.target.value);
              }} /></td>
          </tr>
          <tr>
            <th>이름</th>
            <td><input type="text" name="name" value={name} className="form-control" 
              onChange={(event)=>{
                setName(event.target.value);
              }} /></td>
          </tr>
        </tbody>
        </table>        
      </form>
    </div>
  );
}

export default App;
