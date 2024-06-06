import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ShopContextProvider from "./Context/Shopcontext";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById("root")).render(

    <Auth0Provider
      domain="dev-zsmy3nlgzjdg6w25.us.auth0.com"
      clientId="ZDizhceb5eUzaV5Exa83Z8y5jjjdSAu8"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    > <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </Auth0Provider>
);
