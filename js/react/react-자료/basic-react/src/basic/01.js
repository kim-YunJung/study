import React, {useState} from 'react';

const Basic01 = () => {
    let [texts, setTexts] = useState([{}]);

    let textData = ([
        {'title' : 'title1', 'content' : 'content1'}
        , {'title' : 'title2', 'content' : 'content2'}        
    ]);

    return (
        <div>
            <div className='black-nav'>
                <h2>Title</h2>
            </div>

            {textData.map((item, idx) => 
                <div className='list' key={idx}>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                </div>
            )}
        </div>
    );
};

export default Basic01;
