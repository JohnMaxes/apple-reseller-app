import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [checkedItems, setCheckedItems] = useState([]);

    useEffect(() => { 
        async function cartInit() {
            try {
                let cart_ = await AsyncStorage.getItem('cart');
                if(cart_) setCart(JSON.parse(cart_));
            }
            catch(err) { console.log(err) }
        };
        cartInit(); 
    }, [])

    useEffect(() => {
        async function saveCart() { AsyncStorage.setItem('cart', JSON.stringify(cart)) }; 
        saveCart() 
    }, [cart])

    const addToCart = ({id, title, price, image, color, option }) => {
        if (cart.some(element => element.id === id))
            setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item ))
        else {
            let newItem = { id, title, price, image, color, option, quantity: 1 };
            setCart(prevCart => [...prevCart, newItem]);
            setCartTotal(prevTotal => prevTotal + price);
            alert('Item added to cart successfully!');
        }
    };

    const editCart = ({id, operation, newColor}) => {
        if (operation == 'color') setCart((prev) => prev.map(item => item.id === id ? {...item, color: newColor } : item ));
        if (operation == 'x' || (operation == '-' && itemQuantity == 1)) setCart((prevCart) => ( prevCart.filter(item => item.id !== id)) );
        else setCart((prev) => prev.map(item => item.id === id ? { ...item, quantity: operation == '+' ? item.quantity + 1 : item.quantity - -1 } : item ));
    }

    return (
        <CartContext.Provider value={{ cart, cartTotal, checkedItems, setCheckedItems, addToCart, editCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };