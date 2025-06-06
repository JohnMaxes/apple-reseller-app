import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, StyleSheet, Platform } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from "../context/CartContext.js";
import { WishlistContext } from "../context/WishlistContext.js";

const WishListScreen = ({ navigation }) => {
  const { wishlistItems, unwishlist } = useContext(WishlistContext);
  const [ loading, setLoading ] = useState(true);
  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => setLoading(false), [wishlistItems]);

  const formatPrice = (price) => {
    const num = Number(price);
    if (isNaN(num)) return "0 ₫"; // Nếu là số nguyên, không hiển thị phần thập phân
    if (Number.isInteger(num)) return num.toLocaleString("vi-VN") + " ₫"; // Nếu là số thập phân, hiển thị 2 số lẻ
    return num.toLocaleString("vi-VN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₫";
  };

  const handleNavigateToProducts = (item) =>
    navigation.navigate('WishlistProductScreen', { productName: item.title });

  if (loading) return (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DANH SÁCH YÊU THÍCH</Text>
        <View style={styles.cartIcon}>
          <TouchableOpacity onPress={() => navigation.navigate('BottomTab', { screen: 'Cart' })}>
            <Icon name="cart-outline" size={24} color="black" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {Array.isArray(cart) && cart.length > 0 ? cart.reduce((total, item) => total + (item.quantity || 1), 0) : 0}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {wishlistItems.length === 0 ? (
          <Text style={styles.emptyText}>Không có sản phẩm yêu thích</Text>
        ) : (
          wishlistItems.map((item) => (
            <TouchableOpacity onPress={() => handleNavigateToProducts(item)} key={item.id} style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.itemInfo}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>{formatPrice(item.price)}</Text>
                <TouchableOpacity onPress={() => handleNavigateToProducts(item)}>
                  <Text style={styles.addToCart}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => unwishlist(item)}>
                <Text style={styles.removeButton}>×</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.select({ ios: 70, android: 50, default: 40 })
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  cartIcon: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#0171E3",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  price: {
    fontSize: 20,
    marginVertical: 4,
    color: "#000",
  },
  addToCart: {
    color: "#0171E3",
    fontSize: 15,
  },
  removeButton: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});