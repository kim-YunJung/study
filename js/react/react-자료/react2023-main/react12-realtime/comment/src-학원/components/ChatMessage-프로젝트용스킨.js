import React from 'react';
// import { realtime } from '../realtimeConfig';
// import { getDatabase, ref, child, get, set } from "firebase/database";
// import { onValue, push, update, remove } from "firebase/database";
// import { useState, useEffect } from 'react';
import '../Chat.css';

function RealtimeChat() {
  return (<>
  <section style={{"background-color":"#eee"}}>
    <div className="container py-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center p-3"
              style={{'border-top':'4px solid #ffa900'}}>
              <h5 className="mb-0">Realtime 채팅</h5>
              <div className="d-flex flex-row align-items-center">
                <span className="badge bg-warning me-3">99</span>
                <i className="fas fa-minus me-3 text-muted fa-xs"></i>
                <i className="fas fa-comments me-3 text-muted fa-xs"></i>
                <i className="fas fa-times text-muted fa-xs"></i>
              </div>
            </div>
            <div className="card-body" data-mdb-perfect-scrollbar="true" style={{'position':'relative','height':'400px'}}>
              {/* <!-- 상대방UI --> */}
              <div className="d-flex justify-content-between">
                <p className="small mb-1">홍길동</p>
                <p className="small mb-1 text-muted">23 Jan 2:00 pm</p>
              </div>
              <div className="d-flex flex-row justify-content-start">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                  alt="avatar 1" style={{'width':'45px','height':'100%'}}/>
                <div>
                  <p className="small p-2 ms-3 mb-3 rounded-3" style={{'background-color':'#f5f6f7'}}>
                    안녕하세요??
                  </p>
                </div>
              </div>
              {/* <!-- 상대방UI --> */}
              
              {/* <!-- 나UI --> */}
              <div className="d-flex justify-content-between">
                <p className="small mb-1 text-muted">23 Jan 2:05 pm</p>
                <p className="small mb-1">낙자쌤</p>
              </div>
              <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                <div>
                  <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">네네. 방가룽요</p>
                </div>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                  alt="avatar 1" style={{'width':'45px','height':'100%'}}/>
              </div>
              {/* <!-- 나UI -->   */}
            </div>
            {/* <!-- 채팅 입력 및 버튼 --> */}
            <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
              <div className="input-group mb-0">
                <input type="text" className="form-control" placeholder="Type message"
                  aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button className="btn btn-warning" type="button" id="button-addon2" style={{'padding-top':'.55rem'}}>
                  전송
                </button>
              </div>
            </div>
          </div>  
        </div>
      </div>  
    </div>
  </section>
  </>);
}

export default RealtimeChat;