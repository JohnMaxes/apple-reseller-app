import { useCallback, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from '@react-navigation/native';
import ProfileScreen from "../pages/ProfileScreen";
import { AuthContext } from "../context/AuthContext";
import WishListScreen from "../pages/WishlistScreen";
import ProfileEditScreen from "../pages/ProfileEditScreen";
import Orders from "./Orders";

const ProfileStack = createStackNavigator();
const Profile = ({navigation}) => {
    const { loggedIn } = useContext(AuthContext);
    useFocusEffect( useCallback(() => { if( !loggedIn ) navigation.navigate('Authentication') }, [loggedIn]) )
    if(loggedIn) return (
        <ProfileStack.Navigator initialRouteName="ProfileScreen" screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen}/>
            <ProfileStack.Screen name="ProfileEdit" component={ProfileEditScreen}/>
            <ProfileStack.Screen name="WishlistScreen" component={WishListScreen}/>
            <ProfileStack.Screen name="Orders" component={Orders}/>
        </ProfileStack.Navigator>
    )
}

export default Profile;