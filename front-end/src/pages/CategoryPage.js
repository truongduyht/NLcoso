import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductPreview from "../components/ProductPreview";
import "./CategoryPage.css";
import Pagination from "../components/Pagination";
import { UilSearch } from "@iconscout/react-unicons";

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/products/category/${category}`);
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, [category]);


  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(productsSearch);

  function ProductSearch({ _id, category, name, pictures, author }) {
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
    <div className="category-page-container">
      <div
        className={`pt-3 ${category}-banner-container category-banner-container`}
      >
        <h4 className="text-center fs-30">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h4>
      </div>
      <div className="filters-container d-flex justify-content-center pt-4 pb-4">
        <div className="search-box search-box-category">
          <input
            type="search"
            placeholder="Nhập tên sách ở đây"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar p-3 fs-16"
          />
          <UilSearch className="search-btn pe-2"></UilSearch>
        </div>
      </div>
      {productsSearch.length > 0 ? (
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <Pagination
                data={productsSearch}
                RenderComponent={ProductSearch}
                pageLimit={1}
                dataLimit={5}
                tablePagination={false}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <h3 className="fs-22">Không tìm thấy</h3>
      )}
    </div>
  );
}

export default CategoryPage;
