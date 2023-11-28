import React from "react";
import "./InformationBox.css";

function InformationBox({ name, email, studentID, orders }) {
  if (orders.length == 0) {
    return <h1>Bạn chưa mượn</h1>;
  }

  let count = 0;
  const countProduct = () => {
    orders.map((order) => {
      count += Object.keys(order.products).length;
    });
  };
  countProduct();

  return (
    <div>
      <div className="card card-info">
        <div className="card-body text-center">
          <h5 className="my-3">{name}</h5>
          <p className="mb-1">
            MSSV: {studentID}
          </p>
          <p className="mb-4">
            <i class="fa-regular fa-envelope"></i> {email}
          </p>
          <div className="d-flex justify-content-center align-items-center mb-2">
            <span className="badge text-center py-2 me-1">
              Đã mượn {count} sách
            </span>
            <span className="badge text-center py-2 ms-1">
              Đã mượn {orders.length} lần
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationBox;
