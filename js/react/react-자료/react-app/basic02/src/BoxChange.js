function BoxChange(props) {  
  return (
    <div className="BoxChange">
        {props.name} / box {props.num}
    </div>
  );
}

//외부로 컴포넌트를 보낼 수 있다.
export default BoxChange;
