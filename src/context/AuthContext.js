import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { CartContext } from "./CartContext";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [id, setId] = useState('');
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        async function init() {
            let currentTime = Math.floor(Date.now() / 1000);
            let token = await AsyncStorage.getItem('token');
            if(token) {
                if(token.iat && !(currentTime > token.iat + 300)) {
                    // Từ chối token và yêu cầu đăng nhập lại
                }
                else {
                    // Revalidate/refresh token bằng API
                    // Thực hiện lại các hành động tại login
                    setToken(token);
                    setId(jwtDecode(token).sub)
                    setLoggedIn(true);
                }
            }
        }
        init()
    }, []);

    const refreshToken = async() => {};
    const login = async (email, password) => {
        if (!email || !password) return alert('Please fill out all fields.');
        else try {
            const response = await axios.post('https://fakestoreapi.com/auth/login', { username: email, password: password })
            console.log(response.data.token);
            setId(jwtDecode(response.data.token).sub)
            setLoggedIn(true);
        }
        catch (error) { console.log(error) }
    };
    const logOut = () => { 
        const { setCart } = useContext(CartContext);
        setCart([]);
        AsyncStorage.removeItem('cart');
        AsyncStorage.removeItem('token');
        setToken(''); 
        setId(''); 
        setUserInfo(null); 
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, token, setToken, id, login, logOut, userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };