import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";

import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import Footer from "../components/Footer";
import ToastMessage from "../components/ToastMessage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [login, { isError, error }] = useLoginMutation();
  const navigate = useNavigate();
  function handleLogin(e) {
    setValidated(true);
    e.preventDefault();
    login({ email, password });
    localStorage.setItem("toastShowed", true);
  }

  return (
    <div>
      <div className="d-flex justify-content-center login-container" id="login-container">
        <Container className="">
          <Row>
            <Col md={3}></Col>
            <Col md={6} className="login__form--container">
              <div className="card-login">
                <div className="card-signup-inner">
                  <Form
                    style={{ width: "100%" }}
                    className="form-wrapper"
                    noValidate
                    validated={validated}
                    onSubmit={handleLogin}
                  >
                    <h3 className="fs-22">Đăng nhập</h3>
                    {isError && <Alert variant="danger">{error.data}</Alert>}
                    <Form.Group className="my-3" controlId="validationCustom01">
                      <Form.Label className="d-flex fs-16">Email:</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Nhập email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Email không đúng
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="my-3" controlId="validationCustom02">
                      <Form.Label className="d-flex fs-16">
                        Mật khẩu:{" "}
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Mật khẩu không đúng
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                      <button type="submit" className="fs-16 btn-signup">
                        Đăng nhập
                      </button>
                    </Form.Group>
                    <p className="pt-2">
                      Bạn không có tài khoản?{" "}
                      <Link to="/signup">Đăng ký ngay!</Link>
                    </p>
                  </Form>
                </div>
              </div>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;
