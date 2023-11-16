import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import "./IntroHome.css";

function IntroHome() {
  const user = useSelector((state) => state.user);
  return (
    <div className="py-3 pt-5">
      <div className="px-4 py-1 my-5 text-center ">
        <h1 className="display-5 fw-bold title-home">
          LIBRARY
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 fs-22">
            Tri thức là sức mạnh của con người!
          </p>
        </div>
      </div>
    </div>
  );
}

export default IntroHome;
