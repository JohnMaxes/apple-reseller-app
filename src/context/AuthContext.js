import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [id, setId] = useState('');
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        let currentTime = Math.floor(Date.now() / 1000);
        let token = AsyncStorage.getItem('token');
        console.log(token);
        if(token) {
            console.log(token.iat + 'vs currently ' + currentTime);
            if(token.iat && !(currentTime > token.iat + 300)) {
                // refreshToken API để làm mới IAT của token
            }
        }
    }, []);

    const refreshToken = async() => {};

    const login = async (email, password) => {
        if (!email || !password) {
            Alert.alert('Please fill out all fields.');
            return;
        } else {
            try {
                const response = await axios.post(
                    'https://fakestoreapi.com/auth/login',
                    {
                        username: email,
                        password: password,
                    }
                )
                console.log(response.data);
                setToken(response.data.token);
                await decodeForId();
                setLoggedIn(true);
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    const decodeForId = async () => {
        if (token) {
            const object = jwtDecode(token);
            setId(object.sub);
        }
    };

    const logOut = () => {
        setToken('');
        setId('');
        setUserInfo(null);
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, token, setToken, id, decodeForId, logOut, userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };