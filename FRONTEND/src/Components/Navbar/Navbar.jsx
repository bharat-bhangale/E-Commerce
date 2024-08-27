import React, { useState, useContext, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/Shopcontext";
import nav_dropdown from "../../assets/nav_dropdown.png";
// import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { gettotalcartitems } = useContext(ShopContext)
    const menuRef = useRef();
    // const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle("nav-menu-active");
        e.target.classList.toggle("open");
    };

    return (
        <>
            <div className="navbar">
                <div className="nav-logo">
                    <img src={logo} alt="" />
                    <p>SHOPPER</p>
                </div>
                <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
                <ul ref={menuRef} className="nav-menu">
                    <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: "none" }} to="/">Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: "none" }} to="/mens">Men </Link>{menu === "men" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: "none" }} to="/womens">Women</Link> {menu === "women" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: "none" }} to="/kids">Kids</Link> {menu === "kid" ? <hr /> : <></>}</li>
                </ul>
                <div className="nav-login-cart">
                    {localStorage.getItem("auth-token") ?
                        <button onClick={() => { localStorage.removeItem("auth-token"); window.location.replace("/") }}>Logout</button>
                        : <Link to="/login"><button>Login</button></Link>}

                    {/* {
                        isAuthenticated && (
                            <div>
                                <img src={user.picture} alt={user.name} />
                                <h3>Hello {user.name}</h3>
                                <p>{user.email}</p>
                            </div>
                        )
                    } */}
                    {/* {isAuthenticated ? <Link> <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                        Log Out
                    </button></Link> : <Link> <button onClick={() => loginWithRedirect()}>Log In</button></Link>} */}

                    <Link to="/cart"><img src={cart_icon} alt="" /></Link>
                    <div className="nav-cart-count">{gettotalcartitems()}</div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
