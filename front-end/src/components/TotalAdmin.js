import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../axios";

import "./TotalAdmin.css";
function TotalAdmin() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const products = useSelector((state) => state.products);

  //   get all orders
  useEffect(() => {
    axios
      .get("/orders")
      .then(({ data }) => {
        setOrders(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //  get all users
  useEffect(() => {
    axios
      .get("/users")
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //   count
  let totalBookOrdered = 0;
  let totalOrderedInday = 0;
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Add 1 to the month, since January is 0
  const year = currentDate.getFullYear();
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
  console.log(formattedDate);
  function countInformation() {
    orders.map((order) => {
      const dateArr = order.date.slice(0, 10).split("/");
      const date = `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
      if (date === formattedDate) {
        totalOrderedInday += 1;
      }
      totalBookOrdered += Object.keys(order.products).length;
      return null;
    });
  }

  countInformation();
  console.log(orders[0]);

  return (
  <div className="total-wrapper">
    <div className="container total-container">
        <div className="row row-total">
          <div className="col-3 col-total">
            <div className="ms-3 card-total-wrapper">
              <div className="info-total">
                <p className="fs-14 ">Tổng số sách:</p>
                <p className="fs-16 ">
                  <strong>{products.length}</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="col-3 col-total">
            <div className="card-total-wrapper">
              <div className="info-total">
                <p className="fs-14 ">Số lượt mượn sách:</p>
                <p className="fs-16 ">
                  <strong>{orders.length}</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="col-3 col-total">
            <div className="card-total-wrapper">
              <div className="info-total">
                <p className="fs-14 ">Số sách đã được mượn:</p>
                <p className="fs-16 ">
                  <strong>{totalBookOrdered}</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="col-3 col-total">
            <div className="card-total-wrapper">
              <div className="info-total">
                <p className="fs-14 ">Số người dùng:</p>
                <p className="fs-16 ">
                  <strong>{users.length}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  );
}

export default TotalAdmin;
