import { useCallback, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import CartScreen from "../pages/CartScreen";
import { AuthContext } from "../context/AuthContext";

const Cart = ({navigation}) => {
    const { loggedIn } = useContext(AuthContext);
    useFocusEffect( useCallback(() => { if( !loggedIn ) navigation.navigate('Authentication') }, [loggedIn]) )
    if(loggedIn) return <CartScreen/>
}

export default Cart;