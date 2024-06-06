import React, { useState, useEffect } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png"

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:8080/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  const remove_product = async (id) => {
    await fetch("http://localhost:8080/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
    fetchInfo();
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="list-product">
      <h1>All List Product</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return <>
          <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p className="p1">{product.name}</p>
            <p className="p2">${product.old_price}</p>
            <p className="p2">${product.new_price}</p>
            <p className="p2">{product.category}</p>
            <img src={cross_icon} alt="" className="listproduct-remove-icon" onClick={()=>{remove_product(product.id)}} />
          </div>
          <hr />
          </>
        })}
      </div>

    </div>
  );
};

export default ListProduct;
