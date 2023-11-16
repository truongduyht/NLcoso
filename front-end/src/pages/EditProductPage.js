import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";
import Footer from "../components/Footer";
import ToastMessage from "../components/ToastMessage";

function EditProductPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [updateProduct, { isError, error, isSuccess }] =
    useUpdateProductMutation();

  useEffect(() => {
    axios
      .get("/products/" + id)
      .then(({ data }) => {
        const product = data.product;
        setName(product.name);
        setAuthor(product.author);
        setDescription(product.description);
        setQuantity(product.quantity);
        setCategory(product.category);
        setImages(product.pictures);
        setPublisher(product.publisher);
        setTotalPage(product.totalPage);
      })
      .catch((e) => console.log(e));
  }, [id]);

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !totalPage ||
      !publisher ||
      !author ||
      !quantity ||
      !category ||
      !images.length
    ) {
      return alert("Hãy nhập đầy đủ các trường");
    }
    updateProduct({
      id,
      name,
      description,
      totalPage,
      publisher,
      author,
      quantity,
      category,
      images,
    }).then(({ data }) => {
      if (data.length > 0) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  }

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "your-cloudname",
        uploadPreset: "your-preset",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <div className="editProductPage-wrapper">
      <Container>
        <Row>
          <Col md="3"></Col>
          <Col md={6} className="new-product__form--container">
            <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <h3 className="mt-4 fs-30">Sửa thông tin sách</h3>
              {isSuccess && (
                <ToastMessage
                  bg="info"
                  title="Chỉnh sửa sách thành công"
                  body={`Sách đã được chỉnh sửa ở thư viện`}
                  autohide={true}
                />
              )}
              {isError && <Alert variant="danger">{error.data}</Alert>}
              <Form.Group className="mb-3">
                <Form.Label className="float-start fs-16">Tên sách:</Form.Label>
                <Form.Control
                  className="fs-14"
                  type="text"
                  placeholder="Nhập tên sách"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="float-start fs-16">
                  Tên tác giả:
                </Form.Label>
                <Form.Control
                  className="fs-14"
                  as="textarea"
                  placeholder="Tên tác giả"
                  value={author}
                  required
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="float-start fs-16">
                  Mô tả về sách:
                </Form.Label>
                <Form.Control
                  className="fs-14"
                  as="textarea"
                  placeholder="Mô tả về sách"
                  style={{ height: "100px" }}
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="float-start fs-16">
                  Nhà xuất bản:
                </Form.Label>
                <Form.Control
                  className="fs-14"
                  as="textarea"
                  placeholder="Nhập tên nhà xuất bản"
                  value={publisher}
                  required
                  onChange={(e) => setPublisher(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="float-start fs-16">Số trang:</Form.Label>
                <Form.Control
                  className="fs-14"
                  as="textarea"
                  placeholder="Nhập số trang"
                  value={totalPage}
                  required
                  onChange={(e) => setTotalPage(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="float-start fs-16">
                  Số lượng còn lại:
                </Form.Label>
                <Form.Control
                  className="fs-14"
                  type="number"
                  placeholder="Số lượng"
                  value={quantity}
                  required
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                onChange={(e) => setCategory(e.target.value)}
              >
                <Form.Label className="float-start fs-16">
                  Sửa thể loại sách:
                </Form.Label>
                <Form.Select className="fs-14" value={category}>
                  <option disabled selected>
                    Chọn thể loại sách muốn sửa
                  </option>
                  <option value="văn học">Văn học</option>
                  <option value="lịch sử">Lịch sử</option>
                  <option value="kinh tế">Địa lý</option>
                  <option value="thiếu nhi">Thiếu nhi</option>
                  <option value="ngoại ngữ">Ngoại ngữ</option>
                  <option value="khác">Khác</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Button
                  type="button"
                  className="text-white fs-16"
                  onClick={showWidget}
                >
                  Thêm ảnh sách
                </Button>
                <div className="images-preview-container">
                  {images.map((image) => (
                    <div className="image-preview">
                      <img src={image.url} />
                      {imgToRemove !== image.public_id && (
                        <i
                          className="fa fa-times-circle"
                          onClick={() => handleRemoveImg(image)}
                        ></i>
                      )}
                    </div>
                  ))}
                </div>
              </Form.Group>

              <Form.Group>
                <Button
                  type="submit"
                  disabled={isSuccess}
                  className="mb-5 text-white fs-16"
                >
                  Chỉnh sửa sách
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col md="3"></Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default EditProductPage;
