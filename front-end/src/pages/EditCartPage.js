import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import { UilTimesCircle } from "@iconscout/react-unicons";
import { useRemoveFromCartMutation } from "../services/appApi";
import "./CartPage.css";
import TableCheckOut from "../components/TableCheckOut";
import Footer from "../components/Footer";
import axios from "../axios";
import { useParams } from "react-router-dom";

function EditCartPage() {
  const { id } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);

  const [removeFromCart] = useRemoveFromCartMutation();
  localStorage.removeItem("toastShowed");

  let cart = [];

  if (orders.products) {
    const userCartObj = orders.products;

    // lọc các product chỉ có trong orders
    cart = products.filter((product) => userCartObj[product._id] != null);
  }

  useEffect(() => {
    setShowToast(false);
    async function getData() {
      await axios
        .get(`/users/${id}/edit-cart`)
        .then(({ data }) => {
          setOrders(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    getData();
  }, [id]);

  return (
    <div className="cartPage-wrapper">
      <Container
        fluid
        style={{ minHeight: "80vh" }}
        className="cart-container mt-3 px-5"
      >
        <Row>
          <Col className="table-container me-3">
            <h1 className="py-4 fs-22 ">Mã mượn sách: {id}</h1>
            {cart.length === 0 ? (
              <Badge bg="warning" className="fs-18">
                Thêm sách ngay!
              </Badge>
            ) : (
              <TableCheckOut order={orders}></TableCheckOut>
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
                          <img
                            alt=""
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
                            <span>1</span>
                          </span>
                        </td>
                        <td>{item.publisher}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            </Col>
          )}
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default EditCartPage;
