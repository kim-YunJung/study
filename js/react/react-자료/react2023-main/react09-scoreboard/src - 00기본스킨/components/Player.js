import React from "react";
import Counter from '../components/Counter';

export default function Player(props) {  
  return (<>
    <div className="player">
      <span className="player-name">
        <button className="remove-player" onClick={() => { alert('선수삭제'); }}> x </button>
        플레이어이름
      </span>
      <Counter />
    </div>
  </>);
}