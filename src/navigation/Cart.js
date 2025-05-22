import { useCallback, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../pages/CartScreen";
import { AuthContext } from "../context/AuthContext";

const CartStack = createStackNavigator();
const Cart = ({navigation}) => {
    const { loggedIn } = useContext(AuthContext);
    useFocusEffect( useCallback(() => { if( !loggedIn ) navigation.navigate('Authentication') }, [loggedIn]) )
    if(loggedIn)
    return (
        <CartStack.Navigator initialRouteName="CartScreen" screenOptions={{headerShown: false}}>
            <CartStack.Screen name='CartScreen' component={CartScreen} />
        </CartStack.Navigator>
    )
}

export default Cart;