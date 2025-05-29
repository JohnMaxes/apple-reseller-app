import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from "react-native";
import { BookmarkContext } from "../../context/BookmarkContext.js";
import { Ionicons } from "@expo/vector-icons"; // cần cài expo vector icons
import { CartContext } from "../../context/CartContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
AsyncStorage.removeItem('cart');

const WishListScreen = ({ navigation }) => {
  const { bookmarks, removeBookmark } = useContext(BookmarkContext);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(false);
  }, [bookmarks]);

  const formatPrice = (price) => {
  const num = Number(price);
  if (isNaN(num)) return "0 ₫";
  // Nếu là số nguyên, không hiển thị phần thập phân
  if (Number.isInteger(num)) {
    return num.toLocaleString("vi-VN") + " ₫";
  }
  // Nếu là số thập phân, hiển thị 2 số lẻ
  return num.toLocaleString("vi-VN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₫";
};

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DANH SÁCH YÊU THÍCH</Text>
        <View style={styles.cartIcon}>
  <TouchableOpacity onPress={() => navigation.navigate('BottomTab', { screen: 'Cart' })}>
    <Ionicons name="cart-outline" size={24} color="black" />
    <View style={styles.cartBadge}>
      <Text style={styles.cartBadgeText}>
  {Array.isArray(cart) && cart.length > 0
    ? cart.reduce((total, item) => total + (item.quantity || 1), 0)
    : 0}
</Text>
    </View>
  </TouchableOpacity>
</View>
      </View>

      {/* Danh sách sản phẩm */}
      <ScrollView style={styles.scrollContainer}>
        {bookmarks.length === 0 ? (
          <Text style={styles.emptyText}>Không có sản phẩm yêu thích</Text>
        ) : (
          bookmarks.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.itemInfo}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>{formatPrice(item.price)}</Text>
                <TouchableOpacity
  onPress={() => {
    addToCart({
      ...item,
      id: String(item.id),           
      price: Number(item.price)      
    });
    navigation.navigate('BottomTab', { screen: 'Cart' });  
  }}
>
  <Text style={styles.addToCart}>Thêm vào giỏ hàng</Text>
</TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => removeBookmark(item.id)}>
                <Text style={styles.removeButton}>×</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    marginTop: 20, // Adjusted for better visibility on iOS
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

export default WishListScreen;
