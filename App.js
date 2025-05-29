import React from 'react';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import { BookmarkProvider } from './src/context/BookmarkContext.js';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './src/navigation/BottomNavigation';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import Authentication from './src/navigation/Authentication';
import WishListScreen from './src/pages/Vi/WishListScreen';
import UserEditScreen from './src/pages/Vi/UserEditScreen';
import UserViewScreen from './src/pages/Vi/UserViewScreen';
import CartScreen from './src/pages/CartScreen.js';
// Thêm các màn hình khác nếu muốn

const MainStack = createStackNavigator();

const MainContent = () => {
    return (
        <MainStack.Navigator initialRouteName='BottomTab' screenOptions={{ headerShown: false }}>
            <MainStack.Screen name='BottomTab' component={BottomTabNavigation} />
            <MainStack.Screen name='Authentication' component={Authentication} options={{ presentation: 'modal' }} />
            <MainStack.Screen name='WishList' component={WishListScreen} />
            <MainStack.Screen name='UserView' component={UserViewScreen} />
            <MainStack.Screen name='UserEdit' component={UserEditScreen} />
            <MainStack.Screen name='Cart' component={CartScreen} />
        </MainStack.Navigator>
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <BookmarkProvider>
                <AuthProvider>
                    <CartProvider>
                        <MainContent />
                    </CartProvider>
                </AuthProvider>
            </BookmarkProvider>
        </NavigationContainer>
    );
};

export default App;