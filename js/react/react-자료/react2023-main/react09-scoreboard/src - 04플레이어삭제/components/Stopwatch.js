import React from "react";

export default function Stopwatch(props) {
  return (<>
    <div className="stopwatch">
      <h1 className="h1">StopWatch</h1>
      <span className="stopwatch-time">{0}</span>
      <button onClick={()=>{ alert('시작/정지'); }}>{(false) ? 'Stop' : 'Start'}</button>
      <button onClick={()=>{ alert('초기화'); }}>Reset</button>
    </div>
  </>);
}