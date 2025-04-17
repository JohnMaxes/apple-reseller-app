import React, { useContext, useEffect } from 'react';
import { CartProvider } from './src/context/CartContext';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './src/navigation/BottomNavigation';
import 'react-native-gesture-handler';

import {configureReanimatedLogger,ReanimatedLogLevel} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
});

const App = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <CartProvider>
                    <MainContent/>
                </CartProvider>
            </AuthProvider>
        </NavigationContainer>
    );
};

const MainContent = () => {    
    const { setLoggedIn } = useContext(AuthContext);
    useEffect(() => {
        
        let token = AsyncStorage.getItem('token'), currentTime = Math.floor(Date.now() / 1000);
        if(token && token.iat && currentTime > token.iat) {
            
        }
    }, [])
    return (<BottomTabNavigation></BottomTabNavigation>);
};
export default App;