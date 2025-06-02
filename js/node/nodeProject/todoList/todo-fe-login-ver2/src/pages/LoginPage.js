import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

import { Link, Navigate, useNavigate } from "react-router-dom";

const LoginPage = ({user, setUser}) => {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/user/login', {email, password});

      if(response.status === 200){
        console.log('성공');

        setUser(response.data.user);
        //세션에 토큰 저장
        sessionStorage.setItem("token", response.data.token);

        //토큰 보내기
        api.defaults.headers["authorization"] = "Bearer "+response.data.token;

        setError("");

        navigate('/');
      }else{
        throw new Error(response.data.error);
      }
    } catch (error) {
      setError(error.message)
    }
  };

  if(user) 
    return <Navigate to="/" />
    
  return (
    <div className="display-center">
      {error && <div class="alert alert-danger" role="alert">!!! {error} !!!</div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event)=> setEmail(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event)=> setPassword(event.target.value)} />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
