import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../pages/LoginScreen";
import SignUpScreen from "../pages/SignUpScreen";
import OTPChallengeScreen from "../pages/OTPChallengeScreen";
import ForgotPasswordScreen from "../pages/ForgotPasswordScreen";
import PasswordChangeScreen from "../pages/PasswordChangeScreen";
import { useState } from "react";

const AuthenticationStack = createStackNavigator();

const AuthFragment = ({navigation}) => {
    const [isMember, setIsMember] = useState(true);
    const togglePage = () => setIsMember(previous => !previous);
    return isMember ? <LoginScreen togglePage={togglePage} navigation={navigation} /> : <SignUpScreen togglePage={togglePage}/>
}

const Authentication = () => {
    return (
        <AuthenticationStack.Navigator initialRouteName="AuthFragment" screenOptions={{ headerShown: false }}>
            <AuthenticationStack.Screen name="AuthFragment" component={AuthFragment}/>
            {/*
            <AuthenticationStack.Screen name="Login" component={LoginScreen}/>
            <AuthenticationStack.Screen name="SignUp" component={SignUpScreen}/>
            */}
            <AuthenticationStack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <AuthenticationStack.Screen name="OTPChallenge" component={OTPChallengeScreen}/>
            <AuthenticationStack.Screen name="PasswordChange" component={PasswordChangeScreen}/>
        </AuthenticationStack.Navigator>
    );
}

export default Authentication;