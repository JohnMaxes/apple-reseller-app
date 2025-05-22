import { useCallback, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from '@react-navigation/native';
import UserViewScreen from "../pages/UserViewScreen";
import UserEditScreen from "../pages/UserEditScreen";
import { AuthContext } from "../context/AuthContext";

const ProfileStack = createStackNavigator();
const Profile = ({navigation}) => {
    const { loggedIn } = useContext(AuthContext);
    useFocusEffect( useCallback(() => { if( !loggedIn ) navigation.navigate('Authentication') }, [loggedIn]) )
    if(loggedIn) return (
        <ProfileStack.Navigator initialRouteName="UserView" screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="UserView" component={UserViewScreen}/>
            <ProfileStack.Screen name="UserEdit" component={UserEditScreen}/>
        </ProfileStack.Navigator>
    )
}

export default Profile;