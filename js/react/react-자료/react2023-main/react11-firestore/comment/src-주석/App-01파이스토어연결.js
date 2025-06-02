import './App.css';
//파이어베이스에서 제공하는 함수 임포트 
import { firestore } from './firestoreConfig';
//새로운 문서를 입력하거나 읽을때 사용하는 함수 
import { doc, setDoc, getDoc } from "firebase/firestore"; 

function App() {
  //파이어스토어 연결 확인
  console.log("firestore", firestore);
 
  //도큐먼트 추가 
  const addMessage = async () => {    
    /** 
    컬렉션(테이블과 비슷) : Korea
    도큐먼트(레코드와 비슷) : Seoul
    하위 데이터는 JSON객체 형식으로 제작하면 된다. 
     */
    await setDoc(doc(firestore, "Korea", "Seoul4"), {      
      gu: "종로구4",
      dong: "관철동4",
      hotplace: "더조은IT4",
    });
    console.log("입력성공");
  }

  //도큐먼트 읽기
  const getMessage = async () => {
    //입력된 컬렉션과 도큐먼트를 통해 문서의 참조를 가져온다. 
    const docRef = doc(firestore, "Korea", "Seoul");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //해당 도큐먼트가 존재하면 콘솔에 내용 출력 
      console.log("Document data:", docSnap.data());
    } 
    else {
      console.log("No such document!");
    }
  }

  return (
    <div className="App">
      <h2>Firebase - Firestore App</h2>      
      <h3>Firebase 연결</h3>
      <input type='button' value='입력' onClick={addMessage} />
      <input type='button' value='읽기' onClick={getMessage} />
    </div>
  );
}

export default App;

