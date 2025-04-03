import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductScreen from "../pages/ProductScreen";
import HomeScreen from "../pages/HomeScreen";


const HomeStack = createStackNavigator();
const Home = () => {
    return (
        <HomeStack.Navigator initialRouteName="HomeScreen" screenOptions={{
            headerStyle: {
                backgroundColor: 'transparent', // Make header background transparent
                elevation: 0, // Remove shadow on Android
                shadowOpacity: 0, // Remove shadow on iOS
            },
            headerTransparent: true, // Make the header transparent
        }}>
            <HomeStack.Screen name='HomeScreen' component={HomeScreen}/>
            <HomeStack.Screen name='ProductScreen' component={ProductScreen}/>
        </HomeStack.Navigator>
    )
}

export default Home;