import React from 'react';
import { useRef } from 'react';
import Navi from '../components/Navi';
 
const ChatStart = () => {
  const refRoom = useRef();
  const refId = useRef();

  const openChatWin = () => {
    window.open(`#/chat/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`, 
        '', 'width=500,height=700');
  }
  
  return (<>
    <div className="App" style={{margin:'20px'}}>
      <Navi />
      <h2>Firebase - Realtime Database Chatting</h2>
      방명 : <input type="text" name="roomId" value="room1" ref={refRoom} /> <br />
      대화명 : <input type="text" name="userId" ref={refId} /> <br />
      <button type="button" onClick={openChatWin}>채팅시작</button>
    </div>
  </>);
};

export default ChatStart;

