import React, { useContext, useState } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity, Modal } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from "../context/CartContext";
import { StyleSheet } from 'react-native';

const width = Dimensions.get('window').width * 0.45;

const ProductCatalogPreview = ({ title, image, description, price, rating, ratingCount, navigation, id }) => {
  const { cart, setCart, setCartTotal } = useContext(CartContext);
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  const handleBookmarkEvent = () => setIsBookmarked(!isBookmarked);

  const navigateToItem = () => {
    navigation.navigate('ProductScreen', { title, image, description, price, rating, ratingCount });
  };

  // Hàm định dạng giá tiền
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <TouchableOpacity onPress={navigateToItem}
      style={{
        width: width,
        height: 240,
        justifyContent: 'center',   
        alignItems: 'center',       
        alignSelf: 'center',  
        transform: [{ scale: 0.95 }], marginLeft: 5, marginRight: 5, marginBottom: 5
      }}
    >
      <View style={styles.card}>
        <TouchableOpacity style={styles.bookmarkIcon} onPress={handleBookmarkEvent}>
          <Icon
            size={24}
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            color={isBookmarked ? "#007bff" : "#000"}
          />
        </TouchableOpacity>
        
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
        <Text style={styles.price}>{formatPrice(price)}đ</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%', // Đảm bảo card chiếm toàn bộ chiều cao của TouchableOpacity
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    position: 'relative', // Để định vị biểu tượng bookmark
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  image: {
    width: 110, 
    height: 130,
    resizeMode: 'contain',
    marginTop: 10,
  },
  titleContainer: {
    height: 50, // Giảm chiều cao để chỉ chứa tối đa 2 dòng
    justifyContent: 'center',
    marginBottom: 5,
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
  },
});

export default ProductCatalogPreview;