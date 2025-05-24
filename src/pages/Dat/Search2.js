import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const Search2 = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState([
        "Iphone 16 Pro Max",
        "Mac Mini M4",
        "Iphone 16",
        "Ipad Pro M4"
    ]);

    // Dữ liệu sản phẩm
    const products = [
        {
            id: 1,
            title: "iPad Pro M4 256GB",
            image: "https://www.bhphotovideo.com/images/images2500x2500/apple_my232ll_a_11_ipad_pro_early_1553824.jpg",
            price: "1.429.000đ",
            status: "Đã xem gần đây",
            statusIcon: "eye-outline",
            statusColor: "#34c759",
        },
        {
            id: 2,
            title: "iPad Pro M4 256GB",
            image: "https://www.bhphotovideo.com/images/images2500x2500/apple_my232ll_a_11_ipad_pro_early_1553824.jpg",
            price: "1.429.000đ",
            status: "Đã lưu gần đây",
            statusIcon: "bookmark",
            statusColor: "#007bff",
        },
        {
            id: 3,
            title: "iPad Pro M4 256GB",
            image: "https://www.bhphotovideo.com/images/images2500x2500/apple_my232ll_a_11_ipad_pro_early_1553824.jpg",
            price: "1.429.000đ",
            status: "Đã xem gần đây",
            statusIcon: "eye-outline",
            statusColor: "#34c759",
        },
        {
            id: 4,
            title: "iPad Pro M4 256GB",
            image: "https://www.bhphotovideo.com/images/images2500x2500/apple_my232ll_a_11_ipad_pro_early_1553824.jpg",
            price: "1.429.000đ",
            status: "Đã lưu gần đây",
            statusIcon: "bookmark",
            statusColor: "#007bff",
        },
        {
            id: 5,
            title: "iPad Pro M4 256GB",
            image: "https://www.bhphotovideo.com/images/images2500x2500/apple_my232ll_a_11_ipad_pro_early_1553824.jpg",
            price: "1.429.000đ",
            status: "Đã lưu gần đây",
            statusIcon: "bookmark",
            statusColor: "#007bff",
        },
        {
            id: 6,
            title: "iPad Pro M4 256GB",
            image: "https://www.bhphotovideo.com/images/images2500x2500/apple_my232ll_a_11_ipad_pro_early_1553824.jpg",
            price: "1.429.000đ",
            status: "Đã lưu gần đây",
            statusIcon: "bookmark",
            statusColor: "#007bff",
        },
    ];

    
    // Hiển thị sản phẩm
    const renderProduct = ({ item }) => (
        <View style={styles.productCard}>
            <View style={styles.statusContainer}>
                <Icon name={item.statusIcon} size={16} color={item.statusColor} style={styles.statusIcon} />
                <Text style={styles.statusText}>{item.status}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header1}>TÌM KIẾM</Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Icon name="search-outline" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    placeholder="Tìm sản phẩm..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchBar}
                />
            </View>


            {/* Gợi ý sản phẩm */}
            <Text style={styles.header2}>Được gợi ý cho bạn</Text>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.productList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header1: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 40,
    },
     header2: {//duoc goi y cho banban
        fontSize: 17,
        marginBottom: 10,
        marginTop: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 40,
        paddingHorizontal: 15,
        height: 40,
    },
    searchIcon: {
        marginRight: 5,
    },
    searchBar: {
        flex: 1,
        fontSize: 14,
        height: '100%',
        textAlignVertical: 'center',
    },
    
    productList: {
        alignItems: 'center',
    },
    productCard: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 10,
        margin: 10,
        width: '45%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    productTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#007bff',
        fontWeight: 'bold',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    statusIcon: {
        marginRight: 5,
    },
    statusText: {
        fontSize: 12,
        color: '#555',
    },
});

export default Search2;
