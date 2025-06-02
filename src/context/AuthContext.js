import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        async function init() {
            let currentTime = Math.floor(Date.now() / 1000);
            let token = await AsyncStorage.getItem('token');
            if(token) {
                if(token.iat && !(currentTime > token.iat + 300)) logOut();
                else {
                    setToken(token);
                    setId(jwtDecode(token).sub)
                    setLoggedIn(true);
                    // Revalidate/refresh token bằng API
                }
            }
        }
        init()
    }, []);

    const login = async (email, password) => {
        if (!email || !password) return alert('Please fill out all fields.');
        else try {
            const response = await axios.post('https://fakestoreapi.com/auth/login', { username: email, password: password })
            setId(jwtDecode(response.data.token).sub)
            setLoggedIn(true);
        }
        catch (error) { console.log(error) }
    };
    
    const logOut = () => { 
        AsyncStorage.removeItem('cart');
        AsyncStorage.removeItem('wishlistItems')
        AsyncStorage.removeItem('checkoutItems');
        AsyncStorage.removeItem('token');
        setToken(null); 
        setId(null); 
        setUserInfo(null); 
        setLoggedIn(false);
    };

    const loginViaOAuth = () => {
        // login via OAuth logic
    }

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, token, setToken, id, login, logOut, userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };