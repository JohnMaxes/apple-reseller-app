import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Categories from './Categories';
import User from './User';
import Cart from './Cart';

const BottomTab = createBottomTabNavigator();
const BottomTabNavigation = () => {
    return (
        <BottomTab.Navigator
            initialRouteName='Home'
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
                name='Home' 
                component={Home}
                options={{
                    tabBarIcon: () => (<Icon name="home-outline" color="black" size={30} />), 
                    headerShown: false,
                }} 
            />
            <BottomTab.Screen 
                name='Categories' 
                component={Categories} 
                options={{
                    tabBarIcon: () => (<Icon name="grid-outline" color="black" size={30} />), 
                    headerShown: false,
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
                component={User} 
                options={{
                    tabBarIcon: () => (<Icon name="person-outline" color="black" size={30} />),
                    headerShown: false,
                }} 
            />
        </BottomTab.Navigator>
    )
}

export default BottomTabNavigation;
