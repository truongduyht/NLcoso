import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./Footer.css";
function Footer() {
  return (
    <Container fluid className="background-color-footer text-white py-3 footer-container">
      <Container>
        <Row>
          <Col className="info-col ">
            <p className="fs-14">
              <i class="fa-solid fa-phone me-1"></i> 0123-456-789
            </p>
            <p className="fs-14">
              <i class="fa-solid fa-location-dot me-1"></i>
              Q.Ninh Kiều - TP.Cần Thơ
            </p>
          </Col>
          <Col className="social-media-col">
            <p>
                <i class="fa-brands fa-facebook me-1"></i> Facebook
            </p>
            <p>
              <i class="fa-brands fa-twitter me-1"></i> Twitter
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Footer;
