import './App.css';
import React, {useState, useEffect} from 'react';

//myData.json파일의 내용으로 목록을 만들어줄 컴포넌트
const ListTop = (props)=>{
  //빈 배열로 state를 선언(최초 실행시에는 데이터가 없는 상태)
  var [myList, setMyList] = useState({contacts:[]});

  //1차 렌더링이 된 이후에 json파일을 요청하여 비동기로 내용을 
  //가져온다.
  useEffect(function(){
    //JSON 가져오기
    fetch('https://sample.bmaster.kro.kr/contacts?pageno=5')
      .then((result)=>{
        return result.json();
      })
      .then((json)=>{
        console.log(json);
        setMyList(json);
      });
    return ()=>{
      console.log('#Life', 'LifeGood==>4.useEffect실행2');
    }
  }, []);

  var listTag = [];
  for(var i=0; i<myList.contacts.length; i++){
    var data = myList.contacts[i];
    console.log('데이터', data.no, data.name);
    //빈 배열에 각 항목을 추가한다.
    listTag.push(
      <tr key={data.no}>
        <td><img src={data.photo} alt={data.name} 
          width='80px'/></td>
        <td><a href={data.no} data-id={data.no} onClick={(e)=>{
          e.preventDefault();
          props.myLinkClick(e.target.dataset.id);
        }}>{data.name}</a></td>
      </tr>
    );
  }
  console.log('#Life', 'LifeGood==>2.return실행(render와동일)');
  return(
    <div id='contactList'>
      <table border='1' className='table table-bordered 
        table-striped'>
        <colgroup><col width="20%"/><col width="*"/></colgroup>
        <thead>
          <tr className="text-center">
            <th>photo</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>{listTag}</tbody>
      </table>
    </div>
  );
}

//객체의 내용을 출력하는 컴포넌트
const ContentBody = (props) =>{
  //props로 전달된 JSON객체를 파싱해서 내용을 출력한다.
  return (
    <div id='contactView'>
      <h2>{props.myResult.name}</h2>
      <ul className="list-group list-group-flush list-hover">
        <li className="list-group-item list-group-item-action">
          no : {props.myResult.no}</li>
        <li className="list-group-item list-group-item-action">
          name : {props.myResult.name}</li>
        <li className="list-group-item list-group-item-action">
          tel : {props.myResult.tel}</li>
        <li className="list-group-item list-group-item-action">
          address : {props.myResult.address}</li>
        <li className="list-group-item list-group-item-action">
          photo : <img src={props.myResult.photo} 
          alt={props.myResult.name} className='myImg' /></li>
      </ul>
    </div>
  );
}

function App() {
  //객체의 내용을 출력할 용도의 state(초기값은 빈 객체)
  var [myResult, setMyResult] = useState({});
  return (
    <div className="container">
      <h2>연락처 API 연동하기</h2>
      <div className="row">
        <div className="list col-sm-6">
          <ListTop myLinkClick={(no)=>{
            console.log('클릭', no);
            fetch('https://sample.bmaster.kro.kr/contacts/'+no)
              .then((result)=>{
                return result.json();
              })
              .then((json)=>{
                console.log('결과', json);
                //결과를 통해 state를 변경한다.
                setMyResult(json);
              });
          }}></ListTop>
        </div>
        <div className="col-sm-6">
          <ContentBody myResult={myResult}></ContentBody>
        </div>
      </div>
    </div>
  );
}

export default App;
