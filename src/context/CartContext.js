import React, { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    return (
        <CartContext.Provider value={{ cart, setCart, cartTotal, setCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };