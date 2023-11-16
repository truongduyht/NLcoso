import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useSignupMutation } from "../services/appApi";
import Footer from "../components/Footer";

function Signup() {
  const [email, setEmail] = useState("");
  const [studentID, setStudentID] = useState("");

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [wrongRePassword, setWrongRePassword] = useState(false);
  const [signup, { error, isError }] = useSignupMutation();

  function handleSignup(e) {
    e.preventDefault();
    if (password !== rePassword) {
      setWrongRePassword(true);
      return false;
    }
    setWrongRePassword(false);
    signup({ name, email, password, studentID });
  }

  return (
    <div>
      <div className="login-container" id="login-container">
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={6} className="signup__form--container">
              <div className="card-signup">
                <div className="card-signup-inner">
                  <Form
                    style={{ width: "100%" }}
                    onSubmit={handleSignup}
                    className="form-wrapper"
                  >
                    <h4 className="fs-22 pt-4">Đăng ký tài khoản</h4>

                    {isError && (
                      <Alert variant="danger" className="fs-16">
                        {error.data}
                      </Alert>
                    )}

                    {wrongRePassword && (
                      <Alert variant="danger" className="fs-16">
                        Mật khẩu không khớp
                      </Alert>
                    )}

                    <Form.Group>
                      <Form.Label className="d-flex fs-16">
                        Họ và tên:{" "}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Họ và tên"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex fs-16 my-3">
                        Mã số sinh viên:{" "}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Mã số sinh viên"
                        value={studentID}
                        required
                        onChange={(e) => setStudentID(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="my-3">
                      <Form.Label className="d-flex fs-16">
                        Địa chỉ email:{" "}
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="my-3">
                      <Form.Label className="d-flex fs-16">
                        Nhập mật khẩu
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="my-3">
                      <Form.Label className="d-flex fs-16">
                        Nhập lại mật khẩu
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        value={rePassword}
                        required
                        onChange={(e) => setRePassword(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mt-4">
                      <button type="submit" className="fs-16 btn-signup">
                        Đăng ký
                      </button>
                    </Form.Group>
                    <p className="mt-3 text-center fs-14">
                      Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>{" "}
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

export default Signup;
