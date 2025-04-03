import React, { useContext } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity, Modal } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from "../context/CartContext";

const ProductPreview = ({title, image, description, price, rating, ratingCount, navigation, id}) => {
    const width = Dimensions.get('window').width * 0.475;
    const{cart, setCart, setCartTotal} = useContext(CartContext);
    const addToCart = () => {
        if (cart.some(element => element.id === id)) {
            alert('Item is already in cart');
            return;
        }
        let newItem = { id, title, price, image, quantity: 1 };
        console.log(newItem);
        setCart(prevCart => [...prevCart, newItem]);
        setCartTotal(prevTotal => prevTotal + price);
        alert('Item added to cart successfully!');
    };

    const navigateToItem = () => {
        navigation.navigate('ProductScreen', {title, image, description, price, rating, ratingCount})
    }
    return (
        <TouchableOpacity onPress={navigateToItem} style={{width: width, height: 350, borderBlock:'black', borderColor:2, marginBottom: 10, marginHorizontal: 5}}>
            <View style={{height: 300, width: '100%'}}>
                <Image style={{width: width, height: 225}} source={{uri: image}}/>
                <Text numberOfLines={3} style={{fontSize: 20}}>{title}</Text>
            </View>
            <View style={{width: '100%', flexDirection:'row', height:50}}>
                <View style={{width: '70%', height:'100%'}}>
                    <Text style={{fontSize: 17, color:'red', fontWeight:'bold'}}>{price} $</Text>
                    <Text style={{fontSize: 15}}>{rating}⭐{'(' + ratingCount + ')'}</Text>
                </View>
                <TouchableOpacity style={{width:'30%', height:'100%', alignItems:'center', justifyContent:'center'}} onPress={() => addToCart()}>
                    <Icon name="add-circle-outline" size={45}/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ProductPreview;