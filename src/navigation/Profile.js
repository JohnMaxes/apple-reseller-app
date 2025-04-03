import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserViewScreen from "../pages/UserViewScreen";
import UserEditScreen from "../pages/UserEditScreen";


const ProfileStack = createStackNavigator();
const Profile = () => {
    return (
        <ProfileStack.Navigator initialRouteName="User">
            <ProfileStack.Screen name="User" component={UserViewScreen}/>
            <ProfileStack.Screen name="UserEdit" component={UserEditScreen}/>
        </ProfileStack.Navigator>
    )
}

export default Profile;