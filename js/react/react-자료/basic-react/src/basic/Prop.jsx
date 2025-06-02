import { useState } from "react";

const Prop = (props) => {
   const [name, setName] = useState();

    /*
    아래와 같이 호출 할 경우, 페이지 로딩시 호출로 무한 반복 호출이 되어
    오류가 발생한다.
    
    setName(props.name);
    */

    return (
        <div>
            <p>{props.name}</p>
            <p>{props.age}</p>
        </div>
    );
};

export default Prop;
