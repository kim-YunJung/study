import './App.css';
import { storage } from './storageConfig'
import { ref, uploadBytes } from "firebase/storage";
 
function App() {
  //파이어베이스 스토리지 연결 및 확인
  const storageRef = ref(storage);
  console.log('storageRef', storageRef);

  /**
  ref()를 호출할 때 'images/space.jpg'를 두 번째 인수로 전달하여 이 경로와 같이 트리에서 하위 위치를 가리키는 참조를 만들 수 있습니다.
   */
  //경로 : root/images 
  const imagesRef1 = ref(storage, 'images');
  //경로 : root/images/space.jpg
  const imagesRef2 = ref(storage, 'images/myFile.jpg');
  
  /**
   parent 및 root 속성을 사용하여 파일 계층의 위쪽으로 이동할 수도 있습니다. parent는 한 단계 위로 이동하며 root는 맨 위로 이동합니다.
   */  
  //경로 : root/images/space.jpg 의 부모 이므로 root/images/
  const imagesRef3 = imagesRef2.parent;
  //경로 : 최상위로 이동. root/
  const imagesRef4 = imagesRef2.root;

  /**
  fullPath, name, bucket 속성으로 참조를 조사하여 참조가 가리키는 파일을 자세히 파악할 수 있습니다. 이러한 속성은 파일의 전체 경로, 파일의 이름, 파일이 저장된 버킷을 가져옵니다.
   */
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
        // console.log('0번째파일객체', e.target.files[0]);
        // console.log('0번째파일명', e.target.files[0].name);

        /**
        파일업로드
        const ref참조변수 = ref(스토리지접속, 파일명);
        uploadBytes(ref참조변수, 파일객체).then(
         */
        const imageRef = ref(storage, e.target.files[0].name);
        uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
          console.log('업로드성공', snapshot);
        });
      }} />
    </div>
  );
}

export default App;
