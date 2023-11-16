import axios from "../axios";
import React, { useRef, useState } from "react";
import ToastMessage from "./ToastMessage";
import Login from "../pages/Login";
import {
  Navbar,
  Button,
  Nav,
  NavDropdown,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../features/userSlice";
import { UilBookOpen } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(logout());
    localStorage.setItem("logout", true);
    navigate("/login");
  }

  return (
    <>
      <Navbar
        className="background-color-nav navbar navbar-wrapper"
      >

        <Container style={{ display: "block" }}>
          <Row>
            <Col
              md={3}
              className="d-flex justify-content-center align-items-center "
            >
              <LinkContainer to="/">
                <Navbar.Brand className="fs-14 text-white-custom">
                  <Button className="login-btn rounded-pill">
                    Trang chủ
                  </Button>
                </Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/all-book" className="btn-hover">
                <Nav.Link className="fs-14 text-white-custom">
                  <Button className="login-btn rounded-pill">
                    Thư viện
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Col>
            <Col md={6} className=""></Col>
            <Col
              md={3}
              className="d-flex justify-content-center align-items-center "
            >
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto d-flex justify-content-center align-items-center">
                  {!user && (
                    <>
                      <LinkContainer to="/login">
                        <Button
                          size="sm"
                          className="login-btn rounded-pill me-2 fs-14 text-white-custom"
                        >
                          Đăng nhập
                        </Button>
                      </LinkContainer>
                      <LinkContainer to="/signup">
                        <Button
                          size="sm"
                          className="login-btn rounded-pill fs-14 text-white-custom"
                        >
                          Đăng ký
                        </Button>
                      </LinkContainer>
                    </>
                  )}
                  {user && !user.isAdmin && (
                    <LinkContainer to="/cart">
                      <Nav.Link>
                        {user?.cart.count > 0 && (
                          <span className="badge badge-warning" id="cartcount">
                            {user.cart.count}
                          </span>
                        )}
                      </Nav.Link>
                    </LinkContainer>
                  )}

                  {/* if user */}
                  {user && (
                    <>
                      <NavDropdown
                        title={`${user.name}`}
                        id="basic-nav-dropdown"
                        class="fs-14 text-white"
                      >
                        {user.isAdmin && (
                          <>
                            <LinkContainer to="/admin">
                              <NavDropdown.Item className="fs-14">
                                Thống kê
                              </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/new-product">
                              <NavDropdown.Item className="fs-14">
                                Thêm sách mới
                              </NavDropdown.Item>
                            </LinkContainer>
                          </>
                        )}
                        {!user.isAdmin && (
                          <>
                            <LinkContainer to="/cart">
                              <NavDropdown.Item className="fs-14">
                                Giỏ Sách
                              </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/orders">
                              <NavDropdown.Item className="fs-14">
                                Danh sách mượn
                              </NavDropdown.Item>
                            </LinkContainer>
                          </>
                        )}

                        <NavDropdown.Divider />
                        <Button
                          size="sm"
                          onClick={handleLogout}
                          className="logout-btn fs-14"
                        >
                          Đăng xuất
                        </Button>
                      </NavDropdown>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
