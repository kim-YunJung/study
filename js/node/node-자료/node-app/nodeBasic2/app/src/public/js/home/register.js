"use strict";

/* 프론트 js */
const id = document.querySelector('#id')//id선택자를 가져온다.
, name = document.querySelector('#name')
, pwd = document.querySelector('#pwd')
, confirmPwd = document.querySelector('#confirm-pwd')
, registerBtn = document.querySelector('#button');

registerBtn.addEventListener('click', register);

function register() {
    if (!id.value) return alert("아이디를 입력해주십시오.");
    if (!name.value) return alert("이름을 입력해주십시오.");
    if (!pwd.value) return alert("비밀번호를 입력해주십시오.");
    if (!confirmPwd.value) return alert("비밀번호 확인을 입력해주십시오.");

    if(pwd.value !== confirmPwd.value)return alert("비밀번호가 일치하지 않습니다.");

    const req = {
        id : id.value
        , name : name.value
        , pwd : pwd.value
    };

    //데이터를 서버로 전송한다.
    fetch('/register', {
        method : 'POST',//전송 방식
        headers : {"Content-Type" : 'application/json'},//전송할 데이터 타입을 명시
        body : JSON.stringify(req)//전송될 데이터
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success){
            location.href = '/login';
        }else{
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error('회원가입 중 에러 발생'));
    });
}