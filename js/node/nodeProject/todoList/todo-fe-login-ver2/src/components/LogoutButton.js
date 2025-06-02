import React, { useEffect } from 'react'
import { Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

 
const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = (event)=>{
    event.preventDefault();
    sessionStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <Row className="add-item-row">
        <Col xs={12} sm={2} >
          <button className="button-add" onClick={handleLogout} >
              로그아웃
          </button>
        </Col>
    </Row>
  )
}

export default LogoutButton