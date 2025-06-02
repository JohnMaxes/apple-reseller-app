import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../pages/LoginScreen";
import SignUpScreen from "../pages/SignUpScreen";
import OTPChallengeScreen from "../pages/OTPChallengeScreen";
import ForgotPasswordScreen from "../pages/ForgotPasswordScreen";
import PasswordChangeScreen from "../pages/PasswordChangeScreen";

const AuthenticationStack = createStackNavigator();

const Authentication = () => {
    return (
        <AuthenticationStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <AuthenticationStack.Screen name="Login" component={LoginScreen}/>
            <AuthenticationStack.Screen name="SignUp" component={SignUpScreen}/>
            <AuthenticationStack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <AuthenticationStack.Screen name="OTPChallenge" component={OTPChallengeScreen}/>
            <AuthenticationStack.Screen name="PasswordChange" component={PasswordChangeScreen}/>
        </AuthenticationStack.Navigator>
    );
}

export default Authentication;