import React, {useState} from 'react';

const Basic02 = () => {
    //let [texts, setTexts] = useState(['1', '2', '3', '4', '5']);
    let [texts, setTexts] = useState(['91', '12', '23', '34', '15']);
    let [num, setNum] = useState(0);
    let [num2, setNum2] = useState(0);

    function onClick(){
        setNum(num+1);
    }

    function textChange(){
        let newArray = [...texts];
        newArray[2] = '12';
        setTexts(newArray);
    }

    function textSort(){
        let newArray = [...texts];
        newArray.sort();
        setTexts(newArray);
    }

    return (
        <div>
            <div className='black-nav'>
                <h2>Title</h2>
            </div>

            <div className='list'>
                <button onClick={textSort}>정렬</button>
                <h3>{texts[0]} <span onClick={onClick}>{num}👍</span></h3>
                <h3>{texts[1]} <span onClick={()=>{ setNum2(num2+1) }}>{num2}👍</span></h3>
                <h3 onClick={textChange}>{texts[2]}</h3>
                <h3>{texts[3]}</h3>
                <h3>{texts[4]}</h3>
            </div>
        </div>
    );
};

export default Basic02;
