//MSSV: 22520097
//Họ tên: Đặng Quốc Bảo
//Lâu lâu token sẽ có một vài ký tự đặc biệt và decode không được ạ
//Và do tốc độ server rất biến thiên nên tốc độ chạy của một vài chức năng bị chậm
import React, { useContext, useState } from 'react';
import { MyContext, ContextProvider } from './context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginScreen from './pages/LoginScreen';
import SignUpScreen from './pages/SignUpScreen';

import Home from './pages/Home';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import UserStack from './pages/User';

import {configureReanimatedLogger,ReanimatedLogLevel} from 'react-native-reanimated';
configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
});

const App = () => {
    return (
        <NavigationContainer>
            <ContextProvider>
                <MainContent />
            </ContextProvider>        
        </NavigationContainer>
    );
};

const MainContent = () => {
    const {loggedIn, setLoggedIn} = useContext(MyContext);
    const [isMember, setIsMember] = useState(true);
    const togglePage = () => setIsMember(previous => !previous);
    return (
        loggedIn ? (
            <BottomTabNav></BottomTabNav>
        ) 
        : isMember ? (<LoginScreen togglePage={togglePage} />) : (<SignUpScreen togglePage={togglePage}/>)
    );
};

const BottomTab = createBottomTabNavigator();
const BottomTabNav = () => {
    return (
        <BottomTab.Navigator
            initialRouteName='HomeStack'
            screenOptions={{
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 15
                }
            }}
        >
            <BottomTab.Screen 
                name='HomeStack' 
                component={Home} 
                options={{
                    tabBarIcon: () => (<Icon name="home-outline" color="black" size={30} />), 
                    headerShown: false
                }} 
            />
            <BottomTab.Screen 
                name='Categories' 
                component={Categories} 
                options={{
                    tabBarIcon: () => (<Icon name="grid-outline" color="black" size={30} />), 
                    headerShown: false
                }} 
            />
            <BottomTab.Screen 
                name='Cart' 
                component={Cart} 
                options={{
                    tabBarIcon: () => (<Icon name="cart-outline" color="black" size={30} />)
                }} 
            />
            <BottomTab.Screen 
                name='User' 
                component={UserStack} 
                options={{
                    tabBarIcon: () => (<Icon name="person-outline" color="black" size={30} />),
                    headerShown: false,
                }} 
            />
        </BottomTab.Navigator>
    )
}

export default App;