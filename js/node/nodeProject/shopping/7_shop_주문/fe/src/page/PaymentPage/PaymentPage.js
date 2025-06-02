import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import OrderReceipt from "./component/OrderReceipt";
import PaymentForm from "./component/PaymentForm";
import "./style/paymentPage.style.css";
import { cc_expires_format } from "../../utils/number";
import { createOrder } from "../../features/order/orderSlice";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const { orderNum } = useSelector((state) => state.order);
  const [cardValue, setCardValue] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const navigate = useNavigate();
  const [firstLoading, setFirstLoading] = useState(true);
  const [shipInfo, setShipInfo] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    address: "",
    city: "",
    zip: "",
  });

  /*
  useSelector - 스토어의 상태값을 반환해주는 역할

  useSelector를 사용한 함수에서 리덕스 스토어의 상태값이 바뀐 경우
  (버튼 클릭 등의 이벤트를 통해 액션이 실행되어 상태값이 변경된 경우) 
  바뀐 스토어의 상태값을 다시 가져와 컴포넌트를 렌더링
  */
  const {cartList, totalPrice} = useSelector((state) => state.cart);

  useEffect(() => {
    if(firstLoading){
      setFirstLoading(false);
    }else{
      // 오더번호를 받으면 어디로 갈까?
      if(orderNum !== ""){
        navigate("/payment/success");
      }
    }
  }, [orderNum]);
  /* useEffect - 한번은 무조건 실행 된다, 첫 주문 후 orderNum이 있을 경우 두번째 주문시
  바로 결제 완료 화면으로 이동하게 되어 firstLoading을 사용해서 결제 하지 않고 완료 화면으로
  이동하는 것을 막는다. */

  const handleSubmit = (event) => {
    event.preventDefault();
    // 오더 생성하기
    const {firstName, lastName, contact, address, city, zip} = shipInfo;

    dispatch(createOrder({
      totalPrice
      , shipTo : {address, city, zip}
      , contact : {firstName, lastName, contact}
      , orderList : cartList.map((item) => {
        return {
          productId : item.productId._id
          , qty : item.qty
          , size : item.size
          , price : item.productId.price
        }
      })//orderList
    }));
  };

  const handleFormChange = (event) => {
    //shipInfo에 값 넣어주기
    const {name, value} = event.target;

    setShipInfo({...shipInfo, [name]:value});
  };

  const handlePaymentInfoChange = (event) => {
    //카드정보 넣어주기
    const {name, value} = event.target;
    
    if(name === 'expiry'){
      let newValue = cc_expires_format(value);
      setCardValue({...cardValue, [name]:newValue});

      return;
    }

    setCardValue({...cardValue, [name]:value});
  };

  const handleInputFocus = (e) => {
    setCardValue({ ...cardValue, focus: e.target.name });
  };

  if (cartList?.length === 0) {
    navigate("/cart");
  }// 주문할 아이템이 없다면 주문하기로 안넘어가게 막음

  return (
    <Container>
      <Row>
        <Col lg={7}>
          <div>
            <h2 className="mb-2">배송 주소</h2>
            <div>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="lastName">
                    <Form.Label>성</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleFormChange}
                      required
                      name="lastName"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="firstName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleFormChange}
                      required
                      name="firstName"
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>연락처</Form.Label>
                  <Form.Control
                    placeholder="010-xxx-xxxxx"
                    onChange={handleFormChange}
                    required
                    name="contact"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>주소</Form.Label>
                  <Form.Control
                    placeholder="Apartment, studio, or floor"
                    onChange={handleFormChange}
                    required
                    name="address"
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      onChange={handleFormChange}
                      required
                      name="city"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      onChange={handleFormChange}
                      required
                      name="zip"
                    />
                  </Form.Group>
                </Row>
                <div className="mobile-receipt-area">
                  <OrderReceipt cartList = {cartList} totalPrice = {totalPrice} /> 
                </div>
                <div>
                  <h2 className="payment-title">결제 정보</h2>
                  <PaymentForm cardValue = {cardValue} 
                    handleInputFocus = {handleInputFocus}
                    handlePaymentInfoChange = {handlePaymentInfoChange} />
                </div>

                <Button
                  variant="dark"
                  className="payment-button pay-button"
                  type="submit"
                >
                  결제하기
                </Button>
              </Form>
            </div>
          </div>
        </Col>
        <Col lg={5} className="receipt-area">
          <OrderReceipt cartList = {cartList} totalPrice = {totalPrice} /> 
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
