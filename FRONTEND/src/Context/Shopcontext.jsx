import React, { createContext, useEffect, useState } from "react";
// import all_product from "../assets/all_product"

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = ({ children }) => {
    const [all_product, setAll_product] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch("http://localhost:8080/allproducts")
            .then((res) => res.json())
            .then((data) => {
                setAll_product(data);
                console.log(data);
            });

            if(localStorage.getItem("auth-token")){
                fetch("http://localhost:8080/getcartdata", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "auth-token": `${localStorage.getItem("auth-token")}`,
                    },
                    body: JSON.stringify({}), // if server expects data, replace {} with your data
                })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    if (typeof setCartItems === 'function') {
                        setCartItems(data);
                    } else {
                        console.error('setCartItems is not a function');
                    }
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
            }
    }, []);

    const addtocart = (itemId) => {
        setCartItems((prevState) => ({ ...prevState, [itemId]: prevState[itemId] + 1 }));
        if (localStorage.getItem("auth-token")) {
            fetch("http://localhost:8080/addtocart", {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                },
                body: JSON.stringify({
                    itemId: itemId,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                })
        }
    };

    const removefromcart = (itemId) => {
        setCartItems((prevState) => ({ ...prevState, [itemId]: prevState[itemId] - 1 }));
        if(localStorage.getItem("auth-token")){
            fetch("http://localhost:8080/removefromcart", {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                },
                body: JSON.stringify({
                    itemId: itemId,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                })
            }
        };

    const gettotalcartamount = () => {
        let totalamount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalamount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalamount;
    };

    const gettotalcartitems = () => {
        let totalitems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalitems += cartItems[item];
            }
        }
        return totalitems;
    };

    const contextValue = { all_product, cartItems, addtocart, removefromcart, gettotalcartamount, gettotalcartitems };
    return (
        <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
    );
};

export default ShopContextProvider;
