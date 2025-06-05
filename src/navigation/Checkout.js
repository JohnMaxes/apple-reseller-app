import { createStackNavigator } from "@react-navigation/stack";
import CheckoutScreen from "../pages/CheckoutScreen";
import CheckoutAddressAddScreen from "../pages/CheckoutAddressAddScreen";
import CheckoutAddressScreen from "../pages/CheckoutAddressScreen";
import CheckoutAddressEditScreen from "../pages/CheckoutAddressEditScreen";
import CheckoutVoucherScreen from "../pages/CheckoutVoucherScreen";
import CheckoutConfirmScreen from "../pages/CheckoutConfirmScreen";
import CheckoutFinalScreen from "../pages/CheckoutFinalScreen";

const CheckoutStack = createStackNavigator();
const Checkout = () => {
    return (
        <CheckoutStack.Navigator initialRouteName="CheckoutScreen" screenOptions={{headerShown: false}}>
            <CheckoutStack.Screen name='CheckoutScreen' component={CheckoutScreen}/>
            <CheckoutStack.Screen name='CheckoutConfirmScreen' component={CheckoutConfirmScreen}/>
            <CheckoutStack.Screen name='CheckoutAddressScreen' component={CheckoutAddressScreen}/>
            <CheckoutStack.Screen name='CheckoutAddressAddScreen' component={CheckoutAddressAddScreen}/>
            <CheckoutStack.Screen name='CheckoutAddressEditScreen' component={CheckoutAddressEditScreen}/>
            <CheckoutStack.Screen name='CheckoutVoucherScreen' component={CheckoutVoucherScreen}/>
            <CheckoutStack.Screen name='CheckoutFinalScreen' component={CheckoutFinalScreen}/>
        </CheckoutStack.Navigator>
    )
}

export default Checkout;