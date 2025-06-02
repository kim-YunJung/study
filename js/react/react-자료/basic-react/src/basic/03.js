import React, {useState} from 'react';

const Basic03 = () => {
   
    return (
        <div>
            <div className='black-nav'>
                <h2>Title</h2>
            </div>

            <div className='list'>
                <h3>제목1</h3>
                <h3>제목2</h3>
                <h3>제목3</h3>
            </div>

            <Modal/>
        </div>
    );
};

/* 컴퍼넌트 */
function Modal(){
    return(
        <div className='modal'>
            <h2>제목</h2>
            <p>내용</p>
        </div>
    );
}

export default Basic03;
