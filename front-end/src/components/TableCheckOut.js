import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CheckoutForm from "./CheckoutForm";
import TakeBookDirect from "./TakeBookDirect";
function TableCheckOut({ order }) {
  if (order) {
    if (order.ship) {
      return (
        <Tabs
          defaultActiveKey="home"
          id="fill-tab-example"
          className="mb-3 fs-16"
          fill
        >
          <Tab eventKey="home" title="Vận chuyển sách">
            <CheckoutForm></CheckoutForm>
          </Tab>
        </Tabs>
      );
    }
    return (
      <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mb-3 fs-16"
        fill
      >
        <Tab eventKey="profile" title="Nhận trực tiếp">
          <TakeBookDirect></TakeBookDirect>
        </Tab>
      </Tabs>
    );
  }
  return (
    <Tabs
      defaultActiveKey={`${order?.ship ? "home" : "profile"}`}
      id="fill-tab-example"
      className="mb-3 fs-16"
      fill
    >
      <Tab eventKey="home" title="Vận chuyển sách">
        <CheckoutForm></CheckoutForm>
      </Tab>
      <Tab eventKey="profile" title="Nhận trực tiếp">
        <TakeBookDirect></TakeBookDirect>
      </Tab>
    </Tabs>
  );
}

export default TableCheckOut;
