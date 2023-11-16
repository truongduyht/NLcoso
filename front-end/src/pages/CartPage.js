import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Alert, Badge, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import { UilTimesCircle } from "@iconscout/react-unicons";
import { useRemoveFromCartMutation } from "../services/appApi";
import "./CartPage.css";
import TableCheckOut from "../components/TableCheckOut";
import Footer from "../components/Footer";

function CartPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
  const [removeFromCart] = useRemoveFromCartMutation();
  localStorage.removeItem("toastShowed");

  return (
    <div className="cartPage-wrapper">
      <Container
        fluid
        style={{ minHeight: "80vh" }}
        className="cart-container mt-3 px-5"
      >
        <Row>
          <Col className="table-container me-3">
            <h1 className="py-4 fs-22 ">Giỏ sách</h1>
            {cart.length === 0 ? (
              <Badge bg="warning" className="fs-18">
                Bạn chưa thêm sách vào giỏ!
              </Badge>
            ) : (
              <TableCheckOut></TableCheckOut>
            )}
          </Col>
          {cart.length > 0 && (
            <Col md={6} className="pt-4 cart-table ms-3">
              <>
                <Table responsive="sm" className="">
                  <thead>
                    <tr className="fs-16">
                      <th>Sách</th>
                      <th>Tác giả</th>
                      <th>Số lượng</th>
                      <th>Nhà xuất bản</th>
                    </tr>
                  </thead>
                  <tbody className="fs-14">
                    {cart.map((item) => (
                      <tr>
                        <td>
                          <img alt="img"
                            className="rounded"
                            src={item.pictures[0].url}
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>{item.author}</td>
                        <td>
                          <span className="quantity-indicator">
                            <span>{user.cart[item._id]}</span>
                          </span>
                        </td>
                        <td>{item.publisher}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div>
                  <h3 className="fs-18 py-3">{cart.length} sách</h3>
                </div>
              </>
            </Col>
          )}
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default CartPage;
