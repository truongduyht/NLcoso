import React from "react";
import { Badge, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./ProductPreview.css";
function ProductPreview({ _id, category, name, pictures, author }) {
  return (
    <LinkContainer
      to={`/product/${_id}`}
      style={{ cursor: "pointer", width: "13rem", margin: "10px" }}
      className="m-4 item-book"
    >
      <Card>
        <div>
          <Card.Img
            src={pictures[0].url}
          />
        </div>

        <Card.Body>
          <Card.Title className="fs-16 text-long">{name}</Card.Title>
          <Card.Title className="fs-14">
            Tác giả :{author}
          </Card.Title>

          <Badge bg="warning">{category}</Badge>
        </Card.Body>
        <div className=" mb-3 view-more-product">
          <button type="button" class="btn-preview-product">
            Xem chi tiết
          </button>
        </div>
      </Card>
    </LinkContainer>
  );
}

export default ProductPreview;
