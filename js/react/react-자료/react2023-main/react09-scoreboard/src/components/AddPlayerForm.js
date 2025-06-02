import React from "react";

export default function AddPlayerForm(props) {
  return (<>
    <form className="form" noValidate
      onSubmit={(e)=>{
        e.preventDefault();
        let playerName = e.target.player.value;
        props.onAddPlayer(playerName);
        e.target.player.value = '';
      }} 
    >
      <input type="text" name="player" minLength="10" className="input" 
        placeholder="이름을 추가하세요" required onChange={()=>{}} />
      <input type="submit" className="input" value="Add Player" />
    </form>
  </>);
}