import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (133)</div>
        </div>
        <div className="descriptionbox-description">
          <p>
            Welcome to our online store! We offer a wide range of high-quality
            products, from electronics to clothing and home goods. Enjoy secure,
            hassle-free shopping from the comfort of your home. With fast
            shipping and easy returns, we strive to provide an excellent
            shopping experience. Start exploring our collection today!
          </p>
          <p>
            Our mission is to bring you the best products from around the world
            at affordable prices. We believe in the power of online shopping to
            connect customers with the products they love. Whether you're
            looking for the latest tech gadgets, stylish fashion accessories, or
            unique home decor items, we've got you covered. Shop with us and
            discover the difference today!
          </p>
        </div>
    </div>
  );
};

export default DescriptionBox;
