import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  Container,
  Row,
  Col,
  Badge,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SimilarProduct from "../components/SimilarProduct";
import "./ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";
import Footer from "../components/Footer";
function ProductPage() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [productImg, setProductImg] = useState(null);
  const [similarProductA, setSimilarProductA] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  const handleDragStart = (e) => e.preventDefault();

  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      console.log("product", data)
      setProduct(data.product);
      setSimilar(data.similar);
    });
  }, [id]);

  
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };
  useEffect(()=> {
    if (product && similar) {
      const similarProducts = similar.map((product, idx) => (
        <div className="item" data-value={idx}>
          <SimilarProduct {...product} />
        </div>
      ));
      const images = product.pictures.map((picture) => (
      <img alt="img"
        className="product__carousel--image"
        src={picture.url}
        onDragStart={handleDragStart}
      />
    ));

    setProductImg(images)

    setSimilarProductA(similarProducts);
    }
    
  }, [product, similar]) 

  return (
    <div className="product-page-wrapper">
      
      <Container
        className="product-page-container"
        style={{ position: "relative" }}
      >
        <Row>
          <Col lg={5} className="col-carousel">
            {
              productImg && <AliceCarousel
              mouseTracking
              items={productImg}
              controlsStrategy="alternate"
            />
            }
          </Col>
          <Col></Col>
          <Col lg={6} className="pt-4">
            <h4 className="fs-30">{product && product.name}</h4>
            <p>
              <Badge bg="warning">{product &&  product.category}</Badge>
            </p>
            <p className="product__price fs-14">
              <strong className="fs-16">Tác giả: </strong> {product && product.author}
            </p>
            <p
              style={{ textAlign: "justify" }}
              className="py-2 fs-14 description-product"
            >
              <strong className="fs-16">Tóm tắt về sách: </strong>{" "}
              {product && product.description}
            </p>
            <p style={{ textAlign: "justify" }} className="py-2 fs-14">
              <strong className="fs-16">Số trang: </strong> {product && product.totalPage}
            </p>
            <p style={{ textAlign: "justify" }} className="py-2 fs-14">
              <strong className="fs-16">Nhà xuất bản: </strong>{" "}
              {product && product.publisher}
            </p>
            <p style={{ textAlign: "justify" }} className="py-2 fs-14">
              <strong className="fs-16">Số lượng sách còn lại: </strong>{" "}
              {product && product.quantity}
            </p>

            {user && !user.isAdmin && product && product.quantity > 0 ? (
              <ButtonGroup>
                <Button
                  variant="primary"
                  className="fs-16 text-white-custom "
                  size="md"
                  onClick={() =>
                    addToCart({
                      userId: user._id,
                      productId: id,
                      author: product.author,
                      image: product.pictures[0].url,
                    })
                  }
                >
                  Thêm vào giỏ sách
                </Button>
              </ButtonGroup>
            ) : product &&  product.quantity === "0" ? (
              <ButtonGroup>
                <ButtonGroup>
                  <Button
                    variant="danger"
                    className="fs-16 text-white-custom mx-3"
                    size="md"
                    disabled
                  >
                    Sách đã được mượn hết ở thư viện
                  </Button>
                </ButtonGroup>
              </ButtonGroup>
            ) : (
              ""
            )}

            {!user && (
              <LinkContainer to={`/login`}>
                <Badge className="fs-16 btn-productpage" size="md" bg="primary">
                  Đăng nhập ngay để mượn sách{" "}
                </Badge>
              </LinkContainer>
            )}

            {product && user && user.isAdmin && (
              <LinkContainer to={`/product/${product._id}/edit`}>
                <Button
                  variant="primary"
                  size="md"
                  className="fs-16 text-white"
                >
                  Sửa thông tin sách
                </Button>
              </LinkContainer>
            )}
            {isSuccess && (
              <ToastMessage
                bg="info"
                title="Đã thêm vào giỏ sách"
                body={`${product.name} đã được thêm vào giỏ sách của bạn`}
                autohide={true}
              />
            )}
          </Col>
        </Row>
        <div className="my-5">
          <h2 className="fs-22">Sách tương tự</h2>
          <div className="d-flex justify-content-center align-items-center flex-wrap fs-14">
            {
              similarProductA &&  <AliceCarousel
              mouseTracking
              items={similarProductA}
              responsive={responsive}
              controlsStrategy="alternate"
            />
            }
           
          </div>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default ProductPage;
