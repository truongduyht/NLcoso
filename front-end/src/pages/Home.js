import axios from "../axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import IntroHome from "../components/IntroHome";
import Footer from "../components/Footer";
import ToastMessage from "../components/ToastMessage";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const showToast = localStorage.getItem("toastShowed");
  console.log(typeof showToast);

  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <>
      <div className="home-wrapper">
        <IntroHome></IntroHome>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;
