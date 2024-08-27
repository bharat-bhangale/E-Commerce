import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "Women",
    old_price: "",
    new_price: "",
  });

  const ImageHandler = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const HandlerChange = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:8080/addproduct", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          data.success
            ? alert("Product Added Successfully")
            : alert("Product Not Added Successfully");
        });
    }
  };

  return (
    <>
      <div className="addproduct">
        <div className="addproduct-itemfield">
          <p>Product Title</p>
          <input
            value={productDetails.name}
            onChange={HandlerChange}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input
              value={productDetails.old_price}
              onChange={HandlerChange}
              type="text"
              name="old_price"
              placeholder="Type here"
            />
          </div>
          <div className="addproduct-itemfield">
            <p>offer Price</p>
            <input
              value={productDetails.new_price}
              onChange={HandlerChange}
              type="text"
              name="new_price"
              placeholder="Type here"
            />
          </div>
        </div>
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select
            value={productDetails.category}
            onChange={HandlerChange}
            name="category"
            className="add-product-selector"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              className="addproduct-thumnail-img"
            />
          </label>
          <input
            onChange={ImageHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </div>
        <button
          onClick={() => {
            Add_Product();
          }}
          className="addproduct-btn"
        >
          ADD
        </button>
      </div>
    </>
  );
};

export default AddProduct;
