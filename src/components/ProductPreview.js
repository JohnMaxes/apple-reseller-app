import React, { useContext } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity, Modal } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from "../context/CartContext";
import { StyleSheet } from 'react-native';
const width = Dimensions.get('window').width * 0.475;
const ProductPreview = ({title, image, description, price, rating, ratingCount, navigation, id}) => {
  
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
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: image }} 
                        style={styles.image} 
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
                        {title}
                    </Text>
                </View>
                <Text style={styles.price}>{price}₫</Text>
                <TouchableOpacity onPress={addToCart}>
                    <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyButton} onPress={addToCart}>
                    <Text style={styles.buyButtonText}>Mua</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    card: {
        width: width,
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
        margin: 10,
    },
    imageContainer: {
        backgroundColor: '#fff', 
        borderRadius: 15,
        padding: 10, 
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    titleContainer: {
        height: 70, 
        justifyContent: 'center', 
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    addToCartText: {
        fontSize: 15,
        color: '#000',
        marginBottom: 10,
    },
    buyButton: {
        backgroundColor: '#007bff',
        paddingVertical: 3,
        paddingHorizontal: 25,
        borderRadius: 999,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 16,
        // fontWeight: 'bold',
    },
})


export default ProductPreview;