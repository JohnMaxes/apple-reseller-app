import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import ProductCatalogPreview from "../components/ProductCatalogPreview";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

const AllProductScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState([]);

    const filterOptions = ["Giá", "Bộ nhớ", "Năm ra mắt"];

    useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            setProducts(response.data);
        }
        catch (error) { console.error(error); } 
        finally { setLoading(false); }
    };

    fetchProducts();
    }, []);

    const toggleFilter = (filter) => {
        if (filter === "Filter") console.log("Mở trang bộ lọc"); 
        else setSelectedFilters((prev) => prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]);
    };
    const goBack = () => navigation.goBack();

    const renderFilterButton = (filter) => {
        const isSelected = selectedFilters.includes(filter);
        const isFilterButton = filter === "Filter";
        const showIcon = selectedFilters.length === 0;

        return (
            <TouchableOpacity key={filter} style={[ styles.filterButton, isSelected && !isFilterButton && styles.selectedFilterButton,]}
            onPress={() => toggleFilter(filter)}>
                {isFilterButton && showIcon && (
                    <Icon name="options-outline" size={18} color="#000" style={styles.filterIcon}/>
                )}
                {isFilterButton && selectedFilters.length > 0 && (
                    <View style={styles.filterBadge}>
                        <Text style={styles.filterBadgeText}>
                            {selectedFilters.length}
                        </Text>
                    </View>
                )}
                <Text style={ isSelected ? styles.filterButtonTextSelected : styles.filterButtonText}>
                    {filter}
                </Text>
            </TouchableOpacity>
        );
    };

    if (loading) return
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007bff" />
        </View>
        

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{zIndex: 10}} onPress={goBack}>
                    <View style={styles.backIconWrapper}>
                    <Icon name="chevron-back" size={22} color="#000" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>TẤT CẢ SẢN PHẨM</Text>
                <View style={{ width: 24 }} />
            </View>
            <View style={styles.searchContainer}>
                <Icon name="search-outline" size={20} color="#888" style={styles.searchIcon}/>
                <TextInput
                    placeholder="Tìm sản phẩm..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchBar}
                />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
                {["Filter", ...filterOptions].map(renderFilterButton)}
            </ScrollView>
            <FlatList
                data={products.filter((item) =>item.title.toLowerCase().includes(searchQuery.toLowerCase()))}
                renderItem={({ item }) => (
                    <ProductCatalogPreview
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        description={item.description}
                        rating={item.rating?.rate || 0}
                        ratingCount={item.rating?.count || 0}
                        navigation={navigation}
                        id={item.id}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.scrollViewContainer}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    scrollViewContainer: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15,
        marginTop: 50,
    },
    searchContainer: {
        width: "95%",
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 40,
        paddingHorizontal: 15,
        marginBottom: 20,
        height: 40,
    },
    searchIcon: {
        marginRight: 5,
    },
    searchBar: {
        flex: 1,
        fontSize: 14,
        height: "100%",
        textAlignVertical: "center",
    },
    filterContainer: {
        flexDirection: "row",
        marginBottom: 6,
        paddingHorizontal: 10,
    },
    filterButton: {
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        minHeight: 35,
        marginBottom: 15,
    },
    selectedFilterButton: {
        backgroundColor: "#e0f0ff",
        borderColor: "#007bff",
        borderWidth: 2,
    },
    filterBadge: {
        backgroundColor: "#007bff",
        borderRadius: 50,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 8,
    },
    filterBadgeText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "bold",
    },
    filterIcon: {
        marginRight: 8,
    },
    filterButtonText: {
        fontSize: 14,
        color: "#555",
        fontWeight: "normal",
    },
    filterButtonTextSelected: {
        fontSize: 14,
        color: "#000",
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default AllProductScreen;
