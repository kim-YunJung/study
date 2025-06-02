import React from "react";

export default function Counter(props) {
  return (<>
    <div className="counter">
    <button className="counter-action decrement"
        onClick={(e) => {
          // console.log('-버튼', props.id);
          props.onChangeScore('-', props.idx);
        }}> -</button>
      <span className="counter-score">{props.score}</span>
      <button className="counter-action increment"
        onClick={(e) => {
          // console.log('+버튼', props.id);
          props.onChangeScore('+', props.idx);
        }}> +</button>
    </div>
  </>);
}