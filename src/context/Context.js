import React, { createContext, useState } from "react";
import {jwtDecode} from 'jwt-decode';

const MyContext = createContext(); 

const ContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [id, setId] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const decodeForId = async () => {
        const object = jwtDecode(token);
        console.log(object);
        setId(object.sub);
    }
    const logOut = () => {
        setToken('');
        setId('');
        setCart([]);
        setCartTotal(0);
        setUserInfo(null);
        setLoggedIn(false);
    }
    return (
        <MyContext.Provider value={{ cart, setCart, loggedIn, 
            setLoggedIn, token, setToken, 
            cartTotal, setCartTotal, decodeForId, 
            id, logOut, userInfo, setUserInfo
         }}>
            {children}
        </MyContext.Provider>
    );
};
export { MyContext, ContextProvider };