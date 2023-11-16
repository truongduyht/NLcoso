import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Form, Row, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";
import "./CheckOutForm.css";
import ToastMessage from "../components/ToastMessage";

function TakeBookDirect() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [returnDate, setReturnDate] = useState("");
  const [takeBookDate, setTakeBookDate] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [wrongDate, setWrongDate] = useState(false);

  const currentDate = new Date();

  function handleRent() {
    console.log(returnDate, takeBookDate);
    createOrder({
      userId: user._id,
      cart: user.cart,
      returnDate: returnDate,
      takeBookDate: takeBookDate,
      ship: false,
    })
      .then(({ data }) => {
        console.log(data);
        navigate("/orders");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  function checkTakeBookDate(e) {
    var selectedDate = new Date(e.target.value);
    if (selectedDate <= currentDate) {
      setShowToast(true);
      setWrongDate(true);
    } else {
      setWrongDate(false);
      setTakeBookDate(e.target.value);
      setShowToast(false);
    }
  }

  function checkReturnDate(e) {
    var selectedDate = new Date(e.target.value);
    if (selectedDate <= currentDate) {
      setShowToast(true);
    } else {
      setReturnDate(e.target.value);
      setShowToast(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRent();
  };

  return (
    <Col className="cart-payment-container">
      <Form onSubmit={handleSubmit}>
        <Row>
          {alertMessage && <Alert>{alertMessage}</Alert>}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-16">Họ và tên - MSSV:</Form.Label>
              <Form.Control
                className="fs-14"
                type="text"
                placeholder="First Name"
                value={`${user.name} - ${user.studentID}`}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-16">Email:</Form.Label>
              <Form.Control
                className="fs-14"
                type="text"
                placeholder="Email"
                value={user.email}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-16">Ngày nhận:</Form.Label>
              <Form.Control
                className="fs-14"
                type="date"
                required
                onChange={(e) => checkTakeBookDate(e)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-16">Ngày trả:</Form.Label>
              <Form.Control
                className="fs-14"
                type="date"
                required
                onChange={(e) => checkReturnDate(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        {wrongDate ? (
          <Button
            className="mt-3 fs-14 text-white rounded-pill"
            disabled
            type="submit"
          >
            Mượn sách ngay
          </Button>
        ) : (
          <Button className="mt-3 fs-14 text-white rounded-pill" type="submit">
            Mượn sách ngay
          </Button>
        )}
      </Form>
      {/* Toast */}
      {showToast && (
        <ToastMessage
          bg="info"
          body={`Bạn không thể chọn ngày nhỏ hơn ngày hiện tại`}
          autohide={false}
        />
      )}
    </Col>
  );
}

export default TakeBookDirect;
