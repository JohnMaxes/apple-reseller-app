import { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserViewScreen from "../pages/UserViewScreen";
import UserEditScreen from "../pages/UserEditScreen";
import { AuthContext } from "../context/AuthContext";
import { View } from "react-native";


const ProfileStack = createStackNavigator();
const Profile = ({navigation}) => {
    const { loggedIn } = useContext(AuthContext);
    useEffect(() => { if( !loggedIn ) navigation.navigate('Authentication') }, []);
    return (
        <ProfileStack.Navigator initialRouteName="UserView">
            <ProfileStack.Screen name="UserView" component={UserViewScreen}/>
            <ProfileStack.Screen name="UserEdit" component={UserEditScreen}/>
        </ProfileStack.Navigator>
    )
}

export default Profile;