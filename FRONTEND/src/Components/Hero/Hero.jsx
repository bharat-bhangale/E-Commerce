import React from "react";
import "./Hero.css";
import hand_icon from "../../assets/hand_icon.png";
import arrow_icon from "../../assets/arrow.png";
import hero_image from "../../assets/hero_image(3).png";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-left">
          <div>
            <div className="hero-hand-icon">
              <p>FIND CLOTHES </p>
            </div>
            <p>THAT MATCHES</p>
            <p> YOUR STYLE</p>
            <h6 style={{color:"rgba(0, 0, 0, 0.60)", paddingTop:"20px"}}>Browse through our diverse range of meticulously crafted garments, designed ,<br/>
           to bring out your individuality and cater to your sense of style.</h6>
          </div>
          <div className="hero-latest-btn">
            <div>Shop Now</div>
            <img src={arrow_icon} alt="" />
          </div>
        </div>
        <div className="hero-right">
          <img src={hero_image} alt="" style={{ width: "400px", height: "450px", marginTop: "-50px" }} />
        </div>
      </div>
    </>
  );
};

export default Hero;
