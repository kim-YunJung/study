import '../Chat.css';
import React from 'react';
import { realtime } from '../realtimeConfig';
import { ref, child, set, onValue, push } from "firebase/database";
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const nowDate = () => {
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  var hours = ('0' + dateObj.getHours()).slice(-2); 
  var minutes = ('0' + dateObj.getMinutes()).slice(-2);
  var seconds = ('0' + dateObj.getSeconds()).slice(-2); 

  return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
}

const scrollTop = (chatWindow) => {
  console.log('scrollTop 호출됨');
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

//내가 보낸거
const SendMessage = (props) => {
  let id = props.chatData.id;
  let message = props.chatData.message;
  let date = props.chatData.date;

  return (<>
    {/* <!-- 나UI --> */}
    <div className="d-flex justify-content-between">
      <p className="small mb-1 text-muted">{date}</p>
      <p className="small mb-1">{id}</p>
    </div>
    <div className="d-flex flex-row justify-content-end mb-4 pt-1">
      <div>
        <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">{message}</p>
      </div>
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
        alt="avatar 1" style={{'width':'45px','height':'100%'}}/>
    </div>
    {/* <!-- 나UI -->   */}
  </>);
}

//상대방이 보낸거
const ReceiveMessage = (props) => {
  let id = props.chatData.id;
  let message = props.chatData.message;
  let date = props.chatData.date;

  return (<>
    {/* <!-- 상대방UI --> */}
    <div className="d-flex justify-content-between">
      <p className="small mb-1">{id}</p>
      <p className="small mb-1 text-muted">{date}</p>
    </div>
    <div className="d-flex flex-row justify-content-start">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
        alt="avatar 1" style={{'width':'45px','height':'100%'}}/>
      <div>
        <p className="small p-2 ms-3 mb-3 rounded-3" style={{'backgroundColor':'#f5f6f7'}}>
          {message}
        </p>
      </div>
    </div>
    {/* <!-- 상대방UI --> */}
  </>);
}

function ChatMessage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  const chatWindow = useRef();
  const timerRef = useRef(0);
  
  const [chatData, setChatData] = useState('');

  function messageWrite(chatRoom, chatId, chatMessage) {
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    set(ref(realtime, chatRoom + '/' + newPostKey), {
      id: chatId,
      message: chatMessage,
      date: nowDate(),
    });
    console.log('입력성공');
  }

  const dbRef = ref(realtime, roomId);
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      clearInterval(timerRef.current);
      timerRef.current = setTimeout(()=>{
        scrollTop(chatWindow.current);
      }, 300);    
      let showDiv = [];      
      snapshot.forEach((childSnapshot) => {
        // const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        //console.log("리스너", childKey, childData.id, userId);
        if(childData.id===userId){
          showDiv.push(<SendMessage chatData={childData} />);
        }
        else{
          showDiv.push(<ReceiveMessage chatData={childData} />);
        }
      });
      setChatData(showDiv);      
    });
  }, []);

  return (<>
  <section style={{"backgroundColor":"#eee"}}>
    <div className="container py-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center p-3"
              style={{'borderTop':'4px solid #ffa900'}}>
              <h5 className="mb-0">Realtime 채팅</h5>
              <div className="d-flex flex-row align-items-center">
                대화명 : {userId}
                <span className="badge bg-warning me-3"></span>
                <i className="fas fa-minus me-3 text-muted fa-xs"></i>
                <i className="fas fa-comments me-3 text-muted fa-xs"></i>
                <i className="fas fa-times text-muted fa-xs"></i>
              </div>
            </div>
            <div className="card-body" ref={chatWindow} data-mdb-perfect-scrollbar="true" style={{'position':'relative','height':'400px','overflowY':'scroll'}}>
              {/* 대화 내용 출력 */}
              {chatData}
            </div>
            {/* <!-- 채팅 입력 및 버튼 --> */}
            <form onSubmit={(e)=>{
                e.preventDefault();
                let chatRoom = e.target.chatRoom.value;
                let chatId = e.target.chatId.value;
                if(chatId===''){
                  alert('대화명을 입력하세요');
                  return;
                }
                let message = e.target.message.value;
                if(message===''){
                  alert('메세지를 입력하세요');
                  return;
                }
                console.log('submit', chatRoom, chatId, message);
                messageWrite(chatRoom, chatId, message);

                e.target.message.value = '';
            }}>
              <input type="hidden" name="chatRoom" value={roomId} />
              <input type="hidden" name="chatId" value={userId} />
              <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                <div className="input-group mb-0">
                  <input type="text" className="form-control" placeholder="메세지를 입력하세요" name="message" aria-label="Recipient's username" aria-describedby="button-addon2" />
                  <button className="btn btn-warning" type="submit" id="button-addon2" style={{'paddingTop':'.55rem'}}>
                    전송
                  </button>
                </div>
            </div>
            </form>
          </div>  
        </div>
      </div>  
    </div>
  </section>
  </>);
}

export default ChatMessage;