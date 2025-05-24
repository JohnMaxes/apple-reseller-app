import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const Search1 = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState([
        "Iphone 16 Pro Max",
        "Mac Mini M4",
        "Iphone 16",
        "Ipad Pro M4"
    ]);

    const removeRecentSearch = (item) => {
        setRecentSearches(recentSearches.filter(search => search !== item));
    };

    return (
        <View style={styles.container}>
           

            {/* Header */}
            <Text style={styles.header}>TÌM KIẾM</Text>

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

            {/* Recent Searches */}
            <Text style={styles.recentTitle}>Tìm kiếm gần đây</Text>
            {recentSearches.map((item, index) => (
                <View key={index} style={styles.recentItem}>
                    <Text style={styles.recentText}>{item}</Text>
                    <TouchableOpacity onPress={() => removeRecentSearch(item)}>
                        <Icon name="close" size={20} color="#888" />
                    </TouchableOpacity>
                </View>
            ))}
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
    
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 40
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 40,
        paddingHorizontal: 15,
        marginBottom: 30,
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
    recentTitle: {
        fontSize: 18,
        marginBottom: 15,
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    recentText: {
        fontSize: 16,
        color: '#333',
    }
});

export default Search1;
