import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid'
import Toast from "react-native-toast-message";

const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [checkedItems, setCheckedItems] = useState([]);

    useEffect(() => { 
        async function cartInit() {
            try {
                await AsyncStorage.removeItem('cart');
                let cart_ = await AsyncStorage.getItem('cart');
                if(cart_) setCart(JSON.parse(cart_));
                else {
                    // init fetch
                }
            }
            catch(err) { console.log(err) }
        };
        cartInit(); 
    }, [])

    useEffect(() => {
        async function saveCart() { 
            AsyncStorage.setItem('cart', JSON.stringify(cart)) 
            // reassignCart API here, doesn't need await
        }; 
        saveCart()
    }, [cart])

    const addToCart = ({sku, title, price, image, color, storage }) => {
        let newAdd = false;
        // Sử dụng sku + color + storage để định danh duy nhất sản phẩm trong giỏ
        if (cart.some(element => element.sku === sku && element.color === color && element.storage === storage)) {
            setCart(prev => prev.map(item =>
                item.sku === sku && item.color === color && item.storage === storage
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            let newItem = { sku, title, price, image, color, storage, quantity: 1 };
            setCart(prevCart => [...prevCart, newItem]);
            setCartTotal(prevTotal => prevTotal + price);
            newAdd = true;
        }
        Toast.show({
            type: 'success',
            text1: newAdd ? 'Thêm sản phẩm vào giỏ hàng thành công.' : 'Đã tăng số lượng sản phẩm lên 1 đơn vị.',
            text2: 'Hãy qua trang giỏ hàng để chỉnh sửa thêm!',
            text1Style: {fontFamily: 'Inter', fontSize: 14, fontWeight: 500},
            text2Style: {fontFamily: 'Inter', fontSize: 12,},
            autoHide: true, avoidKeyboard: true, topOffset: 20,  
        })
    };

    const editCart = ({id, operation, newColor}) => {
        if (operation == 'color') setCart((prev) => prev.map(item => item.id === id ? {...item, color: newColor } : item ));
        if (operation == 'x' || (operation == '-' && itemQuantity == 1)) setCart((prevCart) => ( prevCart.filter(item => item.id !== id)) );
        else setCart((prev) => prev.map(item => item.id === id ? { ...item, quantity: operation == '+' ? item.quantity + 1 : item.quantity - -1 } : item ));
    }

    const clearCart = () => {
        
    }

    return (
        <CartContext.Provider value={{ cart, setCart, cartTotal, checkedItems, setCheckedItems, addToCart, editCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };