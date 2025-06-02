import React from "react";
import Counter from '../components/Counter';

export default function Player(props) {
  let row = props.playerData;

  return (<>
    <div className="player">
    <span className="player-name">        
      <button className="remove-player" onClick={() => { 
        if(window.confirm('삭제할까요?')){
          props.onDeletePlayer(row.idx);
        }
      }}> x </button>
      {row.name}
    </span>
      <Counter idx={row.idx} score={row.score} 
      onChangeScore={props.onChangeScore} />
    </div>
  </>);
}