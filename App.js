import React, { useContext, useState } from 'react';
import { View } from 'react-native';

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

import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
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
    const { loggedIn } = useContext(MyContext);
    const [isMember, setIsMember] = useState(true);
    const togglePage = () => setIsMember(prev => !prev);

    return loggedIn ? <BottomTabNav /> : (isMember ? <LoginScreen togglePage={togglePage} /> : <SignUpScreen togglePage={togglePage} />);
};

const BottomTab = createBottomTabNavigator();

const CustomTabIcon = ({ name, focused }) => {
    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            {focused && (
                <View style={{
                    position: "absolute",
                    width: 50,
                    height: 50,
                    backgroundColor: "black",
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                }} />
            )}
            <Icon name={name} color={focused ? "white" : "black"} size={26} style={{ position: "absolute" }} />
        </View>
    );
};

const BottomTabNav = () => {
    return (
        <BottomTab.Navigator
            initialRouteName="HomeStack"
            screenOptions={{
                tabBarStyle: {
                    height: 80,
                    paddingBottom: 10,
                    paddingTop: 10,
                    backgroundColor: '#ddd',
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    position: 'absolute',
                },
                tabBarShowLabel: false,
                headerShown: false,
            }}
        >
            <BottomTab.Screen 
                name="HomeStack" 
                component={Home} 
                options={{
                    tabBarIcon: ({ focused }) => <CustomTabIcon name="home-outline" focused={focused} />,
                }} 
            />
            <BottomTab.Screen 
                name="Categories" 
                component={Categories} 
                options={{
                    tabBarIcon: ({ focused }) => <CustomTabIcon name="phone-portrait-outline" focused={focused} />,
                }} 
            />
            <BottomTab.Screen 
                name="Cart" 
                component={Cart} 
                options={{
                    tabBarIcon: ({ focused }) => <CustomTabIcon name="cart-outline" focused={focused} />,
                }} 
            />
            <BottomTab.Screen 
                name="User" 
                component={UserStack} 
                options={{
                    tabBarIcon: ({ focused }) => <CustomTabIcon name="person-circle-outline" focused={focused} />,
                }} 
            />
        </BottomTab.Navigator>
    );
};

export default App;

