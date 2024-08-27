import React, { useContext } from "react";
import { ShopContext } from "../Context/Shopcontext";
import "./CSS/ShopCategories.css";
import dropdown_icon from "../assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategories = (props) => {
  const { all_product } = useContext(ShopContext);
  console.log(all_product);
  
  return (
    <div className="shop-categories">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.categrory === item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
          else {
           console.log("No data found")
          }
        })}
      </div>
      <div className="shopcategory-load-more">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategories;
