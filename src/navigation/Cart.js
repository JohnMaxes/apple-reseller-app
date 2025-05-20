import { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../pages/CartScreen";
import { AuthContext } from "../context/AuthContext";

const CartStack = createStackNavigator();
const Cart = () => {
    return (
        <CartStack.Navigator initialRouteName="CartScreen" screenOptions={{headerShown: false}}>
            <CartStack.Screen name='CartScreen' component={CartScreen} />
        </CartStack.Navigator>
    )
}

export default Cart;