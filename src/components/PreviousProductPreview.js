import { useState } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

const width = Dimensions.get('window').width * 0.45;
const PreviousProductPreview = ({ title, image, description, price, rating, ratingCount, navigation, id }) => {
  /*
    const { cart, setCart, setCartTotal } = useContext(CartContext);
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
  */
  const navigateToItem = () => {
    navigation.navigate('ProductScreen', { title, image, description, price, rating, ratingCount });
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <TouchableOpacity onPress={navigateToItem} style={styles.container}>
        <View style={styles.card}>
            <View style={styles.recentlyViewed}>
                <Icon size={16} name={'eye'} color={'#4DB355'}/>  
                <Text style={{fontSize: 14, marginLeft: 5}}>Đã xem gần đây</Text>            
            </View>
            <Image source={{ uri: image }} style={styles.image}/>
            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">iPhone 15</Text>
                <Text style={styles.price}>{formatPrice(price)}đ</Text>
            </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 240,
        justifyContent: 'center',   
        alignItems: 'center',       
        alignSelf: 'center',  
        transform: [{ scale: 0.95 }], 
        marginHorizontal: 5, 
        marginBottom: 5
    },
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        padding: 5,
        shadowRadius: 5,
        elevation: 6,
        fontFamily: 'Inter'
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        marginTop: 10,
    },
    titleContainer: {
        height: 50,
    },
    title: {
        fontSize: 14, 
        fontWeight: 'bold',
        textAlign: 'center',
    },
    price: {
        fontSize: 14,
        color: '#007bff', 
        fontWeight: 'bold',
        textAlign: 'center'
    },
    recentlyViewed: {
        flexDirection:'row',
        alignItems: 'center',
        marginLeft: 10
    }
});

export default PreviousProductPreview;