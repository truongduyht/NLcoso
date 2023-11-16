import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ProductPreview from "../components/ProductPreview";
import { useSelector } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./ListBook.css";
import ListCategory from "../components/ListCategory";
import Pagination from "../components/Pagination";
import { UilSearch } from "@iconscout/react-unicons";
import Footer from "../components/Footer";

function ListBook() {
  const [key, setKey] = useState("all book");
  const [searchTerm, setSearchTerm] = useState("");

  const products = useSelector((state) => state.products);

  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  localStorage.removeItem("toastShowed");

  function rowPage({ _id, category, name, pictures, author }) {
    return (
      <ProductPreview
        _id={_id}
        category={category}
        name={name}
        pictures={pictures}
        author={author}
      />
    );
  }

  return (
    <div>
      <div className="listbook-wrapper mt-3">
        <Container className="mt-4 container-listbook">
          <div className=" d-flex justify-content-center pt-4 pb-4 ">
            <div className="search-box">
              <input
                type="search"
                placeholder="Nhập tên sách"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar p-3 fs-16"
              />
              <UilSearch className="search-btn pe-2"></UilSearch>
            </div>
          </div>
          <div className="filters-container">
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="all book" title="Tất cả sách" className="mb-2 fs-16">
                <div className="book-rendered-wrapper">
                  {productsSearch.length > 0 ? (
                    searchTerm.length > 0 ? (
                      <div className="d-flex justify-content-center align-items-center">
                        {productsSearch.map((product) => (
                          <ProductPreview {...product} />
                        ))}{" "}
                      </div>
                    ) : (
                      <Pagination
                        data={productsSearch}
                        RenderComponent={rowPage}
                        pageLimit={1}
                        dataLimit={8}
                      ></Pagination>
                    )
                  ) : (
                    <h4>Không có sách {searchTerm}</h4>
                  )}
                </div>
              </Tab>
              <Tab eventKey="category" title="Danh mục sách">
                <ListCategory></ListCategory>
              </Tab>
            </Tabs>
          </div>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ListBook;
