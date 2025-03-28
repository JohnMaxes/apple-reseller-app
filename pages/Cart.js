import React, { useContext, useEffect } from "react";
import { View, Text, FlatList, Dimensions, Button } from "react-native";
import styles from "../styles";
import { MyContext } from "../context";
import CartItem from "../components/CartItem";

const renderItem = ({ item }) => (
    <CartItem id={item.id} image={item.image} title={item.title} price={item.price} quantity={item.quantity}/>
);

const Cart = () => {
    const { cart, setCart, cartTotal, setCartTotal } = useContext(MyContext);
    
    useEffect(() => console.log(cart), []);
    
    if (cart.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>Cart empty!</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <View style={{alignItems: 'center', height: Dimensions.get('window').height * 0.725}}>
                <FlatList
                    data={cart}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ alignItems: 'center' }}
                />
            </View>
            <View style={{justifyContent:'center', flexDirection:'row', height: Dimensions.get('window').height*0.05, marginTop: Dimensions.get('window').height*0.02}}>
                <View style={{flex: 2, justifyContent:'center', paddingLeft: 20}}>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>Total amount: {cartTotal}$</Text>
                </View>
                <View style={{flex: 1, justifyContent:'center', alignItems:'center', paddingRight: 10}}>
                <Button title="CHECKOUT"></Button>
                </View>
            </View>
        </View>
    );
}

export default Cart;