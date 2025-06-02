import React from "react";
import Counter from '../components/Counter';

export default function Player(props) {
  let row = props.playerData;
  return (<>
    <div className="player">
      <span className="player-name">
        <button className="remove-player" onClick={() => { alert('선수삭제'); }}> x </button>
        {row.name}
      </span>
      <Counter />
    </div>
  </>);
}