import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormdData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const login = async () => {
    console.log("Login", formData);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const responseData = await response.json();
      
      if (responseData.success) {
        // console.log("User added successfully!")
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        // Handle the case where signup is not successful
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Error during signup", error);
      // Handle the error appropriately
    }
  };

  const signup = async () => {
    console.log("Sign Up", formData);
    
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const responseData = await response.json();
      
      if (responseData.success) {
        // console.log("User added successfully!")
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        // Handle the case where signup is not successful
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Error during signup", error);
      // Handle the error appropriately
    }
  };
  

  const changeHandler = (e) => {
    setFormdData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              placeholder="Your Name"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the term of use & privacy policy </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
