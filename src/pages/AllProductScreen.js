import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from "react-native";
import ProductCatalogPreview from "../components/ProductCatalogPreview";
import Icon from "react-native-vector-icons/Ionicons";
import { getAllProducts, getProductsByCategory } from "../services/product";

const padProductsForGrid = (products, numColumns = 2) => {
  const padded = [...products];
  if (padded.length % numColumns !== 0) padded.push({ empty: true });
  return padded;
};

const AllProductScreen = ({ navigation, route }) => {
    const { category } = route.params;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState([]);

    const filterOptions = ["Giá", "Bộ nhớ", "Năm ra mắt", "Tiêu chí"];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = category !== '' ? await getProductsByCategory(category) : await getAllProducts();
                if (response.data && response.data.status === 200) {
                    const newProducts = padProductsForGrid(response.data.data, 2);
                    console.log(newProducts);
                    setProducts(newProducts); // Lấy mảng sản phẩm từ backend
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error(error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const toggleFilter = (filter) => {
        if (filter === "Filter") navigation.navigate('ProductFilterScreen'); 
        else setSelectedFilters((prev) => prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]);
    };
    const goBack = () => navigation.goBack();

    const renderFilterButton = (filter) => {
        const isSelected = selectedFilters.includes(filter);
        const isFilterButton = filter === "Filter";
        const showIcon = selectedFilters.length === 0;

        return (
            <TouchableOpacity key={filter} style={[ styles.filterButton, isSelected && !isFilterButton && styles.selectedFilterButton]}
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

    if (loading) return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007bff" />
        </View>
    );

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, paddingHorizontal: 20 }}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{zIndex: 10}} onPress={goBack}>
                            <View style={styles.backIconWrapper}>
                                <Icon name="chevron-back" size={22} color="#000" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={{ fontSize: 25, fontFamily: 'Inter', fontWeight: "bold", textAlign: "center"}}>TẤT CẢ SẢN PHẨM</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                    </View>
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
                <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 20}} showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
                    {["Filter", ...filterOptions].map(renderFilterButton)}
                </ScrollView>
                <FlatList
                    data={
                        padProductsForGrid(products.filter( item =>
                            item.productName &&
                            item.productName.toLowerCase().includes(searchQuery.toLowerCase())
                        ), 2)
                    }
                    renderItem={({ item }) => {
                    if (item.empty) {
                        return (
                        <View style={{
                            width: Dimensions.get('window').width / 2 - 32,
                            height: 215, marginHorizontal: 10,
                            backgroundColor: 'transparent'
                            }}
                        />
                        );
                    }
                    return (
                        <ProductCatalogPreview
                        title={item.productName}
                        image={item.images && item.images[0]?.imageUrl}
                        price={item.price}
                        description={item.description}
                        rating={item.rating || 0}
                        ratingCount={item.ratingCount || 0}
                        navigation={navigation}
                        id={item.sku}
                        />
                    );
                    }}
                    keyExtractor={(item, idx) => item.sku ? item.sku : `empty-${idx}`}
                    numColumns={2}
                    style={{ height: 700 }}
                    columnWrapperStyle={{ justifyContent: 'center' }}
                    contentContainerStyle={{paddingBottom: 90}}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    backIconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        paddingTop: Platform.select({ ios: 70, android: 50, default: 40 }), 
    },
    scrollViewContainer: {
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
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 40,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginBottom: 20,
        height: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
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
        paddingHorizontal: -20,
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
        height: 35,
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
