import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [checkedItems, setCheckedItems] = useState([]);

    useEffect(() => { async function cartInit() {
        try {
            let cart_ = await AsyncStorage.getItem('cart');
            if(cart_) setCart(JSON.parse(cart_));
            console.log('Initiated cart.');
        }
        catch(err) { console.log(err) }
    };
    cartInit(); }, [])

    useEffect(() => { async function saveCart() { AsyncStorage.setItem('cart', JSON.stringify(cart))}; saveCart() }, [cart])

    // Thêm hàm addToCart
    const addToCart = (product) => {
        setCart(prevCart => {
            const found = prevCart.find(item => item.id === product.id);
            if (found) {
                // Nếu đã có thì tăng số lượng
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // Nếu chưa có thì thêm mới
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    return (
        <CartContext.Provider value={{ cart, setCart, cartTotal, setCartTotal, checkedItems, setCheckedItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };