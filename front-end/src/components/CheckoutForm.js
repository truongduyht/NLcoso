import React, { useState } from "react";
import { Alert, Button, Col, Form, Row, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";
import "./CheckOutForm.css";
import ToastMessage from "../components/ToastMessage";

function CheckoutForm() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [wrongDate, setWrongDate] = useState(false);
  const currentDate = new Date();
  function checkDate(e) {
    const selectedDate = new Date(e.target.value);
    if (selectedDate <= currentDate) {
      setShowToast(true);
      setWrongDate(true);
    } else {
      setWrongDate(false);
      setReturnDate(e.target.value);
      setShowToast(false);
    }
  }

  function handlePay(e) {
    e.preventDefault();
    createOrder({
      userId: user._id,
      cart: user.cart,
      address,
      phone,
      returnDate,
      ship: true,
    }).then(({ data }) => {
      console.log(data);
      navigate("/orders");
    });
  }

  return (
    <Col className="cart-payment-container">
      <Form onSubmit={handlePay}>
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
              <Form.Label className="fs-16">Email: </Form.Label>
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
              <Form.Label className="fs-16">Số điện thoại: </Form.Label>
              <Form.Control
                className="fs-14"
                type="text"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-16">Ngày trả sách:</Form.Label>
              <Form.Control
                className="fs-14"
                type="date"
                required
                // onChange={(e) => setReturnDate(e.target.value)}
                onChange={(e) => checkDate(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <Form.Label className="fs-16">Địa chỉ:</Form.Label>
            <Form.Control
              className="fs-14"
              type="text"
              placeholder="Nhập địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Badge size="md" bg="warning">
          Bạn sẽ phải trả thêm phí vận chuyển.
        </Badge>
        <Row></Row>
        {wrongDate ? (
          <Button
            className="mt-3 fs-14 text-white rounded-pill"
            disabled
            type="submit"
          >
            Mượn sách
          </Button>
        ) : (
          <Button className="mt-3 fs-14 text-white rounded-pill" type="submit">
            Mượn sách
          </Button>
        )}
      </Form>
      {/* Toast */}
      {showToast && (
        <ToastMessage
          bg="info"
          title="Chọn sai ngày"
          body={`Bạn không thể chọn ngày nhỏ hơn`}
          autohide={false}
        />
      )}
      {isSuccess && (
        <ToastMessage
          bg="info"
          title="Mượn thành công"
          body={`Bạn đã mượn sách thành công`}
          autohide={false}
        />
      )}
    </Col>
  );
}

export default CheckoutForm;
