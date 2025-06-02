import './App.css';
import { storage } from './storageConfig'
import { ref, uploadBytes } from "firebase/storage";
 
function App() {
  //파이어베이스 스토리지 연결 및 확인
  const storageRef = ref(storage);
  console.log('storageRef', storageRef);

  const imagesRef1 = ref(storage, 'images');
  const imagesRef2 = ref(storage, 'images/myFile.jpg');
  
  const imagesRef3 = imagesRef2.parent;
  const imagesRef4 = imagesRef2.root;

  console.log('ref객체', imagesRef1); //객체를 통해 모든 프로퍼티 확인
  console.log('경로1', imagesRef1.fullPath); 
  console.log('경로2', imagesRef2.fullPath, imagesRef2.name);
  console.log('경로3', imagesRef3.fullPath); //경로1과 동일 
  console.log('경로4', imagesRef4.fullPath); //최상위이므로 빈값 출력

  return (
    <div className="App">
      <h2>Firebase - Storage App</h2>
      <h3>스토리지 접속 및 파일 업로드</h3>
      <p>파일을 선택하면 즉시 업로드 됩니다.</p>
      <input type="file" name="myfile" onChange={(e) => { 
        console.log('files 프로퍼티', e.target.files);

        const imageRef = ref(storage, e.target.files[0].name);
        uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
          console.log('업로드성공', snapshot);
        });
      }} />
    </div>
  );
}

export default App;
