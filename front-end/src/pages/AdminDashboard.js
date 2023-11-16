import React from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import ClientsAdminPage from "../components/ClientsAdminPage";
import DashboardProducts from "../components/DashboardProducts";
import Footer from "../components/Footer";
import OrdersAdminPage from "../components/OrdersAdminPage";
import TotalAdmin from "../components/TotalAdmin";
import "./AdminDashboard.css";
function AdminDashboard() {
  localStorage.removeItem("toastShowed");

  return (
    <div>
      <div className="adminDashboard-wrapper">
        <Container fluid className="mt-5 px-4">
          <Tab.Container defaultActiveKey="total">
            <Row>
              <Col sm={2} className="">
                <Nav
                  variant="pills"
                  className="flex-column fs-16 col-action-dashboard"
                >
                  <Nav.Item style={{ cursor: "pointer" }}>
                    <Nav.Link eventKey="total">Thống kê</Nav.Link>
                  </Nav.Item>
                  <Nav.Item style={{ cursor: "pointer" }}>
                    <Nav.Link eventKey="products">Tất cả sách</Nav.Link>
                  </Nav.Item>
                  <Nav.Item style={{ cursor: "pointer" }}>
                    <Nav.Link eventKey="orders">Danh sách mượn sách</Nav.Link>
                  </Nav.Item>
                  <Nav.Item style={{ cursor: "pointer" }}>
                    <Nav.Link eventKey="clients">Tất cả tài khoản</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10} className="col-content-dashboard">
                <Tab.Content>
                  <Tab.Pane eventKey="total">
                    <TotalAdmin />
                  </Tab.Pane>
                  <Tab.Pane eventKey="products">
                    <DashboardProducts />
                  </Tab.Pane>
                  <Tab.Pane eventKey="orders">
                    <OrdersAdminPage />
                  </Tab.Pane>
                  <Tab.Pane eventKey="clients">
                    <ClientsAdminPage />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default AdminDashboard;
