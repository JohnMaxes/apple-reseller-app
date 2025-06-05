import { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";

const width = Dimensions.get('window').width * 0.45;

const ProductCatalogPreview = ({ id, title, image, price, rating, ratingCount, navigation }) => {
  const { loggedIn } = useContext(AuthContext)
  const { wishlistItems, wishlist, unwishlist } = useContext(WishlistContext)
  const isWishlisted = wishlistItems.some(element => element.title == title && element.image == image);
  const handleWishlist = () => {
    let item = { id, title, image, price, rating, ratingCount };
    if(!loggedIn) return navigation.navigate('Authentication');
    !isWishlisted ? wishlist(item) : unwishlist(item);
  }

  const navigateToItem = () => navigation.navigate('ProductScreen', { productName: title });
  const formatPrice = (price) => { return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }

  return (
    <TouchableOpacity activeOpacity={1} onPress={navigateToItem}style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.bookmarkIcon} onPress={handleWishlist}>
          <Icon size={24} name={isWishlisted ? "bookmark" : "bookmark-outline"} color={isWishlisted ? "#007bff" : "#000"}/>
        </TouchableOpacity>
        <Image source={{ uri: image }} style={styles.image}/>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
        <Text style={styles.price}>{formatPrice(price)}đ</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width, 
    height: 215, 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center',  
    transform: [{ scale: 0.95 }], 
    marginLeft: 5, 
    marginRight: 5, 
    marginBottom: 5
  },
  card: {
    width: '100%',
    height: '100%', // Đảm bảo card chiếm toàn bộ chiều cao của TouchableOpacity
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    padding: 10,
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
    marginTop: 5,
  },
  titleContainer: {
    height: 50, // Giảm chiều cao để chỉ chứa tối đa 2 dòng
    justifyContent: 'center',
  },
  title: {
    fontSize: 14, 
    fontWeight: 600,
    textAlign: 'center',
  },
  price: {
    marginTop: -10,
    fontSize: 14,
    color: '#007bff', 
    fontWeight: 400,
  },
});

export default ProductCatalogPreview;