import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthFragmentView from "./AuthFragment";
import Profile from "./Profile";
import { AuthContext } from "../context/AuthContext";


const UserStack = createStackNavigator();
const User = () => {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <UserStack.Navigator initialRouteName={isLoggedIn ? 'Profile' : 'Authentication'}>
            <UserStack.Screen name="Profile" component={Profile} options={{
                headerShown: false,
            }}/>
            <UserStack.Screen name="Authentication" component={AuthFragmentView} options={{
                headerShown: false,
            }}/>
        </UserStack.Navigator>
    )
}

export default User;