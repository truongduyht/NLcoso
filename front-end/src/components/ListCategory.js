import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import categories from "../categories";
import "./ListCategory.css";
function ListCategory() {
  return (
    <Container>
      <Row>
        {categories.map((category) => (
          <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
            <Col md={4}>
              <div
                style={{
                  gap: "10px",
                  color: `black`,
                  backgroundColor: `#6e7de4`
                }}
                className="category-tile background"
              >
                {category.name}
              </div>
            </Col>
          </LinkContainer>
        ))}
      </Row>
    </Container>
  );
}

export default ListCategory;
