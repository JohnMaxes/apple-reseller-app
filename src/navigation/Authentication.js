import { useState } from "react";
import LoginScreen from "../pages/LoginScreen";
import SignUpScreen from "../pages/SignUpScreen";
import { createStackNavigator } from "@react-navigation/stack";
import OTPChallengeScreen from "../pages/OTPChallengeScreen";
import ForgotPasswordScreen from "../pages/ForgotPasswordScreen";
import PasswordChangeScreen from "../pages/PasswordChangeScreen";

const AuthenticationStack = createStackNavigator();
const Authentication = () => {
    return (
        <AuthenticationStack.Navigator initialRouteName="AuthFragment" screenOptions={{ headerShown: false }}>
            <AuthenticationStack.Screen name="AuthFragment" component={AuthFragmentView}/>
            <AuthenticationStack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <AuthenticationStack.Screen name="OTPChallenge" component={OTPChallengeScreen}/>
            <AuthenticationStack.Screen name="PasswordChange" component={PasswordChangeScreen}/>
        </AuthenticationStack.Navigator>
    );
}

const AuthFragmentView = ({navigation}) => {
    const [isMember, setIsMember] = useState(true);
    const togglePage = () => setIsMember(previous => !previous);
    return isMember ? <LoginScreen togglePage={togglePage} navigation={navigation} /> : <SignUpScreen togglePage={togglePage}/>
}
export default Authentication;